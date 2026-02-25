"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

interface Section {
  id: string;
  number: string;
  title: string;
}

/* ─── Table of Contents Data ─────────────────────────────────────────────────── */

const TNC_SECTIONS: Section[] = [
  { id: "disclaimer", number: "I", title: "Disclaimer" },
  { id: "amendments", number: "II", title: "Amendments to the Terms" },
  { id: "copyright", number: "III", title: "Copyright" },
  { id: "consultation", number: "IV", title: "Consultation Services" },
  { id: "liability", number: "V", title: "Limitation of Liability" },
  { id: "indemnification", number: "VI", title: "Indemnification" },
  { id: "governing-law", number: "VII", title: "Governing Law" },
  { id: "contact-tnc", number: "VIII", title: "Contact Us" },
];

const PRIVACY_SECTIONS: Section[] = [
  {
    id: "data-collect",
    number: "1",
    title: "What Personal Data Do We Collect?",
  },
  { id: "data-purpose", number: "2", title: "Purposes for Collecting Data" },
  { id: "data-how", number: "3", title: "How Do We Collect Your Data?" },
  { id: "data-basis", number: "4", title: "Basis for Collecting Data" },
  { id: "data-share", number: "5", title: "With Whom Do We Share Data?" },
  { id: "data-store", number: "6", title: "How Do We Store & Secure Data?" },
  { id: "data-rights", number: "7", title: "Your Data Protection Rights" },
  { id: "data-links", number: "8", title: "Third-Party Website Links" },
  { id: "data-updates", number: "9", title: "Policy Updates" },
  { id: "data-contact", number: "10", title: "Contact Us" },
];

/* ─── Component ──────────────────────────────────────────────────────────────── */

export default function PrivacyPolicyPage({ locale }: { locale: string }) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"terms" | "privacy">("terms");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  // Hero entrance animation
  useEffect(() => {
    const timeout = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  // Scroll spy for active section tracking
  useEffect(() => {
    const allSections = activeTab === "terms" ? TNC_SECTIONS : PRIVACY_SECTIONS;

    const handleScroll = () => {
      // Progress bar
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      // Section tracking
      let current = "";
      for (const section of allSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 120;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setTocOpen(false);
  }, []);

  const handleTabSwitch = useCallback((tab: "terms" | "privacy") => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const currentSections =
    activeTab === "terms" ? TNC_SECTIONS : PRIVACY_SECTIONS;

  return (
    <div className="privacy-policy-page relative">
      {/* ── Scroll Progress Bar ──────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px]">
        <div
          className="h-full bg-gradient-to-r from-[#D4C5A0] via-[#c0b181] to-[#D4C5A0] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="relative bg-[#0B1B3B] overflow-hidden min-h-[55vh] md:min-h-[60vh] flex items-end"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0">
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(212,197,160,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(212,197,160,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
          {/* Diagonal gold accent line */}
          <div
            className="absolute -right-20 top-0 w-[1px] h-[140%] bg-gradient-to-b from-transparent via-[#D4C5A0]/20 to-transparent"
            style={{ transform: "rotate(25deg)", transformOrigin: "top right" }}
          />
          <div
            className="absolute right-32 top-0 w-[1px] h-[140%] bg-gradient-to-b from-transparent via-[#D4C5A0]/10 to-transparent"
            style={{ transform: "rotate(25deg)", transformOrigin: "top right" }}
          />
          {/* Soft radial glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(212,197,160,0.05) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 pb-16 md:pb-20 pt-32 md:pt-40">
          {/* Document badge */}
          <div
            className={`transition-all duration-700 ease-out ${
              heroVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-[#D4C5A0]" />
              <span className="text-[#D4C5A0] text-[11px] font-bold uppercase tracking-[0.25em] font-primary">
                Legal Document
              </span>
            </div>
          </div>

          {/* Title */}
          <div
            className={`transition-all duration-700 delay-150 ease-out ${
              heroVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <h1 className="font-secondary text-white">
              <span className="block text-4xl md:text-6xl lg:text-7xl font-light leading-[0.95] tracking-tight">
                Privacy Policy
              </span>
              <span className="block text-4xl md:text-6xl lg:text-7xl font-light leading-[0.95] tracking-tight mt-1">
                <span className="text-[#D4C5A0] italic">&</span>{" "}
                <span className="text-white/60">Terms</span>
              </span>
            </h1>
          </div>

          {/* Subline */}
          <div
            className={`transition-all duration-700 delay-300 ease-out ${
              heroVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="mt-8 flex items-start gap-6 max-w-2xl">
              <div className="w-[3px] h-16 bg-gradient-to-b from-[#D4C5A0] to-transparent shrink-0 mt-1" />
              <p className="text-white/50 text-sm md:text-base leading-relaxed font-light">
                This document outlines how IBLM Law Group collects, uses, and
                protects your personal data, along with the terms governing your
                use of our website and services.
              </p>
            </div>
          </div>

          {/* Meta info */}
          <div
            className={`mt-10 flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-widest transition-all duration-700 delay-500 ease-out ${
              heroVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-white/30 font-primary">
              Last Updated: FEBRUARY 25, 2026
            </span>
            <span className="text-white/15">|</span>
            <span className="text-white/30 font-primary">
              Effective Immediately
            </span>
            <span className="text-white/15">|</span>
            <span className="text-white/30 font-primary">
              Republic of Indonesia
            </span>
          </div>
        </div>
      </div>

      {/* ── Tab Switcher (Sticky) ────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#0B1B3B]/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-0">
            <button
              onClick={() => handleTabSwitch("terms")}
              className={`relative py-4 md:py-5 px-5 md:px-8 text-xs md:text-sm font-bold uppercase tracking-[0.15em] transition-colors duration-300 font-primary cursor-pointer ${
                activeTab === "terms"
                  ? "text-[#0B1B3B]"
                  : "text-[#0B1B3B]/30 hover:text-[#0B1B3B]/60"
              }`}
            >
              Terms & Conditions
              {activeTab === "terms" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4C5A0] privacy-tab-indicator" />
              )}
            </button>
            <button
              onClick={() => handleTabSwitch("privacy")}
              className={`relative py-4 md:py-5 px-5 md:px-8 text-xs md:text-sm font-bold uppercase tracking-[0.15em] transition-colors duration-300 font-primary cursor-pointer ${
                activeTab === "privacy"
                  ? "text-[#0B1B3B]"
                  : "text-[#0B1B3B]/30 hover:text-[#0B1B3B]/60"
              }`}
            >
              Privacy Notice
              {activeTab === "privacy" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4C5A0] privacy-tab-indicator" />
              )}
            </button>

            {/* Mobile TOC toggle */}
            <button
              onClick={() => setTocOpen(!tocOpen)}
              className="ml-auto lg:hidden p-3 text-[#0B1B3B]/40 hover:text-[#0B1B3B] transition-colors cursor-pointer"
              aria-label="Toggle table of contents"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 4h12M3 9h8M3 14h10" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile TOC Drawer ────────────────────────────────────────────── */}
      {tocOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setTocOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl p-6 pt-16 overflow-y-auto privacy-toc-drawer">
            <button
              onClick={() => setTocOpen(false)}
              className="absolute top-5 right-5 text-[#0B1B3B]/40 hover:text-[#0B1B3B] transition-colors cursor-pointer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 5l10 10M15 5l-10 10" />
              </svg>
            </button>
            <p className="text-[10px] font-bold text-[#D4C5A0] uppercase tracking-[0.2em] mb-5 font-primary">
              Contents
            </p>
            <nav className="space-y-1">
              {currentSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left py-2 px-3 rounded-sm text-xs transition-all duration-200 cursor-pointer ${
                    activeSection === section.id
                      ? "text-[#0B1B3B] bg-[#D4C5A0]/10 font-semibold"
                      : "text-[#0B1B3B]/40 hover:text-[#0B1B3B]/70"
                  }`}
                >
                  <span className="text-[#D4C5A0] font-bold mr-2 font-primary">
                    {section.number}
                  </span>
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* ── Main Content Area ────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="flex gap-16">
          {/* ── Left Sidebar: Table of Contents (Desktop) ─────────────────── */}
          <aside className="hidden lg:block w-[220px] shrink-0">
            <div className="sticky top-[80px] pt-4">
              <p className="text-[10px] font-bold text-[#D4C5A0] uppercase tracking-[0.2em] mb-6 font-primary">
                {activeTab === "terms" ? "Terms of Use" : "Privacy Notice"}
              </p>
              <nav className="space-y-0.5">
                {currentSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`group w-full text-left py-2 px-3 rounded-sm text-[13px] transition-all duration-300 flex items-start gap-2.5 cursor-pointer ${
                      activeSection === section.id
                        ? "text-[#0B1B3B] bg-[#0B1B3B]/[0.03]"
                        : "text-[#0B1B3B]/35 hover:text-[#0B1B3B]/60"
                    }`}
                  >
                    <span
                      className={`text-[10px] font-bold font-primary mt-[2px] shrink-0 transition-colors duration-300 ${
                        activeSection === section.id
                          ? "text-[#D4C5A0]"
                          : "text-[#0B1B3B]/20 group-hover:text-[#D4C5A0]/60"
                      }`}
                    >
                      {section.number}
                    </span>
                    <span
                      className={`leading-snug transition-all duration-300 ${
                        activeSection === section.id
                          ? "font-semibold"
                          : "font-normal"
                      }`}
                    >
                      {section.title}
                    </span>
                  </button>
                ))}
              </nav>

              {/* Quick jump to other tab */}
              <div className="mt-10 pt-6 border-t border-[#0B1B3B]/5">
                <button
                  onClick={() =>
                    handleTabSwitch(activeTab === "terms" ? "privacy" : "terms")
                  }
                  className="text-[11px] text-[#0B1B3B]/30 hover:text-[#D4C5A0] transition-colors duration-300 uppercase tracking-widest font-primary cursor-pointer"
                >
                  →{" "}
                  {activeTab === "terms"
                    ? "Privacy Notice"
                    : "Terms & Conditions"}
                </button>
              </div>

              {/* Back to contact */}
              <div className="mt-4">
                <Link
                  href={`/${locale}/contact`}
                  className="text-[11px] text-[#0B1B3B]/30 hover:text-[#D4C5A0] transition-colors duration-300 uppercase tracking-widest font-primary"
                >
                  → Contact Us
                </Link>
              </div>
            </div>
          </aside>

          {/* ── Main Document Body ────────────────────────────────────────── */}
          <div ref={contentRef} className="flex-1 min-w-0 max-w-3xl">
            {activeTab === "terms" ? <TermsContent /> : <PrivacyContent />}
          </div>
        </div>
      </div>

      {/* ── Bottom CTA Bar ───────────────────────────────────────────────── */}
      <div className="bg-[#0B1B3B] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #D4C5A0 25%, transparent 25%, transparent 75%, #D4C5A0 75%),
              linear-gradient(45deg, #D4C5A0 25%, transparent 25%, transparent 75%, #D4C5A0 75%)
            `,
            backgroundSize: "16px 16px",
            backgroundPosition: "0 0, 8px 8px",
          }}
        />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-14 md:py-20 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-[#D4C5A0] text-[11px] font-bold uppercase tracking-[0.2em] mb-3 font-primary">
                Questions About This Policy?
              </p>
              <p className="text-white/50 text-sm md:text-base font-light max-w-lg leading-relaxed">
                If you have questions, comments, or concerns about our privacy
                practices or these terms, please don't hesitate to reach out.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/*<a
                href="mailto:info@iblmlaw.group"
                className="group inline-flex items-center gap-3 px-7 py-3.5 border border-[#D4C5A0]/30 text-[#D4C5A0] hover:bg-[#D4C5A0] hover:text-[#0B1B3B] text-xs font-bold uppercase tracking-widest transition-all duration-300 font-primary"
              >
                <span>Email Us</span>
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>*/}
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#D4C5A0] text-[#0B1B3B] hover:bg-[#e8dbbf] text-xs font-bold uppercase tracking-widest transition-all duration-300 font-primary"
              >
                Contact Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   TERMS & CONDITIONS CONTENT
   ═══════════════════════════════════════════════════════════════════════════════ */

function TermsContent() {
  return (
    <article className="privacy-document">
      {/* Document header */}
      <div className="mb-14">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 bg-[#0B1B3B] flex items-center justify-center">
            <span className="text-[#D4C5A0] text-xs font-bold font-primary">
              T&C
            </span>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-primary font-bold text-[#0B1B3B] tracking-tight">
              Terms & Conditions
            </h2>
            <p className="text-[11px] text-[#0B1B3B]/40 uppercase tracking-widest font-primary">
              IBLM Law Group Website
            </p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gradient-to-r from-[#D4C5A0] via-[#D4C5A0]/30 to-transparent" />
      </div>

      {/* Section I: Disclaimer */}
      <PolicySection id="disclaimer" number="I" title="Disclaimer">
        <p>
          The IBLM Law Group website (&ldquo;<strong>Website</strong>&rdquo;) is
          provided as a service to clients, colleagues, and other parties solely
          for the purpose of presenting general information about IBLM Law
          Group. Any information available herein is not intended to constitute
          legal advice or other professional advice. Accessing, viewing, or
          using this Website does not create an attorney-client relationship.
        </p>
        <p>
          You shall not act or refrain from acting based on any information
          contained on this Website without first obtaining legal or other
          professional advice appropriate to your specific circumstances. IBLM
          Law Group shall not be liable for any loss that may arise from
          accessing or relying on the information contained on this Website.
          IBLM Law Group expressly disclaims, to the fullest extent permitted by
          applicable law, any and all liability in connection with any act or
          omission on your part based on the general information provided on
          this Website.
        </p>
        <p>
          As laws and regulations may change from time to time, IBLM Law Group
          does not warrant that the materials on this Website are complete,
          accurate, or up to date.
        </p>
        <p>
          Please read these Terms & Use (&ldquo;<strong>Terms</strong>&rdquo;)
          carefully before using the Website. By using the Website, you accept
          and agree to be bound by and comply with these Terms.
        </p>
      </PolicySection>

      {/* Section II: Amendments */}
      <PolicySection
        id="amendments"
        number="II"
        title="Amendments to the Terms and Website"
      >
        <p>
          IBLM Law Group may amend and update the Website and these Terms from
          time to time. By continuing to use the Website after such amendments
          are made, you are deemed to have accepted such changes. Amendments to
          the Terms or the Website shall not be applied retroactively. IBLM Law
          Group reserves the right to discontinue the Website or any part
          thereof with or without notice to you.
        </p>
      </PolicySection>

      {/* Section III: Copyright */}
      <PolicySection id="copyright" number="III" title="Copyright">
        <p>
          The Website and all materials or parts of the Website are protected by
          international copyright laws and regulations, including but not
          limited to: graphics, layouts, text, content, images, website design,
          audio, video, designs, advertising copy, trademarks, logos, domain
          names, and all copyrighted materials associated with the Website
          (&ldquo;<strong>Content</strong>&rdquo;) are owned and controlled by
          IBLM Law Group.
        </p>
        <p>
          You agree not to reproduce, duplicate, copy, sell, resell, or exploit
          for any commercial purpose any part of the Website or the Content
          unless expressly authorized by IBLM Law Group. Partial reproduction of
          the Content on this Website is permitted provided that:
        </p>
        <ol>
          <li>
            Such reproduction is made available free of charge and for
            non-commercial purposes;
          </li>
          <li>Such reproduction is properly attributed to IBLM Law Group;</li>
          <li>
            The reproduced portion of this Website is not altered or presented
            in a manner that modifies its content or presented in a misleading
            context; and
          </li>
          <li>
            Written notice is provided through the Contact Information listed on
            this Website.
          </li>
        </ol>
      </PolicySection>

      {/* Section IV: Consultation Services */}
      <PolicySection
        id="consultation"
        number="IV"
        title="Consultation Services"
      >
        <p>
          IBLM Law Group, through this Website, provides a feature for
          scheduling consultation appointments (&ldquo;
          <strong>Consultation Services</strong>&rdquo;) that allows you to
          submit a consultation scheduling request through the available form.
          In using the Consultation Services, you are required to provide
          certain personal data such as your name, email address, and other
          information necessary to follow up on your request.
        </p>
        <p>
          By submitting personal data through the Consultation Services, you
          represent that the information provided is true, accurate, and given
          voluntarily. The information you submit will be processed in
          accordance with the applicable Privacy Notice.
        </p>
        <p>
          Unless otherwise specified in the Privacy Notice, any information
          submitted through the Website shall not be deemed confidential. The
          submission of information or consultation requests through the Website
          does not, in and of itself, create an attorney-client relationship,
          unless and until a written agreement is formally executed by the
          parties.
        </p>
        <p>
          IBLM Law Group reserves the right to use the information you submit
          for the purposes of following up on consultation requests, providing
          responses, and for administrative and operational purposes in
          accordance with applicable laws and regulations.
        </p>
      </PolicySection>

      {/* Section V: Limitation of Liability */}
      <PolicySection id="liability" number="V" title="Limitation of Liability">
        <p>
          To the fullest extent permitted by applicable law, IBLM Law Group
          shall not be liable for any loss or damage arising from or in
          connection with your access to, use of, or inability to use this
          Website, including all Content and links contained therein. This
          includes direct and indirect damages, including loss of profits, data,
          or other intangible losses, even if the possibility of such losses has
          been advised in advance.
        </p>
        <p>
          The Website and all of its content are provided on an &ldquo;as
          is&rdquo; basis without any warranties of any kind, whether express or
          implied. IBLM Law Group does not warrant the accuracy, completeness,
          or reliability of the information available. Your use of the Website
          is entirely at your own risk. If you are dissatisfied with this
          Website, your sole remedy is to discontinue its use.
        </p>
      </PolicySection>

      {/* Section VI: Indemnification */}
      <PolicySection id="indemnification" number="VI" title="Indemnification">
        <p>
          By accessing or using this Website, you agree to defend, indemnify,
          and hold harmless IBLM Law Group, together with its affiliates,
          officers, and employees, from and against any and all claims, demands,
          losses, liabilities, and legal costs arising from your use of the
          Website or your breach of these Terms, including violations of law,
          third-party claims, misuse of accounts, or information you have
          submitted through the Website.
        </p>
        <p>
          You shall cooperate in the defense of any such claims. IBLM Law Group
          reserves the right to assume the exclusive defense and control of any
          matter subject to your indemnification obligations, and you shall not
          settle any such matter without the prior written consent of IBLM Law
          Group.
        </p>
      </PolicySection>

      {/* Section VII: Governing Law */}
      <PolicySection id="governing-law" number="VII" title="Governing Law">
        <p>
          By using this Website, you agree that these Terms and the relationship
          between you and IBLM Law Group shall be governed by the laws of the
          Republic of Indonesia. Any dispute arising from or in connection with
          the use of this Website shall be resolved through the competent courts
          in Indonesia.
        </p>
        <p>
          If you have a dispute with another user or a third party relating to
          the use of the Website, such dispute shall be the responsibility of
          the respective parties. You hereby release IBLM Law Group, together
          with its directors and employees, from any and all claims or demands
          arising from such dispute.
        </p>
      </PolicySection>

      {/* Section VIII: Contact Us */}
      <PolicySection id="contact-tnc" number="VIII" title="Contact Us">
        <p>
          If you have any questions, complaints, or require further information
          regarding these Terms and Conditions or the use of the Website, please
          contact us via the email address or correspondence address listed on
          this Website.
        </p>
        <ContactBlock />
      </PolicySection>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   PRIVACY NOTICE CONTENT
   ═══════════════════════════════════════════════════════════════════════════════ */

function PrivacyContent() {
  return (
    <article className="privacy-document">
      {/* Document header */}
      <div className="mb-14">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 bg-[#0B1B3B] flex items-center justify-center">
            <span className="text-[#D4C5A0] text-xs font-bold font-primary">
              PN
            </span>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-primary font-bold text-[#0B1B3B] tracking-tight">
              Privacy Notice
            </h2>
            <p className="text-[11px] text-[#0B1B3B]/40 uppercase tracking-widest font-primary">
              Last Updated: March 1, 2026
            </p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gradient-to-r from-[#D4C5A0] via-[#D4C5A0]/30 to-transparent" />
      </div>

      {/* Preamble */}
      <div className="mb-14 pl-6 border-l-2 border-[#D4C5A0]/30">
        <p className="text-[#2E4472] text-[15px] leading-relaxed font-light italic">
          IBLM Law Group is an independent law firm offering expertise in legal
          services across various fields and industries. We understand the
          importance of protecting your personal data and your rights as a data
          subject. Accordingly, we respect your privacy and are committed to
          safeguarding your personal data in compliance with applicable laws and
          regulations.
        </p>
      </div>

      {/* Section 1 */}
      <PolicySection
        id="data-collect"
        number="1"
        title="What Personal Data Do We Collect?"
      >
        <p>The personal data we collect includes:</p>
        <ol>
          <li>
            <strong>Contact information:</strong> name, job title, role, company
            or organization, telephone number (including mobile number if
            provided), as well as email address and mailing address.
          </li>
          <li>
            <strong>Information from public sources:</strong> such as LinkedIn
            and similar professional networks, directories, or internet
            publications.
          </li>
          <li>
            <strong>Attendance records:</strong> to record your visit to our
            office for security purposes.
          </li>
          <li>
            <strong>Event data:</strong> attendance information and feedback on
            events organized by us.
          </li>
          <li>
            <strong>Supplier data:</strong> your contact details and
            information, or those of your company, if providing services to IBLM
            Law Group.
          </li>
          <li>
            <strong>Social media:</strong> your interactions with our social
            media accounts.
          </li>
        </ol>
        <p>
          Such data may be obtained from you, your employer, our clients, or
          compliance screening service providers.
        </p>
      </PolicySection>

      {/* Section 2 */}
      <PolicySection
        id="data-purpose"
        number="2"
        title="What Are Our Purposes for Collecting Your Personal Data?"
      >
        <p>
          We process personal data for legitimate purposes directly related to
          the legal or commercial relationship established, in accordance with
          our company policies and applicable legal provisions.
        </p>
        <p>
          Specifically, your personal data is used to provide legal services to
          you, to communicate with you in the course of our business whether as
          a client or a business contact, to provide you with subscriptions to
          our news alerts, newsletters, or regular publications, to market our
          services such as events and to provide relevant event materials, for
          your information and/or participation in our events, to process job
          applicants and vendors, to obtain feedback, for surveys, legal
          compliance, Website monitoring and security, legitimate business
          interests, or to respond to your requests or provide you with
          information we believe may be of interest to you, and to protect our
          rights and interests (&ldquo;<strong>Purposes</strong>&rdquo;).
        </p>
      </PolicySection>

      {/* Section 3 */}
      <PolicySection
        id="data-how"
        number="3"
        title="How Do We Collect Your Personal Data?"
      >
        <p>
          We may collect your personal data <strong>directly</strong> when you
          fill in forms on the Website, contact us, or provide information
          through the Website, email, telephone, or other means. We may also
          receive your personal data <strong>from third parties</strong>, such
          as clients, business partners, service providers, publicly available
          sources, or other parties lawfully authorized to share such data with
          us.
        </p>
        <Callout>
          Do not submit confidential information before we have confirmed in
          writing that we represent you. Unsolicited emails from non-clients do
          not establish an attorney-client relationship and may not be treated
          as confidential.
        </Callout>
      </PolicySection>

      {/* Section 4 */}
      <PolicySection
        id="data-basis"
        number="4"
        title="What Is Our Basis for Collecting Your Personal Data?"
      >
        <p>
          In general, we process your personal data on the following grounds:
        </p>
        <ol>
          <li>
            <strong>Contractual necessity:</strong> where we need to process
            your personal data to perform a contract with you or our client, or
            to take steps at your or our client&apos;s request prior to entering
            into a contract.
          </li>
          <li>
            <strong>Legal obligation:</strong> where we need to process your
            personal data to comply with legal or regulatory obligations
            applicable to us.
          </li>
          <li>
            <strong>Legitimate interests:</strong> where we or a third party
            have a legitimate interest in processing your personal data, and
            such interest does not override your interests or fundamental rights
            and freedoms.
          </li>
          <li>
            <strong>Consent:</strong> where you have given us clear, specific,
            and explicit consent to process your personal data for a particular
            purpose. You have the right to withdraw your consent at any time by
            contacting us.
          </li>
          <li>
            <strong>Other legal grounds:</strong> where we need to process your
            personal data for other legal reasons, such as to protect the vital
            interests of you or another person, or for the performance of a task
            carried out in the public interest.
          </li>
        </ol>
      </PolicySection>

      {/* Section 5 */}
      <PolicySection
        id="data-share"
        number="5"
        title="With Whom Do We Share Your Personal Data?"
      >
        <p>
          Your personal data may be transferred to third parties to the extent
          necessary to fulfill the Purposes described above. Such transfers may
          be made to offices or affiliates within the firm&apos;s network,
          service providers and support service centers, as well as other law
          firms or related professionals where necessary for the provision of
          services, to law enforcement authorities or regulators in compliance
          with legal obligations, to compliance screening service providers,
          financial institutions, and to vendors or service providers that
          assist in the management and development of the Website.
        </p>
        <p>
          In the event of a restructuring or change in business structure, data
          may also be transferred to third parties involved in such process.
        </p>
        <p>
          Please note that, to the extent possible and as required by applicable
          laws and regulations, we impose strict requirements on any third party
          that receives your personal data.
        </p>
      </PolicySection>

      {/* Section 6 */}
      <PolicySection
        id="data-store"
        number="6"
        title="How Do We Store and Secure Your Personal Data?"
      >
        <p>
          We implement physical, technical, and administrative safeguards to
          protect your personal data from unauthorized access, use, or
          disclosure, including through access restrictions and security systems
          that ensure confidentiality in accordance with applicable standards.
        </p>
        <p>
          We will not knowingly collect information from children or individuals
          under the age of 16, and if you are under 16 years of age, you are not
          permitted to submit personal data to us.
        </p>
        <p>
          However, no method of data transmission or storage over the internet
          is entirely secure, and therefore we cannot guarantee absolute
          security. Your personal data may be processed and transferred across
          borders while maintaining appropriate protections in compliance with
          applicable laws and regulations.
        </p>
        <p>
          We retain personal data for as long as necessary to fulfill the
          Purposes for which it was collected and/or as required by applicable
          legal obligations. When data is no longer needed, we will securely
          delete or anonymize it in accordance with our data retention policies.
        </p>
      </PolicySection>

      {/* Section 7 */}
      <PolicySection
        id="data-rights"
        number="7"
        title="What Are Your Personal Data Protection Rights?"
      >
        <p>
          You have certain rights in relation to your personal data, in
          accordance with applicable laws and regulations. These rights may
          include:
        </p>
        <ol>
          <li>
            <strong>Right of access:</strong> You have the right to request a
            copy of the personal data we hold about you.
          </li>
          <li>
            <strong>Right to rectification and update:</strong> You have the
            right to request that we correct or update any inaccurate, outdated,
            or incomplete personal data we hold about you.
          </li>
          <li>
            <strong>Right to erasure and destruction:</strong> You have the
            right to request that we delete or destroy your personal data from
            our systems, unless we have a legitimate reason to retain it.
          </li>
          <li>
            <strong>Right to restriction of processing:</strong> You have the
            right to request that we restrict the way we use your personal data.
          </li>
          <li>
            <strong>Right to data portability:</strong> You have the right to
            request that we provide or transfer your personal data to another
            organization or to you, in a structured, commonly used, and
            machine-readable format, where technically feasible and applicable.
          </li>
          <li>
            <strong>Right to withdraw consent:</strong> You have the right to
            withdraw your consent to our use of your personal data at any time,
            where such processing is based solely on consent.
          </li>
          <li>
            <strong>Right to lodge a complaint:</strong> You have the right to
            lodge a complaint with us if you believe that we have violated your
            data protection rights.
          </li>
        </ol>
        <p>
          If you wish to exercise your data protection rights, please contact us
          using the contact details below. We will respond to your request
          within a reasonable timeframe and in accordance with applicable laws
          and regulations.
        </p>
      </PolicySection>

      {/* Section 8 */}
      <PolicySection
        id="data-links"
        number="8"
        title="Does This Website Contain Links to Third-Party Websites?"
      >
        <p>
          This Privacy Notice applies only to your interactions with us through
          this Website. This Website may contain links to other websites that
          have their own privacy policies, and we are not responsible for the
          practices or content of such websites.
        </p>
        <p>
          If you visit other websites, please read the privacy policies
          applicable to those websites.
        </p>
      </PolicySection>

      {/* Section 9 */}
      <PolicySection
        id="data-updates"
        number="9"
        title="How Do We Update Our Privacy Policy?"
      >
        <p>This Notice may be amended from time to time.</p>
        <p>
          If there are material changes, we will clearly describe them at the
          top of the page and provide a prominent display and/or link for a
          certain period following such changes.
        </p>
      </PolicySection>

      {/* Section 10 */}
      <PolicySection
        id="data-contact"
        number="10"
        title="How Do You Contact Us?"
      >
        <p>
          If you have any questions, comments, requests to exercise your rights
          as a data subject, or concerns about our privacy policy or data
          protection practices, please contact us at:
        </p>
        <ContactBlock />
      </PolicySection>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SHARED SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════════ */

function PolicySection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="privacy-section mb-14 last:mb-0 scroll-mt-32">
      {/* Section header */}
      <div className="flex items-start gap-3 mb-6">
        <span className="text-2xl md:text-3xl font-secondary font-light text-[#D4C5A0]/60 leading-none mt-[1px] select-none shrink-0 w-[44px] text-right">
          {number}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-primary font-bold text-[#0B1B3B] leading-snug tracking-tight">
            {title}
          </h3>
          <div className="mt-2 w-12 h-[2px] bg-[#D4C5A0]/40" />
        </div>
      </div>

      {/* Section body */}
      <div className="privacy-body pl-[56px]">{children}</div>
    </section>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 p-5 bg-[#0B1B3B]/[0.03] border-l-[3px] border-[#D4C5A0] relative">
      <div className="absolute top-4 right-4 text-[#D4C5A0]/30">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="text-[#0B1B3B] text-[13px] leading-relaxed font-medium">
        {children}
      </p>
    </div>
  );
}

function ContactBlock() {
  return (
    <div className="mt-6 p-6 bg-[#0B1B3B]/[0.02] border border-[#0B1B3B]/5">
      <div className="flex flex-col sm:flex-row sm:items-start gap-5">
        <div className="flex-1">
          <p className="text-[10px] font-bold text-[#D4C5A0] uppercase tracking-[0.15em] mb-2 font-primary">
            Email
          </p>
          <a
            href="mailto:info@iblmlaw.group"
            className="text-[#0B1B3B] text-sm font-medium hover:text-[#D4C5A0] transition-colors"
          >
            info@iblmlaw.group
          </a>
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-bold text-[#D4C5A0] uppercase tracking-[0.15em] mb-2 font-primary">
            Address
          </p>
          <p className="text-[#2E4472] text-sm font-light leading-relaxed">
            Prudential Centre, 7th Floor, Unit 7B
            <br />
            Jl. Raya Casablanca Kav. 88
            <br />
            DKI Jakarta, 12870
          </p>
        </div>
      </div>
    </div>
  );
}
