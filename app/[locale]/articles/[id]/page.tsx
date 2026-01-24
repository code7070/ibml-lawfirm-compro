import ArticleDetailPageComponent from "@/components/ArticleDetailPage";
import { articlesService } from "@/services";
import { notFound } from "next/navigation";
import { Article as ViewArticle } from "@/types";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const isId = locale === 'id';
  const { data: article } = await articlesService.getBySlugWithDetails(id);

  if (!article) return { title: 'Article Not Found' };

  const title = isId ? article.title_id : article.title_en;
  const desc = isId ? article.meta_description_id || article.excerpt_id : article.meta_description_en || article.excerpt_en;

  return {
    title: `${title} - IBLM Law Firm`,
    description: desc,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { id, locale } = await params;
  const isId = locale === 'id';

  // Fetch article
  const { data: article } = await articlesService.getBySlugWithDetails(id);

  if (!article) {
    notFound();
  }

  // Fetch related
  const { data: relatedData } = await articlesService.getRelated(article.id);
  
  // Map Article
  const viewArticle: ViewArticle = {
    id: article.slug || article.id,
    title: isId ? article.title_id : article.title_en,
    date: new Date(article.published_at || article.created_at || Date.now()).toLocaleDateString(isId ? 'id-ID' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    category: (isId ? article.category?.name_id : article.category?.name_en) || 'Uncategorized',
    image: article.cover_url || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=2000',
    summary: (isId ? article.excerpt_id : article.excerpt_en) || '',
    author: article.author?.name_en || 'IBLM Team',
    content: (
        <div dangerouslySetInnerHTML={{ __html: (isId ? article.content_id : article.content_en) || '' }} />
    ),
  };

  // Map Related
  const viewRelated: ViewArticle[] = relatedData.map(a => ({
    id: a.slug || a.id,
    title: isId ? a.title_id : a.title_en,
    date: new Date(a.published_at || a.created_at || Date.now()).toLocaleDateString(isId ? 'id-ID' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    category: (isId ? a.category?.name_id : a.category?.name_en) || 'Uncategorized',
    image: a.cover_url || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=2000',
    summary: (isId ? a.excerpt_id : a.excerpt_en) || '',
    author: a.author?.name_en || 'IBLM Team',
    content: null,
  }));

  return (
    <ArticleDetailPageComponent article={viewArticle} allArticles={viewRelated} />
  );
}
