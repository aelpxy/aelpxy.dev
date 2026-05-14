import { getFeaturedRepositories } from '$lib/github';

export async function load() {
	const featuredRepositories = await getFeaturedRepositories(4);

	return {
		repos: featuredRepositories
	};
}

export const prerender = true;
