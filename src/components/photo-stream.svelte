<script lang="ts">
	import type { Photo } from '$lib/photos';
	import { cld, cldSrcset, cldBlur } from '$lib/cloudinary';
	import { loadedFade } from '$lib/actions/loaded-fade';

	let {
		photos,
		onOpen
	}: {
		photos: Photo[];
		onOpen: (i: number) => void;
	} = $props();

	type Item = { p: Photo; index: number };

	type Block =
		| { kind: 'solo'; photo: Item }
		| { kind: 'pair'; photos: Item[] }
		| { kind: 'triple-llp'; photos: Item[] }
		| { kind: 'triple-pll'; photos: Item[] };

	function orient(p: Photo): 'l' | 'p' {
		return p.width >= p.height ? 'l' : 'p';
	}

	function aspectH(p: Photo): number {
		// Height of the photo if its width is normalized to 1.
		return p.height / p.width;
	}

	// Proportional gap relative to one column width. Matches the gap-1
	// (4px) we render with in a ~250px column on desktop.
	const GAP = 0.015;

	// Cost of laying out a block. Lower is better. The DP picks the layout
	// (across the entire album) that minimizes the total cost.
	function blockCost(kind: Block['kind'], photos: Photo[]): number {
		switch (kind) {
			case 'solo':
				// Small bias against solos so the DP prefers grouping when reasonable.
				return 0.15;
			case 'pair': {
				// Two photos side by side keep their own aspect ratios; no cropping.
				// We penalize big height differences mildly so balanced pairs are preferred.
				const h1 = aspectH(photos[0]);
				const h2 = aspectH(photos[1]);
				const imbalance = Math.abs(h1 - h2) / Math.max(h1, h2);
				return 0.2 + imbalance * 0.3;
			}
			case 'triple-llp':
			case 'triple-pll': {
				// Right (or left) portrait is forced to fill the height of the
				// stacked-landscape column via object-cover. Cost = how much it has
				// to be cropped.
				const [l1, l2, p] =
					kind === 'triple-llp'
						? [photos[0], photos[1], photos[2]]
						: [photos[1], photos[2], photos[0]];
				const stackH = aspectH(l1) + aspectH(l2) + GAP;
				const portraitH = aspectH(p);
				const mismatch = Math.abs(stackH - portraitH) / Math.max(stackH, portraitH);
				// Triple is the prettiest layout when it fits — base cost lower than
				// solo, plus the mismatch term. A perfect triple costs ~0.
				return mismatch * 1.4;
			}
		}
	}

	function planLayout(photos: Photo[]): Block[] {
		const n = photos.length;
		if (n === 0) return [];

		type Choice = { kind: Block['kind']; consume: number };
		type Cell = { cost: number; choice: Choice | null };

		const dp: Cell[] = new Array(n + 1);
		dp[n] = { cost: 0, choice: null };

		for (let i = n - 1; i >= 0; i--) {
			const options: Cell[] = [];

			options.push({
				cost: blockCost('solo', [photos[i]]) + dp[i + 1].cost,
				choice: { kind: 'solo', consume: 1 }
			});

			if (i + 2 <= n) {
				options.push({
					cost: blockCost('pair', photos.slice(i, i + 2)) + dp[i + 2].cost,
					choice: { kind: 'pair', consume: 2 }
				});
			}

			if (
				i + 3 <= n &&
				orient(photos[i]) === 'l' &&
				orient(photos[i + 1]) === 'l' &&
				orient(photos[i + 2]) === 'p'
			) {
				options.push({
					cost: blockCost('triple-llp', photos.slice(i, i + 3)) + dp[i + 3].cost,
					choice: { kind: 'triple-llp', consume: 3 }
				});
			}

			if (
				i + 3 <= n &&
				orient(photos[i]) === 'p' &&
				orient(photos[i + 1]) === 'l' &&
				orient(photos[i + 2]) === 'l'
			) {
				options.push({
					cost: blockCost('triple-pll', photos.slice(i, i + 3)) + dp[i + 3].cost,
					choice: { kind: 'triple-pll', consume: 3 }
				});
			}

			dp[i] = options.reduce((a, b) => (a.cost <= b.cost ? a : b));
		}

		const indexed: Item[] = photos.map((p, i) => ({ p, index: i }));
		const blocks: Block[] = [];
		let i = 0;
		while (i < n) {
			const choice = dp[i].choice!;
			if (choice.kind === 'solo') {
				blocks.push({ kind: 'solo', photo: indexed[i] });
			} else if (choice.kind === 'pair') {
				blocks.push({ kind: 'pair', photos: indexed.slice(i, i + 2) });
			} else if (choice.kind === 'triple-llp') {
				blocks.push({ kind: 'triple-llp', photos: indexed.slice(i, i + 3) });
			} else if (choice.kind === 'triple-pll') {
				blocks.push({ kind: 'triple-pll', photos: indexed.slice(i, i + 3) });
			}
			i += choice.consume;
		}
		return blocks;
	}

	const blocks = $derived(planLayout(photos));
	const thumbWidths = [400, 600, 900, 1200, 1600];
</script>

{#snippet tile(item: Item, tallOnDesktop = false)}
	<button
		type="button"
		onclick={() => onOpen(item.index)}
		style="aspect-ratio: {item.p.width}/{item.p.height}; background-image: url({cldBlur(
			item.p.id
		)});"
		class="group relative block w-full cursor-zoom-in overflow-hidden bg-cover bg-center [contain-intrinsic-size:auto_400px] [content-visibility:auto] {tallOnDesktop
			? 'md:aspect-auto! md:h-full'
			: ''}"
		aria-label={item.p.alt || `Open photo ${item.index + 1}`}
	>
		<img
			use:loadedFade
			src={cld(item.p.id, { width: 800 })}
			srcset={cldSrcset(item.p.id, thumbWidths)}
			sizes="(min-width: 768px) 45vw, 92vw"
			alt={item.p.alt ?? ''}
			loading="lazy"
			decoding="async"
			class="block h-full w-full object-cover opacity-0 transition-opacity duration-700 ease-out [&.loaded]:opacity-100"
		/>
	</button>
{/snippet}

<div class="flex flex-col gap-1">
	{#each blocks as block, bi (bi)}
		{#if block.kind === 'solo'}
			{@render tile(block.photo)}
		{:else if block.kind === 'pair'}
			<div class="grid grid-cols-1 gap-1 md:grid-cols-2">
				{@render tile(block.photos[0])}
				{@render tile(block.photos[1], true)}
			</div>
		{:else if block.kind === 'triple-llp'}
			<div class="grid grid-cols-1 gap-1 md:grid-cols-2">
				<div class="grid grid-cols-1 gap-1">
					{@render tile(block.photos[0])}
					{@render tile(block.photos[1])}
				</div>
				{@render tile(block.photos[2], true)}
			</div>
		{:else if block.kind === 'triple-pll'}
			<div class="grid grid-cols-1 gap-1 md:grid-cols-2">
				{@render tile(block.photos[0], true)}
				<div class="grid grid-cols-1 gap-1">
					{@render tile(block.photos[1])}
					{@render tile(block.photos[2])}
				</div>
			</div>
		{/if}
	{/each}
</div>
