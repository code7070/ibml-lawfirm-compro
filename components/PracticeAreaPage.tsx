"use client";

import { useEffect } from "react";
import {
  ShieldCheck,
  ArrowRight,
  Briefcase as DefaultIcon,
} from "lucide-react";
import CTASection from "./CTASection";
import LogoTicker from "./LogoTicker";
import CoreCompetencies from "./CoreCompetencies";
import { LogoItem } from "@/types";
import { Database } from "@/lib/types/database";

type PracticeGroup = Database["public"]["Tables"]["practice_groups"]["Row"];

// Extended type to include nested areas
interface PracticeGroupWithAreas extends PracticeGroup {
  practice_areas: any[]; // Using any[] for now as the joined type might be complex
}

interface PracticeAreaPageProps {
  targetId?: string | null;
  clientLogos?: LogoItem[];
  orgLogos?: LogoItem[];
  practiceGroups: PracticeGroupWithAreas[];
  locale: string;
}

const PracticeAreaPage = ({
  targetId,
  clientLogos,
  orgLogos,
  practiceGroups,
  locale,
}: PracticeAreaPageProps) => {
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
              {isEn ? "Legal Architectures" : "Arsitektur Hukum"}
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
      {clientLogos && clientLogos.length > 0 && (
        <LogoTicker
          title={
            isEn
              ? "Trusted By Industry Leaders"
              : "Dipercaya Oleh Pemimpin Industri"
          }
          items={clientLogos}
          theme="light"
        />
      )}

      {/* Core Competencies */}
      <CoreCompetencies isEn={isEn} />

      {/* Practice Groups */}
      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto space-y-32">
          {practiceGroups.map((group) => (
            <div key={group.id} id={group.slug} className="scroll-mt-32">
              {/* Group Header */}
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-12 border-b border-[#0B1B3B]/10 pb-8">
                <div className="p-4 bg-[#0B1B3B] text-[#D4C5A0]">
                  {group.icon_url ? (
                    <img
                      src={group.icon_url}
                      alt=""
                      className="w-10 h-10 object-contain invert-0"
                    />
                  ) : (
                    <DefaultIcon size={40} strokeWidth={1.5} />
                  )}
                </div>
                <div>
                  <span className="text-[#D4C5A0] font-bold tracking-[0.2em] text-xs uppercase mb-2 block">
                    {isEn ? "Practice Group" : "Grup Praktik"}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-light text-[#0B1B3B]">
                    {isEn ? group.name_en : group.name_id}
                  </h2>
                  {(isEn ? group.subtitle_en : group.subtitle_id) && (
                    <p className="text-xl text-[#2E4472] mt-2 font-serif italic">
                      {isEn ? group.subtitle_en : group.subtitle_id}
                    </p>
                  )}
                </div>
                <div
                  className="md:ml-auto md:max-w-md text-[#2E4472] font-light text-right prose prose-sm"
                  dangerouslySetInnerHTML={{
                    __html:
                      (isEn ? group.description_en : group.description_id) ||
                      "",
                  }}
                />
              </div>

              {/* Areas Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.practice_areas && group.practice_areas.length > 0 ? (
                  group.practice_areas.map((area: any) => (
                    <div
                      key={area.id}
                      className="group border border-[#0B1B3B]/10 p-8 hover:border-[#D4C5A0] hover:shadow-lg transition-all duration-300 bg-white"
                    >
                      <div className="flex items-center justify-between mb-6">
                        {area.icon_url ? (
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
                      {(isEn ? area.tagline_en : area.tagline_id) && (
                        <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">
                          {isEn ? area.tagline_en : area.tagline_id}
                        </p>
                      )}
                      <div
                        className="text-[#2E4472] font-light text-sm leading-relaxed mt-4 prose prose-sm line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html:
                            (isEn
                              ? area.description_en
                              : area.description_id) || "",
                        }}
                      />
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
          ))}
        </div>
      </section>

      {/* Org Ticker */}
      {orgLogos && orgLogos.length > 0 && (
        <LogoTicker
          title={isEn ? "Member Organizations" : "Organisasi Anggota"}
          items={orgLogos}
          theme="light"
        />
      )}

      <CTASection />
    </div>
  );
};

export default PracticeAreaPage;
