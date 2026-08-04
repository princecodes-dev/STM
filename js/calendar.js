// ===============================
// Calendar Variables
// ===============================

const monthYear = document.getElementById("monthYear");

const calendarGrid = document.getElementById("calendarGrid");

const prevMonth = document.getElementById("prevMonth");

const nextMonth = document.getElementById("nextMonth");

const taskModal = document.getElementById("taskModal");

const modalDate = document.getElementById("modalDate");

const modalTaskList = document.getElementById("modalTaskList");

const closeTaskModal = document.getElementById("closeTaskModal");

// ===============================
// Load Tasks
// ===============================

const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

const tasks = loggedInUser?.tasks || [];

// Current Date

let currentDate = new Date();

let currentMonth = currentDate.getMonth();

let currentYear = currentDate.getFullYear();

// Month Names

const months = [

    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"

];

// ===============================
// Render Calendar
// ===============================

function renderCalendar() {

    calendarGrid.innerHTML = "";

    monthYear.textContent = `${months[currentMonth]} ${currentYear}`;

    // First day of month

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    // Total days

    const totalDays = new Date(
        currentYear,
        currentMonth + 1,
        0
    ).getDate();

    // Empty cells

    for (let i = 0; i < firstDay; i++) {

        const empty = document.createElement("div");

        empty.classList.add("day", "other-month");

        calendarGrid.appendChild(empty);

    }

    // Dates

    for (let day = 1; day <= totalDays; day++) {

    const cell = document.createElement("div");

    cell.classList.add("day");

    cell.innerHTML = `
        <div class="day-number">${day}</div>
    `;

    // Current Cell Date
    const currentCellDate = new Date(currentYear, currentMonth, day);

    const formattedDate = currentCellDate.toISOString().split("T")[0];

    // Tasks for this date
    const dayTasks = tasks.filter(task => task.date === formattedDate);

    // 👇 YAHAN YE CODE LAGEGA
    if (dayTasks.length > 0) {

        const preview = document.createElement("div");

        preview.className = "task-preview";

        dayTasks.slice(0, 2).forEach(task => {

            const item = document.createElement("div");

            item.className = "task-item " + task.priority.toLowerCase();

            item.textContent = task.title;

            preview.appendChild(item);

        });

        if (dayTasks.length > 2) {

            const more = document.createElement("div");

            more.className = "task-item";

            more.style.background = "#6366f1";

            more.textContent = `+${dayTasks.length - 2} more`;

            preview.appendChild(more);

        }

        cell.appendChild(preview);

    }

    cell.addEventListener("click", () => {

    showTasksByDate(formattedDate);

});

    // Highlight Today
    if (
        day === currentDate.getDate() &&
        currentMonth === currentDate.getMonth() &&
        currentYear === currentDate.getFullYear()
    ) {
        cell.classList.add("today");
    }

    calendarGrid.appendChild(cell);

}
}

// ===============================
// Previous Month
// ===============================

prevMonth.addEventListener("click", () => {

    currentMonth--;

    if (currentMonth < 0) {

        currentMonth = 11;

        currentYear--;

    }

    // ===============================
// Initial Load
// ===============================

renderCalendar();

// Close Modal

closeTaskModal.addEventListener("click", () => {

    taskModal.style.display = "none";

});

// Close when clicking outside

window.addEventListener("click", (e) => {

    if (e.target === taskModal) {

        taskModal.style.display = "none";

    }

});

});

// ===============================
// Next Month
// ===============================

nextMonth.addEventListener("click", () => {

    currentMonth++;

    if (currentMonth > 11) {

        currentMonth = 0;

        currentYear++;

    }

    renderCalendar();

    

});

// ===============================
// Initial Load
// ===============================

renderCalendar();

loadUpcomingDeadlines();

// Close Modal

closeTaskModal.addEventListener("click", () => {

    taskModal.style.display = "none";

});

// Close on Overlay Click

window.addEventListener("click", (e) => {

    if (e.target === taskModal) {

        taskModal.style.display = "none";

    }

});



// ===============================
// Initial Load
// ===============================

renderCalendar();


function showTasksByDate(date) {

    modalDate.textContent = date;

    const filtered = tasks.filter(task => task.date === date);

    if (filtered.length === 0) {

        modalTaskList.innerHTML = `
            <div class="empty-state">
                No tasks for this date.
            </div>
        `;

    } else {

        modalTaskList.innerHTML = filtered.map(task => `

            <div class="selected-task">

                <h4>${task.title}</h4>

                <p><strong>Subject:</strong> ${task.subject}</p>

                <p><strong>Priority:</strong> ${task.priority}</p>

                <p>${task.description || ""}</p>

            </div>

        `).join("");

    }

    taskModal.style.display = "flex";

}


function loadUpcomingDeadlines() {

    const container = document.getElementById("upcomingTasks");

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const upcoming = tasks
        .filter(task => !task.completed)
        .map(task => {

            const due = new Date(task.date);

            due.setHours(0, 0, 0, 0);

            const diff = Math.ceil(
                (due - today) / (1000 * 60 * 60 * 24)
            );

            return {
                ...task,
                diff
            };

        })
        .filter(task => task.diff >= 0)
        .sort((a, b) => a.diff - b.diff);

    if (upcoming.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                🎉 No upcoming deadlines.
            </div>
        `;

        return;

    }

    container.innerHTML = upcoming.slice(0, 5).map(task => {

        let dueText = "";

        if (task.diff === 0)
            dueText = "Today";

        else if (task.diff === 1)
            dueText = "Tomorrow";

        else
            dueText = `${task.diff} days left`;

        return `

            <div class="selected-task">

                <h4>${task.title}</h4>

                <p>${task.subject}</p>

                <p><strong>${dueText}</strong></p>

            </div>

        `;

    }).join("");

}