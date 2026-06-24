#!/usr/bin/env node
/**
 * Static HTML audit for a11y/SEO signals Lighthouse would also check.
 * Complements prelaunch-qa.mjs when Chrome is unavailable.
 */
const base = (process.argv[2] || "http://localhost:3099").replace(/\/$/, "");
const paths = ["/en", "/en/contact", "/en/services/seo"];

async function audit(path) {
  const res = await fetch(`${base}${path}`);
  const html = await res.text();
  const issues = [];
  const passes = [];

  if (!html.match(/<html[^>]+lang=/i)) issues.push(`${path}: missing html lang`);
  else passes.push(`${path}: html lang present`);

  if (!html.includes('name="viewport"')) issues.push(`${path}: missing viewport`);
  if (html.includes('alt=""') && !html.includes('alt="" aria-hidden')) {
    /* decorative empty alts are ok */
  }

  const imgsWithoutAlt = (html.match(/<img(?![^>]*alt=)[^>]*>/gi) || []).length;
  if (imgsWithoutAlt > 0) issues.push(`${path}: ${imgsWithoutAlt} img(s) missing alt`);

  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1Count !== 1) issues.push(`${path}: expected 1 h1, found ${h1Count}`);
  else passes.push(`${path}: single h1`);

  if (!html.includes("og:image")) issues.push(`${path}: missing og:image (social preview)`);
  else passes.push(`${path}: og:image present`);

  const buttonsWithoutLabel = (html.match(/<button(?![^>]*aria-label)(?![^>]*>[^<]+<\/button>)[^>]*>/gi) || []).length;
  if (buttonsWithoutLabel > 0) {
    issues.push(`${path}: ${buttonsWithoutLabel} button(s) may lack accessible label`);
  }

  return { path, issues, passes, sizeKb: Math.round(html.length / 1024) };
}

console.log(`\nStatic audit — ${base}\n`);
const results = [];
for (const p of paths) results.push(await audit(p));

for (const r of results) {
  console.log(`${r.path} (${r.sizeKb} KB HTML)`);
  r.passes.forEach((p) => console.log(`  ✓ ${p}`));
  r.issues.forEach((i) => console.log(`  ✗ ${i}`));
}

const totalIssues = results.flatMap((r) => r.issues);
process.exit(totalIssues.length ? 1 : 0);
