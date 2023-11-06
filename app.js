const taskInput = document.querySelector('.task-input');
const submitBtn = document.querySelector(".input-submit-btn");
const taskList = document.querySelector("ul.task-list");
const clearTasksBtn = document.querySelector('.clear-tasks-btn');
const filterInput = document.querySelector('.filter-input');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const taskName = taskInput.value;
    if (taskName === '') {
        return false;
    }
    const li = document.createElement("li");
    const card = document.createElement('div');
    card.className = 'card';
    const cardName = document.createElement('div');
    cardName.innerHTML = `${taskName}`;
    const link = document.createElement('a');
    link.className = 'remove-task-link'
    link.setAttribute('href', '#');
    const icon = document.createElement('span');
    icon.className = 'material-symbols-outlined';
    icon.innerHTML = 'close'

    link.appendChild(icon);
    card.appendChild(cardName);
    card.appendChild(link);
    li.appendChild(card);
    taskList.appendChild(li);
    taskInput.value = '';
    storeInLocalStorage(taskName);
});

document.addEventListener('DOMContentLoaded', () => {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(task => {
        const li = document.createElement("li");
        const card = document.createElement('div');
        card.className = 'card';
        const cardName = document.createElement('div');
        cardName.innerHTML = task;
        const link = document.createElement('a');
        link.className = 'remove-task-link'
        link.setAttribute('href', '#');
        const icon = document.createElement('span');
        icon.className = 'material-symbols-outlined';
        icon.innerHTML = 'close'
        link.appendChild(icon);
        card.appendChild(cardName);
        card.appendChild(link);
        li.appendChild(card);
        taskList.appendChild(li);
    });
});

function storeInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskList.addEventListener('click', (e) => {
   if (e.target.parentElement.classList.contains('remove-task-link')) {
        e.target.parentElement.parentElement.parentElement.remove();
       removeFromLocalStorage(e.target.parentElement.parentElement.parentElement);
   }
});

function removeFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach((task, index) => {
       if (taskItem.firstChild.firstChild.textContent === task) {
           tasks.splice(task, 1);
       }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

clearTasksBtn.addEventListener('click', () => {
   const taskListChildren = Array.from(taskList.children);
   taskListChildren.forEach(task => task.remove());
   localStorage.clear();
});

filterInput.addEventListener('input', (e) => {
    const filterInputText = filterInput.value;
    const taskListChildren = Array.from(taskList.children);
    taskListChildren.forEach(task => {
        const text = task.children[0].children[0].innerHTML;
        const index = text.indexOf(filterInputText);
        if (index === -1) {
            task.style.display = 'none';
        } else {
            task.style.display = 'block'
        }
    });
});