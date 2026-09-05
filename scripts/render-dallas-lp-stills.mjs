/**
 * Designed editorial stills for the Dallas website-audit lander.
 * Same language as industry boards: dark studio, signal blue, UI — not photos.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "assets", "images", "lp");

const BLUE = "#0066ff";
const FONT = "Segoe UI, Arial, Helvetica, sans-serif";

function dots(x, y, cols = 6, rows = 6, gap = 14) {
  let c = "";
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      c += `<circle cx="${x + i * gap}" cy="${y + j * gap}" r="1.15" fill="#fff" opacity="0.14"/>`;
    }
  }
  return c;
}

function cross(x, y, s = 18) {
  return `<g stroke="#fff" stroke-opacity="0.22" stroke-width="1" fill="none">
    <line x1="${x - s}" y1="${y}" x2="${x + s}" y2="${y}"/>
    <line x1="${x}" y1="${y - s}" x2="${x}" y2="${y + s}"/>
  </g>`;
}

function phone({
  x,
  y,
  w = 292,
  h = 596,
  clip,
  inner,
  filter,
}) {
  return `
  <g transform="translate(${x} ${y})"${filter ? ` filter="url(#${filter})"` : ""}>
    <rect width="${w}" height="${h}" rx="42" fill="#07080c" stroke="#2a2d36" stroke-width="2"/>
    <rect x="10" y="10" width="${w - 20}" height="${h - 20}" rx="34" fill="#0b0d12"/>
    <rect x="${w / 2 - 28}" y="18" width="56" height="8" rx="4" fill="#1a1d24"/>
    <clipPath id="${clip}">
      <rect x="16" y="32" width="${w - 32}" height="${h - 56}" rx="26"/>
    </clipPath>
    <g clip-path="url(#${clip})">
      ${inner}
    </g>
    <rect x="${w / 2 - 42}" y="${h - 22}" width="84" height="5" rx="2.5" fill="#2a2d36"/>
  </g>`;
}

function mark({ x, y, w, h, rx = 8 }) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="none" stroke="#ff5c5c" stroke-opacity="0.85" stroke-width="2" stroke-dasharray="7 5"/>`;
}

function pin(x, y, label, side = "right") {
  const tw = Math.max(118, label.length * 8.2 + 28);
  const lx = side === "left" ? x - 14 - tw : x + 14;
  const ly = y - 16;
  const cx1 = side === "left" ? x - 14 : x + 14;
  return `
  <g>
    <line x1="${x}" y1="${y}" x2="${cx1}" y2="${ly + 16}" stroke="#ff5c5c" stroke-opacity="0.7" stroke-width="1.5"/>
    <circle cx="${x}" cy="${y}" r="7" fill="#1a0d0d" stroke="#ff5c5c" stroke-width="1.5"/>
    <circle cx="${x}" cy="${y}" r="2.6" fill="#ff5c5c"/>
    <g transform="translate(${lx} ${ly})">
      <rect width="${tw}" height="32" rx="16" fill="#1a0d0d" stroke="#ff5c5c" stroke-opacity="0.55"/>
      <text x="${tw / 2}" y="21" text-anchor="middle" fill="#ffd0d0" font-family="${FONT}" font-size="13" font-weight="700">${label}</text>
    </g>
  </g>`;
}

function heroSvg() {
  const w = 1536;
  const h = 840;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" fill="#050505"/>
    <radialGradient id="hg" cx="62%" cy="48%" r="48%">
      <stop offset="0%" stop-color="${BLUE}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${BLUE}" stop-opacity="0"/>
    </radialGradient>
    <rect width="${w}" height="${h}" fill="url(#hg)"/>
    ${dots(72, 64, 8, 5)}
    ${dots(1380, 700, 7, 5)}
    ${cross(80, 760)}
    ${cross(1456, 80)}

    <!-- Desktop frame, ghosted -->
    <g transform="translate(430 148)" opacity="0.55">
      <rect width="720" height="460" rx="18" fill="#0c0e14" stroke="#2a2d36" stroke-width="1.5"/>
      <rect width="720" height="36" rx="18" fill="#10131a"/>
      <rect y="18" width="720" height="18" fill="#10131a"/>
      <circle cx="22" cy="18" r="5" fill="#3a3d46"/>
      <circle cx="40" cy="18" r="5" fill="#3a3d46"/>
      <circle cx="58" cy="18" r="5" fill="#3a3d46"/>
      <rect x="88" y="12" width="220" height="12" rx="6" fill="#1c2028"/>
      <rect x="48" y="72" width="280" height="22" rx="4" fill="#ececec" opacity="0.9"/>
      <rect x="48" y="108" width="210" height="10" rx="3" fill="#6b6f78"/>
      <rect x="48" y="126" width="246" height="10" rx="3" fill="#3a3d46"/>
      <rect x="48" y="168" width="132" height="34" rx="8" fill="${BLUE}"/>
      <rect x="400" y="72" width="272" height="168" rx="10" fill="#161920"/>
      <rect x="48" y="248" width="200" height="88" rx="10" fill="#161920"/>
      <rect x="264" y="248" width="200" height="88" rx="10" fill="#161920"/>
      <rect x="480" y="248" width="192" height="88" rx="10" fill="#161920"/>
    </g>

    <!-- Phone: CTA clipped — the leak -->
    ${phone({
      x: 1028,
      y: 176,
      clip: "heroPhone",
      inner: `
        <rect x="16" y="32" width="260" height="540" fill="#f4f4f2"/>
        <rect x="36" y="52" width="88" height="10" rx="3" fill="#c8c8c4"/>
        <rect x="36" y="84" width="176" height="16" rx="3" fill="#111"/>
        <rect x="36" y="108" width="132" height="8" rx="3" fill="#9a9a96"/>
        <rect x="36" y="132" width="220" height="118" rx="8" fill="#d9d9d4"/>
        <rect x="36" y="268" width="220" height="10" rx="3" fill="#c8c8c4"/>
        <rect x="36" y="286" width="168" height="10" rx="3" fill="#c8c8c4"/>
        <rect x="36" y="318" width="220" height="72" rx="8" fill="#e8e8e4"/>
        <rect x="36" y="408" width="220" height="72" rx="8" fill="#e8e8e4"/>
        <rect x="36" y="528" width="220" height="44" rx="10" fill="${BLUE}"/>
      `,
    })}

    <!-- Drop-off rail -->
    <g transform="translate(118 250)">
      <rect width="248" height="340" rx="18" fill="#0c0e14" stroke="#22252c" stroke-width="1"/>
      <text x="24" y="42" fill="${BLUE}" font-family="${FONT}" font-size="13" font-weight="700" letter-spacing="2.4">THE LEAK</text>
      <g transform="translate(36 78)">
        <rect width="44" height="196" rx="6" fill="${BLUE}" opacity="0.92"/>
        <rect x="68" width="44" height="118" y="78" rx="6" fill="#3a3d46"/>
        <rect x="136" width="44" height="36" y="160" rx="6" fill="#1c2028"/>
      </g>
      <text x="36" y="300" fill="#9aa0ab" font-family="${FONT}" font-size="13">Visits</text>
      <text x="104" y="300" fill="#9aa0ab" font-family="${FONT}" font-size="13">Clicks</text>
      <text x="176" y="300" fill="#9aa0ab" font-family="${FONT}" font-size="13">Calls</text>
    </g>
  </svg>`;
}

function painSvg() {
  const w = 1536;
  const h = 1024;
  const SERIF = "Georgia, 'Times New Roman', Times, serif";
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" fill="#050505"/>
    <radialGradient id="pg" cx="48%" cy="42%" r="52%">
      <stop offset="0%" stop-color="${BLUE}" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="${BLUE}" stop-opacity="0"/>
    </radialGradient>
    <rect width="${w}" height="${h}" fill="url(#pg)"/>
    ${dots(56, 48, 7, 5)}
    ${dots(1408, 900, 7, 5)}
    ${cross(64, 960)}
    ${cross(1472, 64)}
    <filter id="painPhoneShadow" x="-25%" y="-8%" width="160%" height="125%">
      <feDropShadow dx="10" dy="24" stdDeviation="18" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
    <linearGradient id="painSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7f9aab"/>
      <stop offset="55%" stop-color="#c9c4b6"/>
      <stop offset="100%" stop-color="#b7a078"/>
    </linearGradient>

    <!-- Dated contractor site in a browser -->
    <g transform="translate(48 56)">
      <rect width="1188" height="912" rx="18" fill="#0c0e14" stroke="#2a2d36" stroke-width="1.5"/>
      <clipPath id="painBrowser">
        <rect width="1188" height="912" rx="18"/>
      </clipPath>
      <g clip-path="url(#painBrowser)">
        <!-- Chrome -->
        <rect width="1188" height="52" fill="#10131a"/>
        <circle cx="24" cy="26" r="6" fill="#3a3d46"/>
        <circle cx="44" cy="26" r="6" fill="#3a3d46"/>
        <circle cx="64" cy="26" r="6" fill="#3a3d46"/>
        <rect x="96" y="14" width="720" height="24" rx="12" fill="#161920"/>
        <circle cx="114" cy="26" r="5" fill="#2a2d36"/>
        <text x="128" y="31" fill="#6b6f78" font-family="${FONT}" font-size="13">ridgeviewair.com</text>
        <rect x="1088" y="16" width="76" height="20" rx="6" fill="#1c2028"/>

        <!-- Beige 2016 template -->
        <rect y="52" width="1188" height="860" fill="#efeae0"/>

        <!-- Maroon header + serif wordmark -->
        <rect y="52" width="1188" height="86" fill="#4a1f1c"/>
        <text x="36" y="92" fill="#f3e6c8" font-family="${SERIF}" font-size="34" font-weight="700">Ridgeview Air</text>
        <text x="36" y="118" fill="#c9b48a" font-family="${SERIF}" font-size="13" font-style="italic">Heating · Cooling · Since 1998</text>
        <g font-family="${SERIF}" font-size="15" fill="#e8d7b0">
          <text x="620" y="104">Home</text>
          <text x="698" y="104">About Us</text>
          <text x="802" y="104">Services</text>
          <text x="906" y="104">Gallery</text>
          <text x="996" y="104">Testimonials</text>
          <text x="1126" y="104" fill="#fff">Contact</text>
        </g>

        <!-- Hero: washed stock house + welcome copy -->
        <rect x="36" y="160" width="520" height="268" rx="4" fill="url(#painSky)"/>
        <circle cx="468" cy="196" r="22" fill="#efe3b8" opacity="0.85"/>
        <ellipse cx="132" cy="318" rx="48" ry="72" fill="#5f6d4e"/>
        <ellipse cx="132" cy="292" rx="36" ry="48" fill="#6d7c58"/>
        <rect x="36" y="352" width="520" height="76" fill="#9aa36f"/>
        <polygon points="296,198 188,276 404,276" fill="#7a332c"/>
        <rect x="214" y="276" width="164" height="108" fill="#efe6d6"/>
        <rect x="236" y="296" width="42" height="36" fill="#6f92a6"/>
        <rect x="314" y="296" width="42" height="36" fill="#6f92a6"/>
        <rect x="280" y="336" width="32" height="48" fill="#5c3a2e"/>
        <rect x="372" y="248" width="22" height="46" fill="#6a2e28"/>
        <rect x="428" y="318" width="16" height="58" fill="#7a8470"/>
        <rect x="452" y="332" width="12" height="44" fill="#7a8470"/>

        <text x="584" y="206" fill="#2a2218" font-family="${SERIF}" font-size="34" font-weight="700">Welcome to Our Website!</text>
        <text x="584" y="240" fill="#6a5e4e" font-family="${SERIF}" font-size="18">Serving Dallas homeowners since 1998.</text>
        <text x="584" y="276" fill="#8a7d6c" font-family="${FONT}" font-size="15">Use the links above to learn more,</text>
        <text x="584" y="298" fill="#8a7d6c" font-family="${FONT}" font-size="15">view the gallery, or send an email.</text>
        <rect x="584" y="336" width="132" height="36" rx="2" fill="#6e6a62"/>
        <text x="650" y="360" text-anchor="middle" fill="#efeae0" font-family="${FONT}" font-size="14">Email Us</text>
        <text x="732" y="360" fill="#8a7d6c" font-family="${FONT}" font-size="13">or see Contact in the menu</text>

        <!-- Three equal brochure cards -->
        <g transform="translate(36 456)">
          <rect width="360" height="210" fill="#e4ddd0" stroke="#d2cbbd"/>
          <circle cx="180" cy="56" r="28" fill="#cfc6b6"/>
          <path d="M166 62 l14-22 14 22 h-8 v14 h-12 v-14 z" fill="#8b3a32"/>
          <text x="180" y="112" text-anchor="middle" fill="#2a2218" font-family="${SERIF}" font-size="22" font-weight="700">Heating</text>
          <text x="180" y="142" text-anchor="middle" fill="#7a6e60" font-family="${FONT}" font-size="14">Furnace repair and</text>
          <text x="180" y="162" text-anchor="middle" fill="#7a6e60" font-family="${FONT}" font-size="14">seasonal tune-ups.</text>
          <text x="180" y="188" text-anchor="middle" fill="#4a6aa0" font-family="${FONT}" font-size="13" text-decoration="underline">Click here</text>

          <g transform="translate(384 0)">
            <rect width="360" height="210" fill="#e4ddd0" stroke="#d2cbbd"/>
            <circle cx="180" cy="56" r="28" fill="#cfc6b6"/>
            <rect x="166" y="44" width="28" height="28" rx="4" fill="#4a6aa0"/>
            <text x="180" y="112" text-anchor="middle" fill="#2a2218" font-family="${SERIF}" font-size="22" font-weight="700">Cooling</text>
            <text x="180" y="142" text-anchor="middle" fill="#7a6e60" font-family="${FONT}" font-size="14">AC install, service,</text>
            <text x="180" y="162" text-anchor="middle" fill="#7a6e60" font-family="${FONT}" font-size="14">and emergency calls.</text>
            <text x="180" y="188" text-anchor="middle" fill="#4a6aa0" font-family="${FONT}" font-size="13" text-decoration="underline">Click here</text>
          </g>

          <g transform="translate(768 0)">
            <rect width="348" height="210" fill="#e4ddd0" stroke="#d2cbbd"/>
            <circle cx="174" cy="56" r="28" fill="#cfc6b6"/>
            <circle cx="174" cy="56" r="10" fill="none" stroke="#8b3a32" stroke-width="3"/>
            <text x="174" y="112" text-anchor="middle" fill="#2a2218" font-family="${SERIF}" font-size="22" font-weight="700">About Us</text>
            <text x="174" y="142" text-anchor="middle" fill="#7a6e60" font-family="${FONT}" font-size="14">Family owned. Same</text>
            <text x="174" y="162" text-anchor="middle" fill="#7a6e60" font-size="14" font-family="${FONT}">shop since 1998.</text>
            <text x="174" y="188" text-anchor="middle" fill="#4a6aa0" font-family="${FONT}" font-size="13" text-decoration="underline">Click here</text>
          </g>
        </g>

        <!-- Footer: buried number, 2016 copyright, hit counter -->
        <rect y="700" width="1188" height="212" fill="#d9d2c4"/>
        <text x="36" y="744" fill="#5a5044" font-family="${SERIF}" font-size="18">Thank you for visiting.</text>
        <text x="36" y="776" fill="#7a6e60" font-family="${FONT}" font-size="14">Questions? Use the Contact page. Phone listed at the bottom of that form.</text>
        <rect x="36" y="800" width="118" height="28" rx="2" fill="#c8c0b0"/>
        <text x="95" y="819" text-anchor="middle" fill="#5a5044" font-family="${FONT}" font-size="12">Email Us</text>
        <text x="36" y="860" fill="#8a7d6c" font-family="${FONT}" font-size="12">© 2016 Ridgeview Air · Best viewed in Internet Explorer · Visitors: 002,847</text>
        <text x="980" y="860" fill="#8a7d6c" font-family="${FONT}" font-size="12">webmaster@ridgeviewair.com</text>
      </g>
    </g>

    ${mark({ x: 78, y: 208, w: 1080, h: 288, rx: 6 })}

    ${phone({
      x: 1148,
      y: 168,
      w: 332,
      h: 676,
      clip: "painPhone",
      filter: "painPhoneShadow",
      inner: `
        <rect x="16" y="32" width="300" height="612" fill="#efeae0"/>
        <rect x="16" y="32" width="300" height="58" fill="#4a1f1c"/>
        <text x="36" y="68" fill="#f3e6c8" font-family="${SERIF}" font-size="16" font-weight="700">Ridgeview Air</text>
        <rect x="268" y="48" width="28" height="22" rx="3" fill="#2a1614"/>
        <rect x="274" y="54" width="16" height="2.2" rx="1" fill="#efeae0"/>
        <rect x="274" y="59" width="16" height="2.2" rx="1" fill="#efeae0"/>
        <rect x="274" y="64" width="11" height="2.2" rx="1" fill="#efeae0"/>
        <text x="36" y="122" fill="#2a2218" font-family="${SERIF}" font-size="20" font-weight="700">Welcome to</text>
        <text x="36" y="146" fill="#2a2218" font-family="${SERIF}" font-size="20" font-weight="700">Our Website!</text>
        <rect x="36" y="166" width="260" height="128" rx="4" fill="#c8d0d6"/>
        <polygon points="166,196 126,236 206,236" fill="#8b3a32"/>
        <rect x="140" y="236" width="52" height="40" fill="#efe6d6"/>
        <rect x="36" y="312" width="260" height="10" rx="3" fill="#c4b8a6"/>
        <rect x="36" y="330" width="196" height="10" rx="3" fill="#c4b8a6"/>
        <rect x="36" y="360" width="124" height="88" rx="4" fill="#e4ddd0"/>
        <rect x="172" y="360" width="124" height="88" rx="4" fill="#e4ddd0"/>
        <rect x="36" y="464" width="260" height="10" rx="3" fill="#c4b8a6"/>
        <rect x="36" y="482" width="188" height="10" rx="3" fill="#c4b8a6"/>
        <rect x="36" y="560" width="260" height="52" rx="8" fill="${BLUE}"/>
        <text x="166" y="592" text-anchor="middle" fill="#fff" font-family="${FONT}" font-size="16" font-weight="700">Get a Quote</text>

        <!-- Hamburger drawer covering the quote path -->
        <rect x="16" y="32" width="168" height="612" fill="#111214" opacity="0.96"/>
        <text x="36" y="78" fill="#6b6f78" font-family="${FONT}" font-size="11" letter-spacing="1.6">MENU</text>
        <text x="36" y="122" fill="#e8eaef" font-family="${FONT}" font-size="16">Home</text>
        <text x="36" y="158" fill="#e8eaef" font-family="${FONT}" font-size="16">About Us</text>
        <text x="36" y="194" fill="#e8eaef" font-family="${FONT}" font-size="16">Our Services</text>
        <text x="36" y="230" fill="#e8eaef" font-family="${FONT}" font-size="16">Photo Gallery</text>
        <text x="36" y="266" fill="#e8eaef" font-family="${FONT}" font-size="16">Testimonials</text>
        <text x="36" y="302" fill="#e8eaef" font-family="${FONT}" font-size="16">Contact</text>
        <rect x="36" y="340" width="140" height="1" fill="#2a2d36"/>
        <text x="36" y="372" fill="#6b6f78" font-family="${FONT}" font-size="12">Phone on Contact page</text>
      `,
    })}

    ${pin(300, 292, "Looks outdated", "right")}
    ${pin(1324, 596, "Menu covers quote", "left")}
    ${pin(168, 868, "No next step", "right")}

    <g transform="translate(1288 112)">
      <rect width="156" height="40" rx="20" fill="#1a0d0d" stroke="#ff5c5c" stroke-opacity="0.75"/>
      <circle cx="22" cy="20" r="5" fill="#ff5c5c"/>
      <text x="40" y="26" fill="#ffb4b4" font-family="${FONT}" font-size="13" font-weight="700" letter-spacing="1.6">LEFT</text>
    </g>
  </svg>`;
}

function spotlightSvg() {
  const w = 1408;
  const h = 1056;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" fill="#050505"/>
    <radialGradient id="sg" cx="72%" cy="42%" r="42%">
      <stop offset="0%" stop-color="${BLUE}" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="${BLUE}" stop-opacity="0"/>
    </radialGradient>
    <rect width="${w}" height="${h}" fill="url(#sg)"/>
    ${dots(64, 56, 7, 6)}
    ${dots(1248, 920, 8, 6)}
    ${cross(72, 984)}
    ${cross(1340, 72)}

    <text x="88" y="168" fill="${BLUE}" font-family="${FONT}" font-size="20" font-weight="700" letter-spacing="3.4">THE SITE</text>
    <text x="88" y="248" fill="#fff" font-family="${FONT}" font-size="64" font-weight="700">Next step</text>
    <text x="88" y="318" fill="#fff" font-family="${FONT}" font-size="64" font-weight="700">stays on.</text>
    <text x="88" y="382" fill="#8b909a" font-family="${FONT}" font-size="22">Offer. Proof. A way to call.</text>

    <g transform="translate(88 800)">
      <circle cx="22" cy="22" r="22" fill="none" stroke="${BLUE}" stroke-width="2"/>
      <path d="M12 23 l7 7 14-16" fill="none" stroke="${BLUE}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="58" y="28" fill="#c8ccd4" font-family="${FONT}" font-size="18">Quote path on a phone</text>
    </g>

    <!-- Clean desktop behind -->
    <g transform="translate(560 150)" opacity="0.42">
      <rect width="560" height="380" rx="16" fill="#0c0e14" stroke="#2a2d36"/>
      <rect width="560" height="34" fill="#10131a"/>
      <circle cx="22" cy="17" r="5" fill="#3a3d46"/>
      <circle cx="40" cy="17" r="5" fill="#3a3d46"/>
      <circle cx="58" cy="17" r="5" fill="#3a3d46"/>
      <rect x="40" y="64" width="240" height="20" rx="4" fill="#ececec"/>
      <rect x="40" y="98" width="200" height="10" rx="3" fill="#5a5e66"/>
      <rect x="40" y="132" width="128" height="32" rx="8" fill="${BLUE}"/>
      <rect x="320" y="64" width="196" height="132" rx="10" fill="#161920"/>
      <rect x="40" y="196" width="156" height="96" rx="10" fill="#161920"/>
      <rect x="212" y="196" width="156" height="96" rx="10" fill="#161920"/>
      <rect x="384" y="196" width="132" height="96" rx="10" fill="#161920"/>
    </g>

    ${phone({
      x: 980,
      y: 210,
      clip: "spotPhone",
      inner: `
        <rect x="16" y="32" width="260" height="540" fill="#0b0d12"/>
        <rect x="36" y="52" width="72" height="8" rx="3" fill="#3a3d46"/>
        <rect x="36" y="80" width="188" height="16" rx="3" fill="#f2f2f2"/>
        <rect x="36" y="104" width="148" height="8" rx="3" fill="#6b6f78"/>
        <rect x="36" y="132" width="220" height="120" rx="10" fill="#161920"/>
        <rect x="36" y="272" width="220" height="44" rx="10" fill="${BLUE}"/>
        <rect x="36" y="336" width="220" height="12" rx="3" fill="#2a2d36"/>
        <rect x="36" y="360" width="168" height="12" rx="3" fill="#2a2d36"/>
        <rect x="36" y="400" width="220" height="64" rx="10" fill="#12141a" stroke="#22252c"/>
        <rect x="48" y="416" width="120" height="8" rx="3" fill="#5a5e66"/>
        <rect x="48" y="434" width="196" height="16" rx="4" fill="#1c2028"/>
        <rect x="36" y="484" width="220" height="64" rx="10" fill="#12141a" stroke="#22252c"/>
        <rect x="48" y="500" width="88" height="8" rx="3" fill="#5a5e66"/>
        <rect x="48" y="518" width="196" height="16" rx="4" fill="#1c2028"/>
      `,
    })}

    <g transform="translate(1088 178)">
      <rect width="176" height="40" rx="20" fill="#061428" stroke="${BLUE}" stroke-opacity="0.8"/>
      <circle cx="22" cy="20" r="5" fill="${BLUE}"/>
      <text x="36" y="26" fill="#d6e4ff" font-family="${FONT}" font-size="13" font-weight="700" letter-spacing="1.2">ON SCREEN</text>
    </g>
  </svg>`;
}

async function writeWebp(svg, name, width, height) {
  const dest = path.join(outDir, name);
  await sharp(Buffer.from(svg))
    .resize(width, height, { fit: "cover" })
    .webp({ quality: 70, effort: 6 })
    .toFile(dest);
  const meta = await sharp(dest).metadata();
  console.log(`${name}  ${meta.width}x${meta.height}`);
}

async function recompress(name, width, height, quality) {
  const dest = path.join(outDir, name);
  const buffer = await sharp(dest)
    .resize(width, height, { fit: "cover", withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toBuffer();
  await writeFile(dest, buffer);
  const meta = await sharp(dest).metadata();
  console.log(`${name}  ${meta.width}x${meta.height}  ${buffer.length}b`);
}

await mkdir(outDir, { recursive: true });

if (process.argv.includes("--rebuild-ui")) {
  await writeWebp(painSvg(), "dallas-pain.webp", 1200, 800);
  if (process.argv.includes("--all")) {
    await writeWebp(spotlightSvg(), "dallas-spotlight.webp", 1200, 800);
  }
} else {
  const skyline = path.join(outDir, "dallas-skyline.webp");
  const skylineBuffer = await sharp(skyline).toBuffer();
  await recompress("dallas-skyline.webp", 1536, 840, 64);
  const sm = path.join(outDir, "dallas-skyline-sm.webp");
  const skylineWide = await sharp(skylineBuffer)
    .resize(768, 420, { fit: "inside" })
    .toBuffer();
  const { data, info } = await sharp(skylineWide)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const sample = (rowY) => {
    let r = 0;
    let g = 0;
    let b = 0;
    const start = rowY * info.width * 3;
    for (let x = 0; x < info.width; x += 1) {
      const i = start + x * 3;
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }
    return [r, g, b]
      .map((v) =>
        Math.round(v / info.width)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("");
  };
  const skyHex = `#${sample(2)}`;
  const groundHex = `#${sample(info.height - 3)}`;
  const canvas = await sharp(
    Buffer.from(`<svg width="768" height="1344" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyHex}"/>
      <stop offset="0.18" stop-color="${skyHex}"/>
      <stop offset="0.58" stop-color="${groundHex}"/>
      <stop offset="1" stop-color="#050505"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
</svg>`),
  )
    .composite([{ input: skylineWide, top: 176, left: 0 }])
    .webp({ quality: 58, effort: 6 })
    .toBuffer();
  await writeFile(sm, canvas);
  console.log(`dallas-skyline-sm.webp  768x1344  ${canvas.length}b`);
  await recompress("dallas-pain.webp", 1200, 800, 68);
  await recompress("dallas-spotlight.webp", 1200, 800, 68);

  const street = path.join(outDir, "dallas-street.webp");
  const streetSm = path.join(outDir, "dallas-street-sm.webp");
  const streetSmBuffer = await sharp(street)
    .resize(768, 1344, { fit: "cover", position: "east" })
    .webp({ quality: 58, effort: 6 })
    .toBuffer();
  await writeFile(streetSm, streetSmBuffer);
  console.log(`dallas-street-sm.webp  768x1344  ${streetSmBuffer.length}b`);
}
