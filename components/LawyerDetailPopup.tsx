"use client";

import { useEffect, useCallback } from "react";
import {
  X,
  Linkedin,
  Mail,
  Phone,
  Award,
  GraduationCap,
  Briefcase,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { LawyerWithPositionAndPracticeAreas } from "@/lib/types/database";

// Translation keys for LawyerDetailPopup
export interface LawyerDetailTranslations {
  education: string;
  certifications: string;
  languages: string;
  practiceAreas: string;
  contactInfo: string;
  socialLinks: string;
  viewProfile: string;
  close: string;
  email: string;
  phone: string;
  linkedin: string;
  instagram: string;
  twitter: string;
  // Additional keys used in popup
  overview?: string;
  experience?: string;
  noBio?: string;
  linkedinProfile?: string;
}

interface LawyerDetailPopupProps {
  lawyer: LawyerWithPositionAndPracticeAreas | null;
  locale: string;
  isOpen: boolean;
  onClose: () => void;
  translations: LawyerDetailTranslations;
}

const LawyerDetailPopup = ({
  lawyer,
  locale,
  isOpen,
  onClose,
  translations,
}: LawyerDetailPopupProps) => {
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, handleEscapeKey]);

  if (!isOpen || !lawyer) return null;

  const getLocalizedText = (en: string | null, id: string | null) => {
    if (locale === "id") return id || en || "";
    return en || id || "";
  };

  const name = getLocalizedText(lawyer.name_en, lawyer.name_id);
  const bio = getLocalizedText(lawyer.bio_en, lawyer.bio_id);
  const photoUrl = lawyer.photo_url || "/images/placeholder-lawyer.jpg";

  const positionName = lawyer.lawyer_positions
    ? getLocalizedText(
        lawyer.lawyer_positions.name_en,
        lawyer.lawyer_positions.name_id,
      )
    : lawyer.position_en || "";

  const parseEducation = (json: unknown): string[] => {
    if (!json || !Array.isArray(json)) return [];
    return json
      .map((item) => {
        if (typeof item === "string") return item;
        if (typeof item === "object" && item !== null) {
          const obj = item as Record<string, unknown>;
          const degree = obj.degree ? String(obj.degree) : "";
          const institution = obj.institution ? String(obj.institution) : "";
          if (degree && institution) return `${degree}, ${institution}`;
          return degree || institution || "";
        }
        return "";
      })
      .filter(Boolean);
  };

  const parseExperience = (json: unknown): string[] => {
    if (!json || !Array.isArray(json)) return [];
    return json
      .map((item) => {
        if (typeof item === "string") return item;
        if (typeof item === "object" && item !== null) {
          const obj = item as Record<string, unknown>;
          const company = obj.company ? String(obj.company) : "";
          const position = obj.position ? String(obj.position) : "";
          const period = obj.period ? String(obj.period) : "";
          let result = "";
          if (position && company) {
            result = `${position} at ${company}`;
          } else {
            result = company || position || "";
          }
          if (period && result) result += ` (${period})`;
          return result;
        }
        return "";
      })
      .filter(Boolean);
  };

  const parseLanguages = (json: unknown): string[] => {
    if (!json || !Array.isArray(json)) return [];
    return json
      .map((item) => {
        if (typeof item === "string") return item;
        if (typeof item === "object" && item !== null) {
          const obj = item as Record<string, unknown>;
          return obj.language ? String(obj.language) : "";
        }
        return "";
      })
      .filter(Boolean);
  };

  const education = parseEducation(lawyer.education);
  const experience = parseExperience(lawyer.experience);
  const languages = parseLanguages(lawyer.languages);
  const certifications = lawyer.certifications || [];

  const practiceAreas = (lawyer.practice_areas || [])
    .map((pa) =>
      pa.practice_areas
        ? getLocalizedText(
            pa.practice_areas.name_en,
            pa.practice_areas.name_id,
          )
        : "",
    )
    .filter(Boolean);

  const labels = {
    overview:
      translations.overview || (locale === "id" ? "Profil" : "Overview"),
    experience:
      translations.experience ||
      (locale === "id" ? "Pengalaman Profesional" : "Professional Experience"),
    education: translations.education,
    certifications: translations.certifications,
    languages: translations.languages,
    linkedinProfile: translations.linkedinProfile || translations.linkedin,
    noBio:
      translations.noBio ||
      (locale === "id"
        ? "Biografi belum tersedia."
        : "No biography available."),
  };

  const hasExperience = experience.length > 0;
  const hasEducation = education.length > 0;
  const hasCertifications = certifications.length > 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#020814]/85 backdrop-blur-sm lawyer-popup-backdrop"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-[0_0_0_1px_rgba(212,197,160,0.12),0_32px_64px_rgba(2,8,20,0.55)] overflow-hidden flex flex-col max-h-[92vh] lawyer-popup-enter">
        {/* Left gold accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#D4C5A0] via-[#D4C5A0]/40 to-transparent z-10 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-[#0B1B3B]/80 backdrop-blur-sm text-white/80 hover:text-white hover:bg-[#0B1B3B] rounded-sm border border-[#D4C5A0]/15 transition-all duration-200"
          aria-label="Close"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {/* Scrollable inner */}
        <div className="overflow-y-auto">
          {/* ===== HERO HEADER ===== */}
          <div className="bg-[#0B1B3B] relative overflow-hidden">
            {/* Geometric pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
              <svg
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="lawyer-hero-grid"
                    x="0"
                    y="0"
                    width="32"
                    height="32"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 32 0 L 0 0 0 32"
                      fill="none"
                      stroke="#D4C5A0"
                      strokeWidth="0.4"
                    />
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  fill="url(#lawyer-hero-grid)"
                />
              </svg>
            </div>

            {/* Corner accents */}
            <div className="absolute top-5 left-5 w-5 h-5 border-t border-l border-[#D4C5A0]/25 pointer-events-none z-10" />
            <div className="absolute bottom-5 right-5 w-5 h-5 border-b border-r border-[#D4C5A0]/25 pointer-events-none z-10" />

            <div className="relative z-[5] flex flex-col md:flex-row gap-6 md:gap-10 p-7 md:p-10">
              {/* Photo */}
              <div className="w-full max-w-[200px] mx-auto md:mx-0 md:w-48 lg:w-56 aspect-[3/4] rounded-sm overflow-hidden border border-[#D4C5A0]/25 shadow-2xl shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoUrl}
                  alt={name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center flex-1 min-w-0 text-center md:text-left">
                <h2 className="text-white text-3xl md:text-[2.5rem] font-serif leading-[1.15] tracking-tight">
                  {name}
                </h2>
                <p className="text-[#E8DBBF] text-[11px] font-semibold uppercase tracking-[0.25em] mt-2.5">
                  {positionName}
                </p>

                {/* Practice Area Tags */}
                {practiceAreas.length > 0 && (
                  <div className="flex flex-wrap justify-center md:justify-start gap-1.5 mt-5">
                    {practiceAreas.map((area, idx) => (
                      <span
                        key={idx}
                        className="bg-white/[0.06] border border-[#D4C5A0]/25 text-[#E8DBBF] text-[11px] px-2.5 py-1 rounded-sm tracking-wide"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                )}

                {/* Contact Row */}
                {(lawyer.email || lawyer.phone || lawyer.linkedin_url) && (
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-6">
                    {lawyer.email && (
                      <a
                        href={`mailto:${lawyer.email}`}
                        className="w-9 h-9 flex items-center justify-center bg-white/[0.06] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.12] transition-colors duration-150 rounded-sm"
                        title={lawyer.email}
                      >
                        <Mail className="w-[15px] h-[15px]" />
                      </a>
                    )}
                    {lawyer.phone && (
                      <a
                        href={`tel:${lawyer.phone}`}
                        className="w-9 h-9 flex items-center justify-center bg-white/[0.06] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.12] transition-colors duration-150 rounded-sm"
                        title={lawyer.phone}
                      >
                        <Phone className="w-[15px] h-[15px]" />
                      </a>
                    )}
                    {lawyer.linkedin_url && (
                      <a
                        href={lawyer.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center bg-white/[0.06] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.12] transition-colors duration-150 rounded-sm"
                        title={labels.linkedinProfile}
                      >
                        <Linkedin className="w-[15px] h-[15px]" />
                      </a>
                    )}
                  </div>
                )}

                {/* Languages */}
                {languages.length > 0 && (
                  <div className="flex items-center justify-center md:justify-start gap-2.5 mt-4 text-white/50 text-[13px] tracking-wide">
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    <span>{languages.join(" · ")}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Gold divider */}
          <div className="h-[1.5px] bg-gradient-to-r from-[#D4C5A0]/10 via-[#D4C5A0]/70 to-[#D4C5A0]/10" />

          {/* ===== CONTENT AREA ===== */}
          <div className="bg-white p-7 md:p-10">
            {/* Overview / Bio */}
            <div className="mb-10 lawyer-card-enter">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-[#0B1B3B] text-xl md:text-2xl font-serif">
                  {labels.overview}
                </h3>
              </div>
              <div className="w-8 h-[1.5px] bg-[#D4C5A0] mb-5" />
              <div
                className={`rich-content max-w-none text-justify leading-relaxed ${
                  !bio ? "text-[#1a2f5a]/50 italic" : "text-[#1a2f5a]"
                }`}
                dangerouslySetInnerHTML={{ __html: bio || labels.noBio }}
              />
            </div>

            {/* Experience */}
            {hasExperience && (
              <div className="mb-10 lawyer-card-enter" style={{ animationDelay: "100ms" }}>
                <div className="flex items-center gap-2.5 mb-1">
                  <Briefcase className="w-5 h-5 text-[#0B1B3B]" />
                  <h3 className="text-[#0B1B3B] text-xl md:text-2xl font-serif">
                    {labels.experience}
                  </h3>
                </div>
                <div className="w-8 h-[1.5px] bg-[#D4C5A0] mb-5" />
                <ul className="border-l border-[#C0B181]/50 pl-5 ml-1 space-y-3">
                  {experience.map((exp, idx) => (
                    <li key={idx} className="relative pl-1">
                      <span className="absolute -left-[23px] top-[7px] w-[7px] h-[7px] rounded-full bg-[#C0B181]" />
                      <p className="text-[#1a2f5a] text-sm leading-relaxed">
                        {exp}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Education & Certifications side by side when both exist */}
            {(hasEducation || hasCertifications) && (
              <div className={`grid grid-cols-1 ${hasEducation && hasCertifications ? "md:grid-cols-2" : ""} gap-x-10 gap-y-10`}>
                {/* Education */}
                {hasEducation && (
                  <div className="lawyer-card-enter" style={{ animationDelay: "200ms" }}>
                    <div className="flex items-center gap-2.5 mb-1">
                      <GraduationCap className="w-5 h-5 text-[#0B1B3B]" />
                      <h3 className="text-[#0B1B3B] text-xl md:text-2xl font-serif">
                        {labels.education}
                      </h3>
                    </div>
                    <div className="w-8 h-[1.5px] bg-[#D4C5A0] mb-5" />
                    <ul className="space-y-2.5">
                      {education.map((edu, idx) => (
                        <li
                          key={idx}
                          className="border-l-2 border-[#C0B181]/40 pl-3 py-1.5 text-sm text-[#1a2f5a] leading-relaxed"
                        >
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Certifications */}
                {hasCertifications && (
                  <div className="lawyer-card-enter" style={{ animationDelay: "300ms" }}>
                    <div className="flex items-center gap-2.5 mb-1">
                      <Award className="w-5 h-5 text-[#0B1B3B]" />
                      <h3 className="text-[#0B1B3B] text-xl md:text-2xl font-serif">
                        {labels.certifications}
                      </h3>
                    </div>
                    <div className="w-8 h-[1.5px] bg-[#D4C5A0] mb-5" />
                    <ul className="space-y-2.5">
                      {certifications.map((cert, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-[#1a2f5a]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#2E4472] shrink-0 mt-0.5" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerDetailPopup;
