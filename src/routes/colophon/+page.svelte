<script lang="ts">
	import {
		CodeIcon,
		PaletteIcon,
		DatabaseIcon,
		ServerIcon,
		TypeIcon,
		PackageIcon
	} from '@lucide/svelte';
	import Content from '../../components/content.svelte';

	const sections = [
		{
			name: 'framework',
			icon: CodeIcon,
			items: [
				{ name: 'SvelteKit', description: 'full-stack framework' },
				{ name: 'Svelte 5', description: 'with runes for reactivity' },
				{ name: 'TypeScript', description: 'type safety throughout' },
				{ name: 'Vite', description: 'build tooling' }
			]
		},
		{
			name: 'styling',
			icon: PaletteIcon,
			items: [
				{ name: 'Tailwind CSS v4', description: 'utility-first styling' },
				{ name: 'View Transitions API', description: 'smooth page transitions' }
			]
		},
		{
			name: 'typography',
			icon: TypeIcon,
			items: [
				{ name: 'EB Garamond', description: 'headings and nav' },
				{ name: 'Inter', description: 'body text' },
				{ name: 'JetBrains Mono', description: 'code blocks' }
			]
		},
		{
			name: 'content',
			icon: DatabaseIcon,
			items: [
				{ name: 'Notion API', description: 'blog posts as CMS' },
				{ name: 'mdsvex', description: 'markdown processing' },
				{ name: 'Shiki', description: 'syntax highlighting' },
				{ name: 'KaTeX', description: 'math rendering' }
			]
		},
		{
			name: 'integrations',
			icon: PackageIcon,
			items: [
				{ name: 'Spotify API', description: 'now playing and top tracks' },
				{ name: 'GitHub API', description: 'featured repositories' },
				{ name: 'Satori + Resvg', description: 'dynamic OG images' }
			]
		},
		{
			name: 'hosting',
			icon: ServerIcon,
			items: [
				{ name: 'Vercel', description: 'deployment and edge functions' },
				{ name: 'GitHub', description: 'source control' }
			]
		}
	];
</script>

<svelte:head>
	<title>colophon - aelpxy</title>
	<meta name="description" content="how this site was built" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://aelpxy.dev/colophon" />
	<meta property="og:title" content="colophon - aelpxy" />
	<meta property="og:description" content="how this site was built" />
	<meta property="og:site_name" content="aelpxy" />
	<meta property="og:image" content="https://aelpxy.dev/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://aelpxy.dev/colophon" />
	<meta name="twitter:title" content="colophon - aelpxy" />
	<meta name="twitter:description" content="how this site was built" />
	<meta name="twitter:image" content="https://aelpxy.dev/og-image.png" />

	<link rel="canonical" href="https://aelpxy.dev/colophon" />
</svelte:head>

<Content title="colophon">
	<section class="text-md px-0 py-6 sm:py-8">
		<div class="mt-2 text-base font-light text-neutral-300 sm:text-xl">
			<p class="text-xl tracking-tight">how this site was built.</p>
		</div>

		<div class="space-y-8 py-8">
			{#each sections as section (section.name)}
				{@const Icon = section.icon}
				<div class="space-y-3">
					<div class="flex items-center gap-2 px-1">
						<Icon size={18} class="text-neutral-400" />
						<h3 class="text-xl tracking-tighter text-neutral-100">
							{section.name}
						</h3>
					</div>

					<div class="space-y-1 px-1">
						{#each section.items as item}
							<div class="flex items-baseline gap-2">
								<span class="text-base text-neutral-100">{item.name}</span>
								<span class="text-sm text-neutral-500">— {item.description}</span>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-8 border-t border-neutral-800 pt-6">
			<p class="text-sm text-neutral-500">
				The source code is available on <a
					href="https://github.com/aelpxy/aelpxy.dev"
					target="_blank"
					rel="noopener noreferrer"
					class="text-neutral-400 underline decoration-neutral-600 underline-offset-2 transition-colors hover:text-neutral-300"
					>GitHub</a
				>.
			</p>
		</div>
	</section>
</Content>
