# **QUOTATION: LAW FIRM INTEGRATED DIGITAL PLATFORM**

| Date        | : 11 Januari 2026         |
| :---------- | :------------------------ |
| Valid Until | : 15 Januari 2026         |
| Project Ref | : PACK-COMPRO-IBML-2026-1 |

## **1. Executive Summary**

Penawaran ini mencakup pengembangan **dua aplikasi web terintegrasi** untuk menunjang operasional konten digital website company profile Firma Hukum. Proyek ini bertujuan menciptakan ekosistem digital yang independen, modern, aman, dan mudah dikelola secara mandiri.

**Lingkup Pengembangan (2 Platform):**

1. **Public Company Profile:** Wajah digital firma untuk klien (Frontend).
2. **Admin CMS Dashboard:** Aplikasi internal untuk manajemen konten

---

## **2. Scope of Work (Lingkup Pekerjaan)**

### **A. Web Application 1: Public Company Profile**

_Website utama yang diakses oleh publik/klien dengan fokus pada UI/UX, Kecepatan, dan SEO._

**Technology Stack:**

- Next.js 16 + React 19 (Modern Framework)
- TypeScript (Type-safe development)
- Tailwind CSS v4 (Utility-first styling)
- Supabase SDK JS (Database client)
- Lucide React (Icon library)
- Responsive Design (Mobile-first approach)
- SEO Optimized Architecture

**Page Structure & Features:**

**1. Home Page**

- Hero section dengan visual premium
- Unique Selling Points (USP) firma
- Featured content (artikel terbaru, event mendatang, lawyer highlight)
- Call-to-action section
- _Status: Semi-dinamis (featured content dapat diupdate via CMS)_

**2. About Page**

- Profil firma hukum
- Visi dan misi
- Sejarah dan milestone perusahaan
- _Status: Statis (jarang berubah, dapat diedit via CMS jika diperlukan)_

**3. Lawyers & Partners Page** ⚡ **(Fully Dynamic)**

- Grid/list view profil advokat dan mitra
- **Filter System:**
  - Kategori jabatan (Partners, Senior Associates, Associates, Of Counsel, Legal Consultant)
  - Spesialisasi keahlian (IP Law, Corporate, Litigation, dll)
- Detail profil: Foto, nama, posisi, bio, pendidikan, pengalaman, area praktik
- Search functionality (pencarian berdasarkan nama)
- _Managed via: CMS Dashboard_

**4. Practice Areas Page** ⚡ **(Dynamic)**

- Halaman overview jasa hukum
- Detail per kategori:
  - Intellectual Property (IP)
  - Social Media Law
  - Game Industry Legal Services
  - Corporate Law
  - Dan kategori lainnya
- Deskripsi lengkap setiap layanan
- _Managed via: CMS Dashboard_

**5. Insights Page (Blog/Articles)** ⚡ **(Fully Dynamic)**

- List artikel hukum dan analisis
- Kategori artikel (IP, Digital Law, Gaming, Corporate, dll)
- Tag system untuk topik spesifik
- Search & filter functionality
- Pagination untuk navigasi artikel
- Detail artikel dengan rich text editor output
- Related articles recommendation
- _Managed via: CMS Dashboard_

**6. Seminar, Workshop, and Training Page** ⚡ **(Fully Dynamic)**

- **Tab System:**
  - Upcoming Events (event mendatang)
  - Past Events (arsip event)
- Detail setiap event:
  - Judul, tanggal, waktu, lokasi
  - Deskripsi event
  - Featured image/banner
  - Status pendaftaran
- Event gallery (dokumentasi foto past events)
- _Managed via: CMS Dashboard_

**7. Careers Page** ⚡ **(Fully Dynamic)**

- List lowongan kerja aktif
- Detail posisi:
  - Job title & department
  - Job description & requirements
  - Status (Open/Closed)
- Application form integration
- Informasi budaya kerja dan benefit
- _Managed via: CMS Dashboard_

**8. Contact Us Page**

- Interactive contact form
- Informasi kontak (alamat, telepon, email)
- Embedded Google Maps lokasi kantor
- Form submission akan masuk ke database dan email notifikasi
- _Status: Semi-dinamis (form submissions tersimpan di database)_

**Global Features (Semua Halaman):**

- **Dual-Language System:** Toggle bahasa Indonesia ↔ English tanpa reload halaman
- **Responsive Navigation:** Menu adaptif untuk mobile, tablet, desktop
- **SEO Optimization:** Meta tags, structured data, sitemap.xml
- **Loading Speed:** Lazy loading images, code splitting, caching strategy
- **Accessibility:** WCAG compliant, keyboard navigation support

---

### **B. Web Application 2: Content Management System (CMS)**

_Aplikasi web terpisah (Portal Admin) yang hanya bisa diakses oleh tim internal untuk mengontrol isi website publik._

**Technology Stack:**

- React + Vite (Fast development & HMR)
- TypeScript (Type-safe development)
- Supabase SDK JS (Database & Auth client)
- Tailwind CSS (Color palette mirip Web Compro)
- Shadcn/UI (Component library)
- TanStack React Query (Data fetching & caching)
- @pangea/dnd (Drag & drop sorting)
- Lucide React (Icon library)

**Database & Storage:**

- **Database:** Supabase (PostgreSQL with real-time capabilities)
- **Storage:** Cloudflare R2 (Media & file storage)

**CMS Core Features:**

**1. Authentication & User Management**

- Secure login page dengan enkripsi
- Role-based access control (Super Admin, Editor, Viewer)
- Session management & timeout security
- Password reset functionality
- Activity log tracking

**2. Dashboard Overview**

- Statistics summary (total lawyers, articles, events, job applications)
- Recent activities feed
- Quick action buttons
- Performance metrics

**3. Bilingual Content Management System**

- **Dual-column input interface:**
  - Kolom kiri: Input Bahasa Indonesia
  - Kolom kanan: Input English
- Preview mode untuk kedua bahasa
- Auto-save functionality
- Revision history tracking

**4. Lawyers & Partners Management** ⚡

- **CRUD Operations (Create, Read, Update, Delete):**
  - Tambah profil lawyer baru
  - Edit informasi existing lawyers
  - Upload/update foto profil
  - Hapus profil (soft delete)
- **Data Fields:**
  - Personal info (nama, email, phone)
  - Position/title & category
  - Biography (dual language)
  - Education background
  - Work experience
  - Practice areas/specialization
  - Profile photo upload
- Drag-and-drop ordering untuk featured lawyers
- Bulk actions support

**5. Practice Areas Management** ⚡

- Add/edit/delete practice area categories
- Rich text editor untuk deskripsi layanan
- Icon/image upload per kategori
- SEO fields (meta title, description)
- Reorder categories

**6. Insights (Blog) Management** ⚡

- **Article Editor:**
  - WYSIWYG editor (What You See Is What You Get)
  - Support formatting: headings, lists, links, images
  - Image gallery upload
  - Dual-language content input
- **Article Settings:**
  - Category assignment
  - Tag management
  - Featured image upload
  - Publish date scheduling
  - Status (Draft/Published)
  - SEO optimization fields
- Article list dengan filter & search
- Preview before publish

**7. Events Management** ⚡

- **Event Creation:**
  - Event title, description (bilingual)
  - Date, time, location
  - Event type (Seminar/Workshop/Training)
  - Registration link/details
  - Banner image upload
  - Photo gallery upload (untuk past events)
- **Status Management:**
  - Upcoming/Ongoing/Past event
  - Open/Closed registration
- Event calendar view
- Bulk status update

**8. Careers Management** ⚡

- **Job Posting:**
  - Position title & department
  - Job description (bilingual)
  - Requirements & qualifications
  - Employment type (Full-time/Part-time/Contract)
  - Status (Open/Closed)
  - Application deadline
- **Applicant Database:**
  - View submitted applications
  - Download CV/resume files
  - Filter by position & date
  - Export to CSV/Excel
  - Applicant status tracking
- Email notification system untuk aplikasi baru

**9. Contact Form Management**

- View submitted inquiries
- Filter by date & status
- Mark as read/responded
- Export data
- Email notification untuk inquiry baru

**10. Media Library**

- Centralized file management
- Upload images/documents
- Organize by folders
- Search & filter files
- Image optimization tools
- Storage usage monitoring

**11. Home Page Management**

- Update hero section content
- Manage USP points
- Select featured content (lawyers, articles, events)
- Update call-to-action sections

**12. About Page Management**

- Edit company profile
- Update vision & mission statements
- Manage company milestones/history

**13. Settings & Configuration**

- Site settings (site title, tagline, logo)
- Contact information management
- Social media links
- Email notification settings
- Language settings default
- SEO global settings

---

## **3. Development Timeline (36 Days Effectively)**

Pengerjaan dilakukan secara paralel antara _Public Web_ dan _CMS_ untuk memenuhi tenggat waktu.

| Timeline      | Activity Focus                                  | Key Output                                 | Deliverable                                                                                                                                                                                           |
| :------------ | :---------------------------------------------- | :----------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Day 1-7**   | **Discovery & UI/UX Design**                    | Visual Concept & Technical Specification   | • Sitemap (struktur menu)<br>• Wireframes<br>• UI/UX Mockup (Web Publik)<br>• UI/UX Mockup (CMS Dashboard)<br>• Database Schema Design<br>• Technical Documentation                                   |
| **Day 8-19**  | **Development Stage 1: CMS & Backend**          | Functional CMS Dashboard (Internal)        | • Database setup & structure<br>• Admin authentication system<br>• CMS Dashboard (80% complete)<br>• Dual-language input system<br>• CRUD operations untuk semua modul<br>• API endpoints             |
| **Day 20-30** | **Development Stage 2: Frontend & Integration** | Public Website (Beta Version)              | • Public website frontend (90% complete)<br>• CMS-Frontend integration<br>• Dual-language switching system<br>• SEO implementation<br>• Responsive design (all devices)<br>• Performance optimization |
| **Day 31-36** | **UAT, Content Entry & Deployment**             | Live Website + Source Code & Documentation | • Content migration/entry via CMS<br>• Bug fixing & refinement<br>• User Acceptance Testing (UAT)<br>• Domain & SSL setup<br>• Live deployment<br>• Admin training session<br>• Complete handover     |

**Milestone Checkpoints:**

- Day 7: Design approval required
- Day 19: CMS functionality review
- Day 30: Frontend preview & feedback
- Day 36: Final acceptance & go-live

---

## **4. Commercial Offer**

Berikut adalah rincian biaya untuk pengembangan dua aplikasi tersebut:

| Item Description                           | Details                                                                                                                                                                                                        | Cost (IDR)        |
| :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------- |
| **1. Web App: Public Company Profile**     | • Premium UI/UX Design<br>• 8 halaman responsif<br>• Frontend Development (Next.js/React)<br>• Dual-language system<br>• SEO optimization<br>• Interactive animations<br>• Performance optimization            | Rp 5.500.000      |
| **2. Web App: Custom CMS Dashboard**       | • Backend system architecture<br>• Database design & setup<br>• Secure authentication system<br>• 13+ management modules<br>• Bilingual content forms<br>• Media library system<br>• Role-based access control | Rp 5.000.000      |
| **3. Integration, Server Setup & Support** | • API integration (CMS ↔ Frontend)<br>• VPS/Hosting setup & configuration<br>• SSL certificate installation<br>• Email server configuration<br>• Performance monitoring setup<br>• Security hardening          | Rp 750.000        |
| **GRAND TOTAL**                            |                                                                                                                                                                                                                | **Rp 11.250.000** |

**Package Includes:**

- ✅ 45 hari garansi error/bug fixing pasca rilis
- ✅ 14 hari minor adjustment & revisi pasca rilis
- ✅ 1x sesi training penggunaan CMS (2-3 jam)
- ✅ Technical documentation lengkap
- ✅ Full source code ownership

**Not Included (Available as Add-on):**

- Domain name registration
- Hosting/VPS subscription (monthly/yearly)
- Content writing services
- Extended maintenance contract
- Additional feature development pasca-launch

---

## **5. Deliverables**

Paket lengkap yang akan diterima klien setelah project completion:

**A. Digital Assets**

1. **Two Separate Source Code Repositories:**

   - Frontend repository (Public Website)
   - Backend repository (CMS Dashboard)
   - Complete with documentation dan comments
   - Version control ready (Git)

2. **Database & Storage:**

   - Full database access & credentials
   - Database schema documentation
   - Backup procedures documentation

3. **Design Files:**
   - UI/UX design files (Figma/Adobe XD)
   - Brand assets (logo, color palette, typography guide)
   - Icon set & image assets

**B. Access & Credentials** 4. **Admin Access:**

- Super Admin account untuk CMS
- Admin panel URL
- Database management access (phpMyAdmin/similar)

5. **Server Access:**

   - Hosting/VPS control panel (cPanel/Plesk/SSH)
   - FTP/SFTP credentials
   - Email server access

6. **Domain & SSL:**
   - Domain configuration documentation
   - SSL certificate (Let's Encrypt atau berbayar)
   - DNS setup documentation

**C. Documentation** 7. **Technical Documentation:**

- System architecture overview
- API documentation
- Database schema & relationships
- Installation & deployment guide

8. **User Manuals:**

   - CMS user guide (Bahasa Indonesia & English)
   - Content management best practices
   - Troubleshooting common issues

9. **Handover Package:**
   - PDF: Complete credentials list
   - PDF: Technical handover document
   - Video tutorial: CMS walkthrough (opsional)

**D. Training & Support** 10. **Knowledge Transfer:** - 1 sesi training penggunaan CMS (2-3 jam) - Q&A session - Post-launch email/chat support (45 hari)

---

## **6. Payment Terms**

### Payment Schedule

- **Term 1 (60%):** Rp 6.750.000 — _Upon Contract Signing (Project Start)_
  - Triggers: Design & development phase begins
- **Term 2 (40%):** Rp 4.500.000 — _Upon Project Completion (Handover)_
  - Triggers: UAT approval, live deployment, credential handover

### Payment Details

- All prices listed are **tax excluded**
- Payment method: Bank Transfer

### Cancellation & Refund Policy

- Cancellation before Day 8: 50% refund of Term 1
- Cancellation after Day 8: No refund (development costs incurred)
- Project suspension: Additional timeline adjustment may apply

---

## **7. Terms & Conditions**

**Client Responsibilities:**

- Menyediakan konten (teks, gambar, logo) yang akan digunakan
- Memberikan feedback dalam waktu 3 hari kerja untuk setiap milestone
- Menyediakan akses domain & hosting (jika sudah ada)
- Menunjuk PIC untuk komunikasi dan approval

**Developer Responsibilities:**

- Menyelesaikan project sesuai timeline yang disepakati
- Memberikan update progress secara berkala
- Menjaga kerahasiaan data dan informasi klien
- Memberikan garansi dan support sesuai kesepakatan

**Warranty & Support:**

- 45 hari bug fixing untuk error yang ditemukan pasca launch
- 14 hari minor adjustment untuk perubahan kecil
- Support melalui email/WhatsApp selama masa garansi
- Extended support available dengan biaya terpisah

**Intellectual Property:**

- Source code menjadi milik penuh klien setelah pelunasan
- Developer berhak mencantumkan project di portfolio
- Third-party libraries tetap mengikuti lisensi masing-masing

---

## **8. Next Steps**

Untuk memulai project ini:

1. **Review & Approval:** Review quotation ini dan konfirmasi persetujuan
2. **Contract Signing:** Penandatanganan kontrak kerja sama
3. **Initial Payment:** Transfer Term 1 (60%)
4. **Kickoff Meeting:** Koordinasi project timeline dan requirement detail
5. **Development Begins:** Project officially starts

**Contact for Questions:**

Web Developer

---

**Prepared by:**

Aditya A.A.  
Web Developer  
11 Januari 2026

---

_Quotation ini berlaku hingga 15 Januari 2026. Setelah tanggal tersebut, harga dan timeline dapat berubah menyesuaikan workload dan availability._
