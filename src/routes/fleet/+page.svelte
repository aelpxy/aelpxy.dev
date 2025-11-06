<script lang="ts">
	import { LaptopIcon, MonitorIcon, ServerIcon } from '@lucide/svelte';
	import Content from '../../components/content.svelte';

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
	<meta property="og:url" content="https://aelpxy.dev/fleet" />
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
	<section class="text-md px-0 py-6 sm:py-8">
		<div class="mt-2 text-base font-light text-neutral-300 sm:text-xl">
			<p class="text-xl tracking-tight">my collection of machines that keep everything running.</p>
		</div>

		<div class="space-y-8 py-8">
			{#each hardware as machine (machine.name)}
				{@const Icon = machine.icon}
				<div class="space-y-2">
					<div class="flex items-center gap-2 px-1">
						<Icon size={18} class="text-neutral-400" />
						<h3 class="text-xl tracking-tighter text-neutral-100">
							{machine.name}
						</h3>
						<span class="text-sm text-neutral-500">/ {machine.type}</span>
					</div>

					<ul class="space-y-1 px-1">
						{#each machine.specs as spec}
							<li class="text-base text-neutral-400">
								{spec}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>
</Content>
