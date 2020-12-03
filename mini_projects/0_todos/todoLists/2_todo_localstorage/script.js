// select everything // 
// select the todo-form
const todoForm = document.querySelector('.todo-form');
// select the input box
const todoInput = document.querySelector('.todo-input');
// select the <ul> with class="todo-items"
const todoItemsList = document.querySelector('.todo-items');

// array which stores every todos
let todos = [];

// initially get everything from localStorage
getFromLocalStorage();

function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) {
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}


todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo(todoInput.value);
});

function addTodo(item) {
    if (item !== "") {
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        }

        todos.push(todo);
        addToLocalStorage(todos);

        // clear input form
        todoInput.value = '';
    }
}

function renderTodos(todos) {
    todoItemsList.innerHTML = '';

    todos.forEach((item) => {
        const checked = item.completed ? 'checked' : null;

        const li = document.createElement('li');
        // <li class="item"> </li>
        li.setAttribute('class', 'item');
        // <li class="item" data-key="20200708"> </li>
        li.setAttribute('data-key', item.id);

        if (item.completed === true) {
            li.classList.add('checked');
        }

        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>
        ${item.name}
        <button class="delete-button">X</button>`;
        // finally add the <li> to the <ul>
        todoItemsList.append(li);
    })
}

function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));

    renderTodos(todos);
}

function toggle(id) {
    todos.forEach((item) => {
        if (item.id == id) {
            item.completed = !item.completed
        }
    });

    addToLocalStorage(todos);
}

function deleteTodo(id) {
    todos = todos.filter((item) => {
        return item.id != id
    });

    addToLocalStorage(todos);
}

todoItemsList.addEventListener('click', (e) => {
    if(e.target.type === 'checkbox') {
        toggle(e.target.parentElement.getAttribute('data-key'));
    }

    if (e.target.classList.contains('delete-button')) {
        deleteTodo(e.target.parentElement.getAttribute('data-key'));
    }
})