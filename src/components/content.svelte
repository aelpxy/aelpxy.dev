<script lang="ts">
	let { title, children }: { title: string; children: any } = $props();
</script>

<section class="mx-auto max-w-240 px-12 py-12 sm:px-20 sm:py-16 lg:px-40 lg:py-20">
	<h1 class="font-baskerville text-2xl text-neutral-50 sm:text-3xl lg:text-3xl">
		{title}
	</h1>
	{@render children()}
</section>
