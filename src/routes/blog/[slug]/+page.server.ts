import { getNotionPostBySlug, getNotionPosts } from '$lib/notion';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const post = await getNotionPostBySlug(params.slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	return {
		post
	};
};

export async function entries() {
	const posts = await getNotionPosts();
	return posts.map((post) => ({
		slug: post.slug
	}));
}

export const prerender = true;
