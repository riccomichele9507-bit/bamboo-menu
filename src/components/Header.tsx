import { LangSwitcher } from "./LangSwitcher";
import type { Lang } from "../lib/menu-data";

type Props = {
  lang: Lang;
  onLangChange: (l: Lang) => void;
};

export function Header({ lang, onLangChange }: Props) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(11,14,12,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(201,162,90,0.15)",
        padding: "0 16px",
      }}
    >
      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "22px",
              fontWeight: 500,
              color: "#c9a25a",
              letterSpacing: "0.04em",
            }}
          >
            Bamboo
          </span>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              fontWeight: 400,
              color: "rgba(243,238,226,0.45)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Cocktail Bar · Lecce
          </span>
        </div>

        {/* Language switcher */}
        <LangSwitcher current={lang} onChange={onLangChange} />
      </div>
    </header>
  );
}
