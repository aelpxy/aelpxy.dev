<script lang="ts">
	import { MapPinIcon } from '@lucide/svelte';
	import LangTooltip from '../components/lang-tooltip.svelte';
	import { rise } from '$lib/transitions';

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

	const camera = {
		name: 'Canon EOS R50',
		type: 'Mirrorless camera',
		designer: 'Canon',
		firstAppeared: '2023',
		paradigm: 'APS-C, 24.2MP',
		funFact: '24 megapixels of me pretending I know what I am doing.',
		logo: 'R50',
		accent: '#cc0000'
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
	<section in:rise={{ delay: 40 }}>
		<h1 class="text-[34px] leading-[1.1] font-semibold tracking-tight text-neutral-900">
			Hey, there!
		</h1>
		<p class="mt-2 text-[15.5px] text-neutral-500">
			Full-time software engineer and hobbyist photographer.
		</p>

		<p class="mt-6 text-[15.5px] leading-[1.7] text-neutral-600">
			<span class="mb-4 flex items-center gap-1.5">
				<MapPinIcon class="h-4 w-4 text-neutral-500" />
				<LangTooltip
					lang={localhost}
					label="::1"
					triggerClass="cursor-help font-mono text-[13px] tracking-tight text-neutral-500 underline decoration-dotted decoration-neutral-400 underline-offset-4 transition-colors hover:text-neutral-700 hover:decoration-neutral-700"
				/>
			</span>

			I help run
			<a
				href="https://pandabase.io"
				target="_blank"
				rel="noreferrer noopener"
				class="link-underline font-medium text-neutral-900"
			>
				Pandabase
			</a>, where we build the payment infrastructure that moves money safely from one place to
			another. Most days that means distributed systems, reliability, and a lot of staring at logs.
		</p>
		<p class="mt-4 text-[15.5px] leading-[1.7] text-neutral-600">
			I mostly write <LangTooltip lang={typescript} label="TypeScript" /> and
			<LangTooltip lang={go} label="Go" />, and I've been at this long enough that it stopped being
			a hobby and turned into work. I still love it the same either way.
		</p>
		<p class="mt-4 text-[15.5px] leading-[1.7] text-neutral-600">
			When I'm away from the keyboard I'm off traveling somewhere, shooting photos on my
			<LangTooltip lang={camera} label="camera" />, soldering something, or breaking my homelab and
			pretending it was on purpose.
		</p>
	</section>
	<!-- contact -->
	<section class="mt-16" in:rise={{ delay: 320 }}>
		<h2 class="text-[13px] font-medium tracking-tight text-neutral-500">Get in touch</h2>

		<p class="mt-5 text-[15.5px] leading-[1.7] text-neutral-600">
			You can get in touch with me via email at
			<a
				href="mailto:hey@aelpxy.dev"
				class="link-underline inline-block font-medium text-neutral-900 transition duration-200 ease-out hover:-translate-y-px"
				>hey@aelpxy.dev</a
			>. <br />
			I usually check my inbox every couple days.
		</p>
	</section>
</main>
