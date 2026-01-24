"use client";

import { LangLink } from "./LangLink";
import {
  ArrowRight,
  Cpu,
  Users,
  FileText,
  Gamepad2,
  HeartPulse,
  LucideIcon,
} from "lucide-react";
import { Database } from "@/lib/types/database";
import { useTranslations } from "@/hooks/useTranslations";

type PracticeGroup = Database["public"]["Tables"]["practice_groups"]["Row"];

interface PracticeAreasSectionProps {
  practiceGroups: PracticeGroup[];
  locale: string;
  label?: string;
  title?: React.ReactNode;
  description?: string;
  className?: string;
}

const PracticeAreasSection = ({
  practiceGroups,
  locale,
  label = "Practice Groups",
  title = "Our Practice Areas",
  description,
  className = "bg-[#F5F5F7]",
}: PracticeAreasSectionProps) => {
  const t = useTranslations("common");

  // Helper to get localized text
  const getLocalizedText = (en: string | null, id: string | null) => {
    if (locale === "id") return id || en || "";
    return en || id || "";
  };

  // Fallback icon mapping based on slug
  const getIcon = (slug: string): LucideIcon => {
    if (slug.includes("entertainment")) return Gamepad2;
    if (slug.includes("people") || slug.includes("labor")) return Users;
    if (slug.includes("tech")) return Cpu;
    if (slug.includes("health") || slug.includes("education"))
      return HeartPulse;
    return FileText;
  };

  return (
    <section id="expertise" className={`relative py-32 ${className}`}>
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-[#0B1B3B]/10 pb-12">
          <div className="max-w-2xl">
            <span className="text-[#0B1B3B] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
              {label}
            </span>
            <div className="text-4xl md:text-5xl font-light text-[#0B1B3B]">
              {title}
            </div>
          </div>
          {description && (
            <div className="hidden md:block">
              <p className="text-[#2E4472] max-w-md text-right leading-relaxed">
                {description}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {practiceGroups.map((group) => {
            const groupTitle = getLocalizedText(group.name_en, group.name_id);
            const groupDescription = getLocalizedText(
              group.description_en,
              group.description_id,
            );
            const Icon = getIcon(group.slug);

            return (
              <LangLink
                key={group.id}
                href={`/practice-areas#${group.slug}`}
                className="group relative bg-white border border-[#1A2F5A] p-12 hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Gold Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#1A2F5A] group-hover:bg-[#D4C5A0] transition-colors duration-300" />

                <div className="mb-8 h-10 w-10 relative flex items-center justify-center">
                  {group.icon_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={group.icon_url}
                      alt={groupTitle}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Icon
                      className="w-10 h-10 text-[#D4C5A0] group-hover:text-[#1A2F5A] transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  )}
                </div>

                <h3 className="text-2xl font-normal text-[#0B1B3B] mb-4 font-serif">
                  {groupTitle}
                </h3>

                <p className="text-[#2E4472] leading-[1.8] mb-8 font-light flex-grow">
                  {groupDescription}
                </p>

                <div className="flex items-center gap-2 text-[#D4C5A0] text-sm font-bold uppercase tracking-widest group-hover:text-[#0B1B3B] transition-colors">
                  <span>{t("learnMore")}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </LangLink>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreasSection;
