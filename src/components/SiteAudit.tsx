import IndustryAudit from "./IndustryAudit";
import { englishPath, getLocale, getRequestPath, spainizeData, withLocale } from "@/lib/i18n";

/** Pages that already render this offer, or that are the audit form, checkout, or legal copy. */
const HIDE = new Set([
  "/audit",
  "/privacy",
  "/terms",
  "/update",
  "/pay",
]);

const ES = {
  eyebrow: "Un punto de partida claro",
  heading: "Descubre qué está frenando tu sitio.",
  mark: "frenando tu sitio",
  text: "Te decimos qué funciona, qué estorba y qué cambios conviene hacer primero. Hay revisiones gratis y de pago.",
  cta: "Revisar mi sitio",
  alt: "Laptop, teléfono, lupa y una ficha de auditoría",
  checks: [
    {
      title: "Velocidad",
      text: "Qué tan rápido cargan las páginas en celular y computadora para cada visita.",
      icon: "speed",
    },
    {
      title: "Visibilidad en búsquedas",
      text: "Si títulos, estructura y páginas están listos para que los buscadores los lean.",
      icon: "search",
    },
    {
      title: "Experiencia en el celular",
      text: "Cómo se ve y usa el sitio en el teléfono, con texto legible y controles claros.",
      icon: "mobile",
    },
    {
      title: "Llamadas y cotizaciones",
      text: "Si el número, botones y formularios dejan claro cuál será el siguiente paso.",
      icon: "conversion",
    },
  ],
};

function alreadyHasAudit(path: string) {
  if (HIDE.has(path) || path.startsWith("/pay/")) return true;
  return false;

}

/** The industry free-site-audit band, on every page that does not already include it. */
export default async function SiteAudit() {
  const path = englishPath(await getRequestPath());
  if (alreadyHasAudit(path)) return null;
  const locale = await getLocale();
  const href = withLocale(locale, "/audit");
  if (locale === "en") return <IndustryAudit href={href} />;
  const copy = locale === "es-ES" ? spainizeData(ES) : ES;
  return <IndustryAudit href={href} {...copy} />;
}
