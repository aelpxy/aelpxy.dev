<script lang="ts">
	import { formatDate } from '$lib/date';
	import { getReadingTime } from '$lib/reading-time';
	import { ArrowLeftIcon, CheckIcon, ClockIcon, Share2Icon } from '@lucide/svelte';

	let { data } = $props();
	const { post } = data;

	let copied = $state(false);
	const readingTime = getReadingTime(post.content);

	async function sharePost() {
		const url = `https://aelpxy.dev/blog/${post.slug}`;
		const title = post.metadata.title;

		if (navigator.share) {
			try {
				await navigator.share({ title, url });
				return;
			} catch (err) {}
		}

		if (navigator.clipboard && navigator.clipboard.writeText) {
			try {
				await navigator.clipboard.writeText(url);
				copied = true;
				setTimeout(() => {
					copied = false;
				}, 2000);
				return;
			} catch (err) {}
		}

		const textArea = document.createElement('textarea');
		textArea.value = url;
		textArea.style.position = 'fixed';
		textArea.style.left = '-999999px';
		document.body.appendChild(textArea);
		textArea.select();

		try {
			document.execCommand('copy');
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('All copy methods failed', err);
		}

		document.body.removeChild(textArea);
	}
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

<section class="px-6">
	<article class="prose">
		{#if post.metadata.isDraft}
			<blockquote>This article is still a work in progress.</blockquote>
		{:else}
			<div class="mb-4">
				<a
					href="/blog"
					class="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-neutral-100"
					data-sveltekit-preload-data
				>
					<ArrowLeftIcon size={16} />
					<span>back</span>
				</a>
			</div>
			<div class="mb-8">
				<div class="flex items-center justify-between gap-4">
					<div class="flex-1">
						<h1 class="text-3xl">
							{post.metadata.title}
						</h1>
						<div class="flex items-center gap-3 text-sm text-neutral-400">
							<span>{formatDate(post.metadata.publishedAt)}</span>
							<span>•</span>
							<span class="flex items-center gap-1">
								<ClockIcon size={14} />
								{readingTime.text}
							</span>
						</div>
					</div>
					<button
						onclick={sharePost}
						class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-100"
						aria-label="Share post"
					>
						{#if copied}
							<CheckIcon size={16} />
							<span>copied!</span>
						{:else}
							<Share2Icon size={16} />
							<span>share</span>
						{/if}
					</button>
				</div>
			</div>

			<div class="markdown-content">
				{@html post.content}
			</div>
		{/if}
	</article>
</section>
