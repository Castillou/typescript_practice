import Member from './member';

abstract class Book {
	protected bno: number;
	protected title: string;
	protected writer: string;
	protected _owner: Member | null;

	constructor(bno: number, title: string, writer: string, owner: Member | null) {
		this.bno = bno;
		this.title = title;
		this.writer = writer;
		this._owner = owner;
	}

	get owner() {
		return this._owner;
	}

	set owner(owner: Member | null) {
		this._owner = owner;
	}

	public abstract info(): string;
}

export class ITBook extends Book {
	private language: string;

	constructor(bno: number, title: string, writer: string, owner: Member | null, language: string) {
		super(bno, title, writer, owner);
		this.language = language;
	}

	public info(): string {
		return `${this.bno} - ITBook / ${this.title} / ${this.writer} / ${this.language}`;
	}

	public getLanguage(): string {
		return this.language;
	}
}

export default Book;
