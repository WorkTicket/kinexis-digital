import IndustryAudit from "./IndustryAudit";
import { englishPath, getLocale, getRequestPath, spainizeData, withLocale } from "@/lib/i18n";

/** Pages that already render this offer, or that are the audit form, checkout, or legal copy. */
const HIDE = new Set([
  "/audit",
  "/contact",
  "/strategy-call",
  "/privacy",
  "/terms",
  "/client-login",
  "/update",
  "/pay",
]);

const ES = {
  eyebrow: "Auditoría gratis del sitio",
  heading: "Obtén una auditoría gratis y aumenta tu rentabilidad.",
  mark: "tu rentabilidad",
  text: "Te mostramos dónde tu sitio puede mejorar de forma clara. Ofrecemos auditorías gratis y de pago.",
  cta: "Quiero mi auditoría gratis",
  alt: "Laptop, teléfono, lupa y una ficha de auditoría",
  checks: [
    {
      title: "Velocidad",
      text: "Qué tan rápido cargan las páginas en un celular y en una computadora.",
      icon: "speed",
    },
    {
      title: "Visibilidad en búsquedas",
      text: "Si los títulos, la estructura y las páginas están listos para que los buscadores los lean.",
      icon: "search",
    },
    {
      title: "Experiencia en el celular",
      text: "Cómo se ve el sitio en un teléfono, el tamaño del texto y lo que alcanza el pulgar.",
      icon: "mobile",
    },
    {
      title: "Llamadas y cotizaciones",
      text: "Si el número, los botones y los formularios dejan claro el siguiente paso.",
      icon: "conversion",
    },
  ],
};

function alreadyHasAudit(path: string) {
  if (HIDE.has(path) || path.startsWith("/pay/")) return true;
  if (path.startsWith("/industries/") && path !== "/industries") return true;
  return path === "/portfolio" || path.startsWith("/portfolio/");
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
