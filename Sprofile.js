document.addEventListener("DOMContentLoaded", () => {

    /*==========================================
        CHECK LOGIN STATUS
    ==========================================*/

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    /*==========================================
        DISPLAY USER INFORMATION
    ==========================================*/

    const studentName = document.getElementById("studentName");

    if (studentName) {
        studentName.textContent = currentUser.email;
    }

    /*==========================================
        GET FORM ELEMENTS
    ==========================================*/

    const studentForm = document.getElementById("studentForm");

    const fullName = document.getElementById("fullName");
    const matricNumber = document.getElementById("matricNumber");
    const department = document.getElementById("department");
    const graduationYear = document.getElementById("graduationYear");
    const entryYear = document.getElementById("entryYear");
    const email = document.getElementById("email");

    /*==========================================
        SUCCESS POPUP
    ==========================================*/

    const successPopup = document.getElementById("successPopup");
    const popupOkBtn = document.getElementById("popupOkBtn");

    /*==========================================
        LOAD STORED PROFILE
    ==========================================*/

    const savedProfile = JSON.parse(localStorage.getItem("studentProfile"));

    if (savedProfile) {

        fullName.value = savedProfile.fullName || "";
        matricNumber.value = savedProfile.matricNumber || "";
        department.value = savedProfile.department || "";
        graduationYear.value = savedProfile.graduationYear || "";
        entryYear.value = savedProfile.entryYear || "";
        email.value = savedProfile.email || currentUser.email;

        studentName.textContent = savedProfile.fullName;

    } else {

        email.value = currentUser.email;

    }

    /*==========================================
        SIDEBAR ACTIVE MENU
    ==========================================*/

    const menuItems = document.querySelectorAll(".menu li");

    menuItems.forEach(item => {

        item.addEventListener("click", function () {

            menuItems.forEach(menu => {
                menu.classList.remove("active");
            });

            this.classList.add("active");

        });

    });

    /*==========================================
        SAVE STUDENT PROFILE
    ==========================================*/

    studentForm.addEventListener("submit", function (e) {

        e.preventDefault();

        /* -------------------------
           GET FORM VALUES
        ------------------------- */

        const studentData = {

            fullName: fullName.value.trim(),
            matricNumber: matricNumber.value.trim(),
            department: department.value,
            graduationYear: graduationYear.value,
            entryYear: entryYear.value,
            email: email.value.trim()

        };

        /* -------------------------
           VALIDATION
        ------------------------- */

        if (

            studentData.fullName === "" ||
            studentData.matricNumber === "" ||
            studentData.department === "" ||
            studentData.graduationYear === "" ||
            studentData.entryYear === "" ||
            studentData.email === ""

        ) {

            alert("Please complete all required fields.");
            return;

        }

        /* -------------------------
           MATRIC NUMBER VALIDATION
        ------------------------- */

        if (studentData.matricNumber.length < 6) {

            alert("Please enter a valid matriculation number.");
            return;

        }

        /* -------------------------
           EMAIL VALIDATION
        ------------------------- */

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(studentData.email)) {

            alert("Please enter a valid email address.");
            return;

        }

        /* -------------------------
           SAVE TO LOCAL STORAGE
        ------------------------- */

        localStorage.setItem(
            "studentProfile",
            JSON.stringify(studentData)
        );
        const currentUser= 
        JSON.parse(localStorage.getItem("currentUser")) || {};
        currentUser.fullName=
        studentData.fullName;
        localStorage.setItem("currentUser"
        , JSON.stringify(currentUser));

        /* -------------------------
           UPDATE DASHBOARD NAME
        ------------------------- */

        studentName.textContent = studentData.fullName;

        /* -------------------------
           SHOW SUCCESS POPUP
        ------------------------- */

    if (successPopup) {
    successPopup.classList.add("show");
}

console.log(studentData);
});
    /*==========================================
        POPUP OK BUTTON
    ==========================================*/
   if (popupOkBtn) {

    popupOkBtn.addEventListener("click", function () {

        if (successPopup) {
            successPopup.classList.remove("show");
        }

        window.location.href = "Sdashboard.html";

    });

}


    /*==========================================
        SIDEBAR NAVIGATION
    ==========================================*/

    const menuLinks = document.querySelectorAll(".menu li a");

    menuLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const menuText = this.textContent.trim();

            switch (menuText) {

                case "Dashboard":
                    window.location.href = "Sdashboard.html";
                    break;

                case "My Profile":
                    window.location.href = "Sprofile.html";
                    break;

                case "Faculty Dues":

                    if (!localStorage.getItem("studentProfile")) {

                        alert("Please complete your profile before accessing Faculty Dues.");
                        return;

                    }

                    window.location.href = "facultydues.html";
                    break;

                case "Clearance Requests":

                    if (!localStorage.getItem("studentProfile")) {

                        alert("Please complete your profile before requesting clearance.");
                        return;

                    }

                    window.location.href = "clearancerequest.html";
                    break;

                case "Notifications":
                    window.location.href = "notifications.html";
                    break;

                case "Logout":
                    break;

            }

        });

    });

    /*==========================================
        HELPER FUNCTION
    ==========================================*/

    function profileCompleted() {

        return localStorage.getItem("studentProfile") !== null;

    }

    console.log("Student Dashboard Loaded Successfully.");

});

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