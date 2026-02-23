"use client";

import { useState } from "react";
import { Send, Shield } from "lucide-react";
import ContactForm from "./ContactForm";
import ConsultationForm from "./ConsultationForm";
import { useTranslations } from "@/hooks/useTranslations";

type FormType = "engage" | "consultation";

const ContactFormSelector = () => {
  const [activeForm, setActiveForm] = useState<FormType>("engage");
  const t = useTranslations("contactPage");

  return (
    <div className="space-y-8">
      {/* Form Selector Tabs */}
      <div className="flex gap-0">
        {/* Engage Tab */}
        <button
          onClick={() => setActiveForm("engage")}
          className={`group relative flex-1 flex items-center justify-center gap-3 py-5 px-6 transition-all duration-300 cursor-pointer border-b-2 ${
            activeForm === "engage"
              ? "border-[#0B1B3B] bg-white"
              : "border-transparent bg-[#F5F5F7] hover:bg-[#e8e8ea]"
          }`}
        >
          <Send
            className={`w-4 h-4 transition-colors ${
              activeForm === "engage" ? "text-[#0B1B3B]" : "text-gray-400"
            }`}
            strokeWidth={1.5}
          />
          <span
            className={`text-sm font-medium tracking-wider uppercase transition-colors ${
              activeForm === "engage" ? "text-[#0B1B3B]" : "text-gray-400"
            }`}
          >
            {t("tabEngage")}
          </span>
        </button>

        {/* Consultation Tab */}
        <button
          onClick={() => setActiveForm("consultation")}
          className={`group relative flex-1 flex items-center justify-center gap-3 py-5 px-6 transition-all duration-300 cursor-pointer border-b-2 ${
            activeForm === "consultation"
              ? "border-[#0B1B3B] bg-white"
              : "border-transparent bg-[#F5F5F7] hover:bg-white"
          }`}
        >
          <Shield
            className={`w-4 h-4 transition-colors ${
              activeForm === "consultation" ? "text-[#0B1B3B]" : "text-gray-400"
            }`}
            strokeWidth={1.5}
          />
          <span
            className={`text-sm font-medium tracking-wider uppercase transition-colors ${
              activeForm === "consultation" ? "text-[#0B1B3B]" : "text-gray-400"
            }`}
          >
            {t("tabConsultation")}
          </span>
          {/* Pulsing indicator dot — gold to stand out */}
          <span className="relative flex h-2 w-2 ml-1">
            <span
              className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                activeForm === "consultation" ? "bg-[#D4C5A0] animate-ping" : "bg-[#D4C5A0]/40"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                activeForm === "consultation" ? "bg-[#D4C5A0]" : "bg-[#D4C5A0]/40"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Recommendation banner for consultation */}
      {activeForm === "engage" && (
        <div className="flex items-center gap-4 p-4 bg-[#0B1B3B]/[0.03] border border-[#0B1B3B]/10">
          <Shield className="w-5 h-5 text-[#0B1B3B] shrink-0" strokeWidth={1.5} />
          <p className="text-xs text-[#2E4472] font-light leading-relaxed">
            {t("consultationBanner")}{" "}
            <button
              onClick={() => setActiveForm("consultation")}
              className="text-[#0B1B3B] font-semibold underline underline-offset-2 hover:text-[#D4C5A0] transition-colors cursor-pointer"
            >
              {t("consultationBannerLink")}
            </button>
          </p>
        </div>
      )}

      {/* Active Form */}
      <div className="transition-all duration-300">
        {activeForm === "engage" ? <ContactForm /> : <ConsultationForm />}
      </div>
    </div>
  );
};

export default ContactFormSelector;
