import { fail } from '@sveltejs/kit';
import { validateForm } from '$lib/packages/Pattern';

const importJwt = () => import('jsonwebtoken');

const API_URL = `http://app-backend:3000`;

export const actions = {
	register: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		const sur_name = data.get('sur_name');
		const first_name = data.get('first_name');

		if (validateForm.validateEmail(email) != null) {
			return fail(400, { email, emailError: 'Email required' });
		}

		if (validateForm.validatePassword(password) != null) {
			return fail(400, { password, passwordError: 'Password error' });
		}

		if (validateForm.validateField(sur_name, 'surname')) {
			return fail(400, { sur_name, surnameError: 'required' });
		}

		if (validateForm.validateField(first_name, 'firstname')) {
			return fail(400, { first_name, nameError: 'required' });
		}
		const tempResponse = await fetch(`${API_URL}/user/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		let response = await tempResponse.json();
		try {
			response = response.user;
		} catch (error) {
			return fail(400, { missing: true, messageError: 'A field does not completed !' });
		}

		return { success: true };
	}
};
