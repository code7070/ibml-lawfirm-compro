"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Shield,
  CheckCircle2,
  Video,
  Building2,
  ArrowRight,
  Scale,
  ChevronDown,
  Lock,
} from "lucide-react";
import { contactSubmissionsService } from "@/services/contact.service";
import { useTranslations } from "@/hooks/useTranslations";

const ConsultationForm = () => {
  const t = useTranslations("consultationForm");
  const tContact = useTranslations("contactForm");

  const [hasAgreed, setHasAgreed] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [consultationChannel, setConsultationChannel] = useState<
    "online" | "offline"
  >("online");
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    practice_area: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 20;
    if (isAtBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true);
    }
  }, [hasScrolledToBottom]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    if (el.scrollHeight <= el.clientHeight + 20) {
      setHasScrolledToBottom(true);
    }
  }, []);

  const handleAgree = () => {
    if (!hasScrolledToBottom) return;
    setIsRevealing(true);
    setTimeout(() => setHasAgreed(true), 600);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const structuredMessage = `
[PROFESSIONAL CONSULTATION REQUEST]
Organization: ${formData.organization}
Practice Area: ${formData.practice_area}
Consultation Channel: ${consultationChannel === "online" ? "Online (Virtual)" : "Offline (In-Person)"}

${formData.message}
      `.trim();

      const { error } = await contactSubmissionsService.submit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        subject: `Professional Consultation - ${formData.name} - ${formData.practice_area || "General"} [${consultationChannel.toUpperCase()}]`,
        message: structuredMessage,
        referrer:
          typeof window !== "undefined" ? window.location.href : undefined,
      });

      if (error) throw new Error(error);

      fetch("/api/contact-sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          consultation_channel: consultationChannel,
          type: "consultation",
        }),
      }).catch((err) => {
        console.error(
          "[ConsultationForm] Google Sheets submission failed:",
          err,
        );
      });

      setSubmitStatus("success");
      setFormData({
        name: "",
        organization: "",
        email: "",
        phone: "",
        practice_area: "",
        message: "",
      });
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to send message",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Navy top ribbon (shared across all states) ────────────────────────
  const navyRibbon = (
    <div className="bg-[#0B1B3B] px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Shield className="w-5 h-5 text-[#D4C5A0]" strokeWidth={1.5} />
        <span className="text-[#D4C5A0] font-bold tracking-[0.25em] text-[11px] uppercase">
          {t("formLabel")}
        </span>
      </div>
      <div className="flex items-center gap-2 text-[#D4C5A0]/50 text-[10px] tracking-wider uppercase">
        <Lock className="w-3 h-3" strokeWidth={2} />
        <span>{t("encrypted")}</span>
      </div>
    </div>
  );

  // ─── Success State ─────────────────────────────────────────────────────
  if (submitStatus === "success") {
    return (
      <div className="relative border-[3px] border-[#0B1B3B] overflow-hidden shadow-[8px_8px_0px_0px_#0B1B3B]">
        {navyRibbon}

        <div className="bg-white p-10 md:p-16">
          <div className="text-center py-8">
            <div className="w-24 h-24 bg-[#0B1B3B] flex items-center justify-center mx-auto mb-8">
              <CheckCircle2
                className="w-12 h-12 text-[#D4C5A0]"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="text-4xl text-[#0B1B3B] mb-4 font-serif">
              {t("successTitle")}
            </h3>
            <p className="text-[#2E4472]/60 mb-12 max-w-md mx-auto leading-relaxed font-light text-lg">
              {t("successMessage")}
            </p>
            <button
              onClick={() => {
                setSubmitStatus("idle");
                setHasAgreed(false);
                setIsRevealing(false);
                setHasScrolledToBottom(false);
              }}
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#0B1B3B] text-white hover:bg-[#D4C5A0] hover:text-[#0B1B3B] transition-all duration-300 tracking-wider uppercase text-sm font-bold cursor-pointer"
            >
              <span>{t("sendAnother")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Agreement Gate ────────────────────────────────────────────────────
  if (!hasAgreed) {
    return (
      <div
        className={`relative border-[3px] border-[#0B1B3B] overflow-hidden shadow-[8px_8px_0px_0px_#0B1B3B] transition-all duration-600 ${isRevealing ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
      >
        {navyRibbon}

        <div className="bg-white p-8 md:p-12">
          {/* Hero header */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-24 h-24 bg-[#0B1B3B] flex items-center justify-center mb-8">
              <Shield className="w-12 h-12 text-[#D4C5A0]" strokeWidth={1} />
            </div>

            <h2 className="text-4xl md:text-5xl text-[#0B1B3B] mb-4 font-light leading-tight tracking-tight">
              {t("gateTitle")}{" "}
              <span className="font-serif italic text-[#D4C5A0]">
                {t("gateTitleHighlight")}
              </span>
            </h2>

            <div className="flex items-center gap-4 my-5">
              <div className="h-[2px] w-12 bg-[#D4C5A0]" />
              <div className="w-2 h-2 bg-[#0B1B3B] rotate-45" />
              <div className="h-[2px] w-12 bg-[#D4C5A0]" />
            </div>

            <p className="text-[#2E4472] leading-relaxed max-w-lg font-light">
              {t("agreementText")}
            </p>
          </div>

          {/* Scrollable TnC with left gold accent bar */}
          <div className="relative mb-8">
            <div className="flex">
              {/* Gold accent bar */}
              <div className="w-1.5 bg-[#D4C5A0] shrink-0" />

              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 max-h-72 overflow-y-auto border border-l-0 border-[#0B1B3B]/15 bg-[#F5F5F7]/40 p-6 md:p-8 scroll-smooth"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#0B1B3B #e0e0e3",
                }}
              >
                {/* Section 1 */}
                <div className="mb-7">
                  <h4 className="inline-block bg-[#0B1B3B] text-white text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 mb-3">
                    {t("tncSection1Title")}
                  </h4>
                  <p className="text-[#2E4472] text-sm font-light leading-relaxed mb-2">
                    {t("tncSection1P1")}
                  </p>
                  <p className="text-[#2E4472] text-sm font-light leading-relaxed">
                    {t("tncSection1P2")}
                  </p>
                </div>

                {/* Section 2 */}
                <div className="mb-7">
                  <h4 className="inline-block bg-[#0B1B3B] text-white text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 mb-3">
                    {t("tncSection2Title")}
                  </h4>
                  <p className="text-[#2E4472] text-sm font-light leading-relaxed mb-2">
                    {t("tncSection2P1")}
                  </p>
                  <p className="text-[#2E4472] text-sm font-light leading-relaxed">
                    {t("tncSection2P2")}
                  </p>
                </div>

                {/* Section 3 */}
                <div className="mb-7">
                  <h4 className="inline-block bg-[#0B1B3B] text-white text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 mb-3">
                    {t("tncSection3Title")}
                  </h4>
                  <p className="text-[#2E4472] text-sm font-light leading-relaxed mb-2">
                    {t("tncSection3P1")}
                  </p>
                  <div className="space-y-2 mt-3">
                    {[
                      "tncSection3Item1",
                      "tncSection3Item2",
                      "tncSection3Item3",
                    ].map((key) => (
                      <div
                        key={key}
                        className="flex items-start gap-3 text-[#2E4472] text-sm"
                      >
                        <Scale
                          className="w-3.5 h-3.5 text-[#0B1B3B] shrink-0 mt-0.5"
                          strokeWidth={2}
                        />
                        <span className="font-light">{t(key)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4 */}
                <div className="mb-7">
                  <h4 className="inline-block bg-[#0B1B3B] text-white text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 mb-3">
                    {t("tncSection4Title")}
                  </h4>
                  <p className="text-[#2E4472] text-sm font-light leading-relaxed mb-2">
                    {t("tncSection4P1")}
                  </p>
                  <p className="text-[#2E4472] text-sm font-light leading-relaxed">
                    {t("tncSection4P2")}
                  </p>
                </div>

                {/* Section 5 */}
                <div>
                  <h4 className="inline-block bg-[#0B1B3B] text-white text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 mb-3">
                    {t("tncSection5Title")}
                  </h4>
                  <p className="text-[#2E4472] text-sm font-light leading-relaxed">
                    {t("tncSection5P1")}
                  </p>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div
              className={`absolute bottom-0 left-1.5 right-0 h-16 bg-gradient-to-t from-[#eee] to-transparent pointer-events-none flex items-end justify-center pb-2 transition-opacity duration-500 ${
                hasScrolledToBottom ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="flex items-center gap-2 bg-[#0B1B3B] text-white text-[10px] font-bold tracking-wider uppercase px-4 py-2 animate-bounce">
                <ChevronDown className="w-3.5 h-3.5" strokeWidth={2.5} />
                <span>{t("scrollToRead")}</span>
                <ChevronDown className="w-3.5 h-3.5" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* Agree button — full width, commanding */}
          <button
            onClick={handleAgree}
            disabled={!hasScrolledToBottom}
            className={`group w-full flex items-center justify-center gap-3 py-6 transition-all duration-300 tracking-wider uppercase text-sm font-bold cursor-pointer ${
              hasScrolledToBottom
                ? "bg-[#0B1B3B] text-white hover:bg-[#1a2f5a]"
                : "bg-[#e0e0e3] text-[#999] cursor-not-allowed"
            }`}
          >
            <Shield className="w-4 h-4" strokeWidth={2} />
            <span>{t("agreeButton")}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <p className="text-[#2E4472]/40 text-xs mt-4 font-light text-center">
            {hasScrolledToBottom ? t("agreeFootnote") : t("scrollReminder")}
          </p>
        </div>
      </div>
    );
  }

  // ─── Main Consultation Form ────────────────────────────────────────────
  return (
    <div className="relative border-[3px] border-[#0B1B3B] overflow-hidden shadow-[8px_8px_0px_0px_#0B1B3B] animate-in fade-in duration-700">
      {navyRibbon}

      <div className="bg-white p-8 md:p-12">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl font-light text-[#0B1B3B] mb-2 tracking-tight">
            {t("formTitle")}{" "}
            <span className="font-serif italic text-[#D4C5A0]">
              {t("formTitleHighlight")}
            </span>
          </h2>
          <p className="text-[#2E4472]/50 font-light">
            {tContact("requiredFields")}
          </p>
        </div>

        {/* Error */}
        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm border border-red-200">
            {tContact("transmissionFailed")}: {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Consultation Channel Toggle — bold card design */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-[#0B1B3B] uppercase tracking-[0.3em]">
              {t("channelLabel")} *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setConsultationChannel("online")}
                className={`relative group flex flex-col items-center gap-3 p-6 border-[3px] transition-all duration-300 cursor-pointer text-center ${
                  consultationChannel === "online"
                    ? "border-[#0B1B3B] bg-[#0B1B3B]"
                    : "border-[#0B1B3B]/10 hover:border-[#0B1B3B]/30 bg-white"
                }`}
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center transition-colors ${
                    consultationChannel === "online"
                      ? "bg-[#D4C5A0]"
                      : "bg-[#F5F5F7]"
                  }`}
                >
                  <Video
                    className={`w-6 h-6 transition-colors ${
                      consultationChannel === "online"
                        ? "text-[#0B1B3B]"
                        : "text-[#2E4472]/40"
                    }`}
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <p
                    className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                      consultationChannel === "online"
                        ? "text-white"
                        : "text-[#0B1B3B]"
                    }`}
                  >
                    {t("channelOnline")}
                  </p>
                  <p
                    className={`text-xs mt-1 transition-colors ${
                      consultationChannel === "online"
                        ? "text-[#D4C5A0]/70"
                        : "text-[#2E4472]/40"
                    }`}
                  >
                    {t("channelOnlineDesc")}
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setConsultationChannel("offline")}
                className={`relative group flex flex-col items-center gap-3 p-6 border-[3px] transition-all duration-300 cursor-pointer text-center ${
                  consultationChannel === "offline"
                    ? "border-[#0B1B3B] bg-[#0B1B3B]"
                    : "border-[#0B1B3B]/10 hover:border-[#0B1B3B]/30 bg-white"
                }`}
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center transition-colors ${
                    consultationChannel === "offline"
                      ? "bg-[#D4C5A0]"
                      : "bg-[#F5F5F7]"
                  }`}
                >
                  <Building2
                    className={`w-6 h-6 transition-colors ${
                      consultationChannel === "offline"
                        ? "text-[#0B1B3B]"
                        : "text-[#2E4472]/40"
                    }`}
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <p
                    className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                      consultationChannel === "offline"
                        ? "text-white"
                        : "text-[#0B1B3B]"
                    }`}
                  >
                    {t("channelOffline")}
                  </p>
                  <p
                    className={`text-xs mt-1 transition-colors ${
                      consultationChannel === "offline"
                        ? "text-[#D4C5A0]/70"
                        : "text-[#2E4472]/40"
                    }`}
                  >
                    {t("channelOfflineDesc")}
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Bold divider with diamond */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-[2px] bg-[#0B1B3B]/10" />
            <div className="w-2 h-2 bg-[#D4C5A0] rotate-45" />
            <div className="flex-1 h-[2px] bg-[#0B1B3B]/10" />
          </div>

          {/* Name + Organization */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#0B1B3B] uppercase tracking-[0.3em]">
                {tContact("labels.fullName")} *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border-b-2 border-[#0B1B3B]/15 py-3 bg-transparent outline-none focus:border-[#0B1B3B] transition-colors text-[#0B1B3B] placeholder:text-[#2E4472]/25 text-lg"
                placeholder="e.g. Alex Mercer"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#0B1B3B] uppercase tracking-[0.3em]">
                {tContact("labels.organization")}
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="w-full border-b-2 border-[#0B1B3B]/15 py-3 bg-transparent outline-none focus:border-[#0B1B3B] transition-colors text-[#0B1B3B] placeholder:text-[#2E4472]/25 text-lg"
                placeholder="e.g. Vertex Studios"
              />
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#0B1B3B] uppercase tracking-[0.3em]">
                {tContact("labels.emailAddress")} *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b-2 border-[#0B1B3B]/15 py-3 bg-transparent outline-none focus:border-[#0B1B3B] transition-colors text-[#0B1B3B] placeholder:text-[#2E4472]/25 text-lg"
                placeholder="name@company.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#0B1B3B] uppercase tracking-[0.3em]">
                {tContact("labels.phone")}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border-b-2 border-[#0B1B3B]/15 py-3 bg-transparent outline-none focus:border-[#0B1B3B] transition-colors text-[#0B1B3B] placeholder:text-[#2E4472]/25 text-lg"
                placeholder="+62 812 3456 7890"
              />
            </div>
          </div>

          {/* Practice Area */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#0B1B3B] uppercase tracking-[0.3em]">
              {tContact("labels.practiceArea")}
            </label>
            <select
              name="practice_area"
              value={formData.practice_area}
              onChange={handleChange}
              className="w-full border-b-2 border-[#0B1B3B]/15 py-3 bg-transparent outline-none focus:border-[#0B1B3B] transition-colors text-[#0B1B3B] text-lg"
            >
              <option value="">{tContact("options.selectPracticeArea")}</option>
              <option value="Entertainment Law">
                {tContact("options.entertainment")}
              </option>
              <option value="Technology Law">
                {tContact("options.technology")}
              </option>
              <option value="Labor & Employment">
                {tContact("options.labor")}
              </option>
              <option value="Health & Education">
                {tContact("options.health")}
              </option>
              <option value="Intellectual Property">
                {tContact("options.ip")}
              </option>
              <option value="Corporate Structuring">
                {tContact("options.corporate")}
              </option>
              <option value="Dispute Resolution">
                {tContact("options.dispute")}
              </option>
            </select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#0B1B3B] uppercase tracking-[0.3em]">
              {tContact("labels.caseBriefing")} *
            </label>
            <textarea
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full border-2 border-[#0B1B3B]/10 p-5 bg-[#F5F5F7]/30 outline-none focus:border-[#0B1B3B] focus:bg-white transition-all text-[#0B1B3B] placeholder:text-[#2E4472]/25 resize-none text-lg"
              placeholder="Describe your legal needs in detail..."
            />
          </div>

          {/* Full-width submit button — commanding presence */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group w-full flex items-center justify-center gap-3 py-6 bg-[#0B1B3B] text-white hover:bg-[#1a2f5a] transition-all duration-300 tracking-wider uppercase text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>
              {isSubmitting ? tContact("submit.sending") : t("submitButton")}
            </span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConsultationForm;
