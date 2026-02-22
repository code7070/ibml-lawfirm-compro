import type { MetadataRoute } from "next";
import { articlesService } from "@/services/articles.service";
import { eventsService } from "@/services/events.service";
import { articleCategoriesService } from "@/services/article-categories.service";
import { practiceAreasService } from "@/services/practice-areas.service";
import { jobsService } from "@/services/jobs.service";
import { locales } from "@/lib/dictionary";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://iblmlaw.com";

// Static routes per locale — no [id] or [slug] dynamic segment
const STATIC_ROUTES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/lawyers", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/practice-areas", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/articles", priority: 0.8, changeFrequency: "daily" as const },
  { path: "/events", priority: 0.75, changeFrequency: "weekly" as const },
  { path: "/careers", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // ─── 1. Static routes (all locales) ────────────────────────────────────────
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.flatMap(
    ({ path, priority, changeFrequency }) =>
      locales.map((locale) => ({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${path}`])
          ),
        },
      }))
  );

  // ─── 2. Fetch all dynamic data in parallel ──────────────────────────────────
  const [
    articlesResult,
    eventsResult,
    categoriesResult,
    practiceAreasResult,
    jobsResult,
  ] = await Promise.allSettled([
    articlesService.getPublished(),
    eventsService.getAll(),
    articleCategoriesService.getActive(),
    practiceAreasService.getActive(),
    jobsService.getOpen(),
  ]);

  // ─── 3. Articles — /[locale]/articles/[slug] ────────────────────────────────
  const articles =
    articlesResult.status === "fulfilled" && articlesResult.value.data
      ? articlesResult.value.data
      : [];

  const articleEntries: MetadataRoute.Sitemap = articles.flatMap((article) => {
    const identifier = article.slug || article.id;
    const lastMod = article.updated_at
      ? new Date(article.updated_at)
      : article.published_at
        ? new Date(article.published_at)
        : now;

    return locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/articles/${identifier}`,
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}/articles/${identifier}`])
        ),
      },
    }));
  });

  // ─── 4. Events — /[locale]/events/[id] ─────────────────────────────────────
  const events =
    eventsResult.status === "fulfilled" && eventsResult.value.data
      ? eventsResult.value.data
      : [];

  const eventEntries: MetadataRoute.Sitemap = events.flatMap((event) => {
    const lastMod = event.updated_at ? new Date(event.updated_at) : now;

    return locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/events/${event.id}`,
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.65,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}/events/${event.id}`])
        ),
      },
    }));
  });

  // ─── 5. Article categories — /[locale]/articles/category/[slug] ────────────
  const categories =
    categoriesResult.status === "fulfilled" && categoriesResult.value.data
      ? categoriesResult.value.data
      : [];

  const categoryEntries: MetadataRoute.Sitemap = categories.flatMap(
    (category) => {
      const lastMod = category.updated_at ? new Date(category.updated_at) : now;

      return locales.map((locale) => ({
        url: `${BASE_URL}/${locale}/articles/category/${category.slug}`,
        lastModified: lastMod,
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [
              l,
              `${BASE_URL}/${l}/articles/category/${category.slug}`,
            ])
          ),
        },
      }));
    }
  );

  // ─── 6. Practice areas — /[locale]/practice-areas#[slug] ───────────────────
  // Note: Practice areas are anchor-based on a single listing page,
  // but we generate individual entries per area for discoverability.
  const practiceAreas =
    practiceAreasResult.status === "fulfilled" && practiceAreasResult.value.data
      ? practiceAreasResult.value.data
      : [];

  const practiceAreaEntries: MetadataRoute.Sitemap = practiceAreas.flatMap(
    (area) => {
      if (!area.slug) return [];
      const lastMod = area.updated_at ? new Date(area.updated_at) : now;

      return locales.map((locale) => ({
        url: `${BASE_URL}/${locale}/practice-areas#${area.slug}`,
        lastModified: lastMod,
        changeFrequency: "monthly" as const,
        priority: 0.55,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [
              l,
              `${BASE_URL}/${l}/practice-areas#${area.slug}`,
            ])
          ),
        },
      }));
    }
  );

  // ─── 7. Job openings — /[locale]/careers#[slug] ────────────────────────────
  // Careers page is a listing page; jobs are anchor-linked per opening.
  const jobs =
    jobsResult.status === "fulfilled" && jobsResult.value.data
      ? jobsResult.value.data
      : [];

  const jobEntries: MetadataRoute.Sitemap = jobs.flatMap((job) => {
    const identifier = job.slug || job.id;
    const lastMod = job.updated_at ? new Date(job.updated_at) : now;

    return locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/careers#${identifier}`,
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.5,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}/careers#${identifier}`])
        ),
      },
    }));
  });

  // ─── Combine all entries ────────────────────────────────────────────────────
  return [
    ...staticEntries,
    ...articleEntries,
    ...eventEntries,
    ...categoryEntries,
    ...practiceAreaEntries,
    ...jobEntries,
  ];
}
