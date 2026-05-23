<script lang="ts">
	import { ChevronLeftIcon, ChevronRightIcon, XIcon } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import type { Photo } from '$lib/photos';
	import { cld, cldSrcset, cldBlur } from '$lib/cloudinary';
	import { loadedFade } from '$lib/actions/loaded-fade';
	import { portal } from '$lib/actions/portal';

	let {
		photos,
		index = $bindable(),
		onClose
	}: {
		photos: Photo[];
		index: number | null;
		onClose: () => void;
	} = $props();

	let open = $derived(index !== null);

	function prev() {
		if (index === null) return;
		index = (index - 1 + photos.length) % photos.length;
	}

	function next() {
		if (index === null) return;
		index = (index + 1) % photos.length;
	}

	function handleKey(e: KeyboardEvent) {
		if (!open) return;
		if (e.key === 'Escape') onClose();
		if (e.key === 'ArrowLeft') prev();
		if (e.key === 'ArrowRight') next();
	}

	$effect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});

	// Preload neighbors so prev/next feels instant.
	$effect(() => {
		if (index === null || photos.length <= 1) return;
		const neighbors = [
			photos[(index + 1) % photos.length],
			photos[(index - 1 + photos.length) % photos.length]
		];
		for (const p of neighbors) {
			const img = new Image();
			img.src = cld(p.id, { width: 2000 });
		}
	});
</script>

<svelte:window onkeydown={handleKey} />

{#if open && index !== null}
	{@const photo = photos[index]}
	<div
		use:portal
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
		transition:fade={{ duration: 150 }}
	>
		<button class="absolute inset-0 cursor-zoom-out" onclick={onClose} aria-label="Close"></button>

		<button
			onclick={onClose}
			class="absolute top-4 right-4 z-10 rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
			aria-label="Close"
		>
			<XIcon size={20} />
		</button>

		{#if photos.length > 1}
			<button
				onclick={prev}
				class="absolute left-4 z-10 rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
				aria-label="Previous"
			>
				<ChevronLeftIcon size={24} />
			</button>
			<button
				onclick={next}
				class="absolute right-4 z-10 rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
				aria-label="Next"
			>
				<ChevronRightIcon size={24} />
			</button>
		{/if}

		<div class="pointer-events-none relative flex h-[90vh] w-[92vw] items-center justify-center">
			{#key index}
				<div class="relative" in:fade={{ duration: 220 }} out:fade={{ duration: 160 }}>
					<img
						src={cldBlur(photo.id)}
						width={photo.width}
						height={photo.height}
						alt=""
						aria-hidden="true"
						class="block max-h-[90vh] max-w-[92vw] object-contain select-none"
						draggable="false"
					/>
					<img
						use:loadedFade
						src={cld(photo.id, { width: 2000 })}
						srcset={cldSrcset(photo.id, [1200, 1600, 2000, 2600])}
						sizes="92vw"
						alt={photo.alt ?? ''}
						width={photo.width}
						height={photo.height}
						class="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-300 select-none [&.loaded]:opacity-100"
						draggable="false"
					/>
				</div>
			{/key}
		</div>

		{#if photos.length > 1}
			<div
				class="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[12px] tracking-tight text-white/60"
			>
				{index + 1} / {photos.length}
			</div>
		{/if}
	</div>
{/if}
