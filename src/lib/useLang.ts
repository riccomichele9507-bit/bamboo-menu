import { useState, useEffect, useCallback } from "react";
import type { Lang } from "./menu-data";
import { LANGS } from "./menu-data";

const LS_KEY = "bamboo_lang";

function getInitialLang(): Lang {
  // 1. URL param ?lang=xx
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get("lang") as Lang | null;
  if (urlLang && LANGS.includes(urlLang)) return urlLang;

  // 2. localStorage
  const saved = localStorage.getItem(LS_KEY) as Lang | null;
  if (saved && LANGS.includes(saved)) return saved;

  // 3. Browser preference
  const browser = navigator.language.slice(0, 2) as Lang;
  if (LANGS.includes(browser)) return browser;

  // 4. Default
  return "it";
}

export function useLang() {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem(LS_KEY, l);
    // Update URL without reload
    const url = new URL(window.location.href);
    url.searchParams.set("lang", l);
    window.history.replaceState({}, "", url.toString());
    // Update html lang attribute
    document.documentElement.lang = l;
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return { lang, setLang };
}
