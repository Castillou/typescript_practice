import reader from 'readline-sync';
import { isValidId, isValidPassword, isValidName } from '../util/validator';

export function handleIdInput(): string {
	const idInput = reader.question('> ');

	if (idInput === '99') {
		throw new Error('취소하였습니다.');
	}

	if (!isValidId(idInput)) {
		console.log('아이디는 4글자 이상이어야 합니다. 다시 입력해주세요.');
		return handleIdInput();
	}

	return idInput;
}

export function handlePasswordInput(): string {
	const passwordInput = reader.question('> ');

	if (!isValidPassword(passwordInput)) {
		console.log('비밀번호는 4글자 이상이어야 합니다. 다시 입력해주세요.');
		return handlePasswordInput();
	}

	return passwordInput;
}

export function handleNameInput(): string {
	const nameInput = reader.question('> ');

	if (!isValidName(nameInput)) {
		console.log('이름은 2글자 이상이어야 합니다. 다시 입력해주세요.');
		return handleNameInput();
	}

	return nameInput;
}

export function handleAgeInput(): number | boolean {
	console.log('나이를 입력해주세요. (스킵: enter)');
	const ageInput = reader.question('> ');

	if (ageInput.trim() === '') {
		return false;
	}

	const age = Number(ageInput);

	if (isNaN(age)) {
		console.log('나이는 숫자로 입력해주세요.');
		return handleAgeInput();
	}

	return age;
}
export function handlePhoneInput(): string | boolean {
	console.log('전화번호를 입력해주세요. (스킵: enter)');
	const phoneRegex = /^010-\d{4}-\d{4}$/;
	const phoneInput = reader.question('> ');

	if (phoneInput.trim() === '') {
		return false;
	}

	if (!phoneRegex.test(phoneInput)) {
		console.log('유효하지 않은 전화번호입니다. 다시 입력해주세요.');
		return handlePhoneInput();
	}

	return phoneInput;
}
