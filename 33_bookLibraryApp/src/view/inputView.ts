import reader from 'readline-sync';
import { isValidId, isValidPassword, isValidName } from '../util/validator';

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
