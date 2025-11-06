<script lang="ts">
	import BlogPostLink from '../../components/blog-post-link.svelte';
	import Content from '../../components/content.svelte';
	import { SearchIcon } from '@lucide/svelte';
	import Fuse from 'fuse.js';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let { data } = $props();

	let searchQuery = $state('');

	const fuse = new Fuse(data.posts, {
		keys: [
			{ name: 'metadata.title', weight: 2 },
			{ name: 'metadata.summary', weight: 1 }
		],
		threshold: 0.3,
		ignoreLocation: true,
		minMatchCharLength: 1
	});

	let filteredPosts = $derived(
		searchQuery.trim() === '' ? data.posts : fuse.search(searchQuery).map((result) => result.item)
	);
</script>

<svelte:head>
	<title>blog - aelpxy</title>
	<meta
		name="description"
		content="thoughts and writings about software engineering, infrastructure, and electronics"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://aelpxy.dev/blog" />
	<meta property="og:title" content="blog - aelpxy" />
	<meta
		property="og:description"
		content="thoughts and writings about software engineering, infrastructure, and electronics"
	/>
	<meta property="og:site_name" content="aelpxy" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:url" content="https://aelpxy.dev/blog" />
	<meta name="twitter:title" content="blog - aelpxy" />
	<meta
		name="twitter:description"
		content="thoughts and writings about software engineering, infrastructure, and electronics"
	/>

	<!-- Additional Meta Tags -->
	<meta name="author" content="aelpxy" />
	<link rel="canonical" href="https://aelpxy.dev/blog" />
</svelte:head>

<main>
	<Content title="blog">
		<h1 class="py-6 text-2xl text-neutral-300">opinionated thoughts</h1>

		<div class="relative mb-6">
			<div class="relative">
				<SearchIcon size={18} class="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500" />
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="search posts..."
					class="w-full rounded-lg border border-neutral-800 bg-neutral-900/50 py-2.5 pr-4 pl-10 text-sm text-neutral-300 placeholder-neutral-600 transition-colors focus:border-neutral-700 focus:ring-1 focus:ring-neutral-700 focus:outline-none"
				/>
			</div>
			{#if searchQuery.trim() !== ''}
				<p class="mt-2 text-sm text-neutral-500">
					{filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
				</p>
			{/if}
		</div>

		<section class="py-6">
			<div class="flex flex-col gap-y-4">
				{#if filteredPosts.length === 0}
					<div in:fade={{ duration: 150 }} out:fade={{ duration: 100 }}>
						<span class="py-6 text-2xl">
							{searchQuery.trim() === '' ? 'nothing yet' : 'no posts found'}
						</span>
					</div>
				{:else}
					{#each filteredPosts as post, i (post.slug)}
						<div
							in:fly={{ y: 15, duration: 250, delay: i * 30, easing: cubicOut }}
							out:fly={{ y: -10, duration: 150, easing: cubicOut }}
						>
							<BlogPostLink {post} />
						</div>
					{/each}
				{/if}
			</div>
		</section>
	</Content>
</main>
