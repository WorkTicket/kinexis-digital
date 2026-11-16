/** Fixture checks for first-party RUM payload validation. */
import assert from "node:assert/strict";
import { build } from "esbuild";

const bundle = await build({
  entryPoints: ["src/lib/rum.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  write: false,
});
const source = bundle.outputFiles[0]?.contents;
assert.ok(source);
const rum = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);

assert.equal(rum.sanitizeRumPath("/pricing"), "/pricing");
assert.equal(rum.sanitizeRumPath("/es/pricing"), "/es/pricing");
assert.equal(rum.sanitizeRumPath("/pricing?x=1"), null);
assert.equal(rum.sanitizeRumPath("https://evil.test/"), null);

const ok = rum.parseRumPayload({
  path: "/",
  metrics: [{ name: "LCP", value: 1200.5, id: "lcp" }],
  sample: 0.2,
});
assert.equal(ok?.path, "/");
assert.equal(ok?.metrics[0].name, "LCP");

assert.equal(
  rum.parseRumPayload({
    path: "/",
    metrics: [{ name: "HACK", value: 1, id: "x" }],
  }),
  null,
);
assert.equal(
  rum.parseRumPayload({
    path: "/",
    metrics: [{ name: "LCP", value: -1, id: "x" }],
  }),
  null,
);

console.log("RUM payload validation checks passed.");
