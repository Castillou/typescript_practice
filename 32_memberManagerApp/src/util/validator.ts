export function isValidEmail(emailInput: string): boolean {
	return emailInput.trim() !== '' && emailInput.length >= 4;
}

export function isValidPassword(passwordInput: string): boolean {
	return passwordInput.trim() !== '' && passwordInput.length >= 4;
}

export function isValidName(nameInput: string): boolean {
	return nameInput.trim() !== '' && nameInput.length >= 2;
}
