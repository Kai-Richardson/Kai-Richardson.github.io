<script>
	import MainNav from './MainNav.svelte';
	import { siteAuthor, siteLink } from '$lib/config';
</script>

<footer>
	<MainNav />

	<nav>
		<ul>
			<li>
				<a href="/api/rss.xml" data-sveltekit-reload>RSS</a>
			</li>
			<li>
				<a href="/">Home</a>
			</li>
			<li>
				<a href={siteLink}>Source</a>
			</li>
		</ul>
	</nav>

	<p>
		&copy;{new Date().getFullYear()}
		{siteAuthor}
	</p>
</footer>
