let uploadedResumeData = null;

document.addEventListener("DOMContentLoaded", () => {
    // 1. URL se Job ID read aur clean karo
    const urlParams = new URLSearchParams(window.location.search);
    let jobId = urlParams.get('id');

    if (!jobId) {
        alert("Job ID URL mein nahi mili!");
        window.location.href = "index.html";
        return;
    }

    // ID se '#' ya extra spaces ko clean karo
    jobId = jobId.replace('#', '').trim();

    // 2. Base database load karo (jobs-data.js se jobsDatabase uthao agar loaded h)
    const baseJobs = typeof jobsDatabase !== 'undefined' ? jobsDatabase : [];
    
    // 3. LocalStorage se custom jobs check karo
    let customJobs = [];
    try {
        const storedCustom = localStorage.getItem('customJobs');
        if (storedCustom) {
            customJobs = JSON.parse(storedCustom);
        }
    } catch (e) {
        console.error("Error reading customJobs from localStorage", e);
    }

    // Saare jobs ko ek master pool me daalo
    const allJobsPool = [...customJobs, ...baseJobs];

    // 🚨 BULLETPROOF MATCHING ENGINE
  // IS MATCHING ENGINE KO APNI JS MEIN UPDATE KAREIN
const currentJob = allJobsPool.find(job => {
    if (!job) return false;
    const targetId = String(jobId).trim().toLowerCase();
    const currentId = String(job.id).trim().toLowerCase();
    
    // Agar exact match ho ya ID ke andar ka number match ho jaye
    return currentId === targetId || currentId.includes(targetId) || targetId.includes(currentId);
});

    // 4. Data Display Rendering Engine
    if (currentJob) {
        // Database se proper keys match ki hain ab
        const finalRole = currentJob.role || currentJob.jobTitle || currentJob.title || "Job Profile";
        const finalCompany = currentJob.company || currentJob.companyName || "Organization";
        const finalLocation = currentJob.location || currentJob.jobLocation || "Remote";
        const finalSalary = currentJob.salary || currentJob.salaryRange || currentJob.package || "Not Disclosed";

        // HTML Elements ko values assign karo
        if(document.getElementById('jobRole')) document.getElementById('jobRole').innerText = finalRole;
        if(document.getElementById('jobCompany')) document.getElementById('jobCompany').innerText = finalCompany;
        if(document.getElementById('jobLocation')) document.getElementById('jobLocation').innerText = "📍 " + finalLocation;
        if(document.getElementById('jobSalary')) document.getElementById('jobSalary').innerText = finalSalary;

        // Company Logo Avatar (Pehle letter ka setup)
        const firstLetter = finalCompany.trim().charAt(0).toUpperCase();
        const avatarBox = document.getElementById('jobLogo');
        if (avatarBox) {
            avatarBox.innerText = firstLetter;
            avatarBox.style.backgroundColor = currentJob.color || "#2563eb"; 
            avatarBox.style.color = "#ffffff";
            avatarBox.style.display = "flex";
            avatarBox.style.justifyContent = "center";
            avatarBox.style.alignItems = "center";
            avatarBox.style.fontWeight = "bold";
        }

        // 🚨 SKILLS RENDER FIX
        const skillsContainer = document.getElementById('jobSkillsContainer');
        if (skillsContainer) {
            skillsContainer.innerHTML = "";
            
            // Database tags primary target handle karo
            let tags = currentJob.tags || currentJob.skillsTags || currentJob.skills || ["Frontend", "Developer"];
            
            // Agar tags kisi wajah se string format me hon toh use array banao
            if (typeof tags === 'string') {
                tags = tags.split(',').map(s => s.trim());
            }
            
            if (Array.isArray(tags) && tags.length > 0) {
                tags.forEach(skill => {
                    if (skill) {
                        skillsContainer.innerHTML += `<span class="skill-tag">${skill}</span>`;
                    }
                });
            } else {
                skillsContainer.innerHTML = `<span class="skill-tag">General Skills</span>`;
            }
        }
    } else {
        console.log("Scanned Database Pool:", allJobsPool);
        alert("❌ Database sync issue!\The system cannot find data for Job Id (" +jobid + ").\No\Solution: Go to your dashboard and add this job again and click!");
        window.location.href = "index.html";
        return;
    }

    // ==========================================
    // == APPLICATION FORM MODAL LOGIC ENGINE ==
    // ==========================================
    const applyBtn = document.getElementById("applyBtn");
    const modal = document.getElementById("applicationModal");
    const cancelBtn = document.getElementById("cancelModalBtn");

    if (applyBtn) {
        applyBtn.onclick = function(e) {
            e.preventDefault();
            
            const loggedInUser = localStorage.getItem('username');
            const userRole = localStorage.getItem('role');

            // 🔒 Security Access Check
            if (!loggedInUser || userRole !== 'seeker') {
                alert("🔒 Access Denied! Please login to your Job Seeker account to apply.");
                window.location.href = "login.html";
                return;
            }

            const displayTitle = currentJob.role || currentJob.jobTitle || currentJob.title || "Job";
            const displayComp = currentJob.company || currentJob.companyName || "Company";
            
            const modalDetails = document.getElementById('modalJobDetails');
            const modalNameInput = document.getElementById('appFullName');
            
            if (modalDetails) modalDetails.innerText = `Applying For: ${displayTitle} - ${displayComp}`;
            if (modalNameInput) modalNameInput.value = loggedInUser;
            
            if (modal) {
                modal.style.display = "flex";
            } else {
                alert("Modal HTML Element (#applicationModal) nahi mila!");
            }
        };
    }

    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => closeApplicationModalCustom());
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) closeApplicationModalCustom();
    });

    // FILE UPLOAD ENGINE MECHANICS
    const dropZoneBox = document.getElementById('dropZoneBox');
    const hiddenInput = document.getElementById('appResumeFile');

    if (dropZoneBox && hiddenInput) {
        dropZoneBox.onclick = function(e) {
            if (e.target !== hiddenInput) {
                hiddenInput.click();
            }
        };
    }

    if (hiddenInput) {
        hiddenInput.addEventListener("change", function() {
            const containerText = document.getElementById('uploadContainerText');
            if (this.files && this.files[0]) {
                const fileObj = this.files[0];
                if (fileObj.size > 5 * 1024 * 1024) {
                    alert("❌ File size is too big! Max 5MB allowed.");
                    this.value = "";
                    return;
                }
                if (containerText) containerText.innerHTML = `<b style="color: #10b981;">✅ Selected: ${fileObj.name}</b>`;
                uploadedResumeData = { fileName: fileObj.name };
            }
        });
    }

    // FORM SUBMISSION STORAGE SYSTEM (FIXED FOR TABLE DYNAMIC TRACKING)
    const appForm = document.getElementById("realApplyForm");
    if (appForm) {
        appForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!uploadedResumeData) {
                alert("❌ Please upload your resume!");
                return;
            }

            const emailValue = document.getElementById("appEmail").value;
            const contactValue = document.getElementById("appContact").value;
            const expValue = document.getElementById("appExperience").value;
            const seekerName = document.getElementById("appFullName").value;

            const finalRole = currentJob.role || currentJob.jobTitle || currentJob.title || "Developer";
            const finalCompany = currentJob.company || currentJob.companyName || "Company";

            // Unified Object format for Profile UI Tracking
            const consolidatedApplication = {
                id: Date.now(),
                username: seekerName,          // Profile key mapping update
                applicantName: seekerName,
                applicantEmail: emailValue,
                applicantContact: contactValue,
                email: emailValue,              // Alternate fields redundancy standard clear
                phone: contactValue,
                experience: expValue,
                role: finalRole,
                company: finalCompany,
                resumeName: uploadedResumeData.fileName,
                date: new Date().toLocaleDateString(),
                status: "PENDING"              // Profile standard reading condition
            };

            // 1. Save globally inside `applicationsDatabase`
            let appDb = JSON.parse(localStorage.getItem('applicationsDatabase')) || [];
            appDb.unshift(consolidatedApplication);
            localStorage.setItem('applicationsDatabase', JSON.stringify(appDb));

            // 2. Save inside backup key `myApplications`
            let myApplications = JSON.parse(localStorage.getItem('myApplications')) || [];
            myApplications.unshift(consolidatedApplication);
            localStorage.setItem('myApplications', JSON.stringify(myApplications));

            alert(`🎉 Congratulations ${seekerName}!\nApplication submitted successfully.`);
            appForm.reset();
            closeApplicationModalCustom();

            // Instant Refresh aur Redirection table state active dikhane ke liye
            window.location.href = "profile.html";
        });
    }

    function closeApplicationModalCustom() {
        if (modal) modal.style.display = "none";
        if (hiddenInput) hiddenInput.value = "";
        const containerText = document.getElementById('uploadContainerText');
        if (containerText) containerText.innerText = "Click to choose file or drag here";
        uploadedResumeData = null;
    }
});