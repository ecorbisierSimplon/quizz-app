<script lang="ts" module>
	import type { PageData, ActionData } from './$types';
	import { getCookie, setCookie } from 'typescript-cookie';
	import { onMount } from 'svelte';
	export let data: PageData;
	export let form: ActionData;
	let isSessionActive: boolean = false;
	onMount(() => {
		if (data.login || getCookie('session') != undefined) {
			setCookie('session', data.sessionid, { expires: 10, path: '/' });
			isSessionActive = true;
		}
		console.log(getCookie('session'));
	});
</script>

{#if isSessionActive}
	<p>You is connected !</p>
{:else if form?.success}
	<p>Successfully logged in! Welcome back, {data.user}</p>
{:else}
	<form method="POST" action="?/login">
		<label>
			Email
			<input name="email" type="email" />
			<span>{form?.message}</span>
		</label>
		<label>
			Password
			<input name="password" type="password" />
		</label>
		<button>Log in</button>
		<button formaction="?/register">Register</button>
	</form>
{/if}

<style lang="scss">
	p {
		color: aliceblue;
	}
</style>
