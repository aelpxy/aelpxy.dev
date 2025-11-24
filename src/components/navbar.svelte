<script lang="ts">
	import { page } from '$app/state';

	const navData = [
		{
			name: 'about',
			href: '/'
		},
		{
			name: 'thoughts',
			href: '/thoughts'
		}
	];
</script>

<div class="sticky top-0 z-10 select-none" style="view-transition-name: navbar;">
	<div class="mx-auto max-w-304 select-none lg:px-30">
		<div
			class="flex w-full items-center justify-between border-b border-b-neutral-800 px-6 py-4"
			style="background: rgb(18, 17, 17);"
		>
			<div>
				<div class="flex select-none lg:flex-1">
					<a href="/" data-sveltekit-preload-data>
						<div class="-m-1.5 p-1.5">
							<span class="sr-only">aelpxy</span>
							<img
								class="h-12 w-auto border-neutral-600"
								src="/favicon.png"
								alt="aelpxy - Home"
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
					<a href={link.href} class="px-2.5" data-sveltekit-preload-data>
						<span
							class="px-1.5 py-1 font-garamond text-xl transition-all ease-in-out {page.url
								.pathname === link.href
								? 'text-neutral-100 underline '
								: 'text-neutral-400 decoration-wavy hover:underline'}"
						>
							{link.name}
						</span>
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>
