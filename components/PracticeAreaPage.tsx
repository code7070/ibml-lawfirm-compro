"use client";

import { useEffect } from "react";
import {
  Gamepad2,
  Users,
  Cpu,
  HeartPulse,
  Scale,
  ShieldCheck,
  ArrowRight,
  Mic2,
  Plane,
  Baby,
  Briefcase,
  GraduationCap,
  Wifi,
  CreditCard,
} from "lucide-react";
import CTASection from "./CTASection";
import LogoTicker from "./LogoTicker";
import { LogoItem } from "@/types";

interface PracticeAreaPageProps {
  targetId?: string | null;
  clientLogos?: LogoItem[];
  orgLogos?: LogoItem[];
}

// Core Competencies
const coreCompetencies = [
  {
    title: "General Business & Company Law",
    description:
      "Comprehensive corporate governance, M&A, and entity structuring.",
  },
  {
    title: "Consumer Protection Law",
    description:
      "Ensuring compliance with fair trade regulations and user safety standards.",
  },
  {
    title: "Competition Law",
    description:
      "Navigating antitrust regulations in high-stakes market consolidations.",
  },
];

// Practice Groups Data
const practiceGroups = [
  {
    id: "entertainment",
    title: "Entertainment Practice Group",
    icon: Gamepad2,
    description:
      "Specialized counsel for the creators of digital worlds and modern entertainment experiences.",
    areas: [
      {
        title: "Games",
        icon: Gamepad2,
        desc: "End-to-end support for studios: publisher agreements, IP clearance, and regulatory compliance for loot boxes/virtual currency.",
      },
      {
        title: "MICE",
        subtitle: "(Meetings, Incentives, Conferences, Exhibitions)",
        icon: Plane,
        desc: "Legal infrastructure for large-scale eSports tournaments, conventions, and international industry events.",
      },
      {
        title: "KOL / Influencer",
        icon: Mic2,
        desc: "Representation for digital talent, including brand deals, agency contracts, and rights of publicity.",
      },
    ],
  },
  {
    id: "people",
    title: "People & Labour Practice Group",
    icon: Users,
    description:
      "Protecting the human element behind the innovation. Private client services and workforce strategies.",
    areas: [
      {
        title: "Family Law",
        icon: Baby,
        desc: "Discrete counsel for high-net-worth individuals regarding asset protection, marriage contracts, and succession.",
      },
      {
        title: "Individual Legal Services",
        icon: ShieldCheck,
        desc: "Personal reputation management, privacy protection, and individual rights defense.",
      },
      {
        title: "Employment & Immigration",
        icon: Briefcase,
        desc: "Cross-border talent mobility (O-1/P-1 Visas for eSports athletes) and executive compensation packages.",
      },
    ],
  },
  {
    id: "tech",
    title: "Tech Practice Group",
    icon: Cpu,
    description:
      "Cutting-edge legal frameworks for emerging technologies and digital infrastructure.",
    areas: [
      {
        title: "Data Protection",
        icon: ShieldCheck,
        desc: "GDPR/CCPA compliance, data breach response, and privacy-by-design consulting.",
      },
      {
        title: "Financial Technology",
        icon: CreditCard,
        desc: "Crypto-asset regulation, payment gateway integration, and blockchain compliance.",
      },
      {
        title: "Communication & Media",
        icon: Wifi,
        desc: "Telecommunications regulation, platform liability (Section 230), and content moderation policies.",
      },
    ],
  },
  {
    id: "health",
    title: "Health & Education Practice Group",
    icon: HeartPulse,
    description:
      "Navigating the complex regulatory landscape of institutional services and gamified health.",
    areas: [
      {
        title: "Healthcare Legal Services",
        icon: HeartPulse,
        desc: "Compliance for MedTech apps, gamified therapy platforms, and health data privacy (HIPAA).",
      },
      {
        title: "Education Law & Compliance",
        icon: GraduationCap,
        desc: "EdTech regulation, student data protection, and institutional governance.",
      },
    ],
  },
];

const PracticeAreaPage = ({
  targetId,
  clientLogos,
  orgLogos,
}: PracticeAreaPageProps) => {
  useEffect(() => {
    if (targetId) {
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [targetId]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#0B1B3B] text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <span className="text-[#D4C5A0] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">
            Practice Areas
          </span>
          <h1 className="text-5xl md:text-7xl font-light mb-8">
            Specialized{" "}
            <span className="font-serif italic text-[#D4C5A0]">
              Legal Architectures
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            We structure our expertise into focused practice groups, ensuring
            deep industry knowledge tailored to specific sectors.
          </p>
        </div>
      </section>

      {/* Client Ticker */}
      {clientLogos && clientLogos.length > 0 && (
        <LogoTicker
          title="Trusted By Industry Leaders"
          items={clientLogos}
          theme="light"
        />
      )}

      {/* Core Competencies */}
      <section className="py-20 bg-white border-b border-[#F5F5F7]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-[#0B1B3B]">
              Foundational Expertise
            </h2>
            <div className="w-16 h-1 bg-[#D4C5A0] mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {coreCompetencies.map((core, idx) => (
              <div
                key={idx}
                className="bg-[#F5F5F7] p-8 border-t-4 border-[#1A2F5A] text-center"
              >
                <Scale
                  className="w-10 h-10 text-[#1A2F5A] mx-auto mb-6"
                  strokeWidth={1.5}
                />
                <h3 className="text-xl font-serif text-[#0B1B3B] mb-4">
                  {core.title}
                </h3>
                <p className="text-[#2E4472] font-light">{core.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Groups */}
      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto space-y-32">
          {practiceGroups.map((group) => (
            <div key={group.id} id={group.id} className="scroll-mt-32">
              {/* Group Header */}
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-12 border-b border-[#0B1B3B]/10 pb-8">
                <div className="p-4 bg-[#0B1B3B] text-[#D4C5A0]">
                  <group.icon size={40} strokeWidth={1.5} />
                </div>
                <div>
                  <span className="text-[#D4C5A0] font-bold tracking-[0.2em] text-xs uppercase mb-2 block">
                    Practice Group
                  </span>
                  <h2 className="text-4xl md:text-5xl font-light text-[#0B1B3B]">
                    {group.title}
                  </h2>
                </div>
                <p className="md:ml-auto md:max-w-md text-[#2E4472] font-light text-right">
                  {group.description}
                </p>
              </div>

              {/* Areas Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.areas.map((area, idx) => (
                  <div
                    key={idx}
                    className="group border border-[#0B1B3B]/10 p-8 hover:border-[#D4C5A0] hover:shadow-lg transition-all duration-300 bg-white"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <area.icon
                        className="w-8 h-8 text-[#2E4472] group-hover:text-[#D4C5A0] transition-colors"
                        strokeWidth={1.5}
                      />
                      <div className="w-8 h-8 rounded-full border border-[#0B1B3B]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-4 h-4 text-[#0B1B3B]" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#0B1B3B] mb-1">
                      {area.title}
                    </h3>
                    {area.subtitle && (
                      <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">
                        {area.subtitle}
                      </p>
                    )}
                    <p className="text-[#2E4472] font-light text-sm leading-relaxed mt-4">
                      {area.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Org Ticker */}
      {orgLogos && orgLogos.length > 0 && (
        <LogoTicker
          title="Member Organizations"
          items={orgLogos}
          theme="light"
        />
      )}

      <CTASection />
    </div>
  );
};

export default PracticeAreaPage;
