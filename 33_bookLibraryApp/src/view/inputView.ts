import reader from 'readline-sync';
import Member from '../model/member';
import { getOneMember } from '../modules/memberlistApi';
import { isValidId, isValidPassword, isValidName } from '../util/validator';

// 아이디 입력값 핸들러
function handleIdInput(): string {
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

// 비밀번호 입력값 핸들러
function handlePasswordInput(): string {
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

// 이름 입력값 핸들러
function handleNameInput(): string {
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

// ID를 입력받고 검증하는 함수
export function validateAndFetchMember(): Member {
	const idInput: string = handleIdInput();

	const findedMember: Member | null = getOneMember(idInput);

	if (findedMember === null) {
		console.log('존재하지 않는 아이디입니다. 다시 입력해주세요.');
		return validateAndFetchMember();
	}

	return findedMember;
}

// 비밀번호를 입력받고 검증하는 함수
export function validatePassword(member: Member): void {
	const passwordInput: string = handlePasswordInput();

	if (passwordInput !== member.password) {
		console.log('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
		validatePassword(member);
	}
}
