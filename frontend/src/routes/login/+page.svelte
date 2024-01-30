<script lang="ts">
	import { error } from 'console';
	import type { PageData, ActionData } from './$types';
	import { enhance, applyAction } from '$app/forms';
	export let data: PageData;
	export let form: ActionData;
</script>

{#if form?.success}
	<p>Successfully logged in, welcome back, {data.user.name}</p>
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
