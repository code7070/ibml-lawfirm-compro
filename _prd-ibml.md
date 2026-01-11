# Product Requirements Document (PRD)

## IBML Law Firm Integrated Digital Platform

| Document Info |                         |
| :------------ | :---------------------- |
| Version       | 1.0                     |
| Date          | 11 Januari 2026         |
| Project Ref   | PACK-COMPRO-IBML-2026-1 |

---

## 1. Overview

### 1.1 Product Vision

Membangun ekosistem digital terintegrasi untuk Firma Hukum IBML yang mencakup website company profile publik dan sistem manajemen konten (CMS) internal. Platform ini bertujuan menciptakan citra profesional firma, meningkatkan visibilitas online, dan memudahkan pengelolaan konten secara mandiri.

### 1.2 Product Goals

1. **Brand Presence:** Menampilkan identitas firma hukum secara profesional dan modern
2. **Content Accessibility:** Menyediakan informasi lengkap tentang layanan, tim, dan insights hukum
3. **Dual Language:** Mendukung konten dalam Bahasa Indonesia dan English
4. **Self-Managed:** Memungkinkan tim internal mengelola konten tanpa bantuan developer
5. **Performance:** Website cepat, SEO-friendly, dan responsif di semua perangkat

### 1.3 Target Users

| User Type           | Description                                                   |
| :------------------ | :------------------------------------------------------------ |
| **Public Visitors** | Calon klien, mitra bisnis, pencari kerja, dan masyarakat umum |
| **CMS Admin**       | Tim internal firma (Super Admin, Editor, Viewer)              |

### 1.4 Development Status

> **Legend:** ✅ Completed | 🚧 In Progress | ⏳ Not Started

#### Web Company Profile (Frontend)

| Page/Feature | Status | Notes |
| :--- | :--- | :--- |
| **Home Page** | ✅ | Components: Hero, Services, Team, Achievements, Articles, CTASection |
| **About Page** | ✅ | Full page implemented |
| **Lawyers & Partners** | ✅ | List view implemented |
| **Practice Areas** | ✅ | Overview page implemented |
| **Insights (Articles)** | ✅ | List page + Detail page |
| **Events** | ✅ | List page + Detail page |
| **Careers** | ✅ | Job listings + application form |
| **Contact** | ✅ | Contact form + info |
| **Global: Navbar** | ✅ | Responsive navigation |
| **Global: Footer** | ✅ | Footer with links |
| **Global: Dual Language** | ⏳ | Not yet implemented |
| **Global: SEO Meta Tags** | ⏳ | Not yet implemented |
| **Database Integration** | ⏳ | Currently using static data |

#### CMS Dashboard

| Module | Status | Notes |
| :--- | :--- | :--- |
| **Authentication** | ⏳ | Not started |
| **Dashboard Overview** | ⏳ | Not started |
| **Lawyers Management** | ⏳ | Not started |
| **Practice Areas Management** | ⏳ | Not started |
| **Articles Management** | ⏳ | Not started |
| **Events Management** | ⏳ | Not started |
| **Careers Management** | ⏳ | Not started |
| **Contact Form Management** | ⏳ | Not started |
| **Media Library** | ⏳ | Not started |
| **Settings** | ⏳ | Not started |
| **User Management** | ⏳ | Not started |

---

# PART A: WEB COMPANY PROFILE

## 2. Tech Stack - Web Compro

| Category        | Technology            |
| :-------------- | :-------------------- |
| Framework       | Next.js 16 + React 19 |
| Language        | TypeScript            |
| Styling         | Tailwind CSS v4       |
| Database Client | Supabase SDK JS       |
| Icons           | Lucide React          |
| Database        | Supabase (PostgreSQL) |
| Storage         | Cloudflare R2         |

---

## 3. Functional Requirements - Web Compro

### 3.1 Global Features

#### FR-GL-01: Dual Language System

- **Description:** Toggle bahasa Indonesia ↔ English tanpa reload halaman
- **Requirements:**
  - Language switcher di header/navbar
  - URL structure: `/id/...` dan `/en/...`
  - Persist language preference di localStorage
  - Default language: Bahasa Indonesia

#### FR-GL-02: Responsive Navigation

- **Description:** Menu adaptif untuk semua ukuran layar
- **Requirements:**
  - Desktop: Horizontal navbar dengan dropdown
  - Mobile/Tablet: Hamburger menu dengan slide-out drawer
  - Sticky header on scroll
  - Active state indicator

#### FR-GL-03: SEO Optimization

- **Description:** Optimasi untuk search engine
- **Requirements:**
  - Dynamic meta tags (title, description, og:image)
  - Structured data (JSON-LD) untuk Organization, Person, Article
  - Automatic sitemap.xml generation
  - robots.txt configuration
  - Canonical URLs

#### FR-GL-04: Performance Optimization

- **Description:** Memastikan website loading cepat
- **Requirements:**
  - Lazy loading untuk images
  - Code splitting per route
  - Image optimization (next/image)
  - Caching strategy

---

### 3.2 Page Requirements

#### FR-HP-01: Home Page

| Section          | Description                         | Data Source              |
| :--------------- | :---------------------------------- | :----------------------- |
| Hero Section     | Visual premium dengan tagline firma | CMS (Semi-dynamic)       |
| USP Section      | 3-4 unique selling points           | CMS                      |
| Featured Lawyers | 3-4 highlight lawyer cards          | CMS (auto/manual select) |
| Latest Articles  | 3 artikel terbaru                   | Database (auto)          |
| Upcoming Events  | 2-3 event mendatang                 | Database (auto)          |
| CTA Section      | Call-to-action buttons              | CMS                      |

**Acceptance Criteria:**

- [ ] Hero section menampilkan background image/video + headline + CTA
- [ ] USP section dengan icon dan deskripsi singkat
- [ ] Featured content cards clickable ke detail page
- [ ] Smooth scroll animations

---

#### FR-AB-01: About Page

| Section          | Description              | Data Source  |
| :--------------- | :----------------------- | :----------- |
| Company Profile  | Deskripsi firma hukum    | CMS (Static) |
| Vision & Mission | Visi dan misi perusahaan | CMS          |
| History/Timeline | Milestone perusahaan     | CMS          |
| Office Gallery   | Foto kantor (optional)   | CMS          |

**Acceptance Criteria:**

- [ ] Clean layout dengan typography yang readable
- [ ] Timeline/milestone dengan visualisasi menarik
- [ ] Consistent dengan branding firma

---

#### FR-LP-01: Lawyers & Partners Page ⚡ Fully Dynamic

| Feature                  | Description                                                           |
| :----------------------- | :-------------------------------------------------------------------- |
| Grid/List View           | Toggle view mode                                                      |
| Filter by Position       | Partners, Senior Associates, Associates, Of Counsel, Legal Consultant |
| Filter by Specialization | IP Law, Corporate, Litigation, dll                                    |
| Search                   | Pencarian berdasarkan nama                                            |
| Sorting                  | By name (A-Z), By position (seniority)                                |

**Lawyer Card Components:**

- Foto profil (thumbnail)
- Nama lengkap
- Posisi/jabatan
- Area praktik utama (tags)
- Link ke detail page

**Lawyer Detail Page:**

- Foto profil (large)
- Nama lengkap + gelar
- Posisi/jabatan
- Biography (bilingual)
- Pendidikan
- Pengalaman kerja
- Area praktik/spesialisasi
- Kontak (email)

**Acceptance Criteria:**

- [ ] Filter dapat dikombinasikan (AND logic)
- [ ] Search real-time (debounced)
- [ ] Empty state jika tidak ada hasil
- [ ] Skeleton loading saat fetch data
- [ ] SEO: Dynamic meta tags per lawyer

---

#### FR-PA-01: Practice Areas Page ⚡ Dynamic

| Feature       | Description                                 |
| :------------ | :------------------------------------------ |
| Overview Grid | List semua practice areas dengan icon/image |
| Detail Page   | Deskripsi lengkap per area                  |

**Practice Area Categories (Initial):**

1. Intellectual Property (IP)
2. Social Media Law
3. Game Industry Legal Services
4. Corporate Law
5. Litigation & Dispute Resolution
6. (Expandable via CMS)

**Practice Area Detail:**

- Judul area praktik
- Hero image/icon
- Deskripsi lengkap (rich text, bilingual)
- Related lawyers (optional)
- Related articles (optional)

**Acceptance Criteria:**

- [ ] Card dengan hover effect
- [ ] Detail page dengan rich content rendering
- [ ] SEO: Structured data untuk Service

---

#### FR-IN-01: Insights Page (Blog/Articles) ⚡ Fully Dynamic

| Feature         | Description                     |
| :-------------- | :------------------------------ |
| Article List    | Grid/list view dengan thumbnail |
| Category Filter | Filter by category              |
| Tag Filter      | Filter by tags                  |
| Search          | Full-text search                |
| Pagination      | Load more / numbered pagination |

**Article Card Components:**

- Featured image (thumbnail)
- Judul artikel
- Excerpt (150 chars)
- Kategori badge
- Tanggal publikasi
- Reading time (calculated)

**Article Detail Page:**

- Featured image (hero)
- Judul artikel
- Author info (optional: linked to lawyer)
- Tanggal publikasi
- Kategori + tags
- Content (rich text)
- Related articles (3-4 items)
- Social share buttons

**Acceptance Criteria:**

- [ ] Infinite scroll atau pagination
- [ ] Reading time calculation (avg 200 words/min)
- [ ] Rich text rendering (headings, lists, images, links)
- [ ] SEO: Article structured data
- [ ] Social share: Copy link, WhatsApp, LinkedIn, Twitter

---

#### FR-EV-01: Seminar, Workshop, and Training Page ⚡ Fully Dynamic

| Feature          | Description                    |
| :--------------- | :----------------------------- |
| Tab: Upcoming    | Event yang akan datang         |
| Tab: Past Events | Arsip event yang sudah selesai |

**Event Card Components:**

- Banner image
- Judul event
- Tanggal & waktu
- Lokasi (online/offline)
- Event type badge (Seminar/Workshop/Training)
- Registration status badge

**Event Detail Page:**

- Banner image (hero)
- Judul event
- Tanggal, waktu, lokasi
- Event type
- Deskripsi lengkap (bilingual)
- Speaker info (optional)
- Registration link/button (if upcoming)
- Photo gallery (if past event)

**Acceptance Criteria:**

- [ ] Auto-categorize to Past based on date
- [ ] Gallery lightbox untuk past events
- [ ] External registration link support

---

#### FR-CR-01: Careers Page ⚡ Fully Dynamic

| Feature     | Description                        |
| :---------- | :--------------------------------- |
| Job List    | Active job openings                |
| Job Detail  | Full job description               |
| Application | Form submission atau external link |

**Job Card Components:**

- Job title
- Department
- Employment type (Full-time/Part-time/Contract)
- Status badge (Open/Closed)
- Posted date

**Job Detail Page:**

- Job title
- Department + employment type
- Job description (rich text)
- Requirements & qualifications
- Application deadline
- How to apply (form atau email)

**Application Form (if enabled):**

- Nama lengkap
- Email
- Phone
- Cover letter (textarea)
- CV upload (PDF, max 5MB)
- Submit button

**Acceptance Criteria:**

- [ ] Only show Open positions by default
- [ ] File upload dengan validasi
- [ ] Success message setelah submit
- [ ] Email notification ke HR

---

#### FR-CT-01: Contact Us Page

| Feature      | Description                             |
| :----------- | :-------------------------------------- |
| Contact Info | Alamat, telepon, email, jam operasional |
| Contact Form | Interactive form submission             |
| Google Maps  | Embedded map lokasi kantor              |
| Social Links | Links ke social media                   |

**Contact Form Fields:**

- Nama lengkap (required)
- Email (required, validated)
- Phone (optional)
- Subject (dropdown atau free text)
- Message (required, textarea)
- Submit button

**Acceptance Criteria:**

- [ ] Form validation dengan error messages
- [ ] Success toast/modal setelah submit
- [ ] Data tersimpan di database
- [ ] Email notification ke admin
- [ ] Google Maps responsive

---

## 4. Non-Functional Requirements - Web Compro

### NFR-01: Performance

| Metric                         | Target |
| :----------------------------- | :----- |
| First Contentful Paint (FCP)   | < 1.5s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Time to Interactive (TTI)      | < 3.5s |
| Lighthouse Performance Score   | > 85   |

### NFR-02: Accessibility

- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatible
- Color contrast ratio minimum 4.5:1

### NFR-03: Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (Chrome, Safari)

### NFR-04: Security

- HTTPS enforcement
- XSS protection
- CSRF protection
- Input sanitization

---

# PART B: WEB CMS DASHBOARD

## 5. Tech Stack - CMS

| Category        | Technology                              |
| :-------------- | :-------------------------------------- |
| Framework       | React + Vite                            |
| Language        | TypeScript                              |
| Styling         | Tailwind CSS (palette mirip Web Compro) |
| UI Components   | Shadcn/UI                               |
| Data Fetching   | TanStack React Query                    |
| Drag & Drop     | @pangea/dnd                             |
| Icons           | Lucide React                            |
| Database & Auth | Supabase SDK JS                         |
| Database        | Supabase (PostgreSQL)                   |
| Storage         | Cloudflare R2                           |

---

## 6. Functional Requirements - CMS

### 6.1 Authentication & Authorization

#### FR-AUTH-01: Login System

- **Requirements:**
  - Email + password login
  - Session management (JWT via Supabase)
  - Remember me option
  - Logout functionality
  - Session timeout (configurable)

#### FR-AUTH-02: Password Management

- **Requirements:**
  - Forgot password flow (email reset link)
  - Change password (dalam settings)
  - Password requirements: min 8 chars, 1 uppercase, 1 number

#### FR-AUTH-03: Role-Based Access Control (RBAC)

| Role            | Permissions                                                         |
| :-------------- | :------------------------------------------------------------------ |
| **Super Admin** | Full access: CRUD all content + user management + settings          |
| **Editor**      | CRUD content (articles, events, lawyers, etc.) - No user management |
| **Viewer**      | Read-only access to all content                                     |

---

### 6.2 Dashboard

#### FR-DASH-01: Overview Dashboard

- **Widgets:**
  - Total lawyers count
  - Total articles (published/draft)
  - Total events (upcoming/past)
  - Total job applications (unread)
  - Total contact submissions (unread)
- **Recent Activities:**
  - Last 10 content changes (who, what, when)
- **Quick Actions:**
  - Add new article
  - Add new event
  - View applications

---

### 6.3 Content Management Modules

#### FR-CMS-01: Bilingual Content System

- **Requirements:**
  - Side-by-side input (ID | EN)
  - Tab switch for mobile view
  - Preview toggle per language
  - Required fields validation per language
  - Auto-save draft setiap 30 detik

---

#### FR-LAW-01: Lawyers & Partners Management

**List View:**

- Table dengan columns: Photo, Name, Position, Specialization, Status, Actions
- Search by name
- Filter by position, specialization
- Bulk actions: Delete, Change status
- Drag-and-drop reorder (untuk featured order)

**Create/Edit Form:**
| Field | Type | Required | Bilingual |
| :--- | :--- | :--- | :--- |
| Photo | Image upload | Yes | No |
| Name | Text | Yes | No |
| Email | Email | Yes | No |
| Phone | Text | No | No |
| Position | Select | Yes | No |
| Category | Multi-select | Yes | No |
| Biography | Rich text | Yes | Yes |
| Education | Rich text | Yes | Yes |
| Experience | Rich text | No | Yes |
| Practice Areas | Multi-select | Yes | No |
| Sort Order | Number | No | No |
| Is Featured | Toggle | No | No |
| Status | Select (Active/Inactive) | Yes | No |

**Acceptance Criteria:**

- [ ] Image upload dengan preview
- [ ] Image crop/resize
- [ ] Soft delete (archive)
- [ ] Revision history

---

#### FR-PRA-01: Practice Areas Management

**List View:**

- Grid/table dengan icon, name, article count
- Drag-and-drop reorder

**Create/Edit Form:**
| Field | Type | Required | Bilingual |
| :--- | :--- | :--- | :--- |
| Icon/Image | Image upload | Yes | No |
| Name | Text | Yes | Yes |
| Slug | Text (auto-generate) | Yes | No |
| Description | Rich text | Yes | Yes |
| Meta Title | Text | No | Yes |
| Meta Description | Textarea | No | Yes |
| Sort Order | Number | No | No |
| Status | Select (Active/Inactive) | Yes | No |

---

#### FR-ART-01: Insights (Articles) Management

**List View:**

- Table: Thumbnail, Title, Category, Status, Date, Author, Actions
- Filter by category, status, date range
- Search by title
- Bulk actions: Delete, Publish, Unpublish

**Create/Edit Form:**
| Field | Type | Required | Bilingual |
| :--- | :--- | :--- | :--- |
| Featured Image | Image upload | Yes | No |
| Title | Text | Yes | Yes |
| Slug | Text (auto-generate) | Yes | No |
| Excerpt | Textarea | Yes | Yes |
| Content | Rich text (WYSIWYG) | Yes | Yes |
| Category | Select | Yes | No |
| Tags | Multi-select/create | No | No |
| Author | Select (linked to lawyer) | No | No |
| Publish Date | Datetime | No | No |
| Status | Select (Draft/Published) | Yes | No |
| Meta Title | Text | No | Yes |
| Meta Description | Textarea | No | Yes |

**Rich Text Editor Features:**

- Headings (H2, H3, H4)
- Bold, Italic, Underline
- Ordered/Unordered lists
- Links (internal/external)
- Images (inline upload)
- Blockquotes
- Code blocks

**Acceptance Criteria:**

- [ ] Preview mode sebelum publish
- [ ] Schedule publish untuk date di future
- [ ] Revision history dengan restore

---

#### FR-EVT-01: Events Management

**List View:**

- Table: Banner, Title, Type, Date, Status, Registration, Actions
- Filter by type, status, date range
- Tabs: All, Upcoming, Past

**Create/Edit Form:**
| Field | Type | Required | Bilingual |
| :--- | :--- | :--- | :--- |
| Banner Image | Image upload | Yes | No |
| Title | Text | Yes | Yes |
| Slug | Text (auto-generate) | Yes | No |
| Event Type | Select (Seminar/Workshop/Training) | Yes | No |
| Date | Date | Yes | No |
| Start Time | Time | Yes | No |
| End Time | Time | No | No |
| Location | Text | Yes | Yes |
| Is Online | Toggle | No | No |
| Online Link | URL | Conditional | No |
| Description | Rich text | Yes | Yes |
| Registration Status | Select (Open/Closed) | Yes | No |
| Registration Link | URL | No | No |
| Photo Gallery | Multi-image upload | No | No |
| Status | Select (Draft/Published) | Yes | No |

**Acceptance Criteria:**

- [ ] Auto-move to Past based on date
- [ ] Gallery dengan drag-and-drop reorder
- [ ] Clone event functionality

---

#### FR-CAR-01: Careers Management

**List View:**

- Table: Title, Department, Type, Status, Applications, Actions
- Filter by department, status
- Badge: Application count

**Create/Edit Form:**
| Field | Type | Required | Bilingual |
| :--- | :--- | :--- | :--- |
| Job Title | Text | Yes | Yes |
| Department | Select | Yes | No |
| Employment Type | Select | Yes | No |
| Description | Rich text | Yes | Yes |
| Requirements | Rich text | Yes | Yes |
| Application Deadline | Date | No | No |
| Status | Select (Open/Closed) | Yes | No |

**Applications Sub-module:**

- List all applications per job
- View application detail (name, email, phone, cover letter, CV download)
- Status tracking: New → Reviewed → Shortlisted → Rejected
- Export to CSV/Excel
- Bulk delete

**Acceptance Criteria:**

- [ ] Email notification saat ada aplikasi baru
- [ ] CV file download

---

#### FR-CON-01: Contact Form Management

**List View:**

- Table: Name, Email, Subject, Date, Status, Actions
- Filter by status (Unread/Read/Responded)
- Filter by date range
- Mark as read/responded
- Bulk actions

**Detail View:**

- Full message content
- Reply via email (mailto link)
- Status update
- Notes field

**Acceptance Criteria:**

- [ ] Badge count untuk unread messages
- [ ] Export to CSV

---

#### FR-MED-01: Media Library

**Features:**

- Grid view dengan thumbnails
- Upload single/multiple files
- Folder organization
- Search by filename
- Filter by type (image/document)
- Image preview modal
- Copy URL to clipboard
- Delete with confirmation
- Storage usage indicator

**Supported Formats:**

- Images: JPG, PNG, WebP, SVG
- Documents: PDF
- Max file size: 10MB per file

---

#### FR-HOME-01: Home Page Management

- Edit hero section content (text, CTA button, background)
- Edit USP points (icon, title, description)
- Select featured lawyers (drag-and-drop from list)
- Select featured articles/events atau auto-latest

---

#### FR-ABOUT-01: About Page Management

- Edit company profile text
- Edit vision & mission
- Manage milestones (CRUD dengan year, title, description)

---

#### FR-SET-01: Settings

**Site Settings:**

- Site title
- Tagline
- Logo upload (light/dark)
- Favicon

**Contact Settings:**

- Office address
- Phone numbers
- Email addresses
- Operating hours
- Google Maps embed code

**Social Media:**

- LinkedIn URL
- Instagram URL
- Twitter/X URL
- YouTube URL

**Email Settings:**

- Notification email (recipient)
- Email sender name

---

### 6.4 User Management (Super Admin Only)

#### FR-USR-01: User Management

**List View:**

- Table: Name, Email, Role, Last Login, Status, Actions

**Create/Edit Form:**
| Field | Type | Required |
| :--- | :--- | :--- |
| Name | Text | Yes |
| Email | Email | Yes |
| Role | Select | Yes |
| Status | Select (Active/Inactive) | Yes |

**Actions:**

- Create new user (send invite email)
- Edit user role
- Deactivate/activate user
- Reset password (send reset email)

---

## 7. Non-Functional Requirements - CMS

### NFR-CMS-01: Performance

- Page load time < 2s
- Form submission response < 1s
- Image upload with progress indicator

### NFR-CMS-02: Usability

- Responsive design (desktop-first, tablet supported)
- Consistent UI patterns
- Toast notifications untuk actions
- Confirmation dialogs untuk destructive actions
- Loading states untuk async operations

### NFR-CMS-03: Security

- Session timeout: 8 hours
- Activity logging (audit trail)
- Input validation & sanitization
- Row Level Security (RLS) via Supabase

### NFR-CMS-04: Data Integrity

- Auto-save drafts
- Soft delete (dengan restore option)
- Revision history untuk content

---

## 8. Database Schema (High-Level)

### Core Tables

```
users
├── id (uuid, PK)
├── email (unique)
├── name
├── role (super_admin, editor, viewer)
├── status (active, inactive)
├── last_login
└── timestamps

lawyers
├── id (uuid, PK)
├── photo_url
├── name
├── email
├── phone
├── position
├── categories (array)
├── biography_id, biography_en
├── education_id, education_en
├── experience_id, experience_en
├── practice_areas (array → practice_areas.id)
├── sort_order
├── is_featured
├── status
└── timestamps

practice_areas
├── id (uuid, PK)
├── icon_url
├── name_id, name_en
├── slug
├── description_id, description_en
├── meta_title_id, meta_title_en
├── meta_description_id, meta_description_en
├── sort_order
├── status
└── timestamps

articles
├── id (uuid, PK)
├── featured_image_url
├── title_id, title_en
├── slug
├── excerpt_id, excerpt_en
├── content_id, content_en
├── category_id (→ categories.id)
├── tags (array)
├── author_id (→ lawyers.id, nullable)
├── publish_date
├── status (draft, published)
├── meta_title_id, meta_title_en
├── meta_description_id, meta_description_en
└── timestamps

categories
├── id (uuid, PK)
├── name_id, name_en
├── slug
└── timestamps

events
├── id (uuid, PK)
├── banner_url
├── title_id, title_en
├── slug
├── event_type (seminar, workshop, training)
├── event_date
├── start_time
├── end_time
├── location_id, location_en
├── is_online
├── online_link
├── description_id, description_en
├── registration_status (open, closed)
├── registration_link
├── gallery (array of URLs)
├── status
└── timestamps

jobs
├── id (uuid, PK)
├── title_id, title_en
├── department
├── employment_type
├── description_id, description_en
├── requirements_id, requirements_en
├── deadline
├── status (open, closed)
└── timestamps

applications
├── id (uuid, PK)
├── job_id (→ jobs.id)
├── name
├── email
├── phone
├── cover_letter
├── cv_url
├── status (new, reviewed, shortlisted, rejected)
└── timestamps

contacts
├── id (uuid, PK)
├── name
├── email
├── phone
├── subject
├── message
├── status (unread, read, responded)
└── timestamps

settings
├── key (PK)
├── value (JSON)
└── timestamps

activity_logs
├── id (uuid, PK)
├── user_id (→ users.id)
├── action
├── entity_type
├── entity_id
├── details (JSON)
└── timestamp
```

---

## 9. Integration Points

### 9.1 Web Compro ↔ Supabase

- Real-time data fetching via Supabase SDK
- Server-side rendering dengan data dari Supabase
- Caching strategy dengan ISR (Incremental Static Regeneration)

### 9.2 CMS ↔ Supabase

- All CRUD operations via Supabase SDK
- Authentication via Supabase Auth
- Row Level Security untuk access control

### 9.3 File Storage (Cloudflare R2)

- Image uploads (lawyers, articles, events, etc.)
- Document uploads (CVs, PDFs)
- Public bucket untuk assets website
- Signed URLs untuk private files

### 9.4 Email Notifications

- New contact form submission
- New job application
- Password reset

---

## 10. Success Metrics

| Metric                   | Target                     |
| :----------------------- | :------------------------- |
| Website uptime           | 99.5%                      |
| Page load time (avg)     | < 2s                       |
| SEO: Core Web Vitals     | All green                  |
| CMS task completion time | < 5 min per content update |
| Content publish accuracy | Zero data loss             |

---

## 11. Out of Scope

Berikut yang **tidak** termasuk dalam scope proyek ini:

- Mobile native application
- E-commerce functionality
- Client portal / login area
- Live chat integration
- Newsletter/email marketing system
- Payment gateway integration
- Advanced analytics dashboard
- Multi-tenant support

---

## 12. Assumptions & Dependencies

### Assumptions

1. Konten (teks, gambar) disediakan oleh klien
2. Domain sudah dimiliki atau akan disediakan klien
3. Akses Supabase dan Cloudflare R2 akan di-setup bersama
4. Klien memiliki tim internal untuk mengoperasikan CMS

### Dependencies

1. Supabase account (database & auth)
2. Cloudflare R2 account (storage)
3. Domain name
4. SSL certificate

---

## 13. Risks & Mitigations

| Risk                                  | Impact              | Mitigation                                 |
| :------------------------------------ | :------------------ | :----------------------------------------- |
| Konten tidak siap tepat waktu         | Timeline delay      | Early content request, placeholder content |
| Perubahan requirement di tengah jalan | Scope creep         | Change request process dengan approval     |
| Third-party service downtime          | Website unavailable | Fallback/cache strategy                    |
| Learning curve CMS                    | Slow adoption       | Training session, user guide documentation |

---

## 14. Appendix

### A. Glossary

- **CMS:** Content Management System
- **CRUD:** Create, Read, Update, Delete
- **ISR:** Incremental Static Regeneration
- **RLS:** Row Level Security
- **WYSIWYG:** What You See Is What You Get
- **JWT:** JSON Web Token

### B. Reference

- [Quotation Document](file://./_quotation_ibml_detailed.md)
- [Design System](file://./_design-system.md)

---

_Document Version: 1.0 | Last Updated: 11 Januari 2026_
