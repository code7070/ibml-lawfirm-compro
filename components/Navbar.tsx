"use client";

import { useState, useEffect } from "react";
import { Menu, X, Scale } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "The Firm", href: "/about" },
    { name: "Expertise", href: "/practice-areas" },
    { name: "The Council", href: "/#team" },
    { name: "Results", href: "/#achievements" },
    { name: "Insights", href: "/articles" },
  ];

  const isHome = pathname === "/";
  // Navbar is solid if scrolled OR if not on the homepage OR if mobile menu is open
  const showSolidNav = isScrolled || !isHome || isMobileMenuOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showSolidNav ? "bg-[#0B1B3B] py-4 shadow-xl" : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="relative p-1 border border-[#D4C5A0]/30 rounded-sm rotate-45">
            <div className="p-1 border border-[#D4C5A0] bg-[#0B1B3B]">
              <Scale className="w-5 h-5 text-[#D4C5A0] -rotate-45" />
            </div>
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-xl font-light tracking-[0.2em] text-white">
              NEXUS
            </span>
            <span className="text-[0.65rem] font-bold tracking-[0.3em] text-[#D4C5A0] uppercase">
              Law Group
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-xs font-bold tracking-[0.15em] text-white/80 hover:text-[#D4C5A0] uppercase transition-colors group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4C5A0] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <Link
            href="/contact"
            className="px-6 py-3 text-xs font-bold tracking-widest text-[#0B1B3B] bg-[#D4C5A0] hover:bg-white transition-colors uppercase"
          >
            Book Consultation
          </Link>
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
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left text-2xl font-light text-white hover:text-[#D4C5A0]"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-left text-2xl font-light text-[#D4C5A0] hover:text-white"
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
