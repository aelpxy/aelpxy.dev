import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { formatDate } from '../../lib/date';
import { renderOgImage } from '../../lib/og';
import { pageMeta } from '../../lib/site';

export const getStaticPaths = (async () => {
	const pages = Object.entries(pageMeta).map(([route, { title, description }]) => ({
		params: { route },
		props: { title, description, label: undefined as string | undefined }
	}));

	const posts = (await getCollection('posts')).map((post) => {
		const section = post.data.raw ? 'scratchpad' : 'thoughts';
		return {
			params: { route: `${section}/${post.id}` },
			props: {
				title: post.data.title,
				description: post.data.summary || undefined,
				label: `${section} · ${formatDate(post.data.publishedAt)}`
			}
		};
	});

	return [...pages, ...posts];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
	const png = await renderOgImage(props as Parameters<typeof renderOgImage>[0]);
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
