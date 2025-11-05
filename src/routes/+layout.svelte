<script lang="ts">
	import '@fontsource/inter';
	import '@fontsource-variable/jetbrains-mono';
	import '@fontsource/merriweather';
	import '../app.css';
	import Navbar from '../components/navbar.svelte';
	import Footer from '../components/footer.svelte';
	import { onNavigate } from '$app/navigation';

	let { children } = $props();

	onNavigate((navigation) => {
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
	<title>aelpxy</title>
	<meta
		name="description"
		content="software and infrastructure engineer passionate about tinkering with electronics"
	/>
	<link rel="icon" href="/favicon.png" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://aelpxy.dev/" />
	<meta property="og:title" content="aelpxy" />
	<meta
		property="og:description"
		content="software and infrastructure engineer passionate about tinkering with electronics"
	/>
	<meta property="og:site_name" content="aelpxy" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:url" content="https://aelpxy.dev/" />
	<meta name="twitter:title" content="aelpxy" />
	<meta
		name="twitter:description"
		content="software and infrastructure engineer passionate about tinkering with electronics"
	/>

	<!-- Additional Meta Tags -->
	<meta name="author" content="aelpxy" />
	<link rel="canonical" href="https://aelpxy.dev/" />
</svelte:head>

<Navbar />
{@render children()}
<Footer />
