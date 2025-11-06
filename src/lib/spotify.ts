import {
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REFRESH_TOKEN
} from '$env/static/private';

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played';

interface SpotifyTokenResponse {
	access_token: string;
}

interface SpotifyArtist {
	name: string;
}

interface SpotifyImage {
	url: string;
}

interface SpotifyAlbum {
	name: string;
	images: SpotifyImage[];
}

interface SpotifyExternalUrls {
	spotify: string;
}

interface SpotifyTrackItem {
	name: string;
	artists: SpotifyArtist[];
	album: SpotifyAlbum;
	preview_url: string | null;
	external_urls: SpotifyExternalUrls;
}

interface SpotifyCurrentlyPlayingResponse {
	is_playing: boolean;
	item: SpotifyTrackItem;
}

interface SpotifyTopTracksResponse {
	items: SpotifyTrackItem[];
}

interface SpotifyRecentlyPlayedItem {
	track: SpotifyTrackItem;
	played_at: string;
}

interface SpotifyRecentlyPlayedResponse {
	items: SpotifyRecentlyPlayedItem[];
}

export interface SpotifyTrack {
	name: string;
	artist: string;
	album: string;
	albumArt?: string;
	playedAt?: string;
	songUrl?: string;
}

export interface SpotifyCurrentlyPlaying extends SpotifyTrack {
	isPlaying: boolean;
}

export const getAccessToken = async () => {
	const basic = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);

	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: SPOTIFY_REFRESH_TOKEN
		})
	});

	return response.json() as Promise<SpotifyTokenResponse>;
};

function timeAgo(timestamp: string): string {
	const now = Date.now();
	const played = new Date(timestamp).getTime();
	const diff = now - played;

	const minutes = Math.floor(diff / 60000);
	const hours = Math.floor(diff / 3600000);
	const days = Math.floor(diff / 86400000);

	if (minutes < 60) return `${minutes}m ago`;
	if (hours < 24) return `${hours}h ago`;
	return `${days}d ago`;
}

export const getNowPlaying = async (): Promise<SpotifyCurrentlyPlaying | null> => {
	const { access_token } = await getAccessToken();

	const response = await fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});

	if (response.status === 204 || !response.ok) {
		return null;
	}

	const data = (await response.json()) as SpotifyCurrentlyPlayingResponse;

	if (!data.is_playing || !data.item) {
		return null;
	}

	return {
		name: data.item.name,
		artist: data.item.artists.map((a) => a.name).join(', '),
		album: data.item.album.name,
		albumArt: data.item.album.images[0]?.url,
		songUrl: data.item.external_urls.spotify,
		isPlaying: true
	};
};

export const getTopTracks = async (limit = 10): Promise<SpotifyTrack[]> => {
	const { access_token } = await getAccessToken();

	const response = await fetch(`${TOP_TRACKS_ENDPOINT}?time_range=short_term&limit=${limit}`, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});

	if (!response.ok) {
		return [];
	}

	const data = (await response.json()) as SpotifyTopTracksResponse;

	return data.items.map((track) => ({
		name: track.name,
		artist: track.artists.map((a) => a.name).join(', '),
		album: track.album.name,
		albumArt: track.album.images[2]?.url || track.album.images[0]?.url,
		songUrl: track.external_urls.spotify
	}));
};

export const getRecentlyPlayed = async (limit = 10): Promise<SpotifyTrack[]> => {
	const { access_token } = await getAccessToken();

	const response = await fetch(`${RECENTLY_PLAYED_ENDPOINT}?limit=${limit}`, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});

	if (!response.ok) {
		return [];
	}

	const data = (await response.json()) as SpotifyRecentlyPlayedResponse;

	return data.items.map((item) => ({
		name: item.track.name,
		artist: item.track.artists.map((a) => a.name).join(', '),
		album: item.track.album.name,
		albumArt: item.track.album.images[2]?.url || item.track.album.images[0]?.url,
		playedAt: timeAgo(item.played_at),
		songUrl: item.track.external_urls.spotify
	}));
};
