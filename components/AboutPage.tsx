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
  Scale as ScaleLucide,
  Sparkles,
  Users,
  Cpu,
  HeartPulse,
  Heart,
  Shield,
  Handshake,
} from "lucide-react";
import CTASection from "./CTASection";
import Team from "./Team";
import LogoTicker from "./LogoTicker";
import { LogoItem } from "@/types";
import { LangLink } from "./LangLink";
import Image from "next/image";

// [DYNAMIC] - Will be replaced with Supabase testimonials table in Phase B
const testimonials = [
  {
    id: 1,
    quote:
      "IBLM Law Group provides exceptional legal counsel with deep industry expertise. Their understanding of both legal frameworks and business needs is unmatched.",
    author: "[Client Name]",
    role: "[Position], [Company]",
  },
  {
    id: 2,
    quote:
      "Working with IBLM has been transformative for our business. They provide strategic guidance that goes beyond traditional legal services.",
    author: "[Client Name]",
    role: "[Position], [Company]",
  },
  {
    id: 3,
    quote:
      "The sophisticated approach to complex legal matters and genuine care for client success sets IBLM apart from other law firms.",
    author: "[Client Name]",
    role: "[Position], [Company]",
  },
];

// Updated to match IBLM LEG Structure
const practiceGroups = [
  {
    id: "entertainment",
    title: "LEG-1: Entertainment Expert Group",
    description:
      "Specialized counsel for entertainment industry including Video Games, E-Sports, Film & Digital Content, Artists & KOL, Tourism & MICE, and IP Management.",
    icon: Sparkles,
  },
  {
    id: "people",
    title: "LEG-2: People & Labor Expert Group",
    description:
      "Comprehensive services for Personal & Family Law, Employment & Industrial Relations, and Immigration matters.",
    icon: Users,
  },
  {
    id: "tech",
    title: "LEG-3: Technology Expert Group",
    description:
      "Cutting-edge legal frameworks for Data Protection & Privacy, E-Commerce, FinTech, Communication & IT, and Artificial Intelligence.",
    icon: Cpu,
  },
  {
    id: "health",
    title: "LEG-4: Education & Health Expert Group",
    description:
      "Expert guidance for Educational Institutions, Medical Device & Pharma, and Healthy Lifestyle industries.",
    icon: HeartPulse,
  },
];

// IBLM Core Values
const coreValues = [
  {
    id: "professionalism",
    title: "Professionalism",
    description: "Excellence and integrity in every engagement. We uphold the highest standards of legal practice and ethical conduct.",
    icon: Shield,
  },
  {
    id: "empathy",
    title: "Empathy",
    description: "Understanding client needs deeply. We listen first, then provide tailored solutions that address your unique challenges.",
    icon: Heart,
  },
  {
    id: "loyalty",
    title: "Loyalty",
    description: "Long-term partnership commitment. Your success is our priority, and we stand by you through every challenge.",
    icon: Handshake,
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
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

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
                About IBLM Law Group
              </span>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-[#0B1B3B] leading-[1.1]">
                The Sophisticated <br />
                <span className="font-serif italic text-[#2E4472]">
                  Guardian
                </span>
              </h1>

              <div className="space-y-6 text-lg md:text-xl text-[#2E4472] font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <p>
                  IBLM Law Group was founded with a clear vision: to provide 
                  sophisticated legal services that combine classical jurisprudence 
                  with modern business strategy.
                </p>
                <p>
                  We believe in building long-term partnerships with our clients, 
                  understanding their unique needs, and delivering unshakeable 
                  legal standing. Our approach bridges the gap between traditional 
                  legal excellence and the dynamic demands of modern industries.
                </p>
                <div className="py-6 border-t border-[#0B1B3B]/10 border-b my-6">
                  <p className="font-medium text-[#0B1B3B] text-2xl font-serif italic">
                    &quot;Unshakeable Legal Standing&quot;
                  </p>
                  <p className="text-sm text-[#D4C5A0] mt-2 uppercase tracking-wider">
                    Our Brand Promise
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative mt-12 lg:mt-0">
              {/* Abstract Composition */}
              <div className="relative h-[600px] w-full max-w-lg mx-auto lg:max-w-none">
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
                <div className="absolute -top-6 -left-6 lg:top-[20%] lg:left-[5%] z-20 w-32 h-32 border border-[#D4C5A0] flex items-center justify-center bg-white shadow-lg">
                  <ScaleLucide className="w-12 h-12 text-[#0B1B3B]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE VALUES SECTION */}
      <section id="values" className="bg-[#0B1B3B] py-32 border-y border-[#D4C5A0]/20 text-white relative overflow-hidden">
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
              Our{" "}
              <span className="font-serif italic text-[#D4C5A0]">Values</span>
            </h2>
            <p className="text-gray-400 font-light">
              Built on three pillars that define our approach to legal practice 
              and client relationships.
            </p>
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
                  {value.title}
                </h3>
                <p className="text-gray-300 font-light leading-relaxed">
                  {value.description}
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
              Why Choose{" "}
              <span className="font-serif italic text-[#2E4472]">IBLM</span>
            </h2>
            <p className="text-[#2E4472] font-light">
              Our commitment to excellence and client success drives everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 border border-[#1A2F5A]/10 hover:border-[#D4C5A0] transition-all group shadow-sm">
              <History
                className="w-10 h-10 text-[#D4C5A0] mb-6 group-hover:scale-110 transition-transform"
                strokeWidth={1.5}
              />
              <h3 className="text-xl font-bold text-[#0B1B3B] mb-4">
                Strategic Partnership
              </h3>
              <p className="text-[#2E4472] font-light leading-relaxed">
                We go beyond traditional legal services to become your trusted 
                strategic partner, understanding your business goals and challenges.
              </p>
            </div>
            <div className="bg-white p-10 border border-[#1A2F5A]/10 hover:border-[#D4C5A0] transition-all group shadow-sm">
              <Trophy
                className="w-10 h-10 text-[#D4C5A0] mb-6 group-hover:scale-110 transition-transform"
                strokeWidth={1.5}
              />
              <h3 className="text-xl font-bold text-[#0B1B3B] mb-4">
                Industry Expertise
              </h3>
              <p className="text-[#2E4472] font-light leading-relaxed">
                Deep expertise across Entertainment, Technology, Health & Education, 
                and People & Labor practice areas through our specialized LEGs.
              </p>
            </div>
            <div className="bg-white p-10 border border-[#1A2F5A]/10 hover:border-[#D4C5A0] transition-all group shadow-sm">
              <Target
                className="w-10 h-10 text-[#D4C5A0] mb-6 group-hover:scale-110 transition-transform"
                strokeWidth={1.5}
              />
              <h3 className="text-xl font-bold text-[#0B1B3B] mb-4">
                Modern Approach
              </h3>
              <p className="text-[#2E4472] font-light leading-relaxed">
                Combining classical jurisprudence with modern strategy to deliver 
                innovative solutions for today&apos;s complex legal challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Ticker */}
      {clientLogos && clientLogos.length > 0 && (
        <LogoTicker title="Our Clients" items={clientLogos} theme="dark" />
      )}

      {/* 4. PRACTICE AREAS */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-[#0B1B3B]/10 pb-12">
            <div className="max-w-2xl">
              <span className="text-[#0B1B3B] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                Legal Expertise Groups
              </span>
              <h2 className="text-4xl md:text-5xl font-light text-[#0B1B3B]">
                Practice{" "}
                <span className="font-serif italic text-[#2E4472]">
                  Areas
                </span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {practiceGroups.map((group) => (
              <LangLink
                key={group.id}
                href={`/practice-areas#${group.id}`}
                className="group relative bg-[#F5F5F7] border border-[#1A2F5A]/10 p-12 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer flex flex-col"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-[#1A2F5A] group-hover:bg-[#D4C5A0] transition-colors duration-300" />
                <div className="mb-8">
                  <group.icon
                    className="w-10 h-10 text-[#D4C5A0] group-hover:text-[#1A2F5A] transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-2xl font-normal text-[#0B1B3B] mb-4 font-serif">
                  {group.title}
                </h3>
                <p className="text-[#2E4472] leading-[1.8] mb-8 font-light flex-grow">
                  {group.description}
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
              &quot;Where classical jurisprudence meets <br />
              <span className="font-serif italic text-[#D4C5A0]">
                modern strategy
              </span>
              .&quot;
            </h2>
            <p className="text-white/60 text-sm tracking-[0.3em] uppercase">
              IBLM Law Group Philosophy
            </p>
          </div>
        </div>
      </section>

      {/* 6. TEAM SUMMARY */}
      <div id="team">
        <Team />
      </div>

      {/* Org Ticker */}
      {orgLogos && orgLogos.length > 0 && (
        <LogoTicker
          title="Strategic Partners"
          items={orgLogos}
          theme="light"
        />
      )}

      {/* 7. TESTIMONIAL SECTION */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-[1400px] mx-auto">
          <span className="text-[#0B1B3B] font-bold tracking-[0.2em] text-xs uppercase block text-center mb-12">
            Client Testimonials
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
                      {item.author.charAt(0) === "[" ? "?" : item.author.charAt(0)}
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

      {/* 8. CTA SECTION */}
      <CTASection />
    </div>
  );
};

export default AboutPage;
