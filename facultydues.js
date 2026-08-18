/*==================================================
        FACULTY DUES MANAGEMENT SYSTEM
                PART 3A.1
===================================================*/


/*==================================================
            LOCAL STORAGE KEY
===================================================*/

const STORAGE_KEY = "facultyDues";


/*==================================================
            DOM ELEMENTS
===================================================*/

const paymentForm = document.getElementById("paymentForm");

const receiptNumber = document.getElementById("receiptNumber");

const paymentCategory = document.getElementById("paymentCategory");

const amount = document.getElementById("amount");

const receiptFile = document.getElementById("receiptFile");

const uploadBox = document.querySelector(".upload-box");

const paymentTableBody =
document.getElementById("paymentTableBody");

const toast =
document.getElementById("toast");

const currentUser=
JSON.parse(localStorage.getItem("currentUser"));
if (currentUser){
    const studentName= document.getElementById("studentName");
    if (studentName){
        studentName.textContent=currentUser.fullName;
    }
}

/*==================================================
            PAYMENT ARRAY
===================================================*/

let paymentRecords = [];

/*==================================================
            LOAD PAYMENTS
===================================================*/

loadPayments();

function loadPayments(){

    const stored =
    localStorage.getItem(STORAGE_KEY);

    if(stored){

        paymentRecords =
        JSON.parse(stored);

    }

    renderPayments();

}


/*==================================================
            SAVE PAYMENTS
===================================================*/

function savePayments(){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(paymentRecords)

    );

}
window.goToProfile= function(){
    window.location.href=
    "Sprofile.html";
}  

/*==================================================
            RENDER TABLE
===================================================*/

function renderPayments(){

    paymentTableBody.innerHTML = "";

    if(paymentRecords.length===0){

        paymentTableBody.innerHTML=`

        <tr>

            <td colspan="6"
            style="text-align:center;
            padding:30px;
            color:#888;">

            No payment records found.

            </td>

        </tr>

        `;

        return;

    }

    paymentRecords.forEach(payment=>{

        const row=document.createElement("tr");

        row.innerHTML=`

        <td>${payment.receipt}</td>

        <td>${payment.category}</td>

        <td>₦${Number(payment.amount).toLocaleString()}</td>

        <td>${payment.date}</td>

        <td>

            <span class="status ${payment.statusClass}">

            ${payment.status}

            </span>

        </td>

        <td>

            <button
            class="view-btn">

                <i class="fa-solid fa-eye"></i>

            </button>

        </td>

        `;

        paymentTableBody.appendChild(row);

    });

}


/*==================================================
            TOAST MESSAGE
===================================================*/
function showToast(title,message){

    toast.innerHTML=`

    <i class="fa-solid fa-circle-check"></i>

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


/*==================================================
            FILE VALIDATION
===================================================*/

const allowedTypes=[

    "image/png",

    "image/jpeg",

    "application/pdf"

];

const maxFileSize=

5*1024*1024;


/*==================================================
            FILE SELECTED
===================================================*/

receiptFile.addEventListener(

"change",

function(){

    const file=this.files[0];

    if(!file){

        return;

    }

    if(!allowedTypes.includes(file.type)){

        alert(

        "Only JPG, PNG and PDF files are allowed."

        );

        receiptFile.value="";

        return;

    }

    if(file.size>maxFileSize){

        alert(

        "Maximum upload size is 5MB."

        );

        receiptFile.value="";

        return;

    }

    uploadBox.innerHTML=`

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
        DRAG & DROP EVENTS
===================================================*/

uploadBox.addEventListener(

"dragover",

function(event){

    event.preventDefault();

    uploadBox.style.borderColor="#245dff";

    uploadBox.style.background="#edf4ff";

});


uploadBox.addEventListener(

"dragleave",

function(){

    uploadBox.style.borderColor="#cfd9ea";

    uploadBox.style.background="#fafcff";

});


uploadBox.addEventListener(

"drop",

function(event){

    event.preventDefault();

    uploadBox.style.borderColor="#cfd9ea";

    uploadBox.style.background="#fafcff";

    const file=

    event.dataTransfer.files[0];

    if(!file){

        return;

    }

    receiptFile.files=

    event.dataTransfer.files;

    receiptFile.dispatchEvent(

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
            PART 3A.2
      FORM SUBMISSION & LOCAL STORAGE
===================================================*/


/*==================================================
        DUPLICATE RECEIPT CHECK
===================================================*/

function receiptExists(receipt){

    return paymentRecords.some(payment =>

        payment.receipt.toLowerCase() ===

        receipt.toLowerCase()

    );

}


/*==================================================
        RESET UPLOAD BOX
===================================================*/

function resetUploadBox(){

    uploadBox.innerHTML = `

        <i class="fa-solid fa-cloud-arrow-up"></i>

        <h4>Click to upload</h4>

        <p>or drag and drop</p>

        <small>JPG, PNG or PDF (Max. 5MB)</small>

    `;

}


/*==================================================
        CLEAR FORM
===================================================*/

function clearForm(){

    paymentForm.reset();

    receiptFile.value = "";

    resetUploadBox();

}


/*==================================================
        CREATE PAYMENT OBJECT
===================================================*/

function createPaymentRecord(){

    return{

        id: Date.now(),

        receipt: receiptNumber.value.trim(),

        category: paymentCategory.value,

        amount: amount.value,

        date: getCurrentDate(),

        fileName: receiptFile.files[0].name,

        status: "Pending",

        statusClass: "pending"

    };

}


/*==================================================
        FORM VALIDATION
===================================================*/

function validateForm(){

    if(receiptNumber.value.trim()===""){

        alert("Receipt Number is required.");

        receiptNumber.focus();

        return false;

    }

    if(paymentCategory.value===""){

        alert("Please select a payment category.");

        paymentCategory.focus();

        return false;

    }

    if(amount.value===""){

        alert("Please enter the payment amount.");

        amount.focus();

        return false;

    }

    if(Number(amount.value)<=0){

        alert("Amount must be greater than zero.");

        amount.focus();

        return false;

    }

    if(receiptFile.files.length===0){

        alert("Please upload your payment receipt.");

        return false;

    }

    if(receiptExists(receiptNumber.value.trim())){

        alert("This receipt number already exists.");

        receiptNumber.focus();

        return false;

    }

    return true;

}


/*==================================================
        SUBMIT FORM
===================================================*/

paymentForm.addEventListener("submit", function(event){

    event.preventDefault();

    if(!validateForm()){

        return;

    }

    const payment = createPaymentRecord();

    paymentRecords.unshift(payment);

    savePayments();

    renderPayments();

    showToast(

        "Payment Submitted",

        "Your payment record has been saved."

    );

    /*------------------------------------------
        Notification System Integration
    -------------------------------------------*/
    if(typeof paymentSuccessful === "function"){

        paymentSuccessful(payment.amount);

    }

    clearForm();

});


/*==================================================
        VIEW RECEIPT
===================================================*/

paymentTableBody.addEventListener("click", function(event){

    const button = event.target.closest(".view-btn");

    if(!button){

        return;

    }

    const row = button.closest("tr");

    const receipt = row.children[0].textContent;

    const payment = paymentRecords.find(

        item => item.receipt === receipt

    );
    if(!payment){
        return;
    }

    document.getElementById("popupReceiptNumber").textContent = payment.receipt;
    document.getElementById("popupPaymentCategory").textContent = payment.category;
    document.getElementById("popupAmount").textContent = "₦" + Number(payment.amount).toLocaleString();
    document.getElementById("popupDate").textContent = payment.date;
    document.getElementById("popupStatus").textContent = payment.status;
    document.getElementById("popupFileName").textContent = payment.fileName;
    document.getElementById("paymentPopup").style.display = "flex";
});


/*==================================================
        CLOSE POPUP
===================================================*/

function closePopup(){

    document.getElementById("paymentPopup").style.display =
    "none";
}

/*==================================================
        SAMPLE DATA (ONLY FIRST TIME)
===================================================*/

if(paymentRecords.length===0){

    paymentRecords.push(

        {

            id: Date.now(),

            receipt:"RCPT20250001",

            category:"Faculty Maintenance Fees",

            amount:15000,

            date:getCurrentDate(),

            fileName:"receipt.pdf",

            status:"Verified",

            statusClass:"verified"

        },

        {

            id: Date.now()+1,

            receipt:"RCPT20250002",

            category:"Laboratory Fees",

            amount:5000,

            date:getCurrentDate(),

            fileName:"payment.jpg",

            status:"Pending",

            statusClass:"pending"

        }

    );

    savePayments();

    renderPayments();

}


/*==================================================
        GLOBAL FUNCTIONS
===================================================*/

window.renderPayments = renderPayments;

window.savePayments = savePayments;

window.paymentRecords = paymentRecords;
/*==================================================
            PART 3B.1A
        EDIT & DELETE PAYMENTS
===================================================*/


/*==================================================
            EDIT MODE
===================================================*/

let editingPaymentId = null;


/*==================================================
        OVERRIDE TABLE RENDER
===================================================*/

const originalRenderPayments = renderPayments;

renderPayments = function(){

    paymentTableBody.innerHTML = "";

    if(paymentRecords.length === 0){

        paymentTableBody.innerHTML = `

            <tr>

                <td colspan="6"
                style="text-align:center;padding:25px;">

                    No payment records found.

                </td>

            </tr>

        `;

        return;

    }

    paymentRecords.forEach(payment=>{

        const row = document.createElement("tr");

        row.dataset.id = payment.id;

        row.innerHTML = `

        <td>${payment.receipt}</td>

        <td>${payment.category}</td>

        <td>₦${Number(payment.amount).toLocaleString()}</td>

        <td>${payment.date}</td>

        <td>

            <span class="status ${payment.statusClass}">

                ${payment.status}

            </span>

        </td>

        <td class="action-buttons">

            <button class="view-btn">

                <i class="fa-solid fa-eye"></i>

            </button>

            <button class="edit-btn">

                <i class="fa-solid fa-pen"></i>

            </button>

            <button class="delete-btn">

                <i class="fa-solid fa-trash"></i>

            </button>

        </td>

        `;

        paymentTableBody.appendChild(row);

    });

};


/*==================================================
            DELETE PAYMENT
===================================================*/

function deletePayment(id){

    if(!confirm(

        "Delete this payment record?"

    )){

        return;

    }

    paymentRecords = paymentRecords.filter(

        payment => payment.id !== id

    );

    savePayments();

    renderPayments();

    showToast(

        "Deleted",

        "Payment record removed."

    );

}


/*==================================================
            LOAD PAYMENT
===================================================*/

function loadPayment(id){

    return paymentRecords.find(

        payment => payment.id === id

    );

}


/*==================================================
            EDIT PAYMENT
===================================================*/

function editPayment(id){

    const payment = loadPayment(id);

    if(!payment){

        return;

    }

    editingPaymentId = id;

    receiptNumber.value = payment.receipt;

    paymentCategory.value = payment.category;

    amount.value = payment.amount;

    uploadBox.innerHTML = `

        <i class="fa-solid fa-file-circle-check"></i>

        <h4>${payment.fileName}</h4>

        <p>

            Current uploaded receipt

        </p>

        <small>

            Upload another file to replace it

        </small>

    `;

    receiptNumber.focus();

    showToast(

        "Edit Mode",

        "Update the details and submit."

    );

}


/*==================================================
        TABLE BUTTON EVENTS
===================================================*/

paymentTableBody.addEventListener(

"click",

function(event){

    const row =

    event.target.closest("tr");

    if(!row){

        return;

    }

    const id = Number(row.dataset.id);

    if(

        event.target.closest(".edit-btn")

    ){

        editPayment(id);

        return;

    }

    if(

        event.target.closest(".delete-btn")

    ){

        deletePayment(id);

        return;

    }

});
/*==================================================
            PART 3B.1B
      UPDATE PAYMENT & CANCEL EDIT
===================================================*/


/*==================================================
        UPDATE BUTTON TEXT
===================================================*/

const submitButton =
document.querySelector(".submit-btn");


function enableEditMode(){

    submitButton.innerHTML = `

        <i class="fa-solid fa-floppy-disk"></i>

        Update Payment

    `;

}


function disableEditMode(){

    editingPaymentId = null;

    submitButton.innerHTML = `

        <i class="fa-solid fa-upload"></i>

        Submit Payment

    `;

}


/*==================================================
        MODIFY EDIT FUNCTION
===================================================*/

const originalEditPayment = editPayment;

editPayment = function(id){

    originalEditPayment(id);

    enableEditMode();

};


/*==================================================
        UPDATE PAYMENT
===================================================*/

function updatePayment(){

    const payment = paymentRecords.find(

        item => item.id === editingPaymentId

    );

    if(!payment){

        return;

    }

    payment.receipt =

        receiptNumber.value.trim();

    payment.category =

        paymentCategory.value;

    payment.amount =

        amount.value;

    payment.date =

        getCurrentDate();

    if(receiptFile.files.length > 0){

        payment.fileName =

        receiptFile.files[0].name;

    }

    savePayments();

    renderPayments();

    showToast(

        "Payment Updated",

        "Changes saved successfully."

    );

    if(typeof profileUpdated === "function"){

        profileUpdated();

    }

    clearForm();

    disableEditMode();

}


/*==================================================
        CANCEL EDIT
===================================================*/

function cancelEdit(){

    clearForm();

    disableEditMode();

    showToast(

        "Cancelled",

        "Edit mode cancelled."

    );

}


/*==================================================
        OVERRIDE FORM SUBMIT
===================================================*/

paymentForm.addEventListener(

"submit",

function(event){

    if(editingPaymentId === null){

        return;

    }

    event.preventDefault();

    if(!validateForm()){

        return;

    }

    updatePayment();

},true);


/*==================================================
        ESC KEY CANCELS EDIT
===================================================*/

document.addEventListener(

"keydown",

function(event){

    if(

        event.key === "Escape" &&

        editingPaymentId !== null

    ){

        cancelEdit();

    }

});


/*==================================================
        CHANGE PAYMENT STATUS
===================================================*/

function updatePaymentStatus(

    id,

    status

){

    const payment = paymentRecords.find(

        item => item.id === id

    );

    if(!payment){

        return;

    }

    payment.status = status;

    switch(status){

        case "Verified":

            payment.statusClass = "verified";

            break;

        case "Pending":

            payment.statusClass = "Pending";

            break;

        case "Under Review":

            payment.statusClass = "review";

            break;

        case "Rejected":

            payment.statusClass = "rejected";

            break;

    }

    savePayments();

    renderPayments();

}


/*==================================================
        GLOBAL FUNCTIONS
===================================================*/

window.updatePaymentStatus =

updatePaymentStatus;

window.cancelEdit = cancelEdit;
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
