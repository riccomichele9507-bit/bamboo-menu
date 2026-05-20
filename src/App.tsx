import { useState } from "react";
import { Header } from "./components/Header";
import { CategoryNav } from "./components/CategoryNav";
import { CategorySection } from "./components/CategorySection";
import { LanguageLanding } from "./components/LanguageLanding";
import { categories } from "./lib/menu-data";
import { useLang } from "./lib/useLang";
import { ui } from "./lib/i18n";
import type { Lang } from "./lib/menu-data";

/** Returns true if a language is already known (URL param OR localStorage). */
function langAlreadyKnown(): boolean {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get("lang");
  if (urlLang) return true;
  const saved = localStorage.getItem("bamboo_lang");
  if (saved) return true;
  return false;
}

export function App() {
  const { lang, setLang } = useLang();
  const strings = ui[lang];

  // Show landing only when no language has been chosen/inferred from URL or storage.
  const [hasChosenLang, setHasChosenLang] = useState<boolean>(langAlreadyKnown);

  function handleLangChoose(l: Lang) {
    setLang(l);
    setHasChosenLang(true);
  }

  if (!hasChosenLang) {
    return <LanguageLanding onChoose={handleLangChoose} />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0e0c",
        color: "#f3eee2",
      }}
    >
      <Header lang={lang} onLangChange={setLang} />
      <CategoryNav lang={lang} />

      {/* Hero strip */}
      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        <div
          style={{
            height: "180px",
            borderRadius: "16px",
            overflow: "hidden",
            margin: "16px 0 24px",
            position: "relative",
            background: "linear-gradient(135deg, #1a1f1c 0%, #0b0e0c 100%)",
            border: "1px solid rgba(201,162,90,0.15)",
          }}
        >
          <img
            src="/img/hero.jpg"
            alt="Bamboo Cocktail Bar"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.7,
              display: "block",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(11,14,12,0.85) 0%, rgba(11,14,12,0.2) 60%, transparent 100%)",
            }}
          />
          {/* Brand overlay text */}
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "20px",
              right: "20px",
            }}
          >
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "36px",
                fontWeight: 500,
                color: "#c9a25a",
                lineHeight: 1,
                letterSpacing: "0.06em",
              }}
            >
              Bamboo
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                color: "rgba(243,238,226,0.6)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginTop: "4px",
              }}
            >
              {strings.tagline}
            </div>
          </div>
        </div>

        {/* Menu sections */}
        <main style={{ paddingBottom: "48px" }}>
          {categories.map((cat) => (
            <CategorySection key={cat.id} category={cat} lang={lang} />
          ))}
        </main>

        {/* Footer */}
        <footer
          style={{
            borderTop: "1px solid rgba(201,162,90,0.15)",
            padding: "28px 0 48px",
            textAlign: "center",
          }}
        >
          {/* Brand */}
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "20px",
              fontStyle: "italic",
              color: "rgba(201,162,90,0.7)",
              marginBottom: "16px",
            }}
          >
            Bamboo · Lecce
          </div>

          {/* Address */}
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              color: "rgba(243,238,226,0.55)",
              margin: "0 0 6px",
              letterSpacing: "0.04em",
            }}
          >
            {strings.address}
          </p>

          {/* Hours */}
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              color: "rgba(243,238,226,0.45)",
              margin: "0 0 20px",
              letterSpacing: "0.03em",
            }}
          >
            <span
              style={{
                color: "rgba(201,162,90,0.6)",
                marginRight: "6px",
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {strings.hoursLabel}
            </span>
            {strings.hours}
          </p>

          {/* Disclaimer */}
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "11px",
              color: "rgba(243,238,226,0.25)",
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            {strings.disclaimer}
          </p>
        </footer>
      </div>
    </div>
  );
}
