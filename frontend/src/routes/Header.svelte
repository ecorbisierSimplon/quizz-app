<script lang="ts">
	import { onMount } from 'svelte';
	import logo from '$lib/images/logo.png';
	import { GenerateHtml } from '$lib/packages/GenerateHtml';
	import { hasCookie, updateCookieState } from '$lib/session';

	onMount(() => {
		updateCookieState('session');
		console.log($hasCookie);
		const hostname: string = window.location.origin;
		GenerateHtml.logo(logo, hostname);
		GenerateHtml.nav([
			{ name: 'home', icon: 'fa fa-home', url: `${hostname}/` },
			{ name: 'Choice quizz', icon: 'fa fa-home', url: `${hostname}/quizz` },
			$hasCookie
				? { name: 'Create quizz', icon: 'fa fa-home', url: `${hostname}/create_quizz` }
				: {},
			// { name: 'Login', icon: 'fa fa-home', url: `${hostname}/login` },
			// { name: 'Logout', icon: 'fa fa-home', url: `${hostname}/logout` }
			!$hasCookie ? { name: 'Login', icon: 'fa fa-home', url: `${hostname}/login` } : {},
			$hasCookie ? { name: 'Logout', icon: 'fa fa-home', url: `${hostname}/logout` } : {}
		]);
		// GenerateHtml.search(hostname);
	});
</script>

<header>
	<div class="header">
		<div id="logo" class="logo"></div>
		<nav class="nav"></nav>
	</div>
</header>
<div id="formSearch"></div>

<style>
</style>
