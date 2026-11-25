#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const mode = process.argv[2];
if (!["--production", "--preview"].includes(mode)) {
  console.error("Usage: node scripts/check-paypal-build.mjs --production|--preview");
  process.exit(2);
}

const names = [
  "NEXT_PUBLIC_PAYPAL_CLIENT_ID",
  "NEXT_PUBLIC_PAYPAL_WEBSITE_PLAN_ID",
  "NEXT_PUBLIC_PAYPAL_LEAD_SYSTEM_PLAN_ID",
  "NEXT_PUBLIC_PAYPAL_PLUS_PLAN_ID",
];
const productionValues = names.map((name) => process.env[name] ?? "");
const liveValues = [
  "BAA94hZ6Xo-P3Sruwoxvirr-LCBzJGNXhkyPECc6QDLa_OcBRvoP_cvUN2J9XKy-YO21gowF4u-GyFWrjg",
  "P-0J700653C28801623NLPDS2Q",
  "P-97U39666GX253532RNLPDS2Q",
  "P-0HF69677UY4630146NLPDS2Q",
];
const buildRoot = ".open-next";
if (mode === "--production" && productionValues.some((value) => !value)) {
  console.error("[paypal-build] Expected PayPal values must be provided by the build environment.");
  process.exit(1);
}
if (!existsSync(buildRoot)) {
  console.error(`[paypal-build] Missing ${buildRoot}/ build output.`);
  process.exit(1);
}

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const file = join(dir, name);
    const stat = statSync(file);
    if (stat.isDirectory()) walk(file, files);
    else if (stat.isFile() && !/\.(png|jpe?g|gif|webp|avif|ico|woff2?|ttf|eot|mp4|webm|gz|br|map)$/i.test(file)) {
      files.push(file);
    }
  }
  return files;
}

const files = walk(buildRoot);
const readText = (file) => {
  try {
    return readFileSync(file, "utf8");
  } catch {
    return "";
  }
};

if (mode === "--preview") {
  // OpenNext copies the repository's production env file into the server
  // function bundle. It is not needed at runtime; never ship it to preview.
  for (const file of files.filter((path) => /[\\/]\.env\.production$/i.test(path))) {
    unlinkSync(file);
  }
  const previewFiles = walk(buildRoot, []);
  const leaked = previewFiles.find((file) => liveValues.some((value) => readText(file).includes(value)));
  if (leaked) {
    console.error(`[paypal-build] Live PayPal value found in preview output: ${leaked}`);
    process.exit(1);
  }
  console.log("[paypal-build] No live PayPal values found in preview output.");
  process.exit(0);
}

const payPageFiles = files.filter((file) =>
  /[\\/]assets[\\/]\_next[\\/]static[\\/]chunks[\\/]app[\\/].*[\\/]pay[\\/]page-[^\\/]+\.js$/i.test(file),
);
const clientChunkFiles = files.filter((file) =>
  /[\\/]assets[\\/]_next[\\/]static[\\/]chunks[\\/].+\.js$/i.test(file),
);
const clientBundleText = clientChunkFiles.map(readText).join("\n");
if (payPageFiles.length === 0) {
  console.error("[paypal-build] Could not find a built /pay page JavaScript bundle.");
  process.exit(1);
}
const missing = productionValues.filter((value) => !clientBundleText.includes(value));
if (missing.length) {
  console.error(`[paypal-build] PayPal values missing from the /pay client bundle set: ${missing.join(", ")}`);
  process.exit(1);
}
console.log(
  `[paypal-build] /pay page bundle found; client ID and all three plan IDs present in its client chunk set (${clientChunkFiles.length} JavaScript chunks).`,
);
