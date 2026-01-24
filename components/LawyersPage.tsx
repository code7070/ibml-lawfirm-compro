"use client";

import { useEffect, useMemo } from "react";
import { LinkedinIcon, Mail } from "lucide-react";
import CTASection from "./CTASection";
import { LawyerWithPositionAndPracticeAreas, LawyerPosition } from "@/lib/types/database";

interface LawyersPageProps {
  initialLawyers: LawyerWithPositionAndPracticeAreas[];
  positions: LawyerPosition[];
  locale: string;
}

const LawyerCard: React.FC<{
  member: LawyerWithPositionAndPracticeAreas;
  locale: string;
}> = ({ member, locale }) => {
  const name = locale === "id" ? member.name_id : member.name_en;
  // Use lawyer_positions relationship if available, fallback to position_en/position_id
  const role = member.lawyer_positions
    ? locale === "id"
      ? member.lawyer_positions.name_id
      : member.lawyer_positions.name_en
    : locale === "id"
      ? member.position_id
      : member.position_en;

  // Extract specialty from practice areas
  // We take the first one as fallback since is_primary is not available
  const primaryArea = member.practice_areas?.[0];
  const specialty = primaryArea?.practice_areas
    ? locale === "id"
      ? primaryArea.practice_areas.name_id
      : primaryArea.practice_areas.name_en
    : "";

  return (
    <div className="group cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-3/4 mb-6 overflow-hidden bg-[#F5F5F7]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            member.photo_url ||
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
          } // Fallback placeholder
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

const LawyersPage = ({ initialLawyers, positions, locale }: LawyersPageProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Group lawyers by their position using lawyer_positions relationship
  const groupedByPosition = useMemo(() => {
    // Sort positions by sort_order
    const sortedPositions = [...positions].sort(
      (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
    );

    // Create groups based on position
    const groups: Map<string, {
      position: LawyerPosition;
      lawyers: LawyerWithPositionAndPracticeAreas[];
    }> = new Map();

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
      (group) => group.lawyers.length > 0
    );

    return { groups: result, otherLawyers };
  }, [initialLawyers, positions]);

  return (
    <div className="min-h-screen bg-white">
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

      {/* Dynamic Position Sections */}
      {groupedByPosition.groups.map((group, index) => {
        const positionName = locale === "id" 
          ? group.position.name_id 
          : group.position.name_en;
        const positionDesc = locale === "id"
          ? group.position.description_id
          : group.position.description_en;
        
        // Alternate background colors
        const isAlternate = index % 2 === 1;
        
        return (
          <section
            key={group.position.id}
            className={`py-24 px-6 ${isAlternate ? "bg-[#F5F5F7]" : ""}`}
          >
            <div className="max-w-[1400px] mx-auto">
              <div className="flex items-end justify-between mb-16 border-b border-[#0B1B3B]/10 pb-8">
                <h2 className="text-4xl font-light text-[#0B1B3B]">
                  {positionName}
                </h2>
                {positionDesc && (
                  <p className="hidden md:block text-[#2E4472] font-light max-w-sm text-right">
                    {positionDesc}
                  </p>
                )}
              </div>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 ${
                  group.lawyers.length <= 3
                    ? "lg:grid-cols-3"
                    : "lg:grid-cols-4"
                }`}
              >
                {group.lawyers.map((member) => (
                  <LawyerCard key={member.id} member={member} locale={locale} />
                ))}
              </div>
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
                {locale === "id" ? "Tim Hukum" : "Legal Team"}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {groupedByPosition.otherLawyers.map((member) => (
                <LawyerCard key={member.id} member={member} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </div>
  );
};

export default LawyersPage;
