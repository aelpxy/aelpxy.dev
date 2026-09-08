import { generateOGImage } from '$lib/og';
import { getNotionPostBySlug } from '$lib/notion';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const { slug } = params;

	const post = await getNotionPostBySlug(slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	const date = post.metadata.publishedAt
		? new Date(post.metadata.publishedAt).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})
		: undefined;

	const png = await generateOGImage({
		title: post.metadata.title,
		subtitle: post.metadata.summary,
		date
	});

	return new Response(png.buffer as ArrayBuffer, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=86400, s-maxage=86400'
		}
	});
};
