import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "gold";
  icon?: boolean;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  icon = true,
  className = "",
  href,
  ...props
}) => {
  // Base: minimal height 44px (py-3), tracking wide, transition
  const baseStyles =
    "relative inline-flex items-center justify-center px-10 py-4 font-medium transition-all duration-300 tracking-wider uppercase text-sm border-2 cursor-pointer";

  const variants = {
    // Primary: Transparent with Gold Border (per brief)
    primary:
      "border-[#D4C5A0] text-[#D4C5A0] hover:bg-[#D4C5A0] hover:text-[#0B1B3B] bg-transparent",

    // Secondary: Navy on White (for light sections)
    secondary:
      "border-[#0B1B3B] text-[#0B1B3B] hover:bg-[#0B1B3B] hover:text-white bg-transparent",

    // Gold Filled
    gold: "bg-[#D4C5A0] border-[#D4C5A0] text-[#0B1B3B] hover:bg-white hover:border-white",

    // Outline White
    outline: "border-white/30 text-white hover:bg-white hover:text-[#0B1B3B]",
  };

  const content = (
    <>
      <span className="mr-3">{children}</span>
      {icon && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
