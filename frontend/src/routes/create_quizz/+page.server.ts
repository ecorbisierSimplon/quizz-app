// import { writeFileSync } from 'fs';
import type { PageServerLoad, Actions } from './$types';
import fs from 'fs/promises';
import path from 'path';

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

		console.log(image);
		console.log(fileToUpload);

		const text = await data.get('text');
		const duration = Number(await data.get('duration'));
		const color = await data.get('color');
		const session = await data.get('session');

		try {
			if (fileToUpload) {
				const formDataFile = new FormData();
				formDataFile.append('myImg', fileToUpload);
				console.log(formDataFile);
				console.log(fileToUpload);

				// Configuration de l'en-tête Content-Type
				const headers = {
					Authorization: 'Bearer ' + session
					// 'Content-Type': 'application/octet-stream' // Utilisation d'un type de contenu approprié pour le buffer
				};

				// Configuration du corps de la requête avec le buffer
				// const body = fileToUpload;
				const body = formDataFile;

				// Effectuer la requête avec fetch
				const responseFile = await fetch(`${API_URL}/upload`, {
					method: 'POST',
					headers,
					body
				});

				if (responseFile.ok) {
					console.log('Le fichier a été téléchargé avec succès.');
					// Le reste de votre logique ici
					return { success: true };
				} else {
					console.error(
						"Erreur lors de l'envoi du fichier au serveur NestJS :",
						responseFile.statusText
					);
					return { error: "Erreur lors de l'envoi du fichier au serveur NestJS." };
				}
				const tokenFile = await responseFile.json();
				console.log(tokenFile);
			}
		} catch (error) {
			console.error('Error during saving image :', error);
			return { error: 'Server error' };
		}

		try {
			// Faites une requête d'authentification au backend (par exemple, avec fetch ou axios)
			const body: BodyInit = JSON.stringify({
				text,
				image: fileToUpload.name,
				color,
				duration,
				visible: true
			});
			console.log(body);
			const response = await fetch(`${API_URL}/quizz/create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + session
				},
				body
			});
			const token = await response.json();
			console.log(token);
			// Gérez la réponse du serveur et renvoyez une réponse au client
			if (token.access_token) {
				return { success: true };
			} else {
				return { error: 'Server error' };
			}
		} catch (error) {
			console.error('Error during saving quizz :', error);
			return { error: 'Server error' };
		}
	}
} satisfies Actions;
