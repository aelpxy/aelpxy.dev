import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import { getNowPlaying } from '$lib/spotify';

export const GET: RequestHandler = async () => {
	try {
		const data = await getNowPlaying();

		return json({
			ok: true,
			data
		});
	} catch (error) {
		console.error('Error fetching Spotify data:', error);
		return json(
			{
				ok: false,
				error: 'Failed to fetch Spotify data'
			},
			{ status: 500 }
		);
	}
};
