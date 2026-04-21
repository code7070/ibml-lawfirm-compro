"use client";

import { useState } from "react";
import { Mail, Copy, Check } from "lucide-react";

interface EmailTooltipProps {
  email: string;
}

const EmailTooltip: React.FC<EmailTooltipProps> = ({ email }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setShowTooltip(false);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <div className="relative inline-flex max-w-full">
      <a
        href={`mailto:${email}`}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group/email inline-flex max-w-full items-center gap-2.5 text-[13px] font-normal text-[#2E4472] transition-colors duration-200 hover:text-[#0B1B3B]"
      >
        <Mail className="w-4 h-4 shrink-0 text-[#2E4472]/75 transition-colors duration-200 group-hover/email:text-[#0B1B3B]" />
        <span className="relative inline-block max-w-full truncate pb-0.5">
          {email}
          <span
            aria-hidden
            className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#D4C5A0] transition-transform duration-300 ease-out group-hover/email:scale-x-100"
          />
        </span>
      </a>

      <div
        className="absolute left-0 top-full w-full h-2"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div
          className={`absolute left-0 top-2 z-50 bg-[#0B1B3B] text-white rounded shadow-lg transition-all duration-150 ${
            showTooltip
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-1 pointer-events-none"
          }`}
        >
          <div className="flex items-center divide-x divide-white/15">
            <button
              onClick={handleCopy}
              disabled={copied}
              className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium hover:text-[#D4C5A0] hover:bg-white/5 transition-colors disabled:text-[#D4C5A0] whitespace-nowrap"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${email}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium hover:text-[#D4C5A0] hover:bg-white/5 transition-colors whitespace-nowrap"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Mail</span>
            </a>
          </div>

          <div
            className={`absolute left-5 -top-1 w-2 h-2 bg-[#0B1B3B] rotate-45 transition-all duration-150 ${
              showTooltip ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailTooltip;
