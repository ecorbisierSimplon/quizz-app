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
