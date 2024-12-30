import Book, { ITBook, CookBook, ComicBook } from '../model/book';

const bookList: Array<Book> = [
	new ITBook(100, '모던 자바스크립트', '이웅모', 'Javascript'),
	new ITBook(101, '자바의 정석', '남궁성', 'Java'),
	new ITBook(102, '열혈C언어', '윤성우', 'C'),
	new ITBook(103, '타임스크립트 교과서', '조현영', 'Typescript'),
	new ITBook(104, 'TheC++언어', '비야네스트', 'C++'),
	new CookBook(200, '백종원의조리비책', '백종원'),
	new CookBook(203, '비버야 산다', '유비빔'),
	new CookBook(205, '얼마나맛있게요', '이혜정'),
	new ComicBook(301, '원피스-50년간 여행', '오다'),
	new ComicBook(302, '탑의신', '시우'),
	new ComicBook(303, '귀멸의칼날', '악어'),
];

// memberApi
export function getBookListAll(): Book[] {
	return bookList;
}
