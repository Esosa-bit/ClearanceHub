const STORAGE_KEY = "clearanceHubStudents";

let students = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
    {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        matric: "20/CSC/123456",
        department: "Computer Science",
        level: "400",
        duesStatus: "Paid",
        clearanceStatus: "Pending"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "janesmith@example.com",
        matric: "20/CSC/654321",
        department: "Computer Science",
        level: "400",
        duesStatus: "Paid",
        clearanceStatus: "Cleared"
    },
    {
        id: 3,
        name: "Michael Johnson",
        email: "michaelj@example.com",
        matric: "20/CSC/789012",
        department: "Computer Science",
        level: "400",
        duesStatus: "Paid",
        clearanceStatus: "Pending"
    },
    {
        id: 4,
        name: "Sarah Williams",
        email: "sarah.w@example.com",
        matric: "20/CSC/345678",
        department: "Computer Science",
        level: "400",
        duesStatus: "Paid",
        clearanceStatus: "Cleared"
    },
    {
        id: 5,
        name: "David Brown",
        email: "david.b@example.com",
        matric: "20/CSC/901234",
        department: "Computer Science",
        level: "400",
        duesStatus: "Pending",
        clearanceStatus: "Pending"
    },
    {
        id: 6,
        name: "Emily Martin",
        email: "emily.m@example.com",
        matric: "21/CSC/112233",
        department: "Computer Science",
        level: "300",
        duesStatus: "Paid",
        clearanceStatus: "Pending"
    },
    {
        id: 7,
        name: "Olivia Lee",
        email: "olivia.lee@example.com",
        matric: "21/CSC/445566",
        department: "Computer Science",
        level: "300",
        duesStatus: "Pending",
        clearanceStatus: "Under Review"
    }
];
function goToProfile() {
    window.location.href = "Aprofile.html";
}
const tableBody = document.getElementById("studentTableBody");

function saveStudents() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function getStatusBadge(status) {

    const value = status.toLowerCase();

    if (value === "paid") {
        return `<span class="badge paid">Paid</span>`;
    }

    if (value === "pending") {
        return `<span class="badge pending">Pending</span>`;
    }

    if (value === "cleared") {
        return `<span class="badge cleared">Cleared</span>`;
    }

    if (value === "under review") {
        return `<span class="badge review">Under Review</span>`;
    }

    return `<span class="badge">${status}</span>`;
}

function renderStudents() {

    tableBody.innerHTML = "";

    students.forEach(student => {

        const row = document.createElement("tr");

        row.innerHTML = `
        
            <td>
                <div class="student-info">


                    <div>
                        <div class="student-name">
                            ${student.name}
                        </div>

                        <div class="student-email">
                            ${student.email}
                        </div>
                    </div>

                </div>
            </td>

            <td>${student.matric}</td>

            <td>${student.department}</td>

            <td>${student.level}</td>

            <td>
                ${getStatusBadge(student.duesStatus)}
            </td>

            <td>
                ${getStatusBadge(student.clearanceStatus)}
            </td>

            <td>
                <div class="actions">

                    <button
                        class="action-btn view-btn"
                        onclick="viewStudent(${student.id})">

                        <i class="fas fa-eye"></i>

                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteStudent(${student.id})">

                        <i class="fas fa-trash"></i>

                    </button>

                </div>
            </td>

        `;

        tableBody.appendChild(row);

    });

}

function viewStudent(id) {

    const student = students.find(
        item => item.id === id
    );

    if (!student) return;

    showStudentDetails(student);
}

//ADD STUDENT POPUP//
    const addStudentBtn = document.getElementById("addStudentBtn");
const studentPopup = document.getElementById("studentPopup");
const closeStudentPopup = document.getElementById("closeStudentPopup");
const cancelStudent = document.getElementById("cancelStudent");
const studentForm = document.getElementById("studentForm");

// Open popup
addStudentBtn.addEventListener("click", function () {
    studentPopup.classList.add("active");
});

// Close popup
closeStudentPopup.addEventListener("click", function (event) {

    event.preventDefault();
    studentPopup.classList.remove("active");

    studentForm.reset();
});


// Close when clicking outside the popup
studentPopup.addEventListener("click", function (event) {
    if (event.target === studentPopup) {
        studentPopup.classList.remove("active");
        studentForm.reset();
    }
});

// Submit form
studentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("studentName").value;
    const matricNo = document.getElementById("matricNo").value;
    const department = document.getElementById("department").value;
    const level = document.getElementById("level").value;
    const email = document.getElementById("email").value;

    console.log({
        name,
        matricNo,
        department,
        level,
        email
    });

    showSuccessPopup("Student added successfully!");

    studentForm.reset();
    studentPopup.classList.remove("active");
});



   function deleteStudent(id) {

    const deletePopup = document.getElementById("deletePopup");

    // Store the student ID
    deletePopup.dataset.studentId = id;

    // Show popup
    deletePopup.classList.add("active");
}
const deletePopup = document.getElementById("deletePopup");
const cancelDelete = document.getElementById("cancelDelete");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

// Cancel deletion
if (cancelDelete) {
    cancelDelete.addEventListener("click", function () {
        deletePopup.classList.remove("active");
    });
}


// Confirm deletion
if (confirmDeleteBtn) {

    confirmDeleteBtn.addEventListener("click", function () {

        const id = Number(deletePopup.dataset.studentId);

        students = students.filter(
            student => student.id !== id
        );

        saveStudents();
        renderStudents();

        deletePopup.classList.remove("active");

        showSuccessPopup("Student deleted successfully!");

    });

}

// Close when clicking outside
deletePopup.addEventListener("click", function (event) {

    if (event.target === deletePopup) {
        deletePopup.classList.remove("active");
    }

});

function createInitials(name) {

    const names = name.trim().split(" ");

    if (names.length === 1) {
        return names[0][0].toUpperCase();
    }

    return (
        names[0][0] +
        names[1][0]
    ).toUpperCase();
}

function addStudent() {

    const name = prompt(
        "Student Full Name"
    );

    if (!name) return;

    const email = prompt(
        "Student Email"
    );

    if (!email) return;

    const matric = prompt(
        "Matric Number"
    );

    if (!matric) return;

    const department = prompt(
        "Department",
        "Computer Science"
    );

    const level = prompt(
        "Level",
        "400"
    );

    const newStudent = {

        id: Date.now(),

        initials: createInitials(name),

        avatarClass: "avatar-purple",

        name,

        email,

        matric,

        department,

        level,

        duesStatus: "Pending",

        clearanceStatus: "Pending"
    };

    students.unshift(newStudent);

    saveStudents();

    renderStudents();
}


renderStudents();
// Open student details popup
function showStudentDetails(student) {

    document.getElementById("modalStudentName").textContent =
        student.name;

    document.getElementById("modalStudentEmail").textContent =
        student.email;

    document.getElementById("modalStudentMatric").textContent =
        student.matric;

    document.getElementById("modalStudentDepartment").textContent =
        student.department;

    document.getElementById("modalStudentLevel").textContent =
        student.level;

    document.getElementById("modalStudentDuesStatus").textContent =
        student.duesStatus;

    document.getElementById("modalStudentClearanceStatus").textContent =
        student.clearanceStatus;

    document.getElementById("studentModal").style.display = "flex";
}

function closeStudentModal() {
    document.getElementById("studentModal").style.display = "none";
}


    /*==================================================
        CLOSE MODAL
===================================================*/

// CLOSE STUDENT MODAL

const studentModal = document.getElementById("studentModal");
const closeModal = document.querySelector(".close-modal");
const okButton = document.querySelector(".modal-ok-btn");

if (studentModal) {

    // Close with X button
   if (closeModal) {
    closeModal.addEventListener("click", function () {
        studentModal.style.display = "none";
    });
}

if (okButton) {
    okButton.addEventListener("click", function () {
        studentModal.style.display = "none";
    });
}

studentModal.addEventListener("click", function (event) {
    if (event.target === studentModal) {
        studentModal.style.display = "none";
    }
});
}


const successPopup = document.getElementById("successPopup");
const successMessage = document.getElementById("successMessage");
const successOkBtn = document.getElementById("successOkBtn");

function showSuccessPopup(message) {
    successMessage.textContent = message;
    successPopup.classList.add("active");
}

successOkBtn.addEventListener("click", function () {
    successPopup.classList.remove("active");
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