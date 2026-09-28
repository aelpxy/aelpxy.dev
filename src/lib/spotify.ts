const API = 'https://api.spotify.com/v1';

interface SpotifyImage {
	url: string;
}

interface SpotifyTrackItem {
	name: string;
	artists: { name: string }[];
	album: { name: string; images: SpotifyImage[] };
	external_urls: { spotify: string };
}

interface SpotifyArtistItem {
	name: string;
	images: SpotifyImage[];
	external_urls: { spotify: string };
}

export interface Track {
	name: string;
	artist: string;
	album: string;
	image?: string;
	url: string;
}

export interface Artist {
	name: string;
	image?: string;
	url: string;
}

async function getAccessToken() {
	const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = import.meta.env;

	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			Authorization: `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: SPOTIFY_REFRESH_TOKEN })
	});

	if (!response.ok) throw new Error(`spotify token request failed: ${response.status}`);
	return ((await response.json()) as { access_token: string }).access_token;
}

async function get<T>(token: string, path: string): Promise<T> {
	const response = await fetch(`${API}${path}`, { headers: { Authorization: `Bearer ${token}` } });
	if (!response.ok) throw new Error(`spotify ${path} failed: ${response.status}`);
	return response.json() as Promise<T>;
}

const toTrack = (item: SpotifyTrackItem): Track => ({
	name: item.name,
	artist: item.artists.map((a) => a.name).join(', '),
	album: item.album.name,
	image: item.album.images.at(-1)?.url,
	url: item.external_urls.spotify
});

const toArtist = (item: SpotifyArtistItem): Artist => ({
	name: item.name,
	image: item.images.at(-1)?.url,
	url: item.external_urls.spotify
});

export async function getListening({ limit = 10 } = {}) {
	const token = await getAccessToken();

	const [topTracks, topArtists] = await Promise.all([
		get<{ items: SpotifyTrackItem[] }>(token, `/me/top/tracks?time_range=short_term&limit=${limit}`),
		get<{ items: SpotifyArtistItem[] }>(token, `/me/top/artists?time_range=short_term&limit=${limit}`)
	]);

	return {
		topTracks: topTracks.items.map(toTrack),
		topArtists: topArtists.items.map(toArtist)
	};
}
