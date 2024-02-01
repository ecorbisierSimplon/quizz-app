<<<<<<< HEAD
import type { PageData } from '$lib/packages/types';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

import dotenv from 'dotenv';
dotenv.config();

export async function load({ cookies }) {
	const user = { surname: 'Eric' }; //await db.getUserFromSession(cookies.get('sessionid'));
	return { user };
}

export const actions = {
	register: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		const sur_name = data.get('sur_name');
		const last_name = data.get('last_name');

		if (!email) {
			return fail(400, { email, missing: true });
		}

		if (!password) {
			return fail(400, { password, missing: true });
		}

		if (!sur_name) {
			return fail(400, { sur_name, missing: true });
		}

		if (!last_name) {
			return fail(400, { last_name: true });
		}

		// const user = { surname: 'Eric' }; //await db.getUser(email);
		// cookies.set('sessionid', await db.createSession(user), { path: '/' });

		return { success: true };
	},

	register: async (event) => {
		// TODO register the user
	}
};

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
=======
import { fail } from '@sveltejs/kit';
import { ValidateForm } from '$lib/packages/Pattern';
import type { PageServerLoad, Actions } from './$types';

const API_URL = `http://app-backend:3000`;

export const load: PageServerLoad = async ({ cookies }) => {
	return { first_name: 'Martin' };
};
export const actions = {
	register: async ({ request }) => {
		const data = await request.formData();
		const formData = await Object.fromEntries(data);
		const email = formData.email;
		const password = formData.password;
		const sur_name = formData.sur_name;
		const first_name = formData.first_name;

		if (ValidateForm.validateEmail(email.toString()) != null) {
			return fail(400, { email, emailError: 'Email required' });
		}

		if (ValidateForm.validatePassword(password.toString()) != null) {
			return fail(400, { password, passwordError: 'Password error' });
		}

		if (ValidateForm.validateField(sur_name.toString(), 'surname')) {
			return fail(400, { sur_name, surnameError: 'required' });
		}

		if (ValidateForm.validateField(first_name.toString(), 'firstname')) {
			return fail(400, { first_name, nameError: 'required' });
		}
		console.log(JSON.stringify(formData));
		const tempResponse = await fetch(`${API_URL}/user/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		});

		let response = await tempResponse.json();
		console.log(response);
		try {
			response = response.user;
		} catch (error) {
			return fail(400, { missing: true, messageError: 'A field does not completed !' });
		}

		return { success: true };
	}
} satisfies Actions;
>>>>>>> f0a9c7614cc40dd07c1118b5892b820b48567009
