import TodoItem from '../model/todoitem';

// const todoList: TodoItem[] = [];

const todoList: TodoItem[] = [
	{
		no: 1,
		task: '장보기',
		createdDate: new Date('2024-12-20'),
		isCompleted: false,
		completedDate: null,
	},
	{
		no: 2,
		task: '타입스크립트 블로그 포스팅 마무리',
		createdDate: new Date('2024-12-18'),
		isCompleted: true,
		completedDate: new Date('2024-12-19'),
	},
	{
		no: 3,
		task: '주말 여행 계획 짜기',
		createdDate: new Date('2024-12-15'),
		isCompleted: false,
		completedDate: null,
	},
	{
		no: 4,
		task: '부모님에게 전화하기',
		createdDate: new Date('2024-12-21'),
		isCompleted: true,
		completedDate: new Date('2024-12-21'),
	},
	{
		no: 5,
		task: '자바스크립트 노트 정리하기',
		createdDate: new Date('2024-12-19'),
		isCompleted: false,
		completedDate: null,
	},
];

export function getTodoListAll(): TodoItem[] {
	return todoList;
}

export function getListItem(no: number): TodoItem | null {
	const item: TodoItem = todoList.find((item) => item.no === no)!;
	return item;
}

export function createTodo(newItem: TodoItem): number {
	todoList.push(newItem);
	return todoList.length;
}

export function updateTodo(no: number): TodoItem {
	const index: number = todoList.findIndex((item) => item.no === no)!;
	todoList[index].isCompleted = true;
	todoList[index].completedDate = new Date();
	return todoList[index];
}

export function deleteTodo(no: number): number {
	const index: number = todoList.findIndex((item) => item.no === no)!;
	todoList.splice(index, 1);
	return todoList.length;
}
