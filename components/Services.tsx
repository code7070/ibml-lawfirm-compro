"use client";

import {
  Shield,
  Cpu,
  Users,
  FileText,
  ArrowRight,
  Gamepad2,
  HeartPulse,
} from "lucide-react";
import Link from "next/link";
import { Service } from "../types";

// Updated to match Practice Area Groups
const services: Service[] = [
  {
    id: "entertainment",
    title: "Entertainment Practice Group",
    description:
      "Specialized counsel for the creators of digital worlds and modern entertainment experiences. Covering Games, MICE events, and Influencers.",
    icon: Gamepad2,
  },
  {
    id: "people",
    title: "People & Labour Practice Group",
    description:
      "Protecting the human element behind the innovation. Private client services, family law, and cross-border workforce strategies.",
    icon: Users,
  },
  {
    id: "tech",
    title: "Tech Practice Group",
    description:
      "Cutting-edge legal frameworks for emerging technologies. Expertise in Data Protection, FinTech, and Digital Communication infrastructure.",
    icon: Cpu,
  },
  {
    id: "health",
    title: "Health & Education Practice Group",
    description:
      "Navigating the complex regulatory landscape of institutional services, EdTech regulations, and gamified healthcare systems.",
    icon: HeartPulse,
  },
];

const Services = () => {
  return (
    <section id="expertise" className="relative py-32 bg-[#F5F5F7]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-[#0B1B3B]/10 pb-12">
          <div className="max-w-2xl">
            <span className="text-[#0B1B3B] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
              Practice Groups
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

        {/* Updated Grid to 2 columns on large screens for 4 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/practice-areas#${service.id}`}
              className="group relative bg-white border border-[#1A2F5A] p-12 hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col"
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

              <p className="text-[#2E4472] leading-[1.8] mb-8 font-light flex-grow">
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
