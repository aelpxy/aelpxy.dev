import { Client } from '@notionhq/client';
import type { Loader } from 'astro/loaders';
import { NotionToMarkdown } from 'notion-to-md';

interface NotionPage {
	id: string;
	properties: {
		Title: { title: Array<{ plain_text: string }> };
		Slug: { rich_text: Array<{ plain_text: string }> };
		Published: { date: { start: string } | null };
		Summary: { rich_text: Array<{ plain_text: string }> };
		isRawThought: { checkbox: boolean };
	};
}

export function notionLoader({ auth, dataSourceId }: { auth: string; dataSourceId: string }): Loader {
	return {
		name: 'notion-loader',
		load: async ({ store, parseData, renderMarkdown, logger }) => {
			const notion = new Client({ auth });
			const n2m = new NotionToMarkdown({ notionClient: notion });

			const response = await notion.dataSources.query({
				data_source_id: dataSourceId,
				filter: { property: 'isDraft', checkbox: { equals: false } },
				sorts: [{ property: 'Published', direction: 'descending' }]
			});

			store.clear();

			for (const result of response.results) {
				const page = result as unknown as NotionPage;
				const { Title, Slug, Published, Summary, isRawThought } = page.properties;
				const title = Title.title[0]?.plain_text || 'Untitled';
				const id = Slug.rich_text[0]?.plain_text || title.toLowerCase().replace(/\s+/g, '-');

				const body = n2m.toMarkdownString(await n2m.pageToMarkdown(page.id)).parent ?? '';

				const data = await parseData({
					id,
					data: {
						title,
						summary: Summary.rich_text[0]?.plain_text || '',
						publishedAt: Published.date?.start || new Date().toISOString(),
						raw: isRawThought.checkbox
					}
				});

				store.set({ id, data, body, rendered: await renderMarkdown(body) });
			}

			logger.info(`loaded ${response.results.length} posts from notion`);
		}
	};
}
