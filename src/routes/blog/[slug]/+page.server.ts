import { getNotionPostBySlug } from '$lib/notion';
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

export const config = {
	isr: {
		expiration: 86400
	}
};
