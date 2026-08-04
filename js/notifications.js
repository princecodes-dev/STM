// =======================================
// Logged In User
// =======================================

const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

if (!loggedInUser) {
    window.location.href = "login.html";
}

// =======================================
// Welcome
// =======================================

document.getElementById("username").textContent =
    `Welcome, ${loggedInUser.name}`;

// =======================================
// Elements
// =======================================

const notificationList =
    document.getElementById("notificationList");

const markAllReadBtn =
    document.getElementById("markAllReadBtn");

const tasks = loggedInUser.tasks || [];

// Read notifications list
let readNotifications = JSON.parse(
    localStorage.getItem("readNotifications")
) || [];

// =======================================
// Load Notifications
// =======================================

function loadNotifications() {

    notificationList.innerHTML = "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let notifications = [];

    tasks.forEach(task => {

        if (task.completed) return;

        const dueDate = new Date(task.date);
        dueDate.setHours(0, 0, 0, 0);

        const diff = Math.ceil(
            (dueDate - today) /
            (1000 * 60 * 60 * 24)
        );

        let type = "";
        let message = "";

        if (diff === 0) {

            type = "today";
            message = "Due Today";

        }

        else if (diff === 1) {

            type = "tomorrow";
            message = "Due Tomorrow";

        }

        else if (diff < 0) {

            type = "overdue";
            message = `${Math.abs(diff)} Day(s) Overdue`;

        }

        else {

            return;

        }

        const notificationId =
            `${task.id}-${type}`;

        if (!readNotifications.includes(notificationId)) {

            notifications.push({

                id: notificationId,

                title: task.title,

                message: message,

                type: type

            });

        }

    });

    // Empty State

    if (notifications.length === 0) {

        notificationList.innerHTML = `

        <div class="empty-notification">

            <i class="fa-solid fa-bell-slash"></i>

            <h2>All Caught Up!</h2>

            <p>No notifications available.</p>

        </div>

        `;

        return;

    }

    // Render Notifications

    notifications.forEach(notification => {

        notificationList.innerHTML += `

        <div class="notification-card ${notification.type}">

            <h3>${notification.title}</h3>

            <p>${notification.message}</p>

            <div class="notification-time">

                Student Productivity

            </div>

        </div>

        `;

    });

}

// =======================================
// Mark All Read
// =======================================

markAllReadBtn.addEventListener("click", () => {

    tasks.forEach(task => {

        ["today", "tomorrow", "overdue"].forEach(type => {

            const id = `${task.id}-${type}`;

            if (!readNotifications.includes(id)) {

                readNotifications.push(id);

            }

        });

    });

    localStorage.setItem(
        "readNotifications",
        JSON.stringify(readNotifications)
    );

    loadNotifications();

});

// =======================================
// Initial Load
// =======================================

loadNotifications();