import reader from 'readline-sync';
import Member from '../model/member';
import Book from '../model/book';
import ITBook from '../model/itbook';
import CookBook from '../model/cookbook';
import ComicBook from '../model/comicbook';
import { getMemberListAll } from '../modules/memberlistApi';
import inputView from './inputView';
import { BookData, createNewBook, getBookListAll } from '../modules/booklistApi';
import { selectBook } from '../util/selectBook';

// 윈도우에서 한글 입력 안되는 경우 chcp 65001
reader.setDefaultOptions({ encoding: 'utf8' });

let loggedInMember: Member | null = null;

function runApp(): void {
	while (true) {
		try {
			loggedInMember === null ? printMenu() : printLoginMenu();
			const input = reader.question('> ');
			const menuNum = Number(input);
			switch (menuNum) {
				case 1:
					if (loggedInMember === null) {
						handleLogin();
					} else {
						getAllBooks();
					}
					break;
				case 2:
					if (loggedInMember === null) break;
					getBorrowedBooks();
					break;
				case 3:
					if (loggedInMember === null) break;
					borrowBook();
					break;
				case 4:
					if (loggedInMember === null) break;
					returnBook();
					break;
				case 5:
					if (loggedInMember === null) break;
					donateBook();
					break;
				case 6:
					if (loggedInMember === null) break;
					getUserInfo();
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

// 로그인 기능
function handleLogin(): void {
	console.log('\n아이디를 입력해주세요.');
	const findedMember: Member = inputView.validateAndFetchMember();
	console.log('비밀번호를 입력해주세요.');
	inputView.validatePassword(findedMember);

	loggedInMember = findedMember;
	console.log('로그인에 성공하였습니다.');
}

////////// 1. 전체 도서 리스트 보기 기능
function getAllBooks(): void {
	const books: Array<Book> = getBookListAll();

	let renderText = '\n<전체 도서 리스트>';
	books.forEach((book) => {
		const isAvailableForLoanText =
			book.owner === null
				? ` / 대출가능`
				: ` / 대출불가(소유자: ${book.owner.memberId}, ${book.owner.name})`;
		renderText += '\n' + book.info() + isAvailableForLoanText;
	});

	console.log(renderText);
}

////////// 2. 내가 대여한 도서 보기 기능
function getBorrowedBooks(): void {
	let renderText = '\n<내가 대여한 도서 보기>';

	const borrowBooks = loggedInMember?.borrowBookList ?? [];

	if (borrowBooks.length === 0) {
		renderText += '\n아직 대여한 도서가 없습니다.';
		return;
	}

	borrowBooks.sort((a, b) => Number(a.info().substring(0, 3)) - Number(b.info().substring(0, 3)));

	borrowBooks.forEach((book) => {
		renderText += '\n' + book.info();
	});

	console.log(renderText);

	chooseAction(borrowBooks);
}

// 2-1. 어떤 행동을 할지 선택하는 함수
function chooseAction(borrowBooks: Array<Book>): void {
	try {
		console.log('메뉴: 1) 프로그램 공부하기, 2) 요리쿠폰 사용, 3) 만화책 보기, 4) 끝내기');
		const input = reader.question('> ');
		const menuNum = Number(input);
		switch (menuNum) {
			case 1:
				console.log('<프로그램 공부 할 수 있는 책 선택>');
				const ITBooks = borrowBooks.filter((book) => book.info().startsWith('1'));
				selectedBookAction(ITBooks);
				break;
			case 2:
				console.log('<요리쿠폰 사용 책 선택>');
				const CookBooks = borrowBooks.filter((book) => book.info().startsWith('2'));
				selectedBookAction(CookBooks);
				break;
			case 3:
				console.log('<만화책 보기>');
				const ComicBooks = borrowBooks.filter((book) => book.info().startsWith('3'));
				selectedBookAction(ComicBooks);
				break;
			case 4:
				return;
			default:
				break;
		}
		console.log('');
	} catch (error) {
		console.error(`[ERROR] ${error}`);
	}
}

// 2-2. 어떤 도서로 행동을 진행할지 선택하는 함수
function selectedBookAction<T extends Book>(bookList: Array<T>): void {
	if (bookList.length === 0) {
		console.log('해당 도서가 존재하지 않습니다.');
		return;
	}

	bookList.forEach((book) => {
		console.log(book.info());
	});

	const selectedBook = selectBook(bookList);

	if (selectedBook instanceof ITBook) {
		const learnningLang = selectedBook?.getLanguage();
		loggedInMember?.learnProgramLang(learnningLang);
		console.log(`${learnningLang}를 공부하였습니다.`);
	}

	if (selectedBook instanceof CookBook) {
		selectedBook.useCoupon();
	}

	if (selectedBook instanceof ComicBook) {
		selectedBook.minusDurability();
	}
}

////////// 3. 도서 대여하기 기능
function borrowBook(): void {
	const availableBooks: Array<Book> = getBookListAll().filter((book) => book.owner === null);

	let renderText = '\n<대출 가능한 도서 리스트>';

	if (availableBooks.length === 0) {
		console.log('대출 가능한 도서가 없습니다.');
		return;
	}

	availableBooks.forEach((book) => {
		renderText += '\n' + book.info() + ' / 대출가능';
	});

	console.log(renderText);

	borrowBookAction(availableBooks);
}

// 3-1 대여할 도서 선택 및 액션 함수
function borrowBookAction(bookList: Array<Book>): void {
	const selectedBook = selectBook(bookList, '빌릴 책을 입력하세요\n');

	loggedInMember?.borrowBookList.push(selectedBook);
	selectedBook.owner = loggedInMember;

	console.log(`대출이 완료되었습니다.`);
}

////////// 4. 도서 반납하기 기능
function returnBook(): void {
	const borrowBooks: Array<Book> = loggedInMember?.borrowBookList ?? [];

	let renderText = '\n<반납할 도서 리스트>';

	if (borrowBooks.length === 0) {
		console.log('반납할 도서가 없습니다.');
		return;
	}

	borrowBooks.forEach((book) => {
		renderText += '\n' + book.info();
	});

	console.log(renderText);

	returnBookAction(borrowBooks);
}

// 4-1 반납할 도서 선택 및 액션 함수
function returnBookAction(bookList: Array<Book>): void {
	const selectedBook = selectBook(bookList, '반납할 책을 입력하세요\n');

	const currentUserBookList = loggedInMember?.borrowBookList;

	if (!currentUserBookList) {
		return;
	}

	const bookIndex = currentUserBookList.indexOf(selectedBook);
	currentUserBookList.splice(bookIndex, 1);
	selectedBook.owner = null;
	console.log(`${selectedBook.getTitle()}이(가) 반납 되었습니다.`);
}

////////// 5. 도서 기증하기 기능
function donateBook() {
	let renderText = '\n<도서 기증하기(생성)>\n책의 종류\n1) ITBook, 2) CookBook, 3) ComicBook';
	console.log(renderText);

	const categoryNumber: number = inputView.validateCategoryInput();
	const title: string = inputView.validateTitleInput('도서의 이름을 입력하세요.\n');
	const writer: string = inputView.validateNameInput('저자\n');

	let bookData: BookData = { title, writer };
	if (categoryNumber === 1) {
		const language: string = reader.question('언어\n> ');
		bookData.language = language;
	}

	if (categoryNumber === 2) {
		const coupon: boolean = inputView.validateCouponInput('쿠폰 유무(Y/N)\n');
		bookData.coupon = coupon;
	}

	if (categoryNumber === 3) {
		const durability: number = inputView.validateDurabilityInput('내구도\n');
		bookData.durability = durability;
	}

	createNewBook(categoryNumber, bookData);
	console.log('기증이 완료되었습니다.');
}

////////// 6. 사용자 정보보기 기능
function getUserInfo(): void {
	const members: Array<Member> = getMemberListAll();

	let renderText = '\n<사용자 정보보기>';
	members.forEach((member) => {
		renderText += member.info();
	});

	console.log(renderText);
}

export default runApp;
