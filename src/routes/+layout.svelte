<script lang="ts">
	import { onNavigate } from '$app/navigation';

	import '@fontsource-variable/eb-garamond';
	import '@fontsource-variable/inconsolata';

	import '../app.css';

	import Footer from '../components/footer.svelte';
	import Navbar from '../components/navbar.svelte';
	import CommandPalette from '../components/command-palette.svelte';

	let { children } = $props();

	onNavigate((navigation) => {
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) {
			return;
		}

		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href="/favicon.png" sizes="96x96" type="image/png" />
	<meta name="author" content="aelpxy" />
</svelte:head>

<CommandPalette />
<Navbar />
<div style="view-transition-name: main-content;">
	{@render children()}
</div>
<Footer />
