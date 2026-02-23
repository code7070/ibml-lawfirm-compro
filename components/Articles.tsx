"use client";

import Button from "./Button";
import { ArrowUpRight } from "lucide-react";
import { ArticleWithCategory } from "@/lib/types/database";
import Link from "next/link";

interface ArticlesProps {
  articles: ArticleWithCategory[];
  locale?: string;
}

const Articles = ({ articles, locale = "en" }: ArticlesProps) => {
  // Only show first 3
  const displayedArticles = articles.slice(0, 3);

  if (displayedArticles.length === 0) return null;

  return (
    <section
      id="articles"
      className="py-32 bg-[#F5F5F7] border-t border-[#0B1B3B]/5"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-[#0B1B3B] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
              Intelligence
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-[#0B1B3B]">
              Latest Insights
            </h2>
          </div>
          <Button
            variant="secondary"
            className="hidden md:inline-flex"
            href="/articles"
          >
            View Library
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {displayedArticles.map((article) => {
            const title = locale === "id" ? article.title_id : article.title_en;
            const categoryName = article.category
              ? locale === "id"
                ? article.category.name_id
                : article.category.name_en
              : null;
            const authorName = article.author
              ? (locale === "id" ? article.author.name_id : article.author.name_en)
              : null;
            const publishedDate = article.published_at
              ? new Date(article.published_at).toLocaleDateString(
                  locale === "id" ? "id-ID" : "en-US",
                  { year: "numeric", month: "long", day: "numeric" }
                )
              : null;

            return (
              <Link
                key={article.id}
                href={`/${locale}/articles/${article.slug}`}
                className="group cursor-pointer block"
              >
                <div className="relative h-64 overflow-hidden mb-8 border border-[#0B1B3B]/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.cover_url || "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800"}
                    alt={title || "Article"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  {categoryName && (
                    <div className="absolute top-0 left-0 bg-[#0B1B3B] text-white text-xs font-bold uppercase tracking-wider px-4 py-2">
                      {categoryName}
                    </div>
                  )}
                </div>

                <div className="pr-4">
                  {(publishedDate || authorName) && (
                    <p className="text-gray-400 text-xs mb-3 font-mono tracking-wide">
                      {publishedDate}
                      {publishedDate && authorName && " / BY "}
                      {authorName && authorName.toUpperCase()}
                    </p>
                  )}

                  <h3 className="text-2xl font-serif text-[#0B1B3B] mb-6 leading-tight group-hover:text-[#2E4472] transition-colors">
                    {title}
                  </h3>

                  <div className="inline-flex items-center gap-2 text-[#D4C5A0] text-sm font-bold uppercase tracking-widest border-b border-transparent group-hover:border-[#D4C5A0] pb-1 transition-all">
                    Read Analysis <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 md:hidden text-center">
          <Button variant="secondary" href="/articles">
            View Library
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Articles;
