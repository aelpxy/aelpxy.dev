<script lang="ts">
	let {
		title,
		subtitle,
		children
	}: { title?: string; subtitle?: string; children: any } = $props();
</script>

<main class="mx-auto max-w-xl px-6 pt-16 pb-8 sm:pt-20">
	{#if title}
		<header class="qm-rise" style="animation-delay: 40ms;">
			<h1 class="text-[34px] font-semibold tracking-[-0.025em] text-neutral-900 leading-[1.1]">
				{title}
			</h1>
			{#if subtitle}
				<p class="mt-4 text-[15.5px] leading-[1.65] text-neutral-500">
					{subtitle}
				</p>
			{/if}
		</header>
	{/if}
	{@render children()}
</main>
