import { useState } from "react";
import {
  formatPrice,
  getItemTranslation,
  type Lang,
  type MenuItemFull,
} from "../lib/menu-data";

type Props = {
  item: MenuItemFull;
  lang: Lang;
};

const PLACEHOLDER_EMOJIS: Record<string, string> = {
  mangiare: "🍽️",
  bere: "🍸",
};

export function MenuItemCard({ item, lang }: Props) {
  const tr = getItemTranslation(item, lang);
  const [imgError, setImgError] = useState(false);
  const imgSrc = item.imageFile ? `/img/${item.imageFile}` : null;
  const showImg = imgSrc && !imgError;
  const emoji = PLACEHOLDER_EMOJIS[item.categoryId] ?? "🍽️";

  return (
    <article
      style={{
        display: "flex",
        gap: "14px",
        padding: "14px 0",
        borderBottom: "1px solid rgba(201,162,90,0.08)",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          flexShrink: 0,
          width: "80px",
          height: "80px",
          borderRadius: "12px",
          overflow: "hidden",
          background: showImg
            ? "transparent"
            : "linear-gradient(135deg, rgba(201,162,90,0.12) 0%, rgba(11,14,12,0.8) 100%)",
          border: "1px solid rgba(201,162,90,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {showImg ? (
          <img
            src={imgSrc}
            alt={tr.name}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <span style={{ fontSize: "32px", lineHeight: 1, opacity: 0.6 }}>{emoji}</span>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "18px",
              fontWeight: 500,
              color: "#f3eee2",
              margin: 0,
              lineHeight: 1.2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1,
            }}
          >
            {tr.name}
          </h3>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "17px",
              fontWeight: 600,
              color: "#c9a25a",
              whiteSpace: "nowrap",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatPrice(item.priceEur)}
          </span>
        </div>

        {tr.description && (
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontWeight: 300,
              color: "rgba(243,238,226,0.6)",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {tr.description}
          </p>
        )}
      </div>
    </article>
  );
}
