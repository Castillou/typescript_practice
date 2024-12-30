import reader from 'readline-sync';
import {
	isValidId,
	isValidPassword,
	isValidName,
	isValidAge,
	isValidPhone,
} from '../util/validator';

export function handleIdInput(): string {
	const idInput: string = reader.question('> ');

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
	const passwordInput: string = reader.question('> ');

	if (passwordInput === '99') {
		throw new Error('취소하였습니다.');
	}

	if (!isValidPassword(passwordInput)) {
		console.log('비밀번호는 4글자 이상이어야 합니다. 다시 입력해주세요.');
		return handlePasswordInput();
	}

	return passwordInput;
}

export function handleNameInput(): string {
	const nameInput: string = reader.question('> ');

	if (nameInput === '99') {
		throw new Error('취소하였습니다.');
	}

	if (!isValidName(nameInput)) {
		console.log('이름은 2글자 이상이어야 합니다. 다시 입력해주세요.');
		return handleNameInput();
	}

	return nameInput;
}

export function handleAgeInput(): number {
	const ageInput: string = reader.question('> ');

	if (ageInput === '99') {
		throw new Error('취소하였습니다.');
	}

	if (!isValidAge(ageInput)) {
		console.log('나이는 숫자로 입력해야합니다. 다시 입력해주세요.');
		return handleAgeInput();
	}

	const age: number = Number(ageInput);
	return age;
}

export function handlePhoneInput(): string {
	const phoneInput: string = reader.question('> ');

	if (phoneInput === '99') {
		throw new Error('취소하였습니다.');
	}

	if (!isValidPhone(phoneInput)) {
		console.log('유효하지 않은 전화번호입니다. 다시 입력해주세요.');
		return handlePhoneInput();
	}

	return phoneInput;
}

export function handleHobbyInput(): string {
	const hobbyInput: string = reader.question('> ');

	if (hobbyInput === '99') {
		throw new Error('취소하였습니다.');
	}

	if (hobbyInput.trim() === '') {
		console.log('값을 입력해주세요.');
		return handleHobbyInput();
	}

	return hobbyInput;
}
