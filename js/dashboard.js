// ================================
// Dashboard Authentication
// ================================

// Get logged-in user

let taskChart;

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

// If no user is logged in, redirect to login page
if (!loggedInUser) {
    showToast("Please login first!", "error");
    window.location.href = "index.html";
}

// Show user's name
const username = document.getElementById("username");

if (username) {
    username.textContent = `Welcome, ${loggedInUser.name}`;
}

// Logout
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {

        // Remove current session
        localStorage.removeItem("loggedInUser");

        showToast("Logged out successfully! 👋", "#2196F3");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);

        // Redirect to login page
        window.location.href = "index.html";
    });
}
// ================================
// Task Modal
// ================================

const taskModal = document.getElementById("taskModal");
const addTaskBtn = document.getElementById("addTaskBtn");
const closeModal = document.getElementById("closeModal");

addTaskBtn.addEventListener("click", function () {
    taskModal.style.display = "flex";
});

closeModal.addEventListener("click", function () {

    taskModal.style.display = "none";

    taskForm.reset();

    isEditing = false;
    editingTaskId = null;

    document.getElementById("modalTitle").textContent = "Add New Task";

    document.getElementById("saveTaskBtn").textContent = "Save Task";

});
// ================================
// Save & Display Tasks
// ================================

const taskForm = document.getElementById("taskForm");
const taskContainer = document.getElementById("taskContainer");
// Edit Mode
let isEditing = false;
let editingTaskId = null;
// Current Filter
let currentFilter = "all";

let currentCategory = "All";
// Load tasks from Local Storage
let tasks = loggedInUser.tasks || [];

// Display tasks when page loads
displayTasks();

// Save Task
taskForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const taskData = {

    id: isEditing ? editingTaskId : Date.now(),

    title: document.getElementById("taskTitle").value,

    subject: document.getElementById("taskSubject").value,

    priority: document.getElementById("taskPriority").value,

    date: document.getElementById("taskDate").value,

    description:
    document.getElementById("taskDescription").value,

    link:
    document.getElementById("taskLink").value,

    category: document.getElementById("taskCategory").value,

    tags: document
        .getElementById("taskTags")
        .value
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag !== ""),

    completed: false,

    pinned: false

};

if (isEditing) {

    tasks = tasks.map(task => {

        if (task.id === editingTaskId) {

            return {
                ...task,
                ...taskData,
                completed: task.completed
            };

        }

        return task;

    });

} else {

    tasks.push(taskData);

}

    // Update logged-in user's tasks
loggedInUser.tasks = tasks;

// Save current session
localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

// Update users array
let users = JSON.parse(localStorage.getItem("users")) || [];

users = users.map(user => {
    if (user.email === loggedInUser.email) {
        return loggedInUser;
    }
    return user;
});

localStorage.setItem("users", JSON.stringify(users));
    
    if (isEditing) {

    showToast("Task Updated ✏️", "#2196F3");

} else {

    showToast("Task Added Successfully ✅");

}
    taskForm.reset();
    isEditing = false;
    editingTaskId = null;

    document.getElementById("modalTitle").textContent = "Add New Task";

    document.getElementById("saveTaskBtn").textContent = "Save Task";

    taskModal.style.display = "none";

    displayTasks();

});

tasks = [...tasks];

function displayTasks() {

    taskContainer.innerHTML = "";

    if (tasks.length === 0) {
        taskContainer.innerHTML = `
            <div class="task-card">
                <h3>No Tasks Yet 📋</h3>
                <p>Click <strong>+ Add Task</strong> to create your first task.</p>
            </div>
        `;
        updateStatistics();
        return;
    }

    const filteredTasks = tasks.filter(task => {

    // Status Filter
    if (currentFilter === "pending" && task.completed) {

        return false;

    }

    if (currentFilter === "completed" && !task.completed) {

        return false;

    }

    // Category Filter
    if (currentCategory !== "All" && task.category !== currentCategory) {

        return false;

    }

    return true;

});

filteredTasks.sort((a, b) => {

    return (b.pinned === true) - (a.pinned === true);

});

filteredTasks.forEach(task => {

        taskContainer.innerHTML += `

        <div class="task-card">

            <h3>${task.title}</h3>

            <p><strong>Subject:</strong> ${task.subject}</p>

            <p><strong>Description:</strong></p>

            <p class="task-description">

                ${
                    task.description
                    ? task.description.substring(0, 40) + "..."
                    : "No description"
              }

            </p>

            <button onclick="openTaskDetails(${task.id})">

                📖 Read More

            </button>

            <p class="category-badge">

    📂 ${task.category || "Study"}

</p>

<p class="tags">

    ${
        task.tags && task.tags.length
            ? task.tags.map(tag => `#${tag}`).join(" ")
            : "🏷 No Tags"
    }

</p>

            ${task.link ? `
            <p>
                <a href="${task.link}" target="_blank">
                    🔗 Open Reference
                </a>
            </p>
            ` : ""}

            <p>
                <strong>Priority:</strong>
                <span class="priority ${task.priority.toLowerCase()}">
                    ${task.priority}
                </span>
            </p>

            <p><strong>Due Date:</strong> ${task.date}</p>

            ${getReminderHTML(task)}

            <p><strong>Status:</strong> ${task.completed ? "✅ Completed" : "⏳ Pending"}</p>

            <div class="task-buttons">

    <button class="pin-btn" onclick="togglePin(${task.id})">
        ${task.pinned ? "📌 Unpin" : "⭐ Pin"}
    </button>

    <button class="complete-btn" onclick="toggleTask(${task.id})">
        ${task.completed ? "↩ Undo" : "✔ Complete"}
    </button>

    <button class="edit-btn" onclick="editTask(${task.id})">
        ✏ Edit
    </button>

    <button class="delete-btn" onclick="deleteTask(${task.id})">
        🗑 Delete
    </button>

    </div>

        </div>

        `;

    });

    updateStatistics();

}

function updateStatistics() {

    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    const pending = total - completed;

    const progress = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    const totalTasksEl = document.getElementById("totalTasks");
    const completedTasksEl = document.getElementById("completedTasks");
    const pendingTasksEl = document.getElementById("pendingTasks");
    const progressEl = document.getElementById("progress");

    if (totalTasksEl) totalTasksEl.textContent = total;
    if (completedTasksEl) completedTasksEl.textContent = completed;
    if (pendingTasksEl) pendingTasksEl.textContent = pending;
    if (progressEl) progressEl.textContent = progress + "%";

    if (typeof updateChart === "function") {
        updateChart();
    }

    if (typeof updateProgressBar === "function") {
        updateProgressBar();
    }
}

function updateChart() {

    const chartCanvas = document.getElementById("taskChart");

    if (!chartCanvas) return;

    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.length - completed;

    // Agar chart pehle se bana hua hai to usse destroy karo
    if (taskChart instanceof Chart) {
    taskChart.destroy();
}

    const ctx = chartCanvas.getContext("2d");

    taskChart = new Chart(ctx, {
        type: "doughnut",

        data: {
            labels: ["Completed", "Pending"],
            datasets: [{
                data: [completed, pending],
                backgroundColor: ["#4CAF50", "#2196F3"],
                borderWidth: 2
            }]
        },

        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }

    });

}

// Toggle Complete
function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;

    });

    saveTasks();
    showToast("Task Updated ✅", "#4CAF50");

}

// Delete Task
function deleteTask(id) {

    if (!confirm("Delete this task?")) return;

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    showToast("Task Deleted 🗑️", "#E53935");

}

// Save Tasks
function saveTasks() {

    loggedInUser.tasks = tasks;

    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(loggedInUser)
    );

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map(user => {

        if (user.email === loggedInUser.email) {
            return loggedInUser;
        }

        return user;

    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    displayTasks();

}

function editTask(id) {

    const task = tasks.find(task => task.id === id);

    if (!task) return;

    isEditing = true;
    editingTaskId = id;

    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskSubject").value = task.subject;
    document.getElementById("taskPriority").value = task.priority;
    document.getElementById("taskDate").value = task.date;
    document.getElementById("taskDescription").value = task.description || "";

    document.getElementById("taskLink").value = task.link || "";

    document.getElementById("taskCategory").value =
    task.category || "Study";

    document.getElementById("taskTags").value =
        task.tags
            ? task.tags.join(", ")
            : "";

    document.getElementById("modalTitle").textContent = "Edit Task";
    document.getElementById("saveTaskBtn").textContent = "Update Task";

    taskModal.style.display = "flex";
}
const searchTask = document.getElementById("searchTask");

searchTask.addEventListener("input", function () {

    const search = this.value.toLowerCase();

    document.querySelectorAll(".task-card").forEach(card => {

        card.style.display =
            card.innerText.toLowerCase().includes(search)
                ? "block"
                : "none";

    });

});
// ================================
// Toast Notification
// ================================

function showToast(message, color = "#4CAF50") {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.style.background = color;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}

const exportCSVBtn = document.getElementById("exportCSVBtn");

exportCSVBtn.addEventListener("click", exportCSV);

function exportCSV() {

    if (tasks.length === 0) {
        showToast("No tasks to export!", "#E53935");
        return;
    }

    let csv = "Title,Subject,Priority,Due Date,Status\n";

    let filteredTasks = tasks;

if (currentCategory !== "All") {

    filteredTasks = filteredTasks.filter(task =>
        task.category === currentCategory
    );

}

    filteredTasks.forEach(task => {

        csv += `"${task.title}","${task.subject}","${task.priority}","${task.date}","${task.completed ? "Completed" : "Pending"}"\n`;

    });

    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "tasks.csv";

    a.click();

    URL.revokeObjectURL(url);

    showToast("CSV Exported Successfully 📥", "#4CAF50");

}

// ================================
// Dark Mode
// ================================

const themeBtn = document.getElementById("themeBtn");

// Load saved theme
let currentTheme = localStorage.getItem("theme") || "light";

if (currentTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
} else {
    themeBtn.textContent = "🌙";
}

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        themeBtn.textContent = "☀️";

    } else {

        localStorage.setItem("theme", "light");

        themeBtn.textContent = "🌙";

    }

});
// ================================
// Task Filters
// ================================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        this.classList.add("active");

        currentFilter = this.dataset.filter;

        displayTasks();

    });

});