"use client";

import { useEffect, useState } from "react";
import {
  Target,
  Users,
  Zap,
  Briefcase,
  Brain,
  Globe,
  Shield,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import CTASection from "./CTASection";
import { useTranslations } from "@/hooks/useTranslations";
import { JobOpening } from "@/lib/types/database";

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <button
      onClick={handleCopy}
      title={copied ? "Copied!" : "Copy email address"}
      className="ml-2 inline-flex items-center justify-center text-[#0B1B3B] hover:text-[#D4C5A0] transition-colors"
      aria-label="Copy email to clipboard"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
};

interface CareerPageProps {
  jobs?: JobOpening[];
  locale?: string;
}

const CareerPage = ({ jobs = [], locale = "en" }: CareerPageProps) => {
  const t = useTranslations("career");

  const values = [
    {
      icon: Target,
      titleKey: "code.precision.title",
      descriptionKey: "code.precision.description",
    },
    {
      icon: Zap,
      titleKey: "code.digital.title",
      descriptionKey: "code.digital.description",
    },
    {
      icon: Users,
      titleKey: "code.collaborative.title",
      descriptionKey: "code.collaborative.description",
    },
  ];

  const SLIDE_DURATION = 5500;
  const carouselSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1600",
      quote: "Where sharp minds forge unshakeable standing.",
      alt: "Team Collaboration",
    },
    {
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1600",
      quote: "We don't hire résumés. We hire resolve.",
      alt: "Strategic Discussion",
    },
    {
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1600",
      quote: "Build a career as deliberate as the counsel we give.",
      alt: "Mentorship & Growth",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  const benefits = [
    { icon: Brain, labelKey: "benefits.mentorship" },
    { icon: Globe, labelKey: "benefits.secondments" },
    { icon: Shield, labelKey: "benefits.health" },
    { icon: Briefcase, labelKey: "benefits.hybrid" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
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

      {/* Values Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-[#0B1B3B] mb-4">
              {t("code.title")}
            </h2>
            <div className="w-16 h-1 bg-[#D4C5A0] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {values.map((v) => (
              <div
                key={v.titleKey}
                className="group p-8 border border-[#F5F5F7] hover:border-[#D4C5A0]/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-[#F5F5F7] flex items-center justify-center text-[#0B1B3B] mb-8 group-hover:bg-[#0B1B3B] group-hover:text-[#D4C5A0] transition-colors duration-300">
                  <v.icon strokeWidth={1.5} size={28} />
                </div>
                <h3 className="text-2xl font-serif text-[#0B1B3B] mb-4">
                  {t(v.titleKey)}
                </h3>
                <p className="text-[#2E4472] font-light leading-relaxed">
                  {t(v.descriptionKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture/Image Section */}
      <section
        className="relative py-32 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-[#0B1B3B]/90 mix-blend-multiply"></div>
        <div className="absolute inset-0 flex items-center justify-center relative z-10 px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <h2 className="text-4xl font-light mb-6">{t("culture.title")}</h2>
              <p className="text-gray-300 font-light leading-relaxed mb-8">
                {t("culture.description")}
              </p>
              <div className="grid grid-cols-2 gap-6">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <b.icon className="text-[#D4C5A0] w-5 h-5" />
                    <span className="text-sm font-bold tracking-wider uppercase">
                      {t(b.labelKey)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="border border-[#D4C5A0] p-8 bg-[#0B1B3B]/50 backdrop-blur-sm">
                <p className="font-serif italic text-2xl text-white mb-6">
                  &quot;{t("culture.quote")}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#D4C5A0] rounded-full flex items-center justify-center text-[#0B1B3B] font-bold">
                    S
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white uppercase">
                      {t("culture.quoteAuthor")}
                    </p>
                    <p className="text-xs text-[#D4C5A0]">
                      {t("culture.quoteRole")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      {/*<section className="py-24 px-6 bg-[#F5F5F7]">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-3xl font-light text-[#0B1B3B] mb-12 text-center">
            {t("openings.title")}
          </h2>

          {jobs.length === 0 ? (
            <div className="text-center py-16 text-gray-400 font-light">
              <p className="text-lg mb-2">
                {t("openings.noOpenings") || "No open positions at this time."}
              </p>
              <p className="text-sm">
                {t("openings.speculativeHint") ||
                  "Send your CV to careers@iblm.law for speculative applications."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => {
                const title = locale === "id" ? job.title_id : job.title_en;
                const location =
                  locale === "id" ? job.location_id : job.location_en;

                return (
                  <div
                    key={job.id}
                    className="bg-white p-8 border border-transparent hover:border-[#D4C5A0] transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <div>
                      <h3 className="font-serif !text-lg font-bold text-[#0B1B3B] mb-2">
                        {title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-mono">
                        {job.department && <span>{job.department}</span>}
                        {job.department && location && (
                          <span className="hidden md:inline">•</span>
                        )}
                        {location && <span>{location}</span>}
                        {job.employment_type && (
                          <>
                            <span className="hidden md:inline">•</span>
                            <span className="capitalize">
                              {job.employment_type.replace("-", " ")}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[#D4C5A0] font-bold uppercase text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                      {t("openings.apply")} <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>*/}

      {/* Work With Us Section */}
      <section className="py-24 px-6 bg-white border-t border-[#0B1B3B]/10">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#D4C5A0] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
              {t("workWithUs.label")}
            </span>
            <h2 className="text-4xl font-serif text-[#0B1B3B] mb-6">
              {t("workWithUs.title")}
            </h2>
            <p className="text-[#2E4472] text-lg font-light leading-relaxed mb-8">
              {t("workWithUs.description")}
            </p>
            {/*<div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-[#F5F5F7] group-hover:bg-[#0B1B3B] transition-colors flex items-center justify-center text-[#0B1B3B] group-hover:text-[#D4C5A0] shrink-0 border border-[#0B1B3B]/10">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-[#0B1B3B] font-bold uppercase text-xs tracking-widest mb-1">
                    {t("workWithUs.generalInquiries")}
                  </h4>
                  <p className="text-gray-500 font-light mb-2 text-sm">
                    {t("workWithUs.generalDesc")}
                  </p>
                  <div className="flex items-center">
                    <a
                      href="mailto:careers@iblm.law"
                      className="text-[#0B1B3B] font-bold hover:text-[#D4C5A0] transition-colors border-b border-[#D4C5A0] text-sm"
                    >
                      careers@iblm.law
                    </a>
                    <CopyButton text="careers@iblm.law" />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-[#F5F5F7] group-hover:bg-[#0B1B3B] transition-colors flex items-center justify-center text-[#0B1B3B] group-hover:text-[#D4C5A0] shrink-0 border border-[#0B1B3B]/10">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="text-[#0B1B3B] font-bold uppercase text-xs tracking-widest mb-1">
                    {t("workWithUs.internship")}
                  </h4>
                  <p className="text-gray-500 font-light mb-2 text-sm">
                    {t("workWithUs.internshipDesc")}
                  </p>
                  <div className="flex items-center">
                    <a
                      href="mailto:internships@iblm.law"
                      className="text-[#0B1B3B] font-bold hover:text-[#D4C5A0] transition-colors border-b border-[#D4C5A0] text-sm"
                    >
                      internships@iblm.law
                    </a>
                    <CopyButton text="internships@iblm.law" />
                  </div>
                </div>
              </div>
            </div>*/}
          </div>

          <div className="relative h-[500px] bg-[#0B1B3B] overflow-hidden group">
            {carouselSlides.map((slide, i) => (
              <img
                key={slide.image}
                src={slide.image}
                alt={slide.alt}
                className={`absolute inset-0 w-full h-full object-cover mix-blend-overlay grayscale group-hover:grayscale-0 transition-all duration-[1200ms] ease-out ${
                  i === activeSlide
                    ? "opacity-60 scale-100"
                    : "opacity-0 scale-105"
                }`}
              />
            ))}

            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3B] via-[#0B1B3B]/30 to-transparent pointer-events-none" />
            <div className="absolute inset-0 border border-[#D4C5A0]/30 m-6 pointer-events-none" />

            {/* Slide counter */}
            {/*<div className="absolute top-10 right-10 font-mono text-[#D4C5A0] text-xs tracking-[0.3em] uppercase">
              <span className="text-white">
                {String(activeSlide + 1).padStart(2, "0")}
              </span>
              <span className="mx-2 opacity-40">/</span>
              <span>
                {String(carouselSlides.length).padStart(2, "0")}
              </span>
            </div>*/}

            {/* Quote */}
            <div className="absolute bottom-20 left-10 right-10">
              {carouselSlides.map((slide, i) => (
                <p
                  key={slide.quote}
                  className={`text-white text-xl font-serif italic leading-relaxed transition-[opacity,transform] duration-700 ease-out ${
                    i === activeSlide
                      ? "opacity-100 translate-y-0 relative"
                      : "opacity-0 translate-y-3 absolute inset-0"
                  }`}
                >
                  &quot;{slide.quote}&quot;
                </p>
              ))}
            </div>

            {/* Indicators */}
            <style>{`@keyframes iblm-carousel-fill { from { width: 0% } to { width: 100% } }`}</style>
            <div className="absolute bottom-10 left-10 right-10 flex items-center gap-3">
              {carouselSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="relative h-[2px] flex-1 bg-white/20 overflow-hidden"
                >
                  {i === activeSlide ? (
                    <span
                      key={`active-${activeSlide}`}
                      className="absolute inset-y-0 left-0 bg-[#D4C5A0]"
                      style={{
                        animation: `iblm-carousel-fill ${SLIDE_DURATION}ms linear forwards`,
                      }}
                    />
                  ) : (
                    <span
                      className={`absolute inset-y-0 left-0 bg-[#D4C5A0] ${
                        i < activeSlide ? "w-full" : "w-0"
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default CareerPage;
