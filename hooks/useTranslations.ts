"use client";

import { useTranslationContext } from "@/components/TranslationProvider";

function getNestedValue(obj: any, path: string): string {
  if (!path) return "";
  const keys = path.split(".");
  let current = obj;

  for (const key of keys) {
    if (current === undefined || current === null) return path;
    current = current[key];
  }

  if (typeof current === "string") return current;
  if (typeof current === "number") return String(current);

  // Return the path key if translation is missing or is an object
  return path;
}

export function useLocale() {
  const { locale } = useTranslationContext();
  return locale;
}

export function useTranslations(namespace?: string) {
  const { messages } = useTranslationContext();

  return (key: string) => {
    // If namespace is provided, prepend it to the key
    const fullAuthenticationPath = namespace ? `${namespace}.${key}` : key;
    return getNestedValue(messages, fullAuthenticationPath);
  };
}
