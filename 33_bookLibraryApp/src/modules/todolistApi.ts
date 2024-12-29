import Member from '../model/member';

// const todoList: TodoItem[] = [];

const memberList: Member[] = [];

export function getMemberListAll(): Member[] {
	return memberList;
}

export function getOneMember(no: number): boolean {
	return true;
}

export function createMember(newItem: Member): boolean {
	return true;
}

export function updateMember(no: number): boolean {
	return true;
}

export function deleteMember(no: number): boolean {
	return true;
}
