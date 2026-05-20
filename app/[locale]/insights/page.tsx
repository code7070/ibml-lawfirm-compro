import ArticleListPageComponent from "@/components/ArticleListPage";
import { articlesService, articleCategoriesService } from "@/services";
import { Article as ViewArticle } from "@/types";
import { generatePageMetadata } from "@/lib/metadata";
import { Locale } from "@/lib/dictionary";
import { formatArticleDate } from "@/lib/date-utils";

export const revalidate = 3600; // one hour

const PAGE_SIZE = 9;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as Locale,
    page: "articles",
    path: "/insights",
  });
}

interface ArticlesPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ search?: string }>;
}

export default async function ArticlesPage({
  params,
  searchParams,
}: ArticlesPageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const isId = locale === "id";

  // Search query from URL — only passed to client, NOT used for SSR fetch
  const searchQuery = resolvedSearchParams.search || "";

  // Fetch categories and initial articles (no search filter) in parallel
  const [categoriesResult, articlesResult] = await Promise.all([
    articleCategoriesService.getActive(),
    articlesService.getPublishedPaginated(1, PAGE_SIZE),
  ]);

  const categories = categoriesResult.data || [];

  // Map categories to view model
  const viewCategories = categories.map((cat) => ({
    id: cat.id,
    slug: cat.slug,
    name: isId ? cat.name_id : cat.name_en,
  }));

  // Map articles to view model
  const viewArticles: ViewArticle[] = articlesResult.data.map((article) => ({
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
    content: "",
  }));

  return (
    <ArticleListPageComponent
      articles={viewArticles}
      categories={viewCategories}
      totalCount={articlesResult.count}
      searchQuery={searchQuery}
      locale={locale}
    />
  );
}
