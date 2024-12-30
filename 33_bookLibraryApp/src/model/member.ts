import Book from './book';

class Member {
	mno: number;
	memberId: string;
	password: string;
	name: string;
	borrowBookList: Array<Book> | null;
	programLangList: Array<string> | null;

	constructor(mno: number, memberId: string, password: string, name: string) {
		this.mno = mno;
		this.memberId = memberId;
		this.password = password;
		this.name = name;
		this.borrowBookList = null;
		this.programLangList = null;
	}
}

export default Member;
