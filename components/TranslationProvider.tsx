"use client";

import { createContext, useContext, ReactNode, useMemo } from "react";

type Messages = Record<string, any>;

interface TranslationContextType {
  locale: string;
  messages: Messages;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

export function TranslationProvider({
  children,
  locale,
  messages,
}: Readonly<{
  children: ReactNode;
  locale: string;
  messages: Messages;
}>) {
  const contextValue = useMemo(
    () => ({ locale, messages }),
    [locale, messages]
  );

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslationContext() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error(
      "useTranslationContext must be used within a TranslationProvider"
    );
  }
  return context;
}
