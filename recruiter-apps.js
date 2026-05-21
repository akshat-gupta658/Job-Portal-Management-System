document.addEventListener("DOMContentLoaded", () => {
    
    // Auth Bypass check for application processing node
    const currentRole = localStorage.getItem('role');
    if (currentRole === 'user') {
        alert("🛑 Access Denied! Recruiter panel access restricted.");
        window.location.href = "profile.html";
        return;
    }

    window.renderApplicationsQueue = function() {
        const appsBody = document.getElementById("applicationsTableBody");
        if (!appsBody) return;

        const globalAppsList = JSON.parse(localStorage.getItem("applicationsDatabase")) || [];
        appsBody.innerHTML = "";

        if (globalAppsList.length === 0) {
            appsBody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:#64748b; padding:20px;">No incoming applications registered in storage.</td></tr>`;
            return;
        }

        globalAppsList.forEach((app, idx) => {
            const currentStatus = (app.status || "PENDING").toUpperCase();
            let stateBadge = "status-pending";
            if (currentStatus === "APPROVED") stateBadge = "status-approved";
            if (currentStatus === "REJECTED") stateBadge = "status-rejected";

            const candidateName = app.username || app.applicantName || app.user || "Candidate Profile";
            const candidateEmail = app.email || app.applicantEmail || "N/A";
            const candidatePhone = app.phone || app.applicantPhone || "N/A";

            appsBody.innerHTML += `
                <tr>
                    <td style="font-weight:700; color:#0f172a;">${candidateName}</td>
                    <td>${candidateEmail}</td>
                    <td>${candidatePhone}</td>
                    <td><b>${app.company || "Organization"}</b></td>
                    <td>${app.role || "Job Target"}</td>
                    <td><a href="${app.resume || '#'}" target="_blank" style="color:#2563eb; font-weight:600; text-decoration:none;">📄 Open Attachment</a></td>
                    <td><span class="status-badge ${stateBadge}">${currentStatus}</span></td>
                    <td>
                        <button class="btn-action-approve" onclick="mutateApplicationStatus(${idx}, 'APPROVED')">✅ Approve</button> <br> <br>


                        <button class="btn-action-reject" onclick="mutateApplicationStatus(${idx}, 'REJECTED')">❌ Reject</button>
                    </td>
                </tr>
            `;
        });
    };

    window.mutateApplicationStatus = function(idx, targetState) {
        let globalAppsList = JSON.parse(localStorage.getItem("applicationsDatabase")) || [];
        if (globalAppsList[idx]) {
            globalAppsList[idx].status = targetState;
            localStorage.setItem("applicationsDatabase", JSON.stringify(globalAppsList));
            
            // Local state reset render
            window.renderApplicationsQueue();
            
            alert(`Application has been dynamic updated to ${targetState}!`);

            // Safe call to sync upper dashboard stats if available on active viewport
            if (typeof window.refreshDashboardCountersAndJobs === "function") {
                window.refreshDashboardCountersAndJobs();
            }
        }
    };

    window.renderApplicationsQueue();
});