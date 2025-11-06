import { getTopTracks, getRecentlyPlayed } from '$lib/spotify';

export async function load() {
	try {
		const [topTracks, recentTracks] = await Promise.all([
			getTopTracks(10).catch(() => []),
			getRecentlyPlayed(10).catch(() => [])
		]);

		return {
			topTracks,
			recentTracks
		};
	} catch (error) {
		console.error('Error fetching Spotify data:', error);
		return {
			topTracks: [],
			recentTracks: []
		};
	}
}
