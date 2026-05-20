"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowUpRight, ArrowRight, X, Loader2 } from "lucide-react";
import Image from "next/image";
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

interface ArticleListPageProps {
  articles: Article[];
  categories: ViewCategory[];
  totalCount: number;
  searchQuery: string;
  locale: string;
}

const ArticleListPage = ({
  articles: initialArticles,
  categories,
  totalCount: initialTotalCount,
  searchQuery,
  locale,
}: ArticleListPageProps) => {
  const t = useTranslations("articles");
  const isId = locale === "id";

  // State
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeSearch, setActiveSearch] = useState(searchQuery);
  const searchInitialized = useRef(false);

  const hasMore = articles.length < totalCount;

  // Map raw Supabase article to view model
  const mapArticle = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (article: any): Article => ({
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
      author: (article.author as { name_en?: string })?.name_en || "IBLM Team",
      content: "",
    }),
    [isId],
  );

  // Fetch articles from Supabase (client-side)
  const fetchArticles = useCallback(
    async (pageNum: number, search?: string) => {
      const from = (pageNum - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const supabase = getSupabase();
      let query = supabase
        .from("articles")
        .select(
          `
          *,
          category:article_categories(*),
          author:lawyers(*)
        `,
          { count: "exact" },
        )
        .eq("is_published", true);

      if (search) {
        query = query.or(
          `title_id.ilike.%${search}%,title_en.ilike.%${search}%,excerpt_id.ilike.%${search}%,excerpt_en.ilike.%${search}%`,
        );
      }

      query = query.order("published_at", { ascending: false }).range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data || []).map(mapArticle),
        count: count || 0,
      };
    },
    [mapArticle],
  );

  // On mount: if searchQuery from URL, perform client-side search
  useEffect(() => {
    if (searchQuery && !searchInitialized.current) {
      searchInitialized.current = true;
      performSearch(searchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Perform search (reset & fetch)
  const performSearch = async (query: string) => {
    setIsSearching(true);
    setLoading(true);
    setActiveSearch(query);

    try {
      const result = await fetchArticles(1, query);
      setArticles(result.data);
      setTotalCount(result.count);
      setPage(1);
    } catch (error) {
      console.error("Error searching articles:", error);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  // Clear search: reset to initial SSR data
  const clearSearch = () => {
    setActiveSearch("");
    setArticles(initialArticles);
    setTotalCount(initialTotalCount);
    setPage(1);
    // Update URL without search param
    window.history.replaceState(null, "", `/${locale}/insights`);
  };

  // Load more articles (append)
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const result = await fetchArticles(nextPage, activeSearch || undefined);

      setArticles((prev) => [...prev, ...result.data]);
      setPage(nextPage);
    } catch (error) {
      console.error("Error loading more articles:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, fetchArticles, activeSearch]);

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Header */}
      <section className="bg-[#0B1B3B] text-white py-28 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2347] via-[#0B1B3B] to-[#0B1B3B]" />
        <div className="absolute inset-0 pattern-editorial" />
        <div className="absolute inset-0 noise-grain mix-blend-soft-light" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-[#D4C5A0] rounded-full blur-[160px] opacity-[0.08]" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="w-16 h-px bg-[#D4C5A0] mb-6" />

          <span className="text-[#D4C5A0] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
            {t("hero.tags")}
          </span>
          <h1 className="text-5xl md:text-7xl font-light mb-6">
            {t("hero.titleLead")}{" "}
            <span className="font-serif italic text-[#D4C5A0]">
              {t("hero.titleAccent")}
            </span>
          </h1>

          <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed pl-6 border-l border-white/10">
            {t("hero.subtitle")}
          </p>
        </div>

        <div className="hidden lg:block absolute right-16 top-[20%] h-[60%] w-px bg-gradient-to-b from-transparent via-[#D4C5A0]/15 to-transparent" />
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
                {/* "All" tab — active when no search */}
                <LangLink
                  href="/insights"
                  className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-full border ${
                    !activeSearch
                      ? "bg-[#0B1B3B] text-white border-[#0B1B3B]"
                      : "bg-transparent text-[#2E4472] border-transparent hover:border-[#2E4472]/30"
                  }`}
                >
                  {t("all")}
                </LangLink>

                {categories.map((cat) => (
                  <LangLink
                    key={cat.id}
                    href={`/insights/category/${cat.slug}`}
                    className="px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-full border bg-transparent text-[#2E4472] border-transparent hover:border-[#2E4472]/30"
                  >
                    {cat.name}
                  </LangLink>
                ))}
              </div>
            </div>

            {/* Search */}
            <ArticleSearchBar defaultValue={activeSearch} />
          </div>

          {/* Search Results Indicator */}
          {activeSearch && (
            <div className="flex items-center gap-3 mb-8 text-sm text-[#2E4472]">
              <span>
                {t("searchResults")}{" "}
                <strong className="text-[#0B1B3B]">
                  &ldquo;{activeSearch}&rdquo;
                </strong>
                {!isSearching && (
                  <span className="text-gray-400 ml-2">
                    ({totalCount} {totalCount === 1 ? "article" : "articles"})
                  </span>
                )}
              </span>
              <button
                onClick={clearSearch}
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#D4C5A0] hover:text-[#0B1B3B] transition-colors"
              >
                <X className="w-3 h-3" />
                {t("clearSearch")}
              </button>
            </div>
          )}

          {/* Loading state for initial search */}
          {isSearching ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#D4C5A0]" />
            </div>
          ) : (
            <>
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
              {articles.length === 0 && (
                <ArticleEmptyState
                  type="search"
                  searchQuery={activeSearch}
                  onClear={activeSearch ? clearSearch : undefined}
                />
              )}

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
            </>
          )}
        </div>
      </section>

      {/* --- VALUES / QUOTE SECTION (dipindahkan dari halaman Services) --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative lg:flex justify-end">
            <div className="relative max-w-[600px]">
              <div className="aspect-[1/1.5] overflow-hidden">
                <Image
                  src="https://iblam.ac.id/wp-content/uploads/2025/09/IBLAM-Justice-House.webp"
                  alt="Academic excellence"
                  width={1200}
                  height={800}
                  className="size-full object-cover grayscale"
                />
              </div>
              <div className="absolute size-full left-0 top-0 bg-gradient-to-br from-[#0b1b3b]/60 via-[#0b1b3b]/30 to-transparent mix-blend-multiply z-10" />
            </div>
            {/*<div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#D4C5A0] p-8 hidden md:block">
              <p className="text-[#0B1B3B] text-3xl font-serif italic mb-2">
                {t("values.statNumber")}
              </p>
              <p className="text-[10px] font-bold text-[#0B1B3B] uppercase tracking-widest leading-relaxed">
                {t("values.statLabel")}
              </p>
            </div>*/}
          </div>

          <div className="space-y-8">
            <h3 className="text-4xl font-light text-[#0B1B3B] leading-tight font-serif italic">
              &ldquo;{t("values.quote")}&rdquo;
            </h3>
            <div className="w-16 h-1 bg-[#D4C5A0]" />
            <p className="text-[#2E4472] font-light text-lg leading-relaxed">
              {t("values.description")}
            </p>
            {/*<LangLink
              href="/insights"
              className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[#0B1B3B] hover:text-[#D4C5A0] transition-colors"
            >
              {t("values.exploreLibrary")} <ArrowRight size={16} />
            </LangLink>*/}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default ArticleListPage;
