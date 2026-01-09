import Navbar from "../../../components/Navbar";
import ArticleDetailPageComponent from "../../../components/ArticleDetailPage";
import Footer from "../../../components/Footer";
import { ARTICLE_DATA } from "../../../data/articles";
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
    <div className="min-h-screen bg-white text-[#0B1B3B] selection:bg-[#D4C5A0] selection:text-[#0B1B3B]">
      <Navbar />
      <main>
        <ArticleDetailPageComponent
          article={article}
          allArticles={ARTICLE_DATA}
        />
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return ARTICLE_DATA.map((article) => ({
    id: String(article.id),
  }));
}
