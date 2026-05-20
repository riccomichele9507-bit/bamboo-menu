import type { Lang } from "./menu-data";

export type UIStrings = {
  tagline: string;
  disclaimer: string;
  changeLanguage: string;
  scanForMenu: string;
  address: string;
  hours: string;
  hoursLabel: string;
};

export const ui: Record<Lang, UIStrings> = {
  it: {
    tagline: "Cocktail Bar · Lecce",
    disclaimer: "Prezzi indicativi — IVA inclusa.",
    changeLanguage: "Cambia lingua",
    scanForMenu: "Scansiona per il menu",
    address: "Via Michelangelo Schipa, 2 · 73100 Lecce",
    hours: "Lun–Sab 07:00–23:00 · Domenica chiuso",
    hoursLabel: "Orari",
  },
  en: {
    tagline: "Cocktail Bar · Lecce",
    disclaimer: "Indicative prices — VAT included.",
    changeLanguage: "Change language",
    scanForMenu: "Scan for the menu",
    address: "Via Michelangelo Schipa, 2 · 73100 Lecce",
    hours: "Mon–Sat 7:00–23:00 · Sunday closed",
    hoursLabel: "Hours",
  },
  fr: {
    tagline: "Bar à Cocktails · Lecce",
    disclaimer: "Prix indicatifs — TVA incluse.",
    changeLanguage: "Changer de langue",
    scanForMenu: "Scannez pour le menu",
    address: "Via Michelangelo Schipa, 2 · 73100 Lecce",
    hours: "Lun–Sam 07h00–23h00 · Dimanche fermé",
    hoursLabel: "Horaires",
  },
  de: {
    tagline: "Cocktailbar · Lecce",
    disclaimer: "Richtpreise — inkl. MwSt.",
    changeLanguage: "Sprache wechseln",
    scanForMenu: "Menü scannen",
    address: "Via Michelangelo Schipa, 2 · 73100 Lecce",
    hours: "Mo–Sa 07:00–23:00 Uhr · Sonntag geschlossen",
    hoursLabel: "Öffnungszeiten",
  },
};
