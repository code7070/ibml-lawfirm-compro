"use client";

import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { Article } from "../types";
import CTASection from "./CTASection";
import ArticleShareButton from "./ArticleShareButton";
import { LangLink } from "./LangLink";
import { useTranslations } from "@/hooks/useTranslations";

interface ArticleDetailPageProps {
  article: Article;
  allArticles: Article[];
  locale?: string;
}

const ArticleDetailPage = ({
  article,
  allArticles,
  locale = "en",
}: ArticleDetailPageProps) => {
  const t = useTranslations("articles");

  // Related articles are already backfilled by the service layer
  // to always return 3. We just exclude the current article as a safety net.
  const finalRelated = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* ━━━ Hero Image — Full Bleed, No Text Overlay ━━━ */}
      <div className="relative h-[55vh] min-h-[400px] lg:h-[65vh] lg:min-h-[500px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        {/* Subtle vignette — purely aesthetic, no text readability concern */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1B3B]/40 via-transparent to-[#0B1B3B]/20 pointer-events-none" />

        {/* Back navigation — floating pill over image */}
        <div className="absolute top-6 left-6 z-10">
          <LangLink
            href="/articles"
            className="
              inline-flex items-center gap-2 px-4 py-2
              bg-[#0B1B3B]/60 backdrop-blur-md
              text-white/90 hover:text-[#D4C5A0] hover:bg-[#0B1B3B]/80
              transition-all duration-300
              text-xs font-bold uppercase tracking-widest
              rounded-sm
            "
          >
            <ArrowLeft className="w-3.5 h-3.5" /> {t("backToAll")}
          </LangLink>
        </div>
      </div>

      {/* ━━━ Article Header Card — Rises Into Hero ━━━ */}
      <div className="relative z-10 -mt-20 lg:-mt-28">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-white pt-10 pb-8 px-8 lg:px-12 border-t-[3px] border-[#D4C5A0] shadow-[0_-20px_60px_rgba(11,27,59,0.12)]">
            {/* Category + Date */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-[#0B1B3B] text-[#D4C5A0] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em]">
                {article.category}
              </span>
              <span className="text-[#2E4472]/60 text-sm font-mono flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" /> {article.date}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-serif text-[#0B1B3B] leading-[1.15] mb-8 max-w-[90%]">
              {article.title}
            </h1>

            {/* Author + Share */}
            <div className="flex items-center justify-between border-t border-[#0B1B3B]/8 pt-6">
              <div className="flex items-center gap-4">
                {/* Author avatar: photo if available, fallback to initial */}
                {article.authorImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={article.authorImage}
                    alt={article.author}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-[#D4C5A0]/30"
                  />
                ) : (
                  <div className="w-11 h-11 bg-[#0B1B3B] rounded-full flex items-center justify-center text-[#D4C5A0] font-bold text-sm tracking-wide flex-shrink-0">
                    {article.author.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-[#0B1B3B]">
                    {article.author}
                  </p>
                  <p className="text-xs text-[#2E4472]/50 tracking-wide">
                    {article.authorPosition ?? "IBLM Law Group"}
                  </p>
                </div>
              </div>

              {/* Share button */}
              <ArticleShareButton
                title={article.title}
                summary={article.summary}
                variant="inline"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ━━━ Content Layout ━━━ */}
      <div className="max-w-[1400px] mx-auto px-6 py-20 grid lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <article
          className="lg:col-span-8 lg:col-start-3 rich-content max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Share / Sidebar (Sticky — Desktop only) */}
        <div className="lg:col-span-2 hidden lg:block sticky top-32 self-start pt-4">
          <ArticleShareButton
            title={article.title}
            summary={article.summary}
            variant="sidebar"
          />
        </div>
      </div>

      {/* ━━━ Related Intelligence — Editorial Magazine Layout ━━━ */}
      {finalRelated.length > 0 && (
        <section className="relative bg-[#0B1B3B] py-24 lg:py-32 px-6 overflow-hidden">
          {/* Background texture overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />

          {/* Decorative gold line — top border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4C5A0]/60 to-transparent" />

          <div className="max-w-[1400px] mx-auto relative z-10">
            {/* Section header */}
            <div className="flex items-end justify-between mb-16 lg:mb-20">
              <div>
                <span className="text-[#D4C5A0] font-bold tracking-[0.25em] text-[10px] uppercase mb-4 block">
                  {t("relatedIntelligence.tag")}
                </span>
                <h3 className="text-3xl lg:text-4xl font-light text-white leading-tight">
                  {t("relatedIntelligence.title")}
                </h3>
              </div>
              <LangLink
                href="/articles"
                className="hidden md:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D4C5A0]/70 hover:text-[#D4C5A0] transition-colors duration-300"
              >
                {t("relatedIntelligence.viewAll")}{" "}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </LangLink>
            </div>

            {/* ━━━ Card Grid — Featured first + two supporting ━━━ */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Featured card (first article — large) */}
              {finalRelated[0] && (
                <LangLink
                  href={`/articles/${finalRelated[0].id}`}
                  className="group lg:col-span-6 flex flex-col cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden mb-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={finalRelated[0].image}
                      alt={finalRelated[0].title}
                      className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3B]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#D4C5A0] text-[#0B1B3B] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em]">
                        {finalRelated[0].category}
                      </span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <p className="text-[#D4C5A0]/50 text-xs font-mono tracking-wide mb-3">
                      {finalRelated[0].date}
                    </p>
                    <h4 className="text-xl lg:text-2xl font-serif text-white leading-snug mb-4 group-hover:text-[#D4C5A0] transition-colors duration-300">
                      {finalRelated[0].title}
                    </h4>
                    {finalRelated[0].summary && (
                      <p className="text-white/40 text-sm font-light leading-relaxed line-clamp-2 mb-6">
                        {finalRelated[0].summary}
                      </p>
                    )}
                    <div className="mt-auto pt-4 border-t border-white/10">
                      <span className="inline-flex items-center gap-2 text-[#D4C5A0] text-xs font-bold uppercase tracking-[0.2em] group-hover:gap-3 transition-all duration-300">
                        {t("readMore")} <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </LangLink>
              )}

              {/* Supporting cards (2nd + 3rd — stacked) */}
              <div className="lg:col-span-6 flex flex-col gap-6 lg:gap-8">
                {finalRelated.slice(1, 3).map((item) => (
                  <LangLink
                    key={item.id}
                    href={`/articles/${item.id}`}
                    className="group flex flex-col sm:flex-row gap-5 cursor-pointer"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-full sm:w-48 md:w-56 lg:w-60 flex-shrink-0 aspect-[16/10] sm:aspect-[4/3] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                      />
                      {/* Subtle overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3B]/40 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-500" />
                      {/* Category badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#D4C5A0] text-[#0B1B3B] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.15em]">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-center py-1">
                      <p className="text-[#D4C5A0]/50 text-xs font-mono tracking-wide mb-2">
                        {item.date}
                      </p>
                      <h4 className="text-lg font-serif text-white leading-snug mb-3 group-hover:text-[#D4C5A0] transition-colors duration-300">
                        {item.title}
                      </h4>
                      {item.summary && (
                        <p className="text-white/35 text-sm font-light leading-relaxed line-clamp-2 mb-3 hidden sm:block">
                          {item.summary}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-2 text-[#D4C5A0]/60 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-[#D4C5A0] group-hover:gap-3 transition-all duration-300">
                        {t("readMore")} <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </LangLink>
                ))}
              </div>
            </div>

            {/* Mobile view-all link */}
            <div className="mt-12 text-center md:hidden">
              <LangLink
                href="/articles"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D4C5A0]/70 hover:text-[#D4C5A0] transition-colors duration-300 border border-[#D4C5A0]/20 px-6 py-3 hover:border-[#D4C5A0]/50"
              >
                {t("relatedIntelligence.viewAll")}{" "}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </LangLink>
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </div>
  );
};

export default ArticleDetailPage;
