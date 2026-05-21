const jobsDatabase = [
    { id: 1, company: "Google", title: "Frontend Developer", location: "Bangalore, India", salary: "₹18L - ₹28L", tags: ["React", "TypeScript", "Tailwind"] },
    { id: 2, company: "Microsoft", title: "Backend Engineer", location: "Hyderabad, India", salary: "₹22L - ₹35L", tags: ["C#", "Azure", "SQL"] },
    { id: 3, company: "Amazon", title: "Full Stack Developer", location: "Chennai, India", salary: "₹20L - ₹32L", tags: ["Node.js", "React", "AWS"] },
    { id: 4, company: "Zomato", title: "UI/UX Designer", location: "Gurugram, India", salary: "12L - 18L", tags: ["Figma", "Prototyping", "UI Design"] },
    { id: 5, company: "Swiggy", title: "React Native Developer", location: "Remote", salary: "14L - 22L", tags: ["React Native", "JavaScript", "iOS"] },
    { id: 6, company: "Flipkart", title: "DevOps Engineer", location: "Bangalore, India", salary: "16L - 26L", tags: ["Docker", "Kubernetes", "CI/CD"] },
    { id: 7, company: "Paytm", title: "Data Analyst", location: "Noida, India", salary: "8L - 14L", tags: ["Python", "SQL", "Tableau"] },
    { id: 8, company: "Cred", title: "Product Designer", location: "Bangalore, India", salary: "18L - 30L", tags: ["Figma", "UX Research", "Motion UI"] },
    { id: 9, company: "Tata Consultancy Services (TCS)", title: "System Engineer", location: "Pune, India", salary: "4.5L - 7L", tags: ["Java", "Spring Boot", "SQL"] },
    { id: 10, company: "Infosys", title: "Angular Developer", location: "Mysore, India", salary: "5L - 9L", tags: ["Angular", "TypeScript", "CSS3"] },
    { id: 11, company: "Wipro", title: "Cloud Architect", location: "Kochi, India", salary: "15L - 25L", tags: ["AWS", "Cloud Security", "Terraform"] },
    { id: 12, company: "HCLTech", title: "Cyber Security Analyst", location: "Noida, India", salary: "9L - 16L", tags: ["Ethical Hacking", "Linux", "SIEM"] },
    { id: 13, company: "Razorpay", title: "Backend Specialist", location: "Bangalore, India", salary: "18L - 28L", tags: ["GoLang", "MySQL", "Redis"] },
    { id: 14, company: "Jio Platforms", title: "5G Network Engineer", location: "Mumbai, India", salary: "12L - 20L", tags: ["5G Protocols", "Python", "Linux"] },
    { id: 15, company: "Airtel Digital", title: "Android Specialist", location: "Gurugram, India", salary: "15L - 24L", tags: ["Kotlin", "Android SDK", "Java"] },
    { id: 16, company: "Ola Electric", title: "Embedded Systems Engineer", location: "Bangalore, India", salary: "14L - 22L", tags: ["C++", "IoT", "Microcontrollers"] },
    { id: 17, company: "Uber India", title: "Staff Software Engineer", location: "Hyderabad, India", salary: "35L - 55L", tags: ["System Design", "Java", "GoLang"] },
    { id: 18, company: "Netflix India", title: "Content UI Engineer", location: "Mumbai, India (Hybrid)", salary: "25L - 40L", tags: ["React", "GraphQL", "Web Performance"] },
    { id: 19, company: "Adobe", title: "Technical Content Writer", location: "Noida, India", salary: "10L - 15L", tags: ["Technical Writing", "SEO", "Markdown"] },
    { id: 20, company: "Tech Mahindra", title: "Salesforce Developer", location: "Kolkata, India", salary: "7L - 12L", tags: ["Apex", "Visualforce", "Salesforce Admin"] },
    { id: 21, company: "Cognizant", title: "QA Automation Tester", location: "Chennai, India", salary: "6L - 11L", tags: ["Selenium", "Java", "Cucumber"] },
    { id: 22, company: "Capgemini", title: "Data Scientist", location: "Mumbai, India", salary: "11L - 19L", tags: ["Machine Learning", "Python", "R"] },
    { id: 23, company: "Accenture", title: "AI Prompt Engineer", location: "Remote", salary: "13L - 22L", tags: ["Generative AI", "LLMs", "NLP"] },
    { id: 24, company: "Groww", title: "Frontend Intern", location: "Bangalore, India", salary: "35k - 50k/Month", tags: ["React", "JavaScript", "HTML5"] },
    { id: 25, company: "Zerodha", title: "Go Backend Dev", location: "Remote", salary: "20L - 35L", tags: ["GoLang", "PostgreSQL", "Docker"] },
    { id: 26, company: "Upstox", title: "Mobile UI Designer", location: "Mumbai, India", salary: "10L - 16L", tags: ["Figma", "Wireframing", "Mobile UX"] },
    { id: 27, company: "Nykaa", title: "E-Commerce Manager", location: "Gurugram, India", salary: "8L - 14L", tags: ["Marketing", "Analytics", "SEO"] },
    { id: 28, company: "Myntra", title: "Fashion Designer Tech", location: "Bangalore, India", salary: "12L - 18L", tags: ["3D Fashion", "Photoshop", "Illustrator"] },
    { id: 29, company: "BookMyShow", title: "PHP Laravel Engineer", location: "Mumbai, India", salary: "8L - 13L", tags: ["Laravel", "PHP", "Vue.js"] },
    { id: 30, company: "Urban Company", title: "Full Stack Engineer", location: "Gurugram, India", salary: "16L - 25L", tags: ["Node.js", "React", "MongoDB"] },
    { id: 31, company: "Blinkit", title: "Logistics Software Engineer", location: "Delhi, India", salary: "14L - 23L", tags: ["Node.js", "Redis", "GeoJSON"] },
    { id: 32, company: "Zepto", title: "React Web Developer", location: "Mumbai, India", salary: "12L - 20L", tags: ["React", "Next.js", "Redux"] },
    { id: 33, company: "InMobi", title: "AdTech Specialist", location: "Bangalore, India", salary: "15L - 24L", tags: ["Java", "Scala", "Big Data"] },
    { id: 34, company: "Postman", title: "Developer Advocate", location: "Remote", salary: "22L - 35L", tags: ["APIs", "Technical Writing", "Public Speaking"] },
    { id: 35, company: "BrowserStack", title: "Solutions Engineer", location: "Mumbai, India", salary: "14L - 22L", tags: ["JavaScript", "CI/CD", "Technical Support"] },
    { id: 36, company: "Lenskart", title: "Shopify Specialist", location: "Delhi NCR", salary: "7L - 12L", tags: ["Shopify Liquid", "HTML", "CSS"] },
    { id: 37, company: "Boat Lifestyle", title: "Digital Marketing Head", location: "Mumbai, India", salary: "15L - 22L", tags: ["Social Media", "SEO", "Google Ads"] },
    { id: 38, company: "Mamaearth", title: "SEO Copywriter", location: "Gurugram, India", salary: "5L - 8L", tags: ["Content Writing", "SEO", "Blogging"] },
    { id: 39, company: "PhysicsWallah", title: "Video Editor & Animator", location: "Noida, India", salary: "6L - 10L", tags: ["After Effects", "Premiere Pro", "2D Animation"] },
    { id: 40, company: "Unacademy", title: "SRE (Site Reliability)", location: "Bangalore, India", salary: "18L - 28L", tags: ["Linux", "Python", "Kubernetes"] },
    { id: 41, company: "Byju's", title: "Academic Product Designer", location: "Bangalore, India", salary: "9L - 15L", tags: ["Figma", "Illustration", "UX Design"] },
    { id: 42, company: "Vedantu", title: "NodeJS Backend Intern", location: "Remote", salary: "25k - 35k/Month", tags: ["Node.js", "Express", "MongoDB"] },
    { id: 43, company: "CoinSwitch", title: "Blockchain Developer", location: "Bangalore, India", salary: "20L - 35L", tags: ["Solidity", "Ethereum", "Smart Contracts"] },
    { id: 44, company: "CoinDCX", title: "Security Engineer", location: "Mumbai, India", salary: "16L - 26L", tags: ["Cryptography", "Pentesting", "Network Security"] },
    { id: 45, company: "PhonePe", title: "Database Administrator", location: "Pune, India", salary: "14L - 24L", tags: ["PostgreSQL", "Oracle", "Linux"] },
    { id: 46, company: "BharatPe", title: "Django Web Developer", location: "Delhi, India", salary: "13L - 21L", tags: ["Python", "Django", "REST API"] },
    { id: 47, company: "Dell India", title: "Hardware Support Specialist", location: "Bangalore, India", salary: "6L - 10L", tags: ["Hardware", "Networking", "Troubleshooting"] },
    { id: 48, company: "HP India", title: "Linux Administrator", location: "Chennai, India", salary: "8L - 14L", tags: ["RedHat", "Bash Scripting", "DevOps"] },
    { id: 49, company: "Intel India", title: "AI Firmware Developer", location: "Hyderabad, India", salary: "24L - 40L", tags: ["C++", "Python", "AI Model Optimisation"] },
    { id: 50, company: "Epic Games India", title: "Unreal Engine Game Dev", location: "Pune, India", salary: "18L - 32L", tags: ["Unreal Engine", "C++", "3D Math"] }
];

// LocalStorage check for Custom Recruiter Jobs sync
if (!localStorage.getItem("customJobs")) {
    localStorage.setItem("customJobs", JSON.stringify([]));
}

// Default Applications Database Setup
if (!localStorage.getItem("applicationsDatabase")) {
    localStorage.setItem("applicationsDatabase", JSON.stringify([
        { username: "sinil", email: "sinil@testmail.com", phone: "+91 9876543210", company: "Google Inc.", role: "Frontend Developer", resume: "#", status: "PENDING" }
    ]));
}

// Global Auth Bypass Testing Session
if (!localStorage.getItem("role")) {
    localStorage.setItem("role", "recruiter");
    localStorage.setItem("username", "home");
}