import { fail } from '@sveltejs/kit';
import { ValidateForm } from '$lib/packages/Pattern';
import type { PageServerLoad, Actions } from './$types';

const API_URL = `http://app-backend:3000`;

export const load: PageServerLoad = async ({ cookies }) => {
	const tempResponse = await fetch(`${API_URL}/user/count`, {
		method: 'GET'
	});
	const responses = await tempResponse.json();
	return { first_name: cookies.get('userName'), count: responses.count };
};
export const actions = {
	register: async ({ request, cookies }) => {
		const data = await request.formData();
		const formData = await Object.fromEntries(data);
		const first_name = formData.first_name;
		const sur_name = formData.sur_name;
		const email = formData.email;
		const password = formData.password;
		const password_validation = formData.password_validation;
		const password_first = formData.password_first;
		const countResponse = await fetch(`${API_URL}/user/count`, {
			method: 'GET'
		});
		const count = await countResponse.json();
		let codes: number = 201;
		let messagesError = {};
		let testInput: string | null = null;

		testInput = ValidateForm.validateField(first_name.toString(), 'firstname');
		if (testInput) {
			codes = 400;
			messagesError = { ...messagesError, nameError: testInput };
		}

		testInput = ValidateForm.validateField(sur_name.toString(), 'lastname');
		if (testInput) {
			codes = 400;
			messagesError = { ...messagesError, surnameError: testInput };
		}

		testInput = ValidateForm.validateEmail(email.toString());
		if (testInput) {
			codes = 400;
			messagesError = { ...messagesError, emailError: testInput };
		}

		testInput = ValidateForm.validatePassword(password.toString());
		if (testInput) {
			codes = 400;
			messagesError = { ...messagesError, passwordError: testInput };
		}



		if (password.toString() != password_validation.toString()) {
			codes = 400;
			messagesError = {
				...messagesError,
				password_validationError: "The passwords isn't identical!"
			};
		}
		try {
			testInput = ValidateForm.validatePassword(password_first.toString());
			if (testInput && count.count === 0) {
				codes = 400;
				messagesError = {
					...messagesError,
					passwordFirstError: testInput
				};
			}
		} catch (error) {}

		if (codes === 400) {
			return fail(codes, messagesError);
		}
		const tempResponse = await fetch(`${API_URL}/user/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		});

		const responses = await tempResponse.json();
		try {
			if (responses.statusCode != 201) {
				return fail(400, { missing: true, messageError: responses.message });
			}
		} catch (error) {
			return fail(400, { missing: true, messageError: 'A field does not completed !' });
		}
		cookies.set('userName', first_name as string, { path: '/' });
		return { success: true };
	}
} satisfies Actions;
