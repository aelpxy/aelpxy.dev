<script lang="ts">
	import { formatDate } from '$lib/date';
	import type { BlogPost } from '$lib/types';

	let { post }: { post: BlogPost } = $props();
</script>

<a
	href="/blog/{post.slug}"
	class="group mb-4 flex flex-col space-y-1 rounded-xs transition-all duration-200 hover:bg-neutral-900/50"
	data-sveltekit-preload-data="tap"
>
	<div class="flex items-center justify-between px-2 py-2">
		<span
			class="mr-2 truncate text-xl tracking-tighter text-neutral-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-neutral-100"
		>
			{post.metadata.title}
		</span>
		<span
			class="text-sm text-neutral-400 transition-colors duration-200 group-hover:text-neutral-300"
		>
			{formatDate(post.metadata.publishedAt)}
		</span>
	</div>
</a>
