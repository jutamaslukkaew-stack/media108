"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "th";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Inline translation helper — returns English or Thai string */
  t: (en: string, th: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "th",
  setLang: () => {},
  t: (_en, th) => th,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("th");

  // Persist choice across page loads
  useEffect(() => {
    const stored = localStorage.getItem("media108-lang") as Lang | null;
    if (stored === "en" || stored === "th") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("media108-lang", l);
  };

  const t = (en: string, th: string) => (lang === "en" ? en : th);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
