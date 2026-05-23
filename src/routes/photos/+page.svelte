<script lang="ts">
	import Content from '../../components/content.svelte';
	import Lightbox from '../../components/lightbox.svelte';
	import JustifiedGrid from '../../components/justified-grid.svelte';
	import type { Photo } from '$lib/photos';

	let { data } = $props();

	let activePhotos = $state<Photo[]>([]);
	let activeIndex = $state<number | null>(null);

	function open(photos: Photo[], i: number) {
		activePhotos = photos;
		activeIndex = i;
	}

	function close() {
		activeIndex = null;
	}
</script>

<svelte:head>
	<title>photos — aelpxy</title>
	<meta name="description" content="trips, places, and the occasional good shot" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://aelpxy.dev/photos" />
	<meta property="og:title" content="photos — aelpxy" />
	<meta property="og:description" content="trips, places, and the occasional good shot" />
	<meta property="og:site_name" content="aelpxy" />
	<meta property="og:image" content="https://aelpxy.dev/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://aelpxy.dev/photos" />
	<meta name="twitter:title" content="photos — aelpxy" />
	<meta name="twitter:description" content="trips, places, and the occasional good shot" />
	<meta name="twitter:image" content="https://aelpxy.dev/og-image.png" />

	<link rel="canonical" href="https://aelpxy.dev/photos" />
</svelte:head>

<Content title="Photos" subtitle="Trips, places, and the occasional good shot.">
	<div class="mt-12 space-y-20">
		{#each data.years as group (group.year)}
			<section>
				<h2 class="text-[13px] font-medium tracking-tight text-neutral-500">
					{group.year}
				</h2>

				<div class="mt-6 space-y-12">
					{#each group.albums as album (album.slug)}
						<div>
							<header class="flex items-baseline justify-between gap-4">
								<h3 class="text-[18px] font-semibold tracking-tight text-neutral-900">
									{album.title}
								</h3>
								{#if album.location}
									<span class="text-[13px] text-neutral-500">
										{album.location}
									</span>
								{/if}
							</header>

							<div class="mt-5">
								<JustifiedGrid photos={album.photos} onOpen={(i) => open(album.photos, i)} />
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/each}

		{#if data.years.length === 0}
			<p class="text-[14px] text-neutral-500">Nothing here yet.</p>
		{/if}
	</div>
</Content>

<Lightbox photos={activePhotos} bind:index={activeIndex} onClose={close} />
