<script lang="ts">
	let { data } = $props();

	const experience = [
		{ role: 'Co-founder', org: 'Pandabase', period: '2023 — Present' }
	];
</script>

<svelte:head>
	<title>aelpxy</title>
	<meta
		name="description"
		content="i write software and tinker with electronics"
	/>

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://aelpxy.dev/" />
	<meta property="og:title" content="aelpxy" />
	<meta
		property="og:description"
		content="i write software and tinker with electronics"
	/>
	<meta property="og:site_name" content="aelpxy" />
	<meta property="og:image" content="https://aelpxy.dev/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://aelpxy.dev/" />
	<meta name="twitter:title" content="aelpxy" />
	<meta
		name="twitter:description"
		content="i write software and tinker with electronics"
	/>
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
		description: 'i write software and tinker with electronics'
	})}</script>`}
</svelte:head>

<main class="mx-auto max-w-xl px-6 pt-16 pb-8 sm:pt-20">
	<!-- intro -->
	<section class="qm-rise" style="animation-delay: 40ms;">
		<h1 class="text-[34px] font-semibold tracking-[-0.025em] text-neutral-900 leading-[1.1]">
			Hey, I'm <span
				class="qm-tilt italic font-medium cursor-default"
				style="font-family: 'EB Garamond Variable', serif;"
				>aelpxy</span
			><span class="qm-caret" aria-hidden="true"></span>
		</h1>

		<p class="mt-6 text-[15.5px] leading-[1.7] text-neutral-600">
			I write software for a living and tinker with electronics and small
			servers on the side. Mostly working on
			<a
				href="https://pandabase.io"
				target="_blank"
				rel="noreferrer noopener"
				class="qm-link text-neutral-900 font-medium"
				>Pandabase</a
			> these days.
		</p>

		<p class="mt-4 text-[15.5px] leading-[1.7] text-neutral-600">
			Still learning. Always happy to chat.
		</p>
	</section>

	<!-- work -->
	<section class="mt-16 qm-rise" style="animation-delay: 120ms;">
		<h2 class="text-[13px] font-medium tracking-tight text-neutral-500">Work</h2>

		<ul class="mt-5 space-y-1">
			{#each experience as job (job.role + job.org)}
				<li
					class="qm-row flex items-baseline justify-between gap-4 px-2 py-2.5 -mx-2"
				>
					<span class="text-[14.5px] tracking-tight text-neutral-900">
						{job.role}
						<span class="mx-1 text-neutral-400">·</span>
						<span class="text-neutral-600">{job.org}</span>
					</span>
					<span
						class="text-[12.5px] tabular-nums text-neutral-500 whitespace-nowrap font-mono tracking-tight"
					>
						{job.period}
					</span>
				</li>
			{/each}
		</ul>
	</section>

	<!-- projects -->
	<section class="mt-16 qm-rise" style="animation-delay: 200ms;">
		<h2 class="text-[13px] font-medium tracking-tight text-neutral-500">Projects</h2>

		<ul class="mt-5 space-y-1">
			{#each data.repos as repo (repo.id)}
				<li>
					<a
						href={repo.html_url}
						target="_blank"
						rel="noopener noreferrer"
						class="qm-row flex items-baseline justify-between gap-4 px-2 py-2.5 -mx-2 group"
					>
						<span class="min-w-0 flex-1">
							<span class="text-[14.5px] tracking-tight text-neutral-900">
								{repo.name}
								<span class="qm-arrow ml-1 text-neutral-400">→</span>
							</span>
							{#if repo.description}
								<span
									class="mt-1 block truncate text-[13px] leading-snug text-neutral-500"
								>
									{repo.description}
								</span>
							{/if}
						</span>
						<span
							class="flex items-center gap-3 text-[12.5px] text-neutral-500 whitespace-nowrap font-mono tracking-tight"
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
	<section class="mt-16 qm-rise" style="animation-delay: 280ms;">
		<h2 class="text-[13px] font-medium tracking-tight text-neutral-500">Contact</h2>

		<p class="mt-5 text-[15.5px] leading-[1.7] text-neutral-600">
			Drop me a line at
			<a
				href="mailto:hi@aelpxy.dev"
				class="qm-link qm-magnetic text-neutral-900 font-medium"
				>hi@aelpxy.dev</a
			>. I read everything.
		</p>
	</section>
</main>
