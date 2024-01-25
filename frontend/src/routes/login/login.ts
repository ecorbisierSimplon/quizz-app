// src/routes/login/login.js
// import { json } from 'remix';

import { json } from '@sveltejs/kit';

export async function post(request: {
	json: () => PromiseLike<{ email: any; password: any }> | { email: any; password: any };
}) {
	// Traitement de la requête POST
	const { email, password } = await request.json();

	// ... Effectuez le traitement approprié ici ...
	alert('bonjour');
	// Renvoie une réponse JSON (remplacez cela par votre propre logique)
	return json({ success: true, message: 'Login successful' });
}

// Vous pouvez également ajouter une fonction get pour gérer les requêtes GET si nécessaire
export async function get(_request: any) {
	// Traitement de la requête GET
	// ...
}
