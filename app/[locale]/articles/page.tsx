import ArticleListPageComponent from "@/components/ArticleListPage";
import { articlesService } from "@/services";
import { Article as ViewArticle } from "@/types";

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isId = locale === 'id';

  // Fetch articles
  const { data: articles } = await articlesService.getPublishedPaginated(1, 100);

  // Map to View Model
  const viewArticles: ViewArticle[] = articles.map(article => ({
    id: article.slug || article.id,
    title: isId ? article.title_id : article.title_en,
    date: new Date(article.published_at || article.created_at || Date.now()).toLocaleDateString(isId ? 'id-ID' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    category: (isId ? article.category?.name_id : article.category?.name_en) || 'Uncategorized',
    image: article.cover_url || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=2000', // Fallback legal image
    summary: (isId ? article.excerpt_id : article.excerpt_en) || '',
    author: article.author?.name_en || 'IBLM Team',
    content: null, 
  }));

  return <ArticleListPageComponent articles={viewArticles} />;
}
