import Member from '../model/member';

const memberList: Array<Member> = [
	new Member(1, 'user01', '1234', 'Sean'),
	new Member(2, 'user02', '1234', 'Alice'),
	new Member(3, 'user03', '1234', 'Charlie'),
];

export function getMemberListAll(): Member[] {
	return memberList;
}

export function getOneMember(id: string): Member | null {
	const findedMember: Member | null = memberList.find((member) => member.memberId === id) ?? null;
	return findedMember;
}
