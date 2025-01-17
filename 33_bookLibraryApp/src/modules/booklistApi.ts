import Book from '../model/book';
import ITBook from '../model/itbook';
import CookBook from '../model/cookbook';
import ComicBook from '../model/comicbook';
import { bookFactoies } from './bookFactory';
export interface BookData {
	title: string;
	writer: string;
	language?: string;
	coupon?: boolean;
	durability?: number;
}

export const bookList: Array<Book> = [
	new ITBook(100, '모던 자바스크립트', '이웅모', 'Javascript'),
	new ITBook(101, '자바의 정석', '남궁성', 'Java'),
	new ITBook(102, '열혈C언어', '윤성우', 'C'),
	new ITBook(103, '타임스크립트 교과서', '조현영', 'Typescript'),
	new ITBook(104, 'TheC++언어', '비야네스트', 'C++'),
	new CookBook(200, '백종원의조리비책', '백종원', true),
	new CookBook(203, '비벼야 산다', '유비빔', true),
	new CookBook(205, '얼마나맛있게요', '이혜정', true),
	new ComicBook(301, '원피스-50년간 여행', '오다', 90),
	new ComicBook(302, '신의탑', '시우', 85),
	new ComicBook(303, '귀멸의칼날', '고토게', 50),
];

// 선택한 번호에 해당하는 카테고리의 책 배열을 반환하는 함수
export function getBooksByCategory<T extends Book>(categoryNumber: number): Array<T> {
	let filteredBooks: Array<Book> = [];

	if (categoryNumber === 1) {
		filteredBooks = bookList.filter((book) => book instanceof ITBook);
	}
	if (categoryNumber === 2) {
		filteredBooks = bookList.filter((book) => book instanceof CookBook);
	}
	if (categoryNumber === 3) {
		filteredBooks = bookList.filter((book) => book instanceof ComicBook);
	}

	return filteredBooks as Array<T>;
}

// 책의 다음 번호를 생성하는 헬퍼 함수
export function createNextBookNumber<T extends Book>(books: Array<T>): number {
	const nextNumber = Math.max(...books.map((book) => Number(book.info().substring(0, 3)))) + 1;
	return nextNumber;
}

export function getBookListAll(): Book[] {
	bookList.sort((a, b) => Number(a.info().substring(0, 3)) - Number(b.info().substring(0, 3)));
	return bookList;
}

export function createNewBook(categoryNumber: number, bookData: BookData) {
	const factory = bookFactoies.get(categoryNumber);
	if (!factory) {
		throw new Error('유효하지 않은 카테고리 번호입니다.');
	}

	const newBook = factory.createBook(bookData);
	bookList.push(newBook);
}
