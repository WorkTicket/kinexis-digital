import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [css, audit, siteAudit, proof, depth, depthData, artwork, ui, plans, stickers, site, privacy, esPrivacy, pages, footer, form, reviews, esPillars, costEn, pagesEn, costEs, pagesEs, costBuilder, pagesBuilder] = await Promise.all([
  "src/app/globals.css", "src/components/IndustryAudit.tsx", "src/components/SiteAudit.tsx",
  "src/components/IndustryProof.tsx", "src/components/IndustrySeoDepth.tsx", "src/data/industry-seo-depth.ts",
  "src/components/CampaignArtwork.tsx", "src/components/ui.tsx", "src/components/PlanOffer.tsx",
  "src/components/SpanishPlanSticker.tsx", "src/i18n/SpanishSite.tsx",
  "src/app/(en)/privacy/page.tsx", "src/i18n/SpanishSite.tsx", "src/lib/pages.ts",
  "src/components/Footer.tsx", "src/components/Form.tsx", "src/components/UnifiedReviewCard.tsx",
  "src/i18n/es-pillars.ts", "src/data/cost-post-bodies.ts", "src/data/pages-post-bodies.ts",
  "src/i18n/es-cost-bodies.ts", "src/i18n/es-pages-bodies.ts",
  "src/data/cost-post-bodies.ts", "src/data/pages-post-bodies.ts",
].map(read));

// M1: blog post grid tracks must be allowed to shrink below long content width.
assert.match(css, /\.blog-post\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/s);
assert.match(css, /\.blog-post\s*\{[^}]*min-width:\s*0/s);

// M2: do not request missing 480px portfolio crops in the live proof block.
assert.doesNotMatch(proof, /imageSrcSet\(site\.image,\s*\[[^\]]*\b480\b/);

// M3: audit artwork follows the current locale and the site-wide audit passes it through.
assert.match(audit, /website-audit-desktop\$\{suffix\}\.avif/);
assert.match(audit, /website-audit-mobile\$\{suffix\}\.webp/);
assert.match(siteAudit, /<IndustryAudit href=\{href\} locale=\{locale\}/);

// M4: Spanish proof has translated labels, notes, and does not expose English-only quotes.
assert.match(proof, /Encabezado local y teléfono/);
assert.match(proof, /Visitar sitio publicado/);
assert.match(proof, /Ver portafolio/);
assert.match(proof, /href=\{locale === "es" \? "\/es\/portfolio" : "\/portfolio"\}/);
assert.match(proof, /Página de inicio de \$\{site\.name\}/);
assert.match(proof, /quote && locale === "en"/);

// M5/M9: Spanish depth data is localized; English template nouns are grammatical.
assert.match(depth, /industryCostRows\(es\)/);
assert.match(depth, /industryDepthLinks\(industry\.slug,\s*industry\.name,\s*locale === "es"\)/);
assert.match(depth, /`\/es\$\{links\.(?:pages|cost)Href\}`/);
assert.match(depthData, /Plus \(Bilingüe\)/);
assert.match(depthData, /Full checklist: pages every \$\{trade\} website needs/);
assert.doesNotMatch(depthData, /what pages a \$\{name\.toLowerCase\(\)\}/);

// M6/NEW-4: Spanish page art avoids English overlays and Spanish offers replace English stickers.
assert.match(artwork, /campaign-page-art--text-free/);
assert.match(ui, /campaign-page-art--text-free/);
assert.match(site, /SPANISH_PLAN_STICKERS\.website\.offer/);
assert.match(plans, /stickers\[plan\.slug\] \?/);
assert.doesNotMatch(stickers, /planes-(?:sitio-web|sistema-clientes|hazlo-tuyo)/);
assert.doesNotMatch(site, /SPANISH_PLAN_STICKERS\[plan\.slug\]\.name/);

// M7: content grids and narrow buttons may wrap without increasing viewport width.
assert.match(css, /\.grid--2\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)\}/);
assert.match(css, /\.grid--3\{grid-template-columns:repeat\(3,minmax\(0,1fr\)\)\}/);
assert.match(css, /@media\s*\(max-width:\s*520px\)[\s\S]*?\.btn\{[^}]*white-space:\s*normal/);

// M8: catch known lower-case sentence starts in the Spanish guide source.
assert.doesNotMatch(esPillars, /\. una solicitud|<p>la solicitud/);

// S15/NEW-5/S17: hidden routes are unlinked from posts; privacy copy/date and localized pay path stay accurate.
for (const source of [costEn, pagesEn, costEs, pagesEs]) {
  assert.doesNotMatch(source, /<a href=(?:\\")?\/industries\/(?:pool-care|window-cleaning|yard-care)/);
}
assert.match(costBuilder, /hiddenIndustryRoute\s*\?\s*spec\.designAnchor/);
assert.match(pagesBuilder, /hiddenIndustryRoute\s*\?\s*label/);
assert.match(privacy, /does not set or read cookies/);
assert.match(privacy, /about one minute to limit abuse/);
assert.match(privacy, /Last updated November 20, 2026/);
assert.match(esPrivacy, /no crea ni lee cookies/);
assert.match(esPrivacy, /limitar el abuso de este endpoint/);
assert.match(esPrivacy, /Actualizada el 20 de noviembre de 2026/);
assert.match(pages, /updatedAt:\s*"2026-11-20"/);
assert.match(site, /href=\{withLocale\(locale,\s*"\/pay"\)\}/);
assert.match(footer, /withLocale\(locale,\s*href\)/);
assert.match(form, /¿Qué deberíamos saber sobre tu negocio\?/);
assert.match(reviews, /de 5 estrellas/);

console.log("Punch-list regression checks passed (M1–M9 plus hidden-trade links, privacy, plans, and payment routes).");
