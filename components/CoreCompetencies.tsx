import { Scale, Landmark, ShieldAlert, Gavel, TrendingUp, Handshake } from "lucide-react";

interface CoreCompetenciesProps {
  isEn: boolean;
}

const coreCompetencies = [
  {
    icon: Landmark,
    title_en: "Civil Law",
    title_id: "Hukum Perdata",
    description_en:
      "Person, property, and contract law — the bedrock of every legal relationship and commercial engagement.",
    description_id:
      "Hukum orang, kebendaan, dan perjanjian — fondasi dari setiap hubungan hukum dan keterlibatan komersial.",
  },
  {
    icon: Scale,
    title_en: "Business & Company Law",
    title_id: "Hukum Bisnis & Perusahaan",
    description_en:
      "Comprehensive corporate governance, mergers & acquisitions, and entity structuring for complex organizations.",
    description_id:
      "Tata kelola perusahaan yang komprehensif, merger & akuisisi, dan penataan entitas untuk organisasi yang kompleks.",
  },
  {
    icon: TrendingUp,
    title_en: "Investment Law",
    title_id: "Hukum Investasi",
    description_en:
      "Structuring and safeguarding domestic and cross-border investments with regulatory precision.",
    description_id:
      "Menata dan melindungi investasi domestik maupun lintas batas dengan ketepatan regulasi.",
  },
  {
    icon: ShieldAlert,
    title_en: "Consumer Protection Law",
    title_id: "Hukum Perlindungan Konsumen",
    description_en:
      "Ensuring compliance with fair trade regulations and user safety standards across industries.",
    description_id:
      "Memastikan kepatuhan terhadap peraturan perdagangan yang adil dan standar keselamatan pengguna lintas industri.",
  },
  {
    icon: Handshake,
    title_en: "Competition Law",
    title_id: "Hukum Persaingan Usaha",
    description_en:
      "Navigating antitrust regulations and ensuring fair market practices in high-stakes consolidations.",
    description_id:
      "Menavigasi peraturan antimonopoli dan memastikan praktik pasar yang adil dalam konsolidasi berisiko tinggi.",
  },
  {
    icon: Gavel,
    title_en: "Criminal Law",
    title_id: "Hukum Pidana",
    description_en:
      "Strategic defense and advisory in criminal matters intersecting business, corporate, and regulatory domains.",
    description_id:
      "Pembelaan strategis dan pendampingan dalam perkara pidana yang bersinggungan dengan bisnis, korporasi, dan regulasi.",
  },
];

const CoreCompetencies = ({ isEn }: CoreCompetenciesProps) => {
  return (
    <section className="py-24 bg-[#FAFAF8] border-y border-[#0B1B3B]/5">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* ── Header Block ── */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="text-[#D4C5A0] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
            {isEn ? "The Foundation" : "Fondasi"}
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-[#0B1B3B]">
            {isEn ? "Foundational" : "Keahlian"}{" "}
            <span className="font-serif italic text-[#2E4472]">
              {isEn ? "Expertise" : "Dasar"}
            </span>
          </h2>
          <div className="w-16 h-[2px] bg-[#D4C5A0] mx-auto mt-6" />
        </div>

        {/* ── Narrative ── */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-[#2E4472]/80 text-base md:text-lg font-light leading-relaxed">
            {isEn
              ? "Each of our Legal Expertise Groups covers unique and specialized practice areas. However, they are all operated by personnel with strong understanding and long experience in these foundational legal disciplines — ensuring every matter we handle is built on solid legal ground."
              : "Setiap Grup Keahlian Hukum kami mencakup area praktik yang unik dan terspesialisasi. Namun, semuanya dijalankan oleh personel dengan pemahaman yang kuat dan pengalaman yang panjang di bidang hukum dasar berikut — memastikan setiap perkara yang kami tangani dibangun di atas landasan hukum yang kokoh."}
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {coreCompetencies.map((core, idx) => {
            const Icon = core.icon;
            return (
              <div key={idx} className="group relative pl-14">
                {/* Icon — left-aligned, vertically centred with title */}
                <div className="absolute left-0 top-0 w-10 h-10 flex items-center justify-center bg-[#0B1B3B] text-[#D4C5A0] transition-colors duration-300 group-hover:bg-[#1A2F5A]">
                  <Icon size={20} strokeWidth={1.5} />
                </div>

                {/* Numbering — subtle ordinal for scanning */}
                <span className="text-[10px] font-bold tracking-[0.15em] text-[#D4C5A0] uppercase mb-1 block">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <h3 className="text-lg font-bold text-[#0B1B3B] leading-snug mb-2">
                  {isEn ? core.title_en : core.title_id}
                </h3>
                <p className="text-sm text-[#2E4472]/70 font-light leading-relaxed">
                  {isEn ? core.description_en : core.description_id}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreCompetencies;
