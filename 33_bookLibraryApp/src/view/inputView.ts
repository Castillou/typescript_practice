import reader from 'readline-sync';
import Member from '../model/member';
import { getOneMember } from '../modules/memberlistApi';
import {
	isValidId,
	isValidPassword,
	isValidName,
	isValidTitle,
	isValidCategory,
	isValidAnswer,
	isValidDurability,
} from '../util/validator';

// 아이디 입력값 핸들러
function handleIdInput(): string {
	const idInput: string = reader.question('> ');

	if (idInput === '999') {
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

	if (passwordInput === '999') {
		throw new Error('취소하였습니다.');
	}

	if (!isValidPassword(passwordInput)) {
		console.log('비밀번호는 4글자 이상이어야 합니다. 다시 입력해주세요.');
		return handlePasswordInput();
	}

	return passwordInput;
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

// 이름 입력값 핸들러
export function validateNameInput(questionText: string = ''): string {
	const nameInput: string = reader.question(`${questionText}> `);

	if (nameInput === '999') {
		throw new Error('취소하였습니다.');
	}

	if (!isValidName(nameInput)) {
		console.log('이름은 2글자 이상이어야 합니다. 다시 입력해주세요.');
		return validateNameInput();
	}

	return nameInput;
}

// 제목 입력값 핸들러
export function validateTitleInput(questionText: string = ''): string {
	const titleInput: string = reader.question(`${questionText}> `);

	if (titleInput === '999') {
		throw new Error('취소하였습니다.');
	}

	if (!isValidTitle(titleInput)) {
		console.log('제목은 1글자 이상이어야 합니다. 다시 입력해주세요.');
		return validateTitleInput();
	}

	return titleInput;
}

// 이름 입력값 핸들러
export function validateCategoryInput(questionText: string = ''): number {
	const categoryInput: string = reader.question(`${questionText}> `);

	if (categoryInput === '999') {
		throw new Error('취소하였습니다.');
	}

	if (!isValidCategory(categoryInput)) {
		console.log('위 카테고리에 해당하는 번호를 입력해주세요.');
		return validateCategoryInput();
	}

	return Number(categoryInput);
}

export function validateCouponInput(questionText: string = ''): boolean {
	const couponInput: string = reader.question(`${questionText}> `);

	if (couponInput === '999') {
		throw new Error('취소하였습니다.');
	}

	if (!isValidAnswer(couponInput)) {
		console.log('Y 또는 N으로 답변해주세요.');
		return validateCouponInput();
	}

	return couponInput === 'Y';
}

export function validateDurabilityInput(questionText: string = ''): number {
	const durabilityInput: string = reader.question(`${questionText}> `);

	if (durabilityInput === '999') {
		throw new Error('취소하였습니다.');
	}

	if (!isValidDurability(durabilityInput)) {
		console.log('내구도는 0부터 100 사이의 값이어야 합니다.');
		return validateDurabilityInput();
	}

	return Number(durabilityInput);
}
