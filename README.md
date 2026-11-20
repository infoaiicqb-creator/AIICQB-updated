# AICQB – AI International Certification & Qualification Board
### Complete Multi-Industry International Certification Platform

![AICQB Brand Logo](client/public/aicqb-logo.png)

A complete, production-ready, multi-industry professional certification platform developed for **AICQB – AI International Certification & Qualification Board**.

---

## 1. Brand Identity & Visual Design System
- **Brand Name:** AICQB (AI International Certification & Qualification Board)
- **Sub-slogan:** Global Certifications | Qualifications | Skill Standards
- **Navy Blue:** `#10264B` (Primary corporate header, sidebars, typography)
- **Orange:** `#F47716` (Accents, active navigation indicators, CTAs, highlight badges)
- **White:** `#FFFFFF` (Cards, badges, containers)
- **Light Background:** `#F7F9FC` (Body background)
- **Dark Navy Typography:** `#0B1B36`

---

## 2. Platform Architecture Overview

```
AICQB/
├── client/                     # React + TypeScript + Vite + Tailwind CSS
│   ├── public/                 # Favicon, official logo assets
│   ├── src/
│   │   ├── assets/             # Brand logos and iconography
│   │   ├── components/         # Reusable layouts, Navbar, Footer, Modals
│   │   │   ├── Navbar.tsx      # Public Navigation
│   │   │   ├── Footer.tsx      # Public Footer with legal disclaimers
│   │   │   ├── CandidateLayout.tsx # Candidate Dashboard Layout (Image 2)
│   │   │   ├── AdminLayout.tsx     # Super Admin 13-Module Layout (Image 5)
│   │   │   ├── CertificateModal.tsx # Professional Certificate replica (Image 4)
│   │   │   ├── RazorpayModal.tsx    # Razorpay Checkout & verification
│   │   │   └── ExamEngineModal.tsx  # Timed proctored online exam engine
│   │   ├── context/
│   │   │   └── AuthContext.tsx # Centralized authentication & user state
│   │   ├── pages/
│   │   │   ├── public/         # 17 Public Website Pages (Image 3)
│   │   │   ├── candidate/      # 10 Candidate Portal Pages (Image 2)
│   │   │   └── admin/          # 13 Super Admin Modules (Image 5)
│   │   ├── services/
│   │   │   └── api.ts          # Unified REST API client with JWT
│   │   └── types/              # Comprehensive TypeScript interfaces
│   └── dist/                   # Production build ready
│
├── server/                     # Node.js + Express REST API Backend
│   ├── src/
│   │   ├── config/             # DB abstraction, Razorpay SDK config
│   │   ├── controllers/        # Auth, Certifications, Exams, Payments, etc.
│   │   ├── middleware/         # RBAC, audit logging, JWT authentication
│   │   ├── routes/             # REST endpoints
│   │   ├── services/           # Certificate generator with QR code
│   │   ├── scripts/            # Database seed script
│   │   └── index.js            # Express server (Serves API & Frontend)
│   └── .env                    # Configuration & secrets template
└── README.md
```

---

## 3. Scope of Implementation

### Public Website (17 Pages)
1. **Home:** Hero banner, stats, featured multi-domain certifications, verification shortcut, and partner network.
2. **About AICQB:** Mission, Vision, Values, and independent credentialing authority.
3. **Certification Catalogue:** Multi-domain search, category pills (AI & Data, Testing, Cloud, Security, etc.), level filters.
4. **Certification Details:** Overview, module syllabus, exam specifications, prerequisites, and dynamic enrollment trigger.
5. **Examinations:** 4-step certification lifecycle (Register, Enroll, Take Exam, Get Certified) and live schedule table.
6. **Learning Hub:** LMS curriculum preview, course modules, eBooks, practice mock tests.
7. **Certificate Verification:** Public verification desk validating Certificate IDs against official database records.
8. **Pricing & Plans:** Basic (₹2,999), Professional (₹4,500 Most Popular), and Advance (₹5,999).
9. **Events & Webinars:** Live webinar calendar, speaker schedules, and free registration.
10. **Training Partners:** Authorized Training Partner (ATP) network and onboarding application.
11. **Resources:** Candidate study handbooks, sample problem sets, syllabus PDFs, and cheatsheets.
12. **Careers:** Culture values, benefits, and open job roles at AICQB.
13. **Help Center & Support:** Interactive FAQs, ticketing links, and contact channels.
14. **Blog & Insights:** Technical articles on modern AI, Playwright automation benchmarks, and QA paths.
15. **Contact Us:** Office headquarters, candidate helpline, and interactive messaging form.
16. **Login:** Branded credentials screen with show/hide password, remember me, and role-based redirect.
17. **Sign Up:** Candidate registration generating unique Candidate ID (`AICQB-1004587`) and initializing candidate profile.

---

### Candidate Portal (10 Pages)
1. **Dashboard (Home):** Real metric cards (Active Certifications, Upcoming Exams, Certificates Earned, Courses in Progress, Reward Points), Circular Progress % widget, Upcoming Exam schedule, and Certificate previews.
2. **My Profile:** Personal information, Candidate ID, verification badge, address, about me, and live profile editor.
3. **Certifications:** Browse and enroll in certifications with filter tabs (All, Enrolled, Completed).
4. **My Exams:** Tabs for Upcoming, Completed, and All exams. Includes Exam Guidelines modal and direct launch to the online Exam Engine.
5. **My Learning:** Course cards with progress indicators, syllabus access, and practice exams.
6. **My Certificates:** Earned certificates with unique IDs, issue dates, valid till dates, PDF download, and public share links.
7. **Certificate Verification:** Candidate portal internal verification check against central database records.
8. **Payments:** Transaction history table (Txn ID, Description, Amount, Status, Invoice download) and total spend summary.
9. **Support:** My Support Requests table with Ticket ID, status badges (Resolved, In Progress), and Raise Ticket modal.
10. **Settings:** Account settings, Change Password, Notification preferences, Privacy & Security, and Language selector.

---

### Super Admin Portal (13 Modules)
1. **Dashboard & Overview:** Real-time platform metrics, 6-month registration trend bar chart, Candidates by Domain distribution, and recent activity audit logs.
2. **Certification Management:** Add, edit, publish/unpublish, and manage fees/syllabi across all 16 domains.
3. **Examination Management:** Schedule exam sessions, manage proctoring parameters, and monitor candidate capacity.
4. **Candidate Management:** Searchable candidate registry with Candidate ID, email, domain, status, and Candidate Profile Dossier drawer.
5. **Training Partner Management:** Manage authorized partners (`TP1001`), locations, and active programs.
6. **Membership Management:** Manage corporate and individual professional memberships (`MEM1001`).
7. **Certificate Management:** Manual issue, reissue, revocation, and PDF generation with cryptographic QR codes.
8. **Certificate Verification:** Administrative verification lookup and IP audit trail history.
9. **Content & Learning Management (LMS):** Course and study material repository management (`LMS-AI-01`).
10. **Communication & Announcements:** Broadcast notices to Candidates, Training Partners, or All Users.
11. **Reports & Analytics:** Exam performance trends, pass/fail ratios, and domain popularity metrics.
12. **Finance & Payments:** Revenue analytics, gateway transaction ledger, and Razorpay refund management.
13. **System & Settings:** RBAC roles, access control matrices, Razorpay/Firebase API credentials, theme settings, and live system audit logs.

---

## 4. Razorpay Integration (Mandatory)

The platform implements the complete server-side payment verification cycle:
1. Candidate clicks **Enroll Now**.
2. Frontend requests `POST /api/payments/create-order` with certification ID.
3. Backend validates fee and initializes order via Razorpay SDK (`razorpay.orders.create`).
4. Candidate completes payment via Razorpay Checkout (UPI, Cards, NetBanking, Wallets).
5. Frontend sends transaction payload to `POST /api/payments/verify`.
6. Backend validates cryptographic HMAC SHA256 signature server-side.
7. Upon successful verification:
   - Payment status marked `success`.
   - Tax-compliant GST invoice is generated.
   - Candidate enrollment status updated to `enrolled`.
   - Real-time audit log created.
   - Transaction immediately visible in both Candidate and Admin portals.
8. Independent Webhook endpoint (`POST /api/payments/webhook`) with signature verification and idempotent payload processing.

---

## 5. Interactive Examination Engine
- Timed assessments with countdown timer (`90:00` countdown).
- Multiple-choice questions (MCQ), multiple-answer selections, and isolated practical code assessment editor.
- Dynamic question palette with status indicators (Answered in green, Flagged in amber, Unvisited in gray).
- Autosave functionality.
- Automated score calculation and instant pass/fail evaluation based on 70% threshold.
- Passing candidates automatically receive an official AICQB Professional Certificate with cryptographic QR authentication.

---

## 6. Official Certificate Specification
Exact replica of the AICQB Board Certificate (Image 4):
- **Signatories:**
  - *Dr. Neha Kulkarni* (Director – Certification, AICQB)
  - *Pushpak Wani* (Chief Executive Officer, AICQB)
- **Official Golden Medallion Seal:** 3-star embossed circular crest.
- **Cryptographic QR Code:** Generated using QR SDK pointing directly to `https://www.aicqb.org/verify?id=[CERT_NO]`.
- **Unique Sequence:** `AICQB-[DOMAIN]-[YEAR]-[SEQUENCE]` (e.g., `AICQB-AI-2026-000123`).
- **Client & Server PDF Export:** Vector quality layout ready for printing and digital verification.

---

## 7. How to Run

### Prerequisites
- Node.js v18+ or v22+
- npm v10+

### Step 1: Install Dependencies
```bash
# In server directory:
cd server
npm install

# In client directory:
cd ../client
npm install
```

### Step 2: Seed Initial Official Data
```bash
cd server
npm run seed
```
*Creates initial official certifications across all domains, question bank, and default Super Admin credentials (`admin@aicqb.org` / `Admin@123456`).*

### Step 3: Run the Application
You can run the full-stack app in either of two ways:

#### Option A: Unified Full-Stack Server (Recommended)
```bash
cd client
npm run build

cd ../server
npm start
```
The server serves both the REST API and the React frontend on **http://localhost:5000**.

#### Option B: Vite Dev Server with API Proxy
```bash
# Terminal 1: Backend API
cd server
npm run dev

# Terminal 2: Frontend Vite
cd client
npm run dev
```
Open **http://localhost:5173** in your browser.

---

## 8. Default Credentials for Testing

| Role | Email | Password |
|---|---|---|
| **Super Admin** | `admin@aicqb.org` | `Admin@123456` |
| **Candidate** | Register any new account at `/signup` | Custom |

---

## 9. Security & Compliance
- **Strict Real-Data Policy:** No hardcoded mock candidate records. Real empty states displayed when collections are empty.
- **RBAC (Role-Based Access Control):** Candidates cannot access `/admin/*` routes.
- **Data Isolation:** Candidates can only access their own payments, exams, and certificates.
- **Secrets Management:** Razorpay Key Secret and JWT keys strictly stored on the backend.
- **Audit Logging:** Every administrative action is logged with IP, user email, and timestamp.

