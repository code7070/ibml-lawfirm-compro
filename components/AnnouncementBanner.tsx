"use client";

import { useState, useEffect, useCallback } from "react";
import { X, CalendarDays, Construction, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { LangLink } from "./LangLink";
import { useTranslations } from "@/hooks/useTranslations";

interface AnnouncementBannerProps {
  eventCount?: number;
}

type SlideDirection = "left" | "right" | null;

export default function AnnouncementBanner({
  eventCount = 0,
}: AnnouncementBannerProps) {
  const t = useTranslations("banner");

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDir, setSlideDir] = useState<SlideDirection>(null);
  const [isSliding, setIsSliding] = useState(false);

  // Delay open so page content renders first
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // Build slides dynamically
  const slides = [
    ...(eventCount > 0
      ? [
          {
            id: "event",
            type: "event" as const,
            icon: <CalendarDays className="w-5 h-5" strokeWidth={1.5} />,
            label: t("event_label"),
            title: t("event_title"),
            body: t("event_body").replace("{count}", String(eventCount)),
            cta: { label: t("event_cta"), href: "/events" },
          },
        ]
      : []),
    {
      id: "notice",
      type: "notice" as const,
      icon: <Construction className="w-5 h-5" strokeWidth={1.5} />,
      label: t("notice_label"),
      title: t("notice_title"),
      body: t("notice_body"),
      cta: { label: t("notice_cta"), href: "/contact" },
      ctaSuffix: t("notice_cta_suffix"),
    },
  ];

  const total = slides.length;
  const isLast = activeIndex === total - 1;

  const goTo = useCallback(
    (idx: number, dir: SlideDirection) => {
      if (isSliding || idx === activeIndex) return;
      setSlideDir(dir);
      setIsSliding(true);
      setTimeout(() => {
        setActiveIndex(idx);
        setIsSliding(false);
      }, 320);
    },
    [isSliding, activeIndex]
  );

  const goPrev = () => {
    if (activeIndex > 0) goTo(activeIndex - 1, "right");
  };

  const goNext = () => {
    if (activeIndex < total - 1) goTo(activeIndex + 1, "left");
  };

  const handleConfirm = () => {
    if (isLast) {
      handleClose();
    } else {
      goNext();
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setIsOpen(false), 400);
  };

  if (!isOpen) return null;

  const slide = slides[activeIndex];

  const slideClass = isSliding
    ? slideDir === "left"
      ? "opacity-0 -translate-x-6"
      : "opacity-0 translate-x-6"
    : "opacity-100 translate-x-0";

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[80] transition-all duration-400 ${
          isClosing
            ? "opacity-0 backdrop-blur-none"
            : "opacity-100 backdrop-blur-[2px] bg-[#020814]/60"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("announcement_label")}
        className={`fixed z-[90] inset-0 flex items-center justify-center pointer-events-none px-4`}
      >
        <div
          className={`pointer-events-auto w-full max-w-md transition-all duration-400 ${
            isClosing
              ? "opacity-0 scale-95 translate-y-3"
              : "opacity-100 scale-100 translate-y-0"
          }`}
        >
          {/* Card */}
          <div className="relative bg-[#0B1B3B] border border-[#D4C5A0]/15 shadow-[0_32px_80px_rgba(2,8,20,0.8)] overflow-hidden">

            {/* Gold hairline top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4C5A0] to-transparent" />

            {/* Subtle background texture */}
            <div
              className="absolute inset-0 opacity-[0.025] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(212,197,160,0.8) 39px, rgba(212,197,160,0.8) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(212,197,160,0.8) 39px, rgba(212,197,160,0.8) 40px)",
              }}
              aria-hidden="true"
            />

            {/* Header bar */}
            <div className="relative flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#D4C5A0]/10">
              <div className="flex items-center gap-2.5">
                {/* Pulsing dot */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4C5A0] opacity-50" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4C5A0]" />
                </span>
                <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#D4C5A0]/80">
                  {t("announcement_label")}
                </span>
              </div>

              {/* Slide counter + close */}
              <div className="flex items-center gap-4">
                {total > 1 && (
                  <span className="text-[10px] tracking-[0.12em] text-white/25 tabular-nums">
                    {String(activeIndex + 1).padStart(2, "0")}
                    &thinsp;{t("slide_of")}&thinsp;
                    {String(total).padStart(2, "0")}
                  </span>
                )}
                <button
                  onClick={handleClose}
                  className="text-white/25 hover:text-white/70 transition-colors duration-200 group"
                  aria-label={t("close")}
                >
                  <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Slide content */}
            <div className="relative overflow-hidden">
              <div
                className={`px-6 pt-7 pb-6 transition-all duration-320 ease-out ${slideClass}`}
              >
                {/* Icon + type label */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`flex items-center justify-center w-10 h-10 border ${
                      slide.type === "event"
                        ? "border-[#D4C5A0]/30 text-[#D4C5A0] bg-[#D4C5A0]/5"
                        : "border-white/15 text-white/50 bg-white/5"
                    }`}
                  >
                    {slide.icon}
                  </div>
                  <span
                    className={`text-[10px] font-bold tracking-[0.2em] uppercase ${
                      slide.type === "event" ? "text-[#D4C5A0]" : "text-white/40"
                    }`}
                  >
                    {slide.label}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-primary text-white text-[1.35rem] font-semibold leading-snug tracking-tight mb-3">
                  {slide.title}
                </h2>

                {/* Body — supports inline HTML from translation (e.g. <strong>) */}
                <p
                  className="text-white/55 text-[0.875rem] leading-relaxed font-light mb-6"
                  dangerouslySetInnerHTML={{ __html: slide.body }}
                />

                {/* CTA row */}
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Primary action link */}
                  <LangLink
                    href={slide.cta.href}
                    onClick={handleClose}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-[11px] font-bold tracking-[0.12em] uppercase transition-colors duration-200 bg-[#D4C5A0] text-[#0B1B3B] hover:bg-white"
                  >
                    {slide.cta.label}
                    <ArrowRight className="w-3 h-3" />
                  </LangLink>

                  {/* Suffix text for notice */}
                  {"ctaSuffix" in slide && slide.ctaSuffix && (
                    <span className="text-[0.75rem] text-white/30 font-light">
                      {slide.ctaSuffix}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Footer — dots + navigation */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#D4C5A0]/10">
              {/* Dot indicators */}
              <div className="flex items-center gap-2">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => goTo(idx, idx > activeIndex ? "left" : "right")}
                    className={`transition-all duration-400 rounded-full ${
                      idx === activeIndex
                        ? "w-5 h-1.5 bg-[#D4C5A0]"
                        : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Confirm */}
              <div className="flex items-center gap-2">
                {total > 1 && activeIndex > 0 && (
                  <button
                    onClick={goPrev}
                    className="flex items-center justify-center w-8 h-8 border border-white/10 text-white/40 hover:text-white/80 hover:border-white/25 transition-all duration-200"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}

                {total > 1 && !isLast && (
                  <button
                    onClick={goNext}
                    className="flex items-center justify-center w-8 h-8 border border-white/10 text-white/40 hover:text-white/80 hover:border-white/25 transition-all duration-200"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={handleConfirm}
                  className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold tracking-[0.12em] uppercase text-white/60 border border-white/15 hover:border-[#D4C5A0]/40 hover:text-[#D4C5A0] transition-all duration-200"
                >
                  {isLast ? t("confirm_last_cta") : t("confirm_cta")}
                  {!isLast && <ChevronRight className="w-3 h-3" />}
                </button>
              </div>
            </div>

            {/* Bottom gold hairline */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4C5A0]/20 to-transparent" />
          </div>
        </div>
      </div>
    </>
  );
}
