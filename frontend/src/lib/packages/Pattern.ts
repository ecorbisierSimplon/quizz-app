import dotenv from 'dotenv';
dotenv.config();

export class validateForm {
	// formValidations.ts

	public validateName(name: string): string | null {
		if (!name.trim()) {
			return 'Veuillez saisir un nom.';
		}
		return null;
	}

	public validateEmail(email: string): string | null {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email.trim())) {
			return 'Veuillez saisir une adresse email valide.';
		}
		return null;
	}

	public validatePassword(password: string): string | null {
		if (password.trim().length < 8) {
			return 'Le mot de passe doit avoir au moins 8 caractères.';
		}
		return null;
	}

	public validateConfirmPassword(password: string, confirmPassword: string): string | null {
		if (password !== confirmPassword) {
			return 'La confirmation du mot de passe ne correspond pas.';
		}
		return null;
	}
}
