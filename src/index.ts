import './css/style.css';

// Create an element with an optional CSS class
const createElement = (tag: string, className: string, attributes: { [key: string]: any }) => {
    const element = document.createElement(tag)
    if (className) element.className = className;

    if (attributes) {
        for (const key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
    }

    return element
}

// Retrieve an element from the DOM
const getElement = (selector: string) => {
    const element = document.querySelector(selector)

    return element
}

const KanBanBoard = function (root: HTMLElement) {

    let todoCount = 0, inProgressCount = 0, completedCount = 0;

    function initHandlers() {
        const todoForm = getElement('.kanabn__todo__form');
        const inProgressForm = getElement('.kanabn__inprogress__form');
        const completedForm = getElement('.kanabn__completed__form');
        todoForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const val = (<HTMLInputElement>getElement('.kanban__todo__input')).value;
            (<HTMLInputElement>getElement('.kanban__todo__input')).value = '';
            if (val) {
                const item = createElement('li', 'kanban__todo__item', { 'draggable': true, 'data-id': `todoItem-${todoCount}` });
                item.innerHTML = val;
                item.addEventListener("dragstart", function (e) {
                    e.dataTransfer.setData("text", (<HTMLElement>e.target).innerText);
                    // e.dataTransfer.effectAllowed = "move";
                });
                const list = getElement('.kanban__todo__list');
                list.append(item);
            }
        })
        inProgressForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const val = (<HTMLInputElement>getElement('.kanban__inprogress__input')).value;
            (<HTMLInputElement>getElement('.kanban__inprogress__input')).value = '';
            if (val) {
                const item = createElement('li', 'kanban__inprogress__item', { draggable: true, 'data-id': `inprogressItem-${inProgressCount}` });
                item.innerHTML = val;
                item.addEventListener("dragstart", function (e) {
                    e.dataTransfer.setData("text", (<HTMLElement>e.target).innerText);
                    // e.dataTransfer.effectAllowed = "move";
                });
                const list = getElement('.kanban__inprogress__list');
                list.append(item);
            }
        })
        completedForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const val = (<HTMLInputElement>getElement('.kanban__completed__input')).value;
            (<HTMLInputElement>getElement('.kanban__completed__input')).value = '';
            if (val) {
                const item = createElement('li', 'kanban__completed__item', { draggable: true, 'data-id': `completedItem-${completedCount}` });
                item.innerHTML = val;
                item.addEventListener("dragstart", function (e) {
                    e.dataTransfer.setData("text", (<HTMLElement>e.target).innerText);
                    // e.dataTransfer.effectAllowed = "move";
                });
                const list = getElement('.kanban__completed__list');
                list.append(item);
            }
        })
    }

    function init() {
        const todo = createElement('div', 'kanabn__todo', {});
        const todoForm = createElement('form', 'kanabn__todo__form', {});
        todoForm.append(createElement('input', 'kanban__todo__input', { type: 'text', placeholder: 'add todo task' }));
        const todoSubmit = createElement('button', 'kanban__todo__btn', {});
        todoSubmit.innerHTML = `<i class="material-icons">add</i>`;
        todoForm.append(todoSubmit);
        todo.append(todoForm);

        const todoList = createElement('ul', 'kanban__todo__list box', {});
        // todoList.addEventListener('drop', function (event) {
        //     (<HTMLElement>event.target).append((<DragEvent>event).dataTransfer.getData('text'))
        // });
        // todoList.addEventListener('dragover', function (event) {
        //     event.preventDefault();
        //     // event.dataTransfer.dropEffect = "move";
        // });
        todo.append(todoList);

        const inprogress = createElement('div', 'kanabn__inprogress', {});
        const inprogressForm = createElement('form', 'kanabn__inprogress__form', {});
        inprogressForm.append(createElement('input', 'kanban__inprogress__input', { type: 'text', placeholder: 'add inprogress task' }));
        const inprogressSubmit = createElement('button', 'kanban__inprogress__btn', {});
        inprogressSubmit.innerHTML = `<i class="material-icons">add</i>`;
        inprogressForm.append(inprogressSubmit);
        inprogress.append(inprogressForm);

        const inprogressList = createElement('ul', 'kanban__inprogress__list box', {});
        // inprogressList.addEventListener('drop', function (event) {
        //     console.log(event.target);
        //     (<HTMLElement>event.target).append((<DragEvent>event).dataTransfer.getData('text'))
        // });

        // inprogressList.addEventListener('dragover', function (event) {
        //     event.preventDefault();
        //     // event.dataTransfer.dropEffect = "move";
        // })
        inprogress.append(inprogressList);

        const completed = createElement('div', 'kanaban__completed', {});
        const completedForm = createElement('form', 'kanabn__completed__form', {});
        completedForm.append(createElement('input', 'kanban__completed__input', { type: 'text', placeholder: 'add completed task' }));
        const completedSubmit = createElement('button', 'kanban__completed__btn', {});
        completedSubmit.innerHTML = `<i class="material-icons">add</i>`;
        completedForm.append(completedSubmit);
        completed.append(completedForm);

        const completedList = createElement('ul', 'kanban__completed__list box', {});
        // completedList.addEventListener('drop', function (event) {
        //     (<HTMLElement>event.target).append((<DragEvent>event).dataTransfer.getData('text'))
        // });

        // completedList.addEventListener('dragover', function (event) {
        //     event.preventDefault();
        //     // event.dataTransfer.dropEffect = "move";
        // })
        completed.append(completedList);

        root.append(todo);
        root.append(inprogress);
        root.append(completed);

        initHandlers();

        root.addEventListener("dragover", function (event) {
            event.preventDefault();
        });

        root.addEventListener("drop", function (ev) {
            ev.preventDefault();
            let target = <HTMLElement>ev.target;
            let droppable = target.classList.contains('box');
            let srcId = ev.dataTransfer.getData("srcId");
            if (droppable) {
                (<HTMLElement>ev.target).appendChild(document.getElementById(srcId));
            }
        });
    }

    return {
        init
    }
} as any as { new(root: HTMLElement): any; };

(new KanBanBoard(document.querySelector('#root'))).init()