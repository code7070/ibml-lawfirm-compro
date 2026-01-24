import { Scale } from "lucide-react";

interface CoreCompetenciesProps {
  isEn: boolean;
}

// Core Competencies (Static for now)
const coreCompetencies = [
  {
    title_en: "General Business & Company Law",
    title_id: "Hukum Bisnis & Perusahaan Umum",
    description_en:
      "Comprehensive corporate governance, M&A, and entity structuring.",
    description_id:
      "Tata kelola perusahaan yang komprehensif, M&A, dan penataan entitas.",
  },
  {
    title_en: "Consumer Protection Law",
    title_id: "Hukum Perlindungan Konsumen",
    description_en:
      "Ensuring compliance with fair trade regulations and user safety standards.",
    description_id:
      "Memastikan kepatuhan terhadap peraturan perdagangan yang adil dan standar keselamatan pengguna.",
  },
  {
    title_en: "Competition Law",
    title_id: "Hukum Persaingan Usaha",
    description_en:
      "Navigating antitrust regulations in high-stakes market consolidations.",
    description_id:
      "Menavigasi peraturan antimonopoli dalam konsolidasi pasar berisiko tinggi.",
  },
];

const CoreCompetencies = ({ isEn }: CoreCompetenciesProps) => {
  return (
    <section className="py-20 bg-white border-b border-[#F5F5F7]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light text-[#0B1B3B]">
            {isEn ? "Foundational Expertise" : "Keahlian Dasar"}
          </h2>
          <div className="w-16 h-1 bg-[#D4C5A0] mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {coreCompetencies.map((core, idx) => (
            <div
              key={idx}
              className="bg-[#F5F5F7] p-8 border-t-4 border-[#1A2F5A] text-center"
            >
              <Scale
                className="w-10 h-10 text-[#1A2F5A] mx-auto mb-6"
                strokeWidth={1.5}
              />
              <h3 className="text-xl font-serif text-[#0B1B3B] mb-4">
                {isEn ? core.title_en : core.title_id}
              </h3>
              <p className="text-[#2E4472] font-light">
                {isEn ? core.description_en : core.description_id}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreCompetencies;
