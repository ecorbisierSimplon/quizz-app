import { writeFileSync } from 'fs';
import type { formData } from './$types';

const API_URL = process.env.API_URL;
export async function load({ cookies }) {
	return { api: API_URL };
}

export const actions = {
	quizz: async ({ request, cookies }) => {
		const data: formData = await request.formData();
		const formData = Object.fromEntries(data);
		console.log('server');
		let fileImg = data.image;
		const text = data.text;
		const duration = data.duration;
		const color = data.color;
		const session = cookies.get('sessionid');

		if (fileImg == '' || fileImg == null) {
			console.log('no file !');
		} else {
			// let file = fileImg.files[0];
			const { fileImg } = formData as { fileImg: File };

			// Write the file to the static folder
			writeFileSync(`static/img/${fileImg.name}`, Buffer.from(await fileImg.arrayBuffer()));
			data.image = fileImg.name;
			// return {
			// 	success: true
			// };
		}
		const image = data.image;
		console.log(text + ' // ' + data.text);
		console.log(
			JSON.stringify({
				text,
				image,
				color,
				session,
				duration
			})
		);
		try {
			// Faites une requête d'authentification au backend (par exemple, avec fetch ou axios)
			const response = await fetch(`${API_URL}/quizz/create`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					text,
					image,
					color,
					session,
					duration
				})
			});
			const token = await response.json();
			console.log(token);
			// Gérez la réponse du serveur et renvoyez une réponse au client
			if (token.access_token) {
				return {
					status: 200,
					body: { success: true }
				};
			} else {
				return {
					status: 500,
					body: { error: 'Server error' }
				};
			}
		} catch (error) {
			console.error('Error during saving quizz :', error);
			return {
				status: 500,
				body: { error: 'Server error' }
			};
		}
	}
};
