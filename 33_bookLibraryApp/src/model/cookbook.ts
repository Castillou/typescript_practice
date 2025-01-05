import Book from './book';

class CookBook extends Book {
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

export default CookBook;
