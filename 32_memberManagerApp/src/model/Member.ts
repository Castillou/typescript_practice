interface Member {
	mno: number;
	memberId: string; // 4글자 이상
	password: string; // 4글자 이상
	name: string; // 2글자 이상
	age?: number | undefined;
	phone?: string | undefined;
	hobby?: string[] | undefined;
	createdDate: Date;
}

export default Member;

// git commit -m ":art:style: 옵션에 undefined 타입 추가 및 MemberForm 파일 추가"
// git commit -m ":recycle:refactor: book에서 확장된 클래스인 itbook, cookbook, comicbook을 별도의 파일로 분리"
