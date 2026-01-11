# Development Progress & Implementation Plan

## IBML Law Firm Digital Platform

| Document Info |                         |
| :------------ | :---------------------- |
| Version       | 1.0                     |
| Last Updated  | 12 Januari 2026         |
| Project Ref   | PACK-COMPRO-IBML-2026-1 |

---

## Progress Overview

> **Legend:**
>
> - ✅ **Completed** - Feature fully implemented and tested
> - 🚧 **In Progress** - Currently being developed
> - ⏳ **Not Started** - Planned but not yet started
> - 📋 **Planned** - Detailed implementation plan available

### Overall Progress

| Component               | Progress | Status         |
| :---------------------- | :------- | :------------- |
| **Web Company Profile** | 70%      | 🚧 In Progress |
| **CMS Dashboard**       | 0%       | ⏳ Not Started |
| **Database Setup**      | 0%       | ⏳ Not Started |
| **Integration**         | 0%       | ⏳ Not Started |

---

# PART A: WEB COMPANY PROFILE

## 1. Completed Features ✅

### Pages (8/8 Pages Built)

| Page                    | Status | Components                                               | Notes                                          |
| :---------------------- | :----- | :------------------------------------------------------- | :--------------------------------------------- |
| **Home**                | ✅     | Hero, Services, Team, Achievements, Articles, CTASection | Static content, ready for CMS integration      |
| **About**               | ✅     | AboutPage                                                | Full page with company profile, vision/mission |
| **Lawyers & Partners**  | ✅     | LawyersPage                                              | List view with static data                     |
| **Practice Areas**      | ✅     | PracticeAreaPage                                         | Overview page implemented                      |
| **Insights (Articles)** | ✅     | ArticleListPage, ArticleDetailPage                       | List + detail views                            |
| **Events**              | ✅     | EventsPage, EventDetailPage                              | List + detail views                            |
| **Careers**             | ✅     | CareerPage                                               | Job listings + application form                |
| **Contact**             | ✅     | ContactPage                                              | Contact form + info                            |

### Global Components (2/2 Built)

| Component  | Status | File                    | Notes                 |
| :--------- | :----- | :---------------------- | :-------------------- |
| **Navbar** | ✅     | `components/Navbar.tsx` | Responsive navigation |
| **Footer** | ✅     | `components/Footer.tsx` | Footer with links     |

### Supporting Components

| Component        | Status | File                          | Purpose                     |
| :--------------- | :----- | :---------------------------- | :-------------------------- |
| **Button**       | ✅     | `components/Button.tsx`       | Reusable button component   |
| **Articles**     | ✅     | `components/Articles.tsx`     | Article cards for home page |
| **Team**         | ✅     | `components/Team.tsx`         | Team section for home       |
| **Achievements** | ✅     | `components/Achievements.tsx` | Stats/achievements section  |
| **Services**     | ✅     | `components/Services.tsx`     | Services overview           |

---

## 2. Pending Features ⏳

### 2.1 Dual Language System 📋

**Status:** 🚧 In Progress
**Priority:** High
**Estimated Effort:** 3-4 days

#### Current State

- ✅ Infrastructure implemented (Custom Proxy + Custom Hook)
- ✅ Home page (Hero, Navbar) updated
- 🚧 Other pages pending translation
- 🚧 JSON dictionaries created for en/id
- No language switching mechanism
- No i18n library integrated

#### Implementation Plan

##### Step 1: Choose i18n Solution (Day 1) ✅

**Recommended:** `next-intl` (optimized for Next.js App Router)

```bash
# Install dependencies
bun add next-intl
```

**Alternative:** `react-i18next` (more flexible but requires more setup)

##### Step 2: Project Structure Setup (Day 1) ✅

```
app/
├── [locale]/              # Dynamic locale segment
│   ├── layout.tsx         # Root layout with locale
│   ├── page.tsx           # Home page
│   ├── about/
│   ├── lawyers/
│   ├── practice-areas/
│   ├── articles/
│   ├── events/
│   ├── careers/
│   └── contact/
└── middleware.ts          # Locale detection & redirect

messages/
├── en.json                # English translations
└── id.json                # Indonesian translations
```

##### Step 3: Create Translation Files (Day 2) ✅

**Structure Example:**

```json
// messages/id.json
{
  "nav": {
    "home": "Beranda",
    "about": "Tentang Kami",
    "lawyers": "Tim Kami",
    "practiceAreas": "Bidang Praktik",
    "insights": "Insights",
    "events": "Acara",
    "careers": "Karir",
    "contact": "Kontak"
  },
  "home": {
    "hero": {
      "title": "Solusi Hukum Terpercaya",
      "subtitle": "Melindungi hak kekayaan intelektual Anda",
      "cta": "Konsultasi Gratis"
    }
  }
  // ... more translations
}

// messages/en.json
{
  "nav": {
    "home": "Home",
    "about": "About Us",
    "lawyers": "Our Team",
    "practiceAreas": "Practice Areas",
    "insights": "Insights",
    "events": "Events",
    "careers": "Careers",
    "contact": "Contact"
  },
  "home": {
    "hero": {
      "title": "Trusted Legal Solutions",
      "subtitle": "Protecting your intellectual property rights",
      "cta": "Free Consultation"
    }
  }
  // ... more translations
}
```

##### Step 4: Update Components (Day 2-3) 🚧

**Example: Navbar Component**

```tsx
// components/Navbar.tsx
"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <nav>
      <ul>
        <li>
          <a href={`/${locale}`}>{t("home")}</a>
        </li>
        <li>
          <a href={`/${locale}/about`}>{t("about")}</a>
        </li>
        {/* ... */}
      </ul>

      {/* Language Switcher */}
      <div>
        <button onClick={() => switchLocale("id")}>ID</button>
        <button onClick={() => switchLocale("en")}>EN</button>
      </div>
    </nav>
  );
}
```

##### Step 5: Middleware Configuration (Day 3) ✅

```typescript
// proxy.ts (renamed from middleware.ts for Next.js 16 compatibility)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ... custom middleware implementation
```

##### Step 6: Update All Pages (Day 3-4)

- Wrap all static text with `t()` function
- Extract all hardcoded strings to translation files
- Test language switching on all pages

#### Acceptance Criteria

- [ ] Language switcher in navbar
- [ ] URL structure: `/id/...` and `/en/...`
- [ ] All pages support both languages
- [ ] Language preference persists (via URL)
- [ ] Default language is Indonesian
- [ ] No page reload on language switch

---

### 2.2 SEO Meta Tags 📋

**Status:** ⏳ Not Started  
**Priority:** High  
**Estimated Effort:** 2-3 days

#### Current State

- Basic Next.js default meta tags
- No dynamic meta tags per page
- No structured data (JSON-LD)
- No sitemap.xml

#### Implementation Plan

##### Step 1: Create SEO Utilities (Day 1)

```tsx
// lib/seo.ts
import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  locale?: "id_ID" | "en_US";
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  ogImage = "/og-default.jpg",
  ogType = "website",
  publishedTime,
  authors,
  locale = "id_ID",
}: SEOProps): Metadata {
  const siteName = "IBML Law Firm";
  const fullTitle = `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: authors?.map((name) => ({ name })),
    openGraph: {
      title: fullTitle,
      description,
      type: ogType,
      locale,
      siteName,
      images: [{ url: ogImage }],
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
```

##### Step 2: Add Meta Tags to Pages (Day 1-2)

**Example: Article Detail Page**

```tsx
// app/[locale]/articles/[slug]/page.tsx
import { generateMetadata as genMeta } from "@/lib/seo";
import { generateStructuredData } from "@/lib/structured-data";

export async function generateMetadata({ params }: Props) {
  const article = await getArticle(params.slug);

  return genMeta({
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    ogImage: article.featuredImage,
    ogType: "article",
    publishedTime: article.publishedAt,
    authors: [article.author.name],
    locale: params.locale === "id" ? "id_ID" : "en_US",
  });
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticle(params.slug);
  const structuredData = generateStructuredData("article", article);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Page content */}
    </>
  );
}
```

##### Step 3: Structured Data (JSON-LD) (Day 2)

```tsx
// lib/structured-data.ts
export function generateStructuredData(type: string, data: any) {
  const baseUrl = "https://ibml-lawfirm.com";

  switch (type) {
    case "organization":
      return {
        "@context": "https://schema.org",
        "@type": "LegalService",
        name: "IBML Law Firm",
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description: "Firma hukum spesialis IP Law",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Jl. Example No. 123",
          addressLocality: "Jakarta",
          addressCountry: "ID",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+62-21-1234567",
          contactType: "customer service",
        },
      };

    case "article":
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.title,
        description: data.excerpt,
        image: data.featuredImage,
        datePublished: data.publishedAt,
        dateModified: data.updatedAt,
        author: {
          "@type": "Person",
          name: data.author.name,
        },
        publisher: {
          "@type": "Organization",
          name: "IBML Law Firm",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/logo.png`,
          },
        },
      };

    case "person":
      return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: data.name,
        jobTitle: data.position,
        worksFor: {
          "@type": "Organization",
          name: "IBML Law Firm",
        },
        image: data.photo,
        description: data.biography,
      };

    case "event":
      return {
        "@context": "https://schema.org",
        "@type": "Event",
        name: data.title,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        location: {
          "@type": data.isOnline ? "VirtualLocation" : "Place",
          name: data.location,
          ...(data.isOnline && { url: data.onlineLink }),
        },
        organizer: {
          "@type": "Organization",
          name: "IBML Law Firm",
        },
      };

    default:
      return {};
  }
}
```

##### Step 4: Sitemap Generation (Day 3)

```tsx
// app/sitemap.ts
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ibml-lawfirm.com";

  // Static pages
  const staticPages = [
    "",
    "/about",
    "/lawyers",
    "/practice-areas",
    "/articles",
    "/events",
    "/careers",
    "/contact",
  ];

  // Dynamic pages (fetch from database)
  const articles = await getArticles();
  const lawyers = await getLawyers();
  const events = await getEvents();

  const staticUrls = staticPages.flatMap((page) => [
    {
      url: `${baseUrl}/id${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
    },
    {
      url: `${baseUrl}/en${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
    },
  ]);

  const articleUrls = articles.flatMap((article) => [
    {
      url: `${baseUrl}/id/articles/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/articles/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]);

  return [...staticUrls, ...articleUrls];
}
```

##### Step 5: robots.txt (Day 3)

```tsx
// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: "https://ibml-lawfirm.com/sitemap.xml",
  };
}
```

#### Acceptance Criteria

- [ ] Dynamic meta tags on all pages
- [ ] Open Graph tags for social sharing
- [ ] Twitter Card tags
- [ ] Structured data (JSON-LD) for Organization, Article, Person, Event
- [ ] Automatic sitemap.xml generation
- [ ] robots.txt configured
- [ ] Canonical URLs on all pages

---

### 2.3 Database Integration (Supabase) 📋

**Status:** ⏳ Not Started  
**Priority:** Critical  
**Estimated Effort:** 5-7 days

#### Current State

- All data is static (hardcoded in components)
- No database connection
- Data files: `data/articles.tsx`, `data/events.tsx`

#### Implementation Plan

##### Step 1: Supabase Project Setup (Day 1)

1. **Create Supabase Project**

   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note: Project URL, anon key, service role key

2. **Install Supabase Client**

```bash
bun add @supabase/supabase-js
```

3. **Environment Variables**

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. **Create Supabase Client**

```tsx
// lib/supabase/client.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// lib/supabase/server.ts (for server components)
import { createClient } from "@supabase/supabase-js";

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

##### Step 2: Database Schema Creation (Day 1-2)

**SQL Migration Script:**

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_id TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Practice Areas table
CREATE TABLE practice_areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon_url TEXT,
  name_id TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description_id TEXT,
  description_en TEXT,
  meta_title_id TEXT,
  meta_title_en TEXT,
  meta_description_id TEXT,
  meta_description_en TEXT,
  sort_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lawyers table
CREATE TABLE lawyers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  photo_url TEXT,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  position TEXT NOT NULL,
  categories TEXT[] DEFAULT '{}',
  biography_id TEXT,
  biography_en TEXT,
  education_id TEXT,
  education_en TEXT,
  experience_id TEXT,
  experience_en TEXT,
  practice_area_ids UUID[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Articles table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  featured_image_url TEXT,
  title_id TEXT NOT NULL,
  title_en TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt_id TEXT,
  excerpt_en TEXT,
  content_id TEXT,
  content_en TEXT,
  category_id UUID REFERENCES categories(id),
  tags TEXT[] DEFAULT '{}',
  author_id UUID REFERENCES lawyers(id),
  publish_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  meta_title_id TEXT,
  meta_title_en TEXT,
  meta_description_id TEXT,
  meta_description_en TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  banner_url TEXT,
  title_id TEXT NOT NULL,
  title_en TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  event_type TEXT CHECK (event_type IN ('seminar', 'workshop', 'training')),
  event_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  location_id TEXT,
  location_en TEXT,
  is_online BOOLEAN DEFAULT FALSE,
  online_link TEXT,
  description_id TEXT,
  description_en TEXT,
  registration_status TEXT DEFAULT 'open' CHECK (registration_status IN ('open', 'closed')),
  registration_link TEXT,
  gallery TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Jobs table
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_id TEXT NOT NULL,
  title_en TEXT NOT NULL,
  department TEXT,
  employment_type TEXT,
  description_id TEXT,
  description_en TEXT,
  requirements_id TEXT,
  requirements_en TEXT,
  deadline DATE,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Applications table
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  cover_letter TEXT,
  cv_url TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'shortlisted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contacts table
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'responded')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Settings table (key-value store)
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_articles_author ON articles(author_id);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_publish_date ON articles(publish_date DESC);
CREATE INDEX idx_events_date ON events(event_date DESC);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_applications_job ON applications(job_id);
CREATE INDEX idx_contacts_status ON contacts(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_practice_areas_updated_at BEFORE UPDATE ON practice_areas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lawyers_updated_at BEFORE UPDATE ON lawyers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

##### Step 3: Row Level Security (RLS) Setup (Day 2)

```sql
-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE lawyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can view published articles"
  ON articles FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public can view active lawyers"
  ON lawyers FOR SELECT
  USING (status = 'active');

CREATE POLICY "Public can view active practice areas"
  ON practice_areas FOR SELECT
  USING (status = 'active');

CREATE POLICY "Public can view published events"
  ON events FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public can view open jobs"
  ON jobs FOR SELECT
  USING (status = 'open');

-- Public can insert applications and contacts
CREATE POLICY "Public can submit applications"
  ON applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can submit contacts"
  ON contacts FOR INSERT
  WITH CHECK (true);

-- Authenticated users (CMS) have full access
-- (Will be configured when CMS auth is implemented)
```

##### Step 4: TypeScript Types (Day 3)

```tsx
// types/database.ts
export interface Database {
  public: {
    Tables: {
      lawyers: {
        Row: {
          id: string;
          photo_url: string | null;
          name: string;
          email: string | null;
          phone: string | null;
          position: string;
          categories: string[];
          biography_id: string | null;
          biography_en: string | null;
          education_id: string | null;
          education_en: string | null;
          experience_id: string | null;
          experience_en: string | null;
          practice_area_ids: string[];
          sort_order: number;
          is_featured: boolean;
          status: "active" | "inactive";
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["lawyers"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["lawyers"]["Insert"]>;
      };
      articles: {
        Row: {
          id: string;
          featured_image_url: string | null;
          title_id: string;
          title_en: string;
          slug: string;
          excerpt_id: string | null;
          excerpt_en: string | null;
          content_id: string | null;
          content_en: string | null;
          category_id: string | null;
          tags: string[];
          author_id: string | null;
          publish_date: string | null;
          status: "draft" | "published";
          meta_title_id: string | null;
          meta_title_en: string | null;
          meta_description_id: string | null;
          meta_description_en: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["articles"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["articles"]["Insert"]>;
      };
      // ... other tables
    };
  };
}
```

##### Step 5: Data Access Layer (Day 3-4)

```tsx
// lib/api/lawyers.ts
import { supabase } from "@/lib/supabase/client";
import { Database } from "@/types/database";

type Lawyer = Database["public"]["Tables"]["lawyers"]["Row"];

export async function getLawyers(locale: "id" | "en" = "id") {
  const { data, error } = await supabase
    .from("lawyers")
    .select("*")
    .eq("status", "active")
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return data.map((lawyer) => ({
    ...lawyer,
    biography: locale === "id" ? lawyer.biography_id : lawyer.biography_en,
    education: locale === "id" ? lawyer.education_id : lawyer.education_en,
    experience: locale === "id" ? lawyer.experience_id : lawyer.experience_en,
  }));
}

export async function getLawyerBySlug(
  slug: string,
  locale: "id" | "en" = "id"
) {
  // Implementation
}

// lib/api/articles.ts
export async function getArticles(
  locale: "id" | "en" = "id",
  filters?: {
    category?: string;
    tags?: string[];
    limit?: number;
  }
) {
  let query = supabase
    .from("articles")
    .select("*, category:categories(*), author:lawyers(*)")
    .eq("status", "published")
    .order("publish_date", { ascending: false });

  if (filters?.category) {
    query = query.eq("category_id", filters.category);
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;
  if (error) throw error;

  return data.map((article) => ({
    ...article,
    title: locale === "id" ? article.title_id : article.title_en,
    excerpt: locale === "id" ? article.excerpt_id : article.excerpt_en,
    content: locale === "id" ? article.content_id : article.content_en,
  }));
}

// Similar for events, jobs, etc.
```

##### Step 6: Update Components to Use Database (Day 4-5)

**Example: Articles Page**

```tsx
// app/[locale]/articles/page.tsx
import { getArticles } from "@/lib/api/articles";
import ArticleListPage from "@/components/ArticleListPage";

export default async function ArticlesPage({
  params: { locale },
}: {
  params: { locale: "id" | "en" };
}) {
  const articles = await getArticles(locale);

  return <ArticleListPage articles={articles} locale={locale} />;
}
```

##### Step 7: Cloudflare R2 Setup for File Storage (Day 6-7)

1. **Create R2 Bucket**

   - Go to Cloudflare Dashboard
   - Create R2 bucket: `ibml-assets`
   - Note: Access Key ID, Secret Access Key, Bucket URL

2. **Install AWS SDK (R2 is S3-compatible)**

```bash
bun add @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

3. **R2 Client Setup**

```tsx
// lib/r2/client.ts
import { S3Client } from "@aws-sdk/client-s3";

export const r2Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export const R2_BUCKET = "ibml-assets";
export const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL;
```

4. **Upload Utility**

```tsx
// lib/r2/upload.ts
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2Client, R2_BUCKET, R2_PUBLIC_URL } from "./client";

export async function uploadFile(
  file: File,
  folder: string = "uploads"
): Promise<string> {
  const fileName = `${folder}/${Date.now()}-${file.name}`;
  const buffer = await file.arrayBuffer();

  await r2Client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: fileName,
      Body: Buffer.from(buffer),
      ContentType: file.type,
    })
  );

  return `${R2_PUBLIC_URL}/${fileName}`;
}
```

#### Acceptance Criteria

- [ ] Supabase project created and configured
- [ ] Database schema implemented
- [ ] RLS policies configured
- [ ] TypeScript types generated
- [ ] Data access layer implemented
- [ ] All pages fetching from database
- [ ] Cloudflare R2 configured for file storage
- [ ] Image upload working

---

# PART B: CMS DASHBOARD

## 3. CMS Development Plan 📋

**Status:** ⏳ Not Started  
**Priority:** Critical  
**Estimated Effort:** 15-20 days

### Phase 1: Foundation (Day 1-3)

#### Step 1: Project Setup

```bash
# Create new Vite project
bun create vite cms --template react-ts
cd cms

# Install dependencies
bun add @supabase/supabase-js
bun add @tanstack/react-query
bun add react-router-dom
bun add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
bun add lucide-react
bun add tailwindcss postcss autoprefixer
bun add -D @types/node

# Shadcn UI setup
bunx shadcn-ui@latest init
```

#### Step 2: Project Structure

```
cms/
├── src/
│   ├── components/
│   │   ├── ui/              # Shadcn components
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Layout.tsx
│   │   └── shared/
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   └── ForgotPassword.tsx
│   │   ├── dashboard/
│   │   │   └── Dashboard.tsx
│   │   ├── lawyers/
│   │   │   ├── LawyersList.tsx
│   │   │   └── LawyerForm.tsx
│   │   ├── articles/
│   │   ├── events/
│   │   ├── careers/
│   │   └── settings/
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── queryClient.ts
│   │   └── utils.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useToast.ts
│   ├── types/
│   │   └── database.ts
│   ├── App.tsx
│   └── main.tsx
└── package.json
```

### Phase 2: Authentication (Day 4-5)

**Implementation:**

- Supabase Auth integration
- Login page
- Protected routes
- Role-based access control
- Session management

### Phase 3: Dashboard & Layout (Day 6-7)

**Implementation:**

- Main dashboard layout
- Sidebar navigation
- Statistics widgets
- Recent activities
- Quick actions

### Phase 4: Content Modules (Day 8-15)

**Priority Order:**

1. **Lawyers Management** (Day 8-9)
2. **Articles Management** (Day 10-11)
3. **Events Management** (Day 12)
4. **Practice Areas Management** (Day 13)
5. **Careers Management** (Day 14)
6. **Contact Form Management** (Day 14)
7. **Media Library** (Day 15)

### Phase 5: Settings & Polish (Day 16-18)

**Implementation:**

- Site settings
- User management
- Email settings
- UI polish
- Error handling
- Loading states

### Phase 6: Testing & Deployment (Day 19-20)

**Tasks:**

- End-to-end testing
- Bug fixes
- Performance optimization
- Production deployment

---

## 4. Integration & Final Steps

### 4.1 Web Compro ↔ CMS Integration

- Real-time updates via Supabase
- Cache invalidation strategy
- ISR (Incremental Static Regeneration)

### 4.2 Email Notifications

- Setup email service (Resend/SendGrid)
- Contact form notifications
- Job application notifications
- Password reset emails

### 4.3 Deployment

- Web Compro: Vercel
- CMS: Vercel/Netlify
- Database: Supabase (managed)
- Storage: Cloudflare R2

---

## 5. Timeline Summary

| Phase                          | Duration       | Status         |
| :----------------------------- | :------------- | :------------- |
| **Web Compro - Dual Language** | 3-4 days       | ⏳ Not Started |
| **Web Compro - SEO**           | 2-3 days       | ⏳ Not Started |
| **Database Setup**             | 5-7 days       | ⏳ Not Started |
| **CMS Development**            | 15-20 days     | ⏳ Not Started |
| **Integration & Testing**      | 3-5 days       | ⏳ Not Started |
| **Deployment & Handover**      | 2-3 days       | ⏳ Not Started |
| **TOTAL**                      | **30-42 days** |                |

---

## 6. Next Actions

### Immediate Priorities (Week 1)

1. ✅ Complete Web Compro pages (DONE)
2. 🎯 Implement Dual Language System
3. 🎯 Add SEO Meta Tags
4. 🎯 Setup Supabase Database

### Short-term (Week 2-3)

1. Database integration for Web Compro
2. Start CMS development (Auth + Dashboard)
3. Implement core CMS modules

### Medium-term (Week 4-6)

1. Complete all CMS modules
2. Integration testing
3. Content migration
4. UAT with client

---

_Last Updated: 12 Januari 2026_
