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
	handleHobbyInput,
} from './inputView';

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
					printMemberList();
					break;
				case 2:
					handleSignup();
					break;
				case 3:
					handleLogin();
					break;
				case 4:
					if (loggedInMember === null) break;
					handleLogout();
					break;
				case 5:
					if (loggedInMember === null) break;
					handleEditMemberInfo();
					break;
				case 6:
					if (loggedInMember === null) break;
					handleAccountDeletion();
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
	console.log('<회원정보 관리 프로그램>');
	console.log('1. 회원정보 리스트 보기');
	console.log('2. 회원가입 하기');
	console.log('3. 로그인');
	console.log('99. 종료하기');
}

function printLoginMenu(): void {
	console.log('<회원정보 관리 프로그램>');
	console.log(
		`로그인 되었습니다. [id: ${loggedInMember?.memberId} / 이름: ${loggedInMember?.name}]`
	);
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
function printMemberList(): void {
	const memberList: Member[] = getMemberListAll();
	let renderText: string = '\n<회원 목록>';
	renderText += createListText(memberList);
	console.log(renderText);
}

// 2. 회원가입 기능
function handleSignup(): void {
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
function handleLogin(): void {
	console.log('\n아이디를 입력해주세요.');
	const findedMember: Member = validateAndFetchMember();
	console.log('비밀번호를 입력해주세요.');
	validatePassword(findedMember);

	loggedInMember = findedMember;
	console.log('로그인에 성공하였습니다.');
}

// 4. 로그아웃 기능
function handleLogout(): void {
	if (loggedInMember === null) {
		return;
	}

	const logoutMemberId = loggedInMember.memberId;
	loggedInMember = null;

	console.log(`${logoutMemberId}님이 로그아웃 하였습니다.`);
}

// 5. 회원정보 수정 기능
function handleEditMemberInfo(): void {
	console.log(
		'\n<회원정보 수정>\n변경할 항목을 선택하세요.\n1. 비밀번호 변경\n2. 이름 변경\n3. 나이 변경\n4. 전화번호 변경\n5. 취미 변경'
	);
	try {
		const input = reader.question('> ');
		// console.log("입력값 :",input);
		const selectedNumber = Number(input);
		switch (selectedNumber) {
			case 1:
				handleEditPassword();
				break;
			case 2:
				handleEditName();
				break;
			case 3:
				handleEditAge();
				break;
			case 4:
				handleEditPhone();
				break;
			case 5:
				handleEditHobby();
				break;
			case 99:
				console.log('취소하였습니다.');
				return;
			default:
				break;
		}
	} catch (error) {
		console.error(`[ERROR] ${error}`);
	}
}

// 5-1. 비밀번호 변경
function handleEditPassword(): void {
	console.log('새로운 비밀번호를 입력해주세요.');
	const newPassword: string = handlePasswordInput();

	const updatedMember: Member | null = updateMemberInfo(loggedInMember?.mno ?? null, {
		password: newPassword,
	});

	if (updatedMember) {
		loggedInMember = updatedMember;
		console.log('비밀번호가 변경되었습니다.');
	} else {
		console.log('비밀번호를 변경하는데 실패했습니다. 다시 시도해주세요.');
	}
}

// 5-2. 이름 변경
function handleEditName(): void {
	console.log('새로운 이름을 입력해주세요.');
	const newName: string = handleNameInput();

	const updatedMember: Member | null = updateMemberInfo(loggedInMember?.mno ?? null, {
		name: newName,
	});

	if (updatedMember) {
		loggedInMember = updatedMember;
		console.log('이름이 변경되었습니다.');
	} else {
		console.log('이름을 변경하는데 실패했습니다. 다시 시도해주세요.');
	}
}

// 5-3. 나이 변경
function handleEditAge(): void {
	console.log('새로운 나이를 입력해주세요.');
	const newAge: number = handleAgeInput();

	const updatedMember: Member | null = updateMemberInfo(loggedInMember?.mno ?? null, {
		age: newAge,
	});

	if (updatedMember) {
		loggedInMember = updatedMember;
		console.log('나이가 변경되었습니다.');
	} else {
		console.log('나이를 변경하는데 실패했습니다. 다시 시도해주세요.');
	}
}

// 5-4. 전화번호 변경
function handleEditPhone(): void {
	console.log('새로운 전화번호를 입력해주세요.');
	const newPhone: string = handlePhoneInput();

	const updatedMember: Member | null = updateMemberInfo(loggedInMember?.mno ?? null, {
		phone: newPhone,
	});

	if (updatedMember) {
		loggedInMember = updatedMember;
		console.log('전화번호가 변경되었습니다.');
	} else {
		console.log('전화번호를 변경하는데 실패했습니다. 다시 시도해주세요.');
	}
}

// 5-5. 취미 변경
function handleEditHobby(): void {
	console.log('\n<취미 추가 및 삭제>\n(추가: 1, 삭제: 2)');

	if (loggedInMember?.hobby) {
		loggedInMember.hobby.forEach((item, index) => console.log(`${index + 1}. ${item}`));
	}
	if (loggedInMember?.hobby === undefined) {
		console.log(`아직 취미가 없습니다.`);
	}

	try {
		const input = reader.question('> ');
		const selectedNumber = Number(input);
		switch (selectedNumber) {
			case 1:
				handleAddHobby();
				break;
			case 2:
				handleDeleteHobby();
				break;
			case 99:
				console.log('취소하였습니다.');
				return;
			default:
				break;
		}
	} catch (error) {
		console.error(`[ERROR] ${error}`);
	}
}

// 5-5-1. 취미 추가하기
function handleAddHobby(): void {
	console.log('추가할 취미를 입력해주세요.');
	const newHobby: string = handleHobbyInput();

	const hobbyArray: string[] = loggedInMember?.hobby ?? [];
	const newHobbyArray = [...hobbyArray];
	newHobbyArray.push(newHobby);
	const updatedMember: Member | null = updateMemberInfo(loggedInMember?.mno ?? null, {
		hobby: newHobbyArray,
	});

	if (updatedMember) {
		loggedInMember = updatedMember;
		console.log('취미가 추가되었습니다.');
	} else {
		console.log('취미를 추가하는데 실패했습니다. 다시 시도해주세요.');
	}
}

// 5-5-2. 취미 삭제하기
function handleDeleteHobby(): void {
	const hobbyArray: string[] = loggedInMember?.hobby ?? [];

	if (hobbyArray.length === 0) {
		console.log('삭제할 취미가 없습니다.');
		return;
	}

	console.log('삭제할 취미의 번호를 입력해주세요.');
	const input = reader.question('> ');
	const selectedNumber = Number(input) - 1;

	if (!hobbyArray[selectedNumber]) {
		console.log('존재하지 않는 번호입니다. 다시 입력해주세요.');
		return handleDeleteHobby();
	}

	const newHobbyArray = [...hobbyArray];
	newHobbyArray.splice(selectedNumber, 1);
	const updatedMember: Member | null = updateMemberInfo(loggedInMember?.mno ?? null, {
		hobby: newHobbyArray,
	});

	if (updatedMember) {
		loggedInMember = updatedMember;
		console.log('취미가 삭제되었습니다.');
	} else {
		console.log('취미를 삭제하는데 실패했습니다. 다시 시도해주세요.');
	}
}

// 6. 탈퇴하기
function handleAccountDeletion(): void {
	console.log('<회원 탈퇴하기>\n정말로 탈퇴하시겠습니까? (Y/N)');
	const answer = reader.question('> ');

	if (answer === 'Y') {
		const deletedId: string | null = loggedInMember?.memberId ?? null;
		deleteMember(loggedInMember?.mno ?? null);
		loggedInMember = null;
		console.log(`${deletedId}님이 탈퇴 되었습니다.`);
		return;
	}

	if (answer === 'N') {
		console.log('취소하였습니다.');
		return;
	}
}

export default runApp;
