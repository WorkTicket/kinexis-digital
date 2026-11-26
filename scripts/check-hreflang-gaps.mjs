/**
 * Prompt C acceptance: EN-only self-ref, ES-only without invented en-US,
 * mirrored pairs unchanged.
 */
import assert from "node:assert/strict";
import { bundleServer } from "./bundle-server.mjs";

const mod = await bundleServer("scripts/hreflang-harness.ts", ".tmp-hreflang-gaps.mjs");

function keys(path) {
  return Object.keys(mod.hreflangLanguages(path) ?? {});
}

for (const path of [
  "/tools/missed-call-calculator",
  "/tools/google-review-link-qr",
  "/case-studies/preferred-plumbing",
  "/case-studies/a1-property-services",
  "/case-studies/manos-creativas",
]) {
  const langs = mod.hreflangLanguages(path);
  assert.deepEqual(langs, { "en-US": path, "x-default": path });
}

for (const slug of ["pagina-web-para-plomeros", "como-pedir-resenas-en-google"]) {
  assert.ok(mod.EN_REDIRECTED_BLOG_SLUGS.has(slug));
  const langs = mod.hreflangLanguages(`/blog/${slug}`);
  assert.equal(langs["en-US"], undefined);
  assert.equal(langs.es, `/es/blog/${slug}`);
  assert.equal(langs["es-US"], `/es/blog/${slug}`);
  assert.equal(langs["x-default"], `/es/blog/${slug}`);
}

const plumbing = mod.hreflangLanguages("/industries/plumbing");
assert.deepEqual(plumbing, {
  "en-US": "/industries/plumbing",
  es: "/es/industries/plumbing",
  "es-US": "/es/industries/plumbing",
  "x-default": "/industries/plumbing",
});

const redesign = mod.hreflangLanguages("/blog/contractor-website-redesign-checklist");
assert.equal(redesign["en-US"], "/blog/contractor-website-redesign-checklist");
assert.equal(redesign.es, "/es/blog/contractor-website-redesign-checklist");
assert.ok(keys("/blog/how-to-choose-contractor-web-designer").includes("es"));
assert.ok(keys("/blog/contractor-website-quote-form").includes("es"));

console.log("hreflang gap checks passed: EN-only self-ref, ES-only without en-US, mirrored pairs intact.");
