<script>
	import { siteDescription } from '#lib/config.js';
	let { data } = $props();
	let { uniqueCategories } = $derived(data);
</script>

<svelte:head>
	<title>Blog | Categories</title>
	<meta data-key="description" name="description" content={siteDescription} />
</svelte:head>

<div class="compressed-content">
	<h1 class="h2">All blog categories</h1>

	<ul>
		{#each uniqueCategories as category (category.title)}
			<li>
				<a href="/blog/category/{category.title}">
					{category.title}
				</a>
				({category.count})
			</li>
		{/each}
	</ul>
</div>
