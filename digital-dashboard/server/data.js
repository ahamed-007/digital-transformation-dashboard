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
  labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
  All:       { actual: [52,55,58,60,63,66,68,71,74,76,78], target: [55,58,61,64,67,69,71,73,75,77,80] },
  Admin:     { actual: [74,76,78,80,82,84,86,88,89,91,92], target: [75,77,79,81,83,85,87,88,90,91,93] },
  Academics: { actual: [38,42,46,50,53,56,58,61,64,66,68], target: [45,48,51,54,57,60,62,64,66,68,70] },
  Finance:   { actual: [55,58,60,62,65,67,69,71,73,75,76], target: [58,61,63,65,67,69,71,73,75,76,78] },
  HR:        { actual: [32,35,37,40,43,45,47,49,51,53,54], target: [40,43,45,47,49,51,53,55,57,58,60] },
  Library:   { actual: [60,63,66,68,71,74,76,78,80,82,85], target: [62,65,67,70,72,74,76,78,80,82,85] },
  Labs:      { actual: [20,22,24,27,29,31,33,35,37,39,40], target: [30,33,36,38,40,42,44,46,48,50,52] },
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
    { name: "ERP System Rollout",       dept: "Admin",     status: "On Track",   progress: 72 },
    { name: "Paperless Admissions",     dept: "Admin",     status: "Complete",   progress: 100 },
    { name: "AI Attendance System",     dept: "Academics", status: "In Progress",progress: 55 },
    { name: "Digital Payment Gateway",  dept: "Finance",   status: "On Track",   progress: 68 },
    { name: "Smart Lab Automation",     dept: "Labs",      status: "Delayed",    progress: 28 },
    { name: "Faculty Upskilling LMS",   dept: "HR",        status: "Planning",   progress: 15 },
    { name: "Digital Library Catalog",  dept: "Library",   status: "Complete",   progress: 100 },
    { name: "Online Exam Portal",       dept: "Academics", status: "In Progress",progress: 60 },
  ],
  Admin: [
    { name: "ERP System Rollout",       dept: "Admin", status: "On Track",  progress: 72 },
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
