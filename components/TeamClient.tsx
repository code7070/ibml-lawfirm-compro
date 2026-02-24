"use client";

import { useState } from "react";
import { Linkedin, Mail, Phone } from "lucide-react";
import { LawyerWithPositionAndPracticeAreas } from "@/lib/types/database";
import LawyerDetailPopup from "./LawyerDetailPopup";
import { TeamTranslations } from "./Team";

interface TeamClientProps {
  lawyers: LawyerWithPositionAndPracticeAreas[];
  locale: string;
  translations: TeamTranslations;
}

const TeamClient = ({ lawyers, locale, translations }: TeamClientProps) => {
  const [selectedLawyer, setSelectedLawyer] =
    useState<LawyerWithPositionAndPracticeAreas | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleLawyerClick = (lawyer: LawyerWithPositionAndPracticeAreas) => {
    setSelectedLawyer(lawyer);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedLawyer(null);
  };

  // Helper to get localized text
  const getLocalizedText = (en: string | null, id: string | null) => {
    if (locale === "id") return id || en || "";
    return en || id || "";
  };

  // Get primary practice area name for a lawyer
  const getPrimaryPracticeArea = (
    lawyer: LawyerWithPositionAndPracticeAreas,
  ) => {
    const practiceAreas = lawyer.practice_areas || [];
    if (practiceAreas.length === 0) return "";
    const primary = practiceAreas[0]?.practice_areas;
    if (!primary) return "";
    return getLocalizedText(primary.name_en, primary.name_id);
  };

  // Get position name
  const getPositionName = (lawyer: LawyerWithPositionAndPracticeAreas) => {
    if (lawyer.lawyer_positions) {
      return getLocalizedText(
        lawyer.lawyer_positions.name_en,
        lawyer.lawyer_positions.name_id,
      );
    }
    return lawyer.position_en || "";
  };

  if (lawyers.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p>
          {translations.noTeam || "No team members available at the moment."}
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {lawyers.map((lawyer) => {
          const name = getLocalizedText(lawyer.name_en, lawyer.name_id);
          const position = getPositionName(lawyer);
          const specialty = getPrimaryPracticeArea(lawyer);
          const photoUrl = lawyer.photo_url || "/images/placeholder-lawyer.jpg";

          const hasContact =
            lawyer.email || lawyer.phone || lawyer.linkedin_url;

          return (
            <div
              key={lawyer.id}
              className="group cursor-pointer"
              onClick={() => handleLawyerClick(lawyer)}
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-[#F5F5F7]">
                {/* Image: Grayscale by default, color on hover */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoUrl}
                  alt={name}
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-out"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[#0B1B3B]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Decorative border frame */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[#D4C5A0] transition-colors duration-500 m-4" />

                {/* Social Links Slide Up — icon-only bar on hover (LinkedIn + social) */}
                {/*{hasContact && (
                  <div className="absolute bottom-0 left-0 w-full px-6 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex gap-4 bg-[#0B1B3B]">
                    {lawyer.linkedin_url && (
                      <a
                        href={lawyer.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin className="w-5 h-5 text-[#D4C5A0] hover:text-white transition-colors" />
                      </a>
                    )}
                    {lawyer.email && (
                      <a
                        href={`mailto:${lawyer.email}`}
                        title={lawyer.email}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Mail className="w-5 h-5 text-[#D4C5A0] hover:text-white transition-colors" />
                      </a>
                    )}
                    {lawyer.phone && (
                      <a
                        href={`tel:${lawyer.phone}`}
                        title={lawyer.phone}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Phone className="w-5 h-5 text-[#D4C5A0] hover:text-white transition-colors" />
                      </a>
                    )}
                  </div>
                )}*/}
              </div>

              {/* Text Info */}
              <div className="border-l-2 border-transparent group-hover:border-[#D4C5A0] pl-4 transition-all duration-300">
                {/* Name */}
                <h3 className="text-2xl font-normal text-[#0B1B3B] mb-1 font-serif">
                  {name}
                </h3>

                {/* Position */}
                <p className="text-[#D4C5A0] text-xs font-bold uppercase tracking-widest mb-1">
                  {position}
                </p>

                {/* Specialty */}
                {specialty && (
                  <p className="text-gray-400 text-sm font-light mb-4">
                    {specialty}
                  </p>
                )}

                {/* ─── Contact Info — Always Visible ─── */}
                {(lawyer.email || lawyer.phone) && (
                  <div
                    className="mt-3 pt-3 border-t border-[#E8DBBF] space-y-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {lawyer.email && (
                      <a
                        href={`mailto:${lawyer.email}`}
                        className="flex items-center gap-2 group/contact"
                        title={`Email ${name}`}
                      >
                        <Mail className="w-3.5 h-3.5 text-[#D4C5A0] shrink-0" />
                        <span className="text-[#4A639D] text-xs font-light tracking-wide truncate group-hover/contact:text-[#0B1B3B] transition-colors duration-200 underline decoration-[#D4C5A0]/40 underline-offset-2 hover:decoration-[#D4C5A0]">
                          {lawyer.email}
                        </span>
                      </a>
                    )}
                    {lawyer.phone && (
                      <a
                        href={`tel:${lawyer.phone}`}
                        className="flex items-center gap-2 group/contact"
                        title={`Call ${name}`}
                      >
                        <Phone className="w-3.5 h-3.5 text-[#D4C5A0] shrink-0" />
                        <span className="text-[#4A639D] text-xs font-light tracking-wide group-hover/contact:text-[#0B1B3B] transition-colors duration-200">
                          {lawyer.phone}
                        </span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lawyer Detail Popup */}
      <LawyerDetailPopup
        lawyer={selectedLawyer}
        locale={locale}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        translations={translations.detail}
      />
    </>
  );
};

export default TeamClient;
