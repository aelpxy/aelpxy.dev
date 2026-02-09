<script lang="ts">
	import {
		BoxIcon,
		CodeIcon,
		GlobeIcon,
		LayoutGridIcon,
		TerminalIcon,
		WrenchIcon
	} from '@lucide/svelte';
	import Content from '../../components/content.svelte';

	const categories = [
		{
			name: 'editor',
			icon: CodeIcon,
			items: [
				{ name: 'Zed', description: 'primary editor, fast and minimal' },
				{ name: 'VS Code', description: 'when I need extensions' }
			]
		},
		{
			name: 'terminal',
			icon: TerminalIcon,
			items: [
				{ name: 'Ghostty', description: 'fast, GPU-accelerated terminal' },
				{ name: 'Fish', description: 'shell with great defaults' },
				{ name: 'Starship', description: 'minimal, customizable prompt' },
				{ name: 'fzf', description: 'fuzzy finder for everything' },
				{ name: 'lsd', description: 'modern ls replacement' },
				{ name: 'btop', description: 'system monitor' }
			]
		},
		{
			name: 'dev tools',
			icon: WrenchIcon,
			items: [
				{ name: 'pnpm', description: 'fast, disk-efficient package manager' },
				{ name: 'Bun', description: 'fast JS runtime and bundler' },
				{ name: 'Postman', description: 'API testing' },
				{ name: 'fastfetch', description: 'system info' },
				{ name: 'brew', description: 'package manager' }
			]
		},
		{
			name: 'languages',
			icon: BoxIcon,
			items: [
				{ name: 'TypeScript', description: 'primary language' },
				{ name: 'Go', description: 'for CLI tools and backends' }
			]
		},
		{
			name: 'browser',
			icon: GlobeIcon,
			items: [
				{ name: 'Safari', description: 'primary browser' },
				{ name: 'Helium', description: 'minimal browser' }
			]
		},
		{
			name: 'apps',
			icon: LayoutGridIcon,
			items: [
				{ name: '1Password', description: 'password manager' },
				{ name: 'Notion', description: 'notes and docs' },
				{ name: 'Discord', description: 'communication' },
				{ name: 'Spotify', description: 'music' },
				{ name: 'Signal', description: 'messaging' }
			]
		}
	];
</script>

<svelte:head>
	<title>uses - aelpxy</title>
	<meta name="description" content="software, tools, and hardware that I use daily" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://aelpxy.dev/uses" />
	<meta property="og:title" content="uses - aelpxy" />
	<meta property="og:description" content="software, tools, and hardware that I use daily" />
	<meta property="og:site_name" content="aelpxy" />
	<meta property="og:image" content="https://aelpxy.dev/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://aelpxy.dev/uses" />
	<meta name="twitter:title" content="uses - aelpxy" />
	<meta name="twitter:description" content="software, tools, and hardware that I use daily" />
	<meta name="twitter:image" content="https://aelpxy.dev/og-image.png" />

	<link rel="canonical" href="https://aelpxy.dev/uses" />
</svelte:head>

<Content title="uses">
	<section class="text-md px-0 py-6 sm:py-8">
		<div class="mt-2 text-base font-light text-neutral-300 sm:text-xl">
			<p class="text-xl tracking-tight">software, tools, and hardware that I use daily.</p>
		</div>

		<div class="space-y-8 py-8">
			{#each categories as category (category.name)}
				{@const Icon = category.icon}
				<div class="space-y-3">
					<div class="flex items-center gap-2 px-1">
						<Icon size={18} class="text-neutral-400" />
						<h3 class="text-xl tracking-tighter text-neutral-100">
							{category.name}
						</h3>
					</div>

					<div class="space-y-1 px-1">
						{#each category.items as item}
							<div class="flex items-baseline gap-2">
								<span class="text-base text-neutral-100">{item.name}</span>
								<span class="text-sm text-neutral-500">— {item.description}</span>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>
</Content>
