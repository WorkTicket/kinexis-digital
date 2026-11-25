/**
 * Builds ES_CORE for all pillar slugs using EN section counts + native Spanish prose blocks.
 * Run: npx tsx scripts/es-pillars-core/generate-all.mjs
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PILLAR_POSTS } from "../../src/data/pillar-posts.ts";
import { PILLAR_POSTS_MORE } from "../../src/data/pillar-posts-more.ts";
import local from "./local-seo.mjs";
import { PROSE } from "./prose-blocks.mjs";
import { H2_ES } from "./h2-es.mjs";
import { LEADS_ES } from "./leads-es.mjs";

const EN = { ...PILLAR_POSTS, ...PILLAR_POSTS_MORE };
const SLUGS = Object.keys(H2_ES);

const ES_CORE = {
  [local.slug]: { lead: local.lead, sections: local.sections },
};

function paragraphsFor(slug, index, enHtml) {
  const openers = {
    0: `La escena habitual: alguien busca con el problema encima y decide en segundos si tú eres la empresa correcta.`,
    1: `No hace falta un glosario de marketing. Hace falta que la persona entienda el trabajo, la zona y cómo marcarte sin investigar.`,
    2: `Los planes publicados de Kinexis — Website $97/mes, Lead System $197/mes, Plus $297/mes u Own It $1,497 — incluyen vista previa gratis del inicio en 2 días hábiles, sin tarjeta. El SEO continuo no va en los cuatro planes; se cotiza aparte.`,
    3: `El texto por llamada perdida es opcional en Lead System y Plus: segundo número $1/mes si lo usas, más tarifas del operador; aprobación del operador suele tardar 10–15 días y no está garantizada. En Website u Own It el extra de texto suele ser $97/mes con las mismas reglas de línea dedicada.`,
  };
  const p = [
    openers[index % 4],
    PROSE[(index * 3 + slug.length) % PROSE.length],
    PROSE[(index * 7 + slug.charCodeAt(0)) % PROSE.length],
    PROSE[(index * 11 + 5) % PROSE.length],
  ];
  // Preserve outbound links from EN section in a closing paragraph when present
  const links = [...enHtml.matchAll(/<a\s+[^>]*href="https:\/\/[^"]+"[^>]*>[\s\S]*?<\/a>/g)].map(
    (m) => m[0],
  );
  const uniq = [...new Set(links)];
  if (uniq.length) {
    p.push(`Fuentes y lectura relacionada: ${uniq.join(" ")}.`);
  }
  return p;
}

for (const slug of SLUGS) {
  if (slug === local.slug) continue;
  const en = EN[slug];
  if (!en) throw new Error(`Missing EN pillar ${slug}`);
  const h2s = H2_ES[slug];
  if (!h2s || h2s.length !== en.sections.length) {
    throw new Error(`H2_ES length mismatch for ${slug}`);
  }
  ES_CORE[slug] = {
    lead: LEADS_ES[slug],
    sections: en.sections.map((sec, i) => ({
      h2: h2s[i],
      paragraphs: paragraphsFor(slug, i, sec.html),
    })),
  };
}

const out = join(dirname(fileURLToPath(import.meta.url)), "bundled.mjs");
const text = `/** Auto-generated — run generate-all.mjs */\nexport const ES_CORE = ${JSON.stringify(ES_CORE, null, 2)};\n`;
writeFileSync(out, text, "utf8");
console.log("Wrote", out, Object.keys(ES_CORE).length, "slugs");
