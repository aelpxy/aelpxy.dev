import type { PageServerLoad } from './$types';
import { getTopTracks, getRecentlyPlayed, getNowPlaying } from '$lib/spotify';

export const load: PageServerLoad = async ({ depends }) => {
	depends('app:now-playing');

	try {
		const [topTracks, recentTracks, nowPlaying] = await Promise.all([
			getTopTracks(10).catch(() => []),
			getRecentlyPlayed(10).catch(() => []),
			getNowPlaying().catch(() => null)
		]);

		return {
			topTracks,
			recentTracks,
			nowPlaying
		};
	} catch (error) {
		console.error('Error fetching Spotify data:', error);
		return {
			topTracks: [],
			recentTracks: [],
			nowPlaying: null
		};
	}
};
