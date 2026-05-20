/**
 * Genera due poster QR brandizzati per Bamboo Cocktail Bar · Lecce.
 *
 * Variante "dark"   (notturno): sfondo #0b0e0c, oro #c9a25a, testo off-white
 * Variante "bamboo" (naturale): sfondo crema #f3efe3, verde #3f7d3a, toni legno
 *
 * Output in public/qr/:
 *   bamboo-menu-qr-dark.svg   bamboo-menu-qr-dark.png
 *   bamboo-menu-qr-bamboo.svg bamboo-menu-qr-bamboo.png
 *
 * Usage: npm run generate-qr
 *
 * ← UPDATE THIS constant after Vercel deploy:
 */
const MENU_URL = "https://bamboo-menu.vercel.app/";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "qr");

// Poster dimensions (vertical, A4-ish ratio)
const W = 800;
const H = 1120;
const QR_BOX = 480;
const QR_X = (W - QR_BOX) / 2;
const QR_Y = 300;
// Print PNG width (≈ 300 DPI on A4-width)
const PRINT_WIDTH = 2400;

// ─── Palette definitions ────────────────────────────────────────────────────

const VARIANTS = {
  dark: {
    name: "dark",
    bg: "#0b0e0c",
    bgPanel: "rgba(201,162,90,0.05)",
    accent: "#c9a25a",
    accentDim: "rgba(201,162,90,0.35)",
    accentFaint: "rgba(201,162,90,0.15)",
    text: "#f3eee2",
    textDim: "rgba(243,238,226,0.55)",
    textFaint: "rgba(243,238,226,0.28)",
    qrDark: "#c9a25a",    // QR modules colour
    qrLight: "#00000000", // transparent — bg shows through
  },
  bamboo: {
    name: "bamboo",
    bg: "#f3efe3",
    bgPanel: "rgba(63,125,58,0.06)",
    accent: "#3f7d3a",
    accentDim: "rgba(63,125,58,0.4)",
    accentFaint: "rgba(63,125,58,0.15)",
    text: "#1c2b1a",
    textDim: "rgba(28,43,26,0.60)",
    textFaint: "rgba(28,43,26,0.32)",
    qrDark: "#2a5227",    // deep bamboo green for QR modules
    qrLight: "#00000000",
  },
};

// ─── SVG builder ────────────────────────────────────────────────────────────

function buildPosterSVG(theme, qrInner, qrSize) {
  const qrScale = QR_BOX / qrSize;
  const {
    bg, bgPanel, accent, accentDim, accentFaint,
    text, textDim, textFaint,
  } = theme;

  // Glow gradient id must be unique per variant to avoid SVG conflicts
  const glowId = `glow_${theme.name}`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <radialGradient id="${glowId}" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.09"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="${bg}"/>
  <rect width="${W}" height="${H}" fill="url(#${glowId})"/>

  <!-- Outer frame -->
  <rect x="22" y="22" width="${W - 44}" height="${H - 44}"
        fill="none" stroke="${accent}" stroke-opacity="0.18" stroke-width="1" rx="3"/>
  <!-- Inner frame hairline -->
  <rect x="32" y="32" width="${W - 64}" height="${H - 64}"
        fill="none" stroke="${accent}" stroke-opacity="0.08" stroke-width="0.6" rx="2"/>

  <!-- Top decorative rule -->
  <line x1="80" y1="80" x2="${W - 80}" y2="80"
        stroke="${accent}" stroke-opacity="0.2" stroke-width="0.8"/>

  <!-- Eyebrow: decorative dots + subtitle -->
  <g transform="translate(${W / 2}, 118)" text-anchor="middle">
    <line x1="-90" y1="0" x2="-16" y2="0"
          stroke="${accent}" stroke-opacity="0.35" stroke-width="1"/>
    <circle cx="0" cy="0" r="3" fill="${accent}"/>
    <line x1="16" y1="0" x2="90" y2="0"
          stroke="${accent}" stroke-opacity="0.35" stroke-width="1"/>
  </g>

  <!-- Main brand title -->
  <text x="${W / 2}" y="220"
        text-anchor="middle"
        font-family="Georgia, 'Palatino Linotype', 'Times New Roman', serif"
        font-size="88" font-weight="400" letter-spacing="6"
        fill="${accent}">
    Bamboo
  </text>

  <!-- Tagline -->
  <text x="${W / 2}" y="262"
        text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif"
        font-size="13" font-weight="400" letter-spacing="7"
        fill="${textDim}">
    COCKTAIL BAR · LECCE
  </text>

  <!-- Divider dots -->
  <g transform="translate(${W / 2}, 284)">
    <circle cx="-20" cy="0" r="2" fill="${accent}" fill-opacity="0.45"/>
    <circle cx="0"   cy="0" r="3" fill="${accent}"/>
    <circle cx="20"  cy="0" r="2" fill="${accent}" fill-opacity="0.45"/>
  </g>

  <!-- QR panel background -->
  <rect x="${QR_X - 22}" y="${QR_Y - 22}"
        width="${QR_BOX + 44}" height="${QR_BOX + 44}"
        fill="${bgPanel}" rx="14"
        stroke="${accent}" stroke-opacity="0.22" stroke-width="1"/>

  <!-- QR code (scaled) -->
  <g transform="translate(${QR_X} ${QR_Y}) scale(${qrScale})">
    ${qrInner}
  </g>

  <!-- Corner accent lines around QR panel -->
  <!-- Top-left -->
  <line x1="${QR_X - 22}" y1="${QR_Y - 22}" x2="${QR_X + 28}" y2="${QR_Y - 22}"
        stroke="${accent}" stroke-width="2.5"/>
  <line x1="${QR_X - 22}" y1="${QR_Y - 22}" x2="${QR_X - 22}" y2="${QR_Y + 28}"
        stroke="${accent}" stroke-width="2.5"/>
  <!-- Top-right -->
  <line x1="${QR_X + QR_BOX + 22}" y1="${QR_Y - 22}" x2="${QR_X + QR_BOX - 28}" y2="${QR_Y - 22}"
        stroke="${accent}" stroke-width="2.5"/>
  <line x1="${QR_X + QR_BOX + 22}" y1="${QR_Y - 22}" x2="${QR_X + QR_BOX + 22}" y2="${QR_Y + 28}"
        stroke="${accent}" stroke-width="2.5"/>
  <!-- Bottom-left -->
  <line x1="${QR_X - 22}" y1="${QR_Y + QR_BOX + 22}" x2="${QR_X + 28}" y2="${QR_Y + QR_BOX + 22}"
        stroke="${accent}" stroke-width="2.5"/>
  <line x1="${QR_X - 22}" y1="${QR_Y + QR_BOX + 22}" x2="${QR_X - 22}" y2="${QR_Y + QR_BOX - 28}"
        stroke="${accent}" stroke-width="2.5"/>
  <!-- Bottom-right -->
  <line x1="${QR_X + QR_BOX + 22}" y1="${QR_Y + QR_BOX + 22}" x2="${QR_X + QR_BOX - 28}" y2="${QR_Y + QR_BOX + 22}"
        stroke="${accent}" stroke-width="2.5"/>
  <line x1="${QR_X + QR_BOX + 22}" y1="${QR_Y + QR_BOX + 22}" x2="${QR_X + QR_BOX + 22}" y2="${QR_Y + QR_BOX - 28}"
        stroke="${accent}" stroke-width="2.5"/>

  <!-- CTA — Italian (primary, serif italic) -->
  <text x="${W / 2}" y="${QR_Y + QR_BOX + 68}"
        text-anchor="middle"
        font-family="Georgia, 'Palatino Linotype', 'Times New Roman', serif"
        font-size="30" font-style="italic" font-weight="400"
        fill="${text}">
    Scansiona per il menu
  </text>

  <!-- CTA — multilingual (secondary, sans) -->
  <text x="${W / 2}" y="${QR_Y + QR_BOX + 100}"
        text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif"
        font-size="13" font-weight="300" letter-spacing="0.5"
        fill="${textDim}">
    Scan the menu · Scanne le menu · Men&#xFC; scannen
  </text>

  <!-- Bottom divider -->
  <line x1="${W / 2 - 72}" y1="${H - 88}" x2="${W / 2 + 72}" y2="${H - 88}"
        stroke="${accent}" stroke-opacity="0.18" stroke-width="0.8"/>

  <!-- Footer: address -->
  <text x="${W / 2}" y="${H - 62}"
        text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif"
        font-size="11" font-weight="400" letter-spacing="1.5"
        fill="${textFaint}">
    VIA MICHELANGELO SCHIPA, 2 · LECCE
  </text>

  <!-- Footer: URL hint -->
  <text x="${W / 2}" y="${H - 42}"
        text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif"
        font-size="10" font-weight="400" letter-spacing="1"
        fill="${textFaint}">
    bamboo-menu.vercel.app
  </text>
</svg>`;
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const [key, theme] of Object.entries(VARIANTS)) {
    console.log(`\nGenerating variant: ${key}`);

    // Build QR SVG string with theme-appropriate colours
    const qrSvg = await QRCode.toString(MENU_URL, {
      type: "svg",
      errorCorrectionLevel: "H",
      margin: 0,
      color: {
        dark: theme.qrDark,
        light: theme.qrLight,
      },
    });

    // Extract inner SVG content and QR module grid size
    const innerMatch = qrSvg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
    const qrInner = innerMatch ? innerMatch[1] : qrSvg;
    const viewBoxMatch = qrSvg.match(/viewBox="0 0 (\d+) (\d+)"/);
    const qrSize = viewBoxMatch ? parseInt(viewBoxMatch[1], 10) : 33;

    const svgContent = buildPosterSVG(theme, qrInner, qrSize);

    // Write SVG
    const svgPath = path.join(OUT_DIR, `bamboo-menu-qr-${key}.svg`);
    fs.writeFileSync(svgPath, svgContent, "utf8");
    console.log(`  SVG: ${svgPath}`);

    // Rasterize SVG → PNG via sharp (uses librsvg internally)
    const pngPath = path.join(OUT_DIR, `bamboo-menu-qr-${key}.png`);
    await sharp(Buffer.from(svgContent))
      .resize({ width: PRINT_WIDTH })
      .png({ quality: 100 })
      .toFile(pngPath);
    console.log(`  PNG: ${pngPath} (${PRINT_WIDTH}px wide)`);
  }

  console.log(`\nURL embedded: ${MENU_URL}`);
  console.log(
    "Update MENU_URL at the top of scripts/generate-qr.mjs after Vercel deploy and re-run.\n"
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
