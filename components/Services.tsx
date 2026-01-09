"use client";

import {
  Scale,
  Shield,
  Globe,
  Cpu,
  Users,
  FileText,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Service } from "../types";

const services: Service[] = [
  {
    id: "game-dev",
    title: "Game Development Law",
    description:
      "Comprehensive counsel for indie studios and AAA publishers. From dev agreements to IP clearance.",
    icon: Cpu,
  },
  {
    id: "esports",
    title: "eSports Representation",
    description:
      "Player contracts, team franchising, and tournament regulation. Protecting talent and organizations.",
    icon: Users,
  },
  {
    id: "ip",
    title: "Intellectual Property",
    description:
      "Trademark, copyright, and trade secret protection for digital assets, code, and virtual goods.",
    icon: Shield,
  },
  {
    id: "creators",
    title: "Content Creator Rights",
    description:
      "Negotiating brand deals, platform disputes, and MCN contracts for top-tier influencers.",
    icon: Globe,
  },
  {
    id: "litigation",
    title: "Platform Litigation",
    description:
      "Dispute resolution for ToS violations, bans, and digital asset recovery.",
    icon: Scale,
  },
  {
    id: "corporate",
    title: "Corporate Structuring",
    description:
      "Entity formation, M&A, and financing strategies for high-growth gaming tech startups.",
    icon: FileText,
  },
];

const Services = () => {
  return (
    <section id="expertise" className="relative py-32 bg-[#F5F5F7]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-[#0B1B3B]/10 pb-12">
          <div className="max-w-2xl">
            <span className="text-[#0B1B3B] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
              Our Practice Areas
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-[#0B1B3B]">
              Architecture of{" "}
              <span className="font-serif italic text-[#2E4472]">
                Digital Defense
              </span>
            </h2>
          </div>
          <div className="hidden md:block">
            <p className="text-[#2E4472] max-w-md text-right leading-relaxed">
              Tailored legal strategies for the fast-paced ecosystem of gaming
              and entertainment.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/practice-areas#${service.id}`}
              className="group relative bg-white border border-[#1A2F5A] p-12 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              {/* Gold Accent Line */}
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

              <div className="flex items-center gap-2 text-[#D4C5A0] text-sm font-bold uppercase tracking-widest group-hover:text-[#0B1B3B] transition-colors">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
