/**
 * One-time extractor: pulls route-specific CSS out of globals.css into
 * src/styles/components/*.css. Safe to re-run — skips if targets exist.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const globalsPath = path.join(root, "src/app/globals.css");
const outDir = path.join(root, "src/styles/components");

/** [startLine, endLine] inclusive, 1-indexed */
const EXTRACTS = {
  "hero-decorative.css": [
    [982, 1095],
  ],
  "service-pages.css": [
    [1245, 1295],
    [1297, 1308],
    [1346, 1352],
    [1408, 1438],
    [1444, 1580],
  ],
  "case-studies.css": [
    [1707, 1780],
  ],
  "mesh.css": [
    [2104, 2414],
  ],
};

const KEYFRAMES = {
  "hero-decorative.css": [
    [2417, 2430],
  ],
  "mesh.css": [
    [2432, 2477],
  ],
};

function linesToBlock(ranges, allLines) {
  const chunks = ranges.map(([start, end]) =>
    allLines.slice(start - 1, end).join("\n")
  );
  return chunks.join("\n\n") + "\n";
}

function keyframesBlock(ranges, allLines) {
  return ranges.map(([start, end]) => allLines.slice(start - 1, end).join("\n")).join("\n\n") + "\n";
}

function removeRanges(allLines, ranges) {
  const remove = new Set();
  for (const [start, end] of ranges) {
    for (let i = start; i <= end; i++) remove.add(i);
  }
  return allLines.filter((_, idx) => !remove.has(idx + 1));
}

mkdirSync(outDir, { recursive: true });

const raw = readFileSync(globalsPath, "utf8");
const allLines = raw.split("\n");

const allRanges = Object.values(EXTRACTS).flat();
const allKeyframeRanges = Object.values(KEYFRAMES).flat();

for (const [file, ranges] of Object.entries(EXTRACTS)) {
  const outPath = path.join(outDir, file);
  if (existsSync(outPath)) {
    console.log(`skip ${file} (exists)`);
    continue;
  }
  const body = linesToBlock(ranges, allLines);
  const kf = KEYFRAMES[file] ? keyframesBlock(KEYFRAMES[file], allLines) : "";
  writeFileSync(outPath, body + (kf ? "\n" + kf : ""), "utf8");
  console.log(`wrote ${file}`);
}

let patched = removeRanges(allLines, [...allRanges, ...allKeyframeRanges]);
writeFileSync(globalsPath, patched.join("\n"), "utf8");
console.log("patched globals.css");
