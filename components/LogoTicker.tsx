"use client";

import { LogoItem } from "@/types";

interface LogoTickerProps {
  title?: string;
  items: LogoItem[];
  theme?: "dark" | "light";
}

const LogoTicker = ({ title, items, theme = "dark" }: LogoTickerProps) => {
  const bgClass =
    theme === "dark"
      ? "bg-[#020814] border-[#1A2F5A]"
      : "bg-[#F5F5F7] border-[#0B1B3B]/10";
  const textClass = theme === "dark" ? "text-white" : "text-[#0B1B3B]";
  const fadeLeft = theme === "dark" ? "from-[#020814]" : "from-[#F5F5F7]";
  const fadeRight = theme === "dark" ? "to-[#020814]" : "to-[#F5F5F7]";
  const titleColor = theme === "dark" ? "text-[#D4C5A0]" : "text-[#0B1B3B]";

  // Duplicate items enough times to ensure smooth scrolling loop
  const displayItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`py-12 border-y ${bgClass} overflow-hidden relative`}
    >
      {title && (
        <div className="text-center mb-8 relative z-10">
          <p
            className={`${titleColor} text-xs font-bold uppercase tracking-[0.2em] opacity-80`}
          >
            {title}
          </p>
        </div>
      )}

      <div className="relative w-full">
        {/* Gradients to fade edges */}
        <div
          className={`absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r ${fadeLeft} to-transparent z-10 pointer-events-none`}
        ></div>
        <div
          className={`absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l ${fadeRight} to-transparent z-10 pointer-events-none`}
        ></div>

        <div className="flex w-max animate-ticker">
          {displayItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className={`flex items-center gap-3 px-12 md:px-16 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default ${
                theme === "dark" ? "grayscale hover:grayscale-0" : ""
              }`}
            >
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-10 md:h-12 w-auto object-contain"
                />
              ) : (
                <div className={`flex items-center gap-3 ${textClass}`}>
                  {item.icon}
                  <span className="text-xl md:text-2xl font-serif whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoTicker;
