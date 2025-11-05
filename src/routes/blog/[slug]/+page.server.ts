import { getBlogPosts } from '$lib/markdown.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const posts = await getBlogPosts();
	const post = posts.find((p) => p.slug === params.slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	return {
		post
	};
};

export async function entries() {
	const posts = await getBlogPosts();
	return posts.map((post) => ({
		slug: post.slug
	}));
}

export const prerender = true;
