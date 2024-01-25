import { hslaToRgb } from '$lib/packages/Rgba';
import { writable, type Writable } from 'svelte/store';

const colorDefaut = hslaToRgb('hsla(231, 43%, 65%, 1)');
export const backgroundColor = writable<string>('');
export const quizzTitleColor = writable<string>('');

backgroundColor.set(calculateBackgroundColor(colorDefaut));
quizzTitleColor.set(colorDefaut);

export function handleColorChange(event: Event) {
	// Récupérez la couleur sélectionnée depuis l'événement
	quizzTitleColor.set((event.target as HTMLInputElement).value);
}

export function calculateBackgroundColor(color: string): string {
	const r = parseInt(color.slice(1, 3), 16);
	const g = parseInt(color.slice(3, 5), 16);
	const b = parseInt(color.slice(5, 7), 16);
	return `rgba(${r}, ${g}, ${b}, 0.4)`;
}

function getWritable(value: Writable<string>): string {
	let result: string = '';
	value.subscribe((val) => {
		result = val;
	});
	return result;
}
