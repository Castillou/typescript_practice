import Member from '../model/member';
import { ITBook, CookBook, ComicBook } from '../model/book';

// member sample
const member1 = new Member(1, 'user1', '1234', '홍길동');
member1.programLangList = ['C', 'Javascript'];
member1.borrowBookList = [
	new ITBook(100, '모던 자바스크립트', '이웅모', 'Javascript'),
	new CookBook(200, '백종원의조리비책', '백종원'),
	new ComicBook(300, '원피스-50년간 여행', '오다 에이치로'),
];
member1.borrowBookList.forEach((book) => (book.owner = member1));

const member2 = new Member(2, 'user2', '1234', '최길동');
member2.programLangList = ['Javascript'];

const member3 = new Member(3, 'user3', '1234', '황길동');

const memberList: Array<Member> = [member1, member2, member3];

// memberApi
export function getMemberListAll(): Member[] {
	return memberList;
}

export function getOneMember(id: string): Member | null {
	const findedMember: Member | null = memberList.find((member) => member.memberId === id) ?? null;
	return findedMember;
}
