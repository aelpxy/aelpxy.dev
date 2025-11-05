import { getBlogPosts } from '$lib/markdown.server';
import type { BlogPost } from '$lib/types';

export async function load() {
	const allPosts = await getBlogPosts();

	// Filter out draft posts and sort by date
	const posts: BlogPost[] = allPosts
		.filter((post) => !post.metadata.isDraft)
		.sort(
			(a, b) =>
				new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
		);

	return {
		posts
	};
}
