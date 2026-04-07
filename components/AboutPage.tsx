"use client";

import { useEffect } from "react";
import {
  Trophy,
  Target,
  History,
  Scale as ScaleLucide,
  Heart,
  Shield,
  Handshake,
} from "lucide-react";
import CTASection from "./CTASection";
import Image from "next/image";
import { PracticeGroup } from "@/lib/types/database";
// import { TestimonialsSection } from "./TestimonialsSection";
// import PracticeAreasSection from "./PracticeAreasSection";
import { useTranslations } from "@/hooks/useTranslations";
import { ReactNode } from "react";

interface AboutPageProps {
  targetId?: string | null;
  locale: string;
  practiceGroups: PracticeGroup[];
  practiceSectionTranslations: {
    label: string;
    title_prefix: string;
    title_suffix: string;
  };
  teamSection: ReactNode;
  clientsTickerSection?: ReactNode;
  affiliationsTickerSection?: ReactNode;
}

const AboutPage = ({
  targetId,
  // locale,
  // practiceGroups,
  // practiceSectionTranslations,
  // teamSection,
  clientsTickerSection,
  affiliationsTickerSection,
}: AboutPageProps) => {
  const t = useTranslations("about");

  // Core Values using translations
  const coreValues = [
    {
      id: "professionalism",
      titleKey: "values.professionalism.title",
      descriptionKey: "values.professionalism.description",
      icon: Shield,
    },
    {
      id: "empathy",
      titleKey: "values.empathy.title",
      descriptionKey: "values.empathy.description",
      icon: Heart,
    },
    {
      id: "loyalty",
      titleKey: "values.loyalty.title",
      descriptionKey: "values.loyalty.description",
      icon: Handshake,
    },
  ];

  // Why Choose IBLM items
  const whyChooseItems = [
    {
      id: "strategic",
      titleKey: "whyChoose.strategic.title",
      descriptionKey: "whyChoose.strategic.description",
      icon: History,
    },
    {
      id: "expertise",
      titleKey: "whyChoose.expertise.title",
      descriptionKey: "whyChoose.expertise.description",
      icon: Trophy,
    },
    {
      id: "modern",
      titleKey: "whyChoose.modern.title",
      descriptionKey: "whyChoose.modern.description",
      icon: Target,
    },
  ];

  useEffect(() => {
    if (targetId) {
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [targetId]);

  return (
    <div className=" min-h-screen bg-white">
      {/* 1. ORIGIN STORY SECTION */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#F5F5F7]/30" />
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#0B1B3B]/5 to-transparent" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 space-y-10 text-center lg:text-left">
              <span className="text-[#D4C5A0] font-bold tracking-[0.3em] text-sm uppercase block">
                {t("hero.tags")}
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-[#0B1B3B] leading-[1.1]">
                {t("hero.title_1")} <br />
                <span className="font-serif italic text-[#2E4472]">
                  {t("hero.title_2")}
                </span>
              </h1>

              <div className="space-y-6 text-lg md:text-xl text-[#2E4472] font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <p>{t("story.paragraph1")}</p>
                <p>{t("story.paragraph2")}</p>
                <div className="py-6 border-t border-[#0B1B3B]/10 border-b my-6">
                  <p className="font-medium text-[#0B1B3B] text-2xl font-serif italic">
                    &quot;{t("story.brandPromise")}&quot;
                  </p>
                  <p className="text-sm text-[#D4C5A0] mt-2 uppercase tracking-wider">
                    {t("story.brandPromiseLabel")}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              {/* Abstract Composition */}
              <div className="relative h-[320px] md:h-[600px] w-full max-w-lg mx-auto lg:max-w-none">
                <div className="absolute top-0 right-0 w-[90%] h-[90%] bg-[#0B1B3B] z-0 hidden lg:block"></div>
                <div className="absolute bottom-0 left-0 w-full lg:w-[90%] h-full lg:h-[90%] z-10 overflow-hidden border-4 border-white shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200"
                    alt="IBLM Law Group Office"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-[#0B1B3B]/20 mix-blend-multiply"></div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-6 -left-3 md:-left-6 lg:top-[20%] lg:left-[5%] z-20 w-24 md:w-32 h-24 md:h-32 border border-[#D4C5A0] flex items-center justify-center bg-white shadow-lg">
                  <ScaleLucide className="w-12 h-12 text-[#0B1B3B]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE VALUES SECTION */}
      <section
        id="values"
        className="bg-[#0B1B3B] py-32 border-y border-[#D4C5A0]/20 text-white relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(45deg, #1A2F5A 25%, transparent 25%, transparent 75%, #1A2F5A 75%, #1A2F5A),
               linear-gradient(45deg, #1A2F5A 25%, transparent 25%, transparent 75%, #1A2F5A 75%, #1A2F5A)`,
            backgroundSize: "30px 30px",
            backgroundPosition: "0 0, 15px 15px",
          }}
        />

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              {t("values.title")}{" "}
              <span className="font-serif italic text-[#D4C5A0]">
                {t("values.titleHighlight")}
              </span>
            </h2>
            <p className="text-gray-400 font-light">{t("values.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {coreValues.map((value) => (
              <div
                key={value.id}
                className="bg-[#1A2F5A]/50 p-10 border border-[#D4C5A0]/20 hover:border-[#D4C5A0] transition-all group backdrop-blur-sm"
              >
                <value.icon
                  className="w-10 h-10 text-[#D4C5A0] mb-6 group-hover:scale-110 transition-transform"
                  strokeWidth={1.5}
                />
                <h3 className="text-xl font-bold text-white mb-4">
                  {t(value.titleKey)}
                </h3>
                <p className="text-gray-300 font-light leading-relaxed">
                  {t(value.descriptionKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ACHIEVEMENTS SECTION */}
      <section className="py-32 bg-[#F5F5F7]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-[#0B1B3B] mb-6">
              {t("whyChoose.title")}{" "}
              <span className="font-serif italic text-[#2E4472]">
                {t("whyChoose.titleHighlight")}
              </span>
            </h2>
            <p className="text-[#2E4472] font-light">
              {t("whyChoose.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-10 border border-[#1A2F5A]/10 hover:border-[#D4C5A0] transition-all group shadow-sm"
              >
                <item.icon
                  className="w-10 h-10 text-[#D4C5A0] mb-6 group-hover:scale-110 transition-transform"
                  strokeWidth={1.5}
                />
                <h3 className="text-xl font-bold text-[#0B1B3B] mb-4">
                  {t(item.titleKey)}
                </h3>
                <p className="text-[#2E4472] font-light leading-relaxed">
                  {t(item.descriptionKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Ticker */}
      {clientsTickerSection}

      {/* 4. PRACTICE AREAS */}
      {/*<PracticeAreasSection
        practiceGroups={practiceGroups}
        locale={locale}
        className="bg-white"
        label={practiceSectionTranslations.label}
        title={
          <>
            {practiceSectionTranslations.title_prefix}{" "}
            <span className="font-serif italic text-[#2E4472]">
              {practiceSectionTranslations.title_suffix}
            </span>
          </>
        }
      />*/}

      {/* 5. BRAND PROMISE SECTION */}
      <section className="w-full h-[600px] relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
          alt="IBLM Law Group"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0B1B3B]/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3B] via-transparent to-transparent"></div>

        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="max-w-4xl space-y-8">
            <div className="w-20 h-1 bg-[#D4C5A0] mx-auto"></div>
            <h2 className="text-4xl md:text-6xl font-light text-white leading-tight">
              &quot;{t("brandSection.quote")}&quot;
            </h2>
            <p className="text-white/60 text-sm tracking-[0.3em] uppercase">
              {t("brandSection.label")}
            </p>
          </div>
        </div>
      </section>

      {/* 6. TEAM SUMMARY — rendered as Server Component from parent */}
      {/*<div id="team">{teamSection}</div>*/}

      {/* Org Ticker */}
      {affiliationsTickerSection}

      {/* 7. TESTIMONIAL SECTION */}
      {/*<TestimonialsSection />*/}

      {/* 8. CTA SECTION */}
      <CTASection noBorderTop />
    </div>
  );
};

export default AboutPage;
