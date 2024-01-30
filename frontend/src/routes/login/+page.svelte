<script lang="ts">
	import { setCookie } from 'typescript-cookie';
	import { onMount } from 'svelte';
	import type { ActionData, LoginData } from '$lib/packages/types';

	export let data: LoginData;
	export let form: ActionData;
	let isSessionActive: boolean = false;
	onMount(() => {
		if (data.login) {
			setCookie('session', data.sessionid, { expires: 10, path: '/' });
			setCookie('surname', data.surName, { expires: 10, path: '/' });
			setCookie('firstname', data.firstName, { expires: 10, path: '/' });
			isSessionActive = true;
		}

		// updateCookieState('session');
		// console.log('SESSION : ' + $hasCookie);
	});
</script>

{#if isSessionActive}
	<p>You is connected !</p>
	<p>Welcome back, {data.surName}</p>
{:else}
	<form method="POST" action="?/login">
		<label>
			Email
			<input name="email" type="text" />
		</label>
		<label>
			Password
			<input name="password" type="password" />
		</label>
		{#if form?.errorEmail}
			<span>{form?.errorEmail}</span>
		{/if}
		<button>Log in</button>
		<!-- <button formaction="?/register">Register</button> -->
	</form>
{/if}

<style lang="scss">
	p {
		color: aliceblue;
	}
</style>
