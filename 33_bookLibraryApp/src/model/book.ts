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

export class ITBook extends Book {
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

export class CookBook extends Book {
	private coupon: boolean;

	constructor(bno: number, title: string, writer: string, coupon: boolean) {
		super(bno, title, writer);
		this.coupon = coupon;
	}

	public info(): string {
		return `${this.bno} - CookBook / ${this.title}, ${this.writer} / ${
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

export class ComicBook extends Book {
	private durability: number;

	constructor(bno: number, title: string, writer: string, durability: number) {
		super(bno, title, writer);
		this.durability = durability;
	}

	public info(): string {
		return `${this.bno} - ComicBook / ${this.title}, ${this.writer} / 내구도: ${this.durability}`;
	}

	public minusDurability(): void {
		if (this.durability === 0) {
			console.log('만화책을 읽을 수 없습니다.');
			return;
		}
		this.durability -= 1;
		console.log(`${this.title}을 읽었습니다. (내구도: ${this.durability})`);
	}

	public getDurability(): number {
		return this.durability;
	}
}

export default Book;
