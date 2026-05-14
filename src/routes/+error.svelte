<script lang="ts">
	import { page } from '$app/state';

	const errorMessages: Record<number, { title: string; message: string }> = {
		404: {
			title: '404',
			message: "looks like you've wandered into the void. this page doesn't exist."
		},
		500: {
			title: '500',
			message: 'something went wrong on our end. try again in a moment.'
		},
		403: {
			title: '403',
			message: "you don't have permission to access this."
		}
	};

	const status = page.status ?? 500;
	const errorInfo = errorMessages[status] || {
		title: `${status}`,
		message: 'something unexpected happened.'
	};
	const errorMessage = page.error?.message;
</script>

<svelte:head>
	<title>{errorInfo.title} — aelpxy</title>
	<meta name="description" content={errorInfo.message} />
</svelte:head>

<main class="mx-auto max-w-2xl px-6 py-12 sm:py-16">
	<h1 class="font-garamond text-4xl tracking-tight text-neutral-900 sm:text-5xl">
		{errorInfo.title}
	</h1>
	<p class="mt-3 font-garamond text-lg leading-relaxed text-neutral-600 sm:text-xl">
		{errorInfo.message}
	</p>

	{#if errorMessage && status === 500}
		<details class="mt-8">
			<summary class="cursor-pointer text-sm text-neutral-500 hover:text-neutral-700">
				technical details
			</summary>
			<pre
				class="mt-3 overflow-x-auto rounded-md bg-neutral-100 p-4 text-sm text-neutral-700">{errorMessage}</pre>
		</details>
	{/if}

	<a
		href="/"
		data-sveltekit-preload-data="tap"
		class="mt-10 inline-block font-garamond text-base text-neutral-600 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-900 hover:decoration-neutral-600"
	>
		← back home
	</a>
</main>
