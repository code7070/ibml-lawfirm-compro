"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
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
import Button from "./Button";
import CTASection from "./CTASection";
import Link from "next/link";

// --- DATA ---

const teamMembers = [
  {
    id: "1",
    name: "Elena Vance",
    role: "Managing Partner",
    bio: "Former General Counsel at a major AAA studio. Elena specializes in high-stakes M&A and corporate structuring for game tech companies.",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    name: "Marcus Thorne",
    role: "Partner, IP Litigation",
    bio: "A formidable litigator with a 98% success rate in copyright infringement cases involving digital assets and game mechanics.",
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    name: "Sarah Jenkins",
    role: "Senior Counsel",
    bio: "Expert in data privacy (GDPR/CCPA) and platform compliance. Sarah ensures your user data strategies are bulletproof.",
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "4",
    name: "David Choi",
    role: "Associate",
    bio: "Deeply embedded in the eSports ecosystem. David handles player contracts, tournament licensing, and visa issues.",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
  },
];

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
}

const AboutPage = ({ targetId }: AboutPageProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
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

  // Team Slider Logic
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  };

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
              <Link
                key={service.id}
                href="/practice-areas"
                className="group relative bg-white border border-[#1A2F5A]/10 p-12 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer"
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
              </Link>
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

      {/* 5. TEAM SLIDER SECTION */}
      <section
        id="council"
        className="py-32 bg-[#0B1B3B] text-white overflow-hidden relative border-t border-white/10"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <h2 className="text-4xl md:text-5xl font-light text-center md:text-left">
              Meet The{" "}
              <span className="text-[#D4C5A0] font-serif italic">Council</span>
            </h2>

            <div className="flex gap-4">
              <button
                onClick={prevSlide}
                className="w-12 h-12 border border-[#D4C5A0] flex items-center justify-center hover:bg-[#D4C5A0] hover:text-[#0B1B3B] transition-all rounded-full"
              >
                <ArrowLeft />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 border border-[#D4C5A0] flex items-center justify-center hover:bg-[#D4C5A0] hover:text-[#0B1B3B] transition-all rounded-full"
              >
                <ArrowRight />
              </button>
            </div>
          </div>

          <div className="relative min-h-[1000px] lg:min-h-[600px]">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out transform ${
                  index === currentSlide
                    ? "opacity-100 translate-x-0 z-10"
                    : "opacity-0 translate-x-12 pointer-events-none z-0"
                }`}
              >
                <div className="grid lg:grid-cols-2 gap-12 items-start lg:items-center">
                  <div className="relative aspect-[4/5] lg:aspect-square w-full max-w-[500px] mx-auto lg:mx-0 border border-white/10 p-4">
                    <div className="absolute inset-0 bg-[#D4C5A0] transform translate-x-2 translate-y-2 z-0" />
                    <div className="relative w-full h-full overflow-hidden bg-[#1A2F5A] z-10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-6 text-center lg:text-left bg-[#0B1B3B] lg:bg-transparent pb-8">
                    <div className="inline-block border-b border-[#D4C5A0] pb-2">
                      <p className="text-[#D4C5A0] font-bold tracking-[0.2em] text-sm uppercase">
                        {member.role}
                      </p>
                    </div>
                    <h3 className="text-5xl md:text-7xl font-light font-serif">
                      {member.name}
                    </h3>
                    <p className="text-xl text-gray-300 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                      {member.bio}
                    </p>

                    <div className="pt-8 flex justify-center lg:justify-start">
                      <Button variant="outline">View Full Profile</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-0 lg:-mt-12 justify-center lg:justify-start relative z-20">
            {teamMembers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1 transition-all duration-300 ${
                  idx === currentSlide ? "w-12 bg-[#D4C5A0]" : "w-4 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

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
