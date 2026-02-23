"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Shield, CheckCircle2, Video, Building2, ArrowRight, Scale, ChevronDown } from "lucide-react";
import { contactSubmissionsService } from "@/services/contact.service";
import { useTranslations } from "@/hooks/useTranslations";

const ConsultationForm = () => {
  const t = useTranslations("consultationForm");
  const tContact = useTranslations("contactForm");

  const [hasAgreed, setHasAgreed] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [consultationChannel, setConsultationChannel] = useState<"online" | "offline">("online");
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    practice_area: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // ─── Scroll tracking for TnC ──────────────────────────────────────────
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
    setTimeout(() => {
      setHasAgreed(true);
    }, 600);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        referrer: typeof window !== "undefined" ? window.location.href : undefined,
      });

      if (error) throw new Error(error);

      fetch("/api/contact-sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, consultation_channel: consultationChannel, type: "consultation" }),
      }).catch((err) => {
        console.error("[ConsultationForm] Google Sheets submission failed:", err);
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
      setErrorMessage(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Shared decorative: gold corner brackets ──────────────────────────
  const goldCorners = (
    <>
      <div className="absolute top-0 left-0 w-20 h-[2px] bg-[#D4C5A0]" />
      <div className="absolute top-0 left-0 h-20 w-[2px] bg-[#D4C5A0]" />
      <div className="absolute bottom-0 right-0 w-20 h-[2px] bg-[#D4C5A0]" />
      <div className="absolute bottom-0 right-0 h-20 w-[2px] bg-[#D4C5A0]" />
    </>
  );

  // ─── Success State ─────────────────────────────────────────────────────
  if (submitStatus === "success") {
    return (
      <div className="relative bg-white border-2 border-[#0B1B3B] p-10 md:p-16 overflow-hidden">
        {goldCorners}

        <div className="relative z-10 text-center py-12">
          <div className="w-20 h-20 bg-[#0B1B3B] flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-[#D4C5A0]" strokeWidth={1.5} />
          </div>
          <h3 className="text-3xl text-[#0B1B3B] mb-3 font-serif">{t("successTitle")}</h3>
          <p className="text-[#2E4472]/60 mb-10 max-w-md mx-auto leading-relaxed font-light">
            {t("successMessage")}
          </p>
          <button
            onClick={() => {
              setSubmitStatus("idle");
              setHasAgreed(false);
              setIsRevealing(false);
              setHasScrolledToBottom(false);
            }}
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#0B1B3B] text-white hover:bg-[#D4C5A0] hover:text-[#0B1B3B] transition-all duration-300 tracking-wider uppercase text-sm font-medium cursor-pointer"
          >
            <span>{t("sendAnother")}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // ─── Agreement Gate ────────────────────────────────────────────────────
  if (!hasAgreed) {
    return (
      <div className={`relative bg-white border-2 border-[#0B1B3B] overflow-hidden transition-all duration-600 ${isRevealing ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
        {goldCorners}

        <div className="relative z-10 p-8 md:p-12">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            {/* Navy shield icon box */}
            <div className="w-16 h-16 bg-[#0B1B3B] flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-[#D4C5A0]" strokeWidth={1} />
            </div>

            <span className="inline-block bg-[#0B1B3B] text-[#D4C5A0] font-bold tracking-[0.3em] text-[10px] uppercase px-4 py-1.5 mb-5">
              {t("gateLabel")}
            </span>
            <h2 className="text-3xl md:text-4xl text-[#0B1B3B] mb-3 font-light leading-tight">
              {t("gateTitle")}{" "}
              <span className="font-serif italic text-[#D4C5A0]">{t("gateTitleHighlight")}</span>
            </h2>

            <div className="w-16 h-[2px] bg-[#0B1B3B] my-4" />

            <p className="text-[#2E4472]/70 leading-relaxed max-w-lg font-light text-sm">
              {t("agreementText")}
            </p>
          </div>

          {/* Scrollable TnC */}
          <div className="relative mb-6">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="max-h-64 overflow-y-auto border border-[#0B1B3B]/15 bg-[#F5F5F7]/50 p-6 scroll-smooth"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#0B1B3B #e0e0e3",
              }}
            >
              {/* Section 1 */}
              <div className="mb-6">
                <h4 className="inline-block bg-[#0B1B3B] text-white text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 mb-3">
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
              <div className="mb-6">
                <h4 className="inline-block bg-[#0B1B3B] text-white text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 mb-3">
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
              <div className="mb-6">
                <h4 className="inline-block bg-[#0B1B3B] text-white text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 mb-3">
                  {t("tncSection3Title")}
                </h4>
                <p className="text-[#2E4472] text-sm font-light leading-relaxed mb-2">
                  {t("tncSection3P1")}
                </p>
                <div className="space-y-2 mt-3">
                  {["tncSection3Item1", "tncSection3Item2", "tncSection3Item3"].map((key) => (
                    <div key={key} className="flex items-start gap-3 text-[#2E4472] text-sm">
                      <Scale className="w-3.5 h-3.5 text-[#0B1B3B] shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span className="font-light">{t(key)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-6">
                <h4 className="inline-block bg-[#0B1B3B] text-white text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 mb-3">
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
                <h4 className="inline-block bg-[#0B1B3B] text-white text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 mb-3">
                  {t("tncSection5Title")}
                </h4>
                <p className="text-[#2E4472] text-sm font-light leading-relaxed">
                  {t("tncSection5P1")}
                </p>
              </div>
            </div>

            {/* Scroll indicator */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F5F5F7] to-transparent pointer-events-none flex items-end justify-center pb-2 transition-opacity duration-500 ${
                hasScrolledToBottom ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="flex items-center gap-2 text-[#0B1B3B] text-xs font-medium tracking-wider uppercase animate-bounce">
                <ChevronDown className="w-3.5 h-3.5" strokeWidth={2} />
                <span>{t("scrollToRead")}</span>
                <ChevronDown className="w-3.5 h-3.5" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Agree button */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleAgree}
              disabled={!hasScrolledToBottom}
              className={`group relative inline-flex items-center gap-3 px-12 py-5 transition-all duration-300 tracking-wider uppercase text-sm font-bold cursor-pointer ${
                hasScrolledToBottom
                  ? "bg-[#0B1B3B] text-white hover:bg-[#D4C5A0] hover:text-[#0B1B3B]"
                  : "bg-[#e0e0e3] text-[#999] cursor-not-allowed"
              }`}
            >
              <span>{t("agreeButton")}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <p className="text-[#2E4472]/40 text-xs mt-4 font-light text-center">
              {hasScrolledToBottom ? t("agreeFootnote") : t("scrollReminder")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─── Main Consultation Form ────────────────────────────────────────────
  return (
    <div className="relative bg-white border-2 border-[#0B1B3B] overflow-hidden animate-in fade-in duration-700">
      {goldCorners}

      <div className="relative z-10 p-8 md:p-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[#0B1B3B] flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#D4C5A0]" strokeWidth={1.5} />
            </div>
            <span className="bg-[#0B1B3B] text-[#D4C5A0] font-bold tracking-[0.3em] text-[10px] uppercase px-3 py-1">
              {t("formLabel")}
            </span>
          </div>
          <h2 className="text-3xl font-light text-[#0B1B3B] mb-2">
            {t("formTitle")}{" "}
            <span className="font-serif italic text-[#D4C5A0]">{t("formTitleHighlight")}</span>
          </h2>
          <p className="text-[#2E4472]/50 font-light text-sm">
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
          {/* Consultation Channel Toggle */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-[#0B1B3B] uppercase tracking-[0.3em]">
              {t("channelLabel")} *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setConsultationChannel("online")}
                className={`relative group flex items-center gap-4 p-5 border-2 transition-all duration-300 cursor-pointer ${
                  consultationChannel === "online"
                    ? "border-[#0B1B3B] bg-[#0B1B3B]/[0.03]"
                    : "border-[#0B1B3B]/10 hover:border-[#0B1B3B]/30 bg-white"
                }`}
              >
                <div className={`w-10 h-10 flex items-center justify-center transition-colors ${
                  consultationChannel === "online" ? "bg-[#0B1B3B]" : "bg-[#F5F5F7]"
                }`}>
                  <Video
                    className={`w-5 h-5 transition-colors ${
                      consultationChannel === "online" ? "text-[#D4C5A0]" : "text-[#2E4472]/40"
                    }`}
                    strokeWidth={1.5}
                  />
                </div>
                <div className="text-left">
                  <p className={`text-sm font-medium transition-colors ${
                    consultationChannel === "online" ? "text-[#0B1B3B]" : "text-[#2E4472]/60"
                  }`}>
                    {t("channelOnline")}
                  </p>
                  <p className="text-[10px] text-[#2E4472]/40 mt-0.5">{t("channelOnlineDesc")}</p>
                </div>
                {consultationChannel === "online" && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-[#0B1B3B] rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setConsultationChannel("offline")}
                className={`relative group flex items-center gap-4 p-5 border-2 transition-all duration-300 cursor-pointer ${
                  consultationChannel === "offline"
                    ? "border-[#0B1B3B] bg-[#0B1B3B]/[0.03]"
                    : "border-[#0B1B3B]/10 hover:border-[#0B1B3B]/30 bg-white"
                }`}
              >
                <div className={`w-10 h-10 flex items-center justify-center transition-colors ${
                  consultationChannel === "offline" ? "bg-[#0B1B3B]" : "bg-[#F5F5F7]"
                }`}>
                  <Building2
                    className={`w-5 h-5 transition-colors ${
                      consultationChannel === "offline" ? "text-[#D4C5A0]" : "text-[#2E4472]/40"
                    }`}
                    strokeWidth={1.5}
                  />
                </div>
                <div className="text-left">
                  <p className={`text-sm font-medium transition-colors ${
                    consultationChannel === "offline" ? "text-[#0B1B3B]" : "text-[#2E4472]/60"
                  }`}>
                    {t("channelOffline")}
                  </p>
                  <p className="text-[10px] text-[#2E4472]/40 mt-0.5">{t("channelOfflineDesc")}</p>
                </div>
                {consultationChannel === "offline" && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-[#0B1B3B] rounded-full" />
                )}
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-[2px] bg-[#0B1B3B]/10" />

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
                className="w-full border-b-2 border-[#0B1B3B]/15 py-3 bg-transparent outline-none focus:border-[#0B1B3B] transition-colors text-[#0B1B3B] placeholder:text-[#2E4472]/30"
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
                className="w-full border-b-2 border-[#0B1B3B]/15 py-3 bg-transparent outline-none focus:border-[#0B1B3B] transition-colors text-[#0B1B3B] placeholder:text-[#2E4472]/30"
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
                className="w-full border-b-2 border-[#0B1B3B]/15 py-3 bg-transparent outline-none focus:border-[#0B1B3B] transition-colors text-[#0B1B3B] placeholder:text-[#2E4472]/30"
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
                className="w-full border-b-2 border-[#0B1B3B]/15 py-3 bg-transparent outline-none focus:border-[#0B1B3B] transition-colors text-[#0B1B3B] placeholder:text-[#2E4472]/30"
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
              className="w-full border-b-2 border-[#0B1B3B]/15 py-3 bg-transparent outline-none focus:border-[#0B1B3B] transition-colors text-[#0B1B3B]"
            >
              <option value="">{tContact("options.selectPracticeArea")}</option>
              <option value="Entertainment Law">{tContact("options.entertainment")}</option>
              <option value="Technology Law">{tContact("options.technology")}</option>
              <option value="Labor & Employment">{tContact("options.labor")}</option>
              <option value="Health & Education">{tContact("options.health")}</option>
              <option value="Intellectual Property">{tContact("options.ip")}</option>
              <option value="Corporate Structuring">{tContact("options.corporate")}</option>
              <option value="Dispute Resolution">{tContact("options.dispute")}</option>
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
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full border-2 border-[#0B1B3B]/10 p-4 bg-[#F5F5F7]/30 outline-none focus:border-[#0B1B3B] focus:bg-white transition-all text-[#0B1B3B] placeholder:text-[#2E4472]/30 resize-none"
              placeholder="Describe your legal needs in detail..."
            />
          </div>

          {/* Submit */}
          <div className="pt-4 flex items-center justify-between gap-6 flex-wrap">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative inline-flex items-center gap-3 px-12 py-5 bg-[#0B1B3B] text-white hover:bg-[#D4C5A0] hover:text-[#0B1B3B] transition-all duration-300 tracking-wider uppercase text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>{isSubmitting ? tContact("submit.sending") : t("submitButton")}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <div className="flex items-center gap-2 text-[#2E4472]/40 text-xs">
              <Shield className="w-3.5 h-3.5 text-[#0B1B3B]/40" strokeWidth={1.5} />
              <span className="font-light">{t("encrypted")}</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsultationForm;
