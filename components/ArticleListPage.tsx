"use client";

import { useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { Article } from "../types";
import CTASection from "./CTASection";
import Link from "next/link";

interface ArticleListPageProps {
  articles: Article[];
}

const categories = [
  "All",
  "Research",
  "Intellectual Property",
  "Esports",
  "Social Media",
  "Corporate",
];

const ArticleListPage = ({ articles }: ArticleListPageProps) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArticles =
    activeCategory === "All"
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Header */}
      <section className="bg-[#0B1B3B] text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <span className="text-[#D4C5A0] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
            IBLM Intelligence
          </span>
          <h1 className="text-5xl md:text-7xl font-light mb-8">
            Insights &{" "}
            <span className="font-serif italic text-[#D4C5A0]">Analysis</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
            Navigating the intersection of law, technology, and entertainment.
            Stay ahead of regulatory shifts and industry trends.
          </p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 border-b border-[#0B1B3B]/10 pb-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 md:gap-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-full border ${
                    activeCategory === cat
                      ? "bg-[#0B1B3B] text-white border-[#0B1B3B]"
                      : "bg-transparent text-[#2E4472] border-transparent hover:border-[#2E4472]/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search (Visual Only) */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Search archives..."
                className="bg-transparent border-b border-[#0B1B3B]/20 py-2 pl-2 pr-10 outline-none text-[#0B1B3B] placeholder-gray-400 focus:border-[#D4C5A0] w-full md:w-64 transition-colors"
              />
              <Search className="absolute right-0 top-2 w-4 h-4 text-gray-400 group-focus-within:text-[#D4C5A0]" />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
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
                      Read Analysis <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              No articles found in this category.
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default ArticleListPage;
