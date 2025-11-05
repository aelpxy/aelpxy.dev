<script lang="ts">
	import { onMount } from 'svelte';
	import { MusicIcon } from '@lucide/svelte';
	import { getCurrentlyPlaying } from '$lib/remote-fns/spotify.remote';

	const query = getCurrentlyPlaying();

	onMount(() => {
		const interval = setInterval(() => {
			query.refresh();
		}, 30 * 1000);
		return () => clearInterval(interval);
	});
</script>

<div
	class="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all duration-300 hover:border-neutral-700"
>
	{#if query.loading}
		<div class="flex animate-pulse items-center gap-4">
			<div class="h-16 w-16 rounded bg-neutral-800"></div>
			<div class="min-w-0 flex-1">
				<div class="mb-2 h-3 w-24 rounded bg-neutral-800"></div>
				<div class="mb-1.5 h-4 w-40 rounded bg-neutral-800"></div>
				<div class="h-3 w-32 rounded bg-neutral-800"></div>
			</div>
		</div>
	{:else if query.error}
		<div class="flex items-center gap-3">
			<MusicIcon size={16} class="text-red-500" />
			<span class="text-sm text-neutral-400">failed to load</span>
		</div>
	{:else if query.current?.data.isPlaying && query.current.data.title}
		<a
			href={query.current.data.songUrl}
			target="_blank"
			rel="noopener noreferrer"
			class="flex items-center gap-4"
		>
			{#if query.current.data.albumImageUrl}
				<img
					src={query.current.data.albumImageUrl}
					alt={query.current.data.title}
					class="h-16 w-16 rounded"
					width="64"
					height="64"
				/>
			{/if}
			<div class="min-w-0 flex-1">
				<div class="mb-1 flex items-center gap-2">
					<MusicIcon size={16} class="animate-pulse text-green-500" />
					<span class="text-xs text-neutral-400">now playing</span>
				</div>
				<p class="truncate text-sm font-medium text-neutral-100">
					{query.current.data.title}
				</p>
				<p class="truncate text-xs text-neutral-400">{query.current.data.artist}</p>
			</div>
		</a>
	{:else}
		<div class="flex items-center gap-3">
			<MusicIcon size={16} class="text-neutral-500" />
			<span class="text-sm text-neutral-400">not playing anything</span>
		</div>
	{/if}
</div>
