/**
 * Summarize saved Lighthouse JSON reports without discarding run-level data.
 * Usage: node scripts/summarize-lighthouse-measurements.mjs baseline|candidate
 */
import { readFile, writeFile } from "node:fs/promises";

const kind = process.argv[2];
if (kind !== "baseline" && kind !== "candidate") {
  throw new Error("Expected baseline or candidate");
}

const pages = ["home", "pricing", "plumbing", "case-study"];
const columns = [
  "page", "run", "ttfb_ms", "lcp_ms", "cls", "tbt_ms",
  "document_transfer_bytes", "document_decoded_bytes",
  "js_transfer_bytes", "js_decoded_bytes",
  "css_transfer_bytes", "css_decoded_bytes",
  "total_transfer_bytes", "total_decoded_bytes",
];
const rows = [];

for (const page of pages) {
  for (let run = 1; run <= 3; run += 1) {
    const name = kind === "baseline"
      ? `.tmp-release2-${page}-${run}.json`
      : `.tmp-release2-candidate-${page}-${run}.json`;
    const report = JSON.parse(await readFile(`docs/seo/${name}`, "utf8"));
    const audits = report.audits;
    const requests = audits["network-requests"].details.items;
    const document = requests.find((item) => item.resourceType === "Document");
    const scripts = requests.filter((item) => item.resourceType === "Script");
    const styles = requests.filter((item) => item.resourceType === "Stylesheet");
    const sum = (items, field) => items.reduce((total, item) => total + (item[field] || 0), 0);
    rows.push({
      page,
      run,
      ttfb_ms: audits["server-response-time"].numericValue,
      lcp_ms: audits["largest-contentful-paint"].numericValue,
      cls: audits["cumulative-layout-shift"].numericValue,
      tbt_ms: audits["total-blocking-time"].numericValue,
      document_transfer_bytes: document?.transferSize ?? 0,
      document_decoded_bytes: document?.resourceSize ?? 0,
      js_transfer_bytes: sum(scripts, "transferSize"),
      js_decoded_bytes: sum(scripts, "resourceSize"),
      css_transfer_bytes: sum(styles, "transferSize"),
      css_decoded_bytes: sum(styles, "resourceSize"),
      total_transfer_bytes: sum(requests, "transferSize"),
      total_decoded_bytes: sum(requests, "resourceSize"),
    });
  }
}

const quote = (value) => `"${String(value).replaceAll('"', '""')}"`;
const csv = [
  columns.join(","),
  ...rows.map((row) => columns.map((column) => quote(row[column])).join(",")),
].join("\n") + "\n";
const output = `docs/seo/KX-SEO-002-LIGHTHOUSE-${kind.toUpperCase()}-2026-11-20.csv`;
await writeFile(output, csv);

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
};
for (const page of pages) {
  const pageRows = rows.filter((row) => row.page === page);
  console.log(JSON.stringify({
    page,
    medianTtfbMs: median(pageRows.map((row) => row.ttfb_ms)),
    medianLcpMs: median(pageRows.map((row) => row.lcp_ms)),
    medianCls: median(pageRows.map((row) => row.cls)),
    medianTbtMs: median(pageRows.map((row) => row.tbt_ms)),
    medianDocumentTransferBytes: median(pageRows.map((row) => row.document_transfer_bytes)),
    medianDocumentDecodedBytes: median(pageRows.map((row) => row.document_decoded_bytes)),
    medianJsTransferBytes: median(pageRows.map((row) => row.js_transfer_bytes)),
    medianCssTransferBytes: median(pageRows.map((row) => row.css_transfer_bytes)),
    medianTotalTransferBytes: median(pageRows.map((row) => row.total_transfer_bytes)),
  }));
}
