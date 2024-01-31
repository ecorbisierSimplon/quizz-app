import { writeFileSync } from 'fs';

const API_URL = process.env.API_URL;
export async function load({ cookies }) {
	return { api: API_URL };
}

export const actions = {
	quizz: async ({ request, context }) => {
		const { cookie } = context;

		const data = await request.formData();
		const formData = Object.fromEntries(data);

		let fileImg = data.image;
		const text = data.txt;
		const duration = data.duration;
		const color = data.color;
		const session = cookie.get('sessionid');

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
