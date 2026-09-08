<script lang="ts">
	import { formatDate } from '$lib/date';
	import { getReadingTime } from '$lib/reading-time';
	import { ArrowLeftIcon, CheckIcon, LinkIcon } from '@lucide/svelte';

	let { data } = $props();

	let copied = $state(false);
	let post = $derived(data.post);
	let readingTime = $derived(getReadingTime(post.content));

	async function sharePost() {
		const url = `https://aelpxy.dev/thoughts/${post.slug}`;
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
	<title>{post.metadata.title} — aelpxy</title>
	<meta name="description" content={post.metadata.summary} />

	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://aelpxy.dev/thoughts/{post.slug}" />
	<meta property="og:title" content={post.metadata.title} />
	<meta property="og:description" content={post.metadata.summary} />
	<meta property="og:site_name" content="aelpxy" />
	<meta property="article:published_time" content={post.metadata.publishedAt} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://aelpxy.dev/thoughts/{post.slug}" />
	<meta name="twitter:title" content={post.metadata.title} />
	<meta name="twitter:description" content={post.metadata.summary} />
	<meta name="twitter:image" content="https://aelpxy.dev/og/{post.slug}.png" />

	<meta property="og:image" content="https://aelpxy.dev/og/{post.slug}.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta name="author" content="aelpxy" />
	<link rel="canonical" href="https://aelpxy.dev/thoughts/{post.slug}" />

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.metadata.title,
		description: post.metadata.summary,
		image: `https://aelpxy.dev/og/${post.slug}.png`,
		author: {
			'@type': 'Person',
			name: 'aelpxy',
			url: 'https://aelpxy.dev'
		},
		datePublished: post.metadata.publishedAt,
		url: `https://aelpxy.dev/thoughts/${post.slug}`,
		publisher: {
			'@type': 'Person',
			name: 'aelpxy',
			url: 'https://aelpxy.dev'
		}
	})}</script>`}
</svelte:head>

<main class="mx-auto max-w-xl px-6 pt-12 pb-8 sm:pt-16">
	<a
		href="/thoughts"
		data-sveltekit-preload-data
		class="inline-flex items-center gap-1.5 text-[13px] text-neutral-500 transition duration-200 ease-out hover:-translate-y-px hover:text-neutral-900"
	>
		<ArrowLeftIcon size={13} strokeWidth={2} />
		<span>Thoughts</span>
	</a>

	<article class="mt-10">
		{#if post.metadata.isDraft}
			<blockquote
				class="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-[13.5px] text-amber-900"
			>
				This article is still a work in progress.
			</blockquote>
		{:else}
			<header>
				<h1
					class="title text-[32px] leading-[1.15] font-semibold tracking-[-0.025em] text-neutral-900 sm:text-[34px]"
				>
					{post.metadata.title}
				</h1>

				<div
					class="mt-4 flex items-center justify-between gap-4 font-mono text-[12.5px] tracking-tight text-neutral-500"
				>
					<div class="flex items-center gap-2.5">
						<time datetime={post.metadata.publishedAt}>
							{formatDate(post.metadata.publishedAt)}
						</time>
						<span class="text-neutral-300">·</span>
						<span class="tabular-nums">{readingTime.text}</span>
					</div>

					<button
						onclick={sharePost}
						class="inline-flex items-center gap-1.5 text-neutral-500 transition duration-200 ease-out hover:-translate-y-px hover:text-neutral-900"
						aria-label={copied ? 'Link copied' : 'Copy link to post'}
					>
						{#if copied}
							<CheckIcon size={12.5} strokeWidth={2.25} />
							<span>Copied</span>
						{:else}
							<LinkIcon size={12.5} strokeWidth={2.25} />
							<span>Copy link</span>
						{/if}
					</button>
				</div>
			</header>

			<div class="prose mt-10">
				{@html post.content}
			</div>

			<div class="mt-16 border-t border-neutral-200 pt-6">
				<a
					href="/thoughts"
					data-sveltekit-preload-data
					class="inline-flex items-center gap-1.5 text-[13px] text-neutral-500 transition duration-200 ease-out hover:-translate-y-px hover:text-neutral-900"
				>
					<ArrowLeftIcon size={13} strokeWidth={2} />
					<span>All thoughts</span>
				</a>
			</div>
		{/if}
	</article>
</main>
