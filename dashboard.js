document.addEventListener("DOMContentLoaded", () => {
    // 🔑 Smart Testing Auto-Auth Feature
    let currentRole = localStorage.getItem('role');
    
    // Agar aap testing kar rahe ho aur role nahi mila, toh crash hone ki jagah auto-set kar dega
    if (!currentRole) {
        localStorage.setItem('role', 'recruiter');
        localStorage.setItem('username', 'Sinil (Recruiter Mode)');
        currentRole = 'recruiter';
    }

    // Agar role jaanbujhkar 'user' set hai tabhi deny karega
    if (currentRole === 'user') {
        alert("🛑 Access Denied! Job Seekers cannot access the Recruiter Dashboard.");
        window.location.href = "profile.html"; // User ko uske profile page par bhej dega
        return;
    }

    const currentUserName = localStorage.getItem('username') || "Recruiter";
    const welcomeGreeting = document.getElementById("welcomeGreeting");
    if (welcomeGreeting) {
        welcomeGreeting.innerText = `Welcome, ${currentUserName}! ✨`;
    }

    function refreshDashboard() {
        // Analytics calculations safely
        const postedJobs = JSON.parse(localStorage.getItem("customJobs")) || [];
        const totalJobsEl = document.getElementById("statTotalJobs");
        if (totalJobsEl) totalJobsEl.innerText = postedJobs.length;

        const globalAppsList = JSON.parse(localStorage.getItem("applicationsDatabase")) || [];
        const pendingAppsEl = document.getElementById("statPendingApps");
        const approvedAppsEl = document.getElementById("statApprovedApps");

        if (pendingAppsEl) {
            pendingAppsEl.innerText = globalAppsList.filter(app => (app.status || "PENDING").toUpperCase() === "PENDING").length;
        }
        if (approvedAppsEl) {
            approvedAppsEl.innerText = globalAppsList.filter(app => (app.status || "PENDING").toUpperCase() === "APPROVED").length;
        }

        // Render Jobs Table
        const jobsBody = document.getElementById("manageJobsTableBody");
        if (!jobsBody) return;
        jobsBody.innerHTML = "";

        if (postedJobs.length === 0) {
            jobsBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:15px; color:#fff;">No custom jobs posted yet.</td></tr>`;
            return;
        }

        postedJobs.forEach((job, idx) => {
            jobsBody.innerHTML += `
                <tr>
                    <td><b>${job.company}</b></td>
                    <td>${job.title || job.role}</td>
                    <td>${job.location}</td>
                    <td>${job.salary}</td>
                    <td><span style="font-size:12px; background:#dbeafe; padding:2px 6px; border-radius:4px; color:#1e3a8a;">${job.tags}</span></td>
                    <td><button class="btn-delete-job" onclick="removeCircularNode(${idx})">🗑️ Delete</button></td>
                </tr>`;
        });
    }

    window.removeCircularNode = function(idx) {
        if (confirm("❌ Delete this posting permanently?")) {
            let postedJobs = JSON.parse(localStorage.getItem("customJobs")) || [];
            postedJobs.splice(idx, 1);
            localStorage.setItem("customJobs", JSON.stringify(postedJobs));
            refreshDashboard();
        }
    };

    // Modal Operations Safely
    const jobModal = document.getElementById("jobModal");
    const openBtn = document.getElementById("openAddJobModalBtn");
    const jobForm = document.getElementById("jobForm");

    if (openBtn && jobModal) {
        openBtn.addEventListener("click", () => jobModal.classList.add("active"));
    }

    // Modal background click se close karne ke liye safety mesh
    if (jobModal) {
        jobModal.addEventListener("click", (e) => {
            if (e.target === jobModal) jobModal.classList.remove("active");
        });
    }

    if (jobForm) {
        jobForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const payload = {
                id: Date.now(),
                company: document.getElementById("modalCompany").value.trim(),
                title: document.getElementById("modalTitleInput").value.trim(),
                location: document.getElementById("modalLocation").value.trim(),
                salary: document.getElementById("modalSalary").value.trim(),
                tags: document.getElementById("modalTags").value.trim()
            };

            let postedJobs = JSON.parse(localStorage.getItem("customJobs")) || [];
            postedJobs.push(payload);
            localStorage.setItem("customJobs", JSON.stringify(postedJobs));
            
            jobModal.classList.remove("active");
            jobForm.reset();
            alert("🎉 New Job Circular Saved!");
            refreshDashboard();
        });
    }

    const logoutBtn = document.getElementById("recruiterLogoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.setItem('role', 'user'); // Debug testing convenience toggle
            window.location.href = "profile.html";
        });
    }

    refreshDashboard();
});