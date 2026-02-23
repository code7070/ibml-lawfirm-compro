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
      <div className="flex gap-0 border-b-2 border-[#0B1B3B]/10">
        {/* Engage Tab — light, understated */}
        <button
          onClick={() => setActiveForm("engage")}
          className={`group relative flex-1 flex items-center justify-center gap-3 py-5 px-6 transition-all duration-300 cursor-pointer -mb-[2px] border-b-[3px] ${
            activeForm === "engage"
              ? "border-[#0B1B3B] bg-white"
              : "border-transparent bg-[#F5F5F7] hover:bg-[#eaeaec]"
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

        {/* Consultation Tab — bold, always branded */}
        <button
          onClick={() => setActiveForm("consultation")}
          className={`group relative flex-1 flex items-center justify-center gap-3 py-5 px-6 transition-all duration-300 cursor-pointer -mb-[2px] border-b-[3px] ${
            activeForm === "consultation"
              ? "border-[#0B1B3B] bg-[#0B1B3B]"
              : "border-transparent bg-[#0B1B3B]/90 hover:bg-[#0B1B3B]"
          }`}
        >
          <Shield
            className="w-4 h-4 text-[#D4C5A0] transition-colors"
            strokeWidth={1.5}
          />
          <span className="text-sm font-bold tracking-wider uppercase text-[#D4C5A0]">
            {t("tabConsultation")}
          </span>
          {/* Pulsing indicator dot */}
          <span className="relative flex h-2 w-2 ml-1">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#D4C5A0] opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4C5A0]" />
          </span>
        </button>
      </div>

      {/* Recommendation banner for consultation */}
      {activeForm === "engage" && (
        <div className="flex items-center gap-4 p-5 bg-[#0B1B3B] border-l-4 border-[#D4C5A0]">
          <Shield className="w-5 h-5 text-[#D4C5A0] shrink-0" strokeWidth={1.5} />
          <p className="text-sm text-white/70 font-light leading-relaxed">
            {t("consultationBanner")}{" "}
            <button
              onClick={() => setActiveForm("consultation")}
              className="text-[#D4C5A0] font-bold underline underline-offset-2 hover:text-white transition-colors cursor-pointer"
            >
              {t("consultationBannerLink")}
            </button>
          </p>
        </div>
      )}

      {/* Active Form */}
      <div>
        {activeForm === "engage" ? <ContactForm /> : <ConsultationForm />}
      </div>
    </div>
  );
};

export default ContactFormSelector;
