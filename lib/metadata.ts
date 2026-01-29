import { Metadata } from "next";
import { getDictionary, Locale } from "./dictionary";

export interface MetadataConfig {
  locale: Locale;
  page:
    | "default"
    | "home"
    | "about"
    | "lawyers"
    | "practiceAreas"
    | "services"
    | "contact"
    | "careers"
    | "events"
    | "articles";
  customTitle?: string;
  customDescription?: string;
  path?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://iblmlaw.com";
// const META_IMAGE_PATH = "/images/meta-image-iblm.jpg";

export async function generatePageMetadata(
  config: MetadataConfig,
): Promise<Metadata> {
  const { locale, page, customTitle, customDescription, path = "" } = config;

  const dict = await getDictionary(locale);

  // Get title and description from translations
  const title =
    customTitle || dict.meta[page]?.title || dict.meta.default.title;
  const description =
    customDescription ||
    dict.meta[page]?.description ||
    dict.meta.default.description;

  // Generate clean path (remove leading slash if present, then add it back)
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const fullPath = cleanPath === "/" ? "" : cleanPath;

  // Generate URL
  const url = `${BASE_URL}/${locale}${fullPath}`;

  // Generate image URL (absolute)
  // const imageUrl = `${BASE_URL}${META_IMAGE_PATH}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `/en${fullPath}`,
        id: `/id${fullPath}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "id_ID",
      url,
      title,
      description,
      siteName: "IBLM Law Group",
      // images: [{url: imageUrl,width: 1200,height: 630,alt: "IBLM Law Group - The Sophisticated Guardian",},],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      // images: [imageUrl],
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
