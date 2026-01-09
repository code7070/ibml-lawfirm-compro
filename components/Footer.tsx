import { Scale } from "lucide-react";
import Link from "next/link";

const Footer = () => {
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
            <Link href="/" className="flex items-center gap-3">
              <Scale className="w-8 h-8 text-[#D4C5A0]" />
              <span className="text-2xl font-light tracking-[0.2em] text-white">
                NEXUS
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm font-light">
              We stand at the intersection of technology and justice. Providing
              uncompromising legal defense for the architects of the digital
              future.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders using simple circles for sophistication */}
              <div className="w-10 h-10 rounded-full border border-white/20 hover:border-[#D4C5A0] hover:bg-[#D4C5A0] hover:text-[#020814] flex items-center justify-center transition-all cursor-pointer text-white">
                IN
              </div>
              <div className="w-10 h-10 rounded-full border border-white/20 hover:border-[#D4C5A0] hover:bg-[#D4C5A0] hover:text-[#020814] flex items-center justify-center transition-all cursor-pointer text-white">
                X
              </div>
            </div>
          </div>

          {/* Links 1 */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-[#D4C5A0] font-bold text-xs uppercase tracking-widest mb-8">
              Practice
            </h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li>
                <Link
                  href="/practice-areas#game-dev"
                  className="hover:text-white transition-colors"
                >
                  Game Dev Law
                </Link>
              </li>
              <li>
                <Link
                  href="/practice-areas#esports"
                  className="hover:text-white transition-colors"
                >
                  eSports
                </Link>
              </li>
              <li>
                <Link
                  href="/practice-areas#ip"
                  className="hover:text-white transition-colors"
                >
                  IP Litigation
                </Link>
              </li>
              <li>
                <Link
                  href="/practice-areas#corporate"
                  className="hover:text-white transition-colors"
                >
                  Corporate
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
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
                  The Council
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
              Join the League
            </h4>
            <p className="text-xs text-gray-500 mb-4">
              Latest legal updates from the frontlines.
            </p>
            <div className="flex border-b border-white/20 pb-2">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent w-full outline-none text-white text-sm placeholder-gray-600"
              />
              <button className="text-[#D4C5A0] hover:text-white uppercase text-xs font-bold tracking-widest">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-mono">
          <p>&copy; {new Date().getFullYear()} Nexus Legal LLP. Est. 2024</p>
          <div className="flex gap-8">
            <span className="hover:text-gray-400 cursor-pointer">Privacy</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms</span>
            <span className="hover:text-gray-400 cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
