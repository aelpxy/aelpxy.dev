<script lang="ts">
	import { SearchIcon } from '@lucide/svelte';
	import Fuse from 'fuse.js';
	import { fade } from 'svelte/transition';
	import { rise } from '$lib/transitions';
	import BlogPostLink from '../../components/blog-post-link.svelte';
	import Content from '../../components/content.svelte';

	let { data } = $props();

	let searchQuery = $state('');

	let fuse = $derived(
		new Fuse(data.posts, {
			keys: [
				{ name: 'metadata.title', weight: 2 },
				{ name: 'metadata.summary', weight: 1 }
			],
			threshold: 0.3,
			ignoreLocation: true,
			minMatchCharLength: 1
		})
	);

	let filteredPosts = $derived(
		searchQuery.trim() === '' ? data.posts : fuse.search(searchQuery).map((result) => result.item)
	);
</script>

<svelte:head>
	<title>thoughts — aelpxy</title>
	<meta name="description" content="thoughts about software, infrastructure, and electronics" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://aelpxy.dev/thoughts" />
	<meta property="og:title" content="thoughts — aelpxy" />
	<meta
		property="og:description"
		content="thoughts about software, infrastructure, and electronics"
	/>
	<meta property="og:site_name" content="aelpxy" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://aelpxy.dev/thoughts" />
	<meta name="twitter:title" content="thoughts — aelpxy" />
	<meta
		name="twitter:description"
		content="thoughts about software, infrastructure, and electronics"
	/>
	<meta name="twitter:image" content="https://aelpxy.dev/og-image.png" />

	<meta property="og:image" content="https://aelpxy.dev/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta name="author" content="aelpxy" />
	<link rel="canonical" href="https://aelpxy.dev/thoughts" />
</svelte:head>

<Content title="Thoughts" subtitle="Notes on software, infrastructure, and electronics.">
	<!-- search -->
	<div class="mt-10">
		<div
			class="relative border-b border-neutral-200 transition-colors focus-within:border-neutral-900"
		>
			<SearchIcon
				size={15}
				class="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 text-neutral-400"
			/>
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search posts"
				class="w-full input-bare bg-transparent py-2.5 pr-2 pl-7 text-[14px] text-neutral-900 placeholder-neutral-400"
			/>
		</div>
		{#if searchQuery.trim() !== ''}
			<p class="mt-2 font-mono text-[12px] tracking-tight text-neutral-500">
				{filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''}
			</p>
		{/if}
	</div>

	<!-- list -->
	<section class="mt-8">
		<ul class="space-y-1">
			{#if filteredPosts.length === 0}
				<li in:fade={{ duration: 150 }} out:fade={{ duration: 100 }}>
					<p class="px-2 py-3 text-[14px] text-neutral-500">
						{searchQuery.trim() === '' ? 'Nothing here yet.' : 'No posts match that.'}
					</p>
				</li>
			{:else}
				{#each filteredPosts as post, i (post.slug)}
					<li
						in:rise={{ y: 8, blur: 3, duration: 420, delay: i * 30 }}
						out:rise={{ y: -6, blur: 2, scale: 1, duration: 140 }}
					>
						<BlogPostLink {post} />
					</li>
				{/each}
			{/if}
		</ul>
	</section>
</Content>
