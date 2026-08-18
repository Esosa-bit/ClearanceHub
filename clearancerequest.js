/*==================================================
        CLEARANCE REQUEST SYSTEM
                PART 3A.1A
===================================================*/


/*==================================================
        LOCAL STORAGE KEY
===================================================*/

const STORAGE_KEY = "clearanceRequests";


/*==================================================
        DOM ELEMENTS
===================================================*/

const clearanceForm =
document.getElementById("clearanceForm");

const department =
document.getElementById("department");

const purpose =
document.getElementById("purpose");

const supportFile =
document.getElementById("supportFile");

const uploadBox =
document.querySelector(".upload-box");

const requestTable =
document.getElementById("requestTable");

const toast =
document.getElementById("toast");

const charCount =
document.getElementById("charCount");


/*==================================================
        REQUEST ARRAY
===================================================*/

let clearanceRequests = [];


window.goToProfile= function(){
    window.location.href=
    "Sprofile.html";
}
/*==================================================
        TOAST MESSAGE
===================================================*/

function showToast(title,message){

    toast.innerHTML = `

        <i class="fa-solid fa-circle-check"></i>

        <div>

            <h4>${title}</h4>

            <p>${message}</p>

        </div>

    `;

    toast.classList.add("show");

    setTimeout(function(){

        toast.classList.remove("show");

    },3000);

}


/*==================================================
        FILE VALIDATION
===================================================*/

const allowedFiles = [

    "application/pdf",

    "image/png",

    "image/jpeg"

];

const maxFileSize =

5 * 1024 * 1024;


/*==================================================
        FILE SELECTED
===================================================*/

supportFile.addEventListener("change",function(){

    const file = this.files[0];

    if(!file){

        return;

    }

    if(!allowedFiles.includes(file.type)){

        alert(

        "Only PDF, JPG and PNG files are allowed."

        );

        this.value = "";

        return;

    }

    if(file.size > maxFileSize){

        alert(

        "Maximum upload size is 5MB."

        );

        this.value = "";

        return;

    }

    uploadBox.innerHTML = `

        <i class="fa-solid fa-file-circle-check"></i>

        <h4>${file.name}</h4>

        <p>

            ${(file.size/1024).toFixed(1)} KB

        </p>

        <small>

            Ready for upload

        </small>

    `;

});


/*==================================================
        DRAG OVER
===================================================*/

uploadBox.addEventListener(

"dragover",

function(event){

    event.preventDefault();

    uploadBox.style.borderColor="#245dff";

    uploadBox.style.background="#edf4ff";

});


/*==================================================
        DRAG LEAVE
===================================================*/

uploadBox.addEventListener(

"dragleave",

function(){

    uploadBox.style.borderColor="#cfd8e8";

    uploadBox.style.background="#fafcff";

});


/*==================================================
        DROP FILE
===================================================*/

uploadBox.addEventListener(

"drop",

function(event){

    event.preventDefault();

    uploadBox.style.borderColor="#cfd8e8";

    uploadBox.style.background="#fafcff";

    const file =

    event.dataTransfer.files[0];

    if(!file){

        return;

    }

    supportFile.files =

    event.dataTransfer.files;

    supportFile.dispatchEvent(

        new Event("change")

    );

});


/*==================================================
        DATE FUNCTION
===================================================*/

function getCurrentDate(){

    return new Date()

    .toLocaleDateString(

        "en-GB",

        {

            day:"2-digit",

            month:"short",

            year:"numeric"

        }

    );

}


/*==================================================
        RESET UPLOAD BOX
===================================================*/

function resetUploadBox(){

    uploadBox.innerHTML = `

        <i class="fa-solid fa-cloud-arrow-up"></i>

        <p>

            Drag & drop a file here, or

            <span>click to browse</span>

        </p>

        <small>

            PDF, JPG, PNG (Max. 5MB)

        </small>

    `;

}


/*==================================================
        CLEAR FORM
===================================================*/

function clearForm(){

    clearanceForm.reset();

    charCount.textContent = "0";

    supportFile.value = "";

    resetUploadBox();

}
/*==================================================
        CLEARANCE REQUEST SYSTEM
                PART 3A.1B
===================================================*/


/*==================================================
        LOAD REQUESTS
===================================================*/

loadRequests();

function loadRequests(){

    const storedRequests =

    localStorage.getItem(STORAGE_KEY);

    if(storedRequests){

        clearanceRequests =

        JSON.parse(storedRequests);

    }

    renderRequests();

}


/*==================================================
        SAVE REQUESTS
===================================================*/

function saveRequests(){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(clearanceRequests)

    );

}


/*==================================================
        STATUS BADGE
===================================================*/

function getStatusClass(status){

    switch(status){

        case "Approved":

            return "approved";

        case "Pending":

            return "pending";

        case "Under Review":

            return "review";

        case "Rejected":

            return "rejected";

        default:

            return "not-started";

    }

}


/*==================================================
        RENDER REQUEST TABLE
===================================================*/

function renderRequests(){

    requestTable.innerHTML = "";

    if(clearanceRequests.length===0){

        requestTable.innerHTML = `

        <tr>

            <td colspan="5"

            style="

            text-align:center;

            padding:35px;

            color:#777;">

            No clearance requests submitted.

            </td>

        </tr>

        `;

        return;

    }

    clearanceRequests.forEach(function(request){

        const row =

        document.createElement("tr");

        row.dataset.id = request.id;

        row.innerHTML = `

        <td>

            ${request.department}

        </td>

        <td>

            ${request.purpose}

        </td>

        <td>

            <span class="status

            ${getStatusClass(request.status)}">

            ${request.status}

            </span>

        </td>

        <td>

            ${request.date}

        </td>

        <td>

            <button

            class="view-btn"

            data-id="${request.id}">

            <i class="fa-solid fa-eye"></i>

            </button>

        </td>

        `;

        requestTable.appendChild(row);

    });

}


/*==================================================
        CREATE SAMPLE DATA
===================================================*/

if(clearanceRequests.length===0){

    clearanceRequests.push(

        {

            id:Date.now(),

            department:"Faculty Office",

            purpose:"Final Year Clearance",

            comments:

            "Awaiting review.",

            fileName:"",

            status:"Pending",

            date:getCurrentDate()

        },

        {

            id:Date.now()+1,

            department:"Library",

            purpose:"General Clearance",

            comments:

            "Library clearance completed.",

            fileName:"",

            status:"Approved",

            date:getCurrentDate()

        }

    );

    saveRequests();

    renderRequests();

}


/*==================================================
        TOTAL REQUESTS
===================================================*/

function getTotalRequests(){

    return clearanceRequests.length;

}


/*==================================================
        PENDING REQUESTS
===================================================*/

function getPendingRequests(){

    return clearanceRequests.filter(

        request =>

        request.status==="Pending"

    ).length;

}


/*==================================================
        APPROVED REQUESTS
===================================================*/

function getApprovedRequests(){

    return clearanceRequests.filter(

        request =>

        request.status==="Approved"

    ).length;

}


/*==================================================
        REJECTED REQUESTS
===================================================*/

function getRejectedRequests(){

    return clearanceRequests.filter(

        request =>

        request.status==="Rejected"

    ).length;

}


/*==================================================
        GLOBAL FUNCTIONS
===================================================*/

window.renderRequests =

renderRequests;

window.saveRequests =

saveRequests;

window.clearanceRequests =

clearanceRequests;
/*==================================================
        CLEARANCE REQUEST SYSTEM
                PART 3A.2
===================================================*/


/*==================================================
        DUPLICATE REQUEST CHECK
===================================================*/

function requestExists(){

    return clearanceRequests.some(request =>

        request.department === department.value &&

        request.purpose === purpose.value &&

        request.status !== "Approved"

    );

}


/*==================================================
        FORM VALIDATION
===================================================*/

function validateRequest(){

    if(department.value===""){

        alert("Please select a department.");

        department.focus();

        return false;

    }

    if(purpose.value===""){

        alert("Please select a clearance purpose.");

        purpose.focus();

        return false;

    }

    if(requestExists()){

        alert(

        "A similar clearance request is already pending."

        );

        return false;

    }

    return true;

}


/*==================================================
        CREATE REQUEST OBJECT
===================================================*/

function createRequest(){

    let fileName="";

    if(supportFile.files.length>0){

        fileName=

        supportFile.files[0].name;

    }

    return{

        id:Date.now(),

        department:department.value,

        purpose:purpose.value,

        comments:comments.value.trim(),

        fileName:fileName,

        date:getCurrentDate(),

        status:"Pending"

    };

}


/*==================================================
        SUBMIT REQUEST
===================================================*/

clearanceForm.addEventListener(

"submit",

function(event){

    event.preventDefault();

    if(!validateRequest()){

        return;

    }

    const request=

    createRequest();

    clearanceRequests.unshift(

        request

    );

    saveRequests();

    renderRequests();

    showToast(

        "Request Submitted",

        "Your clearance request has been sent."

    );

    if(

    typeof addNotification==="function"

    ){

        addNotification(

        "New clearance request submitted."

        );

    }

    clearForm();

});


/*==================================================
        RESET BUTTON
===================================================*/

clearanceForm.addEventListener(

"reset",

function(){

    setTimeout(function(){

        clearForm();

    },10);

});


/*==================================================
        VIEW REQUEST
===================================================*/

requestTable.addEventListener(

"click",

function(event){

    const button = event.target.closest(".view-btn");

    if(!button){

        return;

    }

    const id = Number(button.dataset.id);

    const request = clearanceRequests.find(

        item => item.id === id

    );

    if(!request){

        return;

    }

    document.getElementById("popupDepartment").textContent =
    request.department;

    document.getElementById("popupPurpose").textContent =
    request.purpose;

    document.getElementById("popupStatus").textContent =
    request.status;

    document.getElementById("popupDate").textContent =
    request.date;

    document.getElementById("popupComments").textContent =
    request.comments || "None";

    document.getElementById("popupFile").textContent =
    request.fileName || "No file uploaded";

    document.getElementById("requestPopup").style.display = "flex";

});


/*==================================================
        CLOSE POPUP
===================================================*/

function closePopup(){

    document.getElementById("requestPopup").style.display = "none";

}

/*==================================================
        AUTO REFRESH
===================================================*/

renderRequests();


/*==================================================
        GLOBAL FUNCTIONS
===================================================*/

window.validateRequest=

validateRequest;

window.createRequest=

createRequest;
/*==================================================
            PART 3B.1A
===================================================*/


let editingRequestId = null;


/*==================================================
        MODAL ELEMENTS
===================================================*/

const requestModal =
document.getElementById("requestModal");

const closeModal =
document.querySelector(".close-modal");

const modalDepartment =
document.getElementById("modalDepartment");

const modalPurpose =
document.getElementById("modalPurpose");

const modalStatus =
document.getElementById("modalStatus");

const modalDate =
document.getElementById("modalDate");

const modalFile =
document.getElementById("modalFile");


/*==================================================
        OVERRIDE TABLE
===================================================*/

const previousRenderRequests =
renderRequests;

renderRequests = function(){

    requestTable.innerHTML="";

    if(clearanceRequests.length===0){

        previousRenderRequests();

        return;

    }

    clearanceRequests.forEach(request=>{

        const row=document.createElement("tr");

        row.dataset.id=request.id;

        row.innerHTML=`

        <td>${request.department}</td>

        <td>${request.purpose}</td>

        <td>

        <span class="status ${getStatusClass(request.status)}">

        ${request.status}

        </span>

        </td>

        <td>${request.date}</td>

        <td>

        <button
        class="view-btn"
        data-id="${request.id}">

        <i class="fa-solid fa-eye"></i>

        </button>

        <button
        class="edit-btn"
        data-id="${request.id}">

        <i class="fa-solid fa-pen"></i>

        </button>

        <button
        class="delete-btn"
        data-id="${request.id}">

        <i class="fa-solid fa-trash"></i>

        </button>

        </td>

        `;

        requestTable.appendChild(row);

    });

};


/*==================================================
        TABLE EVENTS
===================================================*/

requestTable.addEventListener(

"click",

function(event){

const button=

event.target.closest("button");

if(!button){

return;

}

const id=

Number(button.dataset.id);

const request=

clearanceRequests.find(

item=>item.id===id

);

if(!request){

return;

}


/*============= VIEW =============*/

if(button.classList.contains("view-btn")){

modalDepartment.textContent=

request.department;

modalPurpose.textContent=

request.purpose;

modalStatus.textContent=

request.status;

modalDate.textContent=

request.date;

modalComments.textContent=

request.comments ||

"No additional comments.";

modalFile.textContent=

request.fileName ||

"No file uploaded.";

requestModal.style.display="flex";

return;

}


/*============= EDIT =============*/

if(button.classList.contains("edit-btn")){

editRequest(id);
showToast(

"Edit Mode",

"You can now update this request."

);

return;

}


/*============= DELETE =============*/

if(button.classList.contains("delete-btn")){

if(!confirm(

"Delete this clearance request?"

)){

return;

}

clearanceRequests=

clearanceRequests.filter(

item=>item.id!==id

);

saveRequests();

renderRequests();

showToast(

"Deleted",

"Request removed successfully."

);

}

});


/*==================================================
        CLOSE MODAL
===================================================*/

closeModal.addEventListener(

"click",

function(){

requestModal.style.display="none";

});


window.addEventListener(

"click",

function(event){

if(event.target===requestModal){

requestModal.style.display="none";

}

});


renderRequests();
/*==================================================
            PART 3B.1B
      UPDATE & CANCEL EDIT REQUEST
===================================================*/


/*==================================================
        SUBMIT BUTTON
===================================================*/

const submitRequestButton =
document.querySelector(".submit-btn");


/*==================================================
        ENABLE EDIT MODE
===================================================*/

function enableRequestEditMode(){

    submitRequestButton.innerHTML=`

        <i class="fa-solid fa-floppy-disk"></i>

        Update Request

    `;

}


/*==================================================
        DISABLE EDIT MODE
===================================================*/

function disableRequestEditMode(){

    editingRequestId=null;

    submitRequestButton.innerHTML=`

        <i class="fa-solid fa-paper-plane"></i>

        Submit Request

    `;

}


/*==================================================
        OVERRIDE EDIT BUTTON
===================================================*/

const oldEditRequest = function(id){

    const request = clearanceRequests.find(

        item => item.id === id

    );

    if(!request){

        return;

    }

    editingRequestId = id;

    department.value = request.department;

    purpose.value = request.purpose;

};

function editRequest(id){

    oldEditRequest(id);

    enableRequestEditMode();

}


/*==================================================
        UPDATE REQUEST
===================================================*/

function updateRequest(){

    const request = clearanceRequests.find(

        item => item.id === editingRequestId

    );

    if(!request){

        return;

    }

    request.department = department.value;

    request.purpose = purpose.value;

    request.date = getCurrentDate();

    if(supportFile.files.length > 0){

        request.fileName = supportFile.files[0].name;

    }

    saveRequests();

    renderRequests();

    showToast(

        "Request Updated",

        "Your clearance request has been updated."

    );

    clearForm();

    disableRequestEditMode();

}
/*==================================================
        CANCEL EDIT
===================================================*/

function cancelRequestEdit(){

    clearForm();

    disableRequestEditMode();

    showToast(

        "Cancelled",

        "Edit mode cancelled."

    );

}


/*==================================================
        OVERRIDE TABLE EVENTS
===================================================*/

requestTable.addEventListener(

"click",

function(event){

    const button=

    event.target.closest(".edit-btn");

    if(!button){

        return;

    }

    editRequest(

    Number(

    button.dataset.id

    ));

});


/*==================================================
        OVERRIDE FORM SUBMIT
===================================================*/

clearanceForm.addEventListener(

"submit",

function(event){

    if(editingRequestId===null){

        return;

    }

    event.preventDefault();

    if(!validateRequest()){

        return;

    }

    updateRequest();

},true);


/*==================================================
        ESC CANCELS EDIT
===================================================*/

document.addEventListener(

"keydown",

function(event){

    if(

    event.key==="Escape"

    &&

    editingRequestId!==null

    ){

        cancelRequestEdit();

    }

});


/*==================================================
        UPDATE STATUS
===================================================*/

function updateRequestStatus(

id,

status

){

    const request=

    clearanceRequests.find(

    item=>item.id===id

    );

    if(!request){

        return;

    }

    request.status=status;

    saveRequests();

    renderRequests();

}


/*==================================================
        GLOBAL FUNCTIONS
===================================================*/

window.updateRequest=

updateRequest;

window.cancelRequestEdit=

cancelRequestEdit;

window.updateRequestStatus=

updateRequestStatus;
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
