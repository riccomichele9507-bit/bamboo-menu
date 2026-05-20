import type { Lang } from "./menu-data";

export type UIStrings = {
  tagline: string;
  disclaimer: string;
  changeLanguage: string;
  scanForMenu: string;
};

export const ui: Record<Lang, UIStrings> = {
  it: {
    tagline: "Cocktail Bar · Lecce",
    disclaimer: "Prezzi indicativi — IVA inclusa.",
    changeLanguage: "Cambia lingua",
    scanForMenu: "Scansiona per il menu",
  },
  en: {
    tagline: "Cocktail Bar · Lecce",
    disclaimer: "Indicative prices — VAT included.",
    changeLanguage: "Change language",
    scanForMenu: "Scan for the menu",
  },
  fr: {
    tagline: "Bar à Cocktails · Lecce",
    disclaimer: "Prix indicatifs — TVA incluse.",
    changeLanguage: "Changer de langue",
    scanForMenu: "Scannez pour le menu",
  },
  de: {
    tagline: "Cocktailbar · Lecce",
    disclaimer: "Richtpreise — inkl. MwSt.",
    changeLanguage: "Sprache wechseln",
    scanForMenu: "Menü scannen",
  },
};
