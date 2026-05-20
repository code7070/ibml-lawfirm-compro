import ArticleDetailPageComponent from "@/components/ArticleDetailPage";
import { articlesService } from "@/services";
import { notFound } from "next/navigation";
import { Article as ViewArticle } from "@/types";
import { Metadata } from "next";
import { formatArticleDate } from "@/lib/date-utils";

export const revalidate = 3600; // one hour

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://iblmlaw.com";
const META_IMAGE_PATH = "/images/meta-image-iblm.jpg";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const isId = locale === "id";
  const { data: article } = await articlesService.getByIdentifier(id);

  if (!article) return { title: "Article Not Found" };

  const title = isId ? article.title_id : article.title_en;
  const desc = isId
    ? article.meta_description_id || article.excerpt_id
    : article.meta_description_en || article.excerpt_en;

  const url = `${BASE_URL}/${locale}/insights/${id}`;
  const imageUrl = article.cover_url || `${BASE_URL}${META_IMAGE_PATH}`;

  return {
    title: `${title} | IBLM Law Group`,
    description: desc || undefined,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
      languages: {
        en: `/en/insights/${id}`,
        id: `/id/insights/${id}`,
      },
    },
    openGraph: {
      type: "article",
      locale: isId ? "id_ID" : "en_US",
      url,
      title: `${title} | IBLM Law Group`,
      description: desc || undefined,
      siteName: "IBLM Law Group",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: article.published_at || article.created_at || undefined,
      authors: [article.author?.name_en || "IBLM Law Group"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | IBLM Law Group`,
      description: desc || undefined,
      images: [imageUrl],
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { id, locale } = await params;
  const isId = locale === "id";

  // Fetch article by slug or ID (prevents 404 when links use UUID instead of slug)
  const { data: article } = await articlesService.getByIdentifier(id);

  if (!article) {
    notFound();
  }

  // Fetch related
  const { data: relatedData } = await articlesService.getRelated(article.id);

  // Map Article
  const viewArticle: ViewArticle = {
    id: article.slug || article.id,
    title: isId ? article.title_id : article.title_en,
    date: formatArticleDate(article.published_at, article.created_at, locale) || '',
    category:
      (isId ? article.category?.name_id : article.category?.name_en) ||
      "Uncategorized",
    image:
      article.cover_url ||
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=2000",
    summary: (isId ? article.excerpt_id : article.excerpt_en) || "",
    author:
      (isId ? article.author?.name_id : article.author?.name_en) || "IBLM Team",
    authorImage: article.author?.photo_url ?? null,
    authorPosition:
      (isId ? article.author?.position_id : article.author?.position_en) ??
      null,
    content: (isId ? article.content_id : article.content_en) || "",
  };

  // Map Related
  const viewRelated: ViewArticle[] = (relatedData || []).map((a) => ({
    id: a.slug || a.id,
    title: isId ? a.title_id : a.title_en,
    date: formatArticleDate(a.published_at, a.created_at, locale) || '',
    category:
      (isId ? a.category?.name_id : a.category?.name_en) || "Uncategorized",
    image:
      a.cover_url ||
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=2000",
    summary: (isId ? a.excerpt_id : a.excerpt_en) || "",
    author: (isId ? a.author?.name_id : a.author?.name_en) || "IBLM Team",
    authorImage: a.author?.photo_url ?? null,
    authorPosition:
      (isId ? a.author?.position_id : a.author?.position_en) ?? null,
    content: "",
  }));

  return (
    <ArticleDetailPageComponent
      article={viewArticle}
      allArticles={viewRelated}
      locale={locale}
    />
  );
}
