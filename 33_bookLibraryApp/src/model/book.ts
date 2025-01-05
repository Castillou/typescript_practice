import Member from './member';

abstract class Book {
	protected bno: number;
	protected title: string;
	protected writer: string;
	protected _owner: Member | null;

	constructor(bno: number, title: string, writer: string) {
		this.bno = bno;
		this.title = title;
		this.writer = writer;
		this._owner = null;
	}

	public get owner() {
		return this._owner;
	}

	public set owner(owner: Member | null) {
		this._owner = owner;
	}

	public getTitle() {
		return this.title;
	}

	public abstract info(): string;
}

export default Book;
