<script lang="ts">
	import { MusicIcon } from '@lucide/svelte';
	import { onMount } from 'svelte';

	type NowPlayingData = {
		name?: string;
		artist?: string;
		album?: string;
		albumArt?: string;
		songUrl?: string;
		isPlaying?: boolean;
	};

	type ApiResponse =
		| {
				ok: true;
				data: NowPlayingData;
		  }
		| {
				ok: false;
				error: string;
		  };

	let nowPlaying = $state<NowPlayingData>({ isPlaying: false });
	let loading = $state(true);

	async function fetchNowPlaying() {
		try {
			const response = await fetch('/api/spotify/now-playing');
			const result = (await response.json()) as ApiResponse;

			console.log(result);

			if (result.ok) {
				nowPlaying = result.data;
			} else {
				console.error('Spotify error:', result.error);
				nowPlaying = { isPlaying: false };
			}
		} catch (error) {
			console.error('Error fetching now playing:', error);
			nowPlaying = { isPlaying: false };
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchNowPlaying();
		const interval = setInterval(fetchNowPlaying, 15 * 1000);
		return () => clearInterval(interval);
	});
</script>

<div
	class="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all duration-300 hover:border-neutral-700"
>
	{#if loading}
		<div class="flex animate-pulse items-center gap-4">
			<div class="h-16 w-16 rounded bg-neutral-800"></div>
			<div class="min-w-0 flex-1">
				<div class="mb-2 h-3 w-24 rounded bg-neutral-800"></div>
				<div class="mb-1.5 h-4 w-40 rounded bg-neutral-800"></div>
				<div class="h-3 w-32 rounded bg-neutral-800"></div>
			</div>
		</div>
	{:else if nowPlaying.isPlaying && nowPlaying.name}
		<a
			href={nowPlaying.songUrl}
			target="_blank"
			rel="noopener noreferrer"
			class="flex items-center gap-4"
		>
			{#if nowPlaying}
				<img
					src={nowPlaying.albumArt}
					alt={nowPlaying.name}
					class="h-16 w-16 rounded"
					width="64"
					height="64"
				/>
			{/if}
			<div class="min-w-0 flex-1">
				<div class="mb-1 flex items-center gap-2">
					<MusicIcon size={16} class="text-neutral-500" />
					<span class="text-xs text-neutral-400">now playing</span>
				</div>
				<p class="truncate text-sm font-medium text-neutral-100">
					{nowPlaying.name}
				</p>
				<p class="truncate text-xs text-neutral-400">{nowPlaying.artist}</p>
			</div>
		</a>
	{:else}
		<div class="flex items-center gap-3">
			<MusicIcon size={16} class="text-neutral-500" />
			<span class="text-sm text-neutral-400">not playing anything</span>
		</div>
	{/if}
</div>
