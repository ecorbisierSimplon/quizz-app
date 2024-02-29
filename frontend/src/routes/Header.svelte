<script lang="ts">
	import { onMount } from 'svelte';
	import logo from '$lib/images/logo.png';
	import { session, sessionKey } from './session';
	import { getCookie } from 'typescript-cookie';
	let hostname: string = '';
	onMount(() => {
		hostname = window.location.origin;
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
		<div id="logo" class="logo">
			<a href={hostname}>
				<img src={logo} alt="" />
			</a>
		</div>
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
	$mobil-max: 748px;
	header {
		margin: 10px 20px;
		@media screen and (max-width: $mobil-max) {
			margin: 5px;
			margin-bottom: 15px;
		}
		.header {
			display: flex;
			max-width: 800px;
			justify-content: space-between;
			flex-wrap: nowrap;
			flex-direction: row;
			border: 5.5px solid #73778c;
			border-radius: 15px;
			padding: 15px;
			margin: 0 auto;
			@media screen and (max-width: $mobil-max) {
				padding: 5px;
			}
			.logo {
				display: flex;
				align-items: center;
				margin: auto 10px;
				@media screen and (max-width: $mobil-max) {
					margin: auto 80px;
				}
				img {
					width: 100%;
					min-width: 100px;
					max-width: 400px;
				}
			}
		}
	}
	.nav ul {
		margin: 0;
	}
</style>
