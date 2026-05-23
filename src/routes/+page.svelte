<script lang="ts">
	import { MapPinIcon } from '@lucide/svelte';
	import LangTooltip from '../components/lang-tooltip.svelte';

	let { data } = $props();

	const typescript = {
		name: 'TypeScript',
		type: 'Programming language',
		designer: 'Microsoft',
		firstAppeared: '2012',
		paradigm: 'Multi-paradigm',
		funFact: 'JavaScript that finally went to therapy.',
		logo: '/logos/typescript.svg',
		accent: '#3178c6'
	};

	const go = {
		name: 'Go',
		type: 'Programming language',
		designer: 'Google',
		firstAppeared: '2009',
		paradigm: 'Concurrent, structural',
		funFact: 'C, but with feelings.',
		logo: '/logos/go.svg',
		accent: '#00add8'
	};

	const localhost = {
		name: '::1',
		type: 'IPv6 loopback address',
		designer: 'IETF',
		firstAppeared: '1995',
		paradigm: 'Loopback',
		funFact: "There's no place like ::1.",
		logo: '::1',
		accent: '#27272a'
	};
</script>

<svelte:head>
	<title>aelpxy</title>
	<meta name="description" content="i write software, mostly working on pandabase" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://aelpxy.dev/" />
	<meta property="og:title" content="aelpxy" />
	<meta property="og:description" content="i write software, mostly working on pandabase" />
	<meta property="og:site_name" content="aelpxy" />
	<meta property="og:image" content="https://aelpxy.dev/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://aelpxy.dev/" />
	<meta name="twitter:title" content="aelpxy" />
	<meta name="twitter:description" content="i write software, mostly working on pandabase" />
	<meta name="twitter:image" content="https://aelpxy.dev/og-image.png" />

	<link rel="canonical" href="https://aelpxy.dev/" />

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'aelpxy',
		url: 'https://aelpxy.dev',
		image: 'https://aelpxy.dev/og-image.png',
		sameAs: ['https://github.com/aelpxy', 'https://twitter.com/aelpxy'],
		jobTitle: 'Software Engineer',
		description: 'i write software, mostly working on pandabase'
	})}</script>`}
</svelte:head>

<main class="mx-auto max-w-xl px-6 pt-16 pb-8 sm:pt-20">
<!-- intro -->
<section>
	<h1 class="text-[34px] leading-[1.1] font-semibold tracking-tight text-neutral-900">
		Hey, there!
	</h1>

<p class="mt-6 text-[15.5px] leading-[1.7] text-neutral-600">
	<span class="mb-4 flex items-center gap-1.5">
		<MapPinIcon class="h-4 w-4 text-neutral-500" />
		<LangTooltip
			lang={localhost}
			label="::1"
			triggerClass="cursor-help font-mono text-[13px] tracking-tight text-neutral-500 underline decoration-dotted decoration-neutral-400 underline-offset-4 transition-colors hover:text-neutral-700 hover:decoration-neutral-700"
		/>
	</span>

	Co-founder and CTO of
	<a
		href="https://pandabase.io"
		target="_blank"
		rel="noreferrer noopener"
		class="link-underline font-medium text-neutral-900"
	>
		Pandabase
	</a>, where we build payment infrastructure. Off the clock, I'm usually fighting
	a server somewhere. Winning sometimes, losing more often.
</p>
	<p class="mt-4 text-[15.5px] leading-[1.7] text-neutral-600">
		Favorite languages are
		<LangTooltip lang={typescript} label="TypeScript" /> and
		<LangTooltip lang={go} label="Go" />. Been writing both for 5+ years and most
		of what I do is in distributed systems.
	</p>
</section>
	<!-- projects -->
	<section class="mt-16">
		<h2 class="text-[13px] font-medium tracking-tight text-neutral-500">Projects</h2>

		<ul class="mt-5 space-y-1">
			{#each data.repos as repo (repo.id)}
				<li>
					<a
						href={repo.html_url}
						target="_blank"
						rel="noopener noreferrer"
						class="group -mx-2 flex items-baseline justify-between gap-4 px-2 py-2.5 rounded-md transition-colors duration-200 ease-out hover:bg-[rgb(var(--hover))]"
					>
						<span class="min-w-0 flex-1">
							<span class="text-[14.5px] tracking-tight text-neutral-900">
								{repo.name}
								<span class="ml-1 inline-block -translate-x-1.5 -rotate-6 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:rotate-0 group-hover:opacity-100 text-neutral-400">→</span>
							</span>
							{#if repo.description}
								<span class="mt-1 block truncate text-[13px] leading-snug text-neutral-500">
									{repo.description}
								</span>
							{/if}
						</span>
						<span
							class="flex items-center gap-3 font-mono text-[12.5px] tracking-tight whitespace-nowrap text-neutral-500"
						>
							{#if repo.language}
								<span>{repo.language}</span>
							{/if}
							{#if repo.stargazers_count > 0}
								<span class="tabular-nums">{repo.stargazers_count}★</span>
							{/if}
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>

	<!-- contact -->
	<section class="mt-16">
		<h2 class="text-[13px] font-medium tracking-tight text-neutral-500">Get in touch</h2>

		<p class="mt-5 text-[15.5px] leading-[1.7] text-neutral-600">
			You can get in touch with me via email at
			<a
				href="mailto:hey@aelpxy.dev"
				class="link-underline inline-block font-medium text-neutral-900 transition duration-200 ease-out hover:-translate-y-px"
				>hey@aelpxy.dev</a
			>. <br>
			I usually check my inbox every couple days.
		</p>
	</section>
</main>
