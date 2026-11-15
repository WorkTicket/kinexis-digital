/**
 * Build dedicated 1200×630 social preview cards under public/og/.
 * Run: node scripts/generate-og-images.mjs
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const OUT = "public/og";
const W = 1200;
const H = 630;

const CARDS = [
  { file: "home", hero: "public/assets/heroes/01-homepage-960.webp", title: "Contractor websites", sub: "From $97/mo · free homepage preview" },
  { file: "pricing", hero: "public/assets/heroes/06-pricing-960.webp", title: "Simple website pricing", sub: "Four plans · $0 down · cancel anytime" },
  { file: "portfolio", hero: "public/assets/heroes/02-portfolio-960.webp", title: "Web design portfolio", sub: "Live client sites and design work" },
  { file: "web-design", hero: "public/assets/heroes/07-web-design-960.webp", title: "Contractor web design", sub: "See a free homepage preview first" },
  { file: "seo-services", hero: "public/assets/heroes/08-local-seo-960.webp", title: "SEO for service businesses", sub: "Clear structure that helps calls" },
  { file: "industries", hero: "public/assets/heroes/01-homepage-960.webp", title: "Websites by trade", sub: "Plumbing, HVAC, electrical, and more" },
  { file: "about", hero: "public/assets/heroes/03-about-960.webp", title: "About Kinexis Digital", sub: "Websites for local service businesses" },
  { file: "contact", hero: "public/assets/heroes/13-contact-960.webp", title: "Talk with Kinexis", sub: "Free homepage preview · no card" },
  { file: "audit", hero: "public/assets/heroes/09-website-audit-960.webp", title: "Free website audit", sub: "SEO, speed, mobile, and conversion" },
  { file: "website-management", hero: "public/assets/heroes/10-maintenance-960.webp", title: "Website management", sub: "Hosting, updates, and direct help" },
  { file: "faqs", hero: "public/assets/heroes/11-faqs-960.webp", title: "Website plan FAQs", sub: "Pricing, ownership, and launch timing" },
  { file: "blog", hero: "public/assets/heroes/12-blog-960.webp", title: "Web design & SEO guides", sub: "Practical resources for owners" },
  { file: "reviews", hero: "public/assets/heroes/05-reviews-960.webp", title: "Client reviews", sub: "What local owners say about Kinexis" },
  { file: "upgrades", hero: "public/assets/heroes/14-upgrades-960.webp", title: "Website add-ons", sub: "Extra pages and ongoing site care" },
  { file: "services", hero: "public/assets/heroes/07-web-design-960.webp", title: "Web design, SEO & care", sub: "Services for local businesses" },
  { file: "strategy-call", hero: "public/assets/heroes/13-contact-960.webp", title: "Book a strategy call", sub: "Find the plan that fits your business" },
  { file: "tools", hero: "public/assets/heroes/01-homepage-960.webp", title: "Free business tools", sub: "Calculators and review link helpers" },
];

function escapeXml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function overlaySvg(title, sub) {
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#031b4e"/>
      <stop offset="100%" stop-color="#0b3dff"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="560" height="${H}" fill="url(#panel)"/>
  <rect x="40" y="48" width="18" height="18" fill="#ff6a00"/>
  <text x="70" y="64" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700">Kinexis Digital</text>
  <text x="40" y="280" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="800">${escapeXml(title)}</text>
  <text x="40" y="340" fill="#bfe9ff" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="600">${escapeXml(sub)}</text>
  <rect x="40" y="520" width="180" height="44" rx="8" fill="#ff6a00"/>
  <text x="58" y="549" fill="#031b4e" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="800">kinexisdigital.com</text>
</svg>`);
}

await mkdir(OUT, { recursive: true });

for (const card of CARDS) {
  const hero = await readFile(card.hero);
  const art = await sharp(hero)
    .resize(720, H, { fit: "cover", position: "centre" })
    .webp({ quality: 88, effort: 5 })
    .toBuffer();

  const base = await sharp({
    create: { width: W, height: H, channels: 3, background: { r: 3, g: 27, b: 78 } },
  })
    .composite([{ input: art, left: 480, top: 0 }])
    .png()
    .toBuffer();

  const out = await sharp(base)
    .composite([{ input: overlaySvg(card.title, card.sub), left: 0, top: 0 }])
    .webp({ quality: 90, effort: 5 })
    .toBuffer();

  const dest = path.join(OUT, `${card.file}.webp`);
  await writeFile(dest, out);
  console.log(`OK  ${dest} (${Math.round(out.length / 1024)} KB)`);
}

console.log(`\nGenerated ${CARDS.length} OG cards in ${OUT}/`);
