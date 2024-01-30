<<<<<<< HEAD
<script lang="ts">
	import { error } from 'console';
	import type { PageData, ActionData } from './$types';
	import { enhance, applyAction } from '$app/forms';
=======
<script lang="ts" module>
	import type { PageData, ActionData } from './$types';
	import { getCookie, setCookie } from 'typescript-cookie';
	import { onMount } from 'svelte';
>>>>>>> 5760273087ee00868df01f802a01aa99ccabf680
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

<<<<<<< HEAD
{#if form?.success}
	<p>Successfully logged in, welcome back, {data.user.name}</p>
=======
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
>>>>>>> 5760273087ee00868df01f802a01aa99ccabf680
{/if}

<form method="POST" use:enhance={({formElement, formData, action, cancel, submitter})} => {

	return async ({result, update}) => {
		if (result.type === 'redirected') {
			goto(result.location);
		} else {
			await applyAction(result);
		}

	}
}
>
	{#if form?.missing}<p class="error">The mail field is required</p>
	{/if}

	{#if form?.incorrect}<p class="error">Invalid credentials</p>{/if}
	<label>
		Email
		<input type="email" name="email" value={form?.email ?? ''} />
	</label>

	<label>
		Password
		<input type="password" name="password" />
	</label>

	<button formaction="?/login">Log in</button>
</form>

<style lang="scss">
	p {
		color: aliceblue;
	}
</style>
