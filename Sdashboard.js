document.addEventListener("DOMContentLoaded", () => {

/*=========================================
            CHECK LOGIN
=========================================*/

const currentUser = JSON.parse(

    localStorage.getItem("currentUser")

);

if(!currentUser){

    window.location.href = "new html.html";

    return;

}
window.goToProfile= function(){
    window.location.href=
    "Sprofile.html";
}
/*=========================================
        LOAD STUDENT PROFILE
=========================================*/

const profile = JSON.parse(

    localStorage.getItem("studentProfile")

);
/*=========================================
        POPUP ELEMENTS
=========================================*/
const pendingModal = document.getElementById("pendingModal");
const modalDepartment = document.getElementById("modalDepartment");
const modalStatus = document.getElementById("modalStatus");
const modalRemark = document.getElementById("modalRemark");
const modalActionBtn = document.getElementById("modalActionBtn");
const closeModal = document.getElementById("closeModal");

/*=========================================
        DISPLAY STUDENT NAME
=========================================*/

const studentName =

document.getElementById("studentName");

const dashboardName =

document.getElementById("dashboardName");

if(profile){

    if(studentName){

        studentName.textContent =
        profile.fullName;

    }

    if(dashboardName){

        dashboardName.textContent =
        profile.fullName;

    }

}else{

    if(studentName){

        studentName.textContent =
        currentUser.email;

    }

    if(dashboardName){

        dashboardName.textContent =
        currentUser.email;

    }

}

/*=========================================
        LOAD CLEARANCE DATA
=========================================*/

let clearanceData = JSON.parse(

    localStorage.getItem("clearanceData")

);

if(!clearanceData){

    clearanceData = [

        {

            department:"Library",

            status:"Cleared"
            
        },

        {

            department:"Bursary",

            status:"Cleared"

        },

        {

            department:"Department",

            status:"Pending",
            
            remark:"Course Materials"
        },

        {

            department:"Faculty",

            status:"Pending",

             remark:"Approval Required"
        },

        {

            department:"Hostel",

            status:"Pending",

            remark:"Room Key Return"
        },

        {

            department:"Sports Unit",

            status:"Cleared"

        },

        {

            department:"Medical Centre",

            status:"Cleared"

        }

    ];

    localStorage.setItem(

        "clearanceData",

         JSON.parse(
    JSON.stringify(clearanceData)
)

    );

}

/*=========================================
        DASHBOARD STATISTICS
=========================================*/

const totalDepartments =

clearanceData.length;

const clearedDepartments =

clearanceData.filter(

department => department.status === "Cleared"

).length;

const pendingDepartments =

totalDepartments -

clearedDepartments;

const progress =

Math.round(

(clearedDepartments /

totalDepartments) * 100

);

/*=========================================
        UPDATE PROGRESS BAR
=========================================*/

const progressFill =

document.getElementById("progressFill");

const progressPercentage =

document.getElementById("progressPercentage");

const progressPercent =

document.getElementById("progressPercent");

if(progressFill){

    progressFill.style.width = "0%";

    setTimeout(()=>{

        progressFill.style.width =

        progress + "%";

    },300);

}

if(progressPercentage){

    progressPercentage.textContent =

    progress + "%";

}

if(progressPercent){

    progressPercent.textContent =

    progress + "%";

}

/*=========================================
        UPDATE SUMMARY CARDS
=========================================*/

function updateDashboardStatistics(){

    const clearanceData =
    JSON.parse(localStorage.getItem("clearanceData")) || [];

    const totalDepartments =
    clearanceData.length;

    const clearedDepartments =
    clearanceData.filter(
        item => item.status === "Cleared"
    ).length;

    const pendingDepartments =
    totalDepartments - clearedDepartments;

    document.getElementById("pendingClearanceCount").textContent =
    pendingDepartments;

}

/*=========================================
        STORE DASHBOARD DATA
=========================================*/

localStorage.setItem(

    "clearanceProgress",

    progress

);

localStorage.setItem(

    "pendingDepartments",

    pendingDepartments

);

/*=========================================
        VIEW BUTTONS
=========================================*/

const viewButtons =

document.querySelectorAll(".view-btn");

viewButtons.forEach((button,index)=>{

    button.addEventListener("click",()=>{

        const department = clearanceData[index + 2];

        if(!department) return;

        if(department.status === "Pending"){
        modalDepartment.textContent=department.department;
       modalStatus.textContent="Pending";
       modalStatus.className="status pending";
       console.log(department);
       modalRemark.textContent = "Please complete the outstanding clearance requirement before approval." ;
       
       modalActionBtn.textContent="Continue Clearance";
       modalActionBtn.onclick = function() {
            window.location.href = "clearancerequest.html";
        }
       pendingModal.classList.add("show");
        }
        else{
            modalDepartment.textContent=department.department;
            modalStatus.textContent="Cleared";
            modalStatus.className="status approved";
            modalRemark.textContent="You have successfully completed the clearance process for this department.";
            modalActionBtn.textContent="Done";
            modalActionBtn.onclick = function() {
                pendingModal.classList.remove("show");
            };
        }
            pendingModal.classList.add("show");
        });
        })
            closeModal.addEventListener("click", () => {
                pendingModal.classList.remove("show");
            });
            pendingModal.addEventListener("click", (e) => {
                if (e.target === pendingModal) {
                    pendingModal.classList.remove("show");
                }
            });

/*=========================================
        NOTIFICATIONS
=========================================*/

const notifications = [

    {

        title:"Bursary Clearance Approved",

        message:

        "Your bursary clearance has been approved successfully.",

        time:"2 Hours Ago"

    },

    {

        title:"Medical Report Required",

        message:

        "Please upload your medical report.",

        time:"Yesterday"

    },

    {

        title:"Department Approval Pending",

        message:

        "Your departmental clearance is awaiting approval.",

        time:"2 Days Ago"

    },

    {

        title:"Library Clearance Completed",

        message:

        "Library clearance completed successfully.",

        time:"3 Days Ago"

    }

];

/*=========================================
        SAVE NOTIFICATIONS
=========================================*/

localStorage.setItem(

    "notifications",

    JSON.stringify(notifications)

);

/*=========================================
        NOTIFICATION BADGE
=========================================*/

const notificationBadge =

document.querySelector(".notification-count");

if(notificationBadge){

    notificationBadge.textContent =

    notifications.length;

}

/*=========================================
        NOTIFICATION BUTTON
=========================================*/

const notificationButton =

document.querySelector(".notification-btn");

if(notificationButton){

    notificationButton.addEventListener("click",()=>{

        let message =

        "RECENT NOTIFICATIONS\n\n";

        notifications.forEach(notification=>{

            message +=

            notification.title +

            "\n" +

            notification.message +

            "\n" +

            notification.time +

            "\n\n";

        });

        alert(message);

    });

}

/*=========================================
        DASHBOARD STATISTICS
=========================================*/

const statistics = {

    totalDepartments:

    totalDepartments,

    cleared:

    clearedDepartments,

    pending:

    pendingDepartments,

    completion:

    progress

};

console.table(statistics);

localStorage.setItem(

    "dashboardStatistics",

    JSON.stringify(statistics)

);
/*=========================================
            LOGOUT
=========================================*/

const logoutButton =

document.getElementById("logoutBtn");

if(logoutButton){

    logoutButton.addEventListener("click",(event)=>{

        event.preventDefault();

        const logoutButton = 
        document.getElementById("logoutBtn");

        if(logoutButton){
            logoutButton.addEventListener("click", (event) => {
            event.preventDefault();
            showLogoutPopup();
            });

        }

    });

}

/*=========================================
        AUTO UPDATE DASHBOARD
=========================================*/

function updateDashboard(){

    const savedProgress = Number(

        localStorage.getItem(

            "clearanceProgress"

        )

    ) || progress;

    if(progressFill){

        progressFill.style.width =

        savedProgress + "%";

    }

    if(progressPercentage){

        progressPercentage.textContent =

        savedProgress + "%";

    }

    if(progressPercent){

        progressPercent.textContent =

        savedProgress + "%";

    }

}

updateDashboard();

/*=========================================
        GREETING MESSAGE
=========================================*/

const hour = new Date().getHours();

let greeting = "";

if(hour < 12){

    greeting = "Good Morning";

}

else if(hour < 18){

    greeting = "Good Afternoon";

}

else{

    greeting = "Good Evening";

}

console.log(

    greeting +

    ", " +

    (

        profile ?

        profile.fullName :

        currentUser.email

    )

);

/*=========================================
    HELPER FUNCTION
=========================================*/

function getPendingDepartments(){

    return clearanceData.filter(

        department =>

        department.status === "Pending"

    );

}

console.log(

    "Pending Departments:",

    getPendingDepartments()

);

/*=========================================
        LOAD STUDENT NAME
=========================================*/

window.addEventListener("load",()=>{

    if(profile){

        if(studentName){

            studentName.textContent =

            profile.fullName;

        }

        if(dashboardName){

            dashboardName.textContent =

            profile.fullName;

        }

    }

});

/*=========================================
        SAVE SESSION
=========================================*/

sessionStorage.setItem(

    "dashboardVisited",

    "true"

);

/*=========================================
        LAST LOGIN
=========================================*/

const today = new Date();

localStorage.setItem(

    "lastLogin",

    today.toLocaleString()

);

/*=========================================
        PAGE INFORMATION
=========================================*/

console.log(

    "Current User:",

    currentUser

);

console.log(

    "Dashboard Progress:",

    progress + "%"

);

console.log(

    "Pending Departments:",

    pendingDepartments

);

/*=========================================
        DASHBOARD READY
=========================================*/

console.log(

    "Student Dashboard Loaded Successfully."

);
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