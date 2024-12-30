import Member from '../model/member';

// member sample
const member1 = new Member(1, 'user1', '1234', 'Sean');

const member2 = new Member(2, 'user2', '1234', 'Alice');

const member3 = new Member(3, 'user3', '1234', 'John');

export const memberList: Array<Member> = [member1, member2, member3];

// memberApi
export function getMemberListAll(): Member[] {
	return memberList;
}

export function getOneMember(id: string): Member | null {
	const findedMember: Member | null = memberList.find((member) => member.memberId === id) ?? null;
	return findedMember;
}
