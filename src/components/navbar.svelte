<script lang="ts">
	import { page } from '$app/state';

	const links = [
		{ href: '/thoughts', label: 'Thoughts' },
		{ href: '/music', label: 'Music' }
	];

	function isActive(href: string) {
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}
</script>

<header class="select-none" style="view-transition-name: navbar;">
	<div class="mx-auto max-w-xl px-6 pt-10 sm:pt-14">
		<nav class="flex items-center justify-between">
			<a
				href="/"
				data-sveltekit-preload-data
				class="qm-magnetic text-[14px] font-medium tracking-tight text-neutral-900 hover:opacity-80"
				aria-label="aelpxy — home"
			>
				aelpxy
			</a>

			<div class="flex items-center gap-7">
				{#each links as { href, label } (href)}
					<a
						{href}
						data-active={isActive(href)}
						class="qm-active-dot qm-magnetic text-[13.5px] tracking-tight transition-colors {isActive(
							href
						)
							? 'text-neutral-900'
							: 'text-neutral-500 hover:text-neutral-900'}"
					>
						{label}
					</a>
				{/each}
			</div>
		</nav>
	</div>
</header>
