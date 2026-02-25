"use client";

import { useEffect, useCallback, useRef } from "react";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { Database } from "@/lib/types/database";

type PracticeArea = Database["public"]["Tables"]["practice_areas"]["Row"];

interface PracticeAreaDetailPopupProps {
  area: PracticeArea | null;
  locale: string;
  isOpen: boolean;
  onClose: () => void;
  groupName?: string;
}

const PracticeAreaDetailPopup = ({
  area,
  locale,
  isOpen,
  onClose,
  groupName,
}: PracticeAreaDetailPopupProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isEn = locale === "en";

  // Escape key handler
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose],
  );

  // Body scroll lock & keyboard listener
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, handleEscapeKey]);

  // Reset scroll position when area changes
  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [isOpen, area?.id]);

  if (!isOpen || !area) return null;

  const name = isEn ? area.name_en : area.name_id;
  const tagline = isEn ? area.tagline_en : area.tagline_id;
  const description = (isEn ? area.description_en : area.description_id) || "";
  const services = (isEn ? area.services_en : area.services_id) || [];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pa-popup-title"
    >
      {/* Backdrop — dark navy with blur */}
      <div
        className="absolute inset-0 bg-[#0B1B3B]/85 backdrop-blur-md pa-popup-backdrop"
        onClick={onClose}
      />

      {/* Modal Shell */}
      <div className="relative w-full max-w-4xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh] pa-popup-enter">
        {/* Gold accent line at top — the "legal brief" edge */}
        <div className="h-1 bg-gradient-to-r from-[#c0b181] via-[#D4C5A0] to-[#c0b181] shrink-0" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center bg-[#F5F5F7] hover:bg-[#0B1B3B] text-[#0B1B3B] hover:text-[#D4C5A0] transition-all duration-300 border border-[#0B1B3B]/5 group"
          aria-label="Close"
        >
          <X
            size={18}
            className="transition-transform duration-300 group-hover:rotate-90"
          />
        </button>

        {/* Scrollable Content */}
        <div ref={contentRef} className="overflow-y-auto overscroll-contain">
          {/* Header — Navy background section */}
          <div className="bg-[#0B1B3B] text-white px-8 sm:px-12 pt-10 pb-12 relative overflow-hidden">
            {/* Subtle texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
            {/* Gold glow accent */}
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#D4C5A0]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Group label */}
              {groupName && (
                <span className="inline-flex items-center gap-2 text-[#D4C5A0] font-bold tracking-[0.2em] text-[10px] uppercase mb-4">
                  <span className="w-6 h-px bg-[#D4C5A0]/60" />
                  {groupName}
                </span>
              )}

              {/* Area icon + name */}
              <div className="flex items-start gap-5">
                <div className="shrink-0 size-16 bg-[#1A2F5A] border border-[#D4C5A0]/20 flex items-center justify-center mt-1">
                  {area.icon_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={area.icon_url}
                      alt=""
                      className="size-8 object-contain invert"
                    />
                  ) : (
                    <ShieldCheck
                      className="w-7 h-7 text-[#D4C5A0]"
                      strokeWidth={1.5}
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <h2
                    id="pa-popup-title"
                    className="text-3xl sm:text-4xl font-light leading-tight tracking-tight"
                  >
                    {name}
                  </h2>
                  {tagline && (
                    <p className="text-[#D4C5A0]/80 text-xs mt-1 font-light uppercase tracking-wider">
                      {tagline}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="px-8 sm:px-12 py-10 space-y-10">
            {/* Full Description */}
            {description && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <Sparkles className="w-4 h-4 text-[#D4C5A0]" />
                  <h3 className="text-[#0B1B3B] text-xs font-bold uppercase tracking-[0.15em]">
                    {isEn ? "Overview" : "Ringkasan"}
                  </h3>
                  <div className="flex-1 h-px bg-[#0B1B3B]/8" />
                </div>
                <div
                  className="rich-content max-w-none !text-base !leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            )}

            {/* Services List */}
            {services.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="w-4 h-4 text-[#D4C5A0]" />
                  <h3 className="text-[#0B1B3B] text-xs font-bold uppercase tracking-[0.15em]">
                    {isEn ? "Services" : "Layanan"}
                  </h3>
                  <div className="flex-1 h-px bg-[#0B1B3B]/8" />
                  <span className="text-[10px] font-bold text-[#D4C5A0] tracking-wider uppercase">
                    {services.length}{" "}
                    {isEn
                      ? services.length === 1
                        ? "service"
                        : "services"
                      : "layanan"}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-0">
                  {services.map((service, idx) => (
                    <div
                      key={idx}
                      className="group/svc flex items-start gap-3 py-3 border-b border-[#0B1B3B]/5 last:border-0"
                    >
                      <span className="shrink-0 mt-1">
                        <CheckCircle2 className="w-4 h-4 text-[#D4C5A0]" />
                      </span>
                      <span className="text-[#2E4472] text-sm font-light leading-relaxed group-hover/svc:text-[#0B1B3B] transition-colors">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state — when no description and no services */}
            {!description && services.length === 0 && (
              <div className="text-center py-12">
                <ShieldCheck className="w-12 h-12 text-[#D4C5A0]/40 mx-auto mb-4" />
                <p className="text-[#2E4472]/60 text-sm italic">
                  {isEn
                    ? "Detailed information for this practice area will be available soon."
                    : "Informasi detail untuk area praktik ini akan segera tersedia."}
                </p>
              </div>
            )}
          </div>

          {/* Footer — Contact CTA strip */}
          <div className="px-8 sm:px-12 pb-8">
            <div className="bg-[#F5F5F7] border border-[#0B1B3B]/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-[#0B1B3B] font-medium text-sm">
                  {isEn
                    ? "Need legal assistance in this area?"
                    : "Butuh bantuan hukum di bidang ini?"}
                </p>
                <p className="text-[#2E4472] text-xs font-light mt-0.5">
                  {isEn
                    ? "Our specialists are ready to discuss your case."
                    : "Spesialis kami siap mendiskusikan kasus Anda."}
                </p>
              </div>
              <a
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 bg-[#0B1B3B] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#1A2F5A] transition-colors shrink-0 group/cta"
              >
                {isEn ? "Contact Us" : "Hubungi Kami"}
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeAreaDetailPopup;
