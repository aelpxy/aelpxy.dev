<script lang="ts">
	import { formatDate } from '$lib/date';
	import type { BlogPost } from '$lib/types';

	let { post }: { post: BlogPost } = $props();
</script>

<a
	href="/thoughts/{post.slug}"
	data-sveltekit-preload-data="tap"
	class="group flex items-baseline justify-between gap-4 px-2 py-2.5 -mx-2 rounded-md transition-colors duration-200 ease-out hover:bg-[rgb(var(--hover))]"
>
	<span class="min-w-0 flex-1">
		<span class="text-[14.5px] tracking-tight text-neutral-900 truncate">
			{post.metadata.title}
			<span class="ml-1 inline-block -translate-x-1.5 -rotate-6 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:rotate-0 group-hover:opacity-100 text-neutral-400">→</span>
		</span>
		{#if post.metadata.summary}
			<span class="mt-1 block truncate text-[13px] leading-snug text-neutral-500">
				{post.metadata.summary}
			</span>
		{/if}
	</span>
	<span class="text-[12.5px] tabular-nums text-neutral-500 whitespace-nowrap font-mono tracking-tight">
		{formatDate(post.metadata.publishedAt)}
	</span>
</a>
