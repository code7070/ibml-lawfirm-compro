// components/LangLink.tsx
"use client";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { trackEvent } from "@/lib/gtag";
import { ComponentProps, MouseEvent } from "react";

interface LangLinkProps extends ComponentProps<typeof NextLink> {
  trackingName?: string;
}

export function LangLink({
  href,
  onClick,
  trackingName,
  ...props
}: LangLinkProps) {
  const params = useParams();
  const locale = params?.locale as "id" | "en" | undefined;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    trackEvent("web_link_click", {
      screen_name: trackingName
        ? `Link: ${trackingName}`
        : `Link: ${href as string}`,
    });
    if (onClick) onClick(e);
  };

  // Auto-prepend locale to internal links
  let finalHref = href;
  if (
    typeof href === "string" &&
    href.startsWith("/") &&
    locale &&
    !href.startsWith(`/${locale}`)
  ) {
    finalHref = `/${locale}${href}`;
  }

  return (
    <NextLink href={finalHref} {...props} onClick={handleClick} scroll={true} />
  );
}
