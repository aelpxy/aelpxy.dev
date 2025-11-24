import { NOTION_API_KEY, NOTION_DATABASE_ID } from '$env/static/private';
import { Client } from '@notionhq/client';
import { marked } from 'marked';
import { NotionToMarkdown } from 'notion-to-md';
import { codeToHtml } from 'shiki';
import type { BlogPost } from './types';

const notion = new Client({
	auth: NOTION_API_KEY
});

const n2m = new NotionToMarkdown({ notionClient: notion });

const DATABASE_ID = NOTION_DATABASE_ID || '';

async function highlightCode(code: string, lang: string): Promise<string> {
	try {
		const html = await codeToHtml(code, {
			lang,
			theme: 'dark-plus'
		});
		return html;
	} catch (error) {
		console.warn(`failed to highlight code with lang "${lang}":`, error);
		return `<pre><code class="language-${lang}">${code}</code></pre>`;
	}
}

async function parseMarkdownWithHighlighting(markdownContent: string): Promise<string> {
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

	return htmlContent;
}

interface NotionPageProperties {
	Title: {
		type: 'title';
		title: Array<{ plain_text: string }>;
	};
	Slug: {
		type: 'rich_text';
		rich_text: Array<{ plain_text: string }>;
	};
	Published: {
		type: 'date';
		date: { start: string } | null;
	};
	Summary: {
		type: 'rich_text';
		rich_text: Array<{ plain_text: string }>;
	};
	isDraft: {
		type: 'checkbox';
		checkbox: boolean;
	};
}

interface NotionPage {
	id: string;
	properties: NotionPageProperties;
}

export async function getNotionPosts(): Promise<BlogPost[]> {
	try {
		const response = await notion.dataSources.query({
			data_source_id: DATABASE_ID,
			filter: {
				property: 'isDraft',
				checkbox: {
					equals: false
				}
			},
			sorts: [
				{
					property: 'Published',
					direction: 'descending'
				}
			]
		});

		const posts = await Promise.all(
			response.results.map(async (page) => {
				const notionPage = page as unknown as NotionPage;

				const mdblocks = await n2m.pageToMarkdown(page.id);
				const mdString = n2m.toMarkdownString(mdblocks);
				const htmlContent = await parseMarkdownWithHighlighting(mdString.parent);

				return {
					slug:
						notionPage.properties.Slug.rich_text[0]?.plain_text ||
						notionPage.properties.Title.title[0]?.plain_text.toLowerCase().replace(/\s+/g, '-'),
					content: htmlContent,
					metadata: {
						title: notionPage.properties.Title.title[0]?.plain_text || 'Untitled',
						publishedAt: notionPage.properties.Published.date?.start || new Date().toISOString(),
						summary: notionPage.properties.Summary.rich_text[0]?.plain_text || '',
						isDraft: notionPage.properties.isDraft.checkbox,
						author: 'aelpxy'
					}
				};
			})
		);

		return posts;
	} catch (error) {
		console.error('Error fetching Notion posts:', error);
		return [];
	}
}

export async function getNotionPostBySlug(slug: string): Promise<BlogPost | null> {
	try {
		const response = await notion.dataSources.query({
			data_source_id: DATABASE_ID,
			filter: {
				property: 'Slug',
				rich_text: {
					equals: slug
				}
			}
		});

		if (response.results.length === 0) {
			return null;
		}

		const page = response.results[0];
		const notionPage = page as unknown as NotionPage;

		const mdblocks = await n2m.pageToMarkdown(page.id);
		const mdString = n2m.toMarkdownString(mdblocks);
		const htmlContent = await parseMarkdownWithHighlighting(mdString.parent);

		return {
			slug:
				notionPage.properties.Slug.rich_text[0]?.plain_text ||
				notionPage.properties.Title.title[0]?.plain_text.toLowerCase().replace(/\s+/g, '-'),
			content: htmlContent,
			metadata: {
				title: notionPage.properties.Title.title[0]?.plain_text || 'Untitled',
				publishedAt: notionPage.properties.Published.date?.start || new Date().toISOString(),
				summary: notionPage.properties.Summary.rich_text[0]?.plain_text || '',
				isDraft: notionPage.properties.isDraft.checkbox,
				author: 'aelpxy'
			}
		};
	} catch (error) {
		console.error('Error fetching Notion post:', error);
		return null;
	}
}
