import { getFeaturedRepositories } from '$lib/github';
import { getBlogPosts } from '$lib/markdown.server';

export async function load() {
	const allPosts = await getBlogPosts();
	const featuredRepositories = await getFeaturedRepositories(4);

	// get the 5 most recent published posts for the home page
	const posts = allPosts
		.filter((post) => !post.metadata.isDraft)
		.sort(
			(a, b) =>
				new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
		)
		.slice(0, 5);

	return {
		posts,
		repos: featuredRepositories
	};
}

export const prerender = true;
