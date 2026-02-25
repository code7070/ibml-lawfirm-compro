"use client";

import { useEffect, ReactNode } from "react";
import {
  HandHeart,
  ArrowRight,
  Building,
  Users,
  Library,
  Landmark,
  Globe,
  Cpu,
  Shield,
  FileText,
  Flame,
  Binary,
  Gavel,
} from "lucide-react";
import CTASection from "./CTASection";
import { LangLink } from "./LangLink";
import { ArticleWithCategory } from "@/lib/types/database";
import { useTranslations } from "@/hooks/useTranslations";
import Image from "next/image";

interface ServicesPageProps {
  articles?: ArticleWithCategory[];
  locale?: string;
  clientsTickerSection?: ReactNode;
  affiliationsTickerSection?: ReactNode;
}

const ACADEMIC_PARTNERS = [
  { id: 1, nameKey: "partner1", icon: <Library size={24} /> },
  { id: 2, nameKey: "partner2", icon: <Building size={24} /> },
  { id: 3, nameKey: "partner3", icon: <Landmark size={24} /> },
  { id: 4, nameKey: "partner4", icon: <Cpu size={24} /> },
  { id: 5, nameKey: "partner5", icon: <Shield size={24} /> },
  { id: 6, nameKey: "partner6", icon: <Globe size={24} /> },
];

const ServicesPage = ({
  articles = [],
  locale = "en",
  clientsTickerSection,
  affiliationsTickerSection,
}: ServicesPageProps) => {
  const t = useTranslations("services");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use the Research articles if available, otherwise use latest 3 articles
  const researchArticles = (() => {
    const research = articles.filter((a) => {
      const catName = locale === "id" ? a.category?.name_id : a.category?.name_en;
      return catName?.toLowerCase().includes("research");
    });
    return (research.length > 0 ? research : articles).slice(0, 3);
  })();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#0B1B3B] text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <span className="text-[#D4C5A0] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">
            {t("hero.tags")}
          </span>
          <h1 className="text-5xl md:text-7xl font-light mb-8">
            {t("hero.title")}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Client Ticker */}
      {clientsTickerSection}

      {/* --- PILLAR 1: PRO BONO --- */}
      <section className="py-32 px-6 bg-white relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 mb-24">
            {/* Left Column - Text & Stats */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#F5F5F7] text-[#0B1B3B] rounded-full text-xs font-bold uppercase tracking-widest mb-8">
                <HandHeart size={16} className="text-[#D4C5A0]" />
                {t("probono.badge")}
              </div>
              <h2 className="text-5xl font-light text-[#0B1B3B] mb-8 font-serif italic">
                {/*{t("probono.title")}*/}
                Pro-Bono Service
              </h2>
              <p className="text-[#2E4472] text-lg font-light leading-relaxed mb-8">
                {t("probono.description")}
              </p>

              <div className="flex items-center gap-12 pt-8 border-t border-[#F5F5F7]">
                <div>
                  <p className="text-4xl font-light text-[#0B1B3B] mb-1">
                    {t("probono.hoursNumber")}
                  </p>
                  <p className="text-[10px] font-bold text-[#D4C5A0] uppercase tracking-widest">
                    {t("probono.hoursLabel")}
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-light text-[#0B1B3B] mb-1">
                    {t("probono.orgsNumber")}
                  </p>
                  <p className="text-[10px] font-bold text-[#D4C5A0] uppercase tracking-widest">
                    {t("probono.orgsLabel")}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Service Cards */}
            <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
              {[
                {
                  titleKey: "card1Title",
                  descKey: "card1Desc",
                  tagKey: "card1Tag",
                  icon: <Flame size={24} />,
                },
                {
                  titleKey: "card2Title",
                  descKey: "card2Desc",
                  tagKey: "card2Tag",
                  icon: <Gavel size={24} />,
                },
                {
                  titleKey: "card3Title",
                  descKey: "card3Desc",
                  tagKey: "card3Tag",
                  icon: <Shield size={24} />,
                },
                {
                  titleKey: "card4Title",
                  descKey: "card4Desc",
                  tagKey: "card4Tag",
                  icon: <Users size={24} />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group p-8 bg-[#F5F5F7] border border-transparent hover:border-[#D4C5A0] hover:bg-white transition-all duration-500 shadow-sm hover:shadow-2xl"
                >
                  <div className="text-[#D4C5A0] mb-6 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                    {t(`probono.${item.tagKey}`)}
                  </span>
                  <h3 className="text-xl font-bold text-[#0B1B3B] mb-4">
                    {t(`probono.${item.titleKey}`)}
                  </h3>
                  <p className="text-sm text-[#2E4472] font-light leading-relaxed">
                    {t(`probono.${item.descKey}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility Callout */}
          <div className="bg-[#0B1B3B] p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <h3 className="text-2xl font-light text-white mb-2">
                  {t("probono.calloutTitle")}
                </h3>
                <p className="text-gray-400 font-light text-sm">
                  {t("probono.calloutDesc")}
                </p>
              </div>
              <LangLink
                href="/contact"
                className="px-8 py-4 bg-[#D4C5A0] text-[#0B1B3B] text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors shrink-0"
              >
                {t("probono.applyForAid")}
              </LangLink>
            </div>
          </div>
        </div>
      </section>

      {/* --- PILLAR 2: RESEARCH --- */}
      <section className="py-32 px-6 bg-[#F5F5F7] border-y border-[#0B1B3B]/5 relative">
        <div className="max-w-[1400px] mx-auto">
          {/* Centered Header */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white text-[#0B1B3B] rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-[#0B1B3B]/5 shadow-sm">
              <Binary size={16} className="text-[#D4C5A0]" />
              {t("research.badge")}
            </div>
            <h2 className="text-5xl font-light text-[#0B1B3B] mb-6">
              {t("research.titlePrefix")}{" "}
              <span className="font-serif italic text-[#2E4472]">
                {t("research.titleAccent")}
              </span>
            </h2>
            <p className="text-[#2E4472] font-light">
              {t("research.description")}
            </p>
          </div>

          {/* Research Articles Grid */}
          {researchArticles.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8 ">
              {researchArticles.map((article) => {
                const title = locale === "id" ? article.title_id : article.title_en;
                const excerpt = locale === "id" ? article.excerpt_id : article.excerpt_en;
                const categoryName = article.category
                  ? locale === "id"
                    ? article.category.name_id
                    : article.category.name_en
                  : null;

                return (
                  <LangLink
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="group bg-white flex flex-col h-full shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.cover_url || "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800"}
                        alt={title || "Article"}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-[#0B1B3B]/20 mix-blend-multiply" />
                      <div className="absolute top-4 left-4 bg-[#0B1B3B] text-[#D4C5A0] p-2">
                        <FileText size={20} />
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 mb-4">
                        {categoryName && (
                          <span className="text-[10px] font-bold text-[#D4C5A0] uppercase tracking-widest">
                            {categoryName}
                          </span>
                        )}
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span className="text-[10px] text-gray-400 font-mono">
                          {t("research.readTime")}
                        </span>
                      </div>
                      <h3 className="text-xl font-serif text-[#0B1B3B] mb-4 group-hover:text-[#D4C5A0] transition-colors leading-tight line-clamp-4">
                        {title}
                      </h3>
                      <p className="text-sm text-gray-500 font-light mb-8 line-clamp-3">
                        {excerpt}
                      </p>
                      <div className="mt-auto flex items-center gap-2 text-[#0B1B3B] text-[10px] font-bold uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                        {t("research.accessAnalysis")}{" "}
                        <ArrowRight size={14} className="text-[#D4C5A0]" />
                      </div>
                    </div>
                  </LangLink>
                );
              })}
            </div>
          )}

          {/* Academic Collaborations */}
          {/*<div className="pt-20 border-t border-[#0B1B3B]/10">
            <h4 className="text-center text-[#D4C5A0] text-xs font-bold uppercase tracking-[0.3em] mb-12">
              {t("research.partnersTitle")}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {ACADEMIC_PARTNERS.map((partner) => (
                <div
                  key={partner.id}
                  className="flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#0B1B3B]/5 shadow-sm text-[#0B1B3B]">
                    {partner.icon}
                  </div>
                  <span className="text-[10px] font-bold text-[#0B1B3B] text-center uppercase tracking-wider">
                    {t(`research.${partner.nameKey}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>*/}
        </div>
      </section>

      {/* Org Ticker */}
      {affiliationsTickerSection}

      {/* --- REPUTATION / VALUES --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="w-full h-[500px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200"
                alt="Academic excellence"
                width={1200}
                height={800}
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#D4C5A0] p-8 hidden md:block">
              <p className="text-[#0B1B3B] text-3xl font-serif italic mb-2">
                {t("values.statNumber")}
              </p>
              <p className="text-[10px] font-bold text-[#0B1B3B] uppercase tracking-widest leading-relaxed">
                {t("values.statLabel")}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-4xl font-light text-[#0B1B3B] leading-tight font-serif italic">
              &ldquo;{t("values.quote")}&rdquo;
            </h3>
            <div className="w-16 h-1 bg-[#D4C5A0]" />
            <p className="text-[#2E4472] font-light text-lg leading-relaxed">
              {t("values.description")}
            </p>
            <LangLink
              href="/articles"
              className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[#0B1B3B] hover:text-[#D4C5A0] transition-colors"
            >
              {t("values.exploreLibrary")} <ArrowRight size={16} />
            </LangLink>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default ServicesPage;
