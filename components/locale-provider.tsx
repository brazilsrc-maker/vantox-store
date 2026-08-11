"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DICTS,
  LOCALES,
  LOCALE_KEY,
  type Dictionary,
  type Locale,
} from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
  dir: "rtl" | "ltr";
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "ar";
  const raw = window.localStorage.getItem(LOCALE_KEY);
  if (raw === "ar" || raw === "en" || raw === "fr") return raw;
  return "ar";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLocaleState(readStoredLocale());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const meta = LOCALES.find((l) => l.id === locale)!;
    document.documentElement.lang = locale;
    document.documentElement.dir = meta.dir;
    window.localStorage.setItem(LOCALE_KEY, locale);
  }, [locale, ready]);

  const value = useMemo<LocaleContextValue>(() => {
    const meta = LOCALES.find((l) => l.id === locale)!;
    return {
      locale,
      setLocale: setLocaleState,
      t: DICTS[locale],
      dir: meta.dir,
    };
  }, [locale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
