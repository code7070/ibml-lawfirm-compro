import Link from "next/link";
import Image from "next/image";
import { contactSettingsService } from "@/services/contact.service";

const Footer = async () => {
  const { data: settings } = await contactSettingsService.getMain();

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
              <Image
                src="/images/logo-white.svg"
                alt="IBLM Law Group"
                width={160}
                height={45}
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm font-light">
              The Sophisticated Guardian for your business. We combine classical
              jurisprudence with modern strategy to deliver unshakeable legal standing.
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
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-[#D4C5A0] font-bold text-xs uppercase tracking-widest mb-8">
              Practice
            </h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li>
                <Link
                  href="/practice-areas#entertainment"
                  className="hover:text-white transition-colors"
                >
                  Entertainment
                </Link>
              </li>
              <li>
                <Link
                  href="/practice-areas#technology"
                  className="hover:text-white transition-colors"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/practice-areas#labor"
                  className="hover:text-white transition-colors"
                >
                  People & Labor
                </Link>
              </li>
              <li>
                <Link
                  href="/practice-areas#health"
                  className="hover:text-white transition-colors"
                >
                  Health & Education
                </Link>
              </li>
            </ul>
          </div>

          {/* Firm Links */}
          <div className="md:col-span-2">
            <h4 className="text-[#D4C5A0] font-bold text-xs uppercase tracking-widest mb-8">
              Firm
            </h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li>
                <Link
                  href="/lawyers"
                  className="hover:text-white transition-colors"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <h4 className="text-[#D4C5A0] font-bold text-xs uppercase tracking-widest mb-8">
              Subscribe
            </h4>
            <p className="text-xs text-gray-500 mb-4">
              Stay updated with our latest legal insights and news.
            </p>
            <div className="flex border-b border-white/20 pb-2">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent w-full outline-none text-white text-sm placeholder-gray-600"
              />
              <button className="text-[#D4C5A0] hover:text-white uppercase text-xs font-bold tracking-widest">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-mono">
          <p>&copy; {new Date().getFullYear()} IBLM Law Group. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-gray-400 cursor-pointer">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-400 cursor-pointer">Terms</Link>
            <Link href="/sitemap" className="hover:text-gray-400 cursor-pointer">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

