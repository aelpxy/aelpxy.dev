<script lang="ts">
	import { formatDate } from '$lib/date';
	import type { BlogPost } from '$lib/types';

	let { post }: { post: BlogPost } = $props();
</script>

<a href="/blog/{post.slug}" class="mb-4 flex flex-col space-y-1" data-sveltekit-preload-data="tap">
	<div class="flex items-center justify-between px-1 py-1">
		<span
			class="mr-2 truncate text-xl tracking-tighter text-neutral-300 underline decoration-wavy underline-offset-2"
		>
			{post.metadata.title}
		</span>
		<span class="text-sm text-neutral-400">
			{formatDate(post.metadata.publishedAt)}
		</span>
	</div>
</a>
