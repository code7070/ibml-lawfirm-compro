"use client";

import { useEffect } from "react";
import { LinkedinIcon, Mail } from "lucide-react";
import CTASection from "./CTASection";
import { TeamMember } from "../types";

// Data Segments
const partners: TeamMember[] = [
  {
    id: "p1",
    name: "Elena Vance",
    role: "Managing Partner",
    specialty: "Corporate & M&A",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    email: "elena.vance@iblm.law",
  },
  {
    id: "p2",
    name: "Marcus Thorne",
    role: "Partner",
    specialty: "IP Litigation",
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    email: "marcus.thorne@iblm.law",
  },
  {
    id: "p3",
    name: "James Sterling",
    role: "Partner",
    specialty: "International Trade",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    email: "james.sterling@iblm.law",
  },
];

const counsel: TeamMember[] = [
  {
    id: "c1",
    name: "Sarah Jenkins",
    role: "Senior Counsel",
    specialty: "Data & Privacy",
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
    email: "sarah.jenkins@iblm.law",
  },
  {
    id: "c2",
    name: "Robert Chen",
    role: "Of Counsel",
    specialty: "Patent Law",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
    email: "robert.chen@iblm.law",
  },
];

const associates: TeamMember[] = [
  {
    id: "a1",
    name: "David Choi",
    role: "Associate",
    specialty: "eSports Contracts",
    imageUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "a2",
    name: "Maya Patel",
    role: "Associate",
    specialty: "Digital Rights",
    imageUrl:
      "https://images.unsplash.com/photo-1598550874175-4d7112ee7f38?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "a3",
    name: "Liam O'Connor",
    role: "Associate",
    specialty: "Labor & Employment",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "a4",
    name: "Sophie Al-Fayed",
    role: "Associate",
    specialty: "FinTech Compliance",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
  },
];

const LawyerCard: React.FC<{ member: TeamMember }> = ({ member }) => (
  <div className="group cursor-pointer">
    {/* Image Container */}
    <div className="relative aspect-3/4 mb-6 overflow-hidden bg-[#F5F5F7]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={member.imageUrl}
        alt={member.name}
        className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-out"
      />

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-[#0B1B3B]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Decorative border frame */}
      <div className="absolute inset-0 border border-transparent group-hover:border-[#D4C5A0] transition-colors duration-500 m-4" />

      {/* Social Links Slide Up */}
      <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex gap-4 bg-[#0B1B3B]">
        <LinkedinIcon className="w-5 h-5 text-[#D4C5A0] hover:text-white transition-colors" />
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Mail className="w-5 h-5 text-[#D4C5A0] hover:text-white transition-colors" />
          </a>
        )}
      </div>
    </div>

    {/* Text Info */}
    <div className="border-l-2 border-transparent group-hover:border-[#D4C5A0] pl-4 transition-all duration-300">
      <h3 className="text-2xl font-normal text-[#0B1B3B] mb-1 font-serif">
        {member.name}
      </h3>
      <p className="text-[#D4C5A0] text-xs font-bold uppercase tracking-widest mb-1">
        {member.role}
      </p>
      <p className="text-gray-400 text-sm font-light mb-2">
        {member.specialty}
      </p>
      {member.email && (
        <p className="text-[#2E4472] text-xs font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {member.email}
        </p>
      )}
    </div>
  </div>
);

const LawyersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#0B1B3B] text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <span className="text-[#D4C5A0] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">
            The Council
          </span>
          <h1 className="text-5xl md:text-7xl font-light mb-8">
            Architects of{" "}
            <span className="font-serif italic text-[#D4C5A0]">Strategy</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            A coalition of veterans from big law, in-house counsel at AAA
            studios, and policy advisors.
          </p>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-16 border-b border-[#0B1B3B]/10 pb-8">
            <h2 className="text-4xl font-light text-[#0B1B3B]">Partners</h2>
            <p className="hidden md:block text-[#2E4472] font-light max-w-sm text-right">
              Leading our practice areas with decades of combined experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {partners.map((member) => (
              <LawyerCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Counsel Section */}
      <section className="py-24 px-6 bg-[#F5F5F7]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 border-b border-[#0B1B3B]/10 pb-8">
            <h2 className="text-4xl font-light text-[#0B1B3B]">Counsel</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {counsel.map((member) => (
              <LawyerCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Associates Section */}
      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 border-b border-[#0B1B3B]/10 pb-8">
            <h2 className="text-4xl font-light text-[#0B1B3B]">Associates</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {associates.map((member) => (
              <LawyerCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default LawyersPage;
