/**
 * Finish remaining brand wordmarks after rate limits / 404s.
 * Usage: node scripts/fetch-remaining-wordmarks.mjs
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "public", "assets", "logos", "brands");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const brands = [
  {
    slug: "coinbase",
    url: "https://www.vectorlogo.zone/logos/coinbase/coinbase-ar21.svg",
  },
  {
    slug: "uber",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg",
  },
  {
    slug: "sony",
    url: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
  },
  {
    slug: "cocacola",
    url: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg",
  },
];

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
    .replace(/fill:\s*rgba\([^)]+\)/g, "fill:currentColor");

  out = out.replace(/style="([^"]*)"/gi, (_, style) => {
    const cleaned = style
      .replace(/fill:\s*(?!none)[^;]+;?/gi, "fill:currentColor;")
      .replace(/stroke:\s*(?!none)[^;]+;?/gi, "stroke:currentColor;");
    return `style="${cleaned}"`;
  });

  out = out.replace(/<svg\b([^>]*)>/i, (_, attrs) => {
    let a = attrs;
    if (!/viewBox=/i.test(a)) {
      const w = a.match(/width=["']([0-9.]+)/i)?.[1];
      const h = a.match(/height=["']([0-9.]+)/i)?.[1];
      if (w && h) a += ` viewBox="0 0 ${w} ${h}"`;
    }
    a = a
      .replace(/\swidth="[^"]*"/gi, "")
      .replace(/\sheight="[^"]*"/gi, "");
    if (!/\sfill=/i.test(a)) a += ' fill="currentColor"';
    a += ' role="img" aria-hidden="true"';
    return `<svg${a}>`;
  });

  return out.endsWith("\n") ? out : `${out}\n`;
}

for (const brand of brands) {
  await sleep(2500);
  try {
    const res = await fetch(brand.url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    if (!res.ok) {
      console.log("FAIL", brand.slug, res.status);
      continue;
    }
    const text = await res.text();
    if (!/<svg/i.test(text)) {
      console.log("FAIL not svg", brand.slug);
      continue;
    }
    await writeFile(
      path.join(outDir, `${brand.slug}.svg`),
      toCurrentColor(text),
    );
    console.log("OK", brand.slug, text.length);
  } catch (err) {
    console.log("ERR", brand.slug, err.message);
  }
}
