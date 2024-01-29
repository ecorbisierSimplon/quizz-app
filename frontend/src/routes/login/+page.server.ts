// import { json } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
const importJwt = () => import('jsonwebtoken');

import dotenv from 'dotenv';
dotenv.config();

const API_URL = `http://app-backend:3000`;
export async function load({ cookies }) {
	// const response = await fetch(`${API_URL}/email/${email}`);
	// const users = await response.json();
	// console.log(users.last_name);
	// const user = users.last_name; //await db.getUserFromSession(cookies.get('sessionid'));
	// return { user };
}

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		const tempResponse = await fetch(`${API_URL}/user/email/${email}`);
		let response = await tempResponse.json();
		try {
			response = response.user.email;
		} catch (error) {
			return fail(400, { email, missing: true, message: 'Password and/or email is invalid !' });
		}

		const user = (await fetch(`${API_URL}/email/${email}`)).json();
		// cookies.set('sessionid', await db.createSession(user), { path: '/' });

		try {
			// Faites une requête d'authentification au backend (par exemple, avec fetch ou axios)
			const response = await fetch(`${API_URL}/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});
			console.log(await response.json());
			if (response.ok) {
				const { userId, username } = await response.json();
				const jwt = await importJwt();
				const token = jwt.sign({ sub: userId, username }, 'your-secret-key', { expiresIn: '30d' });
				localStorage.setItem('token', token);
				console.log(token);
				return { success: true };
			}

			return null;
		} catch (error) {
			console.error('Error during login:', error);
			return null;
		}

		// const login = await fetch(`${API_URL}/login`, {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify({ email, password })
		// });
		// console.log(login);

		// if (login.ok) {
		// 	const { token } = await response.json();
		// 	localStorage.setItem('token', token);
		// 	console.log(token);
		// 	return { success: true };
		// }
		// return null;
	}
};

export function _getToken(): string | null {
	return localStorage.getItem('token');
}
// import { getCookie, setCookie } from 'typescript-cookie';
// import { fail, redirect } from '@sveltejs/kit';
// import { Actions } from '../../../.svelte-kit/types/src/routes/login/$types';

// /** @type {import('./$types').Actions} */
// export const actions = {
// 	login: async ({ request, url }) => {
// 		const data = await request.formData();
// 		const email = data.get('email');
// 		const password = data.get('password');

// 		// const user = await db.getUser(email);
// 		if (!user) {
// 			return fail(400, { email, missing: true });
// 		}

// 		if (user.password !== hash(password)) {
// 			return fail(400, { email, incorrect: true });
// 		}

// 		getCookie('sessionid', await db.createSession(user), { path: '/' });

// 		if (url.searchParams.has('redirectTo')) {
// 			redirect(303, url.searchParams.get('redirectTo'));
// 		}

// 		return { success: true };
// 	},
// 	register: async (event) => {
// 		// TODO register the user
// 	}
// };
