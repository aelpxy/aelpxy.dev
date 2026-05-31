<script lang="ts">
	import { page } from '$app/state';
	import ThemeToggle from './theme-toggle.svelte';
	import { rise } from '$lib/transitions';

	const links = [
		{ href: '/thoughts', label: 'Thoughts' },
		{ href: '/photos', label: 'Photos' },
		{ href: '/uses', label: 'Uses' }
	];

	function isActive(href: string) {
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}
</script>

<header class="select-none" style="view-transition-name: navbar;">
	<div class="mx-auto max-w-xl px-6 pt-10 sm:pt-14">
		<nav class="flex items-center justify-between" in:rise={{ y: -8, blur: 4, duration: 500 }}>
			<a
				href="/"
				data-sveltekit-preload-data
				class="inline-block transition duration-200 ease-out hover:-translate-y-px hover:opacity-80"
				aria-label="aelpxy — home"
			>
				<img src="/favicon.png" alt="aelpxy" class="h-8 w-8" width="32" height="32" />
			</a>

			<div class="flex items-center gap-6">
				{#each links as { href, label } (href)}
					<a
						{href}
						data-active={isActive(href)}
						class="relative inline-block text-[13.5px] tracking-tight transition duration-200 ease-out before:absolute before:top-1/2 before:-left-2.5 before:h-1 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-current before:opacity-0 before:transition-opacity before:duration-200 hover:-translate-y-px data-[active=true]:before:opacity-100 {isActive(
							href
						)
							? 'text-neutral-900'
							: 'text-neutral-500 hover:text-neutral-900'}"
					>
						{label}
					</a>
				{/each}
				<ThemeToggle />
			</div>
		</nav>
	</div>
</header>
