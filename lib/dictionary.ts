const dictionaries = {
  en: () => import("@/messages/en.json").then((module) => module.default),
  id: () => import("@/messages/id.json").then((module) => module.default),
};

export const locales = ["en", "id"];
export const defaultLocale = "id";

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => {
  if (typeof dictionaries[locale] === "function") {
    return dictionaries[locale]();
  }
  // Fallback to default if locale not found
  return dictionaries.en();
};
