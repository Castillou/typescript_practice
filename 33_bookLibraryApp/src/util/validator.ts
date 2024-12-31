export function isValidId(emailInput: string): boolean {
	return emailInput.trim() !== '' && emailInput.length >= 4;
}

export function isValidPassword(passwordInput: string): boolean {
	return passwordInput.trim() !== '' && passwordInput.length >= 4;
}

export function isValidName(nameInput: string): boolean {
	return nameInput.trim() !== '' && nameInput.length >= 2;
}

export function isValidTitle(titleInput: string): boolean {
	return titleInput.trim() !== '' && titleInput.length >= 1;
}

export function isValidCategory(categoryInput: string): boolean {
	const categoryNumber = Number(categoryInput);
	return !isNaN(categoryNumber) && categoryNumber >= 1 && categoryNumber <= 3;
}

export function isValidAnswer(answerInput: string): boolean {
	return answerInput === 'Y' || answerInput === 'N';
}

export function isValidDurability(durabilityInput: string): boolean {
	const durability = Number(durabilityInput);
	return !isNaN(durability) && durability >= 0 && durability <= 100;
}
