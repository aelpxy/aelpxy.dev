<script lang="ts">
	import Content from '$lib/../components/content.svelte';
	import BlogPostLink from '$lib/../components/blog-post-link.svelte';

	let { data } = $props();
</script>

<main>
	<Content title="whoami">
		<section class="text-md px-0 py-6 sm:py-12">
			<div class="mt-6 text-base font-light text-neutral-300 sm:text-xl">
				<p class="text-base tracking-tight">
					software and infrastructure engineer. very keen to tinker with electronics.
				</p>
				<p class="mt-2 text-base tracking-tight">
					If you ever feel like giving up, remember it's only the beginning.
				</p>
			</div>
		</section>

		<div class="py-4">
			<h1 class="text-2xl text-neutral-50 sm:text-3xl lg:text-3xl">posts</h1>
			<div class="py-6">
				{#each data.posts as post (post.slug)}
					<BlogPostLink {post} />
				{/each}
			</div>
			<a href="/blog" data-sveltekit-preload-data="tap">
				<span
					class="text-md ml-2 truncate tracking-tighter text-neutral-300 decoration-wavy hover:underline"
				>
					read all →
				</span>
			</a>
		</div>
	</Content>
</main>
