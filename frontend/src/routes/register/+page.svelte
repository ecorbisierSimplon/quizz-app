<script lang="ts">
	import type { PageData, ActionData } from './$types';
	// import type { ActionData } from '$lib/packages/types';
	export let data: PageData;
	export let form: ActionData;
	const savedPassword: boolean = false;
</script>

{#if form?.success}
	<p>{data.first_name}, You have created Successfully your account</p>
{:else}
	<form method="POST" action="?/register">
		<label>
			first_name:
			<input type="text" name="first_name" />
			{#if form?.nameError != undefined}
				<span class="error">{form?.nameError}</span>
			{/if}
		</label>

		<label>
			sur_name:
			<input type="text" name="sur_name" />
			{#if form?.surnameError != undefined}
				<span class="error">{form?.surnameError}</span>
			{/if}
		</label>

		<label>
			email:
			<input type="email" name="email" />
			{#if form?.errorEmail != undefined}
				<span class="error">{form?.errorEmail}</span>
			{/if}
		</label>

		<label>
			password:
			<input type="password" name="password" />
			{#if form?.passwordError != undefined}
				<span class="error">{form?.passwordError}</span>
			{/if}
		</label>

		<label>
			Confirmer le mot de passe:
			<input type="password" name="password_validation" />
			{#if form?.password_validationError != undefined}
				<span class="error">{form?.password_validationError}</span>
			{/if}
		</label>
		<label>
			Mot de passe enregistré (variable d'environnement):
			<input type="password" name="savedPassword" value={form?.savedPassword} disabled />
		</label>

		{#if form?.messageError != undefined}
			<span class="error">{form?.messageError}</span>
		{/if}

		<button>S'inscrire</button>
	</form>
{/if}

<style>
	.error {
		color: red;
		font-size: 0.8rem;
	}
</style>
