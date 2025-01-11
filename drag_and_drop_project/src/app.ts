// Project Type
enum ProjectStatus {
	Active,
	Finished,
}
class Project {
	constructor(
		public id: string,
		public title: string,
		public description: string,
		public people: number,
		public status: ProjectStatus
	) {}
}

// Project State Listener
type Listener = (items: Project[]) => void;

// Project State Management
class ProjectState {
	private listeners: Listener[] = [];
	private projects: Project[] = [];
	private static instance: ProjectState;

	private constructor() {}

	static getInstance() {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new ProjectState();
		return this.instance;
	}

	addListener(listenerFn: Listener) {
		this.listeners.push(listenerFn);
	}

	addProject(title: string, description: string, numOfPeople: number) {
		const newProject = new Project(
			Math.random().toString(),
			title,
			description,
			numOfPeople,
			ProjectStatus.Active
		);
		this.projects.push(newProject);

		for (const listenerFn of this.listeners) {
			listenerFn(this.projects.slice());
		}
	}
}

// 싱글톤
// : 생성자가 여러 차례 호출되더라도 실제로 생성되는 객체는 하나이고,
// 최초 생성 이후에 호출된 생성자는 최초의 생성자가 생성한 객체를 리턴한다.
// -> 프로젝트에 대해 하나의 상태 관리 객체만 있기를 원하기 때문에 사용
const projectState = ProjectState.getInstance();

// Validation
interface Validatable {
	value: string | number;
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
}

function validate(validatableInput: Validatable) {
	let isValid = true;
	if (validatableInput.required) {
		isValid = isValid && validatableInput.value.toString().trim().length !== 0;
	}

	if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
		isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
	}

	if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
		isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
	}

	if (validatableInput.min != null && typeof validatableInput.value === 'number') {
		isValid = isValid && validatableInput.value >= validatableInput.min;
	}

	if (validatableInput.max != null && typeof validatableInput.value === 'number') {
		isValid = isValid && validatableInput.value <= validatableInput.max;
	}

	return isValid;
}

// autobind decotator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
	const originalMethod = descriptor.value;
	const adjDescriptor: PropertyDescriptor = {
		configurable: true,
		get() {
			const boundFn = originalMethod.bind(this);
			return boundFn;
		},
	};

	return adjDescriptor;
}

// ProjectList Class
class ProjectList {
	templeteElement: HTMLTemplateElement;
	hostElement: HTMLDivElement;
	element: HTMLElement;
	assignedProjects: Project[];

	constructor(private type: 'active' | 'finished') {
		this.templeteElement = document.getElementById('project-list')! as HTMLTemplateElement;
		this.hostElement = document.getElementById('app')! as HTMLDivElement;
		this.assignedProjects = [];

		const importNode = document.importNode(this.templeteElement.content, true);
		this.element = importNode.firstElementChild as HTMLElement;
		this.element.id = `${this.type}-projects`;

		projectState.addListener((projects: Project[]) => {
			this.assignedProjects = projects;
			this.renderProjects();
		});

		this.attach();
		this.renderContent();
	}

	private renderProjects() {
		const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
		for (const prjItem of this.assignedProjects) {
			const listItem = document.createElement('li');
			listItem.textContent = prjItem.title;
			listEl.appendChild(listItem);
		}
	}

	private renderContent() {
		const listId = `${this.type}-projects-list`;
		this.element.querySelector('ul')!.id = listId;
		this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS';
	}

	private attach() {
		this.hostElement.insertAdjacentElement('beforeend', this.element);
	}
}

// ProjectInput Class
class ProjectInput {
	templeteElement: HTMLTemplateElement;
	hostElement: HTMLDivElement;
	element: HTMLFormElement;
	titleInputElement: HTMLInputElement;
	descriptionInputElement: HTMLInputElement;
	peopleInputElement: HTMLInputElement;

	constructor() {
		this.templeteElement = document.getElementById('project-input')! as HTMLTemplateElement;
		this.hostElement = document.getElementById('app')! as HTMLDivElement;

		const importNode = document.importNode(this.templeteElement.content, true);
		// <templete> 태그들 사이에 있는 HTML 코드에 대한 참조를 제공함, 두번째 인수는 깊은 복사를 사용하여 그걸 임포트 할 것인지 정의함
		this.element = importNode.firstElementChild as HTMLFormElement;
		this.element.id = 'user-input';

		this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
		this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
		this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

		this.configure();
		this.attach();
	}

	private gatherUserInput(): [string, string, number] | void {
		const enteredTitle = this.titleInputElement.value;
		const enteredDescription = this.descriptionInputElement.value;
		const enteredPeople = this.peopleInputElement.value;

		const titleValidatable: Validatable = {
			value: enteredTitle,
			required: true,
		};
		const descriptionValidatable: Validatable = {
			value: enteredDescription,
			required: true,
			minLength: 5,
		};
		const peopleValidatable: Validatable = {
			value: +enteredPeople,
			required: true,
			minLength: 5,
			min: 1,
			max: 5,
		};

		if (
			!validate(titleValidatable) ||
			!validate(descriptionValidatable) ||
			!validate(peopleValidatable)
		) {
			alert('Invalid input, please try again!');
			return;
		} else {
			return [enteredTitle, enteredDescription, +enteredPeople];
		}
	}

	private clearInput() {
		this.titleInputElement.value = '';
		this.descriptionInputElement.value = '';
		this.peopleInputElement.value = '';
	}

	@autobind
	private submitHandler(event: Event) {
		event.preventDefault();
		const userInput = this.gatherUserInput();
		if (Array.isArray(userInput)) {
			const [title, description, people] = userInput;
			projectState.addProject(title, description, people);
			this.clearInput();
		}
	}

	private configure() {
		this.element.addEventListener('submit', this.submitHandler);
	}

	private attach() {
		this.hostElement.insertAdjacentElement('afterbegin', this.element);
	}
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
