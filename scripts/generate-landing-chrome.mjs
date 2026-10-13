import { build } from "esbuild";
import fs from "node:fs/promises";

// Derive the small navigation payload from the source of truth. Client chrome
// must not import every campaign's copy, images, FAQs, and form options.
const result = await build({
  entryPoints: ["src/content/registry/landing-pages.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  write: false,
  tsconfig: "tsconfig.json",
});
const { landingPageSlugs, getLandingPage } = await import(
  `data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString("base64")}`
);
const data = {};
for (const locale of ["en", "es-419", "es-ES"]) {
  data[locale] = {};
  for (const slug of landingPageSlugs) {
    const page = getLandingPage(slug, locale);
    const slim = Boolean(page.auditLayout);
    data[locale][slug] = page.siteNav && !slim ? null : {
      ctaLabel: page.stickyCtaLabel,
      headerCtaLabel: page.headerCtaLabel ?? page.heroCtaLabel ?? page.stickyCtaLabel,
      formHref: "#lp-form",
      closingTitle: page.closingTitle ?? page.formTitle,
      closingCopy: page.closingCopy ?? page.formFootnote,
      slim,
    };
  }
}
await fs.writeFile("src/content/landing-chrome.generated.json", `${JSON.stringify(data, null, 2)}\n`);
console.log("Generated lightweight landing navigation for all locales.");
