"use client";

import { useState } from "react";
import { Send, CheckCircle2, ArrowRight } from "lucide-react";
import { contactSubmissionsService } from "@/services/contact.service";
import { useTranslations } from "@/hooks/useTranslations";

const ContactForm = () => {
  const t = useTranslations("contactForm");
  
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
Organization: ${formData.organization}
Practice Area: ${formData.practice_area}

${formData.message}
      `.trim();

      const { error } = await contactSubmissionsService.submit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        subject: `Inquiry from ${formData.name} - ${formData.practice_area || 'General'}`,
        message: structuredMessage,
        referrer: typeof window !== 'undefined' ? window.location.href : undefined
      });

      if (error) {
        throw new Error(error);
      }

      // Fire-and-forget: forward to Google Sheets via API route
      fetch("/api/contact-sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).catch((err) => {
        console.error("[ContactForm] Google Sheets submission failed:", err);
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

  if (submitStatus === "success") {
    return (
      <div className="bg-white border border-[#e0e0e3] p-8 md:p-12 text-center py-16">
        <div className="w-16 h-16 border-2 border-green-200 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-600" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl text-[#0B1B3B] mb-2 font-serif">{t("successTitle")}</h3>
        <p className="text-gray-500 mb-8 font-light">
          {t("successMessage")}
        </p>
        <button
          onClick={() => setSubmitStatus("idle")}
          className="inline-flex items-center gap-3 px-10 py-4 border-2 border-[#0B1B3B] text-[#0B1B3B] hover:bg-[#0B1B3B] hover:text-white transition-all duration-300 tracking-wider uppercase text-sm font-medium cursor-pointer"
        >
          <span>{t("sendAnother")}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#e0e0e3] p-8 md:p-12 relative overflow-hidden">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0B1B3B]/20 to-transparent" />

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Send className="w-5 h-5 text-[#2E4472]" strokeWidth={1.5} />
          <span className="text-xs font-bold text-[#2E4472] uppercase tracking-[0.2em]">
            {t("engageLabel")}
          </span>
        </div>
        <h2 className="text-3xl font-light text-[#0B1B3B] mb-2">
          {t("engageTitle")}
        </h2>
        <p className="text-gray-500 font-light text-sm">
          {t("requiredFields")}
        </p>
      </div>

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm border border-red-100">
          {t("transmissionFailed")}: {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0B1B3B] uppercase tracking-widest">
              {t("labels.fullName")} *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border-b border-[#0B1B3B]/20 py-3 bg-transparent outline-none focus:border-[#D4C5A0] transition-colors text-[#2E4472]"
              placeholder="e.g. Alex Mercer"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0B1B3B] uppercase tracking-widest">
              {t("labels.organization")}
            </label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="w-full border-b border-[#0B1B3B]/20 py-3 bg-transparent outline-none focus:border-[#D4C5A0] transition-colors text-[#2E4472]"
              placeholder="e.g. Vertex Studios"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0B1B3B] uppercase tracking-widest">
              {t("labels.emailAddress")} *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b border-[#0B1B3B]/20 py-3 bg-transparent outline-none focus:border-[#D4C5A0] transition-colors text-[#2E4472]"
              placeholder="name@company.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0B1B3B] uppercase tracking-widest">
              {t("labels.phone")}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-b border-[#0B1B3B]/20 py-3 bg-transparent outline-none focus:border-[#D4C5A0] transition-colors text-[#2E4472]"
              placeholder="+62 812 3456 7890"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0B1B3B] uppercase tracking-widest">
            {t("labels.practiceArea")}
          </label>
          <select 
            name="practice_area"
            value={formData.practice_area}
            onChange={handleChange}
            className="w-full border-b border-[#0B1B3B]/20 py-3 bg-transparent outline-none focus:border-[#D4C5A0] transition-colors text-[#2E4472]"
          >
            <option value="">{t("options.selectPracticeArea")}</option>
            <option value="Entertainment Law">{t("options.entertainment")}</option>
            <option value="Technology Law">{t("options.technology")}</option>
            <option value="Labor & Employment">{t("options.labor")}</option>
            <option value="Health & Education">{t("options.health")}</option>
            <option value="Intellectual Property">{t("options.ip")}</option>
            <option value="Corporate Structuring">{t("options.corporate")}</option>
            <option value="Dispute Resolution">{t("options.dispute")}</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0B1B3B] uppercase tracking-widest">
            {t("labels.caseBriefing")} *
          </label>
          <textarea
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-[#0B1B3B]/15 p-4 bg-[#F5F5F7]/50 outline-none focus:border-[#D4C5A0] focus:bg-white transition-all text-[#2E4472]"
            placeholder="Briefly describe your inquiry..."
          ></textarea>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex items-center gap-3 px-10 py-4 border-2 border-[#0B1B3B] text-[#0B1B3B] hover:bg-[#0B1B3B] hover:text-white transition-all duration-300 tracking-wider uppercase text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>{isSubmitting ? t("submit.sending") : t("submit.send")}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
