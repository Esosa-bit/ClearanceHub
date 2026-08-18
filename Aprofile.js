/*====================================================
                LOCAL STORAGE KEY
====================================================*/

const STORAGE_KEY = "adminProfile";

/*====================================================
                HTML ELEMENTS
====================================================*/

const adminForm = document.getElementById("adminForm");

const successPopup = document.getElementById("successPopup");
const popupOkBtn = document.getElementById("popupOkBtn");

/*====================================================
                SAVE ADMIN PROFILE
====================================================*/

adminForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const adminData = {

        staffID: document.getElementById("staffID").value.trim(),

        fullName: document.getElementById("fullName").value.trim(),

        email: document.getElementById("email").value.trim(),

        phone: document.getElementById("phone").value.trim()

    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(adminData));

    successPopup.classList.add("show");

});

/*====================================================
            SUCCESS POPUP
====================================================*/

popupOkBtn.addEventListener("click", function () {

    successPopup.classList.remove("show");

    window.location.href = "admin-dashboard.html";

});

/*====================================================
        CLOSE POPUPS WHEN CLICKING OUTSIDE
====================================================*/

window.addEventListener("click", function (e) {

    if (e.target === successPopup) {

        successPopup.classList.remove("show");

    }

});

/*====================================================
        LOAD SAVED INFORMATION
====================================================*/

window.addEventListener("DOMContentLoaded", function () {

    const savedAdmin = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!savedAdmin) return;

    if(document.getElementById("staffID"))
        document.getElementById("staffID").value = savedAdmin.staffID || "";

    if(document.getElementById("fullName"))
        document.getElementById("fullName").value = savedAdmin.fullName || "";

    if(document.getElementById("email"))
        document.getElementById("email").value = savedAdmin.email || "";

    if(document.getElementById("phone"))
        document.getElementById("phone").value = savedAdmin.phone || "";

});

/*====================================================
            DISPLAY ADMIN NAME
====================================================*/

const savedAdmin = JSON.parse(localStorage.getItem(STORAGE_KEY));

if(savedAdmin){

    const adminName = document.getElementById("adminName");

    const dashboardAdminName = document.getElementById("dashboardAdminName");

    if(adminName){

        adminName.textContent = savedAdmin.fullName;

    }

    if(dashboardAdminName){

        dashboardAdminName.textContent = savedAdmin.fullName;

    }

}
document.addEventListener("DOMContentLoaded", function () {

    const sidebar = document.querySelector(".sidebar");

    if (!sidebar) {
        return;
    }

    /* ================================
       CREATE MENU BUTTON
       ================================ */

    const menuButton = document.createElement("button");

    menuButton.className = "mobile-menu-button";
    menuButton.innerHTML = "☰";
    menuButton.setAttribute("aria-label", "Open menu");

    const topbar=
    document.querySelector("h2");
    if (topbar) {
        topbar.parentElement.prepend(menuButton);
    }


    /* ================================
       CREATE OVERLAY
       ================================ */

    const overlay = document.createElement("div");

    overlay.className = "sidebar-overlay";

    document.body.appendChild(overlay);


    /* ================================
       OPEN SIDEBAR
       ================================ */

    function openSidebar() {

        sidebar.classList.add("sidebar-open");
        overlay.classList.add("active");
        menuButton.style.display = "none";
    }


    /* ================================
       CLOSE SIDEBAR
       ================================ */

    function closeSidebar() {

        sidebar.classList.remove("sidebar-open");
        overlay.classList.remove("active");

        
        menuButton.style.display = "flex";
    }


    /* ================================
       MENU BUTTON
       ================================ */

    menuButton.addEventListener("click", function (event) {

        event.stopPropagation();

        if (sidebar.classList.contains("sidebar-open")) {
            closeSidebar();
        } else {
            openSidebar();
        }

    });

    /* ================================
       CLICK OUTSIDE SIDEBAR
       ================================ */

    overlay.addEventListener("click", function () {

        closeSidebar();

    });


    /* ================================
       SIDEBAR LINKS
       ================================ */

    const sidebarLinks = sidebar.querySelectorAll("a");

    sidebarLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 768) {
                closeSidebar();
            }

        });

    });


    /* ================================
       ESC KEY
       ================================ */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeSidebar();
        }

    });

});