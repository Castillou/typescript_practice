import dayjs from 'dayjs';
import reader from 'readline-sync';
import Member from '../model/Member';
import { isValidEmail, isValidPassword, isValidName } from '../util/validator';
import {
	getMemberListAll,
	getOneMember,
	createMember,
	updateMemberInfo,
	deleteMember,
} from '../modules/memberlistApi';

// 윈도우에서 한글 입력 안되는 경우 chcp 65001
reader.setDefaultOptions({ encoding: 'utf8' });

function runApp(): void {
	while (true) {
		try {
			printMenu();
			const input = reader.question('> ');
			// console.log("입력값 :",input);
			const menuNum = Number(input);
			switch (menuNum) {
				case 1:
					printMemberList();
					break;
				case 2:
					break;
				case 3:
					break;
				case 4:
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
			console.error(error);
			console.log('잘못된 입력입니다.');
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

// createListText: list 입력값을 텍스트로 변환해서 반환하는 함수
function createListText(list: Member[]): string {
	let listText = '';
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

		listText += `\n${mno} - name: ${name}, id: ${memberId}, pwd: ${password}, 가입일: ${dayjs(
			createdDate
		).format('YYYY-MM-DD')}${optionalText}`;
	});
	return listText;
}

// 1. 회원정보 리스트 보기
function printMemberList() {
	const memberList = getMemberListAll();
	let renderText = '\n<회원 목록>';
	renderText += createListText(memberList);
	console.log(renderText);
}

// 2. 회원가입 하기
function handleSignup() {}

// 2. 로그인 하기
function handleLogin() {}

export default runApp;
