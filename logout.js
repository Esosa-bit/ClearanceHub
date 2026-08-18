/*====================================================
                LOGOUT POPUP
====================================================*/

// HTML Elements

const logoutBtn = document.getElementById("logoutBtn");

const logoutOverlay = document.getElementById("logoutOverlay");

const confirmLogout = document.getElementById("confirmLogout");

const cancelLogout = document.getElementById("cancelLogout");


/*====================================================
                OPEN POPUP
====================================================*/

logoutBtn.addEventListener("click", function (event) {

    event.preventDefault();

    logoutOverlay.classList.add("show");

});


/*====================================================
                CLOSE POPUP
====================================================*/

function closeLogoutPopup() {

    logoutOverlay.classList.remove("show");

}


/*====================================================
                CANCEL BUTTON
====================================================*/

cancelLogout.addEventListener("click", function () {

    closeLogoutPopup();

});


/*====================================================
        CLICK OUTSIDE THE POPUP
====================================================*/

logoutOverlay.addEventListener("click", function (event) {

    if (event.target === logoutOverlay) {

        closeLogoutPopup();

    }

});


/*====================================================
                ESC KEY
====================================================*/

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeLogoutPopup();

    }

});


/*====================================================
            CONFIRM LOGOUT
====================================================*/

confirmLogout.addEventListener("click", function () {

    // Optional: Clear Local Storage
    // Uncomment the next line if you want to clear saved data.
    // localStorage.clear();

    // Redirect to Login Page
    window.location.href = "new html.html";

});
