/**
 * Fetch client brand logos from live sites into public/assets/logos/clients.
 * Usage: node scripts/fetch-client-logos.mjs
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "public", "assets", "logos", "clients");

const sites = [
  {
    slug: "a1-property-services",
    url: "https://a1pslandscape.com/",
  },
  {
    slug: "preferred-plumbing",
    url: "https://www.callpreferredplumbing.com/",
  },
  {
    slug: "manos-creativas",
    url: "https://bynmwcreative.com/",
  },
];

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

function absUrl(base, maybe) {
  try {
    return new URL(maybe, base).href;
  } catch {
    return null;
  }
}

function scoreCandidate(src, attrs = "") {
  const s = `${src} ${attrs}`.toLowerCase();
  let score = 0;
  if (s.includes("logo")) score += 50;
  if (s.includes("brand")) score += 25;
  if (s.includes("header")) score += 15;
  if (/\.svg(\?|$)/.test(s)) score += 20;
  if (/\.png(\?|$)/.test(s)) score += 15;
  if (/\.webp(\?|$)/.test(s)) score += 12;
  if (s.includes("favicon")) score -= 40;
  if (s.includes("og:image") || s.includes("opengraph")) score -= 10;
  if (s.includes("icon")) score -= 5;
  return score;
}

function extractCandidates(html, pageUrl) {
  const out = [];

  const push = (raw, attrs, note) => {
    const abs = absUrl(pageUrl, raw);
    if (!abs || abs.startsWith("data:")) return;
    out.push({
      abs,
      score: scoreCandidate(abs, attrs),
      note,
    });
  };

  // <img ... src="...">
  for (const m of html.matchAll(/<img\b([^>]*)>/gi)) {
    const attrs = m[1];
    const src =
      attrs.match(/\bsrc=["']([^"']+)["']/i)?.[1] ||
      attrs.match(/\bdata-src=["']([^"']+)["']/i)?.[1];
    if (src) push(src, attrs, "img");
  }

  // srcset first candidate
  for (const m of html.matchAll(/\bsrcset=["']([^"']+)["']/gi)) {
    const first = m[1].split(",")[0]?.trim().split(/\s+/)[0];
    if (first) push(first, m[1], "srcset");
  }

  // link icons
  for (const m of html.matchAll(
    /<link\b[^>]*rel=["']([^"']+)["'][^>]*>/gi,
  )) {
    const tag = m[0];
    const rel = m[1].toLowerCase();
    const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1];
    if (!href) continue;
    if (rel.includes("apple-touch-icon")) push(href, rel, "apple-touch");
    else if (rel === "icon" || rel.includes("shortcut")) push(href, rel, "icon");
  }

  // og:image as last resort
  const og =
    html.match(
      /property=["']og:image["'][^>]*content=["']([^"']+)["']/i,
    ) ||
    html.match(
      /content=["']([^"']+)["'][^>]*property=["']og:image["']/i,
    );
  if (og?.[1]) push(og[1], "og:image", "og");

  // next/image style /_next/image?url=
  for (const m of html.matchAll(
    /\/_next\/image\?[^"'>\s]*url=([^&"'>\s]+)/gi,
  )) {
    const decoded = decodeURIComponent(m[1]);
    push(decoded, decoded, "next-image");
  }

  out.sort((a, b) => b.score - a.score);
  return out;
}

async function downloadBuffer(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const ct = res.headers.get("content-type") || "";
  const buf = Buffer.from(await res.arrayBuffer());
  return { buf, ct };
}

async function main() {
  await mkdir(outDir, { recursive: true });

  for (const site of sites) {
    console.log(`\n${site.slug} → ${site.url}`);
    try {
      const res = await fetch(site.url, { headers: { "User-Agent": UA } });
      if (!res.ok) throw new Error(`page HTTP ${res.status}`);
      const html = await res.text();
      const candidates = extractCandidates(html, site.url);

      console.log(
        "  top:",
        candidates
          .slice(0, 10)
          .map((c) => `${c.score} ${c.note} ${c.abs}`)
          .join("\n       "),
      );

      let saved = false;
      for (const c of candidates.slice(0, 12)) {
        try {
          const { buf, ct } = await downloadBuffer(c.abs);
          const head = buf.toString("utf8", 0, 300).toLowerCase();
          const isSvg =
            ct.includes("svg") ||
            c.abs.includes(".svg") ||
            head.includes("<svg");
          const isImage =
            isSvg ||
            ct.startsWith("image/") ||
            /\.(png|jpe?g|webp|avif|gif)(\?|$)/i.test(c.abs);

          if (!isImage) continue;

          if (isSvg) {
            const outPath = path.join(outDir, `${site.slug}.svg`);
            await writeFile(outPath, buf);
            console.log(`  ✓ ${outPath}`);
            saved = true;
            break;
          }

          const outPath = path.join(outDir, `${site.slug}.webp`);
          await sharp(buf)
            .resize({
              width: 640,
              height: 320,
              fit: "inside",
              withoutEnlargement: true,
            })
            .webp({ quality: 90, effort: 6, alphaQuality: 100 })
            .toFile(outPath);
          console.log(`  ✓ ${outPath}`);
          saved = true;
          break;
        } catch (err) {
          console.log(`  skip ${c.abs}: ${err.message}`);
        }
      }

      if (!saved) {
        console.error(`  ✗ no usable logo for ${site.slug}`);
        process.exitCode = 1;
      }
    } catch (err) {
      console.error(`  ✗ ${site.slug}:`, err.message);
      process.exitCode = 1;
    }
  }

  console.log("\nDone.");
}

main();
