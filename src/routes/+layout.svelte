<script lang="ts">
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/600.css';

	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.png" sizes="96x96" type="image/png" />
	<meta name="author" content="aelpxy" />
</svelte:head>

{@render children()}
