document.addEventListener("DOMContentLoaded", () => {

    // Get the logged-in user
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // If no user exists, return to login
    if (!currentUser) {

        window.location.href = "index.html";
        return;

    }

    // Redirect after 5 seconds
    setTimeout(() => {

        if (currentUser.role === "Administrator") {

            window.location.href = "Aprofile.html";

        } else {

            window.location.href = "Sprofile.html";

        }

    }, 5000);

});