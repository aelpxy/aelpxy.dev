<script lang="ts">
	import { GithubIcon, MailIcon } from '@lucide/svelte';

	const socialLinks = [
		{ href: 'mailto:hi@aelpxy.dev', label: 'Email', icon: MailIcon },
		{ href: 'https://github.com/aelpxy', label: 'GitHub', icon: GithubIcon }
	];
</script>

<footer
	class="mx-auto mt-2 mb-2 max-w-280 px-6 py-10 sm:px-12 sm:py-16 lg:px-32"
	style="view-transition-name: footer;"
>
	<div
		class="flex flex-col items-center justify-between space-y-4 border-t border-neutral-800 pt-6 sm:flex-row sm:space-y-0 sm:space-x-4 sm:pt-10"
	>
		<a
			rel="noreferrer noopener"
			target="_blank"
			href="https://creativecommons.org/licenses/by-sa/4.0/deed.en"
			title="https://creativecommons.org/licenses/by-sa/4.0/deed.en"
			class="mr-0 text-sm text-neutral-300 transition-transform duration-300 ease-in-out hover:text-neutral-400 sm:text-base"
		>
			© {new Date().getFullYear()} CC BY-SA 4.0 - aelpxy.dev
		</a>

		<div class="flex items-center space-x-4">
			{#each socialLinks as { href, label, icon: Icon } (label)}
				<a
					{href}
					rel="noreferrer noopener"
					target="_blank"
					aria-label={label}
					class="text-neutral-400 transition-all ease-in-out hover:text-neutral-100"
				>
					<Icon size={18} />
				</a>
			{/each}
		</div>
	</div>
</footer>
