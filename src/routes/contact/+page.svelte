<script>
	import Callout from '$lib/components/Callout.svelte';
	import { LogoGithub, LogoInstagram, LogoLinkedin } from 'svelte-ionicons';
</script>

<svelte:head>
	<title>Contact</title>
</svelte:head>

<h1>Contact</h1>

I am on a few websites:
<ul>
	<li>
		<a href="https://github.com/Kai-Richardson" target="_blank" rel="noreferrer">
			<LogoGithub /> Kai-Richardson
		</a>
	</li>
	<li>
		<a href="https://linkedin.com/in/kairichardson" target="_blank" rel="noreferrer">
			<LogoLinkedin /> kairichardson
		</a>
	</li>
	<li>
		<a href="https://instagram.com/pieguykai" target="_blank" rel="noreferrer">
			<LogoInstagram /> pieguykai
		</a>
	</li>
</ul>

<Callout>
	Or, feel free to email me at
	<a href="mailto:kairichardson@gmail.com">kai.richardson@gmail.com</a>
</Callout>
