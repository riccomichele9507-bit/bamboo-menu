import { LANGS, LANG_LABELS, type Lang } from "../lib/menu-data";

type Props = {
  current: Lang;
  onChange: (l: Lang) => void;
};

export function LangSwitcher({ current, onChange }: Props) {
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      {LANGS.map((l) => {
        const label = LANG_LABELS[l];
        const isActive = l === current;
        return (
          <button
            key={l}
            onClick={() => onChange(l)}
            aria-label={label.native}
            title={label.native}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 8px",
              borderRadius: "999px",
              border: isActive ? "1px solid #c9a25a" : "1px solid rgba(201,162,90,0.25)",
              background: isActive ? "rgba(201,162,90,0.15)" : "transparent",
              color: isActive ? "#c9a25a" : "rgba(243,238,226,0.55)",
              fontSize: "12px",
              fontFamily: "Inter, sans-serif",
              fontWeight: isActive ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.15s ease",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: "15px", lineHeight: 1 }}>{label.flag}</span>
            <span
              style={{
                display: window.innerWidth < 380 ? "none" : "inline",
              }}
            >
              {l.toUpperCase()}
            </span>
          </button>
        );
      })}
    </div>
  );
}
