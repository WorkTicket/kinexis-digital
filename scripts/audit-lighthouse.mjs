// Site-wide Lighthouse Performance audit.
// Usage: node scripts/audit-lighthouse.mjs [--mobile] [--desktop] [--only=/a,/b] [--workers=3]
// Writes raw reports to .audit/lh/ and summaries to .audit/lh-summary.json + .md.

import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = process.env.LH_BASE || "http://127.0.0.1:3491";
const OUT = ".audit/lh";
const argv = process.argv.slice(2);
const onlyArg = argv.find((a) => a.startsWith("--only="));
const only = onlyArg ? onlyArg.slice(7).split(",").map((p) => p.trim()).filter(Boolean) : null;
const workers = Math.max(1, Number(argv.find((a) => a.startsWith("--workers="))?.slice(10) || 3));
const modes = argv.includes("--mobile") ? ["mobile"] : argv.includes("--desktop") ? ["desktop"] : ["mobile", "desktop"];

mkdirSync(OUT, { recursive: true });

async function getPaths() {
  const res = await fetch(`${BASE}/sitemap.xml`);
  const xml = await res.text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname)
    .filter((p) => !/\.(xml|txt|webp|png|jpe?g|avif)$/.test(p));
  for (const extra of ["/client-login", "/pay/thanks"]) {
    if (!paths.includes(extra)) paths.push(extra);
  }
  return [...new Set(paths)].sort();
}

function runWorker(index, jobs) {
  return new Promise((resolve) => {
    const jobFile = `.audit/jobs-${index}.json`;
    writeFileSync(jobFile, JSON.stringify(jobs));
    const child = spawn(process.execPath, ["scripts/lh-worker.mjs", jobFile, String(index)], {
      stdio: ["ignore", "pipe", "inherit"],
      env: { ...process.env, LH_BASE: BASE },
    });
    let buffer = "";
    const results = [];
    child.stdout.on("data", (chunk) => {
      buffer += chunk;
      let end;
      while ((end = buffer.indexOf("\n")) !== -1) {
        const line = buffer.slice(0, end).trim();
        buffer = buffer.slice(end + 1);
        if (!line) continue;
        try {
          const result = JSON.parse(line);
          results.push(result);
          if (result.ok) {
            console.log(
              `${String(result.score).padStart(3)} ${result.mode.padEnd(7)} ${result.path.padEnd(46)} ` +
                `FCP ${Math.round(result.fcp)} LCP ${Math.round(result.lcp)} TBT ${Math.round(result.tbt)} CLS ${result.cls.toFixed(3)} SI ${Math.round(result.si)}`,
            );
          } else {
            console.log(`ERR ${result.mode} ${result.path}: ${result.error}`);
          }
        } catch {
          console.log(`bad worker line: ${line.slice(0, 200)}`);
        }
      }
    });
    child.on("exit", (code) => resolve({ code, results }));
  });
}

const paths = only || (await getPaths());
const jobs = [];
for (const mode of modes) for (const path of paths) jobs.push({ mode, path });

console.log(`auditing ${paths.length} paths × ${modes.join("+")} with ${workers} workers (${jobs.length} runs)`);
const buckets = Array.from({ length: workers }, () => []);
jobs.forEach((job, i) => buckets[i % workers].push(job));

const started = Date.now();
const outcomes = await Promise.all(buckets.map((bucket, i) => runWorker(i, bucket)));
const results = outcomes.flatMap((o) => o.results).sort((a, b) => a.mode.localeCompare(b.mode) || a.path.localeCompare(b.path));

writeFileSync(".audit/lh-summary.json", JSON.stringify({ base: BASE, timestamp: new Date().toISOString(), results }, null, 2));

const lines = ["# Lighthouse Performance audit", "", `Base: ${BASE}`, `Run: ${new Date().toISOString()}`, ""];
for (const mode of modes) {
  const rows = results.filter((r) => r.mode === mode && r.ok);
  const pass = rows.filter((r) => r.score === 100).length;
  lines.push(`## ${mode} — ${pass}/${rows.length} at 100`, "", "| Score | Page | FCP | LCP | TBT | CLS | SI |", "| --- | --- | --- | --- | --- | --- | --- |");
  for (const r of rows.sort((a, b) => a.score - b.score || a.path.localeCompare(b.path))) {
    lines.push(
      `| ${r.score} | ${r.path} | ${Math.round(r.fcp)} | ${Math.round(r.lcp)} | ${Math.round(r.tbt)} | ${r.cls.toFixed(3)} | ${Math.round(r.si)} |`,
    );
  }
  lines.push("");
}
writeFileSync(".audit/lh-summary.md", lines.join("\n"));

for (const mode of modes) {
  const rows = results.filter((r) => r.mode === mode && r.ok);
  console.log(`${mode}: ${rows.filter((r) => r.score === 100).length}/${rows.length} at 100, min ${Math.min(...rows.map((r) => r.score))}`);
}
console.log(`elapsed ${Math.round((Date.now() - started) / 1000)}s — wrote .audit/lh-summary.md`);
