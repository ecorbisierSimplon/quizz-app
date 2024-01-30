<script lang="ts">
	import { setCookie } from 'typescript-cookie';
	import { onMount } from 'svelte';
	import type { ActionData, LoginData } from '$lib/packages/types';
	import { session } from '../session';
	export let data: LoginData;
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

{#if $session}
	<p>You is connected !</p>
	<p>Welcome back, {data.surName}</p>
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
{/if}

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
