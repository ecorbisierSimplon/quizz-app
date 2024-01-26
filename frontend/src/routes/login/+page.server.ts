// import { getCookie, setCookie } from 'typescript-cookie';
// import { fail, redirect } from '@sveltejs/kit';

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
