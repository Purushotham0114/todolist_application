const darkModeToggle = document.getElementById("darkModeToggle");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const allBtn = document.getElementById("allBtn");
const completedBtn = document.getElementById("completedBtn");
const pendingBtn = document.getElementById("pendingBtn");
const taskCount = document.getElementById("taskCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.addEventListener("DOMContentLoaded", loadTasks);
darkModeToggle.addEventListener("click", toggleDarkMode);
addTaskBtn.addEventListener("click", addTask);
allBtn.addEventListener("click", filterTasks);
completedBtn.addEventListener("click", filterTasks);
pendingBtn.addEventListener("click", filterTasks);

function loadTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        if (task.completed) taskItem.classList.add("completed");

        taskItem.innerHTML = `
            <span>${task.name}</span>
            <div>
                <button onclick="toggleComplete(${index})">✔</button>
                <button onclick="editTask(${index})">✏️</button>
                <button onclick="deleteTask(${index})">🗑️</button>
            </div>
        `;

        taskList.appendChild(taskItem);
    });

    updateTaskCount();
}

function addTask() {
    const taskName = taskInput.value.trim();
    if (taskName === "") return;

    tasks.push({ name: taskName, completed: false });
    taskInput.value = "";
    saveTasks();
    loadTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    loadTasks();
}

function editTask(index) {
    const newTaskName = prompt("Edit Task", tasks[index].name);
    if (newTaskName) {
        tasks[index].name = newTaskName;
        saveTasks();
        loadTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    loadTasks();
}

function filterTasks(e) {
    const filter = e.target.id;
    let filteredTasks = [];

    if (filter === "completedBtn") {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === "pendingBtn") {
        filteredTasks = tasks.filter(task => !task.completed);
    } else {
        filteredTasks = tasks;
    }

    renderFilteredTasks(filteredTasks);
}

function renderFilteredTasks(filteredTasks) {
    taskList.innerHTML = "";
    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        if (task.completed) taskItem.classList.add("completed");

        taskItem.innerHTML = `
            <span>${task.name}</span>
            <div>
                <button onclick="toggleComplete(${index})">✔</button>
                <button onclick="editTask(${index})">✏️</button>
                <button onclick="deleteTask(${index})">🗑️</button>
            </div>
        `;

        taskList.appendChild(taskItem);
    });

    updateTaskCount();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskCount() {
    const pendingTasks = tasks.filter(task => !task.completed).length;
    taskCount.textContent = `${pendingTasks} tasks remaining`;
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
}
