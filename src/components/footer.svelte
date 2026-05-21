<script lang="ts">
	const year = new Date().getFullYear();

	const links = [
		{ href: 'mailto:hi@aelpxy.dev', label: 'Email' },
		{ href: 'https://github.com/aelpxy', label: 'GitHub' },
		{ href: 'https://twitter.com/aelpxy', label: 'Twitter' }
	];
</script>

<footer class="mx-auto mt-24 mb-12 max-w-xl px-6 sm:mt-32" style="view-transition-name: footer;">
	<div
		class="flex flex-col items-start justify-between gap-3 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center"
	>
		<span class="text-[13px] text-neutral-500">
			© {year} aelpxy
		</span>

		<div class="flex items-center gap-5">
			{#each links as { href, label } (label)}
				<a
					{href}
					rel="noreferrer noopener"
					target={href.startsWith('http') ? '_blank' : undefined}
					class="link-underline inline-block text-[13px] text-neutral-500 transition duration-200 ease-out hover:-translate-y-px hover:text-neutral-900"
				>
					{label}
				</a>
			{/each}
		</div>
	</div>
</footer>
