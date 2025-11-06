import { getFeaturedRepositories } from '$lib/github';
import { getNotionPosts } from '$lib/notion';

export async function load() {
	const allPosts = await getNotionPosts();
	const featuredRepositories = await getFeaturedRepositories(4);

	const posts = allPosts.slice(0, 5);

	return {
		posts,
		repos: featuredRepositories
	};
}

export const prerender = true;
