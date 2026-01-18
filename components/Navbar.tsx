"use client";

import { useState, useEffect } from "react";
import { Menu, X, Scale, ChevronDown, Check } from "lucide-react";
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

  // Full Desktop Links
  const fullNavLinks = [
    { name: t("about"), href: "/about" },
    { name: t("practiceAreas"), href: "/practice-areas" },
    { name: t("services"), href: "/services" },
    { name: t("lawyers"), href: "/lawyers" },
    { name: t("events"), href: "/events" },
    { name: t("insights"), href: "/articles" },
  ];

  // Compact Links (Tablet/Small Laptop)
  const compactDropdownLinks = [
    { name: t("about"), href: "/about" },
    { name: t("practiceAreas"), href: "/practice-areas" },
    { name: t("services"), href: "/services" },
    { name: t("lawyers"), href: "/lawyers" },
  ];

  const compactDirectLinks = [
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
      className={`sticky top-0 z-50 transition-all duration-500 h-navbar flex items-center ${
        showSolidNav ? "bg-[#0B1B3B] shadow-xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between w-full">
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

        {/* 1. Full Desktop Nav (> 1240px) */}
        <div className="hidden min-[1240px]:flex items-center gap-10">
          {fullNavLinks.map((link) => (
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
            {/* Language Switcher Dropdown */}
            <div className="relative group border-r border-white/20 pr-4">
              <button className="flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-white/80 hover:text-[#D4C5A0] uppercase transition-colors py-4">
                {locale.toUpperCase()}
                <ChevronDown className="w-3 h-3" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 w-48 bg-[#0B1B3B] border border-[#D4C5A0]/20 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 flex flex-col p-2">
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`flex justify-between text-left px-4 py-3 text-xs font-bold tracking-wider transition-colors uppercase text-white hover:text-[#0B1B3B] hover:bg-[#D4C5A0]`}
                >
                  EN (English)
                  {locale === "en" && <Check size={14} />}
                </button>
                <button
                  onClick={() => handleLanguageChange("id")}
                  className={`flex justify-between text-left px-4 py-3 text-xs font-bold tracking-wider transition-colors uppercase text-white hover:text-[#0B1B3B] hover:bg-[#D4C5A0]`}
                >
                  ID (Indonesia)
                  {locale === "id" && <Check size={14} />}
                </button>
              </div>
            </div>

            <LangLink
              href="/contact"
              className="px-6 py-3 text-xs font-bold tracking-widest text-[#0B1B3B] bg-[#D4C5A0] hover:bg-white transition-colors uppercase"
            >
              {t("contact")}
            </LangLink>
          </div>
        </div>

        {/* 2. Compact Desktop/Tablet Nav (768px - 1240px) */}
        <div className="hidden md:flex min-[1240px]:hidden! items-center gap-6">
          {/* Dropdown Group */}
          <div className="relative group">
            <button className="flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-white/80 hover:text-[#D4C5A0] uppercase transition-colors py-4">
              {t("about")}
              <ChevronDown className="w-3 h-3" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 w-48 bg-[#0B1B3B] border border-[#D4C5A0]/20 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 flex flex-col p-2">
              {compactDropdownLinks.map((link) => (
                <LangLink
                  key={link.href}
                  href={link.href}
                  className="text-left px-4 py-3 text-xs font-bold tracking-wider text-white hover:text-[#0B1B3B] hover:bg-[#D4C5A0] transition-colors uppercase"
                >
                  {link.name}
                </LangLink>
              ))}
            </div>
          </div>

          {/* Remaining Direct Links */}
          {compactDirectLinks.map((link) => (
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
            {/* Language Switcher Dropdown */}
            <div className="relative group border-r border-white/20 pr-4">
              <button className="flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-white/80 hover:text-[#D4C5A0] uppercase transition-colors py-4">
                {locale.toUpperCase()}
                <ChevronDown className="w-3 h-3" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 w-48 bg-[#0B1B3B] border border-[#D4C5A0]/20 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 flex flex-col p-2">
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`flex justify-between text-left px-4 py-3 text-xs font-bold tracking-wider transition-colors uppercase text-white hover:text-[#0B1B3B] hover:bg-[#D4C5A0]`}
                >
                  EN (English)
                  {locale === "en" && <Check size={14} />}
                </button>
                <button
                  onClick={() => handleLanguageChange("id")}
                  className={`flex justify-between text-left px-4 py-3 text-xs font-bold tracking-wider transition-colors uppercase text-white hover:text-[#0B1B3B] hover:bg-[#D4C5A0]`}
                >
                  ID (Indonesia)
                  {locale === "id" && <Check size={14} />}
                </button>
              </div>
            </div>

            <LangLink
              href="/contact"
              className="px-4 py-3 text-[0.65rem] font-bold tracking-widest text-[#0B1B3B] bg-[#D4C5A0] hover:bg-white transition-colors uppercase"
            >
              {t("contact")}
            </LangLink>
          </div>
        </div>

        {/* Mobile Toggle (< 768px) */}
        <button
          className="md:hidden text-[#D4C5A0]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0B1B3B] border-t border-[#D4C5A0]/20 p-8 flex flex-col gap-6 h-[calc(100vh-var(--navbar-height))] overflow-y-auto">
          {fullNavLinks.map((link) => (
            <LangLink
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left text-2xl font-light text-white hover:text-[#D4C5A0]"
            >
              {link.name}
            </LangLink>
          ))}

          {/* Language Options */}
          <div className="border-t border-[#D4C5A0]/20 pt-6 space-y-4">
            <span className="text-[#D4C5A0] font-bold tracking-[0.3em] text-xs uppercase block">
              Language
            </span>
            <button
              onClick={() => {
                handleLanguageChange("en");
                setIsMobileMenuOpen(false);
              }}
              className={`text-left text-lg font-light flex justify-between w-full text-white hover:text-[#D4C5A0]`}
            >
              EN (English)
              {locale === "en" && <Check size={14} />}
            </button>
            <button
              onClick={() => {
                handleLanguageChange("id");
                setIsMobileMenuOpen(false);
              }}
              className={`text-left text-lg font-light flex justify-between w-full text-white hover:text-[#D4C5A0]`}
            >
              ID (Indonesia)
              {locale === "id" && <Check size={14} />}
            </button>
          </div>

          <LangLink
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-left text-2xl font-light text-[#D4C5A0] hover:text-white mt-6 block"
          >
            {t("contact")}
          </LangLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
