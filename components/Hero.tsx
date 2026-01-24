"use client";
import { ArrowDown } from "lucide-react";
import Button from "./Button";
import { useTranslations } from "@/hooks/useTranslations";
import Image from "next/image";

const Hero = () => {
  const t = useTranslations("home.hero");

  return (
    <section className="relative min-h-screen flex items-center pt-navbar overflow-hidden bg-[#0B1B3B]">
      {/* Background System */}
      <div className="absolute inset-0 z-0">
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B3B] via-[#1A2F5A] to-[#020814]" />

        {/* Professional Pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5 mix-blend-overlay"
          style={{
            backgroundImage: `linear-gradient(45deg, #1A2F5A 25%, transparent 25%, transparent 75%, #1A2F5A 75%, #1A2F5A), 
               linear-gradient(45deg, #1A2F5A 25%, transparent 25%, transparent 75%, #1A2F5A 75%, #1A2F5A)`,
            backgroundSize: "30px 30px",
            backgroundPosition: "0 0, 15px 15px",
          }}
        />

        {/* Gold Glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4C5A0] rounded-full blur-[180px] opacity-10 -translate-y-1/2 translate-x-1/3" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-10">
          <div className="inline-block border-l-2 border-[#D4C5A0] pl-6">
            <p className="text-[#D4C5A0] uppercase tracking-[0.2em] text-sm font-bold mb-4">
              {t("tags")}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] text-white">
              {t("title_1")} <br />
              <span className="font-serif italic text-[#F5F5F7]">
                {t("title_2")}
              </span>{" "}
              <br />
              {t("title_3")}
            </h1>
          </div>

          <p className="text-xl text-gray-400 max-w-lg leading-[1.8] font-light pl-6 border-l border-white/10">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 pl-6">
            <Button variant="primary" href="/contact">
              {t("cta_primary")}
            </Button>
            <Button variant="outline" icon={false} href="/practice-areas">
              {t("cta_secondary")}
            </Button>
          </div>
        </div>

        {/* Professional Visual */}
        <div className="lg:col-span-5 relative hidden lg:block h-[600px]">
          {/* Decorative geometrical elements representing 'Structure' and 'Sophistication' */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[400px] h-[500px] border border-[#D4C5A0]/20 relative">
              {/* Image Placeholder with Professional effect */}
              <div className="absolute inset-4 bg-[#1A2F5A] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=900"
                  alt="Professional Legal Services"
                  fill
                  className="object-cover opacity-40 mix-blend-luminosity hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3B] to-transparent opacity-80" />
              </div>

              {/* Years of Excellence Badge */}
              <div className="absolute -top-6 -right-6 w-24 h-24 border border-[#D4C5A0] bg-[#0B1B3B] flex flex-col items-center justify-center">
                <span className="text-3xl font-light text-white">4</span>
                <span className="text-[0.6rem] text-[#D4C5A0] uppercase tracking-wider">LEGs</span>
              </div>

              {/* Brand Promise Badge */}
              <div className="absolute -bottom-10 -left-10 bg-[#D4C5A0] p-6 text-[#0B1B3B] max-w-[200px]">
                <p className="text-xs font-bold uppercase tracking-widest leading-relaxed">
                  {t("badge_text")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
        <ArrowDown size={24} />
      </div>
    </section>
  );
};

export default Hero;
