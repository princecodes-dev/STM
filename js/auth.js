// ================================
// Show / Hide Password
// ================================

const userPassword = document.getElementById("password");
const eyeIcon = document.querySelector(".password-box i");

eyeIcon.addEventListener("click", () => {

    if (userPassword.type === "password") {

        userPassword.type = "text";

        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");

    } else {

        userPassword.type = "password";

        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");

    }

});
// ================================
// User Registration
// ================================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const password = document.getElementById("password").value;

        const confirmPassword = document.getElementById("confirmPassword").value;

        // Check Password Match
        if (password !== confirmPassword) {

            showToast("Passwords do not match!", "error");

            return;
        }

        // Get Existing Users
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check Duplicate Email
        const userExists = users.find(user => user.email === email);

        if (userExists) {

            showToast("Email already registered!", "error");

            return;
        }

        // Create User Object
        const newUser = {
            name,
            email,
            password,
            tasks: []
        };

        // Save User
        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        showToast("Account Created Successfully!");

        window.location.href = "index.html";

    });

}
// ================================
// Login Authentication
// ================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.querySelector('input[type="email"]').value.trim();

        const password = document.getElementById("password").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const validUser = users.find(user =>

            user.email === email &&
            user.password === password

        );

        if (!validUser) {

            showToast("Invalid Email or Password!", "error");

            return;

        }

        // Save Current Logged In User
        localStorage.setItem("loggedInUser", JSON.stringify(validUser));

        showToast("Login Successful!");

        window.location.href = "dashboard.html";

    });

}


function showToast(message, type = "success") {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.className = "toast " + type + " show";

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}