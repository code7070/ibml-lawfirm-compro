"use client";

import { useState, useEffect } from "react";
import { Menu, X, Scale } from "lucide-react";
import { LangLink } from "./LangLink";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTranslations } from "@/hooks/useTranslations";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations("nav");
  const params = useParams();
  const locale = (params?.locale as "id" | "en") || "id";
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("about"), href: "/about" },
    { name: t("practiceAreas"), href: "/practice-areas" },
    { name: t("services"), href: "/services" },
    { name: t("lawyers"), href: "/lawyers" },
    { name: t("events"), href: "/events" },
    { name: t("insights"), href: "/articles" },
  ];

  const handleLanguageChange = (newLocale: string) => {
    // Remove current locale from pathname and add new locale
    const pathWithoutLocale = pathname.replace(/^\/(en|id)/, "");
    router.push(`/${newLocale}${pathWithoutLocale || "/"}`);
  };

  const isHome =
    pathname === "/" || pathname === `/${locale}` || pathname === `/${locale}/`;
  // Navbar is solid if scrolled OR if not on the homepage OR if mobile menu is open
  const showSolidNav = isScrolled || !isHome || isMobileMenuOpen;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        showSolidNav ? "bg-[#0B1B3B] py-4 shadow-xl" : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <LangLink
          href="/"
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative p-1 border border-[#D4C5A0]/30 rounded-sm rotate-45">
            <div className="p-1 border border-[#D4C5A0] bg-[#0B1B3B]">
              <Scale className="w-5 h-5 text-[#D4C5A0] -rotate-45" />
            </div>
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-xl font-light tracking-[0.2em] text-white">
              IBLM
            </span>
            <span className="text-[0.66rem] font-bold tracking-[0.3em] text-[#D4C5A0] uppercase">
              Law Group
            </span>
          </div>
        </LangLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <LangLink
              key={link.href}
              href={link.href}
              className="relative text-xs font-bold tracking-[0.15em] text-white/80 hover:text-[#D4C5A0] uppercase transition-colors group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4C5A0] transition-all duration-300 group-hover:w-full"></span>
            </LangLink>
          ))}

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-2 border-r border-white/20 pr-4">
              <button
                onClick={() => handleLanguageChange("id")}
                className={`text-xs font-bold ${
                  locale === "id"
                    ? "text-[#D4C5A0]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                ID
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={() => handleLanguageChange("en")}
                className={`text-xs font-bold ${
                  locale === "en"
                    ? "text-[#D4C5A0]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>

            <LangLink
              href="/contact"
              className="px-6 py-3 text-xs font-bold tracking-widest text-[#0B1B3B] bg-[#D4C5A0] hover:bg-white transition-colors uppercase"
            >
              {t("contact")}
            </LangLink>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#D4C5A0]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0B1B3B] border-t border-[#D4C5A0]/20 p-8 flex flex-col gap-6 h-screen">
          {navLinks.map((link) => (
            <LangLink
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left text-2xl font-light text-white hover:text-[#D4C5A0]"
            >
              {link.name}
            </LangLink>
          ))}

          <div className="flex gap-4 py-4">
            <button
              onClick={() => {
                handleLanguageChange("id");
                setIsMobileMenuOpen(false);
              }}
              className={`text-lg font-bold ${
                locale === "id" ? "text-[#D4C5A0]" : "text-white/60"
              }`}
            >
              ID
            </button>
            <span className="text-white/20 text-lg">|</span>
            <button
              onClick={() => {
                handleLanguageChange("en");
                setIsMobileMenuOpen(false);
              }}
              className={`text-lg font-bold ${
                locale === "en" ? "text-[#D4C5A0]" : "text-white/60"
              }`}
            >
              EN
            </button>
          </div>

          <LangLink
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-left text-2xl font-light text-[#D4C5A0] hover:text-white"
          >
            {t("contact")}
          </LangLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
