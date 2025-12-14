import { generateArticle } from '$lib/openrouter';
import { getReadingTime } from '$lib/reading-time';
import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	const topic = decodeURIComponent(params.topic);

	try {
		const article = await generateArticle(topic);

		const contentHtml = await marked(article.content);
		const readingTime = getReadingTime(article.content);

		setHeaders({
			'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600'
		});

		return {
			topic,
			article: {
				...article,
				contentHtml,
				readingTime: readingTime.text
			}
		};
	} catch (e) {
		console.error('error generating article:', e);
		throw error(500, {
			message: e instanceof Error ? e.message : 'Failed to generate article'
		});
	}
};
