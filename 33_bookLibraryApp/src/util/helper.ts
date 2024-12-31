import reader from 'readline-sync';
import Book from '../model/book';

// 사용자가 책 번호를 입력하고 해당 번호에 맞는 책을 찾아 반환하는 헬퍼 함수
export function selectBook(bookList: Array<Book>, questionText: string = '') {
	const selectedBookNumber = reader.question(`${questionText}> `);
	const selectedBook = bookList.find((book) => book.info().startsWith(selectedBookNumber));

	if (selectedBookNumber === '999') {
		throw new Error('취소되었습니다');
	}

	if (!selectedBook) {
		console.log('리스트에 존재하는 번호를 입력해주세요.');
		return selectBook(bookList);
	}

	return selectedBook;
}
