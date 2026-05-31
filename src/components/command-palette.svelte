<script lang="ts">
	import { goto } from '$app/navigation';
	import { HouseIcon, ImageIcon, PenLineIcon, SearchIcon, WrenchIcon } from '@lucide/svelte';
	import { fade, scale } from 'svelte/transition';
	import { appleEase } from '$lib/transitions';
	import Fuse from 'fuse.js';

	let open = $state(false);
	let search = $state('');
	let selectedIndex = $state(0);
	let inputRef: HTMLInputElement | undefined = $state();

	const commands = [
		{ name: 'Home', href: '/', icon: HouseIcon, keywords: 'about index main' },
		{ name: 'Thoughts', href: '/thoughts', icon: PenLineIcon, keywords: 'blog posts articles' },
		{
			name: 'Photos',
			href: '/photos',
			icon: ImageIcon,
			keywords: 'pictures gallery travel trips albums'
		},
		{
			name: 'Uses',
			href: '/uses',
			icon: WrenchIcon,
			keywords: 'gear hardware software setup tools'
		}
	];

	const fuse = new Fuse(commands, {
		keys: ['name', 'keywords'],
		threshold: 0.4
	});

	let filteredCommands = $derived(search ? fuse.search(search).map((r) => r.item) : commands);

	function handleKeydown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault();
			open = !open;
			search = '';
			selectedIndex = 0;
		}

		if (!open) return;

		if (e.key === 'Escape') {
			open = false;
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, filteredCommands.length - 1);
		}

		if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, 0);
		}

		if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
			e.preventDefault();
			navigate(filteredCommands[selectedIndex].href);
		}
	}

	function navigate(href: string) {
		open = false;
		search = '';
		goto(href);
	}

	function handleSearchInput() {
		selectedIndex = 0;
	}

	$effect(() => {
		if (open && inputRef) {
			inputRef.focus();
		}
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div class="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
		<button
			class="absolute inset-0 bg-black/60 backdrop-blur-sm"
			onclick={() => (open = false)}
			aria-label="Close command palette"
			transition:fade={{ duration: 180 }}
		></button>

		<div
			class="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/70 shadow-2xl ring-1 shadow-black/60 ring-white/5 backdrop-blur-2xl"
			in:scale={{ start: 0.96, opacity: 0, duration: 260, easing: appleEase }}
			out:scale={{ start: 0.98, opacity: 0, duration: 140, easing: appleEase }}
		>
			<div class="flex items-center gap-3 border-b border-white/5 px-4 py-3.5">
				<SearchIcon size={18} class="text-neutral-500" />
				<input
					type="text"
					bind:this={inputRef}
					bind:value={search}
					oninput={handleSearchInput}
					placeholder="Search..."
					class="w-full border-none bg-transparent text-base text-neutral-100 placeholder-neutral-500 shadow-none outline-none focus:border-none focus:ring-0 focus:outline-none"
				/>
				<kbd class="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-xs text-neutral-400">
					esc
				</kbd>
			</div>

			<div class="max-h-72 overflow-y-auto p-2">
				{#if filteredCommands.length === 0}
					<p class="px-3 py-4 text-center text-sm text-neutral-500">No results found</p>
				{:else}
					{#each filteredCommands as command, i (command.href)}
						{@const Icon = command.icon}
						<button
							class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-150 ease-out {i ===
							selectedIndex
								? 'bg-white/10 text-neutral-100 shadow-sm'
								: 'text-neutral-400 hover:bg-white/5 hover:text-neutral-200'}"
							onclick={() => navigate(command.href)}
							onmouseenter={() => (selectedIndex = i)}
						>
							<Icon
								size={18}
								class="transition-colors {i === selectedIndex ? 'text-neutral-100' : ''}"
							/>
							<span class="text-sm">{command.name}</span>
							<span
								class="ml-auto text-neutral-500 transition-all duration-200 ease-out {i ===
								selectedIndex
									? 'translate-x-0 opacity-100'
									: '-translate-x-1 opacity-0'}">↵</span
							>
						</button>
					{/each}
				{/if}
			</div>

			<div
				class="flex items-center justify-between border-t border-white/5 px-4 py-2.5 text-xs text-neutral-600"
			>
				<div class="flex items-center gap-2">
					<kbd class="rounded-md bg-white/10 px-1.5 py-0.5 font-mono">↑</kbd>
					<kbd class="rounded-md bg-white/10 px-1.5 py-0.5 font-mono">↓</kbd>
					<span>navigate</span>
				</div>
				<div class="flex items-center gap-2">
					<kbd class="rounded-md bg-white/10 px-1.5 py-0.5 font-mono">↵</kbd>
					<span>select</span>
				</div>
			</div>
		</div>
	</div>
{/if}
