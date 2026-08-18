/*====================================================
        CLEARANCE HUB NOTIFICATION SYSTEM
                PART 3A
======================================================*/


/*====================================================
                LOCAL STORAGE KEY
======================================================*/

const STORAGE_KEY = "clearanceHubNotifications";


/*====================================================
                HTML ELEMENTS
======================================================*/

const notificationList = document.querySelector(".notification-list");
const markAllBtn = document.getElementById("markAll");
const notificationCounter = document.querySelector(".notification-count");
const toast = document.getElementById("toast");


/*====================================================
            DEFAULT NOTIFICATIONS
======================================================*/

const defaultNotifications = [

    {

        id: Date.now() + 1,

        title: "Payment Successful",

        message: "Your payment of ₦15,000 has been confirmed.",

        icon: "fa-regular fa-credit-card",

        colour: "payment",

        time: "10 mins ago",

        read: false

    },

    {

        id: Date.now() + 2,

        title: "Clearance Request Received",

        message: "Your clearance request has been submitted successfully.",

        icon: "fa-solid fa-user-check",

        colour: "clearance",

        time: "30 mins ago",

        read: false

    },

    {

        id: Date.now() + 3,

        title: "Document Verification Pending",

        message: "Please upload your transcript for verification.",

        icon: "fa-regular fa-clock",

        colour: "pending",

        time: "1 hour ago",

        read: false

    }

];

window.goToProfile= function(){
    window.location.href=
    "Sprofile.html";
}
/*====================================================
        LOAD NOTIFICATIONS
======================================================*/

let notifications = [];

loadNotifications();


/*====================================================
        LOAD FROM LOCAL STORAGE
======================================================*/

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


/*====================================================
        SAVE TO LOCAL STORAGE
======================================================*/

function saveNotifications(){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(notifications)

    );

}


/*====================================================
        RENDER ALL NOTIFICATIONS
======================================================*/

function renderNotifications(){

    notificationList.innerHTML = "";

    notifications.forEach(notification=>{

        const card = createNotificationCard(notification);

        notificationList.appendChild(card);

    });

    updateNotificationCounter();

}


/*====================================================
        CREATE NOTIFICATION CARD
======================================================*/

function createNotificationCard(notification){

    const card = document.createElement("div");

    card.className = notification.read

    ? "notification-card"

    : "notification-card unread";


    card.dataset.id = notification.id;


    card.innerHTML = `

        <span class="blue-dot ${notification.read ? "invisible" : ""}"></span>

        <div class="icon ${notification.colour}">

            <i class="${notification.icon}"></i>

        </div>

        <div class="notification-text">

            <h3>${notification.title}</h3>

            <p>${notification.message}</p>

        </div>

        <div class="notification-right">

            <small>${notification.time}</small>

            <span class="status ${notification.read ? "read" : "new"}">

                ${notification.read ? "Read" : "New"}

            </span>

        </div>

    `;


    card.addEventListener(

        "click",

        ()=>{

            markNotificationAsRead(notification.id);

        }

    );


    return card;

}


/*====================================================
        UPDATE COUNTER
======================================================*/

/*====================================================
        UPDATE COUNTER
======================================================*/

function updateNotificationCounter(){

    const unread = notifications.filter(

        notification => !notification.read

    ).length;

    if(!notificationCounter){

        return;

    }

    notificationCounter.textContent = unread;

    if(unread === 0){

        notificationCounter.style.display = "none";

    }

    else{

        notificationCounter.style.display = "flex";

    }

}

/*====================================================
        SHOW TOAST
======================================================*/

function showToast(title,message){

    toast.innerHTML = `

        <i class="fa-solid fa-bell"></i>

        <div>

            <h4>${title}</h4>

            <p>${message}</p>

        </div>

    `;

    toast.classList.add("show");
  
    setTimeout(()=>{

        toast.classList.remove("show");

    },3500);

}


/*====================================================
        ADD NOTIFICATION
======================================================*/

function addNotification(

    title,

    message,

    icon,

    colour

){

    const notification={

        id:Date.now(),

        title:title,

        message:message,

        icon:icon,

        colour:colour,

        time:"Just now",

        read:false

    };


    notifications.unshift(notification);

    saveNotifications();

    renderNotifications();

    showToast(

        "New Notification",

        title

    );

}


/*====================================================
        TEST FUNCTION
======================================================*/

function testNotification(){

    addNotification(

        "Faculty Officer Approved",

        "Your faculty dues have been verified successfully.",

        "fa-solid fa-circle-check",

        "approved"

    );

}


/*====================================================
        CLEAR STORAGE
======================================================*/

function clearNotificationStorage(){

    localStorage.removeItem(STORAGE_KEY);

    notifications = [...defaultNotifications];

    saveNotifications();

    renderNotifications();

}


/*====================================================
        MAKE FUNCTIONS GLOBAL
======================================================*/

window.testNotification = testNotification;

window.clearNotificationStorage = clearNotificationStorage;
/*====================================================
                PART 3B
      READ • DELETE • TIME • ANIMATIONS
======================================================*/


/*====================================================
        MARK ONE NOTIFICATION AS READ
======================================================*/

function markNotificationAsRead(id){

    const notification = notifications.find(item => item.id === id);

    if(!notification) return;

    if(notification.read) return;

    notification.read = true;

    saveNotifications();

    renderNotifications();

}


/*====================================================
        MARK ALL AS READ
======================================================*/

markAllBtn.addEventListener("click", () => {

    notifications.forEach(notification => {

        notification.read = true;

    });

    saveNotifications();

    renderNotifications();

    showToast(

        "Notifications Updated",

        "All notifications have been marked as read."

    );

});


/*====================================================
        DELETE NOTIFICATION
======================================================*/

function deleteNotification(id){

    notifications = notifications.filter(

        notification => notification.id !== id

    );

    saveNotifications();

    renderNotifications();

}


/*====================================================
        CREATE DELETE BUTTON
======================================================*/

function createDeleteButton(id){

    const button = document.createElement("button");

    button.className = "delete-notification";

    button.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';

    button.title = "Delete Notification";

    button.addEventListener("click",(event)=>{

        event.stopPropagation();

        deleteNotification(id);

        showToast(

            "Notification Deleted",

            "Notification removed successfully."

        );

    });

    return button;

}


/*====================================================
        OVERRIDE CARD CREATION
======================================================*/

const oldCreateNotificationCard = createNotificationCard;

createNotificationCard = function(notification){

    const card = oldCreateNotificationCard(notification);

    card.appendChild(

        createDeleteButton(notification.id)

    );

    card.classList.add("fade-in");

    return card;

};


/*====================================================
        DUPLICATE PREVENTION
======================================================*/

function notificationExists(title,message){

    return notifications.some(notification =>

        notification.title === title &&

        notification.message === message &&

        notification.read === false

    );

}


/*====================================================
        SAFE ADD NOTIFICATION
======================================================*/

const oldAddNotification = addNotification;

addNotification = function(

    title,

    message,

    icon,

    colour

){

    if(notificationExists(title,message)){

        return;

    }

    oldAddNotification(

        title,

        message,

        icon,

        colour

    );

};


/*====================================================
        AUTO TIME FORMAT
======================================================*/

function formatTime(date){

    const seconds =

        Math.floor((Date.now()-date)/1000);

    if(seconds < 60){

        return "Just now";

    }

    if(seconds < 3600){

        return Math.floor(seconds/60) +

        " mins ago";

    }

    if(seconds < 86400){

        return Math.floor(seconds/3600) +

        " hrs ago";

    }

    if(seconds < 604800){

        return Math.floor(seconds/86400) +

        " days ago";

    }

    return new Date(date)

    .toLocaleDateString();

}


/*====================================================
        UPDATE ALL TIMES
======================================================*/

function refreshNotificationTimes(){

    notifications.forEach(notification=>{

        if(notification.createdAt){

            notification.time =

            formatTime(notification.createdAt);

        }

    });

    saveNotifications();

    renderNotifications();

}


/*====================================================
        ADD CREATED DATE TO OLD ITEMS
======================================================*/

notifications.forEach(notification=>{

    if(!notification.createdAt){

        notification.createdAt = Date.now();

    }

});


saveNotifications();


/*====================================================
        OVERRIDE ADD NOTIFICATION
======================================================*/

const previousAdd = addNotification;

addNotification = function(

    title,

    message,

    icon,

    colour

){

    if(notificationExists(title,message)){

        return;

    }

    const notification = {

        id: Date.now(),

        title,

        message,

        icon,

        colour,

        createdAt: Date.now(),

        time: "Just now",

        read: false

    };

    notifications.unshift(notification);

    saveNotifications();

    renderNotifications();

    showToast(

        "New Notification",

        title

    );

};


/*====================================================
        UPDATE TIMES EVERY MINUTE
======================================================*/

setInterval(()=>{

    refreshNotificationTimes();

},60000);


/*====================================================
        KEYBOARD SHORTCUTS
======================================================*/

document.addEventListener("keydown",(event)=>{

    if(event.ctrlKey && event.key==="m"){

        notifications.forEach(notification=>{

            notification.read=true;

        });

        saveNotifications();

        renderNotifications();

        showToast(

            "Notifications",

            "Marked all as read."

        );

    }

});


/*====================================================
        HELPER FUNCTIONS
======================================================*/

window.deleteNotification = deleteNotification;

window.markNotificationAsRead =

markNotificationAsRead;
/*====================================================
            PART 3C
      CLEARANCE HUB INTEGRATION
======================================================*/


/*====================================================
        NOTIFICATION TYPES
======================================================*/

const NotificationTypes = {

    PAYMENT: {
        icon: "fa-regular fa-credit-card",
        colour: "payment"
    },

    CLEARANCE: {
        icon: "fa-solid fa-user-check",
        colour: "clearance"
    },

    APPROVED: {
        icon: "fa-solid fa-circle-check",
        colour: "approved"
    },

    REJECTED: {
        icon: "fa-solid fa-circle-xmark",
        colour: "reminder"
    },

    PENDING: {
        icon: "fa-regular fa-clock",
        colour: "pending"
    },

    REMINDER: {
        icon: "fa-regular fa-bell",
        colour: "reminder"
    }

};



/*====================================================
        PAYMENT SUCCESS
======================================================*/

function paymentSuccessful(amount){

    addNotification(

        "Payment Successful",

        `Your payment of ₦${amount} has been verified successfully.`,

        NotificationTypes.PAYMENT.icon,

        NotificationTypes.PAYMENT.colour

    );

}



/*====================================================
        PAYMENT FAILED
======================================================*/

function paymentFailed(){

    addNotification(

        "Payment Failed",

        "Your payment could not be processed. Please try again.",

        "fa-solid fa-circle-exclamation",

        "reminder"

    );

}



/*====================================================
        CLEARANCE SUBMITTED
======================================================*/

function clearanceSubmitted(){

    addNotification(

        "Clearance Submitted",

        "Your clearance request has been submitted successfully.",

        NotificationTypes.CLEARANCE.icon,

        NotificationTypes.CLEARANCE.colour

    );

}



/*====================================================
        DOCUMENT REQUIRED
======================================================*/

function documentPending(documentName){

    addNotification(

        "Document Required",

        `${documentName} is required before your clearance can continue.`,

        NotificationTypes.PENDING.icon,

        NotificationTypes.PENDING.colour

    );

}



/*====================================================
        DEPARTMENT APPROVAL
======================================================*/

function departmentApproved(department){

    addNotification(

        "Department Approved",

        `${department} has approved your clearance.`,

        NotificationTypes.APPROVED.icon,

        NotificationTypes.APPROVED.colour

    );

}



/*====================================================
        DEPARTMENT REJECTED
======================================================*/

function departmentRejected(department){

    addNotification(

        "Clearance Returned",

        `${department} requested corrections before approval.`,

        NotificationTypes.REJECTED.icon,

        NotificationTypes.REJECTED.colour

    );

}



/*====================================================
        FACULTY APPROVAL
======================================================*/

function facultyApproved(){

    addNotification(

        "Faculty Clearance Approved",

        "Your Faculty Clearance has been approved.",

        NotificationTypes.APPROVED.icon,

        NotificationTypes.APPROVED.colour

    );

}



/*====================================================
        FINAL CLEARANCE
======================================================*/

function finalClearanceApproved(){

    addNotification(

        "Congratulations!",

        "Your Final Year Clearance has been completed successfully.",

        "fa-solid fa-award",

        "approved"

    );

}



/*====================================================
        ADMIN ANNOUNCEMENT
======================================================*/

function adminAnnouncement(title,message){

    addNotification(

        title,

        message,

        "fa-solid fa-bullhorn",

        "clearance"

    );

}



/*====================================================
        DEADLINE REMINDER
======================================================*/

function clearanceDeadline(days){

    addNotification(

        "Deadline Reminder",

        `Your clearance deadline is in ${days} day(s).`,

        NotificationTypes.REMINDER.icon,

        NotificationTypes.REMINDER.colour

    );

}



/*====================================================
        LOGIN WELCOME
======================================================*/

function loginNotification(name){

    addNotification(

        "Welcome Back",

        `Welcome back ${name}. Have a productive day.`,

        "fa-solid fa-user",

        "approved"

    );

}

/*====================================================
        SAVE STUDENT PROFILE
======================================================*/

function profileUpdated(){

    addNotification(

        "Profile Updated",

        "Your profile information has been updated successfully.",

        "fa-solid fa-user-pen",

        "approved"

    );

}



/*====================================================
        PASSWORD CHANGED
======================================================*/

function passwordChanged(){

    addNotification(

        "Password Changed",

        "Your account password has been updated successfully.",

        "fa-solid fa-lock",

        "approved"

    );

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

    const topbar = document.querySelector(".topbar");

if (topbar) {

    topbar.prepend(menuButton);

    /* Make sure the button is visible */
    menuButton.style.display = "flex";
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


/*====================================================
        EXPORT FUNCTIONS
======================================================*/

window.paymentSuccessful = paymentSuccessful;

window.paymentFailed = paymentFailed;

window.clearanceSubmitted = clearanceSubmitted;

window.documentPending = documentPending;

window.departmentApproved = departmentApproved;

window.departmentRejected = departmentRejected;

window.facultyApproved = facultyApproved;

window.finalClearanceApproved = finalClearanceApproved;

window.adminAnnouncement = adminAnnouncement;

window.clearanceDeadline = clearanceDeadline;

window.loginNotification = loginNotification;

window.profileUpdated = profileUpdated;

window.passwordChanged = passwordChanged;
/*====================================================
            DISPLAY STUDENT NAME
====================================================*/

window.addEventListener("DOMContentLoaded", function () {

    const savedStudent = JSON.parse(localStorage.getItem("studentProfile"));

    if (!savedStudent) return;

    const studentName = document.getElementById("studentName");
    const dashboardStudentName = document.getElementById("dashboardStudentName");

    if (studentName) {

        studentName.textContent = savedStudent.fullName;

    }

    if (dashboardStudentName) {

        dashboardStudentName.textContent = savedStudent.fullName;

    }
});
