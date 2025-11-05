<script lang="ts">
	import Content from '../../components/content.svelte';
	import { MonitorIcon, LaptopIcon, ServerIcon } from '@lucide/svelte';

	const hardware = [
		{
			name: 'desktop-pc',
			type: 'primary and gaming machine',
			icon: MonitorIcon,
			specs: [
				'AMD Ryzen 7 7800X3D',
				'32GB @ 6000MHz',
				'1x 1TB NVMe SSD',
				'2x 512GB NVMe SSD',
				'Sapphire Nitro+ RX 9070 XT'
			]
		},
		{
			name: 'macbook-air',
			type: 'coding a lot lately on this',
			icon: LaptopIcon,
			specs: ['M4 Air @ 16GB', '256GB Storage']
		},
		{
			name: 'dev-machine',
			type: 'i just ssh into this and code',
			icon: ServerIcon,
			specs: ['AMD Ryzen 7 5700X', '32GB @ 3200MHz', 'RTX 3050 8GB', '2x 128GB NVMe SSDs']
		},
		{
			name: 'az-blue',
			type: 'server',
			icon: ServerIcon,
			specs: ['Intel Core i5-10400', '16GB RAM', '480GB SATA SSD']
		},
		{
			name: 'az-yellow',
			type: 'raspberry pi',
			icon: ServerIcon,
			specs: ['Raspberry Pi 4B', '4GB RAM', '128GB Storage']
		}
	];
</script>

<svelte:head>
	<title>fleet - aelpxy</title>
	<meta name="description" content="my collection of machines that keep everything running" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://aelpxy.dev/specs" />
	<meta property="og:title" content="fleet - aelpxy" />
	<meta
		property="og:description"
		content="my collection of machines that keep everything running"
	/>
	<meta property="og:site_name" content="aelpxy" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:url" content="https://aelpxy.dev/specs" />
	<meta name="twitter:title" content="fleet - aelpxy" />
	<meta
		name="twitter:description"
		content="my collection of machines that keep everything running"
	/>

	<link rel="canonical" href="https://aelpxy.dev/specs" />
</svelte:head>

<Content title="fleet">
	<section class="px-0 py-6 sm:py-12">
		<p class="mb-8 text-base text-neutral-300">
			my collection of machines that keep everything running.
		</p>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
			{#each hardware as machine (machine.name)}
				{@const Icon = machine.icon}
				<div
					class="rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/70"
				>
					<div class="mb-4">
						<div class="flex items-center gap-2">
							<Icon size={20} class="text-neutral-400" />
							<h3 class="text-xl font-medium text-neutral-100">
								<code>{machine.name}</code>
							</h3>
						</div>
						<p class="mt-2 text-sm text-neutral-400">{machine.type}</p>
					</div>

					<ul class="space-y-2">
						{#each machine.specs as spec}
							<li class="flex items-start text-sm text-neutral-300">
								<span class="mr-2 text-neutral-500">→</span>
								<span>{spec}</span>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>
</Content>
