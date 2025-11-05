<script lang="ts">
	import Content from '../../components/content.svelte';
	import BlogPostLink from '../../components/blog-post-link.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Blog - aelpxy</title>
	<meta
		name="description"
		content="thoughts and writings about software engineering, infrastructure, and electronics"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://aelpxy.dev/blog" />
	<meta property="og:title" content="Blog - aelpxy" />
	<meta
		property="og:description"
		content="thoughts and writings about software engineering, infrastructure, and electronics"
	/>
	<meta property="og:site_name" content="aelpxy" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:url" content="https://aelpxy.dev/blog" />
	<meta name="twitter:title" content="Blog - aelpxy" />
	<meta
		name="twitter:description"
		content="thoughts and writings about software engineering, infrastructure, and electronics"
	/>

	<!-- Additional Meta Tags -->
	<meta name="author" content="aelpxy" />
	<link rel="canonical" href="https://aelpxy.dev/blog" />
</svelte:head>

<main>
	<Content title="ls ./blog">
		<h1 class="py-6 text-2xl text-neutral-300">things to read.</h1>
		<section class="py-6">
			<div class="flex flex-col gap-y-4">
				{#if data.posts.length === 0}
					<code class="py-6 text-2xl">nothing yet :/</code>
				{:else}
					{#each data.posts as post (post.slug)}
						<BlogPostLink {post} />
					{/each}
				{/if}
			</div>
		</section>
	</Content>
</main>
