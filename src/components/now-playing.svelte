<script lang="ts">
	import type { SpotifyCurrentlyPlaying } from '$lib/spotify';

	type Props = {
		initialData?: SpotifyCurrentlyPlaying | null;
	};

	let { initialData = null }: Props = $props();
</script>

<div
	class="rounded-lg border border-neutral-200 bg-[rgb(var(--bg-elev))] p-4 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-neutral-300"
>
	{#if initialData?.isPlaying && initialData.name}
		<a
			href={initialData.songUrl}
			target="_blank"
			rel="noopener noreferrer"
			class="group flex items-center gap-4"
		>
			{#if initialData.albumArt}
				<img
					src={initialData.albumArt}
					alt={initialData.name}
					class="h-14 w-14 shrink-0 rounded"
					width="56"
					height="56"
				/>
			{/if}
			<div class="min-w-0 flex-1">
				<div class="flex items-center gap-2">
					<span class="relative flex h-1.5 w-1.5">
						<span
							class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60"
						></span>
						<span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
					</span>
					<span class="text-[11px] font-medium tracking-[0.1em] text-neutral-500 uppercase">
						Now playing
					</span>
				</div>
				<p
					class="mt-1 truncate text-[14.5px] tracking-tight text-neutral-900 decoration-neutral-300 underline-offset-2 group-hover:underline"
				>
					{initialData.name}
				</p>
				<p class="truncate text-[13px] text-neutral-500">
					{initialData.artist}
				</p>
			</div>
		</a>
	{:else}
		<div class="flex items-center gap-3">
			<span class="h-1.5 w-1.5 rounded-full bg-neutral-300"></span>
			<span class="text-[13px] text-neutral-500">Not playing anything right now.</span>
		</div>
	{/if}
</div>
