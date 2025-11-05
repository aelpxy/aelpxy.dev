/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata, BlogPost } from '$lib/types';
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { codeToHtml } from 'shiki';

async function highlightCode(code: string, lang: string): Promise<string> {
	try {
		const html = await codeToHtml(code, {
			lang,
			theme: 'vitesse-dark'
		});
		return html;
	} catch (error) {
		console.warn(`Failed to highlight code with lang "${lang}":`, error);
		return `<pre><code class="language-${lang}">${code}</code></pre>`;
	}
}

async function parseFrontmatter(fileContent: string) {
	const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
	const match = frontmatterRegex.exec(fileContent);
	if (!match) {
		throw new Error('No frontmatter found in file');
	}
	const frontMatterBlock = match[1];
	const markdownContent = fileContent.replace(frontmatterRegex, '').trim();
	const frontMatterLines = frontMatterBlock.trim().split('\n');
	const metadata: Partial<Metadata> = {};

	frontMatterLines.forEach((line) => {
		const [key, ...valueArr] = line.split(': ');
		let value = valueArr.join(': ').trim();
		value = value.replace(/^['"](.*)['"]$/, '$1');
		const trimmedKey = key.trim();

		if (trimmedKey === 'isDraft') {
			metadata[trimmedKey as keyof Metadata] = (value === 'true') as any;
		} else {
			// @ts-expect-error - dynamic metadata assignment
			metadata[trimmedKey as keyof Metadata] = value;
		}
	});

	const renderer = new marked.Renderer();
	const codePromises: Promise<{ placeholder: string; html: string }>[] = [];

	renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
		const placeholder = `__SHIKI_CODE_${codePromises.length}__`;
		const promise = highlightCode(text, lang || 'text').then((html) => ({
			placeholder,
			html
		}));
		codePromises.push(promise);
		return placeholder;
	};

	marked.use({ renderer });
	let htmlContent = marked.parse(markdownContent, { async: false }) as string;

	const codeBlocks = await Promise.all(codePromises);

	for (const { placeholder, html } of codeBlocks) {
		htmlContent = htmlContent.replace(placeholder, html);
	}

	return { metadata: metadata as Metadata, content: htmlContent };
}

function getMDFiles(dir: string) {
	return fs.readdirSync(dir).filter((file) => path.extname(file) === '.md');
}

async function readMDFile(filePath: string) {
	const rawContent = fs.readFileSync(filePath, 'utf-8');
	return await parseFrontmatter(rawContent);
}

async function getMDData(dir: string) {
	const mdFiles = getMDFiles(dir);

	const posts = await Promise.all(
		mdFiles.map(async (file) => {
			const { metadata, content } = await readMDFile(path.join(dir, file));
			const slug = path.basename(file, path.extname(file));

			return {
				metadata,
				slug,
				content
			};
		})
	);

	return posts;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
	return await getMDData(path.join(process.cwd(), 'src', 'content', 'posts'));
}
