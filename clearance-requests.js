/*==================================================*
 * ADMIN CLEARANCE REQUEST SYSTEM
 * PART 1A
 *==================================================*/

/*==================================================*
 * LOCAL STORAGE KEYS
 *==================================================*/

const STORAGE_KEY = "clearanceRequests";
const NOTIFICATION_KEY = "clearanceHubNotifications";


/*==================================================*
 * DOM ELEMENTS
 *==================================================*/

const requestTable =
document.getElementById("requestTable");

const searchInput =
document.getElementById("searchInput");

const statusFilter =
document.getElementById("statusFilter");

const toast =
document.getElementById("toast");


/*==================================================*
 * VIEW POPUP
 *==================================================*/

const viewPopup =
document.getElementById("viewPopup");

const popupStudent =
document.getElementById("popupStudent");

const popupMatric =
document.getElementById("popupMatric");

const popupDepartment =
document.getElementById("popupDepartment");

const popupPurpose =
document.getElementById("popupPurpose");

const popupStatus =
document.getElementById("popupStatus");

const popupDate =
document.getElementById("popupDate");

const popupComments =
document.getElementById("popupComments");

const popupFile =
document.getElementById("popupFile");


/*==================================================*
 * APPROVE POPUP
 *==================================================*/

const approvePopup =
document.getElementById("approvePopup");

const approveBtn =
document.getElementById("approveBtn");


/*==================================================*
 * REJECT POPUP
 *==================================================*/

const rejectPopup =
document.getElementById("rejectPopup");

const rejectBtn =
document.getElementById("rejectBtn");


/*==================================================*
 * DELETE POPUP
 *==================================================*/

const deletePopup =
document.getElementById("deletePopup");

const deleteBtn =
document.getElementById("deleteBtn");


/*==================================================*
 * PENDING POPUP
 *==================================================*/

const pendingPopup =
document.getElementById("pendingPopup");

const pendingBtn =
document.getElementById("pendingBtn");


/*==================================================*
 * SUCCESS POPUP
 *==================================================*/

const successPopup =
document.getElementById("successPopup");

const successTitle =
document.getElementById("successTitle");

const successMessage =
document.getElementById("successMessage");


/*==================================================*
 * REQUEST DATA
 *==================================================*/

let requests = [];

let selectedRequestId = null;


/*==================================================*
 * LOAD REQUESTS
 *==================================================*/

function loadRequests(){

    const storedRequests =
    localStorage.getItem(STORAGE_KEY);

    if(storedRequests){

        try{

            requests =
            JSON.parse(storedRequests);

        }

        catch(error){

            console.error(
                "Error loading clearance requests:",
                error
            );

            requests = [];

        }

    }

    else{

        requests = [];

    }


}


/*==================================================*
 * SAVE REQUESTS
 *==================================================*/

function saveRequests(){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(requests)

    );

}


/*==================================================*
 * STATUS CLASS
 *==================================================*/

function getStatusClass(status){

    switch(status){

        case "Approved":
            return "approved";

        case "Rejected":
            return "rejected";

        case "Pending":
            return "pending";

        case "Under Review":
            return "review";

        default:
            return "pending";

    }

}


/*==================================================*
 * RENDER REQUESTS
 *==================================================*/

function renderRequests(){

    if(!requestTable){

        return;

    }

    requestTable.innerHTML = "";

    if(requests.length === 0){

        requestTable.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    style="
                        text-align:center;
                        padding:40px;
                        color:#777;
                    "
                >

                    No clearance requests found.

                </td>

            </tr>

        `;

        return;

    }


    requests.forEach(request => {

        const row =
        document.createElement("tr");

        row.dataset.id =
        request.id;


        row.innerHTML = `

            <td>

                <div class="student-info">

                    <div>

                        <h4>
                            ${request.studentName || "Unknown"}
                        </h4>

                        <p>
                            ${request.matricNo || "-"}
                        </p>

                        <small>
                            ${request.email || ""}
                        </small>

                    </div>

                </div>

            </td>


            <td>

                ${request.department || "-"}

            </td>


            <td>

                <strong>
                    ${request.purpose || "-"}
                </strong>

                <br>

                <small>
                    ${request.description || ""}
                </small>

            </td>


            <td>

                <span class="status ${getStatusClass(request.status)}">

                    ${request.status || "Pending"}

                </span>

            </td>


            <td>

                ${request.date || "-"}

            </td>

        `;


        requestTable.appendChild(row);

    });

}


/*==================================================*
 * VIEW REQUEST
 *==================================================*/

function openViewPopup(id){

    const request =
    requests.find(

        item =>
        String(item.id) === String(id)

    );


    if(!request){

        return;

    }


    popupStudent.textContent =
    request.studentName || "Unknown";


    popupMatric.textContent =
    request.matricNo || "-";


    popupDepartment.textContent =
    request.department || "-";


    popupPurpose.textContent =
    request.purpose || "-";


    popupStatus.textContent =
    request.status || "Pending";


    popupDate.textContent =
    request.date || "-";


    popupComments.textContent =
    request.comments ||
    "No comments provided";


    popupFile.textContent =
    request.fileName ||
    "No file uploaded";


    viewPopup.style.display =
    "flex";

}


/*==================================================*
 * CLOSE VIEW POPUP
 *==================================================*/

function closeViewPopup(){

    if(viewPopup){

        viewPopup.style.display =
        "none";

    }

}


/*==================================================*
 * TOAST
 *==================================================*/

function showToast(title, message){

    if(!toast){

        return;

    }


    toast.innerHTML = `

        <i class="fa-solid fa-bell"></i>

        <div>

            <h4>
                ${title}
            </h4>

            <p>
                ${message}
            </p>

        </div>

    `;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/*==================================================*
 * SUCCESS POPUP
 *==================================================*/

function showSuccessPopup(title, message){

    if(!successPopup){

        return;

    }


    successTitle.textContent =
    title;


    successMessage.textContent =
    message;


    successPopup.style.display =
    "flex";

}


function closeSuccessPopup(){

    if(successPopup){

        successPopup.style.display =
        "none";

    }

}


/*==================================================*
 * NOTIFICATIONS
 *==================================================*/

function addAdminNotification(title, message){

    let notifications = [];


    try{

        notifications =
        JSON.parse(

            localStorage.getItem(
                NOTIFICATION_KEY
            )

        ) || [];

    }

    catch(error){

        notifications = [];

    }


    notifications.unshift({

        id: Date.now(),

        title: title,

        message: message,

        icon: "fa-solid fa-bell",

        colour: "clearance",

        createdAt: Date.now(),

        time: "Just now",

        read: false

    });


    localStorage.setItem(

        NOTIFICATION_KEY,

        JSON.stringify(notifications)

    );

}


/*==================================================*
 * APPROVE POPUP
 *==================================================*/

function openApprovePopup(id){

    selectedRequestId = id;


    if(approvePopup){

        approvePopup.style.display =
        "flex";

    }

}


function closeApprovePopup(){

    if(approvePopup){

        approvePopup.style.display =
        "none";

    }


    selectedRequestId = null;

}


/*==================================================*
 * REJECT POPUP
 *==================================================*/

function openRejectPopup(id){

    selectedRequestId = id;


    if(rejectPopup){

        rejectPopup.style.display =
        "flex";

    }

}


function closeRejectPopup(){

    if(rejectPopup){

        rejectPopup.style.display =
        "none";

    }


    selectedRequestId = null;

}


/*==================================================*
 * DELETE POPUP
 *==================================================*/

function openDeletePopup(id){

    selectedRequestId = id;


    if(deletePopup){

        deletePopup.style.display =
        "flex";

    }

}


function closeDeletePopup(){

    if(deletePopup){

        deletePopup.style.display =
        "none";

    }


    selectedRequestId = null;

}


/*==================================================*
 * PENDING POPUP
 *==================================================*/

function openPendingPopup(id){

    selectedRequestId = id;


    if(pendingPopup){

        pendingPopup.style.display =
        "flex";

    }

}


function closePendingPopup(){

    if(pendingPopup){

        pendingPopup.style.display =
        "none";

    }


    selectedRequestId = null;

}


/*==================================================*
 * APPROVE REQUEST
 *==================================================*/

function approveRequest(){

    const request =
    requests.find(

        item =>
        String(item.id) ===
        String(selectedRequestId)

    );


    if(!request){

        console.error(
            "Request not found:",
            selectedRequestId
        );

        closeApprovePopup();

        return;

    }


    request.status =
    "Approved";


    saveRequests();


    renderRequests();


    addAdminNotification(

        "Request Approved",

        `${request.studentName || "Student"} clearance request approved.`

    );


    closeApprovePopup();


    showSuccessPopup(

        "Approved",

        "Clearance request approved successfully."

    );

}


/*==================================================*
 * REJECT REQUEST
 *==================================================*/

function rejectRequest(){

    const request =
    requests.find(

        item =>
        String(item.id) ===
        String(selectedRequestId)

    );


    if(!request){

        console.error(
            "Request not found:",
            selectedRequestId
        );

        closeRejectPopup();

        return;

    }


    request.status =
    "Rejected";


    saveRequests();


    renderRequests();


    addAdminNotification(

        "Request Rejected",

        `${request.studentName || "Student"} clearance request rejected.`

    );


    closeRejectPopup();


    showSuccessPopup(

        "Rejected",

        "Clearance request rejected successfully."

    );

}


/*==================================================*
 * MARK REQUEST PENDING
 *==================================================*/

function markPendingRequest(){

    const request =
    requests.find(

        item =>
        String(item.id) ===
        String(selectedRequestId)

    );


    if(!request){

        console.error(
            "Request not found:",
            selectedRequestId
        );

        closePendingPopup();

        return;

    }


    request.status =
    "Pending";


    saveRequests();


    renderRequests();


    addAdminNotification(

        "Request Pending",

        `${request.studentName || "Student"} clearance request marked as pending.`

    );


    closePendingPopup();


    showSuccessPopup(

        "Marked Pending",

        "Clearance request has been marked as pending."

    );

}


/*==================================================*
 * DELETE REQUEST
 *==================================================*/

function deleteRequest(){

    if(selectedRequestId === null){

        return;

    }


    const requestExists =
    requests.some(

        item =>
        String(item.id) ===
        String(selectedRequestId)

    );


    if(!requestExists){

        closeDeletePopup();

        return;

    }


    requests =
    requests.filter(

        item =>
        String(item.id) !==
        String(selectedRequestId)

    );


    saveRequests();


    renderRequests();


    closeDeletePopup();


    showSuccessPopup(

        "Deleted",

        "Request removed successfully."

    );

}


/*==================================================*
 * REVIEW PANEL BUTTONS
 *
 * THESE ARE THE BUTTONS IN YOUR HTML:
 *
 * .approve-btn
 * .pending-btn
 * .reject-btn
 *==================================================*/

const reviewApproveBtn =
document.querySelector(
    ".action-buttons .approve-btn"
);

const reviewPendingBtn =
document.querySelector(
    ".action-buttons .pending-btn"
);

const reviewRejectBtn =
document.querySelector(
    ".action-buttons .reject-btn"
);


/*==================================================*
 * APPROVE BUTTON
 *==================================================*/

if(reviewApproveBtn){

    reviewApproveBtn.addEventListener(

        "click",

        function(){

            const id =
            this.dataset.id;

            openApprovePopup(id);

        }

    );

}


/*==================================================*
 * PENDING BUTTON
 *==================================================*/

if(reviewPendingBtn){

    reviewPendingBtn.addEventListener(

        "click",

        function(){

            const id =
            this.dataset.id;

            openPendingPopup(id);

        }

    );

}


/*==================================================*
 * REJECT BUTTON
 *==================================================*/

if(reviewRejectBtn){

    reviewRejectBtn.addEventListener(

        "click",

        function(){

            const id =
            this.dataset.id;

            openRejectPopup(id);

        }

    );

}


/*==================================================*
 * TABLE BUTTON EVENTS
 *
 * KEPT FOR DYNAMIC TABLE BUTTONS
 *==================================================*/

if(requestTable){

    requestTable.addEventListener(

        "click",

        function(event){

            const button =
            event.target.closest("button");


            if(!button){

                return;

            }


            const id =
            button.dataset.id;


            if(
                button.classList.contains(
                    "view-btn"
                )
            ){

                openViewPopup(id);

            }


            if(
                button.classList.contains(
                    "approve-btn"
                )
            ){

                openApprovePopup(id);

            }


            if(
                button.classList.contains(
                    "reject-btn"
                )
            ){

                openRejectPopup(id);

            }


            if(
                button.classList.contains(
                    "pending-btn"
                )
            ){

                openPendingPopup(id);

            }


            if(
                button.classList.contains(
                    "delete-btn"
                )
            ){

                openDeletePopup(id);

            }

        }

    );

}


/*==================================================*
 * SEARCH
 *==================================================*/

if(searchInput){

    searchInput.addEventListener(

        "input",

        function(){

            const value =
            this.value
            .toLowerCase()
            .trim();


            const filtered =
            requests.filter(

                request =>

                (request.studentName || "")
                .toLowerCase()
                .includes(value)

                ||

                (request.matricNo || "")
                .toLowerCase()
                .includes(value)

                ||

                (request.department || "")
                .toLowerCase()
                .includes(value)

                ||

                (request.purpose || "")
                .toLowerCase()
                .includes(value)

            );


            renderFilteredRequests(
                filtered
            );

        }

    );

}


/*==================================================*
 * FILTER
 *==================================================*/

if(statusFilter){

    statusFilter.addEventListener(

        "change",

        function(){

            const status =
            this.value;


            if(status === "All"){

                renderRequests();

                return;

            }


            const filtered =
            requests.filter(

                request =>
                request.status === status

            );


            renderFilteredRequests(
                filtered
            );

        }

    );

}


/*==================================================*
 * FILTERED TABLE
 *==================================================*/

function renderFilteredRequests(filteredRequests){

    if(!requestTable){

        return;

    }


    requestTable.innerHTML = "";


    if(filteredRequests.length === 0){

        requestTable.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    style="
                        text-align:center;
                        padding:40px;
                        color:#777;
                    "
                >

                    No clearance requests found.

                </td>

            </tr>

        `;

        return;

    }


    filteredRequests.forEach(request => {

        const row =
        document.createElement("tr");


        row.dataset.id =
        request.id;


        row.innerHTML = `

            <td>

                <div class="student-info">

                    <div>

                        <h4>
                            ${request.studentName || "Unknown"}
                        </h4>

                        <p>
                            ${request.matricNo || "-"}
                        </p>

                        <small>
                            ${request.email || ""}
                        </small>

                    </div>

                </div>

            </td>


            <td>
                ${request.department || "-"}
            </td>


            <td>

                <strong>
                    ${request.purpose || "-"}
                </strong>

                <br>

                <small>
                    ${request.description || ""}
                </small>

            </td>


            <td>

                <span class="status ${getStatusClass(request.status)}">

                    ${request.status || "Pending"}

                </span>

            </td>


            <td>
                ${request.date || "-"}
            </td>

        `;


        requestTable.appendChild(row);

    });

}


/*==================================================*
 * CONFIRM BUTTONS
 *==================================================*/

if(approveBtn){

    approveBtn.addEventListener(

        "click",

        approveRequest

    );

}


if(rejectBtn){

    rejectBtn.addEventListener(

        "click",

        rejectRequest

    );

}


if(deleteBtn){

    deleteBtn.addEventListener(

        "click",

        deleteRequest

    );

}


if(pendingBtn){

    pendingBtn.addEventListener(

        "click",

        markPendingRequest

    );

}


/*==================================================*
 * GLOBAL FUNCTIONS
 *==================================================*/

window.openViewPopup =
openViewPopup;

window.closeViewPopup =
closeViewPopup;


window.openApprovePopup =
openApprovePopup;

window.closeApprovePopup =
closeApprovePopup;


window.openRejectPopup =
openRejectPopup;

window.closeRejectPopup =
closeRejectPopup;


window.openDeletePopup =
openDeletePopup;

window.closeDeletePopup =
closeDeletePopup;


window.openPendingPopup =
openPendingPopup;

window.closePendingPopup =
closePendingPopup;


window.closeSuccessPopup =
closeSuccessPopup;


window.approveRequest =
approveRequest;

window.rejectRequest =
rejectRequest;

window.markPendingRequest =
markPendingRequest;

window.deleteRequest =
deleteRequest;


/*==================================================*
 * CLOSE POPUPS WHEN CLICKING OUTSIDE
 *==================================================*/

window.addEventListener(

    "click",

    function(event){

        if(
            viewPopup &&
            event.target === viewPopup
        ){

            closeViewPopup();

        }


        if(
            approvePopup &&
            event.target === approvePopup
        ){

            closeApprovePopup();

        }


        if(
            rejectPopup &&
            event.target === rejectPopup
        ){

            closeRejectPopup();

        }


        if(
            deletePopup &&
            event.target === deletePopup
        ){

            closeDeletePopup();

        }


        if(
            pendingPopup &&
            event.target === pendingPopup
        ){

            closePendingPopup();

        }


        if(
            successPopup &&
            event.target === successPopup
        ){

            closeSuccessPopup();

        }

    }

);


/*==================================================*
 * LOAD DATA
 *==================================================*/

loadRequests();



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