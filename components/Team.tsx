"use client";

import { useState } from "react";
import Button from "./Button";
import { Linkedin, Mail } from "lucide-react";
import { LawyerWithPositionAndPracticeAreas } from "@/lib/types/database";
import LawyerDetailPopup, {
  LawyerDetailTranslations,
} from "./LawyerDetailPopup";

// Translation keys for Team section
export interface TeamTranslations {
  title: string;
  subtitle: string;
  cta: string;
  noTeam?: string;
  detail: LawyerDetailTranslations;
}

interface TeamProps {
  lawyers: LawyerWithPositionAndPracticeAreas[];
  locale: string;
  translations: TeamTranslations;
}

const Team = ({ lawyers, locale, translations }: TeamProps) => {
  // Popup state
  const [selectedLawyer, setSelectedLawyer] =
    useState<LawyerWithPositionAndPracticeAreas | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Take only the first 4-6 lawyers for homepage display
  const displayLawyers = lawyers.slice(0, 4);

  // Open popup with selected lawyer
  const handleLawyerClick = (lawyer: LawyerWithPositionAndPracticeAreas) => {
    setSelectedLawyer(lawyer);
    setIsPopupOpen(true);
  };

  // Close popup
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
    // First try from lawyer_positions relation
    if (lawyer.lawyer_positions) {
      return getLocalizedText(
        lawyer.lawyer_positions.name_en,
        lawyer.lawyer_positions.name_id,
      );
    }
    // Fallback to position_en field
    return lawyer.position_en || "";
  };
  return (
    <section id="team" className="py-32 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <div>
            <span className="text-[#0B1B3B] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
              {translations.subtitle}
            </span>
            <h2 className="text-5xl font-light text-[#0B1B3B]">
              {translations.title}
            </h2>
          </div>
          <div className="hidden md:block">
            <Button variant="secondary" href="/lawyers">
              {translations.cta}
            </Button>
          </div>
        </div>

        {/* Members Grid - NEW CARD DESIGN */}
        {displayLawyers.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p>
              {translations.noTeam ||
                "No team members available at the moment."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {displayLawyers.map((lawyer) => {
              const name = getLocalizedText(lawyer.name_en, lawyer.name_id);
              const position = getPositionName(lawyer);
              const specialty = getPrimaryPracticeArea(lawyer);
              const photoUrl =
                lawyer.photo_url || "/images/placeholder-lawyer.jpg";

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

                    {/* Social Links Slide Up */}
                    <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex gap-4 bg-[#0B1B3B]">
                      {lawyer.linkedin_url && (
                        <a
                          href={lawyer.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Linkedin className="w-5 h-5 text-[#D4C5A0] hover:text-white transition-colors" />
                        </a>
                      )}
                      {lawyer.email && (
                        <a
                          href={`mailto:${lawyer.email}`}
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
                      {position}
                    </p>
                    <p className="text-gray-400 text-sm font-light">
                      {specialty}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-16 md:hidden text-center">
          <Button variant="secondary" href="/lawyers">
            {translations.cta}
          </Button>
        </div>
      </div>

      {/* Lawyer Detail Popup */}
      <LawyerDetailPopup
        lawyer={selectedLawyer}
        locale={locale}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        translations={translations.detail}
      />
    </section>
  );
};

export default Team;
