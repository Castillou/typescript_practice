import reader from 'readline-sync';
import Member from '../model/member';
import { getMemberListAll } from '../modules/memberlistApi';
import { validateAndFetchMember, validatePassword } from './inputView';

// 윈도우에서 한글 입력 안되는 경우 chcp 65001
reader.setDefaultOptions({ encoding: 'utf8' });

let loggedInMember: Member | null = null;

function runApp(): void {
	while (true) {
		try {
			loggedInMember === null ? printMenu() : printLoginMenu();
			const input = reader.question('> ');
			// console.log("입력값 :",input);
			const menuNum = Number(input);
			switch (menuNum) {
				case 1:
					if (loggedInMember === null) {
						handleLogin();
					}
					break;
				case 2:
					if (loggedInMember === null) break;
					break;
				case 3:
					if (loggedInMember === null) break;
					break;
				case 4:
					if (loggedInMember === null) break;
					break;
				case 5:
					if (loggedInMember === null) break;
					break;
				case 6:
					if (loggedInMember === null) break;
					handleShowUsersInfo();
					break;
				case 99:
					return;
				default:
					break;
			}
			console.log('');
		} catch (error) {
			console.error(`[ERROR] ${error}`);
		}
	}
}

function printMenu(): void {
	console.log('<도서 관리 프로그램>');
	console.log('로그인이 필요합니다.');
	console.log('1. 로그인');
	console.log('99. 종료하기');
}

function printLoginMenu(): void {
	const memberId: string = loggedInMember?.memberId ?? '아이디를 찾지 못했습니다.';
	const borrowBookCount: number = loggedInMember?.borrowBookList?.length ?? 0;
	console.log('<도서 관리 프로그램>');
	console.log(`로그인이 되었습니다. (${memberId}, 보유책: ${borrowBookCount}권)`);
	console.log('1. 전체 도서 리스트 보기');
	console.log('2. 내가 대여한 도서 보기');
	console.log('3. 도서 대여하기');
	console.log('4. 도서 반납하기');
	console.log('5. 도서 기증하기(생성)');
	console.log('6. 사용자 정보보기');
	console.log('99. 종료하기');
}

// 1. 로그인 기능
function handleLogin(): void {
	console.log('\n아이디를 입력해주세요.');
	const findedMember: Member = validateAndFetchMember();
	console.log('비밀번호를 입력해주세요.');
	validatePassword(findedMember);

	loggedInMember = findedMember;
	console.log('로그인에 성공하였습니다.');
}

// 6. 사용자 정보보기 기능
function handleShowUsersInfo(): void {
	const members = getMemberListAll();

	let renderText = '<사용자 정보보기>';
	members.forEach((member) => {
		renderText += member.info();
	});

	console.log(renderText);
}

export default runApp;
