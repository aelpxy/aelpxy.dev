<script lang="ts">
	import { ClockIcon, CalendarIcon, ExternalLinkIcon } from '@lucide/svelte';

	import Content from '../../components/content.svelte';
	import NowPlaying from '../../components/now-playing.svelte';

	let { data } = $props();
	const { topTracks, recentTracks } = data;
</script>

<svelte:head>
	<title>music - aelpxy</title>
	<meta name="description" content="what i'm listening to on spotify" />
	<meta name="robots" content="noindex, nofollow" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://aelpxy.dev/music" />
	<meta property="og:title" content="music - aelpxy" />
	<meta property="og:description" content="what i'm listening to on spotify" />
	<meta property="og:site_name" content="aelpxy" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:url" content="https://aelpxy.dev/music" />
	<meta name="twitter:title" content="music - aelpxy" />
	<meta name="twitter:description" content="what i'm listening to on spotify" />

	<link rel="canonical" href="https://aelpxy.dev/music" />
</svelte:head>

<Content title="music">
	<section class="text-md px-0 py-6 sm:py-8">
		<div class="mt-2 text-base font-light text-neutral-300 sm:text-xl">
			<p class="text-xl tracking-tight">what i'm listening to on spotify.</p>
		</div>

		<div class="space-y-8 py-8">
			<NowPlaying />

			{#if topTracks && topTracks.length > 0}
				<div class="space-y-3">
					<div class="flex items-center gap-2 px-1">
						<CalendarIcon size={18} class="text-neutral-400" />
						<h3 class="text-xl tracking-tighter text-neutral-100">top tracks</h3>
						<span class="text-sm text-neutral-500">/ last 4 weeks</span>
					</div>

					<div class="space-y-0.5">
						{#each topTracks as track, index}
							<div
								class="group flex items-center gap-2 rounded border border-transparent px-1.5 py-1.5 transition-colors hover:border-neutral-800 hover:bg-neutral-900/30"
							>
								<span class="w-5 text-right text-sm text-neutral-600">{index + 1}. </span>
								{#if track.albumArt}
									<img src={track.albumArt} alt={track.album} class="h-8 w-8 rounded" />
								{/if}
								<div class="min-w-0 flex-1">
									<p class="truncate text-sm text-neutral-100">
										{track.name} <span class="text-neutral-500">by</span>
										<span class="text-neutral-400">{track.artist}</span>
									</p>
								</div>
								{#if track.songUrl}
									<a
										href={track.songUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="flex items-center gap-1 rounded bg-neutral-800/50 px-2.5 py-1 text-xs text-neutral-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-neutral-800 hover:text-neutral-300"
									>
										<span>open</span>
										<ExternalLinkIcon size={11} />
									</a>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/if}

			{#if recentTracks && recentTracks.length > 0}
				<div class="space-y-3">
					<div class="flex items-center gap-2 px-1">
						<ClockIcon size={18} class="text-neutral-400" />
						<h3 class="text-xl tracking-tighter text-neutral-100">recently played</h3>
					</div>

					<div class="space-y-0.5">
						{#each recentTracks as track}
							<div
								class="group flex items-center gap-2 rounded border border-transparent px-1.5 py-1.5 transition-colors hover:border-neutral-800 hover:bg-neutral-900/30"
							>
								{#if track.albumArt}
									<img src={track.albumArt} alt={track.album} class="h-8 w-8 rounded" />
								{/if}
								<div class="min-w-0 flex-1">
									<p class="truncate text-sm text-neutral-100">
										{track.name} <span class="text-neutral-500">by</span>
										<span class="text-neutral-400">{track.artist}</span>
									</p>
								</div>
								<div class="flex items-center gap-1.5">
									{#if track.playedAt}
										<span class="text-xs text-neutral-600">{track.playedAt}</span>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</section>
</Content>
