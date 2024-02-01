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
