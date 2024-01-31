<script lang="ts">
	// import type { PageData, ActionData } from './$types';
	import type { ActionData, RegisterData } from '$lib/packages/types';
	export let data: RegisterData;
	export let form: ActionData;
	const savedPassword: boolean = false;
</script>

{#if form?.success}
	<p>You have created Successfully your account</p>
{:else}
	<form method="POST" action="?/register">
		<label>
			first_name:
			<input type="text" name="first_name" />
			<span class="error">{form?.nameError}</span>
		</label>

		<label>
			sur_name:
			<input type="text" name="sur_name" />
			<span class="error">{form?.surnameError}</span>
		</label>

		<label>
			email:
			<input type="email" name="email" />
			<span class="error">{form?.errorEmail}</span>
		</label>

		<label>
			password:
			<input type="password" name="password" />
			<span class="error">{form?.passwordError}</span>
		</label>

		<label>
			Confirmer le mot de passe:
			<input type="password" name="confirmPassword" />
			<span class="error">{form?.confirmPasswordError}</span>
		</label>

		{#if savedPassword}
			<label>
				Mot de passe enregistré (variable d'environnement):
				<input type="password" name="savedPassword" value={form?.savedPassword} disabled />
			</label>
		{/if}

		<span class="error">{form?.messageError}</span>

		<button>S'inscrire</button>
	</form>
{/if}

<style>
	.error {
		color: red;
		font-size: 0.8rem;
	}
</style>
