<script lang="ts">
	import { fade } from 'svelte/transition';

	type Lang = {
		name: string;
		type: string;
		designer: string;
		firstAppeared: string;
		paradigm: string;
		funFact: string;
		logo: string;
		accent: string;
	};

	let {
		lang,
		label,
		triggerClass = 'cursor-help font-medium text-neutral-900 underline decoration-dotted decoration-neutral-400 underline-offset-4 transition-colors hover:decoration-neutral-700'
	}: { lang: Lang; label: string; triggerClass?: string } = $props();

	let logoIsImage = $derived(lang.logo.startsWith('/') || lang.logo.startsWith('http'));

	let open = $state(false);
	let hideTimer: ReturnType<typeof setTimeout> | undefined;
	let wrapperRef: HTMLSpanElement | undefined = $state();

	function show() {
		if (hideTimer) clearTimeout(hideTimer);
		open = true;
	}

	function hideWithDelay() {
		if (hideTimer) clearTimeout(hideTimer);
		hideTimer = setTimeout(() => {
			open = false;
		}, 120);
	}

	function handleDocClick(e: MouseEvent) {
		if (!wrapperRef?.contains(e.target as Node)) {
			open = false;
		}
	}

	$effect(() => {
		if (open) {
			document.addEventListener('click', handleDocClick);
			return () => document.removeEventListener('click', handleDocClick);
		}
	});

	let tipId = $derived(`tip-${lang.name.toLowerCase().replace(/\s+/g, '-')}`);
</script>

<span class="relative inline-block" bind:this={wrapperRef}>
	<button
		type="button"
		aria-describedby={tipId}
		aria-expanded={open}
		onmouseenter={show}
		onmouseleave={hideWithDelay}
		onfocus={show}
		onblur={hideWithDelay}
		onclick={() => (open = !open)}
		class={triggerClass}
	>
		{label}
	</button>

	{#if open}
		<div
			id={tipId}
			role="tooltip"
			transition:fade={{ duration: 140 }}
			onmouseenter={show}
			onmouseleave={hideWithDelay}
			class="absolute bottom-full left-1/2 z-40 mb-2 w-64 -translate-x-1/2 rounded-lg border border-neutral-200 bg-[rgb(var(--bg-elev))] p-3 text-left shadow-lg shadow-black/5"
		>
			<div class="flex items-center gap-2.5 border-b border-neutral-200 pb-2.5">
				<span
					class="flex h-10 w-10 shrink-0 items-center justify-center rounded"
					style="background-color: {lang.accent}"
				>
					{#if logoIsImage}
						<img src={lang.logo} alt="{lang.name} logo" class="h-6 w-6" />
					{:else}
						<span class="font-mono text-[11px] font-semibold tracking-tight text-white">
							{lang.logo}
						</span>
					{/if}
				</span>
				<div class="min-w-0">
					<p class="text-[13px] font-semibold leading-tight text-neutral-900">{lang.name}</p>
					<p class="mt-0.5 text-[11px] text-neutral-500">{lang.type}</p>
				</div>
			</div>

			<dl class="mt-2.5 space-y-1.5 text-[11.5px]">
				<div class="flex items-baseline justify-between gap-3">
					<dt class="text-neutral-500">Designed by</dt>
					<dd class="text-right text-neutral-900">{lang.designer}</dd>
				</div>
				<div class="flex items-baseline justify-between gap-3">
					<dt class="text-neutral-500">First appeared</dt>
					<dd class="text-right tabular-nums text-neutral-900">{lang.firstAppeared}</dd>
				</div>
				<div class="flex items-baseline justify-between gap-3">
					<dt class="text-neutral-500">Paradigm</dt>
					<dd class="text-right text-neutral-900">{lang.paradigm}</dd>
				</div>
			</dl>

			<p
				class="mt-2.5 border-t border-neutral-200 pt-2 font-mono text-[10.5px] italic leading-snug text-neutral-600"
			>
				&ldquo;{lang.funFact}&rdquo;
			</p>
		</div>
	{/if}
</span>
