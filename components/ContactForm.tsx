"use client";

import { useState } from "react";
import Button from "./Button";
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
      // Prepare submission data
      // Combine organization and practice area into the message or subject if needed, 
      // or just send them as part of the message body since the database schema 
      // is fixed (name, email, phone, subject, message).
      // We'll construct a structured message.
      
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
      <div className="bg-white border-2 border-[#F5F5F7] p-8 md:p-12 shadow-2xl shadow-[#0B1B3B]/5 text-center py-20">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl text-[#0B1B3B] mb-2 font-serif">{t("successTitle")}</h3>
        <p className="text-gray-500 mb-8">
          {t("successMessage")}
        </p>
        <Button variant="gold" onClick={() => setSubmitStatus("idle")}>
          {t("sendAnother")}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-[#F5F5F7] p-8 md:p-12 shadow-2xl shadow-[#0B1B3B]/5 relative overflow-hidden">
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-[#F5F5F7] -rotate-45 translate-x-10 -translate-y-10"></div>

      <h2 className="text-3xl font-light text-[#0B1B3B] mb-2">
        {t("requestConsultation")}
      </h2>
      <p className="text-gray-500 mb-10 font-light">
        {t("requiredFields")}
      </p>

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded border border-red-100">
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
              placeholder="+1 (555) 000-0000"
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
            className="w-full border border-[#0B1B3B]/20 p-4 bg-transparent outline-none focus:border-[#D4C5A0] transition-colors text-[#2E4472]"
            placeholder="Briefly describe your legal needs..."
          ></textarea>
        </div>

        <div className="pt-4">
          <Button variant="gold" className="w-full md:w-auto" disabled={isSubmitting}>
            {isSubmitting ? t("submit.sending") : t("submit.send")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
