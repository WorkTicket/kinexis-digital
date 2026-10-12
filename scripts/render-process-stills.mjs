import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "public", "assets", "images", "process");

const font = "Segoe UI, Arial, sans-serif";

function svg(body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#05060a"/>
  ${body}
</svg>`;
}

const audit = svg(`
  <text x="88" y="196" fill="#0066ff" font-family="${font}" font-size="18" font-weight="700" letter-spacing="2.4">AUDIT</text>
  <text x="88" y="268" fill="#f4f6fb" font-family="${font}" font-size="58" font-weight="700" letter-spacing="-1.6">Find where</text>
  <text x="88" y="338" fill="#f4f6fb" font-family="${font}" font-size="58" font-weight="700" letter-spacing="-1.6">demand dies.</text>
  <text x="88" y="408" fill="#8b93a7" font-family="${font}" font-size="22" font-weight="400">Uncover bottlenecks in your funnel</text>
  <text x="88" y="442" fill="#8b93a7" font-family="${font}" font-size="22" font-weight="400">and convert more visitors into</text>
  <text x="88" y="476" fill="#8b93a7" font-family="${font}" font-size="22" font-weight="400">loyal customers.</text>

  <circle cx="112" cy="560" r="28" fill="none" stroke="#0066ff" stroke-width="3"/>
  <path d="M112 572 V548 M112 548 L103 557 M112 548 L121 557" fill="none" stroke="#0066ff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="156" y="554" fill="#f4f6fb" font-family="${font}" font-size="20" font-weight="600">Better conversion.</text>
  <text x="156" y="582" fill="#8b93a7" font-family="${font}" font-size="20" font-weight="400">Higher retention.</text>

  <g>
    <rect x="700" y="118" width="492" height="72" rx="16" fill="#12141a" stroke="#2a2e38" stroke-width="1.5"/>
    <text x="728" y="162" fill="#6d7586" font-family="${font}" font-size="22">Search...</text>
    <circle cx="1148" cy="154" r="14" fill="none" stroke="#8b93a7" stroke-width="2.5"/>
    <path d="M1158 164 L1168 174" stroke="#8b93a7" stroke-width="2.5" stroke-linecap="round"/>

    <rect x="700" y="206" width="492" height="96" rx="16" fill="#12141a" stroke="#2a2e38" stroke-width="1.5"/>
    <rect x="728" y="236" width="180" height="14" rx="7" fill="#3a4150"/>
    <rect x="728" y="262" width="280" height="8" rx="4" fill="#2a2e38"/>

    <rect x="700" y="318" width="492" height="96" rx="16" fill="#12141a" stroke="#2a2e38" stroke-width="1.5"/>
    <circle cx="760" cy="366" r="22" fill="none" stroke="#0066ff" stroke-width="4"/>
    <rect x="800" y="362" width="250" height="8" rx="4" fill="#3a4150"/>

    <rect x="700" y="430" width="492" height="148" rx="16" fill="#0066ff"/>
    <text x="732" y="492" fill="#ffffff" font-family="${font}" font-size="28" font-weight="700" letter-spacing="0.6">FIX FIRST</text>
    <rect x="732" y="516" width="250" height="22" rx="6" fill="#ffffff"/>
    <path d="M1048 536 L1072 512 L1096 528 L1128 488" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M1114 488 H1128 V502" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
`);

const build = svg(`
  <text x="78" y="64" fill="#0066ff" font-family="${font}" font-size="18" font-weight="700" letter-spacing="2.4">BUILD</text>

  <rect x="72" y="92" width="820" height="548" rx="28" fill="#14161c" stroke="#2c313c" stroke-width="2"/>
  <circle cx="112" cy="128" r="7" fill="#3a4150"/>
  <circle cx="136" cy="128" r="7" fill="#3a4150"/>
  <circle cx="160" cy="128" r="7" fill="#3a4150"/>
  <rect x="104" y="164" width="756" height="440" rx="16" fill="#101218" stroke="#232833" stroke-width="1.5"/>

  <circle cx="156" cy="214" r="18" fill="#2a2e38"/>
  <rect x="196" y="206" width="92" height="8" rx="4" fill="#3a4150"/>
  <rect x="312" y="206" width="92" height="8" rx="4" fill="#3a4150"/>
  <rect x="428" y="206" width="92" height="8" rx="4" fill="#3a4150"/>
  <rect x="720" y="198" width="108" height="28" rx="8" fill="#232833"/>

  <rect x="140" y="260" width="250" height="12" rx="6" fill="#3a4150"/>
  <rect x="140" y="286" width="210" height="12" rx="6" fill="#2a2e38"/>
  <rect x="140" y="312" width="180" height="12" rx="6" fill="#2a2e38"/>

  <rect x="430" y="252" width="280" height="168" rx="12" fill="#1a1d24"/>
  <path d="M470 380 L520 330 L570 360 L640 300 L680 340" fill="none" stroke="#3a4150" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>
  <circle cx="668" cy="286" r="14" fill="#2a2e38"/>

  <rect x="140" y="360" width="168" height="44" rx="10" fill="#0066ff"/>
  <rect x="164" y="378" width="120" height="8" rx="4" fill="#ffffff"/>

  <path d="M308 382 H900" fill="none" stroke="#0066ff" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round"/>

  <rect x="140" y="460" width="250" height="110" rx="12" fill="#1a1d24" stroke="#232833"/>
  <circle cx="176" cy="496" r="14" fill="#2a2e38"/>
  <rect x="204" y="490" width="140" height="8" rx="4" fill="#3a4150"/>
  <rect x="204" y="510" width="100" height="8" rx="4" fill="#2a2e38"/>
  <path d="M168 546 L210 520 L250 540 L300 500 L360 530" fill="none" stroke="#3a4150" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>

  <rect x="410" y="460" width="250" height="110" rx="12" fill="#1a1d24" stroke="#232833"/>
  <circle cx="446" cy="496" r="14" fill="#2a2e38"/>
  <rect x="474" y="490" width="140" height="8" rx="4" fill="#3a4150"/>
  <rect x="474" y="510" width="100" height="8" rx="4" fill="#2a2e38"/>
  <rect x="434" y="532" width="202" height="22" rx="6" fill="#232833"/>

  <rect x="948" y="108" width="250" height="520" rx="36" fill="#14161c" stroke="#2c313c" stroke-width="2"/>
  <rect x="968" y="132" width="210" height="472" rx="24" fill="#101218"/>
  <rect x="1038" y="144" width="70" height="16" rx="8" fill="#14161c"/>
  <circle cx="996" cy="196" r="12" fill="#2a2e38"/>
  <rect x="1020" y="188" width="70" height="8" rx="4" fill="#3a4150"/>
  <rect x="1110" y="184" width="28" height="8" rx="2" fill="#3a4150"/>
  <rect x="1110" y="196" width="28" height="8" rx="2" fill="#3a4150"/>
  <rect x="1110" y="208" width="18" height="8" rx="2" fill="#2a2e38"/>

  <rect x="992" y="228" width="150" height="10" rx="5" fill="#3a4150"/>
  <rect x="992" y="248" width="120" height="10" rx="5" fill="#2a2e38"/>
  <rect x="992" y="268" width="136" height="10" rx="5" fill="#2a2e38"/>

  <rect x="992" y="300" width="150" height="36" rx="8" fill="#0066ff"/>
  <rect x="1012" y="314" width="110" height="8" rx="4" fill="#ffffff"/>

  <rect x="992" y="356" width="150" height="88" rx="10" fill="#1a1d24"/>
  <path d="M1016 420 L1048 392 L1080 408 L1120 376" fill="none" stroke="#3a4150" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
  <circle cx="1112" cy="378" r="8" fill="#2a2e38"/>

  <circle cx="1012" cy="478" r="12" fill="#2a2e38"/>
  <rect x="1034" y="472" width="90" height="8" rx="4" fill="#3a4150"/>
  <rect x="1034" y="490" width="70" height="8" rx="4" fill="#2a2e38"/>
  <rect x="992" y="520" width="150" height="48" rx="8" fill="#1a1d24" stroke="#232833"/>
`);

const run = svg(`
  <text x="96" y="128" fill="#0066ff" font-family="${font}" font-size="18" font-weight="700" letter-spacing="2.4">RUN</text>
  <text x="96" y="204" fill="#f4f6fb" font-family="${font}" font-size="58" font-weight="700" letter-spacing="-1.6">Stay on cost and leads.</text>

  <rect x="96" y="256" width="1088" height="96" rx="16" fill="#12141a" stroke="#2a2e38" stroke-width="1.5"/>
  <text x="132" y="314" fill="#8b93a7" font-family="${font}" font-size="24" font-weight="650" letter-spacing="1.2">SPEND</text>
  <text x="1184" y="316" fill="#f4f6fb" font-family="${font}" font-size="28" font-weight="700" text-anchor="end">$42,800</text>

  <rect x="96" y="368" width="1088" height="96" rx="16" fill="#12141a" stroke="#2a2e38" stroke-width="1.5"/>
  <text x="132" y="426" fill="#5c6578" font-family="${font}" font-size="24" font-weight="650" letter-spacing="1.2">WEAK</text>
  <rect x="132" y="404" width="520" height="8" rx="4" fill="#0066ff"/>
  <text x="1184" y="428" fill="#f4f6fb" font-family="${font}" font-size="28" font-weight="700" text-anchor="end">-14%</text>

  <rect x="96" y="480" width="1088" height="112" rx="16" fill="#0066ff"/>
  <text x="132" y="548" fill="#ffffff" font-family="${font}" font-size="26" font-weight="700" letter-spacing="1.4">LEADS</text>
  <path d="M560 568 L610 528 L660 552 L720 496" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M704 496 H720 V512" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="1184" y="552" fill="#ffffff" font-family="${font}" font-size="36" font-weight="700" text-anchor="end">+3,402</text>

  <g fill="#3a4150">
    <rect x="150" y="632" width="4" height="22" rx="2"/>
    <rect x="250" y="632" width="4" height="22" rx="2"/>
    <rect x="350" y="632" width="4" height="22" rx="2"/>
    <rect x="450" y="632" width="4" height="22" rx="2"/>
    <rect x="550" y="632" width="4" height="22" rx="2"/>
    <rect x="650" y="632" width="4" height="22" rx="2"/>
    <rect x="750" y="632" width="4" height="22" rx="2"/>
    <rect x="850" y="632" width="4" height="22" rx="2"/>
    <rect x="950" y="624" width="4" height="30" rx="2" fill="#0066ff"/>
    <rect x="1050" y="632" width="4" height="22" rx="2"/>
  </g>
`);

for (const [name, markup] of [
  ["audit", audit],
  ["build", build],
  ["run", run],
]) {
  const file = path.join(outDir, `${name}.webp`);
  const png = await sharp(Buffer.from(markup)).png().toBuffer();
  await sharp(png).webp({ lossless: true, effort: 6 }).toFile(file);
  await writeFile(path.join(process.cwd(), "tmp", `process-new-${name}.png`), png);
  const meta = await sharp(file).metadata();
  console.log(name, `${meta.width}x${meta.height}`);
}
