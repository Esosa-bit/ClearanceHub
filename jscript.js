document.addEventListener("DOMContentLoaded", () => {

    /* ==============================
       INITIALIZE DEFAULT USERS
    ============================== */

    if (!localStorage.getItem("users")) {

        const defaultUsers = [

            {
                email: "admin@university.edu",
                password: "password123",
                role: "Administrator"
            },

            {
                email: "student@university.edu",
                password: "student123",
                role: "Student"
            }

        ];

        localStorage.setItem("users", JSON.stringify(defaultUsers));

    }

    /* ==============================
       INITIAL STATE
    ============================== */

    let selectedRole = "Student";

    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const passwordIcon = document.getElementById("togglePassword");

    /* ==============================
       ROLE SELECTION
    ============================== */

    window.setRole = function (role) {

        selectedRole = role;

        document.querySelectorAll(".role-btn").forEach(button => {

            if (button.textContent.trim() === role) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }

        });

    };

    /*====================================================
                LOGIN ERROR POPUP
    ====================================================*/

    const errorPopup = document.getElementById("errorPopup");
    const popupOkBtn = document.getElementById("popupOkBtn");
    const popupMessage = document.getElementById("popupMessage");

    function showErrorPopup(message) {

        popupMessage.textContent = message;
        errorPopup.classList.add("show");

    }

    function hideErrorPopup() {

        errorPopup.classList.remove("show");

    }

    popupOkBtn.addEventListener("click", hideErrorPopup);

    errorPopup.addEventListener("click", function (e) {

        if (e.target === errorPopup) {

            hideErrorPopup();

        }

    });

    /*=====================================
        FORGOT PASSWORD POPUP
    =====================================*/

    const forgotPopup = document.getElementById("forgotPopup");
    const forgotPopupOk = document.getElementById("forgotPopupOk");

    function showForgotPopup() {

        forgotPopup.classList.add("show");

    }

    function hideForgotPopup() {

        forgotPopup.classList.remove("show");

    }

    forgotPopupOk.addEventListener("click", hideForgotPopup);

    forgotPopup.addEventListener("click", function (e) {

        if (e.target === forgotPopup) {

            hideForgotPopup();

        }

    });

    /*=====================================
        FORGOT PASSWORD LINK
    =====================================*/

    const forgotPasswordLink = document.getElementById("forgotPasswordLink");

    forgotPasswordLink.addEventListener("click", function (e) {

        e.preventDefault();

        showForgotPopup();

    });

    /* ==============================
       PASSWORD VISIBILITY
    ============================== */

    window.togglePassword = function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            passwordIcon.classList.remove("fa-eye");
            passwordIcon.classList.add("fa-eye-slash");

        } else {

            passwordInput.type = "password";

            passwordIcon.classList.remove("fa-eye-slash");
            passwordIcon.classList.add("fa-eye");

        }

    };

    /* ==============================
       LOGIN
    ============================== */

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;

        /* Validate fields */

        if (email === "" || password === "") {

            showErrorPopup("Please complete all fields.");

            return;

        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const authenticatedUser = users.find(user =>

            user.email.toLowerCase() === email &&
            user.password === password &&
            user.role === selectedRole

        );

        if (authenticatedUser) {

            localStorage.setItem(
                "currentUser",
                JSON.stringify(authenticatedUser)
            );

            console.log("Login Successful");
            console.log(authenticatedUser);

            window.location.href = "redirect.html";

        } else {

            showErrorPopup("Incorrect email, password, or selected role.");

        }

    });

});