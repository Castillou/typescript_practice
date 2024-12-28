interface TodoItem {
	no: number;
	task: string;
	createdDate: Date;
	isCompleted: boolean;
	completedDate: Date | null;
}

export default TodoItem;
