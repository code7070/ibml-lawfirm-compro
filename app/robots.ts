import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://iblmlaw.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all well-behaved bots
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",          // Internal API routes
          "/_next/",        // Next.js internals
          "/fonts/",        // Font assets
        ],
      },
      {
        // Block common aggressive scrapers / AI training crawlers
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "anthropic-ai",
          "ClaudeBot",
          "CCBot",
          "Omgilibot",
          "FacebookBot",
        ],
        disallow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
