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
  // Handle escape key press
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  // Prevent scrolling when modal is open
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

  // Helper to get localized text
  const getLocalizedText = (en: string | null, id: string | null) => {
    if (locale === "id") return id || en || "";
    return en || id || "";
  };

  // Get values
  const name = getLocalizedText(lawyer.name_en, lawyer.name_id);
  const bio = getLocalizedText(lawyer.bio_en, lawyer.bio_id);
  const photoUrl = lawyer.photo_url || "/images/placeholder-lawyer.jpg";

  // Get position name
  const positionName = lawyer.lawyer_positions
    ? getLocalizedText(
        lawyer.lawyer_positions.name_en,
        lawyer.lawyer_positions.name_id
      )
    : lawyer.position_en || "";

  // Parse education JSON: [{"degree": "...", "institution": "..."}]
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

  // Parse experience JSON: [{"company": "...", "position": "...", "period": "..."}]
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
          // Format: "Position at Company (Period)" or just "Company"
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

  // Parse languages JSON: [{"language": "...", "proficiency": "..."}]
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

  // Use translations with fallbacks
  const labels = {
    overview: translations.overview || (locale === "id" ? "Profil" : "Overview"),
    experience: translations.experience || (locale === "id" ? "Pengalaman Profesional" : "Professional Experience"),
    education: translations.education,
    certifications: translations.certifications,
    languages: translations.languages,
    linkedinProfile: translations.linkedinProfile || translations.linkedin,
    noBio: translations.noBio || (locale === "id" ? "Biografi belum tersedia." : "No biography available."),
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0B1B3B]/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-[#0B1B3B] text-[#0B1B3B] hover:text-[#D4C5A0] rounded-full transition-colors border border-[#0B1B3B]/10"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row h-full overflow-y-auto md:overflow-hidden">
          {/* LEFT COLUMN: Image & Quick Info */}
          <div className="w-full md:w-1/3 bg-[#0B1B3B] text-white p-8 md:p-10 flex flex-col relative shrink-0">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />

            <div className="relative z-10">
              <div className="aspect-[3/4] overflow-hidden border border-[#D4C5A0]/30 mb-8 bg-[#1A2F5A]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoUrl}
                  alt={name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <h2 className="text-3xl font-serif mb-2">{name}</h2>
              <p className="text-[#D4C5A0] font-bold uppercase tracking-widest text-xs mb-6">
                {positionName}
              </p>

              <div className="space-y-4 text-sm font-light text-gray-300 mb-8">
                {lawyer.email && (
                  <a
                    href={`mailto:${lawyer.email}`}
                    className="flex items-center gap-3 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#D4C5A0]" />
                    <span>{lawyer.email}</span>
                  </a>
                )}
                {lawyer.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#D4C5A0]" />
                    <span>{lawyer.phone}</span>
                  </div>
                )}
                {lawyer.linkedin_url && (
                  <a
                    href={lawyer.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[#D4C5A0]" />
                    <span>{labels.linkedinProfile}</span>
                  </a>
                )}
              </div>

              {languages.length > 0 && (
                <div className="border-t border-white/10 pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-4 h-4 text-[#D4C5A0]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D4C5A0]">
                      {labels.languages}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang, idx) => (
                      <span
                        key={idx}
                        className="bg-[#1A2F5A] px-3 py-1 text-xs border border-white/10 rounded-sm"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Detailed Bio & Experience */}
          <div className="w-full md:w-2/3 bg-white p-8 md:p-12 overflow-y-auto">
            <div className="max-w-2xl">
              {/* Bio */}
              <div className="mb-10">
                <h3 className="text-[#0B1B3B] text-2xl font-serif mb-4 flex items-center gap-3">
                  {labels.overview}
                </h3>
                <div className="w-12 h-1 bg-[#D4C5A0] mb-6"></div>
                <p className="text-[#2E4472] font-light leading-relaxed whitespace-pre-line">
                  {bio || labels.noBio}
                </p>
              </div>

              {/* Experience */}
              {experience.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-[#0B1B3B] text-xl font-serif mb-6 flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-[#D4C5A0]" />
                    {labels.experience}
                  </h3>
                  <ul className="space-y-4 border-l border-[#F5F5F7] pl-6 ml-2">
                    {experience.map((exp, idx) => (
                      <li key={idx} className="relative">
                        <span className="absolute -left-[29px] top-2 w-3 h-3 rounded-full bg-[#D4C5A0] border-2 border-white"></span>
                        <p className="text-[#2E4472] font-light text-sm">{exp}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Education */}
              {education.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-[#0B1B3B] text-xl font-serif mb-6 flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-[#D4C5A0]" />
                    {labels.education}
                  </h3>
                  <ul className="grid gap-4">
                    {education.map((edu, idx) => (
                      <li
                        key={idx}
                        className="bg-[#F5F5F7] p-4 border border-[#0B1B3B]/5 text-sm text-[#2E4472]"
                      >
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Certifications */}
              {certifications.length > 0 && (
                <div>
                  <h3 className="text-[#0B1B3B] text-xl font-serif mb-6 flex items-center gap-3">
                    <Award className="w-5 h-5 text-[#D4C5A0]" />
                    {labels.certifications}
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {certifications.map((cert, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-[#2E4472] font-light"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#D4C5A0] shrink-0 mt-0.5" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerDetailPopup;
