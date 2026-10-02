import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { notionLoader } from './lib/notion-loader';

const posts = defineCollection({
	loader: notionLoader({
		auth: import.meta.env.NOTION_API_KEY,
		dataSourceId: import.meta.env.NOTION_DATABASE_ID
	}),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		publishedAt: z.coerce.date()
	})
});

export const collections = { posts };
