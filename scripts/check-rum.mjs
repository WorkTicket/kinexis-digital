/** Fixture checks for first-party RUM payload validation + same-site beacon guard. */
import assert from "node:assert/strict";
import { build } from "esbuild";
import { mkdtemp, writeFile, rm, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createRequire } from "node:module";

const root = path.resolve(import.meta.dirname, "..");
const require = createRequire(import.meta.url);

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
const vitals = await import("web-vitals");
for (const name of ["onLCP", "onINP", "onCLS", "onTTFB", "onFCP"]) {
  assert.equal(typeof vitals[name], "function", `web-vitals must expose ${name}`);
}
const rumClient = await readFile(path.join(root, "src/components/Rum.tsx"), "utf8");
assert.match(rumClient, /onCLS\(record, opts\)/);
assert.match(rumClient, /onINP\(record, opts\)/);
assert.match(rumClient, /onLCP\(record, opts\)/);
assert.match(rumClient, /reportSoftNavs:\s*true/);

const reportBundle = await build({
  entryPoints: ["src/lib/rum-report.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  write: false,
});
const reportSource = reportBundle.outputFiles[0]?.contents;
assert.ok(reportSource);
const reportModule = await import(`data:text/javascript;base64,${Buffer.from(reportSource).toString("base64")}`);
const fixture = (name, value, navigationURL) => ({
  name,
  value,
  id: `${name}-fixture`,
  navigationType: "soft-navigation",
  navigationURL,
});
assert.deepEqual(
  reportModule.toRumMetricRecord(fixture("INP", 347, "https://www.kinexisdigital.com/es/contact?private=1#form"), "/", "https://www.kinexisdigital.com"),
  { name: "INP", value: 347, id: "INP-fixture", navigationType: "soft-navigation", path: "/es/contact" },
);
assert.deepEqual(
  reportModule.toRumMetricRecord(fixture("CLS", 0.12, "https://other.example/private"), "/pricing", "https://www.kinexisdigital.com")?.path,
  "/pricing",
  "external navigation URLs must not override the local route",
);
assert.equal(
  reportModule.toRumMetricRecord(fixture("LCP", -1, "https://www.kinexisdigital.com/"), "/", "https://www.kinexisdigital.com"),
  null,
);

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

// Host-aware Origin allow: 127.0.0.1 Origin vs localhost request.url must not 403
// sendBeacon(/api/rum) (Lighthouse errors-in-console / intermittent BP 0.96).
const dir = await mkdtemp(path.join(tmpdir(), "kinexis-rum-sec-"));
try {
  const secSrc = await readFile(path.join(root, "src/lib/request-security.ts"), "utf8");
  await writeFile(path.join(dir, "request-security.ts"), secSrc.replace(/^import "server-only";\n?/m, ""), "utf8");
  await writeFile(
    path.join(dir, "entry.ts"),
    `export { rejectCrossSite } from "./request-security.ts";\n`,
    "utf8",
  );
  const outfile = path.join(dir, "check.cjs");
  await build({
    entryPoints: [path.join(dir, "entry.ts")],
    outfile,
    bundle: true,
    platform: "node",
    format: "cjs",
    packages: "bundle",
    logLevel: "silent",
    absWorkingDir: dir,
  });
  const { rejectCrossSite } = require(outfile);

  function req(url, headers) {
    return new Request(url, { method: "POST", headers });
  }

  assert.equal(
    rejectCrossSite(req("http://localhost:3000/api/rum", { Origin: "http://127.0.0.1:3000", Host: "127.0.0.1:3000" })),
    null,
    "127.0.0.1 Origin + matching Host must be allowed when request.url host differs",
  );
  assert.equal(
    rejectCrossSite(req("http://127.0.0.1:3000/api/rum", { Origin: "http://localhost:3000", Host: "localhost:3000" })),
    null,
    "localhost Origin + matching Host must be allowed when request.url host differs",
  );
  assert.equal(
    rejectCrossSite(req("http://localhost:3000/api/rum", { Origin: "http://localhost:3000" })),
    null,
    "matching Origin and request.url must be allowed",
  );
  assert.equal(
    rejectCrossSite(req("http://localhost:3000/api/rum", { "Sec-Fetch-Site": "cross-site", Origin: "http://localhost:3000" }))?.status,
    403,
    "Sec-Fetch-Site cross-site stays denied",
  );
  assert.equal(
    rejectCrossSite(req("http://localhost:3000/api/rum", { Origin: "https://attacker.example" }))?.status,
    403,
    "foreign Origin stays denied",
  );
  assert.equal(
    rejectCrossSite(req("https://www.kinexisdigital.com/api/rum", {
      Origin: "https://www.kinexisdigital.com",
      Host: "www.kinexisdigital.com",
    })),
    null,
    "production www Origin must be allowed",
  );
} finally {
  await rm(dir, { recursive: true, force: true });
}

console.log("RUM payload validation checks passed.");
