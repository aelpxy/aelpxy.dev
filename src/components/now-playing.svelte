<script lang="ts">
	import { MusicIcon } from '@lucide/svelte';
	import type { SpotifyCurrentlyPlaying } from '$lib/spotify';

	type Props = {
		initialData?: SpotifyCurrentlyPlaying | null;
	};

	let { initialData = null }: Props = $props();
</script>

<div
	class="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all duration-300 hover:border-neutral-700"
>
	{#if initialData?.isPlaying && initialData.name}
		<a
			href={initialData.songUrl}
			target="_blank"
			rel="noopener noreferrer"
			class="flex items-center gap-4"
		>
			{#if initialData.albumArt}
				<img
					src={initialData.albumArt}
					alt={initialData.name}
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
					{initialData.name}
				</p>
				<p class="truncate text-xs text-neutral-400">{initialData.artist}</p>
			</div>
		</a>
	{:else}
		<div class="flex items-center gap-3">
			<MusicIcon size={16} class="text-neutral-500" />
			<span class="text-sm text-neutral-400">not playing anything</span>
		</div>
	{/if}
</div>
