import { LANGS, LANG_LABELS, type Lang } from "../lib/menu-data";

type Props = {
  onChoose: (l: Lang) => void;
};

export function LanguageLanding({ onChoose }: Props) {
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#0b0e0c",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 24px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial glow behind brand */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,162,90,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Outer border frame */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "20px",
          border: "1px solid rgba(201,162,90,0.12)",
          borderRadius: "4px",
          pointerEvents: "none",
        }}
      />

      {/* Brand block */}
      <div style={{ textAlign: "center", marginBottom: "48px", zIndex: 1 }}>
        {/* Decorative line + dot */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "1px",
              background: "rgba(201,162,90,0.35)",
            }}
          />
          <div
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "#c9a25a",
            }}
          />
          <div
            style={{
              width: "48px",
              height: "1px",
              background: "rgba(201,162,90,0.35)",
            }}
          />
        </div>

        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(52px, 14vw, 80px)",
            fontWeight: 500,
            color: "#c9a25a",
            letterSpacing: "0.07em",
            lineHeight: 1,
            marginBottom: "10px",
          }}
        >
          Bamboo
        </div>

        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            fontWeight: 400,
            color: "rgba(243,238,226,0.45)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginBottom: "36px",
          }}
        >
          Cocktail Bar &middot; Lecce
        </div>

        {/* Prompt — all four languages */}
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
            fontWeight: 400,
            color: "rgba(243,238,226,0.55)",
            letterSpacing: "0.03em",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Scegli la lingua &middot; Choose your language
          <br />
          Choisissez la langue &middot; Sprache w&auml;hlen
        </p>
      </div>

      {/* Language buttons */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: "100%",
          maxWidth: "320px",
          zIndex: 1,
        }}
      >
        {LANGS.map((l) => {
          const label = LANG_LABELS[l];
          return (
            <button
              key={l}
              onClick={() => onChoose(l)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "16px 24px",
                borderRadius: "8px",
                border: "1px solid rgba(201,162,90,0.25)",
                background: "rgba(201,162,90,0.04)",
                color: "#f3eee2",
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                letterSpacing: "0.03em",
                cursor: "pointer",
                transition: "all 0.18s ease",
                outline: "none",
                WebkitTapHighlightColor: "transparent",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(201,162,90,0.12)";
                el.style.borderColor = "rgba(201,162,90,0.55)";
                el.style.color = "#c9a25a";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(201,162,90,0.04)";
                el.style.borderColor = "rgba(201,162,90,0.25)";
                el.style.color = "#f3eee2";
              }}
            >
              <span style={{ fontSize: "22px", lineHeight: 1 }}>
                {label.flag}
              </span>
              <span>{label.native}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom address hint */}
      <div
        style={{
          position: "absolute",
          bottom: "36px",
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "Inter, sans-serif",
          fontSize: "10px",
          color: "rgba(243,238,226,0.2)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        Via Michelangelo Schipa, 2 &middot; 73100 Lecce
      </div>
    </div>
  );
}
