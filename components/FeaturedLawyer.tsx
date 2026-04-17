"use client";

import { LinkedinIcon, Mail } from "lucide-react";
import { LawyerWithPositionAndPracticeAreas } from "@/lib/types/database";

interface FeaturedLawyerProps {
  member: LawyerWithPositionAndPracticeAreas;
  locale: string;
  onClick: () => void;
  ctaLabel: string;
}

const FeaturedLawyer: React.FC<FeaturedLawyerProps> = ({
  member,
  locale,
  onClick,
  ctaLabel,
}) => {
  const name = locale === "id" ? member.name_id : member.name_en;
  const role = member.lawyer_positions
    ? locale === "id"
      ? member.lawyer_positions.name_id
      : member.lawyer_positions.name_en
    : locale === "id"
      ? member.position_id
      : member.position_en;
  const bio = locale === "id" ? member.bio_id : member.bio_en;
  const initial = name?.charAt(0) || "";

  const practiceAreaNames = (member.practice_areas || [])
    .map((pa) =>
      pa.practice_areas
        ? locale === "id"
          ? pa.practice_areas.name_id
          : pa.practice_areas.name_en
        : null
    )
    .filter((n): n is string => Boolean(n))
    .slice(0, 4);

  return (
    <div id={member.slug || member.id} className="group relative scroll-mt-24">
      {/* Ornamental initial watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 right-0 md:right-8 select-none overflow-hidden max-w-full"
      >
        <span className="block font-serif text-[220px] md:text-[340px] leading-none font-light tracking-tighter text-[#0B1B3B]/[0.05]">
          {initial}
        </span>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
        {/* Portrait */}
        <div
          className="md:col-span-5 relative cursor-pointer"
          onClick={onClick}
        >
          <div className="relative aspect-3/4 overflow-hidden bg-[#F5F5F7]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                member.photo_url ||
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
              }
              alt={name}
              className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-[#0B1B3B]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          {/* Gold corner brackets */}
          <span
            aria-hidden
            className="absolute -top-2 -left-2 w-10 h-10 border-t border-l border-[#D4C5A0]"
          />
          <span
            aria-hidden
            className="absolute -bottom-2 -right-2 w-10 h-10 border-b border-r border-[#D4C5A0]"
          />
        </div>

        {/* Content */}
        <div className="md:col-span-7 md:pt-6">
          <div className="flex items-center gap-4 mb-6">
            <span aria-hidden className="h-px w-12 bg-[#D4C5A0]" />
            <span className="text-[#D4C5A0] text-[11px] font-bold uppercase tracking-[0.25em]">
              {role}
            </span>
          </div>

          <h3
            onClick={onClick}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0B1B3B] font-light leading-[1.05] mb-4 cursor-pointer hover:text-[#1A2F5A] transition-colors"
          >
            {name}
          </h3>

          {member.email && (
            <a
              href={`mailto:${member.email}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-[#2E4472] hover:text-[#D4C5A0] text-sm font-light tracking-wide mb-8 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="border-b border-[#0B1B3B]/10 hover:border-[#D4C5A0] pb-0.5 transition-colors">
                {member.email}
              </span>
            </a>
          )}

          {bio && (
            <p className="text-[#2E4472]/85 font-serif italic font-light leading-relaxed text-base md:text-lg max-w-xl mb-8 line-clamp-5">
              {bio}
            </p>
          )}

          {practiceAreaNames.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10 max-w-xl">
              {practiceAreaNames.map((areaName, i) => (
                <span
                  key={i}
                  className="text-[11px] uppercase tracking-[0.2em] text-[#2E4472] border border-[#0B1B3B]/15 px-3 py-1.5"
                >
                  {areaName}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-6 flex-wrap">
            <button
              onClick={onClick}
              className="group/cta inline-flex items-center gap-3 text-[#0B1B3B] text-xs font-medium uppercase tracking-[0.2em] cursor-pointer"
            >
              <span className="relative pb-1">
                {ctaLabel}
                <span
                  aria-hidden
                  className="absolute left-0 bottom-0 h-px w-full bg-[#D4C5A0] origin-left scale-x-50 group-hover/cta:scale-x-100 transition-transform duration-500"
                />
              </span>
              <span className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">
                →
              </span>
            </button>

            {member.linkedin_url && (
              <div className="flex items-center gap-4 pl-6 border-l border-[#0B1B3B]/10">
                <a
                  href={member.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#2E4472] hover:text-[#D4C5A0] transition-colors" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedLawyer;
