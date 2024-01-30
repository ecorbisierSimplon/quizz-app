// src/stores/cookieStore.ts
import { writable } from 'svelte/store';

// Créez un store Svelte
export const hasCookie = writable(false);

// Créez une fonction pour mettre à jour le store en fonction de votre logique
export const updateCookieState = (cookieName: string) => {
	const newState = document.cookie.split(';').some((cookie) => {
		const [name, value] = cookie.split('=').map((c) => c.trim());
		return name === cookieName && value !== undefined && value !== '';
	});

	// Mettez à jour le store avec la nouvelle valeur
	hasCookie.set(newState);
};
