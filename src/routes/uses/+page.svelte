<script lang="ts">
	import Content from '../../components/content.svelte';

	type Item = { name: string; note?: string };
	type Group = { heading: string; items: Item[] };

	const groups: Group[] = [
		{
			heading: 'Desktop',
			items: [
				{ name: 'AMD Ryzen 7 7800X3D' },
				{ name: 'AMD Radeon RX 9070 XT' },
				{ name: '32 GB DDR5' },
				{ name: '1 TB + 2 × 500 GB NVMe' },
				{ name: 'ASUS TUF Gaming VG27UQ1A', note: '27", 4K, 160 Hz' },
				{ name: 'BenQ GW2490', note: '24", 1080p, 100 Hz, vertical' },
				{ name: 'Logitech G502 HERO' },
				{ name: 'Royal Kludge RK81' },
				{ name: 'DualSense Wireless Controller' }
			]
		},
		{
			heading: 'Laptop',
			items: [{ name: 'MacBook Air (M4)' }]
		},
		{
			heading: 'Phones and wearables',
			items: [
				{ name: 'iPhone 17' },
				{ name: 'Google Pixel 7 Pro', note: 'Running GrapheneOS' },
				{ name: 'Apple Watch Series 10' },
				{ name: 'iPad (A16)', note: 'The lazy device. Video in bed, mostly.' }
			]
		},
		{
			heading: 'Audio',
			items: [
				{ name: 'HyperX Cloud Stinger 2' },
				{ name: 'Sony WH-1000XM6' },
				{ name: 'AirPods Pro 2' }
			]
		},
		{
			heading: 'Power',
			items: [
				{ name: 'EcoFlow DELTA 3' },
				{ name: 'Anker Zolo 140W' },
				{ name: 'Anker and UGREEN power banks' }
			]
		},
		{
			heading: 'Operating systems',
			items: [{ name: 'Fedora Linux' }, { name: 'macOS' }, { name: 'GrapheneOS' }]
		},
		{
			heading: 'Software',
			items: [
				{ name: 'Visual Studio Code' },
				{ name: 'Zed' },
				{ name: 'Ghostty' },
				{ name: 'fish shell' },
				{ name: 'JetBrainsMono Nerd Font' },
				{ name: 'Helium Browser' },
				{ name: 'Safari' },
				{ name: 'Mullvad Browser' },
				{ name: 'Mullvad VPN' },
				{ name: '1Password' },
				{ name: 'Claude' },
				{ name: 'Claude Code' },
				{ name: 'Discord' },
				{ name: 'Signal' },
				{ name: 'Spotify' },
				{ name: 'Apple Music' }
			]
		},
		{
			heading: 'Languages',
			items: [{ name: 'TypeScript' }, { name: 'Go' }]
		},
		{
			heading: 'Travel',
			items: [
				{ name: 'Skyscanner' },
				{ name: 'Expedia' },
				{ name: 'Airbnb' },
				{ name: 'Booking.com' }
			]
		}
	];
</script>

<svelte:head>
	<title>uses — aelpxy</title>
	<meta name="description" content="hardware and software i actually use" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://aelpxy.dev/uses" />
	<meta property="og:title" content="uses — aelpxy" />
	<meta property="og:description" content="hardware and software i actually use" />
	<meta property="og:site_name" content="aelpxy" />
	<meta property="og:image" content="https://aelpxy.dev/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://aelpxy.dev/uses" />
	<meta name="twitter:title" content="uses — aelpxy" />
	<meta name="twitter:description" content="hardware and software i actually use" />
	<meta name="twitter:image" content="https://aelpxy.dev/og-image.png" />

	<link rel="canonical" href="https://aelpxy.dev/uses" />
</svelte:head>

<Content title="Uses" subtitle="The hardware and software I use day to day.">
	<div class="mt-12 space-y-12">
		{#each groups as group (group.heading)}
			<section>
				<h2 class="text-[13px] font-medium tracking-tight text-neutral-500">
					{group.heading}
				</h2>
				<ul class="mt-5 space-y-1">
					{#each group.items as item (item.name)}
						<li
							class="-mx-2 flex flex-col items-start gap-1 rounded-md px-2 py-2.5 transition-colors duration-200 ease-out hover:bg-[rgb(var(--hover))] sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
						>
							<span class="text-[14.5px] tracking-tight text-neutral-900">
								{item.name}
							</span>
							{#if item.note}
								<span class="text-[12.5px] leading-snug text-neutral-500 sm:text-right">
									{item.note}
								</span>
							{/if}
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</Content>
