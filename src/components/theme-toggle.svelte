<script lang="ts">
	import { MoonIcon, SunIcon } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let isDark = $state(false);
	let mounted = $state(false);

	onMount(() => {
		isDark = document.documentElement.classList.contains('dark');
		mounted = true;
	});

	let transitionTimer: ReturnType<typeof setTimeout> | undefined;

	function toggle() {
		const root = document.documentElement;

		if (transitionTimer) clearTimeout(transitionTimer);
		root.classList.add('theme-transitioning');

		isDark = !isDark;
		if (isDark) {
			root.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			root.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}

		// Boot script in app.html sets inline html styles for first paint.
		// Update them on toggle so any area outside body (overscroll, ::backdrop)
		// reflects the new theme.
		root.style.backgroundColor = isDark ? 'rgb(18, 17, 16)' : 'rgb(250, 249, 246)';
		root.style.color = isDark ? 'rgb(242, 240, 234)' : 'rgb(28, 27, 25)';
		root.style.colorScheme = isDark ? 'dark' : 'light';

		transitionTimer = setTimeout(() => {
			root.classList.remove('theme-transitioning');
		}, 350);
	}
</script>

<button
	type="button"
	onclick={toggle}
	aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
	class="inline-flex h-7 w-7 items-center justify-center rounded-md text-neutral-500 transition-colors duration-200 hover:bg-[rgb(var(--hover))] hover:text-neutral-900"
>
	{#if mounted}
		{#if isDark}
			<SunIcon size={14} strokeWidth={2} />
		{:else}
			<MoonIcon size={14} strokeWidth={2} />
		{/if}
	{/if}
</button>
