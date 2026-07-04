#!/usr/bin/env node
const base = process.argv[2] || "http://localhost:3000";

const pages = [
  "/en/services/seo",
  "/en/digital-marketing-agency",
  "/en/pricing/local-seo",
  "/en/blog/technical-seo-guide",
  "/en/solutions/web-design-for-saas-companies",
];

for (const path of pages) {
  const res = await fetch(`${base}${path}`);
  const html = await res.text();
  const locLinks = [...html.matchAll(/href="(\/en\/locations[^"]*)"/g)].map((m) => m[1]);
  console.log(`\n${path} — location links (${new Set(locLinks).size}):`, [...new Set(locLinks)].slice(0, 8));
}
