import dayjs from 'dayjs';
import reader from 'readline-sync';
import Member from '../model/Member';
import {
	getMemberListAll,
	getOneMember,
	createMember,
	updateMemberInfo,
	deleteMember,
} from '../modules/memberlistApi';
import {
	handleIdInput,
	handleNameInput,
	handlePasswordInput,
	handleAgeInput,
	handlePhoneInput,
} from './inputHandlers';

// 윈도우에서 한글 입력 안되는 경우 chcp 65001
reader.setDefaultOptions({ encoding: 'utf8' });

let isLoggedIn: Member | null = null;

function runApp(): void {
	while (true) {
		try {
			isLoggedIn === null ? printMenu() : printLoginMenu();
			const input = reader.question('> ');
			// console.log("입력값 :",input);
			const menuNum = Number(input);
			switch (menuNum) {
				case 1:
					printMemberList();
					break;
				case 2:
					handleSignup();
					break;
				case 3:
					handleLogin();
					break;
				case 4:
					handleLogout();
					break;
				case 5:
					break;
				case 99:
					return;
				default:
					break;
			}
			console.log('');
		} catch (error) {
			console.error(`[ERROR] ${error}`);
			console.log('잘못된 입력입니다.\n');
		}
	}
}

function printMenu(): void {
	console.log('<회원정보 관리 프로그램>');
	console.log('1. 회원정보 리스트 보기');
	console.log('2. 회원가입 하기');
	console.log('3. 로그인');
	console.log('99. 종료하기');
}

function printLoginMenu(): void {
	console.log('<회원정보 관리 프로그램>');
	console.log(`로그인 되었습니다. [id: ${isLoggedIn?.memberId} / 이름: ${isLoggedIn?.name}]`);
	console.log('1. 회원정보 리스트 보기');
	console.log('2. 회원가입 하기');
	console.log('3. 로그인');
	console.log('4. 로그아웃');
	console.log('5. 회원정보 수정하기');
	console.log('6. 탈퇴하기');
	console.log('99. 종료하기');
}

// createListText: list 입력값을 텍스트로 변환해서 반환하는 함수
function createListText(list: Member[]): string {
	let listText: string = '';
	list.forEach(({ mno, memberId, password, name, createdDate, age, phone, hobby }) => {
		let optionalText = ``;

		if (age) {
			optionalText += `, 나이: ${age}`;
		}
		if (phone) {
			optionalText += `, 전화번호: ${phone}`;
		}
		if (hobby) {
			optionalText += `, 취미: ${hobby.join(', ')}`;
		}

		listText += `\n${mno} - 이름: ${name}, id: ${memberId}, pwd: ${password}, 가입일: ${dayjs(
			createdDate
		).format('YYYY-MM-DD')}${optionalText}`;
	});
	return listText;
}

// ID를 입력받고 검증하는 함수
function validateAndFetchMember(): Member {
	const idInput: string = handleIdInput();

	const findedMember: Member | null = getOneMember(idInput);

	if (findedMember === null) {
		console.log('존재하지 않는 아이디입니다. 다시 입력해주세요.');
		return validateAndFetchMember();
	}

	return findedMember;
}

// 비밀번호를 입력받고 검증하는 함수
function validatePassword(member: Member): void {
	const passwordInput: string = handlePasswordInput();

	if (passwordInput !== member.password) {
		console.log('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
		validatePassword(member);
	}
}

// 1. 회원정보 리스트 보기
function printMemberList() {
	const memberList: Member[] = getMemberListAll();
	let renderText: string = '\n<회원 목록>';
	renderText += createListText(memberList);
	console.log(renderText);
}

// 2. 회원가입 기능
function handleSignup() {
	console.log('\n<회원 가입>');

	console.log('아이디를 입력해주세요.');
	const newId: string = handleIdInput();
	console.log('비밀번호를 입력해주세요.');
	const newPassword: string = handlePasswordInput();
	console.log('이름를 입력해주세요.');
	const newName: string = handleNameInput();

	const memberList: Member[] = getMemberListAll();
	const nextMno: number = Math.max(...memberList.map((member) => member.mno)) + 1;
	const newMember: Member = {
		mno: nextMno,
		memberId: newId,
		password: newPassword,
		name: newName,
		createdDate: new Date(),
	};

	const response: boolean = createMember(newMember);

	if (response) {
		console.log(`${newId}님의 회원가입이 완료 되었습니다.`);
	} else {
		console.log('회원가입에 실패하였습니다.');
	}
}

// 3. 로그인 기능
function handleLogin() {
	console.log('\n아이디를 입력해주세요.');
	const findedMember: Member = validateAndFetchMember();
	console.log('비밀번호를 입력해주세요.');
	validatePassword(findedMember);

	isLoggedIn = findedMember;
	console.log('로그인에 성공하였습니다.');
}

// 4. 로그아웃 기능
function handleLogout() {
	if (isLoggedIn === null) {
		return;
	}

	const logoutMemberId = isLoggedIn.memberId;
	isLoggedIn = null;

	console.log(`${logoutMemberId}님이 로그아웃 하였습니다.`);
}

export default runApp;
