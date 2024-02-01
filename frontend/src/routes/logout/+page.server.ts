import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../login/$types';
import { session } from '../session';

export const load: PageServerLoad = async ({ cookies }) => {
	session.set(false);
	cookies.delete('sessionid', { path: '/' });
	cookies.delete('user', { path: '/' });

	// throw redirect(302, 'http://localhost:8080/logout?/logout');
};

export const actions = {
	logout: async ({ cookies, request }) => {
		console.log('action');
		cookies.set('sessionid', '', { path: '/' });
		cookies.set('user', '', { path: '/' });
		return { success: true };
	}
};
