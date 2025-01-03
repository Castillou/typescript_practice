import Member from '../model/Member';

const memberList: Member[] = [
	{
		mno: 1,
		memberId: 'sean12',
		password: '1234',
		name: 'Sean',
		age: 26,
		phone: '010-1234-5678',
		hobby: ['reading', 'cycling', 'gaming'],
		createdDate: new Date('2024-01-01'),
	},
	{
		mno: 2,
		memberId: 'jane_doe',
		password: 'janePass',
		name: 'Jane',
		hobby: ['painting', 'hiking'],
		createdDate: new Date('2024-02-15'),
	},
	{
		mno: 3,
		memberId: 'mark85',
		password: 'mark1985',
		name: 'Mark Lee',
		age: 39,
		createdDate: new Date('2023-12-30'),
	},
	{
		mno: 4,
		memberId: 'sara77',
		password: 'secure77',
		name: 'Sara',
		phone: '010-3333-4444',
		hobby: ['yoga', 'cooking'],
		createdDate: new Date('2024-03-10'),
	},
	{
		mno: 5,
		memberId: 'alexkim',
		password: 'alex1234',
		name: 'Alex',
		createdDate: new Date('2024-04-05'),
	},
];

export function getMemberListAll(): Member[] {
	return memberList;
}

export function getOneMember(id: string): Member | null {
	const findedMember: Member | null = memberList.find((member) => member.memberId === id) ?? null;
	return findedMember;
}

export function createMember(newMember: Member): boolean {
	memberList.push(newMember);
	return true;
}

export function updateMemberInfo(mno: number | null, updatedData: Object): Member | null {
	if (mno === null) {
		return null;
	}

	const findedMemberIndex: number = memberList.findIndex((member) => member.mno === mno);
	memberList[findedMemberIndex] = { ...memberList[findedMemberIndex], ...updatedData };
	return memberList[findedMemberIndex];
}

export function deleteMember(mno: number | null): boolean | null {
	if (mno === null) {
		return null;
	}
	const findedMemberIndex: number = memberList.findIndex((member) => member.mno === mno);
	memberList.splice(findedMemberIndex, 1);
	return true;
}
