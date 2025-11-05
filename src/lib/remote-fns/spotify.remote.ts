import { query } from '$app/server';
import { getAccessToken } from '$lib/spotify';

type NowPlayingData = {
	isPlaying: boolean;
	title?: string;
	artist?: string;
	album?: string;
	albumImageUrl?: string;
	songUrl?: string;
};

type ApiResponse<T> =
	| {
			ok: true;
			data: T;
	  }
	| {
			ok: false;
			error: string;
	  };

const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

export const getCurrentlyPlaying = query(async () => {
	const { access_token } = await getAccessToken();

	const response = await fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});

	if (response.status === 204 || response.status > 400) {
		return {
			ok: true,
			data: { isPlaying: false }
		} satisfies ApiResponse<NowPlayingData>;
	}

	const song = await response.json();

	if (song.item === null) {
		return {
			ok: true,
			data: { isPlaying: false }
		} satisfies ApiResponse<NowPlayingData>;
	}

	const data: NowPlayingData = {
		isPlaying: song.is_playing,
		title: song.item.name,
		artist: song.item.artists.map((artist: { name: string }) => artist.name).join(', '),
		album: song.item.album.name,
		albumImageUrl: song.item.album.images[0]?.url,
		songUrl: song.item.external_urls.spotify
	};

	return {
		ok: true,
		data
	} satisfies ApiResponse<NowPlayingData>;
});
