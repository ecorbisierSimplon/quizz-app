import type { LoadInput } from '@sveltejs/kit';
export async function post({ request, resolve }: LoadInput) {
	// Traitez la requête POST ici
	const body = await request.json();

	// Exemple de traitement de la requête POST
	console.log('Données du formulaire:', body);

	// Vous pouvez effectuer des opérations de connexion ou de validation ici

	// Passez à la gestion normale de la requête
	return resolve(request);
}
