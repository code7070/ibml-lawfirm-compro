"use client";

import { useEffect } from "react";
import {
  Cpu,
  Users,
  Shield,
  Globe,
  Scale,
  FileText,
  CheckCircle2,
} from "lucide-react";
import CTASection from "./CTASection";

interface PracticeAreaPageProps {
  targetId?: string | null;
}

const detailedPractices = [
  {
    id: "game-dev",
    title: "Game Development Law",
    icon: Cpu,
    tagline: "From Concept to Gold Master",
    description:
      "We provide end-to-end legal support for game developers, understanding the unique lifecycle of software entertainment. Whether you are a solo indie dev or a AAA studio, we ensure your IP is secured and your commercial relationships are sound.",
    capabilities: [
      "Publisher & Distribution Agreements",
      "Engine & Middleware Licensing (Unreal, Unity)",
      "Contractor & Employee IP Assignment",
      "Open Source License Compliance",
      "Age Rating (ESRB/PEGI) & Consumer Protection",
    ],
  },
  {
    id: "esports",
    title: "eSports Representation",
    icon: Users,
    tagline: "For the Competitive Arena",
    description:
      "The eSports landscape is a wild west of regulation. We bring order to the chaos by representing teams, tournament organizers, and individual talent. Our firm has structured some of the largest franchise league buy-ins in history.",
    capabilities: [
      "Player & Talent Agency Contracts",
      "Franchise League Participation Agreements",
      "Sponsorship & Brand Endorsements",
      "Visa & Immigration for International Talent",
      "Tournament Rules & Governance Structures",
    ],
  },
  {
    id: "ip",
    title: "Intellectual Property",
    icon: Shield,
    tagline: "Defending Digital Assets",
    description:
      "In the digital age, your code and your brand are your most valuable assets. We employ aggressive strategies to protect your trademarks, copyrights, and trade secrets across global jurisdictions.",
    capabilities: [
      "Trademark Search, Filing & Prosecution",
      "Copyright Registration for Code & Art Assets",
      "Trade Secret Protection Programs",
      "DMCA Takedown Enforcement",
      "Licensing & Merchandising Deals",
    ],
  },
  {
    id: "creators",
    title: "Content Creator Rights",
    icon: Globe,
    tagline: "Empowering Voices",
    description:
      "Streamers and influencers are the new media powerhouses. We help creators professionalize their business, protecting them from predatory MCN contracts and ensuring they own the value they create.",
    capabilities: [
      "MCN (Multi-Channel Network) Contract Review",
      "Brand Partnership & Sponsorship Agreements",
      "Platform Exclusivity Negotiations",
      "Rights of Publicity Management",
      "Content Licensing & Syndication",
    ],
  },
  {
    id: "litigation",
    title: "Platform Litigation",
    icon: Scale,
    tagline: "Restoring Access & Rights",
    description:
      "When platforms strike with bans or demonetization, your livelihood is at risk. We specialize in dispute resolution with major tech platforms, recovering accounts and digital assets for our clients.",
    capabilities: [
      "Terms of Service (ToS) Dispute Resolution",
      "Account Ban Appeals & Recovery",
      "Digital Asset & Skin Recovery",
      "Defamation & Harassment Litigation",
      "Arbitration & Mediation",
    ],
  },
  {
    id: "corporate",
    title: "Corporate Structuring",
    icon: FileText,
    tagline: "Building the Foundation",
    description:
      "We help gaming and tech startups build a solid legal foundation that attracts investment. From incorporation to exit, we guide founders through the complexities of corporate finance and governance.",
    capabilities: [
      "Entity Formation (C-Corp, LLC)",
      "Founder Agreements & Equity Vesting",
      "Seed, Series A, & VC Financing",
      "Mergers & Acquisitions (M&A)",
      "Stock Option Plans (ESOP)",
    ],
  },
];

const PracticeAreaPage = ({ targetId }: PracticeAreaPageProps) => {
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#0B1B3B] text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <span className="text-[#D4C5A0] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">
            Our Expertise
          </span>
          <h1 className="text-5xl md:text-7xl font-light mb-8">
            Architecture of{" "}
            <span className="font-serif italic text-[#D4C5A0]">
              Digital Defense
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Specialized legal counsel built for the speed and complexity of the
            modern digital economy. We don&apos;t just know the law; we know the
            industry.
          </p>
        </div>
      </section>

      {/* Main Content - Zig Zag Layout */}
      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto space-y-32">
          {detailedPractices.map((practice, index) => (
            <div
              key={practice.id}
              id={practice.id}
              className={`grid lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Text Side */}
              <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-[#0B1B3B] border border-[#D4C5A0]">
                    <practice.icon
                      className="w-8 h-8 text-[#D4C5A0]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-[#2E4472] font-bold tracking-[0.2em] text-xs uppercase">
                    {practice.tagline}
                  </span>
                </div>

                <h2 className="text-4xl font-serif text-[#0B1B3B] mb-6">
                  {practice.title}
                </h2>

                <p className="text-[#2E4472] text-lg font-light leading-relaxed mb-10">
                  {practice.description}
                </p>

                <div className="bg-[#F5F5F7] p-8 border-l-4 border-[#D4C5A0]">
                  <h4 className="text-[#0B1B3B] font-bold text-sm uppercase tracking-widest mb-6">
                    Key Capabilities
                  </h4>
                  <ul className="space-y-4">
                    {practice.capabilities.map((cap, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-[#2E4472] font-light"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#D4C5A0] shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Visual Side */}
              <div
                className={`${
                  index % 2 === 1 ? "lg:col-start-1" : ""
                } relative group`}
              >
                <div className="absolute inset-0 bg-[#0B1B3B] transform translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
                <div className="relative aspect-[4/3] overflow-hidden border border-[#D4C5A0]/20 bg-[#1A2F5A]">
                  <div
                    className={`w-full h-full bg-gradient-to-br ${
                      index % 2 === 0
                        ? "from-[#0B1B3B] to-[#1A2F5A]"
                        : "from-[#1A2F5A] to-[#0B1B3B]"
                    } flex items-center justify-center relative overflow-hidden`}
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          "url('https://www.transparenttextures.com/patterns/cubes.png')",
                      }}
                    ></div>
                    <practice.icon className="w-48 h-48 text-white/5 absolute -bottom-10 -right-10" />

                    <div className="text-center p-8 relative z-10">
                      <span className="text-6xl font-serif text-[#D4C5A0]/20 font-bold block mb-4">
                        0{index + 1}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Navigation / Summary */}
      <section className="bg-[#F5F5F7] py-24 border-t border-[#0B1B3B]/5">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <h3 className="text-3xl font-light text-[#0B1B3B] mb-12">
            Not sure which area fits your needs?
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {detailedPractices.map((p) => (
              <button
                key={p.id}
                onClick={() => scrollToSection(p.id)}
                className="px-6 py-3 border border-[#0B1B3B]/20 text-[#0B1B3B] hover:bg-[#0B1B3B] hover:text-[#D4C5A0] transition-colors uppercase text-xs font-bold tracking-widest"
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default PracticeAreaPage;
