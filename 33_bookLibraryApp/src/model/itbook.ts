import Book from './book';

class ITBook extends Book {
	private language: string;

	constructor(bno: number, title: string, writer: string, language: string) {
		super(bno, title, writer);
		this.language = language;
	}

	public info(): string {
		return `${this.bno} - ITBook / ${this.title}, ${this.writer} / ${this.language}`;
	}

	public getLanguage(): string {
		return this.language;
	}
}

export default ITBook;
