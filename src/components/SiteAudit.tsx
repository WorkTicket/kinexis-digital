import IndustryAudit from "./IndustryAudit";
import type { Locale } from "@/lib/i18n";
import { spainizeData, withLocale } from "@/lib/i18n";

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
      icon: "audit-speed",
    },
    {
      title: "Visibilidad en búsquedas",
      text: "Si títulos, estructura y páginas están listos para que los buscadores los lean.",
      icon: "search-optimized",
    },
    {
      title: "Experiencia en el celular",
      text: "Cómo se ve y usa el sitio en el teléfono, con texto legible y controles claros.",
      icon: "audit-mobile",
    },
    {
      title: "Llamadas y cotizaciones",
      text: "Si el número, botones y formularios dejan claro cuál será el siguiente paso.",
      icon: "audit-conversion",
    },
  ],
};

/**
 * Industry free-site-audit band. Hidden on audit/legal/pay via `html.no-audit`
 * (set by the route-chrome boot script) so this stays fully static.
 */
export default function SiteAudit({ locale }: { locale: Locale }) {
  const href = withLocale(locale, "/audit");
  if (locale === "en") return <IndustryAudit href={href} />;
  const copy = locale === "es-ES" ? spainizeData(ES) : ES;
  return <IndustryAudit href={href} {...copy} />;
}
