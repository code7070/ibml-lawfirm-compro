"use client";

import { LinkedinIcon, Mail } from "lucide-react";
import { LawyerWithPositionAndPracticeAreas } from "@/lib/types/database";

export interface LawyerCardProps {
  member: LawyerWithPositionAndPracticeAreas;
  locale: string;
  onClick: () => void;
}

// Legacy card — role shown below photo in gold text, email visible on hover only.
// Section title: positions joined with " · " (e.g. "Managing Partner · Partner · Counsel").
const LawyerCard: React.FC<LawyerCardProps> = ({ member, locale, onClick }) => {
  const name = locale === "id" ? member.name_id : member.name_en;
  const role = member.lawyer_positions
    ? locale === "id"
      ? member.lawyer_positions.name_id
      : member.lawyer_positions.name_en
    : locale === "id"
      ? member.position_id
      : member.position_en;

  const primaryArea = member.practice_areas?.[0];
  const specialty = primaryArea?.practice_areas
    ? locale === "id"
      ? primaryArea.practice_areas.name_id
      : primaryArea.practice_areas.name_en
    : "";

  return (
    <div
      id={member.slug || member.id}
      className="group cursor-pointer scroll-mt-24"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-3/4 mb-6 overflow-hidden bg-[#F5F5F7]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            member.photo_url ||
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
          }
          alt={name}
          className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-out"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-[#0B1B3B]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Decorative border frame */}
        <div className="absolute inset-0 border border-transparent group-hover:border-[#D4C5A0] transition-colors duration-500 m-4" />

        {/* Social Links Slide Up */}
        <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex gap-4 bg-[#0B1B3B]">
          {member.linkedin_url && (
            <a
              href={member.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <LinkedinIcon className="w-5 h-5 text-[#D4C5A0] hover:text-white transition-colors" />
            </a>
          )}
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
          {name}
        </h3>
        <p className="text-[#D4C5A0] text-xs font-bold uppercase tracking-widest mb-1">
          {role}
        </p>
        <p className="text-gray-400 text-sm font-light mb-2">{specialty}</p>
        {member.email && (
          <p className="text-[#2E4472] text-xs font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {member.email}
          </p>
        )}
      </div>
    </div>
  );
};

export default LawyerCard;
