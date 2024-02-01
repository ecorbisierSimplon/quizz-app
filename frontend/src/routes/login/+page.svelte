<<<<<<< HEAD
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
=======
<script lang="ts">
	import { setCookie } from 'typescript-cookie';
	import { onMount } from 'svelte';
	import type { ActionData, LoginData } from '$lib/packages/types';
	import { session } from '../session';
	export let data: LoginData;
>>>>>>> f0a9c7614cc40dd07c1118b5892b820b48567009
	export let form: ActionData;
	onMount(() => {
		if (data.login) {
			setCookie('session', data.sessionid, { expires: 10, path: '/' });
			setCookie('surname', data.surName, { expires: 10, path: '/' });
			setCookie('firstname', data.firstName, { expires: 10, path: '/' });
			session.set(true);
		}
	});
</script>

<<<<<<< HEAD
<<<<<<< HEAD
{#if form?.success}
	<p>Successfully logged in, welcome back, {data.user.name}</p>
=======
{#if isSessionActive}
=======
{#if $session}
>>>>>>> f0a9c7614cc40dd07c1118b5892b820b48567009
	<p>You is connected !</p>
	<p>Welcome back, {data.firstName}</p>
{:else}
	<form method="POST" action="?/login">
		<div class="mb-3 mt-3">
			<label class="form-label"
				>Email
				<input name="email" type="text" class="form-control" />
			</label>
		</div>
		<div class="mb-3">
			<label class="form-label"
				>Password
				<input name="password" type="password" class="form-control" />
			</label>
		</div>
		<div class="error">
			{#if form?.errorEmail}
				<span>{form?.errorEmail}</span>
			{/if}
		</div>
		<div class="form-check mb-3">
			<label class="form-check-label">
				<input class="form-check-input" type="checkbox" name="remember" /> Remember me
			</label>
		</div>

		<button class="submit"><i class="fas fa-user-alt"></i> Log in</button>
		<!-- <button formaction="?/register">Register</button> -->
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
	form {
		max-width: 500px;
	}
	p {
		color: aliceblue;
	}
	label {
		width: 100%;
	}
	button {
		display: block;
		margin: 0 auto;
	}
</style>
