export function hslaToRgb(hex: string): string {
	// Extraire les valeurs HSLA de la chaîne
	const matches = hex.match(/hsla\((\d+),\s*(\d+%?),\s*(\d+%?),\s*([0-9.]+)\)/);

	if (!matches) {
		throw new Error('Format HSLA invalide');
	}

	const h = parseInt(matches[1], 10);
	const s = parseFloat(matches[2]);
	const l = parseFloat(matches[3]);
	const a = parseFloat(matches[4]);

	// Convertir l'opacité alpha en valeur entre 0 et 1
	// const alpha = Math.min(1, Math.max(0, a));

	// Utiliser la fonction hslToRgb précédente pour obtenir la couleur en notation hexadécimale
	const rgbColor = hslToRgb(h, s, l);

	// Ajouter l'opacité alpha à la couleur
	// let rgbaColor = rgbColor.replace(/#/, `rgba(**, ${alpha})`);
	// rgbaColor = rgbaColor.replace('**', rgbColor);

	return rgbColor;
}

function hslToRgb(h: number, s: number, l: number): string {
	// Normaliser les valeurs HSL
	h = ((h % 360) + 360) % 360;
	s = Math.max(0, Math.min(100, s)) / 100;
	l = Math.max(0, Math.min(100, l)) / 100;

	// Calculer les composantes RGB
	const c = (1 - Math.abs(2 * l - 1)) * s;
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	const m = l - c / 2;

	let r: number, g: number, b: number;

	if (h >= 0 && h < 60) {
		r = c;
		g = x;
		b = 0;
	} else if (h >= 60 && h < 120) {
		r = x;
		g = c;
		b = 0;
	} else if (h >= 120 && h < 180) {
		r = 0;
		g = c;
		b = x;
	} else if (h >= 180 && h < 240) {
		r = 0;
		g = x;
		b = c;
	} else if (h >= 240 && h < 300) {
		r = x;
		g = 0;
		b = c;
	} else {
		r = c;
		g = 0;
		b = x;
	}

	// Convertir les composantes RGB en valeurs entières
	const rgbRed = Math.round((r + m) * 255);
	const rgbGreen = Math.round((g + m) * 255);
	const rgbBlue = Math.round((b + m) * 255);

	// Convertir les valeurs RGB en notation hexadécimale
	const hexRed = rgbRed.toString(16).padStart(2, '0');
	const hexGreen = rgbGreen.toString(16).padStart(2, '0');
	const hexBlue = rgbBlue.toString(16).padStart(2, '0');

	// Concaténer les composantes hexadécimales pour obtenir la notation hexadécimale finale
	const hexColor = `#${hexRed}${hexGreen}${hexBlue}`;

	return hexColor;
}
