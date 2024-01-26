<script lang="ts">
	import { onMount } from 'svelte';

	let name = '';
	let lastName = '';
	let email = '';
	let password = '';
	let confirmPassword = '';

	let savedPassword = ''; // Le mot de passe enregistré dans une variable d'environnement

	let nameError = '';
	let emailError = '';
	let passwordError = '';
	let confirmPasswordError = '';

	function handleSubmit(event: Event) {
		event.preventDefault();

		// Réinitialiser les erreurs
		nameError = '';
		emailError = '';
		passwordError = '';
		confirmPasswordError = '';

		// Vérification si les champs sont valides
		// if (!validateForm()) {
		// 	return;
		// }

		// Envoyer les données au serveur
		const formData = {
			name,
			lastName,
			email,
			password
		};

		console.log(formData);
	}
</script>

<form on:submit={handleSubmit}>
	<label>
		Nom:
		<input type="text" bind:value={name} />
		<span class="error">{nameError}</span>
	</label>

	<label>
		Prénom:
		<input type="text" bind:value={lastName} />
	</label>

	<label>
		Email:
		<input type="email" bind:value={email} />
		<span class="error">{emailError}</span>
	</label>

	<label>
		Mot de passe:
		<input type="password" bind:value={password} />
		<span class="error">{passwordError}</span>
	</label>

	<label>
		Confirmer le mot de passe:
		<input type="password" bind:value={confirmPassword} />
		<span class="error">{confirmPasswordError}</span>
	</label>

	{#if savedPassword}
		<label>
			Mot de passe enregistré (variable d'environnement):
			<input type="password" value={savedPassword} disabled />
		</label>
	{/if}

	<button type="submit">S'inscrire</button>
</form>

<style>
	.error {
		color: red;
		font-size: 0.8rem;
	}
</style>
