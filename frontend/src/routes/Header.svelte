<script lang="ts">
	import { onMount } from 'svelte';
	import logo from '$lib/images/logo.png';
	import { GenerateHtml } from '$lib/packages/GenerateHtml';

	onMount(() => {
		const hostname: string = window.location.origin;
		GenerateHtml.logo(logo, hostname);
		GenerateHtml.nav([
			{ name: 'home', icon: 'fa fa-home', url: `${hostname}/` },
			{ name: 'Choice quizz', icon: 'fa fa-home', url: `${hostname}/quizz` },
			{ name: 'Create quizz', icon: 'fa fa-home', url: `${hostname}/create_quizz` }
		]);
		// GenerateHtml.search(hostname);
	});
</script>

<header>
	logo
	<div class="header">
		<div id="logo" class="logo"></div>
	</div>
	<nav class="nav"></nav>
</header>
<div id="formSearch"></div>

<style>
</style>
