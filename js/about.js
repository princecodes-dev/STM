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
// Username
// =======================================

const username = document.getElementById("username");

if (username) {

    username.textContent =
        `Welcome, ${loggedInUser.name}`;

}

// =======================================
// Logout
// =======================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", (e) => {

        e.preventDefault();

        const confirmLogout = confirm(
            "Are you sure you want to logout?"
        );

        if (confirmLogout) {

            localStorage.removeItem("loggedInUser");

            window.location.href = "login.html";

        }

    });

}

// =======================================
// Contact Links
// =======================================

// Replace these links with your own.

const contactCards =
    document.querySelectorAll(".contact-card");

contactCards.forEach(card => {

    card.addEventListener("click", () => {

        console.log("Opening contact link...");

    });

});

// =======================================
// Console Message
// =======================================

