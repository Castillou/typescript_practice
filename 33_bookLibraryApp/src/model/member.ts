import Book from './book';

class Member {
	mno: number;
	memberId: string;
	password: string;
	name: string;
	borrowBookList: Array<Book>;
	programLangList: Array<string>;

	constructor(mno: number, memberId: string, password: string, name: string) {
		this.mno = mno;
		this.memberId = memberId;
		this.password = password;
		this.name = name;
		this.borrowBookList = [];
		this.programLangList = [];
	}

	public info(): string {
		const availableLang =
			this.programLangList?.length === 0 ? '' : ` [ ${this.programLangList?.join(', ')} ]`;
		let infoText = `\n${this.mno}. ${this.memberId} / ${this.password} / ${this.name}${availableLang}`;

		if (this.borrowBookList?.length === 0) {
			infoText += '\n└ 빌린 책 없음';
		} else {
			this.borrowBookList?.forEach((book) => {
				infoText += '\n└ ' + book.info();
			});
		}

		return infoText;
	}

	public learnProgramLang(lang: string): void {
		this.programLangList.push(lang);
	}
}

export default Member;
