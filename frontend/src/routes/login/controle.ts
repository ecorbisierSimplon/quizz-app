import { validateForm } from '$lib/packages/Pattern';
import { writable } from 'svelte/store';
import { getWritable } from '../../lib/packages/getWritable';

export interface Score {
	play1: number;
	play2: number;
}
export const score = writable<Score>({ play1: 0, play2: 0 });

export const email = writable<string>('');
export const password = writable<string>('');

export const emailError = writable<string | null>(null);
export const passwordError = writable<string | null>(null);

export function handleSubmit(event: Event) {
	event.preventDefault();
	// Autres logiques de gestion du formulaire...
	validate();
}

function validate(): boolean {
	let isValid = true;

	// Validation de l'email
	emailError.set(validateForm.validateEmail(getWritable(email) as string));

	// Validation du mot de passe
	passwordError.set(validateForm.validatePassword(getWritable(password) as string));

	// Vérifier s'il y a des erreurs
	isValid = !emailError && !passwordError;

	return isValid;
}
