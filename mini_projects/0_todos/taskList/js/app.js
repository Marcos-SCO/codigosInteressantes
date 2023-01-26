import { qSelect, qSelectAll, log } from './helpers.js';

// Define UI vars
const form = qSelect('#tasks-form');
const taskList = qSelect('.collection');
const clearBtn = qSelect('.clear-tasks');
const filter = qSelect('#filter');
const taskInput = qSelect('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear tasks
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks
    filter.addEventListener('keyup', filterTasks);    
}

// Check localStorage
function checkLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

// Remove from localStorage
function removeTaskFromLocalStorage(taskItem) {
    let tasks = checkLocalStorage();
    for (let task of tasks) {
        if (taskItem.textContent === task) {
            tasks.splice(tasks[task], 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from LS
function getTasks() {

    let tasks = checkLocalStorage();

    // Load localstore tasks
    for (let task of tasks) {
        // log(task);
        createLi(task);
    }
}

// Create li
function createLi(taskInput) {
    // Create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    // create text node and append to li
    li.append(document.createTextNode(taskInput));
    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
}

// Add Task
function addTask(e) {
    e.preventDefault();
    taskInput.value ? taskInput : alert('Add a Task');

    if (taskInput.value !== '') {
        createLi(taskInput.value);

        // Store task in localstorage
        storeTaskInLocalStorage(taskInput.value);

        // Clear input
        taskInput.value = '';
    }
}

// Store Task
function storeTaskInLocalStorage(task) {

    let tasks = checkLocalStorage();

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove tasks
function removeTask(e) {
    e.preventDefault();
    let textContent = e.target.parentElement.parentElement.innerText;

    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm(`Sure you want delete ${textContent} ?`)) {
            e.target.parentElement.parentElement.remove();
            // Remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Clear tasks
function clearTasks(e) {
    e.preventDefault();

    // taskList.innerHTML = '';

    // remove child is faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from LS
    let item = 'tasks';
    clearTaskFromLocalStorage(item);
}

// Clear tasks from LS
function clearTaskFromLocalStorage(item) {
    // localStorage.clear();
    localStorage.removeItem(item);
}

// Filter tasks
function filterTasks(e) {
    let text = e.target.value.toLowerCase();

    qSelectAll('.collection-item').forEach((task) => {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}