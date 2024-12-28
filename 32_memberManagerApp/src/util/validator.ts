export function isValidId(emailInput: string): boolean {
	return emailInput.trim() !== '' && emailInput.length >= 4;
}

export function isValidPassword(passwordInput: string): boolean {
	return passwordInput.trim() !== '' && passwordInput.length >= 4;
}

export function isValidName(nameInput: string): boolean {
	return nameInput.trim() !== '' && nameInput.length >= 2;
}

export function isValidAge(ageInput: string): boolean {
	return ageInput.trim() !== '' && !isNaN(Number(ageInput));
}

export function isValidPhone(phoneInput: string): boolean {
	const phoneRegex: RegExp = /^010-\d{4}-\d{4}$/;
	return phoneInput.trim() !== '' && phoneRegex.test(phoneInput);
}
