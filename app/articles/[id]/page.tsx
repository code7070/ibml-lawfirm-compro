import ArticleDetailPageComponent from "@/components/ArticleDetailPage";
import { ARTICLE_DATA } from "@/data/articles";
import { notFound } from "next/navigation";

interface ArticleDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { id } = await params;
  const article = ARTICLE_DATA.find((a) => String(a.id) === id);

  if (!article) {
    notFound();
  }

  return (
    <ArticleDetailPageComponent article={article} allArticles={ARTICLE_DATA} />
  );
}

export async function generateStaticParams() {
  return ARTICLE_DATA.map((article) => ({
    id: String(article.id),
  }));
}
