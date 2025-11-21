<script lang="ts">
	import BlogPostLink from '$lib/../components/blog-post-link.svelte';
	import Content from '$lib/../components/content.svelte';
	import { GithubIcon } from '@lucide/svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>aelpxy</title>
	<meta
		name="description"
		content="software and infrastructure guy passionate about tinkering with electronics"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://aelpxy.dev/" />
	<meta property="og:title" content="aelpxy" />
	<meta
		property="og:description"
		content="software and infrastructure guy passionate about tinkering with electronics"
	/>
	<meta property="og:site_name" content="aelpxy" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:url" content="https://aelpxy.dev/" />
	<meta name="twitter:title" content="aelpxy" />
	<meta
		name="twitter:description"
		content="software and infrastructure guy passionate about tinkering with electronics"
	/>

	<link rel="canonical" href="https://aelpxy.dev/" />
</svelte:head>

<main>
	<Content title="about">
		<section class="text-md px-0 py-6 sm:py-8">
			<div class="mt-2 text-base font-light text-neutral-300 sm:text-xl">
				<p class="text-xl tracking-tight">
					software and infrastructure guy. very keen to tinker with electronics.
				</p>
				<p class="mt-2 text-xl tracking-tight">
					If you ever feel like giving up, remember it's only the beginning.
				</p>
			</div>

			<!-- <div class="mt-10">
				<NowPlaying />
			</div> -->
		</section>

		<div class="py-4">
			<h1 class="text-2xl text-neutral-50 sm:text-3xl lg:text-3xl">projects</h1>
			<div class="py-6">
				{#each data.repos as repo (repo.id)}
					<a
						href={repo.html_url}
						target="_blank"
						rel="noopener noreferrer"
						class="mb-4 flex flex-col space-y-1"
					>
						<div class="flex items-center justify-between px-1 py-1">
							<span
								class="mr-2 flex items-center gap-1.5 truncate text-xl tracking-tighter text-neutral-400 transition-all hover:text-neutral-100 hover:underline hover:underline-offset-2"
							>
								<GithubIcon size={18} />
								/{repo.name}
							</span>
							{#if repo.stargazers_count > 0}
								<span class="text-sm text-neutral-400">
									★ {repo.stargazers_count}
								</span>
							{/if}
						</div>
					</a>
				{/each}
			</div>
		</div>

		<div class="py-4">
			<h1 class="text-2xl text-neutral-50 sm:text-3xl lg:text-3xl">thoughts</h1>
			<div class="py-6">
				{#each data.posts as post (post.slug)}
					<BlogPostLink {post} />
				{/each}
			</div>
			<a href="/blog" data-sveltekit-preload-data>
				<span
					class="text-md ml-2 truncate tracking-tighter text-neutral-300 decoration-wavy hover:underline"
				>
					read all →
				</span>
			</a>
		</div>
	</Content>
</main>
