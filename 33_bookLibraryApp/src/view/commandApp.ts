import dayjs from 'dayjs';
import reader from 'readline-sync';
import Member from '../model/member';
import {
	getMemberListAll,
	getOneMember,
	createMember,
	updateMember,
	deleteMember,
} from '../modules/todolistApi';

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
	console.log('<도서 관리 프로그램>');
	console.log('로그인이 필요합니다.');
	console.log('1. 로그인');
	console.log('99. 종료하기');
}

export default runApp;
