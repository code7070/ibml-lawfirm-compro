"use client";

import { useEffect, useState, ReactNode } from "react";
import {
  ShieldCheck,
  ArrowRight,
  Briefcase as DefaultIcon,
  Eye,
} from "lucide-react";
import CTASection from "./CTASection";
import CoreCompetencies from "./CoreCompetencies";
import PracticeAreaDetailPopup from "./PracticeAreaDetailPopup";
import { Database } from "@/lib/types/database";

type PracticeGroup = Database["public"]["Tables"]["practice_groups"]["Row"];
type PracticeArea = Database["public"]["Tables"]["practice_areas"]["Row"];

// Extended type to include nested areas
interface PracticeGroupWithAreas extends PracticeGroup {
  practice_areas: PracticeArea[];
}

interface PracticeAreaPageProps {
  targetId?: string | null;
  practiceGroups: PracticeGroupWithAreas[];
  locale: string;
  clientsTickerSection?: ReactNode;
  affiliationsTickerSection?: ReactNode;
}

const PracticeAreaPage = ({
  targetId,
  practiceGroups,
  locale,
  clientsTickerSection,
  affiliationsTickerSection,
}: PracticeAreaPageProps) => {
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null);
  const [selectedGroupName, setSelectedGroupName] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // If targetId is provided via props, use it
    if (targetId) {
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }

    // Otherwise check for hash in URL
    if (window.location.hash) {
      const id = window.location.hash.substring(1); // Remove #
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }

    // Default to top if neither exists
    window.scrollTo(0, 0);
  }, [targetId]);

  const isEn = locale === "en";

  const handleOpenDetail = (area: PracticeArea, groupName: string) => {
    setSelectedArea(area);
    setSelectedGroupName(groupName);
    setIsPopupOpen(true);
  };

  const handleCloseDetail = () => {
    setIsPopupOpen(false);
    // Delay clearing area data so the close animation can play
    setTimeout(() => {
      setSelectedArea(null);
      setSelectedGroupName("");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#0B1B3B] text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <span className="text-[#D4C5A0] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">
            {isEn ? "Practice Areas" : "Area Praktik"}
          </span>
          <h1 className="text-5xl md:text-7xl font-light mb-8">
            {isEn ? "Specialized" : "Spesialisasi"}{" "}
            <span className="font-serif italic text-[#D4C5A0]">
              {isEn ? "Legal Groups" : "Arsitektur Hukum"}
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            {isEn
              ? "We structure our expertise into focused practice groups, ensuring deep industry knowledge tailored to specific sectors."
              : "Kami menyusun keahlian kami ke dalam kelompok praktik yang terfokus, memastikan pengetahuan industri yang mendalam yang disesuaikan dengan sektor tertentu."}
          </p>
        </div>
      </section>

      {/* Client Ticker */}
      {clientsTickerSection}

      {/* Core Competencies */}
      <CoreCompetencies isEn={isEn} />

      {/* Practice Groups */}
      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto space-y-32">
          {practiceGroups.map((group) => {
            const groupDisplayName = isEn ? group.name_en : group.name_id;

            return (
              <div key={group.id} id={group.slug} className="scroll-mt-32">
                {/* Group Header */}
                <div className="static lg:sticky top-20 pt-4 bg-white  flex flex-col md:flex-row items-start md:items-end gap-6 mb-12 border-b border-[#0B1B3B]/10 pb-8">
                  <div className="p-3 bg-[#0B1B3B] text-[#D4C5A0] aspect-square">
                    {group.icon_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={group.icon_url}
                        alt=""
                        className="w-12 h-12 object-contain invert-100"
                      />
                    ) : (
                      <DefaultIcon size={40} strokeWidth={1.5} />
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="text-[#D4C5A0] font-bold tracking-[0.2em] text-xs uppercase mb-2 block">
                      {isEn ? "Practice Group" : "Grup Praktik"}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-light text-[#0B1B3B]">
                      {groupDisplayName}
                    </h2>
                    {(isEn ? group.subtitle_en : group.subtitle_id) && (
                      <p className="text-xl text-[#2E4472] mt-1 font-serif italic">
                        {isEn ? group.subtitle_en : group.subtitle_id}
                      </p>
                    )}
                  </div>
                  <div
                    className="hidden xl:block md:ml-auto md:max-w-[40%] rich-content text-right"
                    dangerouslySetInnerHTML={{
                      __html:
                        (isEn ? group.description_en : group.description_id) ||
                        "",
                    }}
                  />
                </div>

                {/* Areas Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {group.practice_areas && group.practice_areas.length > 0 ? (
                    group.practice_areas.map((area: PracticeArea) => (
                      <div
                        key={area.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleOpenDetail(area, groupDisplayName)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleOpenDetail(area, groupDisplayName);
                          }
                        }}
                        className="flex flex-col justify-between   group border border-[#0B1B3B]/10 p-8 hover:border-[#D4C5A0] hover:shadow-lg transition-all duration-300 bg-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4C5A0] focus-visible:ring-offset-2"
                      >
                        <div className="">
                          <div className="flex items-center justify-between mb-6">
                            {area.icon_url ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={area.icon_url}
                                alt=""
                                className="w-8 h-8 object-contain"
                              />
                            ) : (
                              <ShieldCheck
                                className="w-8 h-8 text-[#2E4472] group-hover:text-[#D4C5A0] transition-colors"
                                strokeWidth={1.5}
                              />
                            )}
                            <div className="w-8 h-8 rounded-full border border-[#0B1B3B]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <ArrowRight className="w-4 h-4 text-[#0B1B3B]" />
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-[#0B1B3B] mb-1">
                            {isEn ? area.name_en : area.name_id}
                          </h3>
                          {/*{(isEn ? area.tagline_en : area.tagline_id) && (
                            <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">
                              {isEn ? area.tagline_en : area.tagline_id}
                            </p>
                          )}*/}
                          {/* Description — clamped to 3 lines */}
                          <div
                            className="rich-content mt-4 !text-sm line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html:
                                (isEn
                                  ? area.description_en
                                  : area.description_id) || "",
                            }}
                          />
                        </div>
                        {/* CTA — View Details */}
                        <div className="mt-6 pt-4 border-t border-[#0B1B3B]/5">
                          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E4472] group-hover:text-[#D4C5A0] transition-colors">
                            <Eye className="w-3.5 h-3.5" />
                            {isEn ? "View Details" : "Lihat Detail"}
                            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center text-gray-400 italic py-8">
                      {isEn
                        ? "No practice areas in this group yet."
                        : "Belum ada area praktik dalam grup ini."}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Org Ticker */}
      {affiliationsTickerSection}

      <CTASection />

      {/* Practice Area Detail Popup */}
      <PracticeAreaDetailPopup
        area={selectedArea}
        locale={locale}
        isOpen={isPopupOpen}
        onClose={handleCloseDetail}
        groupName={selectedGroupName}
      />
    </div>
  );
};

export default PracticeAreaPage;
