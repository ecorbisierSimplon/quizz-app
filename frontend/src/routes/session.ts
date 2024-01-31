import { writable } from 'svelte/store';

export const session = writable<boolean>(false);
export const sessionKey = writable<string>('');
