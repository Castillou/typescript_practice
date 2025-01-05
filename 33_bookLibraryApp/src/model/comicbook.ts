import Book from './book';

class ComicBook extends Book {
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

export default ComicBook;
