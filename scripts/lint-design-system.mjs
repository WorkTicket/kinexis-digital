#!/usr/bin/env node
/**
 * Design system lint — flags banned authoring patterns.
 * Run: npm run lint:design
 */
import fs from "node:fs";
import path from "node:path";

const SRC = path.resolve("src");
const ALLOWED_CARD_STYLE_FILES = new Set([
  "src/lib/card-styles.ts",
  "src/components/ui/Card.tsx",
]);

function relPath(file) {
  return path.relative(process.cwd(), file).replace(/\\/g, "/");
}

function isAllowedCardFile(file) {
  const rel = relPath(file);
  return ALLOWED_CARD_STYLE_FILES.has(rel) || rel.includes("globals.css");
}

function isDecorativeSurfaceFile(file) {
  const rel = relPath(file);
  return (
    rel.includes("/hero-viz/") ||
    rel.includes("/services/hero-viz/") ||
    rel.includes("globals.css") ||
    rel.includes("AboutArchitectureMap") ||
    rel.includes("ResponsiveDeviceMockup")
  );
}

const RULES = [
  {
    id: "raw-heading-size",
    pattern: /<h[23][^>]*className="[^"]*text-(xl|2xl|3xl)[^"]*font-bold/,
    message: "Use .type-subheader, .type-section, or .card-heading instead of raw text-xl/2xl/3xl font-bold on h2/h3",
    allow: (file) => file.includes(`${path.sep}blog${path.sep}`) && file.endsWith("page.tsx"),
  },
  {
    id: "raw-display-size-on-p",
    pattern: /<p[^>]*className="[^"]*text-(2xl|3xl|4xl)[^"]*font-bold/,
    message: "Use .type-pull-quote, .type-display-stat, or .type-section instead of raw display sizes on <p>",
    allow: () => false,
  },
  {
    id: "inline-card-surface",
    pattern: /rounded-2xl border border-surface bg-white\/\[/,
    message: "Use <Card> or cardClasses() instead of inline card surface classes",
    allow: isAllowedCardFile,
  },
  {
    id: "inline-card-border-surface",
    pattern: /rounded-2xl border border-surface bg-/,
    message: "Use <Card> or cardClasses() instead of inline card surface classes",
    allow: isAllowedCardFile,
  },
  {
    id: "raw-white-opacity-surface",
    pattern: /bg-white\/\[/,
    message: "Use bg-surface-* tokens instead of bg-white/[0.0x]",
    allow: (file) => isDecorativeSurfaceFile(file),
  },
  {
    id: "manual-section-title",
    pattern: /className="[^"]*section-title/,
    message: "Use <SectionHeader> instead of manual section-title class",
    allow: (file) =>
      file.includes("SectionHeader.tsx") ||
      file.includes("SiteCTA.tsx") ||
      (file.includes(`${path.sep}blog${path.sep}`) && file.endsWith("page.tsx")),
  },
  {
    id: "manual-section-variant",
    pattern: /section--(data|editorial|proof|visual)/,
    message: 'Use <Section variant="…"> instead of manual section--* classes',
    allow: (file) => file.includes("Section.tsx") || file.includes("globals.css"),
  },
  {
    id: "section-padding-on-section",
    pattern: /<section[^>]*className="[^"]*section-padding/,
    message: "Use pageSectionClasses() or <Section> instead of section-padding on <section>",
    allow: (file) => file.includes("SiteCTA.tsx"),
  },
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) files.push(full);
  }
  return files;
}

let violations = 0;

for (const file of walk(SRC)) {
  const rel = path.relative(process.cwd(), file);
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split("\n");

  for (const rule of RULES) {
    if (rule.allow?.(file)) continue;
    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) return;
      if (rule.pattern.test(line)) {
        console.error(`${rel}:${index + 1} [${rule.id}] ${rule.message}`);
        console.error(`  ${line.trim()}`);
        violations += 1;
      }
    });
  }
}

if (violations > 0) {
  console.error(`\n${violations} design system violation(s) found.`);
  process.exit(1);
}

console.log("Design system lint passed.");
