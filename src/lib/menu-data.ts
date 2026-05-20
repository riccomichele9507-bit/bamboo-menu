export type Lang = "it" | "en" | "fr" | "de";

export const LANGS: Lang[] = ["it", "en", "fr", "de"];

export const LANG_LABELS: Record<Lang, { native: string; flag: string }> = {
  it: { native: "Italiano", flag: "🇮🇹" },
  en: { native: "English", flag: "🇬🇧" },
  fr: { native: "Français", flag: "🇫🇷" },
  de: { native: "Deutsch", flag: "🇩🇪" },
};

export type Translation = {
  name: string;
  description?: string;
};

export type MenuItem = {
  id: string;
  categoryId: string;
  priceEur: number;
  imageFile?: string; // filename in /img/
};

export type Category = {
  id: string;
  emoji: string;
  sortOrder: number;
  translations: Record<Lang, { name: string }>;
};

export type MenuItemFull = MenuItem & {
  translations: Record<Lang, Translation>;
};

export const categories: Category[] = [
  {
    id: "mangiare",
    emoji: "🍽️",
    sortOrder: 1,
    translations: {
      it: { name: "Da mangiare" },
      en: { name: "To eat" },
      fr: { name: "À manger" },
      de: { name: "Zum Essen" },
    },
  },
  {
    id: "bere",
    emoji: "🍸",
    sortOrder: 2,
    translations: {
      it: { name: "Da bere" },
      en: { name: "Drinks" },
      fr: { name: "À boire" },
      de: { name: "Getränke" },
    },
  },
];

export const items: MenuItemFull[] = [
  // ============ DA MANGIARE ============
  {
    id: "panini",
    categoryId: "mangiare",
    priceEur: 6,
    imageFile: "panini.jpg",
    translations: {
      it: { name: "Panini", description: "Pane fresco, farciture di giornata." },
      en: { name: "Sandwiches", description: "Fresh bread, daily fillings." },
      fr: { name: "Sandwichs", description: "Pain frais, garnitures du jour." },
      de: { name: "Sandwiches", description: "Frisches Brot, Tagesfüllungen." },
    },
  },
  {
    id: "olive",
    categoryId: "mangiare",
    priceEur: 4,
    imageFile: "olive.jpg",
    translations: {
      it: { name: "Olive", description: "Olive pugliesi, da accompagnare al drink." },
      en: { name: "Olives", description: "Apulian olives, perfect alongside your drink." },
      fr: { name: "Olives", description: "Olives des Pouilles, à déguster avec votre cocktail." },
      de: { name: "Oliven", description: "Apulische Oliven, ideal zum Drink." },
    },
  },
  {
    id: "taralli",
    categoryId: "mangiare",
    priceEur: 3,
    imageFile: "taralli.jpg",
    translations: {
      it: { name: "Taralli", description: "Croccanti, classici del Salento." },
      en: { name: "Taralli", description: "Crunchy, a classic of Salento." },
      fr: { name: "Taralli", description: "Croquants, un classique du Salento." },
      de: { name: "Taralli", description: "Knusprig, ein Klassiker aus dem Salento." },
    },
  },
  {
    id: "piadina-cotto",
    categoryId: "mangiare",
    priceEur: 6,
    imageFile: "piadina-cotto.jpg",
    translations: {
      it: { name: "Piadina con cotto", description: "Prosciutto cotto, mozzarella e pomodoro." },
      en: { name: "Piadina with cooked ham", description: "Cooked ham, mozzarella and tomato." },
      fr: { name: "Piadina au jambon cuit", description: "Jambon cuit, mozzarella et tomate." },
      de: { name: "Piadina mit Kochschinken", description: "Kochschinken, Mozzarella und Tomate." },
    },
  },
  {
    id: "piadina-crudo",
    categoryId: "mangiare",
    priceEur: 7,
    imageFile: "piadina-crudo.jpg",
    translations: {
      it: { name: "Piadina con crudo", description: "Crudo, rucola e scaglie di grana." },
      en: { name: "Piadina with cured ham", description: "Cured ham, rocket and grana flakes." },
      fr: { name: "Piadina au jambon cru", description: "Jambon cru, roquette et copeaux de grana." },
      de: { name: "Piadina mit Rohschinken", description: "Rohschinken, Rucola und Grana-Flocken." },
    },
  },
  {
    id: "panino-salmone",
    categoryId: "mangiare",
    priceEur: 8,
    imageFile: "panino-salmone.jpg",
    translations: {
      it: { name: "Panino con salmone", description: "Salmone, philadelphia e lime." },
      en: { name: "Salmon sandwich", description: "Salmon, cream cheese and lime." },
      fr: { name: "Sandwich au saumon", description: "Saumon, philadelphia et citron vert." },
      de: { name: "Lachs-Sandwich", description: "Lachs, Frischkäse und Limette." },
    },
  },

  // ============ DA BERE ============
  {
    id: "negroni",
    categoryId: "bere",
    priceEur: 8,
    imageFile: "negroni.jpg",
    translations: {
      it: { name: "Negroni", description: "Gin, bitter e vermouth rosso. Il classico." },
      en: { name: "Negroni", description: "Gin, bitter and red vermouth. The classic." },
      fr: { name: "Negroni", description: "Gin, bitter et vermouth rouge. Le grand classique." },
      de: { name: "Negroni", description: "Gin, Bitter und roter Wermut. Der Klassiker." },
    },
  },
  {
    id: "gin-tonic",
    categoryId: "bere",
    priceEur: 8,
    imageFile: "gin-tonic.jpg",
    translations: {
      it: { name: "Gin Tonic", description: "Gin premium, tonica e botaniche fresche." },
      en: { name: "Gin Tonic", description: "Premium gin, tonic and fresh botanicals." },
      fr: { name: "Gin Tonic", description: "Gin premium, tonic et botaniques frais." },
      de: { name: "Gin Tonic", description: "Premium-Gin, Tonic und frische Botanicals." },
    },
  },
  {
    id: "acqua",
    categoryId: "bere",
    priceEur: 2,
    imageFile: "acqua.jpg",
    translations: {
      it: { name: "Acqua", description: "Naturale o frizzante." },
      en: { name: "Water", description: "Still or sparkling." },
      fr: { name: "Eau", description: "Plate ou gazeuse." },
      de: { name: "Wasser", description: "Still oder sprudelnd." },
    },
  },
  {
    id: "coca-cola",
    categoryId: "bere",
    priceEur: 3,
    imageFile: "coca-cola.jpg",
    translations: {
      it: { name: "Coca Cola", description: "Servita ghiacciata." },
      en: { name: "Coca Cola", description: "Served ice cold." },
      fr: { name: "Coca Cola", description: "Servie bien fraîche." },
      de: { name: "Coca Cola", description: "Eiskalt serviert." },
    },
  },
];

export function getCategoryName(category: Category, lang: Lang): string {
  return category.translations[lang]?.name ?? category.translations.it.name;
}

export function getItemTranslation(item: MenuItemFull, lang: Lang): Translation {
  return item.translations[lang] ?? item.translations.it;
}

export function getItemsByCategory(categoryId: string): MenuItemFull[] {
  return items.filter((i) => i.categoryId === categoryId);
}

export function formatPrice(eur: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(eur);
}
