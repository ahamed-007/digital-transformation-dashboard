// ── Central data store (Backend) ─────────────────────────────────────────────

export const KPI_DATA = {
  All:       { adoption: 78, automated: 43, elearning: "12.4k", savings: "18.2L", adoptionDelta: 12, automatedDelta: 8 },
  Admin:     { adoption: 92, automated: 18, elearning: "3.1k",  savings: "6.4L",  adoptionDelta: 9,  automatedDelta: 3 },
  Academics: { adoption: 68, automated: 9,  elearning: "6.2k",  savings: "4.8L",  adoptionDelta: 15, automatedDelta: 2 },
  Finance:   { adoption: 76, automated: 7,  elearning: "0.9k",  savings: "3.6L",  adoptionDelta: 11, automatedDelta: 1 },
  HR:        { adoption: 54, automated: 4,  elearning: "1.2k",  savings: "1.8L",  adoptionDelta: 7,  automatedDelta: 1 },
  Library:   { adoption: 85, automated: 3,  elearning: "0.7k",  savings: "1.1L",  adoptionDelta: 18, automatedDelta: 1 },
  Labs:      { adoption: 40, automated: 2,  elearning: "0.3k",  savings: "0.5L",  adoptionDelta: 5,  automatedDelta: 0 },
};

export const TREND_DATA = {
  labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  All: { 
    actual: [52,55,58,60,63,66,68,71,74,76,78], 
    target: [55,58,61,64,67,69,71,73,75,77,80, 82,84,86,88,90,92],
    forecast: [null,null,null,null,null,null,null,null,null,null,78, 80,83,85,87,89,92] 
  },
  Admin: { 
    actual: [74,76,78,80,82,84,86,88,89,91,92], 
    target: [75,77,79,81,83,85,87,88,90,91,93, 94,95,96,97,98,99],
    forecast: [null,null,null,null,null,null,null,null,null,null,92, 93,94,95,96,97,98] 
  },
  Academics: { 
    actual: [38,42,46,50,53,56,58,61,64,66,68], 
    target: [45,48,51,54,57,60,62,64,66,68,70, 72,74,76,78,80,82],
    forecast: [null,null,null,null,null,null,null,null,null,null,68, 71,74,77,80,83,86] 
  },
  Finance: { 
    actual: [55,58,60,62,65,67,69,71,73,75,76], 
    target: [58,61,63,65,67,69,71,73,75,76,78, 80,81,83,84,86,88],
    forecast: [null,null,null,null,null,null,null,null,null,null,76, 78,80,82,83,85,87] 
  },
  HR: { 
    actual: [32,35,37,40,43,45,47,49,51,53,54], 
    target: [40,43,45,47,49,51,53,55,57,58,60, 62,64,66,68,70,72],
    forecast: [null,null,null,null,null,null,null,null,null,null,54, 57,60,63,66,69,72] 
  },
  Library: { 
    actual: [60,63,66,68,71,74,76,78,80,82,85], 
    target: [62,65,67,70,72,74,76,78,80,82,85, 87,89,91,93,95,97],
    forecast: [null,null,null,null,null,null,null,null,null,null,85, 88,91,93,95,97,99] 
  },
  Labs: { 
    actual: [20,22,24,27,29,31,33,35,37,39,40], 
    target: [30,33,36,38,40,42,44,46,48,50,52, 54,56,58,60,62,64],
    forecast: [null,null,null,null,null,null,null,null,null,null,40, 43,46,49,52,55,58] 
  },
};

export const DONUT_DATA = {
  All:       { labels: ["Process Automation","E-Learning","Infrastructure","Analytics","Student Services"], data: [28,22,20,16,14] },
  Admin:     { labels: ["ERP Systems","Document Mgmt","E-Procurement","HR Portal","Reporting"], data: [35,25,18,12,10] },
  Academics: { labels: ["E-Learning","Smart Attendance","Online Exams","LMS","Digital Resources"], data: [40,20,18,14,8] },
  Finance:   { labels: ["Digital Payments","ERP Finance","Audit Tools","Reporting","E-Billing"], data: [30,28,18,14,10] },
  HR:        { labels: ["Digital Payroll","Onboarding","Leave Mgmt","Appraisal","Recruitment"], data: [32,24,20,14,10] },
  Library:   { labels: ["Digital Catalog","E-Books","Self Checkout","RFID","Research Portal"], data: [30,28,18,14,10] },
  Labs:      { labels: ["Smart Sensors","Remote Access","Booking System","Asset Track","Safety"], data: [25,22,20,18,15] },
};

export const DEPT_PROGRESS = [
  { name: "Admin",     pct: 92, color: "#2563EB" },
  { name: "Library",   pct: 85, color: "#2563EB" },
  { name: "Finance",   pct: 76, color: "#16A34A" },
  { name: "Academics", pct: 68, color: "#16A34A" },
  { name: "HR",        pct: 54, color: "#D97706" },
  { name: "Labs",      pct: 40, color: "#DC2626" },
];

export const INITIATIVES = {
  All: [
    { name: "Paperless Admissions",     dept: "Admin",     status: "Complete",   progress: 100 },
    { name: "AI Attendance System",     dept: "Academics", status: "In Progress",progress: 55 },
    { name: "Digital Payment Gateway",  dept: "Finance",   status: "On Track",   progress: 68 },
    { name: "Smart Lab Automation",     dept: "Labs",      status: "Delayed",    progress: 28 },
    { name: "Faculty Upskilling LMS",   dept: "HR",        status: "Planning",   progress: 15 },
    { name: "Digital Library Catalog",  dept: "Library",   status: "Complete",   progress: 100 },
    { name: "Online Exam Portal",       dept: "Academics", status: "In Progress",progress: 60 },
  ],
  Admin: [
    { name: "Paperless Admissions",     dept: "Admin", status: "Complete",  progress: 100 },
    { name: "E-Procurement Portal",     dept: "Admin", status: "On Track",  progress: 80 },
    { name: "Document Management",      dept: "Admin", status: "Complete",  progress: 100 },
  ],
  Academics: [
    { name: "AI Attendance System",     dept: "Academics", status: "In Progress", progress: 55 },
    { name: "Online Exam Portal",       dept: "Academics", status: "In Progress", progress: 60 },
    { name: "LMS Rollout",              dept: "Academics", status: "On Track",    progress: 74 },
    { name: "Digital Curriculum",       dept: "Academics", status: "Planning",    progress: 20 },
  ],
  Finance: [
    { name: "Digital Payment Gateway",  dept: "Finance", status: "On Track",  progress: 68 },
    { name: "E-Billing System",         dept: "Finance", status: "Complete",  progress: 100 },
    { name: "Audit Automation",         dept: "Finance", status: "Planning",  progress: 10 },
  ],
  HR: [
    { name: "Faculty Upskilling LMS",   dept: "HR", status: "Planning",    progress: 15 },
    { name: "Digital Payroll",          dept: "HR", status: "Complete",    progress: 100 },
    { name: "Online Recruitment",       dept: "HR", status: "In Progress", progress: 48 },
  ],
  Library: [
    { name: "Digital Library Catalog",  dept: "Library", status: "Complete",    progress: 100 },
    { name: "E-Book Integration",       dept: "Library", status: "On Track",    progress: 85 },
    { name: "RFID Book Tracking",       dept: "Library", status: "In Progress", progress: 50 },
  ],
  Labs: [
    { name: "Smart Lab Automation",     dept: "Labs", status: "Delayed",    progress: 28 },
    { name: "Remote Lab Access",        dept: "Labs", status: "Planning",   progress: 12 },
    { name: "Asset Tracking System",    dept: "Labs", status: "In Progress",progress: 35 },
  ],
};

export const MATURITY_SCORES = {
  All:       { score: 3.1, label: "Defined",      color: "#2563EB", next: "Managed" },
  Admin:     { score: 4.2, label: "Managed",      color: "#16A34A", next: "Optimizing" },
  Academics: { score: 2.8, label: "Developing",   color: "#D97706", next: "Defined" },
  Finance:   { score: 3.4, label: "Defined",      color: "#2563EB", next: "Managed" },
  HR:        { score: 2.2, label: "Emerging",     color: "#DC2626", next: "Developing" },
  Library:   { score: 3.9, label: "Managed",      color: "#16A34A", next: "Optimizing" },
  Labs:      { score: 1.8, label: "Initial",      color: "#DC2626", next: "Emerging" },
};

export const STATUS_STYLES = {
  "Complete":    { bg: "#DCFCE7", color: "#15803D" },
  "On Track":    { bg: "#DBEAFE", color: "#1D4ED8" },
  "In Progress": { bg: "#FEF9C3", color: "#A16207" },
  "Delayed":     { bg: "#FEE2E2", color: "#B91C1C" },
  "Planning":    { bg: "#F3E8FF", color: "#7E22CE" },
};

export const INSIGHTS = {
  All: [
    "Overall adoption has reached 78%. Recommend transitioning to Advanced Analytics for student retention.",
    "Institutional cost savings (₹18.2L) can be reinvested in faculty cloud certifications.",
    "AI attendance rollout shows high ROI in Academics; consider institution-wide expansion."
  ],
  Admin: [
    "Digital adoption is at 92%. Focus on zero-paper compliance for all department audits.",
    "Automated HR workflows show 15% efficiency increase; scale this for Procurement.",
    "High maturity score (4.2). Ready for Blockchain-based degree verification."
  ],
  Academics: [
    "AI Attendance system is performing well (55% progress). Next step: Integration with LMS.",
    "Online Exam Portal is at 60%. Prioritize load-balancing for upcoming final semester exams.",
    "Student engagement data suggests adding AI-driven personalized feedback loops."
  ],
  Finance: [
    "Digital Payment Gateway (68% complete) is reducing manual reconciliation time by 22%.",
    "Estimated savings have exceeded targets. Consider upgrading cyber-insurance protocols.",
    "Budget allocation for Q3 should focus on migrating old payroll servers to Azure Cloud."
  ],
  HR: [
    "Faculty LMS upskilling is in 'Planning' phase. Suggest starting with early-adopter department.",
    "Digital recruitment module can reduce time-to-hire by 12 days; activate within next month.",
    "Focus on employee mental health analytics to improve long-term retention rates."
  ],
  Library: [
    "Digital Catalog is 100% complete. Success! Recommend adding AI research assistant features.",
    "Smart access logs show heavy peak usage. Consider expanding the high-speed Wi-Fi zone.",
    "Digital lending is up by 40%. Optimize remote access via multi-factor authentication."
  ],
  Labs: [
    "Lab automation is currently 'Delayed' (28%). Immediate intervention required for IoT hardware.",
    "Standardizing equipment status tracking could increase student throughput by 8%.",
    "Current maturity (1.8) is critical. Prioritize infrastructure upgrade in next budget cycle."
  ]
};

export const NOTIFICATIONS = [
  { id: 1, type: "success", title: "Maturity Milestone", message: "Admin department has reached 'Measured' maturity level (4.2).", time: "2 mins ago", unread: true },
  { id: 2, type: "warning", title: "Delayed Initiative", message: "Smart Lab Automation in 'Labs' is currently 15% behind target.", time: "45 mins ago", unread: true },
  { id: 3, type: "info", title: "System Update", message: "New AI Insights model (v2.4) has been deployed for Q3 analysis.", time: "2 hours ago", unread: false },
  { id: 4, type: "success", title: "Budget Optimization", message: "Digital Payment Gateway has saved ₹4.2L in transaction fees this month.", time: "5 hours ago", unread: false },
  { id: 5, type: "info", title: "Report Generated", message: "Dr. Sharma just generated the 'Transformation Overview' for Academics.", time: "1 day ago", unread: false },
];
