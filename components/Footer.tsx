import Link from "next/link";
import Image from "next/image";
import { contactSettingsService } from "@/services/contact.service";

interface FooterDictionary {
  footer: {
    tagline: string;
    practice: string;
    practiceLinks: {
      entertainment: string;
      technology: string;
      labor: string;
      health: string;
    };
    firm: string;
    firmLinks: {
      team: string;
      about: string;
      careers: string;
      contact: string;
    };
    newsletter: {
      title: string;
      description: string;
      placeholder: string;
      button: string;
    };
    legal: {
      privacy: string;
      terms: string;
      sitemap: string;
    };
    copyright: string;
  };
}

interface FooterProps {
  dictionary: FooterDictionary;
}

const Footer = async ({ dictionary }: FooterProps) => {
  const { data: settings } = await contactSettingsService.getMain();
  const t = dictionary.footer;

  return (
    <footer className="bg-[#020814] text-white pt-24 pb-12 relative overflow-hidden">
      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(45deg, #1A2F5A 25%, transparent 25%, transparent 75%, #1A2F5A 75%, #1A2F5A),
             linear-gradient(45deg, #1A2F5A 25%, transparent 25%, transparent 75%, #1A2F5A 75%, #1A2F5A)`,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 10px 10px",
        }}
      ></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-8">
            <Link href="/" className="flex items-center">
              <div className="aspect-[3/1] h-10 md:h-14 relative">
                <Image
                  src="/images/iblm-logo-master.webp"
                  alt="IBLM Law Group"
                  className="object-contain size-full pointer-events-none"
                  fill
                  priority
                />
              </div>
              {/*<Image
                src="/images/logo-white.svg"
                alt="IBLM Law Group"
                width={160}
                height={45}
              />*/}
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm font-light">
              {/*{t.tagline}*/}
              Prudential Centre, Kota Kasablanka Lantai 7, Unit 7B,
              <br />
              Jl. Raya Casablanca No.Raya Kav. 88,
              <br />
              Daerah Khusus Ibukota Jakarta 12870
              <br />
              <Link className="underline hover:text-white" href="iblmlaw.group">
                www.iblmlaw.group
              </Link>
            </p>
            <div className="flex gap-4">
              {/* Social Links */}
              {settings?.linkedin_url && (
                <a
                  href={settings.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 hover:border-[#D4C5A0] hover:bg-[#D4C5A0] hover:text-[#020814] flex items-center justify-center transition-all cursor-pointer text-white text-xs font-bold"
                >
                  IN
                </a>
              )}
              {settings?.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 hover:border-[#D4C5A0] hover:bg-[#D4C5A0] hover:text-[#020814] flex items-center justify-center transition-all cursor-pointer text-white text-xs font-bold"
                >
                  IG
                </a>
              )}
              {settings?.twitter_url && (
                <a
                  href={settings.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 hover:border-[#D4C5A0] hover:bg-[#D4C5A0] hover:text-[#020814] flex items-center justify-center transition-all cursor-pointer text-white text-xs font-bold"
                >
                  X
                </a>
              )}
              {settings?.youtube_url && (
                <a
                  href={settings.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 hover:border-[#D4C5A0] hover:bg-[#D4C5A0] hover:text-[#020814] flex items-center justify-center transition-all cursor-pointer text-white text-xs font-bold"
                >
                  YT
                </a>
              )}
            </div>
          </div>

          {/* Practice Areas */}
          <div className="md:col-span-2 md:col-start-8">
            <h4 className="text-[#D4C5A0] font-bold text-xs uppercase tracking-widest mb-8">
              {t.practice}
            </h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li>
                <Link
                  href="/practice-areas#entertainment"
                  className="hover:text-white transition-colors"
                >
                  {t.practiceLinks.entertainment}
                </Link>
              </li>
              <li>
                <Link
                  href="/practice-areas#technology"
                  className="hover:text-white transition-colors"
                >
                  {t.practiceLinks.technology}
                </Link>
              </li>
              <li>
                <Link
                  href="/practice-areas#labor"
                  className="hover:text-white transition-colors"
                >
                  {t.practiceLinks.labor}
                </Link>
              </li>
              <li>
                <Link
                  href="/practice-areas#health"
                  className="hover:text-white transition-colors"
                >
                  {t.practiceLinks.health}
                </Link>
              </li>
            </ul>
          </div>

          {/* Firm Links */}
          <div className="md:col-span-2">
            <h4 className="text-[#D4C5A0] font-bold text-xs uppercase tracking-widest mb-8">
              {t.firm}
            </h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li>
                <Link
                  href="/lawyers"
                  className="hover:text-white transition-colors"
                >
                  {t.firmLinks.team}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  {t.firmLinks.about}
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-white transition-colors"
                >
                  {t.firmLinks.careers}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/engage"
                  className="hover:text-white transition-colors"
                >
                  {t.firmLinks.contact}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          {/*<div className="md:col-span-3">
            <h4 className="text-[#D4C5A0] font-bold text-xs uppercase tracking-widest mb-8">
              {t.newsletter.title}
            </h4>
            <p className="text-xs text-gray-500 mb-4">
              {t.newsletter.description}
            </p>
            <div className="flex border-b border-white/20 pb-2">
              <input
                type="email"
                placeholder={t.newsletter.placeholder}
                className="bg-transparent w-full outline-none text-white text-sm placeholder-gray-600"
              />
              <button className="text-[#D4C5A0] hover:text-white uppercase text-xs font-bold tracking-widest">
                {t.newsletter.button}
              </button>
            </div>
          </div>*/}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-mono">
          <p>
            &copy; {new Date().getFullYear()} {t.copyright}
          </p>
          <div className="flex gap-8">
            <Link
              href="/en/privacy-policy"
              className="hover:text-gray-400 transition-colors cursor-pointer"
            >
              {t.legal.privacy} &amp; {t.legal.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
