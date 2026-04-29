const taskForm = document.getElementById("taskForm");
const taskName = document.getElementById("taskName");
const taskPriority = document.getElementById("taskPriority");
const taskImportant = document.getElementById("taskImportant");
const taskTable = document.getElementById("taskTable");

taskForm.addEventListener("submit", addTask);

let tasks = [];
let nextId = 1;

function addTask(event) {
    event.preventDefault();

    if (taskName.value.trim() === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: nextId,
        name: taskName.value.trim(),
        priority: taskPriority.value,
        isImportant: taskImportant.checked,
        isCompleted: false,
        date: new Date().toLocaleDateString()
    };

    tasks.push(task);
    nextId++;

    console.log(JSON.stringify(tasks, null, 4));

    displayTask(task);

    taskForm.reset();
}

function displayTask(task) {
    const row = document.createElement("tr");
    row.id = "task-" + task.id;

    row.innerHTML = `
        <td>${task.name}</td>
        <td>${task.priority}</td>
        <td>${task.date}</td>

        <td>
            <input type="checkbox" onchange="completeTask(${task.id})">
        </td>

        <td>
            <button type="button" class="remove-btn" onclick="removeTask(${task.id})">Remove</button>
        </td>
    `;

    taskTable.appendChild(row);

    applyRowStyle(task);
}

function removeTask(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks.splice(i, 1);
            break;
        }
    }

    const row = document.getElementById("task-" + id);
    row.remove();

    console.log(JSON.stringify(tasks, null, 4));
}

function completeTask(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].isCompleted = !tasks[i].isCompleted;

            applyRowStyle(tasks[i]);

            break;
        }
    }

    console.log(JSON.stringify(tasks, null, 4));
}

function applyRowStyle(task) {
    const row = document.getElementById("task-" + task.id);

    row.classList.remove("completed", "important");

    if (task.isCompleted === true) {
        row.classList.add("completed");
    } else if (task.isImportant === true) {
        row.classList.add("important");
    }
}