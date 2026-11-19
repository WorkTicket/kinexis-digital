import assert from "node:assert/strict";
import { build } from "esbuild";

const bundle = await build({
  entryPoints: ["src/lib/site.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  write: false,
});
const source = bundle.outputFiles[0]?.contents;
assert.ok(source);
const site = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);

for (const host of [
  "localhost",
  "localhost:8787",
  "127.0.0.1:3000",
  "[::1]:8787",
  "kinexis-digital-preview.workers.dev",
  "temporary-preview.workers.dev",
  "preview.kinexisdigital.com",
]) {
  assert.equal(site.isLocalOrPreviewHost(host), true, `${host} should be local/preview-only`);
  assert.equal(
    site.shouldRedirectCanonicalHost(host, "www.kinexisdigital.com", "http"),
    false,
    `${host} should override a conflicting production hostname and skip canonical redirects`,
  );
}

assert.equal(site.isLocalOrPreviewHost("www.kinexisdigital.com"), false);
assert.equal(site.shouldRedirectCanonicalHost("kinexisdigital.com", "kinexisdigital.com", "https"), true);
assert.equal(site.shouldRedirectCanonicalHost("www.kinexisdigital.com", "www.kinexisdigital.com", "http"), true);
assert.equal(site.shouldRedirectCanonicalHost("www.kinexisdigital.com", "www.kinexisdigital.com", "https"), false);

console.log("Proxy host checks passed: local/preview hosts skip canonical redirects; production apex/www behavior is preserved.");
