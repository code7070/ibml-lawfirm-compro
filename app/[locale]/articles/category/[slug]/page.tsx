import ArticleCategoryPageComponent from "@/components/ArticleCategoryPage";
import {
  articlesService,
  articleCategoriesService,
} from "@/services";
import { Article as ViewArticle } from "@/types";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Locale } from "@/lib/dictionary";

export const revalidate = 300;

const PAGE_SIZE = 9;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://iblmlaw.com";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const isId = locale === "id";

  const { data: category } = await articleCategoriesService.getBySlug(slug);
  if (!category) return { title: "Category Not Found" };

  const categoryName = isId ? category.name_id : category.name_en;
  const title = `${categoryName} | Insights | IBLM Law Group`;
  const description = isId
    ? `Artikel dan analisis dalam kategori ${categoryName} dari IBLM Law Group.`
    : `Articles and analysis in the ${categoryName} category from IBLM Law Group.`;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}/articles/category/${slug}`,
      languages: {
        en: `/en/articles/category/${slug}`,
        id: `/id/articles/category/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      locale: isId ? "id_ID" : "en_US",
      url: `${BASE_URL}/${locale}/articles/category/${slug}`,
      title,
      description,
      siteName: "IBLM Law Group",
    },
  };
}

export default async function ArticleCategoryPage({ params }: Props) {
  const { slug, locale } = await params;
  const isId = locale === "id";

  // Fetch category by slug
  const { data: category } = await articleCategoriesService.getBySlug(slug);

  if (!category) {
    notFound();
  }

  // Fetch all active categories (for tabs) and initial articles in parallel
  const [categoriesResult, articlesResult] = await Promise.all([
    articleCategoriesService.getActive(),
    articlesService.getPublishedPaginated(1, PAGE_SIZE, {
      category_id: category.id,
    }),
  ]);

  const allCategories = categoriesResult.data || [];

  // Map categories to view model
  const viewCategories = allCategories.map((cat) => ({
    id: cat.id,
    slug: cat.slug,
    name: isId ? cat.name_id : cat.name_en,
  }));

  // Current category view model
  const viewCategory = {
    id: category.id,
    slug: category.slug,
    name: isId ? category.name_id : category.name_en,
  };

  // Map articles to view model
  const viewArticles: ViewArticle[] = articlesResult.data.map((article) => ({
    id: article.slug || article.id,
    title: isId ? article.title_id : article.title_en,
    date: new Date(
      article.published_at || article.created_at || "2024-01-01"
    ).toLocaleDateString(isId ? "id-ID" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    category:
      (isId ? article.category?.name_id : article.category?.name_en) ||
      "Uncategorized",
    image:
      article.cover_url ||
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=2000",
    summary: (isId ? article.excerpt_id : article.excerpt_en) || "",
    author: article.author?.name_en || "IBLM Team",
    content: null,
  }));

  return (
    <ArticleCategoryPageComponent
      category={viewCategory}
      categories={viewCategories}
      initialArticles={viewArticles}
      totalCount={articlesResult.count}
      categoryId={category.id}
      locale={locale}
    />
  );
}
