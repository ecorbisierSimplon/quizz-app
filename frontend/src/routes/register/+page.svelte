<script lang="ts">
	import type { PageData, ActionData } from './$types';
	export let data: PageData;
	export let form: ActionData;
</script>

{#if form?.success}
	<p>You have created Successfully your account</p>
{:else}
	<form method="POST" action="?/register">
		<label>
			last_name:
			<input type="text" name="last_name" />
			<!-- <span class="error">{nameError}</span> -->
		</label>

		<label>
			sur_name:
			<input type="text" name="sur_name" />
		</label>

		<label>
			email:
			<input type="email" name="email" />
			<!-- <span class="error">{emailError}</span> -->
		</label>

		<label>
			password:
			<input type="password" name="password" />
			<!-- <span class="error">{passwordError}</span> -->
		</label>

		<label>
			Confirmer le mot de passe:
			<input type="password" name="confirmPassword" />
			<!-- <span class="error">{confirmPasswordError}</span> -->
		</label>
		<!-- 
		{#if savedPassword}
			<label>
				Mot de passe enregistré (variable d'environnement):
				<input type="password" name="savedPassword" value={savedPassword} disabled />
			</label>
		{/if} -->

		<button>S'inscrire</button>
	</form>
{/if}

<style>
	.error {
		color: red;
		font-size: 0.8rem;
	}
</style>
