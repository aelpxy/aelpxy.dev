<script lang="ts">
	import { page } from '$app/state';

	const navData = [
		{
			name: 'home',
			href: '/'
		},
		{
			name: 'blog',
			href: '/blog'
		}
	];
</script>

<div class="sticky top-0 z-10 select-none">
	<div class="mx-auto max-w-304 select-none lg:px-32">
		<div
			class="bg-opacity-30 flex w-full items-center justify-between border border-neutral-800 bg-neutral-900/10 px-6 py-4 backdrop-blur-sm backdrop-filter"
		>
			<div>
				<div class="flex select-none lg:flex-1">
					<a href="/" data-sveltekit-preload-data="tap">
						<div class="-m-1.5 p-1.5">
							<span class="sr-only">aelpxy</span>
							<img
								class="h-12 w-auto border-neutral-600"
								src="/favicon.png"
								alt="Icon"
								width="96"
								height="96"
								loading="eager"
								fetchpriority="high"
							/>
						</div>
					</a>
				</div>
			</div>
			<div>
				{#each navData as link (link.name)}
					<a href={link.href} class="px-2.5" data-sveltekit-preload-data="tap">
						<code
							class="px-1.5 py-1 transition-all ease-in-out {page.url.pathname === link.href
								? 'text-neutral-100 underline decoration-wavy'
								: 'text-neutral-400 decoration-wavy hover:underline'}"
						>
							{link.name}
						</code>
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>
