/**
 * Normalize brand SVGs into public/assets/logos/brands as currentColor marks.
 */
import { mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import * as si from "simple-icons";

const outDir = path.join(process.cwd(), "public", "assets", "logos", "brands");

function siSvg(icon) {
  return `<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="currentColor"><title>${icon.title}</title><path d="${icon.path}"/></svg>\n`;
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

function toCurrentColor(svg) {
  return svg
    .replace(/\sfill="(?!none)[^"]*"/gi, ' fill="currentColor"')
    .replace(/\sstroke="(?!none)[^"]*"/gi, ' stroke="currentColor"')
    .replace(/fill:\s*#[0-9a-fA-F]{3,8}/g, "fill:currentColor")
    .replace(/stroke:\s*#[0-9a-fA-F]{3,8}/g, "stroke:currentColor")
    .replace(/fill:\s*rgb\([^)]+\)/g, "fill:currentColor")
    .replace(/style="([^"]*)"/gi, (_, style) => {
      const cleaned = style
        .replace(/fill:\s*[^;]+;?/gi, "fill:currentColor;")
        .replace(/stroke:\s*[^;]+;?/gi, "stroke:currentColor;");
      return `style="${cleaned}"`;
    });
}

async function main() {
  // wipe nested junk from earlier download
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  const fromSi = {
    meta: si.siMeta,
    google: si.siGoogle,
    discover: si.siDiscover,
    stripe: si.siStripe,
    cocacola: si.siCocacola,
    coinbase: si.siCoinbase,
    uber: si.siUber,
    sony: si.siSony,
  };

  for (const [slug, icon] of Object.entries(fromSi)) {
    await writeFile(path.join(outDir, `${slug}.svg`), siSvg(icon));
    console.log("si", slug);
  }

  const amazonRaw = await fetchText(
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  );
  await writeFile(path.join(outDir, "amazon.svg"), toCurrentColor(amazonRaw));
  console.log("amazon");

  const slackRaw = await fetchText(
    "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
  );
  await writeFile(path.join(outDir, "slack.svg"), toCurrentColor(slackRaw));
  console.log("slack");

  console.log("Done →", outDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
