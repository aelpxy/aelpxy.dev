<script lang="ts">
	import '@fontsource/inter';
	import '@fontsource-variable/jetbrains-mono';
	import '../app.css';
	import Navbar from '../components/navbar.svelte';
	import Footer from '../components/footer.svelte';
	import { onNavigate } from '$app/navigation';

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

<Navbar />
<div style="view-transition-name: main-content;">
	{@render children()}
</div>
<Footer />
