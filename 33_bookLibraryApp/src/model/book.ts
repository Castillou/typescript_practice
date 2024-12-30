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
export class CookBook extends Book {
	private coupon: boolean;

	constructor(bno: number, title: string, writer: string, owner: Member | null) {
		super(bno, title, writer, owner);
		this.coupon = true;
	}

	public info(): string {
		return `${this.bno} - ITBook / ${this.title} / ${this.writer} / ${
			this.coupon ? '요리쿠폰 있음' : '요리쿠폰 없음'
		}`;
	}

	public getCoupon(): boolean {
		return this.coupon;
	}

	public useCoupon(): void {
		if (!this.coupon) {
			console.log('쿠폰을 사용할 수 없습니다.');
			return;
		}
		this.coupon = false;
		console.log(`${this.title} 요리 쿠폰을 사용하였습니다.`);
	}
}

export default Book;
