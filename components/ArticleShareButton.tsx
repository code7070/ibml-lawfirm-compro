"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Link2, Check, Share2 } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

interface ArticleShareButtonProps {
  /** Article title for navigator.share */
  title: string;
  /** Article summary/excerpt for navigator.share */
  summary?: string;
  /** Variant for different placement contexts */
  variant?: "sidebar" | "inline" | "hero";
}

const ArticleShareButton = ({
  title,
  summary,
  variant = "sidebar",
}: ArticleShareButtonProps) => {
  const t = useTranslations("articles.share");
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Detect mobile via touch capability + screen width for reliability
    const checkMobile = () => {
      const hasTouchScreen =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isNarrow = window.matchMedia("(max-width: 1023px)").matches;
      setIsMobile(hasTouchScreen && isNarrow);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleShare = useCallback(async () => {
    const url = window.location.href;

    // Mobile: trigger native share sheet
    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: summary || title,
          url: url,
        });
      } catch (err) {
        // User cancelled or share failed — fall back to copy
        if ((err as Error).name !== "AbortError") {
          await copyToClipboard(url);
        }
      }
      return;
    }

    // Desktop: copy link to clipboard
    await copyToClipboard(url);
  }, [isMobile, title, summary]);

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2400);
    }
  };

  // ─── Sidebar variant (desktop sticky side column) ───
  if (variant === "sidebar") {
    return (
      <div className="flex flex-col gap-3 items-start">
        <p className="text-[10px] font-bold text-[#0B1B3B]/40 uppercase tracking-[0.2em] mb-1">
          {t("label")}
        </p>

        <button
          onClick={handleShare}
          aria-label={copied ? t("copied") : t("copyLink")}
          className="group relative"
        >
          {/* Button body */}
          <div
            className={`
              relative w-11 h-11 flex items-center justify-center
              border transition-all duration-500 ease-out rounded-full
              ${
                copied
                  ? "border-[#D4C5A0] bg-[#D4C5A0]/10"
                  : "border-[#0B1B3B]/10 hover:border-[#D4C5A0] hover:bg-[#0B1B3B] group-hover:shadow-[0_0_20px_rgba(212,197,160,0.15)]"
              }
            `}
          >
            {/* Animated icon swap */}
            <div className="relative w-4 h-4">
              <Check
                className={`
                  absolute inset-0 w-4 h-4 text-[#D4C5A0] transition-all duration-300
                  ${copied ? "opacity-100 scale-100" : "opacity-0 scale-50"}
                `}
                strokeWidth={2.5}
              />
              {isMobile ? (
                <Share2
                  className={`
                    absolute inset-0 w-4 h-4 transition-all duration-300
                    ${
                      copied
                        ? "opacity-0 scale-50"
                        : "opacity-100 scale-100 text-[#0B1B3B] group-hover:text-[#D4C5A0]"
                    }
                  `}
                />
              ) : (
                <Link2
                  className={`
                    absolute inset-0 w-4 h-4 transition-all duration-300
                    ${
                      copied
                        ? "opacity-0 scale-50"
                        : "opacity-100 scale-100 text-[#0B1B3B] group-hover:text-[#D4C5A0]"
                    }
                  `}
                />
              )}
            </div>

            {/* Success ring pulse */}
            {copied && (
              <div className="absolute inset-0 rounded-full border border-[#D4C5A0] animate-share-ring" />
            )}
          </div>

          {/* Tooltip (desktop only) */}
          <div
            className={`
              hidden lg:block absolute left-full ml-3 top-1/2 -translate-y-1/2
              whitespace-nowrap pointer-events-none
              transition-all duration-300
              ${
                copied
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              }
            `}
          >
            <div
              className={`
                px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em]
                rounded-sm backdrop-blur-sm
                ${
                  copied
                    ? "bg-[#D4C5A0]/20 text-[#D4C5A0] border border-[#D4C5A0]/30"
                    : "bg-[#0B1B3B]/90 text-white/80"
                }
              `}
            >
              {copied ? t("copied") : t("copyLink")}
            </div>
          </div>
        </button>
      </div>
    );
  }

  // ─── Inline variant (for mobile bottom bar or within content) ───
  if (variant === "inline") {
    return (
      <button
        onClick={handleShare}
        aria-label={copied ? t("copied") : t("copyLink")}
        className={`
          group inline-flex items-center gap-2.5 px-5 py-2.5
          border transition-all duration-500 ease-out rounded-full
          text-[11px] font-bold uppercase tracking-[0.15em]
          ${
            copied
              ? "border-[#D4C5A0] bg-[#D4C5A0]/10 text-[#D4C5A0]"
              : "border-[#0B1B3B]/15 text-[#0B1B3B]/60 hover:border-[#D4C5A0] hover:text-[#0B1B3B] hover:bg-[#D4C5A0]/5"
          }
        `}
      >
        <div className="relative w-3.5 h-3.5">
          <Check
            className={`
              absolute inset-0 w-3.5 h-3.5 transition-all duration-300
              ${copied ? "opacity-100 scale-100" : "opacity-0 scale-50"}
            `}
            strokeWidth={2.5}
          />
          {isMobile ? (
            <Share2
              className={`
                absolute inset-0 w-3.5 h-3.5 transition-all duration-300
                ${copied ? "opacity-0 scale-50" : "opacity-100 scale-100"}
              `}
            />
          ) : (
            <Link2
              className={`
                absolute inset-0 w-3.5 h-3.5 transition-all duration-300
                ${copied ? "opacity-0 scale-50" : "opacity-100 scale-100"}
              `}
            />
          )}
        </div>
        <span>{copied ? t("copied") : t("share")}</span>
      </button>
    );
  }

  // ─── Hero variant (bottom of hero section, larger) ───
  return (
    <button
      onClick={handleShare}
      aria-label={copied ? t("copied") : t("copyLink")}
      className={`
        group inline-flex items-center gap-3 px-6 py-3
        border transition-all duration-500 ease-out rounded-full
        text-xs font-bold uppercase tracking-[0.15em]
        backdrop-blur-sm
        ${
          copied
            ? "border-[#D4C5A0] bg-[#D4C5A0]/15 text-[#D4C5A0]"
            : "border-white/20 text-white/70 hover:border-[#D4C5A0] hover:text-[#D4C5A0] hover:bg-white/5"
        }
      `}
    >
      <div className="relative w-4 h-4">
        <Check
          className={`
            absolute inset-0 w-4 h-4 transition-all duration-300
            ${copied ? "opacity-100 scale-100" : "opacity-0 scale-50"}
          `}
          strokeWidth={2.5}
        />
        {isMobile ? (
          <Share2
            className={`
              absolute inset-0 w-4 h-4 transition-all duration-300
              ${copied ? "opacity-0 scale-50" : "opacity-100 scale-100"}
            `}
          />
        ) : (
          <Link2
            className={`
              absolute inset-0 w-4 h-4 transition-all duration-300
              ${copied ? "opacity-0 scale-50" : "opacity-100 scale-100"}
            `}
          />
        )}
      </div>
      <span>{copied ? t("copied") : t("share")}</span>
    </button>
  );
};

export default ArticleShareButton;
