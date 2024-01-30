import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../login/$types';

export const load: PageServerLoad = async ({ cookies }) => {
	cookies.delete('sessionid', { path: '/' });
	cookies.delete('user', { path: '/' });

	// throw redirect(302, 'http://localhost:8080/logout?/logout');
};

export const actions = {
	logout: async ({ cookies, request }) => {
		cookies.set('session', '');
		return { success: true };
	}
};
