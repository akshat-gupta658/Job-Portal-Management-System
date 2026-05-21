// 🚀 RENDER CORE PIPELINE (ADMIN DASHBOARD METRICS)
function renderDashboardPanels() {
    const manageJobsTableBody = document.getElementById("manageJobsTableBody");
    const applicationsTableBody = document.getElementById("applicationsTableBody");
    
    const statTotalJobs = document.getElementById("statTotalJobs");
    const statPendingApps = document.getElementById("statPendingApps");
    const statApprovedApps = document.getElementById("statApprovedApps");
    
    const allJobs = typeof getAllJobs === 'function' ? getAllJobs() : [];
    const apps = JSON.parse(localStorage.getItem("applicationsDatabase")) || [];

    // Analytics Counter Mapping
    if (statTotalJobs) statTotalJobs.innerText = allJobs.length;
    if (statPendingApps) statPendingApps.innerText = apps.filter(a => a.status.toUpperCase() === "PENDING").length;
    if (statApprovedApps) statApprovedApps.innerText = apps.filter(a => a.status.toUpperCase() === "APPROVED").length;

    // 🛠️ RENDER TABLE 1: Manage Live Jobs
    if (manageJobsTableBody) {
        manageJobsTableBody.innerHTML = "";
        if (allJobs.length === 0) {
            manageJobsTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#94a3b8; padding:30px; font-weight:600;">No live jobs posted.</td></tr>`;
        } else {
            allJobs.forEach((job, index) => {
                const tagsHTML = job.tags ? job.tags.map(t => `<span class="dashboard-tag" style="background:#f1f5f9; color:#475569; padding:2px 6px; border-radius:4px; font-size:11px; font-weight:600; margin-right:4px;">${t}</span>`).join('') : 'None';
                
                manageJobsTableBody.innerHTML += `
                    <tr>
                        <td style="padding:14px 16px;"><strong>${job.company || "Company"}</strong></td>
                        <td style="padding:14px 16px;">${job.role || "Job Profile"}</td>
                        <td style="padding:14px 16px;">📍 ${job.location || "Remote"}</td>
                        <td style="padding:14px 16px; font-weight:600; color:#10b981;">${job.salary || "Not Disclosed"}</td>
                        <td style="padding:14px 16px;">${tagsHTML}</td>
                        <td style="padding:14px 16px;">
                            <div style="display:flex; gap:8px;">
                                <button class="btn-action btn-edit" style="background:#e0f2fe; color:#0369a1; padding:6px 12px; border:none; border-radius:6px; font-weight:700; cursor:pointer;" onclick="openEditJobModal(${index})">✏️ Edit</button>
                                <button class="btn-action btn-delete" style="background:#fee2e2; color:#dc2626; padding:6px 12px; border:none; border-radius:6px; font-weight:700; cursor:pointer;" onclick="deleteJobEngine(${index})">🗑️ Delete</button>
                            </div>
                        </td>
                    </tr>`;
            });
        }
    }

    // 📥 RENDER TABLE 2: Applications Queue
    if (applicationsTableBody) {
        applicationsTableBody.innerHTML = "";
        if (apps.length === 0) {
            applicationsTableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:#94a3b8; padding:30px; font-weight:600;">No applications in queue.</td></tr>`;
        } else {
            apps.forEach((app, index) => {
                let actionButtons = "";
                let badgeStyle = "";
                const currentStatus = (app.status || "PENDING").toUpperCase();

                if (currentStatus === "PENDING") {
                    badgeStyle = "background:#fef3c7; color:#d97706;";
                    actionButtons = `
                        <button class="btn-action btn-approve" style="background:#d1fae5; color:#065f46; padding:6px 12px; border:none; border-radius:6px; font-weight:700; cursor:pointer; margin-right:4px;" onclick="updateAppStatus(${index}, 'APPROVED')">Approve</button>
                        <button class="btn-action btn-reject" style="background:#ffedd5; color:#c2410c; padding:6px 12px; border:none; border-radius:6px; font-weight:700; cursor:pointer; margin-right:4px;" onclick="updateAppStatus(${index}, 'REJECTED')">Reject</button>
                    `;
                } else if (currentStatus === "APPROVED") {
                    badgeStyle = "background:#d1fae5; color:#065f46;";
                    actionButtons = `<span style="color:#10b981; font-weight:700; margin-right:8px;">Approved ✅</span>`;
                } else if (currentStatus === "REJECTED") {
                    badgeStyle = "background:#fee2e2; color:#dc2626;";
                    actionButtons = `<span style="color:#ef4444; font-weight:700; margin-right:8px;">Rejected ❌</span>`;
                }

                actionButtons += `<button class="btn-action btn-delete" style="background:#fee2e2; color:#dc2626; padding:6px 10px; border:none; border-radius:6px; cursor:pointer;" onclick="deleteApplicationEngine(${index})">🗑️ Delete</button>`;

                applicationsTableBody.innerHTML += `
                    <tr>
                        <td style="padding:14px 16px;">✉️ <strong>${app.email}</strong></td>
                        <td style="padding:14px 16px;">📞 ${app.phone || 'N/A'}</td>
                        <td style="padding:14px 16px;"><strong>${app.company || "Company"}</strong></td>
                        <td style="padding:14px 16px;">${app.role || "Developer"}</td>
                        <td style="padding:14px 16px; color:#2563eb; text-decoration:underline; cursor:pointer;">📄 ${app.resumeName || 'No File'}</td>
                        <td style="padding:14px 16px;">${app.date || 'N/A'}</td>
                        <td style="padding:14px 16px;"><span class="status-badge" style="padding:5px 12px; border-radius:20px; font-size:12px; font-weight:700; ${badgeStyle}">${currentStatus}</span></td>
                        <td style="padding:14px 16px;"><div style="display:flex; align-items:center; gap:4px;">${actionButtons}</div></td>
                    </tr>`;
            });
        }
    }
}

// ⚡ ADMIN LOGIC ENGINES
function updateAppStatus(index, newStatus) {
    let apps = JSON.parse(localStorage.getItem("applicationsDatabase")) || [];
    if (apps[index]) {
        apps[index].status = newStatus;
        localStorage.setItem("applicationsDatabase", JSON.stringify(apps));
        renderDashboardPanels();
    }
}

function deleteApplicationEngine(index) {
    if (confirm("Do you want to permanently delete this application entry?")) {
        let apps = JSON.parse(localStorage.getItem("applicationsDatabase")) || [];
        apps.splice(index, 1);
        localStorage.setItem("applicationsDatabase", JSON.stringify(apps));
        renderDashboardPanels();
    }
}

function deleteJobEngine(combinedIndex) {
    if (confirm("Do you want to permanently remove this job post?")) {
        const customJobs = JSON.parse(localStorage.getItem('customJobs')) || [];
        
        if (combinedIndex < customJobs.length) {
            // Custom job ko array se directly splice karke remove karo
            customJobs.splice(combinedIndex, 1);
            localStorage.setItem('customJobs', JSON.stringify(customJobs));
        } else {
            // Static jobs persistent removal layer logic setup
            const allJobs = typeof getAllJobs === 'function' ? getAllJobs() : [];
            const targetedJob = allJobs[combinedIndex];
            
            if (targetedJob) {
                let deletedIds = JSON.parse(localStorage.getItem('deletedStaticJobs')) || [];
                deletedIds.push(String(targetedJob.id));
                localStorage.setItem('deletedStaticJobs', JSON.stringify(deletedIds));
            }
        }
        alert("🗑️ Job Post cleanly remove ho gayi!");
        renderDashboardPanels();
        renderJobCardsHomepage();
    }
}

function openEditJobModal(combinedIndex) {
    const allJobs = typeof getAllJobs === 'function' ? getAllJobs() : [];
    const job = allJobs[combinedIndex];

    if (!job) return;

    document.getElementById("jobIndexId").value = combinedIndex;
    document.getElementById("modalCompany").value = job.company || "";
    document.getElementById("modalLogoText").value = job.logoText || (job.company ? job.company.charAt(0) : "");
    document.getElementById("modalLogoBg").value = job.color || "#10b981";
    document.getElementById("modalTitleInput").value = job.role || "";
    document.getElementById("modalLocation").value = job.location || "";
    document.getElementById("modalSalary").value = job.salary || "";
    document.getElementById("modalTags").value = job.tags ? job.tags.join(', ') : '';

    document.getElementById("modalTitle").innerText = "✏️ Edit Posted Circular";
    document.getElementById("jobModal").classList.add("active");
}

// Global Core Sync Connector Modification over jobs-data file architecture
function getAllJobs() {
    const baseJobs = typeof jobsDatabase !== 'undefined' ? jobsDatabase : [];
    const customJobs = JSON.parse(localStorage.getItem('customJobs')) || [];
    const deletedStaticIds = JSON.parse(localStorage.getItem('deletedStaticJobs')) || [];
    const updatedStaticJobs = JSON.parse(localStorage.getItem('updatedStaticJobs')) || [];

    // Filter out deleted static entries
    let filteredBase = baseJobs.filter(job => !deletedStaticIds.includes(String(job.id)));

    // Map updated fields inside static data components
    filteredBase = filteredBase.map(job => {
        const updatedVersion = updatedStaticJobs.find(u => String(u.id) === String(job.id));
        return updatedVersion ? updatedVersion : job;
    });

    return [...customJobs, ...filteredBase];
}

function setupDashboardFormHandlers() {
    const jobForm = document.getElementById("jobForm");
    if (!jobForm) return;

    jobForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const indexId = document.getElementById("jobIndexId").value;
        const company = document.getElementById("modalCompany").value.trim();
        const logoText = document.getElementById("modalLogoText").value.toUpperCase().trim();
        const color = document.getElementById("modalLogoBg").value;
        const role = document.getElementById("modalTitleInput").value.trim();
        const location = document.getElementById("modalLocation").value.trim();
        const salary = document.getElementById("modalSalary").value.trim();
        const tagsInput = document.getElementById("modalTags").value;

        const tagsArray = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== "");
        let customJobs = JSON.parse(localStorage.getItem('customJobs')) || [];

        if (indexId === "") {
            // Nayi Custom Job object create karo
            const jobPayload = { id: "custom-" + Date.now(), role, company, location, salary, tags: tagsArray, color, logoText };
            customJobs.unshift(jobPayload);
            localStorage.setItem('customJobs', JSON.stringify(customJobs));
            alert("🎉 New job circular has been published successfully.!");
        } else {
            const idx = parseInt(indexId);
            if (idx < customJobs.length) {
                // Existing custom job update pipeline
                customJobs[idx] = { id: customJobs[idx].id, role, company, location, salary, tags: tagsArray, color, logoText };
                localStorage.setItem('customJobs', JSON.stringify(customJobs));
            } else {
                // Static core job update tracking engine without crash
                const allJobs = getAllJobs();
                const staticJobToModify = allJobs[idx];
                if (staticJobToModify) {
                    let updatedStaticJobs = JSON.parse(localStorage.getItem('updatedStaticJobs')) || [];
                    // Purana edit check array cleanup trigger array filter layer
                    updatedStaticJobs = updatedStaticJobs.filter(u => String(u.id) !== String(staticJobToModify.id));
                    
                    updatedStaticJobs.push({
                        id: staticJobToModify.id, role, company, location, salary, tags: tagsArray, color, logoText
                    });
                    localStorage.setItem('updatedStaticJobs', JSON.stringify(updatedStaticJobs));
                }
            }
            alert("✏️ Job Circular Successfully Update ho gayi!");
        }

        document.getElementById("jobModal").classList.remove("active");
        renderDashboardPanels();
        renderJobCardsHomepage();
    });
}

// 🚀 HOMEPAGE CARD RENDERER ENGINE
function renderJobCardsHomepage() {
    const jobCardsContainer = document.getElementById("jobCardsContainer") || 
                              document.querySelector(".featured-jobs-grid") || 
                              document.querySelector(".jobs-container");
    
    if (!jobCardsContainer) return;
    jobCardsContainer.innerHTML = "";

    const allAvailableJobs = getAllJobs();

    if (allAvailableJobs.length === 0) {
        jobCardsContainer.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:#64748b; font-weight:600;">No live openings available.</div>`;
        return;
    }

    allAvailableJobs.forEach((job) => {
        const tagsHTML = job.tags ? job.tags.map(t => `<span class="job-tag" style="background:#f1f5f9; color:#475569; padding:4px 10px; border-radius:6px; font-size:12px; font-weight:600; margin-right:6px; display:inline-block; margin-top:4px;">${t}</span>`).join('') : '';
        const logoChar = job.logoText || (job.company ? job.company.charAt(0) : "J");

        jobCardsContainer.innerHTML += `
            <div class="job-card" style="background:#ffffff; border-radius:16px; padding:24px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05); display:flex; flex-direction:column; justify-content:space-between; border:1px solid #e2e8f0; min-height:230px;">
                <div>
                    <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
                        <div style="background:${job.color || '#2563eb'}; color:#ffffff; width:45px; height:45px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:18px;">
                            ${logoChar}
                        </div>
                        <div>
                            <h3 style="font-size:18px; font-weight:700; color:#0f172a; margin:0; line-height:1.2;">${job.role || "Job Title"}</h3>
                            <p style="font-size:14px; color:#64748b; margin:4px 0 0 0; font-weight:500;">${job.company || "Organization"} • 📍 ${job.location || "Remote"}</p>
                        </div>
                    </div>
                    <div style="margin-bottom:20px;">
                        ${tagsHTML}
                    </div>
                </div>
                <div style="display:flex; align-items:center; justify-content:space-between; border-top:1px solid #f1f5f9; padding-top:16px; margin-top:auto;">
                    <span style="font-size:16px; font-weight:700; color:#10b981;">${job.salary || "Not Disclosed"}</span>
                    <a href="job-details.html?id=${job.id}" class="btn-apply" style="background:#2563eb; color:#ffffff; text-decoration:none; padding:8px 16px; border-radius:8px; font-size:14px; font-weight:700; text-align:center;">Apply Now ✨</a>
                </div>
            </div>`;
    });
}

// Bootstrapping
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("manageJobsTableBody") || document.getElementById("applicationsTableBody")) {
        renderDashboardPanels();
        setupDashboardFormHandlers();
    }
    renderJobCardsHomepage();
});