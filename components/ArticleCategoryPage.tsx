"use client";

import { useState, useCallback } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Article } from "../types";
import CTASection from "./CTASection";
import { LangLink } from "./LangLink";
import { useTranslations } from "@/hooks/useTranslations";
import ArticleSearchBar from "./ArticleSearchBar";
import { getSupabase } from "@/lib/supabase";
import ArticleEmptyState from "./ArticleEmptyState";
import { formatArticleDate } from "@/lib/date-utils";

const PAGE_SIZE = 9;

interface ViewCategory {
  id: string;
  slug: string;
  name: string;
}

interface ArticleCategoryPageProps {
  category: ViewCategory;
  categories: ViewCategory[];
  initialArticles: Article[];
  totalCount: number;
  categoryId: string;
  locale: string;
}

const ArticleCategoryPage = ({
  category,
  categories,
  initialArticles,
  totalCount,
  categoryId,
  locale,
}: ArticleCategoryPageProps) => {
  const t = useTranslations("articles");
  const isId = locale === "id";

  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const hasMore = articles.length < totalCount;

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const from = (nextPage - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("articles")
        .select(
          `
          *,
          category:article_categories(*),
          author:lawyers(*)
        `,
        )
        .eq("is_published", true)
        .eq("category_id", categoryId)
        .order("published_at", { ascending: false })
        .range(from, to);

      if (error) throw error;

      if (data && data.length > 0) {
        const newArticles: Article[] = data.map((article) => ({
          id: article.slug || article.id,
          title: isId ? article.title_id : article.title_en,
          date: formatArticleDate(article.published_at, article.created_at, locale) || '',
          category:
            (isId
              ? (article.category as { name_id?: string })?.name_id
              : (article.category as { name_en?: string })?.name_en) ||
            "Uncategorized",
          image:
            article.cover_url ||
            "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=2000",
          summary: (isId ? article.excerpt_id : article.excerpt_en) || "",
          author:
            (article.author as { name_en?: string })?.name_en || "IBLM Team",
          content: "",
        }));

        setArticles((prev) => [...prev, ...newArticles]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading more articles:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, categoryId, isId]);

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Header */}
      <section className="bg-[#0B1B3B] text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <span className="text-[#D4C5A0] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
            {t("hero.tags")}
          </span>
          <h1 className="text-5xl md:text-7xl font-light mb-4">
            {category.name}
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
            {t("articlesIn")} {category.name}
          </p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 border-b border-[#0B1B3B]/10 pb-8">
            {/* Categories */}
            {/* Outer: full-viewport scroll container */}
            <div className="w-screen overflow-x-auto md:overflow-x-visible scrollbar-hide -mx-[calc(50vw-50%)] px-2 md:mx-0">
              {/* Inner: content-aligned tab container */}
              <div className="flex gap-2 md:gap-4 md:flex-wrap px-[calc(50vw-50%)] md:px-0 w-max md:w-auto">
                {/* "All" tab */}
                <LangLink
                  href="/insights"
                  className="px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-full border bg-transparent text-[#2E4472] border-transparent hover:border-[#2E4472]/30"
                >
                  {t("all")}
                </LangLink>

                {categories.map((cat) => (
                  <LangLink
                    key={cat.id}
                    href={`/insights/category/${cat.slug}`}
                    className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-full border ${
                      cat.slug === category.slug
                        ? "bg-[#0B1B3B] text-white border-[#0B1B3B]"
                        : "bg-transparent text-[#2E4472] border-transparent hover:border-[#2E4472]/30"
                    }`}
                  >
                    {cat.name}
                  </LangLink>
                ))}
              </div>
            </div>

            {/* Search — always redirects to /articles?search= */}
            <ArticleSearchBar />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {articles.map((article) => (
              <LangLink
                key={article.id}
                href={`/insights/${article.id}`}
                className="group cursor-pointer flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden mb-8 border border-[#0B1B3B]/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-0 left-0 bg-[#0B1B3B] text-white text-xs font-bold uppercase tracking-wider px-4 py-2">
                    {article.category}
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <p className="text-gray-500 text-xs mb-3 font-mono tracking-wide">
                    {article.date}
                  </p>

                  <h3 className="text-2xl font-serif text-[#0B1B3B] mb-4 leading-tight group-hover:text-[#2E4472] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-[#2E4472] font-light text-sm leading-relaxed mb-6 line-clamp-3">
                    {article.summary}
                  </p>

                  <div className="mt-auto pt-4 border-t border-[#0B1B3B]/10">
                    <div className="inline-flex items-center gap-2 text-[#D4C5A0] text-sm font-bold uppercase tracking-widest group-hover:text-[#0B1B3B] transition-colors">
                      {t("readMore")} <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </LangLink>
            ))}
          </div>

          {/* Empty State */}
          {articles.length === 0 && <ArticleEmptyState type="category" />}

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center mt-16 pt-8 border-t border-[#0B1B3B]/10">
              <button
                onClick={loadMore}
                disabled={loading}
                className="inline-flex items-center gap-2 px-8 py-3 text-xs font-bold uppercase tracking-widest border border-[#0B1B3B] text-[#0B1B3B] hover:bg-[#0B1B3B] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t("loading")}
                  </>
                ) : (
                  t("loadMore")
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default ArticleCategoryPage;
