interface MemberForm {
	mno: number;
	memberId: string; // 4글자 이상
	password: string; // 4글자 이상
	name: string; // 2글자 이상
	age?: number | undefined;
	phone?: string | undefined;
	hobby?: string[] | undefined;
}

export default MemberForm;
