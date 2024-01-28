export class validateForm {
	// formValidations.ts

	public static validateField(value: string, fieldName: string): string | null {
		if (!value.trim()) {
			return `Veuillez saisir un ${fieldName}.`;
		}
		return null;
	}

	public static validateEmail(email: string): string | null {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email.trim())) {
			return 'Veuillez saisir une adresse email valide.';
		}
		return null;
	}

	public static validatePassword(password: string): string | null {
		if (password.trim().length < 8) {
			return 'Le mot de passe doit avoir au moins 8 caractères.';
		}
		return null;
	}

	public static validateConfirmPassword(password: string, confirmPassword: string): string | null {
		if (password !== confirmPassword) {
			return 'La confirmation du mot de passe ne correspond pas.';
		}
		return null;
	}
}
