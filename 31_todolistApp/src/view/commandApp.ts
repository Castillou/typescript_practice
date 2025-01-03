import dayjs from 'dayjs';
import reader from 'readline-sync';
import TodoItem from '../model/todoitem';
import {
	getTodoListAll,
	createTodo,
	updateTodo,
	deleteTodo,
	getIncompleteTodoList,
	getCompleteTodoList,
} from '../modules/todolistApi';

// 윈도우에서 한글 입력 안되는 경우 chcp 65001
reader.setDefaultOptions({ encoding: 'utf8' });

function runApp(): void {
	while (true) {
		try {
			printMenu();
			const input = reader.question('> ');
			// console.log("입력값 :",input);
			const menuNum = Number(input);
			switch (menuNum) {
				case 1:
					printTodoList();
					break;
				case 2:
					inputTodoList();
					break;
				case 3:
					completeTodo();
					break;
				case 4:
					checkCompletedTodos();
					break;
				case 5:
					deleteTodoItem();
					break;
				case 99:
					return;
				default:
					break;
			}
			console.log('');
		} catch (error) {
			console.error(error);
			console.log('잘못된 입력입니다.');
		}
	}
}

function printMenu(): void {
	console.log('<TodoList App>');
	console.log('1. todolist 전체 리스트 보기');
	console.log('2. todolist 추가 하기');
	console.log('3. todolist 완료 하기');
	console.log('4. todolist 완료 개수 확인하기');
	console.log('5. todolist 할일 삭제하기');
	console.log('99. 종료하기');
}

// createListText: list 입력값을 텍스트로 변환해서 반환하는 함수
function createListText(list: TodoItem[]): string {
	let listText = '';
	list.forEach(({ no, task, createdDate, isCompleted, completedDate }) => {
		let completeText = ` / 완료여부: ${isCompleted ? 'O' : 'X'}`;
		if (isCompleted && completedDate) {
			completeText += `, 완료일: ${dayjs(completedDate).format('YYYY-MM-DD')}`;
		}
		listText += `\n${no}: ${task} / 작성일: ${dayjs(createdDate).format(
			'YYYY-MM-DD'
		)}${completeText}`;
	});
	return listText;
}

// 1. todolist 전체 리스트 보기
function printTodoList(): void {
	const todoList = getTodoListAll();

	let txt = '\n<나의 모든 할일>';
	txt += createListText(todoList);
	console.log(txt);
}

// 2. todolist 추가 하기
function inputTodoList(): void {
	const newNo = Math.max(...getTodoListAll().map((item) => item.no)) + 1;

	console.log('\n<TodoList 추가하기>\n할일을 입력해주세요.');
	const newTask = reader.question('> ').trim();

	if (!newTask) {
		console.log('할일의 내용을 입력해주세요.');
		return inputTodoList();
	}

	if (newTask === '취소' || newTask === '99') {
		console.log('취소하였습니다.');
		return;
	}

	let input: TodoItem = {
		no: newNo,
		task: newTask,
		createdDate: new Date(),
		isCompleted: false,
		completedDate: null,
	};

	let listLength = createTodo(input);
	if (listLength) {
		console.log(`todo를 추가하였습니다. (항목: 총 ${listLength}개)`);
	} else {
		console.log('todo 추가에 실패하였습니다.');
	}
}

// 3. todolist 완료 하기
function completeTodo(): void {
	const incompleteTasks = getIncompleteTodoList();

	let txt = '\n<TodoList 미완료 리스트>';
	txt += createListText(incompleteTasks);
	txt += '\n완료할 번호를 입력하세요. (취소: 99)';
	console.log(txt);

	const target = reader.question('> ');

	if (target === '99') {
		console.log('취소하였습니다.');
		return;
	}

	const targetNumber = Number(target);
	const incompleteTaskNumbers = incompleteTasks.map((item) => item.no);
	if (!incompleteTaskNumbers.includes(targetNumber)) {
		console.log('리스트에 존재하는 번호만 입력해주세요.');
		return completeTodo();
	}

	let updatedItem = updateTodo(targetNumber);

	if (updatedItem) {
		const completeTasks = getCompleteTodoList().length;
		const incompleteTasks = getIncompleteTodoList().length;
		console.log(
			`${updatedItem.task}가 ${dayjs(updatedItem.completedDate).format(
				'YYYY-MM-DD HH:mm:ss'
			)}에 완료 되었습니다. (완료 : ${completeTasks}개, 미완료 ${incompleteTasks}개)`
		);
	} else {
		console.log('할일을 완료하지 못했습니다.');
	}
}

// 4. todolist 완료 개수 확인하기
function checkCompletedTodos(): void {
	const completeTasks = getCompleteTodoList();

	let txt = `\n현재까지 완료된 일은 총 ${completeTasks.length}개 입니다.`;
	txt += '\n<TodoList 완료 리스트>';
	txt += createListText(completeTasks);
	console.log(txt);
}

// 5. todolist 할일 삭제하기
function deleteTodoItem() {
	printTodoList();
	const todoListNumbers = getTodoListAll().map((item) => item.no);

	console.log('\n삭제할 번호를 입력하세요. (취소: 99)');
	const target = reader.question('> ');

	if (target === '99') {
		console.log('취소하였습니다.');
		return;
	}

	const targetNumber = Number(target);
	if (!todoListNumbers.includes(targetNumber)) {
		console.log('리스트에 존재하는 번호만 입력해주세요.');
		return deleteTodoItem();
	}

	let listLength = deleteTodo(targetNumber);
	if (listLength) {
		console.log(`todo를 삭제하였습니다. (항목: 총 ${listLength}개)`);
	} else {
		console.log('todo 삭제에 실패하였습니다.');
	}
}

export default runApp;
