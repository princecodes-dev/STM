// ====================================
// Logged In User
// ====================================

const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

if (!loggedInUser) {

    window.location.href = "login.html";

}

// ====================================
// Welcome Text
// ====================================

document.getElementById("username").textContent =
    `Welcome, ${loggedInUser.name}`;

// ====================================
// Elements
// ====================================

const darkMode =
    document.getElementById("darkMode");

const exportBtn =
    document.getElementById("exportBtn");

const importBtn =
    document.getElementById("importBtn");

const importFile =
    document.getElementById("importFile");

const resetBtn =
    document.getElementById("resetBtn");

const logoutBtn =
    document.getElementById("logoutSettingBtn");


    // ====================================
// Logout
// ====================================

logoutBtn.addEventListener("click", () => {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("loggedInUser");

        window.location.href = "login.html";

    }

});


// ====================================
// Dark Mode
// ====================================

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "dark") {

    darkMode.checked = true;

    document.body.classList.add("dark");

}

darkMode.addEventListener("change", () => {

    if (darkMode.checked) {

        document.body.classList.add("dark");

        localStorage.setItem("theme", "dark");

    } else {

        document.body.classList.remove("dark");

        localStorage.setItem("theme", "light");

    }

});


// ====================================
// Export Tasks
// ====================================

exportBtn.addEventListener("click", () => {

    const data = JSON.stringify(loggedInUser, null, 2);

    const blob = new Blob([data], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "student-productivity-backup.json";

    a.click();

    URL.revokeObjectURL(url);

});

// ====================================
// Import Button
// ====================================

importBtn.addEventListener("click", () => {

    importFile.click();

});

// ====================================
// Import Tasks
// ====================================

importFile.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        try {

            const importedUser = JSON.parse(event.target.result);

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(importedUser)
            );

            const users =
                JSON.parse(localStorage.getItem("users")) || [];

            const index = users.findIndex(
                user => user.email === importedUser.email
            );

            if (index !== -1) {

                users[index] = importedUser;

            } else {

                users.push(importedUser);

            }

            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );

            showToast("Backup Imported Successfully!");

            location.reload();

        }

        catch {

            showToast("Invalid Backup File!", "error");

        }

    };

    reader.readAsText(file);

});


// ====================================
// Reset All Tasks
// ====================================

resetBtn.addEventListener("click", () => {

    const confirmReset = confirm(
        "This will permanently delete all your tasks.\n\nDo you want to continue?"
    );

    if (!confirmReset) return;

    // Clear tasks

    loggedInUser.tasks = [];

    // Update loggedInUser

    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(loggedInUser)
    );

    // Update users array

    const users =
        JSON.parse(localStorage.getItem("users")) || [];

    const index =
        users.findIndex(user => user.email === loggedInUser.email);

    if (index !== -1) {

        users[index] = loggedInUser;

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

    }

    showToast("All tasks deleted successfully!");

    location.reload();

});