<script lang="ts">
	import { page } from '$app/state';
	import Content from '../components/content.svelte';

	const errorMessages: Record<number, { title: string; message: string }> = {
		404: {
			title: '404: not found',
			message: "looks like you've wandered into the void. this page doesn't exist."
		},
		500: {
			title: '500: internal error',
			message: 'something went wrong on our end. try again in a moment.'
		},
		403: {
			title: '403: forbidden',
			message: "you don't have permission to access this."
		}
	};

	const status = page.status ?? 500;
	const errorInfo = errorMessages[status] ||
		errorMessages[500] || {
			title: `${status}: error`,
			message: 'something unexpected happened.'
		};
	const errorMessage = page.error?.message;
</script>

<svelte:head>
	<title>{errorInfo.title} - aelpxy</title>
	<meta name="description" content={errorInfo.message} />
</svelte:head>

<Content title={errorInfo.title}>
	<section class="px-0 py-12 sm:py-16">
		<div class="text-base text-neutral-300 sm:text-lg">
			<p class="tracking-tight">{errorInfo.message}</p>

			{#if errorMessage && status === 500}
				<details class="mt-6">
					<summary class="cursor-pointer text-sm text-neutral-400 hover:text-neutral-300">
						technical details
					</summary>
					<pre
						class="mt-2 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-400">{errorMessage}</pre>
				</details>
			{/if}

			<div class="mt-8 flex gap-4">
				<a
					href="/"
					data-sveltekit-preload-data="tap"
					class="rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 text-neutral-300 transition-all duration-300 hover:bg-neutral-800 hover:text-neutral-100"
				>
					← go home
				</a>
				<a
					href="/blog"
					data-sveltekit-preload-data="tap"
					class="rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 text-neutral-300 transition-all duration-300 hover:bg-neutral-800 hover:text-neutral-100"
				>
					read blog
				</a>
			</div>
		</div>
	</section>
</Content>
