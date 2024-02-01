<<<<<<< HEAD
<<<<<<< HEAD
import type { Actions } from './$types';
=======
// import { json } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
>>>>>>> 5760273087ee00868df01f802a01aa99ccabf680
import type { PageServerLoad, Actions } from './$types';
const importJwt = () => import('jsonwebtoken');

<<<<<<< HEAD
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad + async({ cookies }) => {
	const user = await db.getUserFromSession(cookies.get('sessionid'));
	return { user };
};
=======
import dotenv from 'dotenv';
=======
import { fail } from '@sveltejs/kit';
>>>>>>> f0a9c7614cc40dd07c1118b5892b820b48567009
import { getCookie } from 'typescript-cookie';
import { session } from '../session';

const API_URL = process.env.API_URL;

export async function load({ cookies }) {
	const userString = cookies.get('user');
	const sessionid = cookies.get('sessionid');
	if (userString) {
		const users: { first_name: string; sur_name: string } = JSON.parse(userString).user;

		if (users && users.first_name) {
			const firstName = users.first_name;
			const surName = users.sur_name;

			return { firstName, surName, login: true, sessionid };
		} else {
			// Gérez le cas où la propriété `last_name` n'est pas définie ou si l'objet `users` est null/undefined
			console.error("Erreur: Impossible d'obtenir le nom de l'utilisateur.");
			return { user: null, login: false }; // ou un autre traitement approprié
		}
	} else {
		// Gérez le cas où userString est undefined
		console.error("Erreur: La chaîne d'utilisateur est undefined.");
		return { user: null, login: false }; // ou un autre traitement approprié
	}
}
>>>>>>> 5760273087ee00868df01f802a01aa99ccabf680

export const actions = {
	login: async ({ cookies, request, url }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		const tempResponse = await fetch(`${API_URL}/user/email/${email}`);
		let response = await tempResponse.json();
		try {
			response = response.user.email;
		} catch (error) {
			return fail(400, { email, missing: true, errorEmail: 'Password and/or email is invalid !' });
		}
		const user = await db.getUser(email);

<<<<<<< HEAD
<<<<<<< HEAD
		if (user || user.password !== hash(password)) {
			return fail(400, { email, incorrect: true });
		}

		cookies.set('sessionid', await db.createSession(user), { path: '/' });

		if (url.searchParams.has('redirectTo')) {
			redirect(303, url.searchParams.get('redirectTo'));
=======
		const user = (await fetch(`${API_URL}/user/email/${email}`)).json();
		console.log(await user);
		const userString = JSON.stringify(await user);
		cookies.set('user', userString, { path: '/' });

=======
>>>>>>> f0a9c7614cc40dd07c1118b5892b820b48567009
		try {
			// Faites une requête d'authentification au backend (par exemple, avec fetch ou axios)
			const response = await fetch(`${API_URL}/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});
			const token = await response.json();
			console.log(token);
			if (token.access_token) {
				cookies.set('sessionid', token.access_token, { path: '/' });
				session.set(false);
				const user = (await fetch(`${API_URL}/user/email/${email}`)).json();
				const userString = JSON.stringify(await user);
				cookies.set('user', userString, { path: '/' });
				return { success: true };
			}

			// if (response.ok) {
			// 	const { userId, username } = await response.json();
			// 	const jwt = await importJwt();
			// 	const token = jwt.sign({ sub: userId, username }, 'your-secret-key', { expiresIn: '30d' });
			// 	localStorage.setItem('token', token);
			// 	console.log(token);
			// 	return { success: true };
			// }

			return null;
		} catch (error) {
			console.error('Error during login:', error);
			return null;
>>>>>>> 5760273087ee00868df01f802a01aa99ccabf680
		}
	}
	return { success: true };
} satisfies Actions;

<<<<<<< HEAD
=======
export function _getToken(): string | null {
	getCookie('user');
	return localStorage.getItem('token');
}
>>>>>>> 5760273087ee00868df01f802a01aa99ccabf680
