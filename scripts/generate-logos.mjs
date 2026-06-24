/**
 * Generates KINEXIS Digital logo files as WebP images.
 * Run with: node scripts/generate-logos.mjs
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outputDir = join(__dirname, "..", "public", "assets", "logos");

await mkdir(outputDir, { recursive: true });

// ─── Brand tokens ────────────────────────────────────────────────────────────
const CYAN = "#00d4ff";
const BLUE = "#0088ff";
const WHITE = "#ffffff";

// ─── SVG helpers ─────────────────────────────────────────────────────────────

/**
 * Icon mark — flat-top hexagon frame + geometric K letterform.
 * Designed on a 280×280 canvas (2× retina, displayed at 140×140 in footer).
 */
const iconSvg = `<svg width="280" height="280" viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${BLUE}"/>
      <stop offset="100%" stop-color="${CYAN}"/>
    </linearGradient>
    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${BLUE}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${CYAN}" stop-opacity="0.18"/>
    </linearGradient>
  </defs>

  <!-- Hexagonal glow fill -->
  <polygon
    points="140,18 242,78 242,198 140,258 38,198 38,78"
    fill="url(#g2)"
  />

  <!-- Hexagonal border -->
  <polygon
    points="140,18 242,78 242,198 140,258 38,198 38,78"
    fill="none"
    stroke="url(#g1)"
    stroke-width="2.5"
    opacity="0.7"
  />

  <!-- Corner accent dots -->
  <circle cx="140" cy="18"  r="4" fill="url(#g1)" opacity="0.9"/>
  <circle cx="242" cy="78"  r="4" fill="url(#g1)" opacity="0.9"/>
  <circle cx="242" cy="198" r="4" fill="url(#g1)" opacity="0.9"/>
  <circle cx="140" cy="258" r="4" fill="url(#g1)" opacity="0.9"/>
  <circle cx="38"  cy="198" r="4" fill="url(#g1)" opacity="0.9"/>
  <circle cx="38"  cy="78"  r="4" fill="url(#g1)" opacity="0.9"/>

  <!-- K letterform (stem + two arms) -->
  <g stroke="url(#g1)" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <!-- Stem -->
    <line x1="94" y1="82" x2="94" y2="198"/>
    <!-- Upper arm -->
    <line x1="94" y1="140" x2="176" y2="82"/>
    <!-- Lower arm -->
    <line x1="94" y1="140" x2="176" y2="198"/>
  </g>
</svg>`;

/**
 * Full wordmark — compact icon mark (left) + "KINEXIS" bold + "DIGITAL" label.
 * Designed on a 360×64 canvas (2× retina, displayed at 180×32 in header).
 */
const fullLogoSvg = `<svg width="360" height="64" viewBox="0 0 360 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${BLUE}"/>
      <stop offset="100%" stop-color="${CYAN}"/>
    </linearGradient>
    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${BLUE}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="${CYAN}" stop-opacity="0.15"/>
    </linearGradient>
  </defs>

  <!-- ─── Icon mark (60×60, centered vertically at y=32) ─── -->
  <!-- Hexagon scaled to fit 60×60 -->
  <polygon
    points="30,3 55,17 55,47 30,61 5,47 5,17"
    fill="url(#g2)"
  />
  <polygon
    points="30,3 55,17 55,47 30,61 5,47 5,17"
    fill="none"
    stroke="url(#g1)"
    stroke-width="1.2"
    opacity="0.75"
  />

  <!-- Corner dots (small) -->
  <circle cx="30" cy="3"  r="1.5" fill="url(#g1)" opacity="0.9"/>
  <circle cx="55" cy="17" r="1.5" fill="url(#g1)" opacity="0.9"/>
  <circle cx="55" cy="47" r="1.5" fill="url(#g1)" opacity="0.9"/>
  <circle cx="30" cy="61" r="1.5" fill="url(#g1)" opacity="0.9"/>
  <circle cx="5"  cy="47" r="1.5" fill="url(#g1)" opacity="0.9"/>
  <circle cx="5"  cy="17" r="1.5" fill="url(#g1)" opacity="0.9"/>

  <!-- K letterform (scaled) -->
  <g stroke="url(#g1)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <line x1="19" y1="17" x2="19" y2="47"/>
    <line x1="19" y1="32" x2="40" y2="17"/>
    <line x1="19" y1="32" x2="40" y2="47"/>
  </g>

  <!-- ─── "KINEXIS" wordmark ─── -->
  <text
    x="70"
    y="43"
    font-family="Arial Black, Arial, Helvetica, sans-serif"
    font-weight="900"
    font-size="31"
    fill="${WHITE}"
    letter-spacing="1.5"
  >KINEXIS</text>

  <!-- ─── "DIGITAL" sub-label ─── -->
  <text
    x="72"
    y="60"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="400"
    font-size="11"
    fill="${CYAN}"
    letter-spacing="8"
    opacity="0.85"
  >DIGITAL</text>
</svg>`;

// ─── Convert SVG → WebP ───────────────────────────────────────────────────────

async function svgToWebp(svgString, outputPath, label) {
  const buffer = Buffer.from(svgString);
  await sharp(buffer, { density: 144 })
    .webp({ quality: 95, lossless: true })
    .toFile(outputPath);
  console.log(`✓ Generated ${label}`);
}

const iconPath = join(outputDir, "KINEXIS_icon_logo.webp");
const fullPath = join(outputDir, "KINEXIS_logo_full.webp");

try {
  await svgToWebp(iconSvg, iconPath, "KINEXIS_icon_logo.webp (280×280)");
  await svgToWebp(fullLogoSvg, fullPath, "KINEXIS_logo_full.webp (360×64)");
  console.log("\n✅ Both logo files written to public/assets/logos/");
} catch (err) {
  if (err.message?.includes("Input file is missing") || err.message?.includes("SVG")) {
    console.error("⚠  sharp SVG support unavailable on this build.");
    console.error("   Falling back: writing .svg files and updating code references.");
    // Write raw SVG files as fallback
    const { writeFile } = await import("fs/promises");
    const svgIconPath = join(outputDir, "KINEXIS_icon_logo.svg");
    const svgFullPath = join(outputDir, "KINEXIS_logo_full.svg");
    await writeFile(svgIconPath, iconSvg, "utf8");
    await writeFile(svgFullPath, fullLogoSvg, "utf8");
    console.log("✓ Wrote KINEXIS_icon_logo.svg");
    console.log("✓ Wrote KINEXIS_logo_full.svg");
    console.log('\nUpdate code to reference .svg instead of .webp, or install @resvg/resvg-js for webp conversion.');
  } else {
    throw err;
  }
}
