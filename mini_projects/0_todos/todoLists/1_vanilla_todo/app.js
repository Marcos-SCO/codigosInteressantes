// Select DOM
let todoContainer = document.querySelector('.todo-container');
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
filterOption.addEventListener('click', filterTodo);

// Functions

function createElement(todo) {
    console.log(todo)
        const todoDiv = document.createElement('div');
        // Create todo div
        todoDiv.classList.add('todo');
        todoDiv.id = todo.id;
        // create a list
        const newTodo = document.createElement('li');
        newTodo.innerText = todo.value;
        // save to local

        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        todoInput.value = '';

        // create complete button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = "<i class='fas fa-check'></i>";
        completedButton.classList.add('complete-btn');
        if (todo.complete) {
            todoDiv.classList.add('completed');
        }
        todoDiv.appendChild(completedButton);

        // create trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = "<i class='fas fa-trash'></i>"
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        // attach final todo
        todoList.appendChild(todoDiv);
}

function addTodo(e) {
    e.preventDefault();

    if (todoInput.value !== "") {

        const todo = {
            id: Date.now(),
            value: todoInput.value,
            complete: false
        }

        let todos = verifyLocalStorage();
        // todos = todos;
        todos.push(todo);

        saveToLocalStorage(todos);

        createElement(todo);
    }
}

function deleteTodo(e) {
    const item = e.target;
    const id = +item.parentElement.id;

    if (item.classList[0] === 'trash-btn') {
        // e.target.parentElement.remove();
        const todo = item.parentElement;
        todo.classList.add('fall');

        // at the end
        removeLocalTodo(id);

        todo.addEventListener('transitionend', e => {
            todo.remove();
        });
    }

    //const todos = JSON.parse(localStorage.getItem('todos'));
    let todos = verifyLocalStorage();
    todos = todos;
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');

        todos.forEach(todo => {
            if (todo.id == id) {
                todo.complete = !todo.complete;
            }
        });

        saveToLocalStorage(todos);
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveToLocalStorage(todos) {
    // const todos = verifyLocalStorage();

    // todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeLocalTodo(id) {
    let todos = verifyLocalStorage();
    todos = todos;

    // const todoIndex = todo.children[0].innerText;
    // todos.splice(todos.indexOf(todoIndex), 1);

    const newTodos = todos.filter(todo => todo.id !== id);
    console.log(newTodos);

    localStorage.setItem('todos', JSON.stringify(newTodos));
}

function getTodos() {
    let todos = verifyLocalStorage();

    todos.forEach(todo => {
        createElement(todo);
    })
}

function verifyLocalStorage() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    return todos;
}