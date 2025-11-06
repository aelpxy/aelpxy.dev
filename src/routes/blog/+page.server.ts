import { getNotionPosts } from '$lib/notion';

export async function load() {
	const posts = await getNotionPosts();

	return {
		posts
	};
}

export const prerender = true;
