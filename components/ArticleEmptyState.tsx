"use client";

import { useTranslations } from "@/hooks/useTranslations";
import { LangLink } from "./LangLink";
import { ArrowRight, X } from "lucide-react";

interface ArticleEmptyStateProps {
  type: "search" | "category";
  searchQuery?: string;
  onClear?: () => void;
}

export default function ArticleEmptyState({
  type,
  searchQuery,
  onClear,
}: ArticleEmptyStateProps) {
  const t = useTranslations("articles");

  return (
    <>
      <style>{`
        @keyframes orn-draw {
          from { stroke-dashoffset: 400; opacity: 0; }
          to   { stroke-dashoffset: 0;   opacity: 1; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
        .orn-line {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: orn-draw 1.2s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .orn-line-delay { animation-delay: 0.25s; }
        .orn-scales    { animation: scale-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        .orn-text-1    { animation: fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both; }
        .orn-text-2    { animation: fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.65s both; }
        .orn-text-3    { animation: fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.8s both; }
      `}</style>

      <div className="relative py-28 px-6 overflow-hidden">
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #0B1B3B 0px, #0B1B3B 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #0B1B3B 0px, #0B1B3B 1px, transparent 1px, transparent 40px)",
          }}
        />

        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center text-center">
          {/* Top ornamental rule */}
          <svg
            className="mb-8 w-64 overflow-visible"
            height="12"
            viewBox="0 0 256 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              className="orn-line"
              x1="0"
              y1="6"
              x2="256"
              y2="6"
              stroke="#D4C5A0"
              strokeWidth="0.75"
            />
            <line
              className="orn-line orn-line-delay"
              x1="0"
              y1="10"
              x2="256"
              y2="10"
              stroke="#D4C5A0"
              strokeWidth="0.35"
            />
            <circle
              cx="128"
              cy="6"
              r="4"
              fill="#D4C5A0"
              className="orn-scales"
            />
            <polygon
              points="110,6 116,1 122,6 116,11"
              fill="none"
              stroke="#D4C5A0"
              strokeWidth="0.75"
              className="orn-scales"
            />
            <polygon
              points="134,6 140,1 146,6 140,11"
              fill="none"
              stroke="#D4C5A0"
              strokeWidth="0.75"
              className="orn-scales"
            />
          </svg>

          {/* Scales of Justice SVG */}
          <div className="orn-scales mb-8">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Stand */}
              <line
                x1="40"
                y1="12"
                x2="40"
                y2="68"
                stroke="#D4C5A0"
                strokeWidth="1.5"
              />
              <line
                x1="28"
                y1="68"
                x2="52"
                y2="68"
                stroke="#D4C5A0"
                strokeWidth="1.5"
              />
              {/* Beam */}
              <line
                x1="14"
                y1="20"
                x2="66"
                y2="20"
                stroke="#D4C5A0"
                strokeWidth="1.5"
              />
              {/* Left chain */}
              <line
                x1="18"
                y1="20"
                x2="18"
                y2="38"
                stroke="#D4C5A0"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              {/* Right chain */}
              <line
                x1="62"
                y1="20"
                x2="62"
                y2="38"
                stroke="#D4C5A0"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              {/* Left pan */}
              <path
                d="M8 38 Q18 46 28 38"
                stroke="#D4C5A0"
                strokeWidth="1.5"
                fill="none"
              />
              {/* Right pan */}
              <path
                d="M52 38 Q62 46 72 38"
                stroke="#D4C5A0"
                strokeWidth="1.5"
                fill="none"
              />
              {/* Top ornament */}
              <circle
                cx="40"
                cy="12"
                r="2.5"
                stroke="#D4C5A0"
                strokeWidth="1.2"
                fill="none"
              />
              {/* Corner ornaments */}
              <line
                x1="10"
                y1="12"
                x2="14"
                y2="20"
                stroke="#D4C5A0"
                strokeWidth="0.75"
                strokeOpacity="0.4"
              />
              <line
                x1="70"
                y1="12"
                x2="66"
                y2="20"
                stroke="#D4C5A0"
                strokeWidth="0.75"
                strokeOpacity="0.4"
              />
            </svg>
          </div>

          {/* Roman numeral tag */}
          <span className="orn-text-1 text-[10px] font-bold tracking-[0.4em] uppercase text-[#D4C5A0] mb-4">
            {type === "search" ? "— NIHIL INVENTUM —" : "— VACATIO —"}
          </span>

          {/* Main headline */}
          <h3 className="orn-text-2 text-3xl md:text-4xl font-serif font-light text-[#0B1B3B] mb-4 leading-tight">
            {type === "search" && searchQuery
              ? `"${searchQuery}"`
              : t("noArticles")}
          </h3>

          {/* Subtext */}
          <p className="orn-text-2 text-sm text-[#2E4472] font-light leading-relaxed max-w-sm mb-10">
            {type === "search"
              ? "No articles matched your query. The archive is vast — explore another path."
              : "This category has no published articles at the moment. Explore our full knowledge library."}
          </p>

          {/* CTA */}
          <div className="orn-text-3 flex flex-col sm:flex-row items-center gap-4">
            {type === "search" && onClear ? (
              <>
                <button
                  onClick={onClear}
                  className="inline-flex items-center gap-2 px-8 py-3 text-xs font-bold uppercase tracking-widest border border-[#0B1B3B] text-[#0B1B3B] hover:bg-[#0B1B3B] hover:text-white transition-all"
                >
                  <X className="w-3 h-3" />
                  {t("clearSearch")}
                </button>
                <LangLink
                  href="/insights"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4C5A0] hover:text-[#0B1B3B] transition-colors"
                >
                  {t("backToAll")} <ArrowRight className="w-3 h-3" />
                </LangLink>
              </>
            ) : (
              <LangLink
                href="/insights"
                className="inline-flex items-center gap-2 px-8 py-3 text-xs font-bold uppercase tracking-widest border border-[#0B1B3B] text-[#0B1B3B] hover:bg-[#0B1B3B] hover:text-white transition-all"
              >
                {t("backToAll")} <ArrowRight className="w-3 h-3" />
              </LangLink>
            )}
          </div>

          {/* Bottom ornamental rule */}
          <svg
            className="mt-12 w-64 overflow-visible"
            height="12"
            viewBox="0 0 256 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              className="orn-line"
              x1="0"
              y1="6"
              x2="256"
              y2="6"
              stroke="#D4C5A0"
              strokeWidth="0.75"
            />
            <line
              className="orn-line orn-line-delay"
              x1="0"
              y1="2"
              x2="256"
              y2="2"
              stroke="#D4C5A0"
              strokeWidth="0.35"
            />
            <circle
              cx="128"
              cy="6"
              r="4"
              fill="#D4C5A0"
              className="orn-scales"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
