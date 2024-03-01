// import { writeFileSync } from 'fs';
import { randomUUID } from 'crypto';
import type { PageServerLoad, Actions } from './$types';

const API_URL = process.env.API_URL;
export const load: PageServerLoad = async ({ cookies }) => {
	cookies.set('test', 'test', { path: '/' });
	return { api: API_URL };
};

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();

		const image = data.get('image');
		const fileToUpload = image as File;

		const text = await data.get('text');
		const duration = Number(await data.get('duration'));
		const color = await data.get('color');
		const session = await data.get('session');
		const newFileName = randomUUID() + getFileExtension(fileToUpload.name);
		console.log(newFileName);

		try {
			// Faites une requête d'authentification au backend (par exemple, avec fetch ou axios)
			const body: BodyInit = JSON.stringify({
				text,
				image: newFileName, //fileToUpload.name,
				color,
				duration,
				visible: true
			});

			const response = await fetch(`${API_URL}/quizz/create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + session
				},
				body
			});
			// const token = await response.json();
			console.log('response');
			console.log(response);
			// // Gérez la réponse du serveur et renvoyez une réponse au client
			// if (!token.access_token) {
			// 	return { error: 'Server error' };
			// }
		} catch (error) {
			console.error('Error during saving quizz :', error);
			return { error: 'Server error' };
		}

		try {
			if (fileToUpload) {
				const formDataFile = new FormData();
				formDataFile.append('myImg', fileToUpload, newFileName);

				// Configuration de l'en-tête Content-Type
				const headers = {
					Authorization: 'Bearer ' + session
				};

				// Configuration du corps de la requête avec le buffer
				const body = formDataFile;

				// Effectuer la requête avec fetch
				const responseFile = await fetch(`${API_URL}/upload`, {
					method: 'POST',
					headers,
					body
				});

				if (!responseFile.ok) {
					console.error(
						"Erreur lors de l'envoi du fichier au serveur NestJS :",
						responseFile.statusText
					);
					return { error: "Erreur lors de l'envoi du fichier au serveur." };
				}
			}
			return { success: true, text, color };
		} catch (error) {
			console.error('Error during saving image :', error);
			return { error: "Erreur lors de l'envoi du fichier au serveur" };
		}
	}
} satisfies Actions;

const getFileExtension = (filename: string) => {
	return '.' + filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};
