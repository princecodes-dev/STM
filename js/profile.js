// ===============================
// Get Logged In User
// ===============================

const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

// Redirect if not logged in

if (!loggedInUser) {

    window.location.href = "login.html";

}

// ===============================
// Welcome Text
// ===============================

document.getElementById("username").textContent =
    `Welcome, ${loggedInUser.name}`;

// ===============================
// Profile Information
// ===============================

document.getElementById("profileName").textContent =
    loggedInUser.name || "Student";

document.getElementById("profileEmail").textContent =
    loggedInUser.email || "No Email";

// ===============================
// Account Information
// ===============================

document.getElementById("profileCollege").textContent =
    loggedInUser.profile?.college || "-";

document.getElementById("profileCourse").textContent =
    loggedInUser.profile?.course || "-";

document.getElementById("profileSemester").textContent =
    loggedInUser.profile?.semester || "-";

document.getElementById("memberSince").textContent =
    loggedInUser.createdAt || "Recently Joined";

// ===============================
// Task Statistics
// ===============================

const tasks = loggedInUser.tasks || [];

const total = tasks.length;

const completed =
    tasks.filter(task => task.completed).length;

const pending = total - completed;

const progress =
    total === 0
        ? 0
        : Math.round((completed / total) * 100);

// ===============================
// Show Statistics
// ===============================

document.getElementById("totalTasks").textContent =
    total;

document.getElementById("completedTasks").textContent =
    completed;

document.getElementById("pendingTasks").textContent =
    pending;

document.getElementById("completionRate").textContent =
    `${progress}%`;


// ===============================
// Edit Profile
// ===============================

const profileModal = document.getElementById("profileModal");
const editProfileBtn = document.getElementById("editProfileBtn");
const closeProfileModal = document.getElementById("closeProfileModal");
const profileForm = document.getElementById("profileForm");

// Open Modal

editProfileBtn.addEventListener("click", () => {

    profileModal.style.display = "flex";

    document.getElementById("editName").value =
        loggedInUser.name || "";

    document.getElementById("editEmail").value =
        loggedInUser.email || "";

    document.getElementById("editCollege").value =
        loggedInUser.profile?.college || "";

    document.getElementById("editCourse").value =
        loggedInUser.profile?.course || "";

    document.getElementById("editSemester").value =
        loggedInUser.profile?.semester || "";

});

// Close Modal

closeProfileModal.addEventListener("click", () => {

    profileModal.style.display = "none";

});

window.addEventListener("click", (e) => {

    if (e.target === profileModal) {

        profileModal.style.display = "none";

    }

});

// Save Profile

profileForm.addEventListener("submit", (e) => {

    e.preventDefault();

    loggedInUser.name =
        document.getElementById("editName").value;

    loggedInUser.email =
        document.getElementById("editEmail").value;

    // Create profile object if missing

    if (!loggedInUser.profile) {

        loggedInUser.profile = {};

    }

    loggedInUser.profile.college =
        document.getElementById("editCollege").value;

    loggedInUser.profile.course =
        document.getElementById("editCourse").value;

    loggedInUser.profile.semester =
        document.getElementById("editSemester").value;

    // Update loggedInUser

    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(loggedInUser)
    );

    // Update users array

    const users =
        JSON.parse(localStorage.getItem("users")) || [];

    const index = users.findIndex(
        user => user.email === loggedInUser.email
    );

    if (index !== -1) {

        users[index] = loggedInUser;

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

    }

    showToast("✅ Profile Updated Successfully!");

setTimeout(() => {

    location.reload();

}, 1500);

});

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}