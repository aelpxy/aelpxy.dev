<script lang="ts">
	import type { Photo } from '$lib/photos';
	import { cld, cldSrcset, cldBlur } from '$lib/cloudinary';
	import { loadedFade } from '$lib/actions/loaded-fade';

	let {
		photos,
		targetHeight = 240,
		gap = 8,
		onOpen
	}: {
		photos: Photo[];
		targetHeight?: number;
		gap?: number;
		onOpen: (i: number) => void;
	} = $props();

	let containerEl: HTMLDivElement | undefined = $state();
	let containerWidth = $state(0);

	$effect(() => {
		if (!containerEl) return;
		const ro = new ResizeObserver(([entry]) => {
			containerWidth = entry.contentRect.width;
		});
		ro.observe(containerEl);
		return () => ro.disconnect();
	});

	type RowItem = { photo: Photo; index: number; width: number; height: number };

	const rows = $derived.by<RowItem[][]>(() => {
		if (!containerWidth || photos.length === 0) return [];

		const result: RowItem[][] = [];
		let current: { photo: Photo; index: number }[] = [];
		let aspectSum = 0;

		photos.forEach((photo, index) => {
			const aspect = photo.width / photo.height;
			current.push({ photo, index });
			aspectSum += aspect;

			const naturalRowWidth = aspectSum * targetHeight + gap * (current.length - 1);

			if (naturalRowWidth >= containerWidth) {
				const availWidth = containerWidth - gap * (current.length - 1);
				const rowHeight = availWidth / aspectSum;
				result.push(
					current.map(({ photo, index }) => ({
						photo,
						index,
						width: rowHeight * (photo.width / photo.height),
						height: rowHeight
					}))
				);
				current = [];
				aspectSum = 0;
			}
		});

		// Last partial row keeps target height; don't stretch.
		if (current.length) {
			result.push(
				current.map(({ photo, index }) => ({
					photo,
					index,
					width: targetHeight * (photo.width / photo.height),
					height: targetHeight
				}))
			);
		}

		return result;
	});

	const thumbWidths = [400, 600, 800, 1200, 1600];
</script>

<div bind:this={containerEl} class="flex flex-col" style="gap: {gap}px;">
	{#each rows as row, ri (ri)}
		<div class="flex" style="gap: {gap}px;">
			{#each row as item (item.photo.id)}
				<button
					type="button"
					onclick={() => onOpen(item.index)}
					style="width: {item.width}px; height: {item.height}px; background-image: url({cldBlur(
						item.photo.id
					)});"
					class="group relative shrink-0 cursor-zoom-in overflow-hidden rounded-md bg-neutral-100 bg-cover bg-center [contain-intrinsic-size:auto_240px] [content-visibility:auto]"
					aria-label={item.photo.alt || `Open photo ${item.index + 1}`}
				>
					<img
						use:loadedFade
						src={cld(item.photo.id, { width: Math.round(item.width * 2) })}
						srcset={cldSrcset(item.photo.id, thumbWidths)}
						sizes="{Math.round(item.width)}px"
						alt={item.photo.alt ?? ''}
						loading="lazy"
						decoding="async"
						class="h-full w-full object-cover opacity-0 transition-all duration-500 ease-out group-hover:scale-[1.03] [&.loaded]:opacity-100"
					/>
				</button>
			{/each}
		</div>
	{/each}
</div>
