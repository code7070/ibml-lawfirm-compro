"use client";

import { LinkedinIcon, Mail } from "lucide-react";
import { LawyerWithPositionAndPracticeAreas } from "@/lib/types/database";
import EmailTooltip from "@/components/EmailTooltip";


export interface LawyerCardProps {
  member: LawyerWithPositionAndPracticeAreas;
  locale: string;
  onClick: () => void;
}

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
        {/* Position label — pinned top-left above photo */}
        <div className="absolute top-0 left-0 z-10 bg-[#0B1B3B] px-3.5 py-2.5 shadow-[0_14px_30px_rgba(11,27,59,0.18)]">
          <span className="text-[#D4C5A0] text-[10px] font-semibold uppercase tracking-[0.18em] leading-none">
            {role}
          </span>
        </div>

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

        {/* Legacy social drawer retained for reference */}
        {/*
        <div className="absolute bottom-0 left-0 w-full p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex gap-4 bg-[#0B1B3B]">
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
        */}
      </div>

      {/* Text Info */}
      <div className="border-l-2 border-transparent group-hover:border-[#D4C5A0] pl-5 transition-all duration-300">
        <h3 className="text-[1.4rem] font-normal text-[#0B1B3B] mb-1.5 font-serif leading-[1.1] tracking-[-0.01em]">
          {name}
        </h3>
        {specialty && (
          <p className="text-[#1A2F5A]/62 text-[11px] font-medium uppercase tracking-[0.14em] mb-5">
            {specialty}
          </p>
        )}
        {(member.email || member.linkedin_url) && (
          <div className="flex flex-col items-start gap-3 text-[#2E4472]/82">
            {member.email && (
              <EmailTooltip email={member.email} />
            )}

            {member.linkedin_url && (
              <a
                href={member.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="group/linkedin inline-flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.12em] text-[#1A2F5A]/62 transition-colors duration-200 hover:text-[#0B1B3B]"
              >
                <LinkedinIcon className="w-4 h-4 shrink-0 text-[#1A2F5A]/55 transition-colors duration-200 group-hover/linkedin:text-[#0B1B3B]" />
                <span className="relative inline-block pb-0.5">
                  LinkedIn
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#D4C5A0] transition-transform duration-300 ease-out group-hover/linkedin:scale-x-100"
                  />
                </span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LawyerCard;
