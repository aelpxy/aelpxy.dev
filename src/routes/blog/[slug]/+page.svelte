<script lang="ts">
	import Content from '../../../components/content.svelte';
	import { formatDate } from '$lib/date';

	let { data } = $props();
	const { post } = data;
</script>

<svelte:head>
	<title>{post.metadata.title} - aelpxy</title>
	<meta name="description" content={post.metadata.summary} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://aelpxy.dev/blog/{post.slug}" />
	<meta property="og:title" content={post.metadata.title} />
	<meta property="og:description" content={post.metadata.summary} />
	<meta property="og:site_name" content="aelpxy" />
	<meta property="article:published_time" content={post.metadata.publishedAt} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://aelpxy.dev/blog/{post.slug}" />
	<meta name="twitter:title" content={post.metadata.title} />
	<meta name="twitter:description" content={post.metadata.summary} />

	<!-- Additional Meta Tags -->
	<meta name="author" content="aelpxy" />
	<link rel="canonical" href="https://aelpxy.dev/blog/{post.slug}" />
</svelte:head>

<Content title={post.metadata.title}>
	<article class="prose">
		{#if post.metadata.isDraft}
			<blockquote>This article is still a work in progress.</blockquote>
		{:else}
			<div class="mb-8">
				<p class="text-sm text-neutral-400">
					{formatDate(post.metadata.publishedAt)}
				</p>
			</div>

			<div class="markdown-content">
				{@html post.content}
			</div>
		{/if}
	</article>
</Content>
