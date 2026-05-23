<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	import Content from '../../components/content.svelte';
	import NowPlaying from '../../components/now-playing.svelte';

	let { data } = $props();

	let interval: ReturnType<typeof setInterval>;

	onMount(() => {
		interval = setInterval(() => {
			invalidate('app:now-playing');
		}, 30000);

		return () => {
			if (interval) clearInterval(interval);
		};
	});
</script>

<svelte:head>
	<title>music — aelpxy</title>
	<meta name="description" content="what i'm listening to on spotify" />
	<meta name="robots" content="noindex, nofollow" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://aelpxy.dev/music" />
	<meta property="og:title" content="music — aelpxy" />
	<meta property="og:description" content="what i'm listening to on spotify" />
	<meta property="og:site_name" content="aelpxy" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://aelpxy.dev/music" />
	<meta name="twitter:title" content="music — aelpxy" />
	<meta name="twitter:description" content="what i'm listening to on spotify" />
	<meta name="twitter:image" content="https://aelpxy.dev/og-image.png" />

	<meta property="og:image" content="https://aelpxy.dev/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<link rel="canonical" href="https://aelpxy.dev/music" />
</svelte:head>

<Content
	title="Music"
	subtitle="A look at what's been on rotation lately, pulled live from Spotify."
>
	<div class="mt-10">
		<NowPlaying initialData={data.nowPlaying} />
	</div>

	{#if data.topTracks && data.topTracks.length > 0}
		<section class="mt-12">
			<div class="flex items-baseline justify-between">
				<h2 class="text-[13px] font-medium tracking-tight text-neutral-500">Top tracks</h2>
				<span class="font-mono text-[12px] tracking-tight text-neutral-400">last 4 weeks</span>
			</div>

			<ul class="mt-5 space-y-0.5">
				{#each data.topTracks as track, i}
					<li>
						<a
							href={track.songUrl ?? '#'}
							target={track.songUrl ? '_blank' : undefined}
							rel="noopener noreferrer"
							class="group -mx-2 flex items-center gap-3 rounded-md px-2 py-2 transition-colors duration-200 ease-out hover:bg-[rgb(var(--hover))]"
						>
							<span
								class="w-5 shrink-0 text-right font-mono text-[11.5px] text-neutral-400 tabular-nums"
							>
								{String(i + 1).padStart(2, '0')}
							</span>
							{#if track.albumArt}
								<img
									src={track.albumArt}
									alt={track.album}
									class="h-9 w-9 shrink-0 rounded"
									width="36"
									height="36"
								/>
							{/if}
							<div class="min-w-0 flex-1">
								<p class="truncate text-[14px] tracking-tight text-neutral-900">
									{track.name}
									<span
										class="ml-0.5 inline-block -translate-x-1.5 -rotate-6 text-neutral-400 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:rotate-0 group-hover:opacity-100"
										>↗</span
									>
								</p>
								<p class="truncate text-[12.5px] text-neutral-500">
									{track.artist}
								</p>
							</div>
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if data.recentTracks && data.recentTracks.length > 0}
		<section class="mt-12">
			<h2 class="text-[13px] font-medium tracking-tight text-neutral-500">Recently played</h2>

			<ul class="mt-5 space-y-0.5">
				{#each data.recentTracks as track, i (i)}
					<li
						class="group -mx-2 flex items-center gap-3 rounded-md px-2 py-2 transition-colors duration-200 ease-out hover:bg-[rgb(var(--hover))]"
					>
						{#if track.albumArt}
							<img
								src={track.albumArt}
								alt={track.album}
								class="h-9 w-9 shrink-0 rounded"
								width="36"
								height="36"
							/>
						{/if}
						<div class="min-w-0 flex-1">
							<p class="truncate text-[14px] tracking-tight text-neutral-900">
								{track.name}
							</p>
							<p class="truncate text-[12.5px] text-neutral-500">
								{track.artist}
							</p>
						</div>
						{#if track.playedAt}
							<span
								class="shrink-0 font-mono text-[11.5px] tracking-tight text-neutral-400 tabular-nums"
							>
								{track.playedAt}
							</span>
						{/if}
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</Content>
