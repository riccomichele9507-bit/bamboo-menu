/**
 * Generate a branded QR code poster for Bamboo menu.
 * Output: public/qr/bamboo-qr.svg + public/qr/bamboo-qr.png
 *
 * Usage: npm run generate-qr
 * Update MENU_URL below after Vercel deploy.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

// ← UPDATE THIS after deploying to Vercel
const MENU_URL = "https://bamboo-menu.vercel.app/";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "qr");
const OUT_SVG = path.join(OUT_DIR, "bamboo-qr.svg");
const OUT_PNG = path.join(OUT_DIR, "bamboo-qr.png");

// Brand colours
const BG = "#0b0e0c";
const GOLD = "#c9a25a";
const TEXT = "#f3eee2";
const TEXT_DIM = "rgba(243,238,226,0.55)";

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Generate QR as SVG string — high error correction so logo can overlay later
  const qrSvg = await QRCode.toString(MENU_URL, {
    type: "svg",
    errorCorrectionLevel: "H",
    margin: 0,
    color: {
      dark: GOLD,
      light: "#00000000", // transparent
    },
  });

  // Extract inner SVG content + viewBox dimensions
  const innerMatch = qrSvg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  const qrInner = innerMatch ? innerMatch[1] : qrSvg;
  const viewBoxMatch = qrSvg.match(/viewBox="0 0 (\d+) (\d+)"/);
  const qrSize = viewBoxMatch ? parseInt(viewBoxMatch[1], 10) : 33;

  // Poster layout
  const W = 800;
  const H = 1050;
  const QR_BOX = 500;
  const QR_X = (W - QR_BOX) / 2;
  const QR_Y = 280;
  const qrScale = QR_BOX / qrSize;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <radialGradient id="glow" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
    <filter id="blur-sm">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- Outer border -->
  <rect x="24" y="24" width="${W - 48}" height="${H - 48}" fill="none"
        stroke="${GOLD}" stroke-opacity="0.2" stroke-width="1" rx="4"/>

  <!-- Decorative top line -->
  <line x1="80" y1="80" x2="${W - 80}" y2="80"
        stroke="${GOLD}" stroke-opacity="0.15" stroke-width="0.8"/>

  <!-- Brand name -->
  <text x="${W / 2}" y="155"
        text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="72" font-weight="400"
        fill="${GOLD}" letter-spacing="8">
    Bamboo
  </text>

  <!-- Tagline -->
  <text x="${W / 2}" y="195"
        text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif"
        font-size="14" font-weight="400" letter-spacing="6"
        fill="${TEXT_DIM}">
    COCKTAIL BAR · LECCE
  </text>

  <!-- Divider dots -->
  <g transform="translate(${W / 2}, 235)">
    <circle cx="-24" cy="0" r="2" fill="${GOLD}" fill-opacity="0.5"/>
    <circle cx="0" cy="0" r="3" fill="${GOLD}"/>
    <circle cx="24" cy="0" r="2" fill="${GOLD}" fill-opacity="0.5"/>
  </g>

  <!-- QR background panel -->
  <rect x="${QR_X - 20}" y="${QR_Y - 20}" width="${QR_BOX + 40}" height="${QR_BOX + 40}"
        fill="rgba(201,162,90,0.05)" rx="12"
        stroke="${GOLD}" stroke-opacity="0.2" stroke-width="1"/>

  <!-- QR code -->
  <g transform="translate(${QR_X} ${QR_Y}) scale(${qrScale})">
    ${qrInner}
  </g>

  <!-- Corner accents -->
  <line x1="${QR_X - 20}" y1="${QR_Y - 20}" x2="${QR_X + 24}" y2="${QR_Y - 20}"
        stroke="${GOLD}" stroke-width="2"/>
  <line x1="${QR_X - 20}" y1="${QR_Y - 20}" x2="${QR_X - 20}" y2="${QR_Y + 24}"
        stroke="${GOLD}" stroke-width="2"/>
  <line x1="${QR_X + QR_BOX + 20}" y1="${QR_Y - 20}" x2="${QR_X + QR_BOX - 24}" y2="${QR_Y - 20}"
        stroke="${GOLD}" stroke-width="2"/>
  <line x1="${QR_X + QR_BOX + 20}" y1="${QR_Y - 20}" x2="${QR_X + QR_BOX + 20}" y2="${QR_Y + 24}"
        stroke="${GOLD}" stroke-width="2"/>
  <line x1="${QR_X - 20}" y1="${QR_Y + QR_BOX + 20}" x2="${QR_X + 24}" y2="${QR_Y + QR_BOX + 20}"
        stroke="${GOLD}" stroke-width="2"/>
  <line x1="${QR_X - 20}" y1="${QR_Y + QR_BOX + 20}" x2="${QR_X - 20}" y2="${QR_Y + QR_BOX - 24}"
        stroke="${GOLD}" stroke-width="2"/>
  <line x1="${QR_X + QR_BOX + 20}" y1="${QR_Y + QR_BOX + 20}" x2="${QR_X + QR_BOX - 24}" y2="${QR_Y + QR_BOX + 20}"
        stroke="${GOLD}" stroke-width="2"/>
  <line x1="${QR_X + QR_BOX + 20}" y1="${QR_Y + QR_BOX + 20}" x2="${QR_X + QR_BOX + 20}" y2="${QR_Y + QR_BOX - 24}"
        stroke="${GOLD}" stroke-width="2"/>

  <!-- CTA — main line -->
  <text x="${W / 2}" y="${QR_Y + QR_BOX + 72}"
        text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="28" font-style="italic" font-weight="400"
        fill="${TEXT}">
    Scansiona per il menu
  </text>

  <!-- CTA — multilingual -->
  <text x="${W / 2}" y="${QR_Y + QR_BOX + 106}"
        text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif"
        font-size="13" font-weight="300"
        fill="${TEXT_DIM}" letter-spacing="1">
    Scan the menu · Scanne le menu · Menü scannen
  </text>

  <!-- Divider -->
  <line x1="${W / 2 - 80}" y1="${H - 80}" x2="${W / 2 + 80}" y2="${H - 80}"
        stroke="${GOLD}" stroke-opacity="0.15" stroke-width="0.8"/>

  <!-- URL hint -->
  <text x="${W / 2}" y="${H - 50}"
        text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif"
        font-size="11" font-weight="400" letter-spacing="1"
        fill="${TEXT_DIM}">
    bamboo-menu.vercel.app
  </text>
</svg>`;

  fs.writeFileSync(OUT_SVG, svg, "utf8");
  console.log(`SVG generated: ${OUT_SVG}`);

  // Try to generate PNG using qrcode's built-in canvas (node-canvas optional)
  try {
    const qrBuffer = await QRCode.toBuffer(MENU_URL, {
      errorCorrectionLevel: "H",
      width: 1200,
      margin: 2,
      color: { dark: GOLD, light: BG },
    });
    fs.writeFileSync(OUT_PNG, qrBuffer);
    console.log(`PNG generated (QR only, 1200px): ${OUT_PNG}`);
    console.log("  Tip: for the full poster PNG, open bamboo-qr.svg in a browser and print/export.");
  } catch {
    console.log("PNG poster generation skipped (canvas not available).");
    console.log("  Use the SVG directly or open it in a browser to export PNG.");
  }

  console.log(`\nURL embedded: ${MENU_URL}`);
  console.log("Update MENU_URL in scripts/generate-qr.mjs after Vercel deploy and re-run.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
