/*====================================================
                LOCAL STORAGE KEYS
======================================================*/

const ADMIN_PROFILE_KEY = "adminProfile";

const STUDENTS_KEY = "studentProfiles";

const PAYMENT_KEY = "facultyPayments";

const CLEARANCE_KEY = "clearanceRequests";

const NOTIFICATION_KEY = "clearanceHubNotifications";

function goToProfile() {
    window.location.href = "Aprofile.html";
}
/*====================================================
                HTML ELEMENTS
======================================================*/

const adminName =
document.getElementById("adminName");

const totalStudents =
document.getElementById("totalStudents");

const pendingRequests =
document.getElementById("pendingRequests");

const approvedRequests =
document.getElementById("approvedRequests");

const totalPayments =
document.getElementById("totalPayments");

const activityTable =
document.getElementById("activityTable");

const notificationContainer =
document.getElementById("notificationContainer");


/*====================================================
                ARRAYS
======================================================*/

let students = [];

let payments = [];

let requests = [];

let notifications = [];


/*====================================================
                LOAD DATA
======================================================*/

loadDashboard();


/*====================================================
                LOAD DASHBOARD
======================================================*/

function loadDashboard(){

    loadAdminName();

    loadStudents();

    loadPayments();

    loadRequests();

    loadNotifications();

    updateStatistics();

    renderRecentActivity();

}


/*====================================================
            LOAD ADMIN NAME
======================================================*/

function loadAdminName(){

    const savedAdmin = JSON.parse(

        localStorage.getItem(

            ADMIN_PROFILE_KEY

        )

    );

    if(!savedAdmin){

        return;

    }

    if(adminName){

        adminName.textContent =

        savedAdmin.fullName;

    }

}


/*====================================================
                LOAD STUDENTS
======================================================*/

function loadStudents(){

    const stored =

    localStorage.getItem(

        STUDENTS_KEY

    );

    if(stored){

        students =

        JSON.parse(stored);

    }

}


/*====================================================
                LOAD PAYMENTS
======================================================*/

function loadPayments(){

    const stored =

    localStorage.getItem(

        PAYMENT_KEY

    );

    if(stored){

        payments =

        JSON.parse(stored);

    }

}


/*====================================================
            LOAD CLEARANCE REQUESTS
======================================================*/

function loadRequests(){

    const stored =

    localStorage.getItem(

        CLEARANCE_KEY

    );

    if(stored){

        requests =

        JSON.parse(stored);

    }

}


/*====================================================
            LOAD NOTIFICATIONS
======================================================*/

function loadNotifications(){

    const stored =

    localStorage.getItem(

        NOTIFICATION_KEY

    );

    if(stored){

        notifications =

        JSON.parse(stored);

    }

}


/*====================================================
            UPDATE DASHBOARD CARDS
======================================================*/

function updateStatistics(){

    if(totalStudents){

        totalStudents.textContent =

        students.length;

    }

    if(pendingRequests){

        pendingRequests.textContent =

        requests.filter(

            request =>

            request.status === "Pending"

        ).length;

    }

    if(approvedRequests){

        approvedRequests.textContent =

        requests.filter(

            request =>

            request.status === "Approved"

        ).length;

    }

    if(totalPayments){

        totalPayments.textContent =

        payments.length;

    }

}


/*====================================================
            STATUS COLOUR
======================================================*/

function getStatusClass(status){

    switch(status){

        case "Approved":

            return "approved";

        case "failed":

            return "failed";

        case "Pending":

            return "pending";

        default:

            return "pending";

    }

}


/*====================================================
            RECENT ACTIVITY
======================================================*/

function renderRecentActivity(){

    if(!activityTable){

        return;

    }

    activityTable.innerHTML = "";

    if(requests.length===0){

        activityTable.innerHTML =

        `

        <tr>

            <td colspan="5"

            style="padding:30px;text-align:center;">

            No recent activity.

            </td>

        </tr>

        `;

        return;

    }

    requests

    .slice(0,6)

    .forEach(function(request){

        const row =

        document.createElement("tr");

        row.innerHTML =

        `

        <td>

            ${request.department}

        </td>

        <td>

            ${request.purpose}

        </td>

        <td>

            <span class="status ${getStatusClass(request.status)}">

                ${request.status}

            </span>

        </td>

        <td>

            ${request.date}

        </td>

        <td>

            <button

            class="action-btn"

            onclick="openRequest(${request.id})">

            <i class="fa-solid fa-eye"></i>

            </button>

        </td>

        `;

        activityTable.appendChild(row);

    });

}


/*====================================================
            VIEW REQUEST
======================================================*/

function openRequest(id){

    localStorage.setItem(

        "selectedRequest",

        id

    );

    window.location.href =
    "view-request.html";
}
    /*====================================================
            ADMIN DASHBOARD SYSTEM
                    PART 3B
======================================================*/


/*====================================================
                QUICK ACTIONS
======================================================*/

function goToProfile(){

    window.location.href =
    "Aprofile.html";

}

function goToStudents(){

    window.location.href =
    "manage-students.html";

}

function goToClearance(){

    window.location.href =
    "clearance-requests.html";

}

function goToReports(){

    window.location.href =
    "reports.html";

}

function goToNotifications(){

    window.location.href =
    "Anotifications.html";

}

/*====================================================
        UPDATE AFTER PAYMENT
======================================================*/

function dashboardPaymentUpdate(){

    loadPayments();

    updateStatistics();

}


/*====================================================
        UPDATE AFTER CLEARANCE
======================================================*/

function dashboardClearanceUpdate(){

    loadRequests();

    updateStatistics();

    renderRecentActivity();

}


/*====================================================
        UPDATE AFTER STUDENT
======================================================*/

function dashboardStudentUpdate(){

    loadStudents();

    updateStatistics();

}

/*====================================================
            SEARCH (OPTIONAL)
======================================================*/

function searchActivity(keyword){

    if(!activityTable){

        return;

    }

    keyword = keyword.toLowerCase();

    Array.from(activityTable.rows).forEach(function(row){

        const text = row.textContent.toLowerCase();

        row.style.display =

        text.includes(keyword)

        ? ""

        : "none";

    });

}


/*====================================================
            EXPORT REPORT
======================================================*/

function exportReport(){

    alert(

    "Reports can be exported from the Reports page."

    );

}


/*====================================================
            WELCOME MESSAGE
======================================================*/

function showWelcome(){

    const savedAdmin = JSON.parse(

        localStorage.getItem(

            ADMIN_PROFILE_KEY

        )

    );

    if(savedAdmin){

        console.log(

            "Welcome " +

            savedAdmin.fullName

        );

    }

}

showWelcome();


/*====================================================
            DASHBOARD INITIALIZE
======================================================*/

window.addEventListener(

"DOMContentLoaded",

function(){

    loadDashboard();

});


/*====================================================
            GLOBAL FUNCTIONS
======================================================*/

if (typeof goToProfile === "function") {
    window.goToProfile = goToProfile;
}

if (typeof goToStudents === "function") {
    window.goToStudents = goToStudents;
}

if (typeof goToClearance === "function") {
    window.goToClearance = goToClearance;
}

if (typeof goToReports === "function") {
    window.goToReports = goToReports;
}

if (typeof goToNotifications === "function") {
    window.goToNotifications = goToNotifications;
}

if (typeof dashboardPaymentUpdate === "function") {
    window.dashboardPaymentUpdate = dashboardPaymentUpdate;
}

if (typeof dashboardClearanceUpdate === "function") {
    window.dashboardClearanceUpdate = dashboardClearanceUpdate;
}

if (typeof dashboardStudentUpdate === "function") {
    window.dashboardStudentUpdate = dashboardStudentUpdate;
}

if (typeof dashboardNotificationUpdate === "function") {
    window.dashboardNotificationUpdate = dashboardNotificationUpdate;
}

if (typeof searchActivity === "function") {
    window.searchActivity = searchActivity;
}

if (typeof exportReport === "function") {
    window.exportReport = exportReport;
}
/*====================================================
            DISPLAY ADMIN NAME
====================================================*/

const savedAdmin = JSON.parse(
    localStorage.getItem(ADMIN_PROFILE_KEY)
);

if (savedAdmin) {

    const adminName = document.getElementById("adminName");

    const dashboardAdminName =
        document.getElementById("dashboardAdminName");

    if (adminName) {
        adminName.textContent = savedAdmin.fullName;
    }

    if (dashboardAdminName) {
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