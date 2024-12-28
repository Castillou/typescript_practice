interface Member {
	mno: number;
	memberId: string; // 4글자 이상
	password: string; // 4글자 이상
	name: string; // 2글자 이상
	age?: number;
	phone?: string;
	hobby?: string[];
	createdDate: Date;
}

export default Member;
