const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const taskInfo = document.createElement("div");
        taskInfo.className = "task-info";

        if (task.completed) {
            taskInfo.classList.add("completed");
        }

        taskInfo.innerHTML = `
            <strong>${task.text}</strong><br>
            📅 ${task.date || "No Date"} &nbsp; ⏰ ${task.time || "No Time"}
        `;

        const actions = document.createElement("div");
        actions.className = "actions";

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✔";
        completeBtn.className = "complete-btn";
        completeBtn.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        };

        const editBtn = document.createElement("button");
        editBtn.textContent = "✏";
        editBtn.className = "edit-btn";
        editBtn.onclick = () => {
            const newTask = prompt("Edit Task", task.text);
            if (newTask !== null && newTask.trim() !== "") {
                tasks[index].text = newTask;
                saveTasks();
                renderTasks();
            }
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        actions.appendChild(completeBtn);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(taskInfo);
        li.appendChild(actions);

        taskList.appendChild(li);
    });
}

addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text: text,
        date: taskDate.value,
        time: taskTime.value,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";
});

renderTasks();