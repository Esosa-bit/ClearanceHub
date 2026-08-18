const activities = [
    {
        color: "green",
        action: "Payment Report Generated",
        date: "16 Jul 2026, 10:45 AM"
    },

    {
        color: "green",
        action: "Student Report Downloaded",
        date: "15 Jul 2026, 09:35 AM"
    },

    {
        color: "blue",
        action: "Clearance Report Generated",
        date: "14 Jul 2026, 04:15 PM"
    },

    {
        color: "purple",
        action: "Complete Report Printed",
        date: "13 Jul 2026, 11:25 AM"
    },

    {
        color: "orange",
        action: "Payment Report Deleted",
        date: "12 Jul 2026, 02:10 PM"
    },

    {
        color: "red",
        action: "Student Report Downloaded",
        date: "12 Jul 2026, 10:05 AM"
    }
];

const tableBody = document.getElementById("activityTableBody");

activities.forEach(activity => {

    tableBody.innerHTML += `
        <tr>
            <td>
                <div class="activity">
                    <span class="dot ${activity.color}"></span>
                    ${activity.action}
                </div>
            </td>

            <td>${activity.date}</td>
        </tr>
    `;
});

document.getElementById("backBtn").addEventListener("click", () => {

    window.location.href = "reports.html";

});