/*====================================================*
* CLEARANCE HUB ADMIN NOTIFICATIONS
* PART 1
*====================================================*/

const STORAGE_KEY = "clearanceHubAdminNotifications";

/*====================================================*
* ELEMENTS
*====================================================*/

const tableContainer = document.querySelector(".table-container");
const markAllBtn = document.getElementById("markAllBtn");
function goToProfile() {
    window.location.href = "Aprofile.html";
}
/*====================================================*
* DEFAULT DATA
*====================================================*/

const defaultNotifications = [

{
    id: Date.now() + 1,
    title: "New Clearance Request Submitted",
    message: "John Doe (20/CSC/123456) submitted a new clearance request.",
    icon: "fas fa-user",
    colour: "purple",
    status: "New",
    date: "May 14, 2025",
    read: false
},

{
    id: Date.now() + 2,
    title: "Payment Successful",
    message: "Jane Smith paid Faculty Dues successfully.",
    icon: "fas fa-file",
    colour: "green",
    status: "Success",
    date: "May 14, 2025",
    read: false
},

{
    id: Date.now() + 3,
    title: "Document Verification Pending",
    message: "A document is awaiting verification.",
    icon: "fas fa-circle-exclamation",
    colour: "orange",
    status: "Pending",
    date: "May 14, 2025",
    read: false
}

];

/*====================================================*
* LOAD NOTIFICATIONS
*====================================================*/

let notifications = [];

loadNotifications();

function loadNotifications(){

    const stored =
        localStorage.getItem(STORAGE_KEY);

    if(stored){

        notifications = JSON.parse(stored);

    }

    else{

        notifications = defaultNotifications;

        saveNotifications();

    }

    renderNotifications();
}

/*====================================================*
* SAVE
*====================================================*/

function saveNotifications(){

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(notifications)
    );
}

/*====================================================*
* RENDER
*====================================================*/

function renderNotifications(){

    const oldRows =
        tableContainer.querySelectorAll(".notification-row");

    oldRows.forEach(row => row.remove());

    notifications.forEach(notification => {

        const row =
            createNotificationRow(notification);

        tableContainer.appendChild(row);

    });

    updateTotalCount();
}

/*====================================================*
* CREATE ROW
*====================================================*/

function createNotificationRow(notification){

    const row =
        document.createElement("div");

    row.className = "notification-row";

    row.dataset.id = notification.id;

    row.innerHTML = `

    <div class="notification-info">

        <div class="icon ${notification.colour}">
            <i class="${notification.icon}"></i>
        </div>

        <div>
            <h4>${notification.title}</h4>
            <p>${notification.message}</p>
        </div>

    </div>

    <div class="date">
        ${notification.date}
    </div>

    <div>
        <span class="badge ${notification.status.toLowerCase()}">
            ${notification.status}
        </span>
    </div>

    <div class="action-buttons">


        <button
            class="delete-btn"
            onclick="deleteNotification(${notification.id})">

            <i class="fas fa-trash"></i>

        </button>

    </div>

    `;

    return row;
}
/*====================================================*
* PART 2
*====================================================*/

/*====================================================*
* MARK ONE AS READ
*====================================================*/

function markNotificationAsRead(id){

    const notification =
        notifications.find(item => item.id === id);

    if(!notification) return;

    notification.read = true;

    notification.status = "Success";

    saveNotifications();

    renderNotifications();

    showToast(
        "Notification Opened",
        notification.title
    );
}

if (markAllBtn) {
    markAllBtn.addEventListener("click", () => {

        notifications.forEach(notification => {

            notification.read = true;

            if (notification.status === "New") {
                notification.status = "Success";
            }

        });

        saveNotifications();
        renderNotifications();

        showToast(
            "Notifications Updated",
            "All notifications marked as read."
        );

    });
}
/*====================================================*
* TOTAL COUNT
*====================================================*/

function updateTotalCount(){

    const footerCount =
        document.querySelector(".card-footer div:last-child");

    if(!footerCount) return;

    footerCount.textContent =
        `Total: ${notifications.length} notifications`;
}

/*====================================================*
* TOAST
*====================================================*/

function showToast(title,message){

    let toast =
        document.getElementById("adminToast");

    if(!toast){

        toast = document.createElement("div");

        toast.id = "adminToast";

        toast.className = "admin-toast";

        document.body.appendChild(toast);
    }

    toast.innerHTML = `

        <strong>${title}</strong>
        <p>${message}</p>

    `;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    },3000);
}

/*====================================================*
* ADMIN NOTIFICATION TYPES
*====================================================*/

function newStudentRegistered(name,matric){

    addAdminNotification(
        "New Student Registered",
        `${name} (${matric}) registered on the system.`,
        "fas fa-user-plus",
        "blue",
        "New"
    );
}

function clearanceSubmitted(name,matric){

    addAdminNotification(
        "New Clearance Request Submitted",
        `${name} (${matric}) submitted a clearance request.`,
        "fas fa-user",
        "purple",
        "New"
    );
}

function paymentSuccessful(name){

    addAdminNotification(
        "Payment Successful",
        `${name} has completed payment successfully.`,
        "fas fa-file",
        "green",
        "Success"
    );
}

function documentPending(name){

    addAdminNotification(
        "Document Verification Pending",
        `${name} uploaded a document awaiting verification.`,
        "fas fa-circle-exclamation",
        "orange",
        "Pending"
    );
}

function clearanceApproved(name){

    addAdminNotification(
        "Clearance Approved",
        `${name}'s clearance request has been approved.`,
        "fas fa-circle-check",
        "green",
        "Success"
    );
}

function clearanceRejected(name){

    addAdminNotification(
        "Clearance Rejected",
        `${name}'s clearance request has been rejected.`,
        "fas fa-shield-halved",
        "red",
        "Rejected"
    );
}

/*====================================================*
* ADD NOTIFICATION
*====================================================*/

function addAdminNotification(
    title,
    message,
    icon,
    colour,
    status
){

    notifications.unshift({

        id: Date.now(),

        title,

        message,

        icon,

        colour,

        status,

        date: new Date().toLocaleString(),

        read: false

    });

    saveNotifications();

    renderNotifications();

    showToast(
        "New Notification",
        title
    );
}

/*====================================================*
* ADMIN NAME
*====================================================*/

window.addEventListener("DOMContentLoaded", () => {

    const profile =
        JSON.parse(
            localStorage.getItem("adminProfile")
        );

    const adminName =
        document.getElementById("adminName");

    if(profile && adminName){

        adminName.textContent =
            profile.fullName;

    }

});

    /*====================================================*
* DELETE MODAL LOGIC
*====================================================*/

let notificationToDeleteId = null;

function openDeleteModal(id) {
    notificationToDeleteId = id;
    const modal = document.getElementById('deleteModal');
    if (modal) {
        modal.style.display = "block";
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        notificationToDeleteId = null;
    }
}

function confirmDelete() {
    if (notificationToDeleteId !== null) {
        deleteNotification(notificationToDeleteId);
    }
    closeModal('deleteModal');
}

window.onclick = function(event) {
    const modal = document.getElementById('deleteModal');
    if (event.target === modal) {
        closeModal('deleteModal');
    }
};

/*====================================================*
* GLOBAL FUNCTIONS
*====================================================*/
window.markNotificationAsRead = markNotificationAsRead;
window.newStudentRegistered = newStudentRegistered;
window.clearanceSubmitted = clearanceSubmitted;
window.paymentSuccessful = paymentSuccessful;
window.documentPending = documentPending;
window.clearanceApproved = clearanceApproved;
window.clearanceRejected = clearanceRejected;
window.openDeleteModal = openDeleteModal;
window.closeModal = closeModal;
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

    const topheader=
    document.querySelector("h1");
    if (topheader) {
        topheader.parentElement.prepend(menuButton);
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