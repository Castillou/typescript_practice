interface BookFactory {
	createBook(bookData: BookData): Book;
	getNextNumber(): number;
	validateData(bookData: BookData): void;
}

class ITBookFactory implements BookFactory {
	createBook(bookData: BookData): Book {
		this.validateData(bookData);
		return new ITBook(this.getNextNumber(), bookData.title, bookData.writer, bookData.language!);
	}

	getNextNumber(): number {
		const ITBooks = getBooksByCategory<ITBook>(1);
		return createNextBookNumber<ITBook>(ITBooks);
	}

	validateData(bookData: BookData): void {
		if (!bookData.language) {
			throw new Error('언어가 전달되지 않았습니다.');
		}
	}
}

import Book from '../model/book';
import ITBook from '../model/itbook';
import CookBook from '../model/cookbook';
import ComicBook from '../model/comicbook';
import { BookData, createNextBookNumber, getBooksByCategory } from './booklistApi';

class CookBookFactory implements BookFactory {
	createBook(bookData: BookData): Book {
		this.validateData(bookData);
		return new CookBook(this.getNextNumber(), bookData.title, bookData.writer, bookData.coupon!);
	}

	getNextNumber(): number {
		const CookBooks = getBooksByCategory<CookBook>(2);
		return createNextBookNumber<CookBook>(CookBooks);
	}

	validateData(bookData: BookData): void {
		if (bookData.coupon === undefined) {
			throw new Error('쿠폰 여부가 전달되지 않았습니다.');
		}
	}
}

class ComicBookFactory implements BookFactory {
	createBook(bookData: BookData): Book {
		this.validateData(bookData);
		return new ComicBook(
			this.getNextNumber(),
			bookData.title,
			bookData.writer,
			bookData.durability!
		);
	}

	getNextNumber(): number {
		const ComicBooks = getBooksByCategory<ComicBook>(3);
		return createNextBookNumber<ComicBook>(ComicBooks);
	}

	validateData(bookData: BookData): void {
		if (!bookData.durability) {
			throw new Error('내구도가 전달되지 않았습니다.');
		}
	}
}

export const bookFactoies = new Map<number, BookFactory>([
	[1, new ITBookFactory()],
	[2, new CookBookFactory()],
	[3, new ComicBookFactory()],
]);
