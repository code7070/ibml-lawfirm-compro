"use client";

import Button from "./Button";
import { useTranslations } from "@/hooks/useTranslations";

const CTASection = () => {
  const t = useTranslations("home.cta");

  return (
    <section className="py-32 relative overflow-hidden bg-[#0B1B3B] border-t border-[#D4C5A0]/20">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <span className="text-[#D4C5A0] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">
          {t("label")}
        </span>
        <h2 className="text-3xl md:text-4xl font-light mb-10 text-white leading-relaxed">
          {t("title")}
        </h2>
        <Button variant="primary" href="/contact">
          {t("button")}
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
