<!-- src/routes/login/index.svelte -->
<script>
	import { post } from '$hooks/login';

	async function handleSubmit(event) {
		event.preventDefault();

		const formData = new FormData(event.target);
		const responseData = await post({
			request: {
				method: 'POST',
				body: JSON.stringify(Object.fromEntries(formData.entries())),
				headers: {
					'Content-Type': 'application/json'
				}
			},
			resolve: () => {}
		});

		// Gérez la réponse si nécessaire
		console.log('Réponse du serveur:', responseData);
	}
</script>

<form on:submit={handleSubmit}>
	<label>
		Email
		<input name="email" type="email" />
	</label>
	<label>
		Password
		<input name="password" type="password" />
	</label>
	<button type="submit">Log in</button>
</form>
