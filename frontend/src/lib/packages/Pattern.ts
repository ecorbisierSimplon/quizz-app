export class ValidateForm {
	// formValidations.ts

	public static validateField(value: string, fieldName: string): string | null {
		const namePattern: RegExp = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/;
		if (!namePattern.test(value.trim())) {
			return `Please enter a valid ${fieldName}!`;
		}
		return null;
	}

	public static validateEmail(email: string): string | null {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email.trim())) {
			return 'Please enter a valid email address!';
		}
		return null;
	}

	public static validatePassword(password: string): string | null {
		const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%.^&+=!]).{8,}$/;
		if (password.trim().length < 8) {
			return 'Password must be at least 8 characters long!';
		}
		if (!passPattern.test(password.trim())) {
			return (
					' The password must contain at least one uppercase, lowercase, number and special character @#.$%^&+=! !'
			);
		}
		return null;
	}
	// (?=.*[a-z]) : Au moins une lettre minuscule.
	// (?=.*[A-Z]) : Au moins une lettre majuscule.
	// (?=.*\d) : Au moins un chiffre.
	// (?=.*[@#$%^&+=!]) : Au moins un caractère spécial parmi ceux indiqués.
	// .{8,} : Au moins 8 caractères au total.

	public static validateConfirmPassword(password: string, confirmPassword: string): string | null {
		if (password !== confirmPassword) {
			return 'La confirmation du mot de passe ne correspond pas.';
		}
		return null;
	}
}
