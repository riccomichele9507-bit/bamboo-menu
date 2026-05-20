# Bamboo Menu

Mobile-first multilingual QR menu for **Bamboo Cocktail Bar, Lecce**.
Built with Vite + React + TypeScript. Static SPA — deploys to Vercel in one click.

---

## What it is

A QR menu scannable at the table. Customers scan a QR code, land on the menu in Italian (default), and can switch to **EN / FR / DE** via the sticky header. Language is persisted in localStorage and reflected in the URL (`?lang=en`), so a QR code can deep-link directly to a specific language.

---

## Local dev

```bash
cd "C:\Users\Notebook Lenovo\Desktop\bamboo-menu"
npm install
npm run dev        # starts at http://localhost:5173
```

---

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

---

## Deploy to Vercel

1. Push the project to a GitHub repository (or use Vercel CLI).
2. Import the repo in [vercel.com](https://vercel.com).
3. Vercel auto-detects Vite — no config needed (vercel.json handles SPA routing).
4. After deploy, copy your Vercel URL (e.g. `https://bamboo-menu.vercel.app`).

---

## Generate QR code

After you have the real Vercel URL:

1. Open `scripts/generate-qr.mjs` and update `MENU_URL`:
   ```js
   const MENU_URL = "https://your-real-url.vercel.app/";
   ```
2. Run:
   ```bash
   npm run generate-qr
   ```
3. Files are written to `public/qr/`:
   - `bamboo-qr.svg` — branded poster (print-ready)
   - `bamboo-qr.png` — standalone QR (1200px)

The SVG poster is the main deliverable for printing at the table. Open it in a browser and use Print > Save as PDF for a high-res export.

---

## How to change menu content

Menu items and categories live in **`src/lib/menu-data.ts`**:

- Add/remove items in the `items` array
- Each item has a `translations` object with keys `it | en | fr | de`
- Set `priceEur` to update prices
- Set `imageFile` to the filename inside `public/img/` (or omit for emoji placeholder)

UI strings (tagline, disclaimer, etc.) are in **`src/lib/i18n.ts`**.

---

## Languages

Implemented: **IT (default), EN, FR, DE**

All translations are inline in `src/lib/menu-data.ts` — no external service needed.
Language is read from URL param `?lang=xx` → localStorage → browser preference → Italian fallback.

---

## Project structure

```
bamboo-menu/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── vercel.json
├── package.json
├── README.md
├── scripts/
│   └── generate-qr.mjs     # QR poster generator
├── public/
│   ├── favicon.svg
│   ├── img/                 # dish photos (copied from bamboo-lecce)
│   └── qr/                  # generated QR output (git-ignore optional)
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── lib/
    │   ├── menu-data.ts     # categories, items, translations, helpers
    │   ├── i18n.ts          # UI strings per language
    │   └── useLang.ts       # URL param + localStorage language hook
    └── components/
        ├── Header.tsx
        ├── LangSwitcher.tsx
        ├── CategoryNav.tsx
        ├── CategorySection.tsx
        └── MenuItemCard.tsx
```
