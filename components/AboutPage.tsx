"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  Quote,
  Trophy,
  Target,
  History,
  ChevronLeft,
  ChevronRight,
  Shield,
  Globe,
  Cpu,
  Users,
  FileText,
  Scale as ScaleLucide,
} from "lucide-react";
import CTASection from "./CTASection";
import Team from "./Team";
import LogoTicker from "./LogoTicker";
import { LogoItem } from "@/types";
import { LangLink } from "./LangLink";

const testimonials = [
  {
    id: 1,
    quote:
      "Nexus Legal doesn't just understand the law; they understand the code, the culture, and the stakes of the gaming industry. They are the only firm I trust with our IP.",
    author: "Jonathan Reeve",
    role: "CTO, OmniVerse Games",
  },
  {
    id: 2,
    quote:
      "When we faced a platform takedown notice, their team mobilized instantly. We were back online in 24 hours. Absolute lifesavers for our streaming revenue.",
    author: "Maria Gonzalez",
    role: "Founder, StreamSync",
  },
  {
    id: 3,
    quote:
      "The most sophisticated counsel we've worked with. They structured our Series B with a level of detail that impressed our lead investors and secured our future.",
    author: "Alexei Volkov",
    role: "Managing Director, BlueHorizon VC",
  },
  {
    id: 4,
    quote:
      "Finally, a law firm that speaks our language. They navigated the complex web of international eSports regulations so we could focus on winning championships.",
    author: "Sarah Chen",
    role: "Owner, Vertex eSports",
  },
];

const services = [
  {
    id: "1",
    title: "Game Development Law",
    description:
      "Comprehensive counsel for indie studios and AAA publishers. From dev agreements to IP clearance.",
    icon: Cpu,
  },
  {
    id: "2",
    title: "eSports Representation",
    description:
      "Player contracts, team franchising, and tournament regulation. Protecting talent and organizations.",
    icon: Users,
  },
  {
    id: "3",
    title: "Intellectual Property",
    description:
      "Trademark, copyright, and trade secret protection for digital assets, code, and virtual goods.",
    icon: Shield,
  },
  {
    id: "4",
    title: "Content Creator Rights",
    description:
      "Negotiating brand deals, platform disputes, and MCN contracts for top-tier influencers.",
    icon: Globe,
  },
  {
    id: "5",
    title: "Platform Litigation",
    description:
      "Dispute resolution for ToS violations, bans, and digital asset recovery.",
    icon: ScaleLucide,
  },
  {
    id: "6",
    title: "Corporate Structuring",
    description:
      "Entity formation, M&A, and financing strategies for high-growth gaming tech startups.",
    icon: FileText,
  },
];

interface AboutPageProps {
  targetId?: string | null;
  clientLogos?: LogoItem[];
  orgLogos?: LogoItem[];
}

const AboutPage = ({ targetId, clientLogos, orgLogos }: AboutPageProps) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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

  // Testimonial Slider Logic
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* 1. ARTISTIC STORY SECTION */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#F5F5F7]/30" />
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#0B1B3B]/5 to-transparent" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 space-y-10 text-center lg:text-left">
              <span className="text-[#D4C5A0] font-bold tracking-[0.3em] text-sm uppercase block">
                The Origin
              </span>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-[#0B1B3B] leading-[1.1]">
                Forged in the <br />
                <span className="font-serif italic text-[#2E4472]">
                  Digital Fire
                </span>
              </h1>

              <div className="space-y-6 text-lg md:text-xl text-[#2E4472] font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <p>
                  Traditional law firms look at a video game and see a product.
                  We see a complex ecosystem of intellectual property, code,
                  community, and commerce.
                </p>
                <p>
                  Nexus Legal Group was founded in 2024 to bridge the gap
                  between classical legal authority and the rapid evolution of
                  digital entertainment. We believe that the creators of virtual
                  worlds deserve real-world protection that is as innovative as
                  the products they build.
                </p>
                <div className="py-6 border-t border-[#0B1B3B]/10 border-b my-6">
                  <p className="font-medium text-[#0B1B3B] text-2xl font-serif italic">
                    &quot;We are not just attorneys; we are strategists for the
                    digital age.&quot;
                  </p>
                </div>
              </div>

              <div className="pt-4 flex justify-center lg:justify-start">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Sig_J_H_Hancocks.png"
                  alt="Signature"
                  className="h-16 opacity-60"
                />
              </div>
            </div>

            <div className="lg:col-span-6 relative mt-12 lg:mt-0">
              {/* Abstract Composition */}
              <div className="relative h-[600px] w-full max-w-lg mx-auto lg:max-w-none">
                <div className="absolute top-0 right-0 w-[90%] h-[90%] bg-[#0B1B3B] z-0 hidden lg:block"></div>
                <div className="absolute bottom-0 left-0 w-full lg:w-[90%] h-full lg:h-[90%] z-10 overflow-hidden border-4 border-white shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200"
                    alt="Office Abstract"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-[#0B1B3B]/20 mix-blend-multiply"></div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-6 -left-6 lg:top-[20%] lg:left-[5%] z-20 w-32 h-32 border border-[#D4C5A0] flex items-center justify-center bg-white shadow-lg">
                  <ScaleLucide className="w-12 h-12 text-[#0B1B3B]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RESULTS / DETAILS SECTION */}
      <section className="bg-[#0B1B3B] py-32 border-y border-[#D4C5A0]/20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              Defined by{" "}
              <span className="font-serif italic text-[#D4C5A0]">Victory</span>
            </h2>
            <p className="text-gray-400 font-light">
              Our history is written in the success of our clients. We measure
              our achievements not in billable hours, but in studios protected,
              deals closed, and precedents set.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1A2F5A]/50 p-10 border border-[#D4C5A0]/20 hover:border-[#D4C5A0] transition-all group backdrop-blur-sm">
              <History
                className="w-10 h-10 text-[#D4C5A0] mb-6 group-hover:scale-110 transition-transform"
                strokeWidth={1.5}
              />
              <h3 className="text-xl font-bold text-white mb-4">
                Legacy of Innovation
              </h3>
              <p className="text-gray-300 font-light leading-relaxed">
                Though our brand is modern, our partners bring over 40 years of
                combined experience from top-tier &quot;Big Law&quot; firms.
              </p>
            </div>
            <div className="bg-[#1A2F5A]/50 p-10 border border-[#D4C5A0]/20 hover:border-[#D4C5A0] transition-all group backdrop-blur-sm">
              <Trophy
                className="w-10 h-10 text-[#D4C5A0] mb-6 group-hover:scale-110 transition-transform"
                strokeWidth={1.5}
              />
              <h3 className="text-xl font-bold text-white mb-4">
                Industry Recognition
              </h3>
              <p className="text-gray-300 font-light leading-relaxed">
                Consistently ranked in the &quot;Legal 500&quot; for Media,
                Technology, and Telecoms. Winners of the &quot;Digital
                Frontier&quot; Award.
              </p>
            </div>
            <div className="bg-[#1A2F5A]/50 p-10 border border-[#D4C5A0]/20 hover:border-[#D4C5A0] transition-all group backdrop-blur-sm">
              <Target
                className="w-10 h-10 text-[#D4C5A0] mb-6 group-hover:scale-110 transition-transform"
                strokeWidth={1.5}
              />
              <h3 className="text-xl font-bold text-white mb-4">
                Global Reach
              </h3>
              <p className="text-gray-300 font-light leading-relaxed">
                Operating out of Los Angeles with strategic partnerships in
                Tokyo, Seoul, and London to protect your IP everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Ticker */}
      {clientLogos && clientLogos.length > 0 && (
        <LogoTicker title="Representing" items={clientLogos} theme="dark" />
      )}

      {/* 3. PRACTICE AREAS */}
      <section className="py-32 bg-[#F5F5F7]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-[#0B1B3B]/10 pb-12">
            <div className="max-w-2xl">
              <span className="text-[#0B1B3B] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                Expertise
              </span>
              <h2 className="text-4xl md:text-5xl font-light text-[#0B1B3B]">
                Areas of{" "}
                <span className="font-serif italic text-[#2E4472]">
                  Practice
                </span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <LangLink
                key={service.id}
                href="/practice-areas"
                className="group relative bg-white border border-[#1A2F5A]/10 p-12 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer block"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-[#1A2F5A] group-hover:bg-[#D4C5A0] transition-colors duration-300" />
                <div className="mb-8">
                  <service.icon
                    className="w-10 h-10 text-[#D4C5A0] group-hover:text-[#1A2F5A] transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-2xl font-normal text-[#0B1B3B] mb-4 font-serif">
                  {service.title}
                </h3>
                <p className="text-[#2E4472] leading-[1.8] mb-8 font-light">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-[#D4C5A0] text-sm font-bold uppercase tracking-widest group-hover:text-[#0B1B3B] transition-colors cursor-pointer">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </LangLink>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FULL WIDTH PHOTO SECTION */}
      <section className="w-full h-[600px] relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
          alt="Nexus Headquarters"
          className="w-full h-full object-cover fixed-bg"
        />
        <div className="absolute inset-0 bg-[#0B1B3B]/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3B] via-transparent to-transparent"></div>

        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="max-w-4xl space-y-8">
            <div className="w-20 h-1 bg-[#D4C5A0] mx-auto"></div>
            <h2 className="text-4xl md:text-6xl font-light text-white leading-tight">
              &quot;In the digital arena, <br />
              <span className="font-serif italic text-[#D4C5A0]">
                protection
              </span>{" "}
              is the ultimate weapon.&quot;
            </h2>
            <p className="text-white/60 text-sm tracking-[0.3em] uppercase">
              Nexus Legal Group Philosophy
            </p>
          </div>
        </div>
      </section>

      {/* 5. TEAM SUMMARY (Replaced Slider) */}
      <div id="council">
        <Team />
      </div>

      {/* Org Ticker */}
      {orgLogos && orgLogos.length > 0 && (
        <LogoTicker
          title="Strategic Alliances"
          items={orgLogos}
          theme="light"
        />
      )}

      {/* 6. TESTIMONIAL SECTION */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-[1400px] mx-auto">
          <span className="text-[#0B1B3B] font-bold tracking-[0.2em] text-xs uppercase block text-center mb-12">
            Client Intelligence
          </span>

          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden min-h-[450px] md:min-h-[350px] relative">
              {testimonials.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out flex flex-col items-center justify-center text-center ${
                    index === currentTestimonial
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-12 scale-95 pointer-events-none"
                  }`}
                >
                  <Quote className="w-16 h-16 text-[#D4C5A0]/30 mb-8" />
                  <p className="text-2xl md:text-4xl font-serif italic text-[#0B1B3B] leading-tight mb-10 max-w-4xl">
                    &quot;{item.quote}&quot;
                  </p>

                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-[#0B1B3B] text-[#D4C5A0] border border-[#D4C5A0] flex items-center justify-center font-bold text-xl mb-4">
                      {item.author.charAt(0)}
                    </div>
                    <p className="text-sm font-bold text-[#0B1B3B] uppercase tracking-[0.15em] mb-1">
                      {item.author}
                    </p>
                    <p className="text-xs text-[#2E4472] font-medium">
                      {item.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center gap-12 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-3 border border-[#0B1B3B]/10 hover:border-[#D4C5A0] hover:text-[#D4C5A0] transition-colors rounded-full text-[#0B1B3B]"
              >
                <ChevronLeft />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      idx === currentTestimonial
                        ? "bg-[#D4C5A0] scale-125"
                        : "bg-[#0B1B3B]/20"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-3 border border-[#0B1B3B]/10 hover:border-[#D4C5A0] hover:text-[#D4C5A0] transition-colors rounded-full text-[#0B1B3B]"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <CTASection />
    </div>
  );
};

export default AboutPage;
