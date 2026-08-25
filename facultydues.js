/*==================================================
        FACULTY DUES MANAGEMENT SYSTEM
        DIRECT PAYMENT VERSION
===================================================*/

/*==================================================
        LOCAL STORAGE
===================================================*/

const STORAGE_KEY = "facultyDues";
const SUMMARY_KEY = "facultyDuesSummary";


/*==================================================
        DOM ELEMENTS
===================================================*/

const paymentForm = document.getElementById("paymentForm");
const paymentCategory = document.getElementById("paymentCategory");
const amount = document.getElementById("amount");
const paymentMethod = document.getElementById("paymentMethod");

const paymentTableBody =
    document.getElementById("paymentTableBody");

const toast =
    document.getElementById("toast");


/*==================================================
        PAYMENT POPUP ELEMENTS
===================================================*/

const paymentPopup =
    document.getElementById("paymentPopup");

const popupReceiptNumber =
    document.getElementById("popupReceiptNumber");

const popupAmount =
    document.getElementById("popupAmount");

const popupDate =
    document.getElementById("popupDate");

const popupStatus =
    document.getElementById("popupStatus");


/*==================================================
        CURRENT USER
===================================================*/

const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


/*==================================================
        DISPLAY STUDENT NAME
===================================================*/

if (currentUser) {

    const studentName =
        document.getElementById("studentName");

    if (studentName) {

        studentName.textContent =
            currentUser.fullName;

    }

}


/*==================================================
        PAYMENT RECORDS
===================================================*/

let paymentRecords = [];


/*==================================================
        LOAD PAYMENTS
===================================================*/

function loadPayments() {

    const stored =
        localStorage.getItem(STORAGE_KEY);

    if (stored) {

        try {

            paymentRecords =
                JSON.parse(stored);

        } catch (error) {

            paymentRecords = [];

        }

    }

    renderPayments();
    updateDashboardSummary();
}


/*==================================================
        SAVE PAYMENTS
===================================================*/

function savePayments() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(paymentRecords)
    );

    updateDashboardSummary();
}


/*==================================================
        CURRENT DATE
===================================================*/

function getCurrentDate() {

    return new Date().toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/*==================================================
        GENERATE RECEIPT NUMBER
===================================================*/

function generateReceiptNumber() {

    const year =
        new Date().getFullYear();

    const number =
        String(paymentRecords.length + 1)
        .padStart(4, "0");

    return `RCPT${year}${number}`;

}


/*==================================================
        RENDER PAYMENT TABLE
===================================================*/

function renderPayments() {

    if (!paymentTableBody) {
        return;
    }

    paymentTableBody.innerHTML = "";

    if (paymentRecords.length === 0) {

        paymentTableBody.innerHTML = `
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


    paymentRecords.forEach(function(payment) {

        const row =
            document.createElement("tr");

        row.dataset.id =
            payment.id;

        row.innerHTML = `

            <td>
                ${payment.receipt}
            </td>

            <td>
                ${payment.category}
            </td>

            <td>
                ₦${Number(payment.amount)
                    .toLocaleString()}
            </td>

            <td>
                ${payment.date}
            </td>

            <td>

                <span class="status ${payment.statusClass}">
                    ${payment.status}
                </span>

            </td>

            <td>

                <button
                    class="view-btn"
                    type="button"
                    title="View Receipt">

                    <i class="fa-solid fa-eye"></i>

                </button>

            </td>

        `;

        paymentTableBody.appendChild(row);

    });

}


/*==================================================
        SHOW TOAST
===================================================*/

function showToast(title, message) {

    if (!toast) {
        return;
    }

    toast.innerHTML = `

        <i class="fa-solid fa-circle-check"></i>

        <div>

            <h4>${title}</h4>

            <p>${message}</p>

        </div>

    `;

    toast.classList.add("show");


    setTimeout(function() {

        toast.classList.remove("show");

    }, 3500);

}


/*==================================================
        VALIDATE PAYMENT FORM
===================================================*/

function validateForm() {

    if (paymentCategory.value === "") {

        alert(
            "Please select a payment category."
        );

        paymentCategory.focus();

        return false;

    }


    if (
        amount.value === "" ||
        Number(amount.value) <= 0
    ) {

        alert(
            "Please enter a valid payment amount."
        );

        amount.focus();

        return false;

    }


    if (paymentMethod.value === "") {

        alert(
            "Please select a payment method."
        );

        paymentMethod.focus();

        return false;

    }


    return true;

}


/*==================================================
        CREATE PAYMENT
===================================================*/

function createPaymentRecord() {

    return {

        id: Date.now(),

        receipt:
            generateReceiptNumber(),

        category:
            paymentCategory.value,

        amount:
            Number(amount.value),

        paymentMethod:
            paymentMethod.value,

        date:
            getCurrentDate(),

        status:
            "Paid",

        statusClass:
            "verified"

    };

}


/*==================================================
        SUBMIT PAYMENT
===================================================*/

paymentForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        if (!validateForm()) {
            return;
        }


        /*
        In a real payment gateway,
        payment processing would happen here.

        For your project demonstration,
        we simulate a successful payment.
        */


        const payment =
            createPaymentRecord();


        paymentRecords.unshift(payment);


        savePayments();


        renderPayments();


        /*==========================================
            SHOW SUCCESS POPUP
        ==========================================*/

        showPaymentReceipt(payment);


        /*==========================================
            TOAST
        ==========================================*/

        showToast(
            "Payment Successful",
            "Your payment has been completed successfully."
        );


        /*==========================================
            NOTIFICATION SYSTEM
        ==========================================*/

        if (
            typeof paymentSuccessful ===
            "function"
        ) {

            paymentSuccessful(
                payment.amount
            );

        }


        /*==========================================
            CLEAR FORM
        ==========================================*/

        paymentForm.reset();

    }
);


/*==================================================
        SHOW PAYMENT RECEIPT
===================================================*/

function showPaymentReceipt(payment) {

    popupReceiptNumber.textContent =
        payment.receipt;

    popupPaymentCategory.textContent =
        payment.category;

    popupAmount.textContent =
        "₦" +
        Number(payment.amount)
        .toLocaleString();

    popupDate.textContent =
        payment.date;

    popupStatus.textContent =
        payment.status;


    paymentPopup.style.display =
        "flex";

}


/*==================================================
        VIEW PAYMENT RECEIPT
===================================================*/

paymentTableBody.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(".view-btn");

        if (!button) {
            return;
        }


        const row =
            button.closest("tr");

        const id =
            Number(row.dataset.id);


        const payment =
            paymentRecords.find(
                item => item.id === id
            );


        if (!payment) {
            return;
        }


        showPaymentReceipt(payment);

    }
);


/*==================================================
        CLOSE POPUP
===================================================*/

function closePopup() {

    if (paymentPopup) {

        paymentPopup.style.display =
            "none";

    }

}

window.closePopup = closePopup;


/*==================================================
        UPDATE DASHBOARD SUMMARY
===================================================*/

function updateDashboardSummary() {

    let totalAmountPaid = 0;

    let totalPayments = 0;

    let paidPayments = 0;

    let pendingPayments = 0;


    paymentRecords.forEach(
        function(payment) {

            const paymentAmount =
                Number(payment.amount) || 0;


            totalAmountPaid +=
                paymentAmount;


            totalPayments++;


            if (payment.status === "Paid") {

                paidPayments++;

            }


            if (payment.status === "Pending") {

                pendingPayments++;

            }

        }
    );


    const summary = {

        totalAmountPaid:
            totalAmountPaid,

        totalPayments:
            totalPayments,

        paidPayments:
            paidPayments,

        pendingPayments:
            pendingPayments

    };


    localStorage.setItem(
        SUMMARY_KEY,
        JSON.stringify(summary)
    );

}


/*==================================================
        PROFILE REDIRECT
===================================================*/

window.goToProfile = function() {

    window.location.href =
        "Sprofile.html";

};

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
/*==================================================
        START SYSTEM
===================================================*/

loadPayments();