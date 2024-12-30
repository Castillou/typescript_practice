import Member from '../model/member';
import { bookList } from './booklistApi';

// member sample
const member1 = new Member(1, 'user1', '1234', 'Sean');
member1.borrowBookList = [bookList[0], bookList[1], bookList[2]];
member1.borrowBookList.forEach((book) => (book.owner = member1));

const member2 = new Member(2, 'user2', '1234', 'Alice');
member2.borrowBookList = [bookList[4], bookList[5]];
member2.borrowBookList.forEach((book) => (book.owner = member2));

const member3 = new Member(3, 'user3', '1234', 'John');
member3.borrowBookList = [bookList[9], bookList[10]];
member3.borrowBookList.forEach((book) => (book.owner = member3));

const memberList: Array<Member> = [member1, member2, member3];

// memberApi
export function getMemberListAll(): Member[] {
	return memberList;
}

export function getOneMember(id: string): Member | null {
	const findedMember: Member | null = memberList.find((member) => member.memberId === id) ?? null;
	return findedMember;
}
