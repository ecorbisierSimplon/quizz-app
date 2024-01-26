<!-- src/routes/login/index.svelte -->
<script lang="ts">
	// import { hostname } from 'os';
	import { onMount } from 'svelte';
	import { api } from './+page.server';

	// onMount(() => {
	// 	const hostname = 'http://localhost:8081/user/register';
	// 	api(hostname)
	// 		.then((test) => {
	// 			// Utilisez la réponse ici
	// 			console.log(test);
	// 		})
	// 		.catch((error) => {
	// 			// Gérez les erreurs ici
	// 			console.error(error);
	// 		});
	// });
</script>

<!-- <form on:submit={handleSubmit}>
	<label>
		Email
		<input name="email" type="email" />
	</label>
	<label>
		Password
		<input name="password" type="password" />
	</label>
	<button type="submit">Log in</button>
</form> -->
