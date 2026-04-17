"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import CTASection from "./CTASection";
import FeaturedLawyer from "./FeaturedLawyer";
import LawyerDetailPopup, {
  LawyerDetailTranslations,
} from "./LawyerDetailPopup";
// To revert card to old design: swap to "./LawyerCard.legacy"
import LawyerCard from "./LawyerCard";
import {
  LawyerWithPositionAndPracticeAreas,
  LawyerPosition,
} from "@/lib/types/database";

const POSITION_TIERS: Record<string, "partnership" | "associates"> = {
  "managing-partner": "partnership",
  partner: "partnership",
  counsel: "partnership",
  "senior-associate": "associates",
  associate: "associates",
};

const TIER_LABELS: Record<string, { en: string; id: string }> = {
  partnership: { en: "Partnership", id: "Kemitraan" },
  associates: { en: "Associates", id: "Asosiasi" },
  others: { en: "Legal Team", id: "Tim Hukum" },
};

// Translation keys for Lawyers page
export interface LawyersPageTranslations {
  hero: {
    tags: string;
    title: string;
    subtitle: string;
  };
  fallbackTeamTitle?: string;
  detail: LawyerDetailTranslations;
}

interface LawyersPageProps {
  initialLawyers: LawyerWithPositionAndPracticeAreas[];
  positions: LawyerPosition[];
  locale: string;
  translations: LawyersPageTranslations;
}

const LawyersPage = ({
  initialLawyers,
  positions,
  locale,
  translations,
}: LawyersPageProps) => {
  // Popup state
  const [selectedLawyer, setSelectedLawyer] =
    useState<LawyerWithPositionAndPracticeAreas | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Open popup with selected lawyer
  const handleLawyerClick = useCallback(
    (lawyer: LawyerWithPositionAndPracticeAreas) => {
      setSelectedLawyer(lawyer);
      setIsPopupOpen(true);
    },
    [],
  );

  // Close popup
  const handleClosePopup = useCallback(() => {
    setIsPopupOpen(false);
    setSelectedLawyer(null);
  }, []);

  // Handle hash navigation and scroll to lawyer on page load
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove # prefix

    if (hash) {
      // Find the lawyer by slug
      const lawyer = initialLawyers.find(
        (l) => l.slug === hash || l.id === hash,
      );

      if (lawyer) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            // Highlight the card briefly
            element.classList.add("ring-2", "ring-[#D4C5A0]", "ring-offset-4");
            setTimeout(() => {
              element.classList.remove(
                "ring-2",
                "ring-[#D4C5A0]",
                "ring-offset-4",
              );
              // Open popup after scroll
              handleLawyerClick(lawyer);
            }, 800);
          }
        }, 300);
      }
    } else {
      // No hash, scroll to top
      window.scrollTo(0, 0);
    }
  }, [initialLawyers, handleLawyerClick]);

  // Group lawyers by their position using lawyer_positions relationship
  const groupedByPosition = useMemo(() => {
    // Sort positions by sort_order
    const sortedPositions = [...positions].sort(
      (a, b) => (a.sort_order || 0) - (b.sort_order || 0),
    );

    // Create groups based on position
    const groups: Map<
      string,
      {
        position: LawyerPosition;
        lawyers: LawyerWithPositionAndPracticeAreas[];
      }
    > = new Map();

    // Initialize groups from positions
    sortedPositions.forEach((pos) => {
      groups.set(pos.id, { position: pos, lawyers: [] });
    });

    // Also create an "Other" group for lawyers without position
    const otherLawyers: LawyerWithPositionAndPracticeAreas[] = [];

    // Assign lawyers to their respective groups
    initialLawyers.forEach((lawyer) => {
      if (lawyer.lawyer_position_id && groups.has(lawyer.lawyer_position_id)) {
        groups.get(lawyer.lawyer_position_id)!.lawyers.push(lawyer);
      } else {
        otherLawyers.push(lawyer);
      }
    });

    // Filter out empty groups and convert to array
    const result = Array.from(groups.values()).filter(
      (group) => group.lawyers.length > 0,
    );

    return { groups: result, otherLawyers };
  }, [initialLawyers, positions]);

  // Bucket positions into tiers (partnership / associates / others).
  // Merge only within the same tier so MP never gets mixed with associates.
  // Per-card role badge still shows individual position — hierarchy preserved.
  const mergedSections = useMemo(() => {
    const tierMap = new Map<
      string,
      {
        positions: LawyerPosition[];
        lawyers: LawyerWithPositionAndPracticeAreas[];
      }
    >();

    for (const group of groupedByPosition.groups) {
      const tier = POSITION_TIERS[group.position.slug ?? ""] ?? "others";
      if (!tierMap.has(tier)) tierMap.set(tier, { positions: [], lawyers: [] });
      const bucket = tierMap.get(tier)!;
      bucket.positions.push(group.position);
      bucket.lawyers.push(...group.lawyers);
    }

    return Array.from(tierMap.entries())
      .filter(([, v]) => v.lawyers.length > 0)
      .sort(([, a], [, b]) => {
        const minA = Math.min(...a.positions.map((p) => p.sort_order ?? 99));
        const minB = Math.min(...b.positions.map((p) => p.sort_order ?? 99));
        return minA - minB;
      })
      .map(([tier, v]) => ({
        key: tier,
        positions: v.positions,
        lawyers: v.lawyers,
      }));
  }, [groupedByPosition]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#0B1B3B] text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <span className="text-[#D4C5A0] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">
            {translations.hero.tags}
          </span>
          <h1 className="text-5xl md:text-7xl font-light mb-8">
            {translations.hero.title}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            {translations.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Dynamic Position Sections (thin groups merged so no one stands alone) */}
      {mergedSections.map((section, index) => {
        // NEW: tier-based label ("Partnership" / "Associates")
        // LEGACY: comment out block below and use this instead:
        // const tierLabel = section.positions.map((p) => locale === "id" ? p.name_id : p.name_en).join(" · ");
        const tierLabel =
          TIER_LABELS[section.key]?.[locale as "en" | "id"] ??
          TIER_LABELS[section.key]?.en ??
          section.positions
            .map((p) => (locale === "id" ? p.name_id : p.name_en))
            .join(" · ");
        const positionChips = section.positions.map((p) =>
          locale === "id" ? p.name_id : p.name_en,
        );
        const description =
          section.positions.length === 1
            ? locale === "id"
              ? section.positions[0].description_id
              : section.positions[0].description_en
            : null;
        const count = section.lawyers.length;
        const isAlternate = index % 2 === 1;

        return (
          <section
            key={section.key}
            className={`py-24 px-6 ${isAlternate ? "bg-[#F5F5F7]" : ""}`}
          >
            <div className="max-w-[1400px] mx-auto">
              <div className="flex items-end justify-between mb-16 border-b border-[#0B1B3B]/10 pb-8 gap-6 max-w-6xl mx-auto">
                <div>
                  <div className="flex items-baseline gap-4 mb-3">
                    <h2 className="text-4xl font-light text-[#0B1B3B]">
                      {tierLabel}
                    </h2>
                    <span
                      aria-hidden
                      className="text-[#D4C5A0] font-serif text-xl tabular-nums"
                    >
                      /{String(count).padStart(2, "0")}
                    </span>
                  </div>
                  {positionChips.length > 1 && (
                    <div className="flex flex-wrap gap-2">
                      {positionChips.map((chip, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#0B1B3B]/40 border border-[#0B1B3B]/15 px-2.5 py-1"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {description && (
                  <p className="hidden md:block text-[#2E4472] font-light max-w-sm text-right text-sm leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
              {count === 1 ? (
                <FeaturedLawyer
                  member={section.lawyers[0]}
                  locale={locale}
                  onClick={() => handleLawyerClick(section.lawyers[0])}
                  ctaLabel={translations.detail.viewProfile}
                />
              ) : (
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 ${
                    count === 2
                      ? "max-w-5xl mx-auto gap-x-12"
                      : count === 3
                        ? "lg:grid-cols-3 max-w-6xl mx-auto"
                        : "lg:grid-cols-4"
                  }`}
                >
                  {section.lawyers.map((member) => (
                    <LawyerCard
                      key={member.id}
                      member={member}
                      locale={locale}
                      onClick={() => handleLawyerClick(member)}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* Other lawyers without position (fallback) */}
      {groupedByPosition.otherLawyers.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-16 border-b border-[#0B1B3B]/10 pb-8">
              <h2 className="text-4xl font-light text-[#0B1B3B]">
                {translations.fallbackTeamTitle ||
                  (locale === "id" ? "Tim Hukum" : "Legal Team")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {groupedByPosition.otherLawyers.map((member) => (
                <LawyerCard
                  key={member.id}
                  member={member}
                  locale={locale}
                  onClick={() => handleLawyerClick(member)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />

      {/* Lawyer Detail Popup */}
      <LawyerDetailPopup
        lawyer={selectedLawyer}
        locale={locale}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        translations={translations.detail}
      />
    </div>
  );
};

export default LawyersPage;
