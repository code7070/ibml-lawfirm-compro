"use client";

import { useEffect } from "react";
import {
  BookOpen,
  HandHeart,
  Scale,
  CheckCircle2,
  ArrowRight,
  Building,
  GraduationCap,
  Users,
  Library,
  Landmark,
  Globe,
  Cpu,
  Shield,
} from "lucide-react";
import CTASection from "./CTASection";
import LogoTicker from "./LogoTicker";
import { LangLink } from "./LangLink";
import { Article, LogoItem } from "@/types";
import { useTranslations } from "@/hooks/useTranslations";

interface ServicesPageProps {
  articles?: Article[];
}

const ACADEMIC_PARTNERS: LogoItem[] = [
  { id: 1, name: "Harvard Law Tech", icon: <Library size={32} /> },
  { id: 2, name: "Stanford CIS", icon: <Building size={32} /> },
  { id: 3, name: "Oxford Internet Institute", icon: <Landmark size={32} /> },
  { id: 4, name: "MIT Media Lab", icon: <Cpu size={32} /> },
  { id: 5, name: "Future Privacy Forum", icon: <Shield size={32} /> },
  { id: 6, name: "Tech Policy Institute", icon: <Globe size={32} /> },
];

const ServicesPage = ({ articles = [] }: ServicesPageProps) => {
  const t = useTranslations("services");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use the Research articles, if available
  const researchArticles = articles
    .filter((a) => a.category === "Research")
    .slice(0, 2);

  // Eligibility criteria array for mapping
  const eligibilityCriteria = [
    t("probono.criteria1"),
    t("probono.criteria2"),
    t("probono.criteria3"),
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#1A2F5A] text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <span className="text-[#D4C5A0] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">
            {t("hero.tags")}
          </span>
          <h1 className="text-5xl md:text-7xl font-light mb-8">
            {t("hero.title")}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Pro Bono Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-[#D4C5A0]/20 rounded-full">
                <HandHeart
                  className="w-8 h-8 text-[#D4C5A0]"
                  strokeWidth={1.5}
                />
              </div>
              <h2 className="text-4xl font-serif text-[#0B1B3B]">
                {t("probono.title")}
              </h2>
            </div>

            <p className="text-[#2E4472] text-lg font-light leading-relaxed mb-8">
              {t("probono.description")}
            </p>

            <div className="space-y-6 mb-10">
              <h4 className="text-[#0B1B3B] font-bold text-sm uppercase tracking-widest">
                {t("probono.eligibilityTitle")}
              </h4>
              <ul className="space-y-4">
                {eligibilityCriteria.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[#2E4472] font-light"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#D4C5A0] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <LangLink
              href="/contact"
              className="inline-flex items-center gap-2 text-[#0B1B3B] font-bold border-b-2 border-[#D4C5A0] hover:text-[#D4C5A0] transition-colors pb-1 uppercase text-sm tracking-widest"
            >
              {t("probono.applyForAid")} <ArrowRight className="w-4 h-4" />
            </LangLink>
          </div>

          <div className="order-1 lg:order-2 relative h-[500px] bg-[#F5F5F7] border border-[#0B1B3B]/10 p-8 flex items-center justify-center">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "url('https://www.transparenttextures.com/patterns/cubes.png')",
              }}
            ></div>
            <div className="text-center relative z-10">
              <Users className="w-24 h-24 text-[#0B1B3B]/20 mx-auto mb-6" />
              <p className="text-4xl font-light text-[#0B1B3B] mb-2">{t("probono.hoursNumber")}</p>
              <p className="text-xs font-bold text-[#D4C5A0] uppercase tracking-widest">
                {t("probono.hoursLabel")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Academic Section */}
      <section className="bg-[#F5F5F7] border-t border-[#0B1B3B]/10">
        <div className="py-24 px-6 max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] bg-white border border-[#0B1B3B]/10 p-8 flex items-center justify-center shadow-xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4C5A0] opacity-10"></div>
            <div className="grid grid-cols-2 gap-8 w-full max-w-md">
              <div className="p-6 bg-[#F5F5F7] text-center border border-[#0B1B3B]/5">
                <GraduationCap className="w-10 h-10 text-[#1A2F5A] mx-auto mb-4" />
                <p className="text-sm font-bold text-[#0B1B3B]">
                  {t("research.academicPartners")}
                </p>
              </div>
              <div className="p-6 bg-[#F5F5F7] text-center border border-[#0B1B3B]/5">
                <BookOpen className="w-10 h-10 text-[#1A2F5A] mx-auto mb-4" />
                <p className="text-sm font-bold text-[#0B1B3B]">
                  {t("research.publishedPapers")}
                </p>
              </div>
              <div className="p-6 bg-[#F5F5F7] text-center border border-[#0B1B3B]/5">
                <Scale className="w-10 h-10 text-[#1A2F5A] mx-auto mb-4" />
                <p className="text-sm font-bold text-[#0B1B3B]">
                  {t("research.policyAdvisory")}
                </p>
              </div>
              <div className="p-6 bg-[#F5F5F7] text-center border border-[#0B1B3B]/5">
                <Building className="w-10 h-10 text-[#1A2F5A] mx-auto mb-4" />
                <p className="text-sm font-bold text-[#0B1B3B]">
                  {t("research.govtLiaison")}
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-[#D4C5A0]/20 rounded-full">
                <BookOpen
                  className="w-8 h-8 text-[#D4C5A0]"
                  strokeWidth={1.5}
                />
              </div>
              <h2 className="text-4xl font-serif text-[#0B1B3B]">
                {t("research.title")}
              </h2>
            </div>

            <p className="text-[#2E4472] text-lg font-light leading-relaxed mb-8">
              {t("research.description")}
            </p>

            {researchArticles.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                {researchArticles.map((article) => (
                  <LangLink
                    key={article.id}
                    href={`/articles/${article.id}`}
                    className="bg-white group cursor-pointer border border-[#0B1B3B]/5 hover:border-[#D4C5A0] transition-all shadow-sm flex flex-col"
                  >
                    <div className="h-32 overflow-hidden relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-[#D4C5A0] text-[0.65rem] font-bold uppercase tracking-widest mb-2">
                          {article.category}
                        </p>
                        <h4 className="text-sm font-serif text-[#0B1B3B] line-clamp-2 leading-tight group-hover:text-[#2E4472]">
                          {article.title}
                        </h4>
                      </div>
                    </div>
                  </LangLink>
                ))}
              </div>
            )}

            <LangLink
              href="/articles"
              className="inline-flex items-center gap-2 text-[#0B1B3B] font-bold border-b-2 border-[#D4C5A0] hover:text-[#D4C5A0] transition-colors pb-1 uppercase text-sm tracking-widest"
            >
              {t("research.viewArchive")} <ArrowRight className="w-4 h-4" />
            </LangLink>
          </div>
        </div>

        {/* Academic Partners Ticker */}
        <LogoTicker
          title={t("research.partnersTitle")}
          items={ACADEMIC_PARTNERS}
          theme="light"
        />
      </section>

      <CTASection />
    </div>
  );
};

export default ServicesPage;
