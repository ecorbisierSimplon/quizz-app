<script lang="ts">
	import { onMount } from 'svelte';
	import logo from '$lib/images/logo.png';
	import { GenerateHtml } from '$lib/packages/GenerateHtml';
	import { session, sessionKey } from './session';
	import { getCookie } from 'typescript-cookie';

	onMount(() => {
		const hostname: string = window.location.origin;
		GenerateHtml.logo(logo, hostname);
		if (getCookie('session')) {
			session.set(true);
			sessionKey.set(getCookie('session') || '');
		} else {
			session.set(false);
			sessionKey.set('');
		}
	});
</script>

<header>
	<div class="header">
		<div id="logo" class="logo"></div>
		<nav class="nav">
			<ul>
				<li><a href="/"><i class="fa fa-home"></i> home</a></li>
				<li><a href="/quizz"><i class="fa fa-clipboard-check"></i> Choice quizz</a></li>
				{#if $session}
					<li>
						<a href="/create_quizz"><i class="fa fa-edit"></i> Create quizz</a>
					</li>
				{/if}
				{#if !$session}
					<li><a href="/register"><i class="far fa-id-card"></i> Register</a></li>
					<li><a href="/login"><i class="fa fa-user-alt"></i> Login</a></li>
				{/if}
				{#if $session}
					<li>
						<a href="/logout"><i class="fa fa-user-alt-slash"></i> Logout</a>
					</li>
				{/if}
			</ul>
		</nav>
	</div>
</header>
<div id="formSearch"></div>

<style lang="scss">
	.nav ul {
		margin: 0;
	}
</style>
