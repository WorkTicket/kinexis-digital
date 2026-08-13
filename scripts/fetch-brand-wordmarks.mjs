/**
 * Fetch professional brand WORDMARKS and normalize to currentColor SVGs.
 * Prefer gilbarbara/logos (clean wordmarks) with Wikimedia fallbacks.
 *
 * Usage: node scripts/fetch-brand-wordmarks.mjs
 */
import { mkdir, writeFile, rm, readFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "public", "assets", "logos", "brands");
const GH = "https://raw.githubusercontent.com/gilbarbara/logos/master/logos";

const brands = [
  {
    slug: "amazon",
    urls: [
      `${GH}/amazon.svg`,
      "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    ],
  },
  {
    slug: "google",
    urls: [
      `${GH}/google.svg`,
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    ],
  },
  {
    slug: "meta",
    urls: [`${GH}/meta.svg`, `${GH}/meta-icon.svg`],
  },
  {
    slug: "stripe",
    urls: [
      `${GH}/stripe.svg`,
      "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
    ],
  },
  {
    slug: "uber",
    urls: [`${GH}/uber.svg`],
  },
  {
    slug: "sony",
    urls: [`${GH}/sony.svg`],
  },
  {
    slug: "slack",
    urls: [`${GH}/slack.svg`, `${GH}/slack-icon.svg`],
  },
  {
    slug: "cocacola",
    urls: [`${GH}/coca-cola.svg`],
  },
  {
    slug: "coinbase",
    urls: [`${GH}/coinbase.svg`],
  },
  {
    slug: "discover",
    urls: [`${GH}/discover.svg`],
  },
];

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function ensureViewBox(attrs) {
  let a = attrs;
  const hasViewBox = /viewBox\s*=/i.test(a);
  if (hasViewBox) return a;

  const w = a.match(/\bwidth\s*=\s*["']([0-9.]+)(?:px)?["']/i)?.[1];
  const h = a.match(/\bheight\s*=\s*["']([0-9.]+)(?:px)?["']/i)?.[1];
  if (w && h) {
    a += ` viewBox="0 0 ${w} ${h}"`;
  }
  return a;
}

function toCurrentColor(svg) {
  let out = svg
    .replace(/<\?xml[^>]*>/gi, "")
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim();

  out = out
    .replace(/\sfill="(?!none)[^"]*"/gi, ' fill="currentColor"')
    .replace(/\sstroke="(?!none)[^"]*"/gi, ' stroke="currentColor"')
    .replace(/fill:\s*#(?:[0-9a-fA-F]{3,8})/g, "fill:currentColor")
    .replace(/stroke:\s*#(?:[0-9a-fA-F]{3,8})/g, "stroke:currentColor")
    .replace(/fill:\s*rgb\([^)]+\)/g, "fill:currentColor")
    .replace(/fill:\s*rgba\([^)]+\)/g, "fill:currentColor")
    .replace(/stop-color:\s*#[0-9a-fA-F]{3,8}/g, "stop-color:currentColor")
    .replace(/\sstop-color="[^"]*"/gi, ' stop-color="currentColor"');

  out = out.replace(/style="([^"]*)"/gi, (_, style) => {
    const cleaned = style
      .replace(/fill:\s*(?!none)[^;]+;?/gi, "fill:currentColor;")
      .replace(/stroke:\s*(?!none)[^;]+;?/gi, "stroke:currentColor;");
    return `style="${cleaned}"`;
  });

  out = out.replace(/<svg\b([^>]*)>/i, (_, attrs) => {
    let a = ensureViewBox(attrs)
      .replace(/\swidth="[^"]*"/gi, "")
      .replace(/\sheight="[^"]*"/gi, "");
    if (!/\sfill=/i.test(a)) a += ' fill="currentColor"';
    if (!/\srole=/i.test(a)) a += ' role="img"';
    if (!/\saria-hidden=/i.test(a)) a += ' aria-hidden="true"';
    return `<svg${a}>`;
  });

  return out.endsWith("\n") ? out : `${out}\n`;
}

/** Aspect ratio from viewBox — used for optical CSS scale hints */
function aspectOf(svg) {
  const vb = svg.match(/viewBox=["']([^"']+)["']/i)?.[1];
  if (!vb) return null;
  const parts = vb.trim().split(/[\s,]+/).map(Number);
  if (parts.length !== 4 || !parts[2] || !parts[3]) return null;
  return parts[2] / parts[3];
}

async function main() {
  await rm(path.join(outDir, "public"), { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  const manifest = [];

  for (const brand of brands) {
    let saved = false;
    for (const url of brand.urls) {
      try {
        await sleep(350);
        const raw = await fetchText(url);
        if (!/<svg[\s>]/i.test(raw)) {
          console.log(`skip non-svg ${brand.slug}`);
          continue;
        }
        const svg = toCurrentColor(raw);
        const outPath = path.join(outDir, `${brand.slug}.svg`);
        await writeFile(outPath, svg);
        const aspect = aspectOf(svg);
        console.log(
          `✓ ${brand.slug} aspect=${aspect ? aspect.toFixed(2) : "?"} (${svg.length}b)`,
        );
        manifest.push({ slug: brand.slug, aspect });
        saved = true;
        break;
      } catch (err) {
        console.log(`retry ${brand.slug}: ${err.message}`);
      }
    }
    if (!saved) {
      console.error(`✗ ${brand.slug}`);
      process.exitCode = 1;
    }
  }

  // Keep any already-good local files if fetch failed (amazon/google/stripe from earlier)
  for (const brand of brands) {
    try {
      await readFile(path.join(outDir, `${brand.slug}.svg`));
    } catch {
      /* missing */
    }
  }

  console.log("\nManifest:", JSON.stringify(manifest, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
