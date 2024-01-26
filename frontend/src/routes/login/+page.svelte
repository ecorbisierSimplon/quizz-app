<script lang="ts">
	import type { ActionData, PageData } from '$lib/packages/types';
	import { email, emailError, password, passwordError, handleSubmit } from './controle';
	export let data: PageData;
	export let form: ActionData;
</script>

{#if form?.success}
	<!-- this message is ephemeral; it exists because the page was rendered in
       response to a form submission. it will vanish if the user reloads -->
	<p>Successfully logged in! Welcome back, {data.user.firstname}</p>
{:else}
	<form on:submit={handleSubmit}>
		<label>
			Email:
			<input type="email" bind:value={$email} />
			<span class="error">{$emailError}</span>
		</label>

		<label>
			Mot de passe:
			<input type="password" bind:value={$password} />
			<span class="error">{$passwordError}</span>
		</label>
		<button>Log in</button>
		<button formaction="?/register">Register</button>
	</form>
{/if}
