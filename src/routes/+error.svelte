<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>{page.status} — aelpxy</title>
</svelte:head>

<main class="mx-auto max-w-md px-6 pt-24 pb-16">
	<h1 class="text-2xl font-semibold tracking-tight">{page.status}</h1>
	<p class="mt-4 text-[var(--muted)]">{page.error?.message ?? 'Something went wrong.'}</p>
	<a
		href={resolve('/')}
		class="mt-8 inline-block text-sm text-[var(--muted)] underline underline-offset-4"
	>
		back home
	</a>
</main>
