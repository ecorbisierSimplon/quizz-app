import { writeFileSync } from 'fs';
import type { PageServerLoad, Actions } from './$types';

const API_URL = process.env.API_URL;
export const load: PageServerLoad = async ({ cookies }) => {
	cookies.set('test', 'test', { path: '/' });
	return { api: API_URL };
};

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const formData = await Object.fromEntries(data);

		const fileImgData = (await formData.image) as unknown;
		const text = await formData.text;
		const duration = Number(await formData.duration);
		const color = await formData.color;
		const session = await formData.session;
		const fileObject: {
			name: string;
			arrayBuffer():
				| WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>
				| PromiseLike<WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>>;
			File: File;
		} = fileImgData as {
			name: string;
			arrayBuffer():
				| WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>
				| PromiseLike<WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>>;
			File: File;
		};

		// Affichage de l'objet File créé
		if (fileObject.name != '' && fileObject.name != null) {
			console.log(API_URL + `/static/img/${fileObject.name}`);
			// Write the file to the static folder
			writeFileSync(
				API_URL + `/static/img/${fileObject.name}`,
				Buffer.from(await fileObject.arrayBuffer())
			);

			// return {
			// 	success: true
			// };
		}

		const image = fileObject.name;
		console.log(fileImgData);

		try {
			// Faites une requête d'authentification au backend (par exemple, avec fetch ou axios)
			const body = JSON.stringify({
				text,
				image,
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
