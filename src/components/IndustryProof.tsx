import Link from "next/link";
import { LIVE_SITES } from "@/data/liveSites";
import { REVIEWS } from "@/lib/content";
import type { Industry } from "@/data/industries";
import { imageSrcSet } from "@/lib/image-sources";
import { DeferredImg } from "./DeferredImg";
import { HL } from "./ui";

export default function IndustryProof({
  industry,
  locale = "en",
}: {
  industry: Industry;
  locale?: "en" | "es";
}) {
  if (!industry.proof) return null;
  const site = LIVE_SITES.find((item) => item.slug === industry.proof!.liveSiteSlug);
  if (!site) return null;
  const quote = industry.proof.quoteId
    ? REVIEWS.find((review) => review.id === industry.proof!.quoteId)
    : undefined;
  const spanishNotes: Record<string, { title: string; text: string }[]> = {
    plumbing: [
      { title: "Encabezado local y teléfono", text: "La portada destaca Spirit Lake y el norte de Idaho, con llamada directa y solicitud de presupuesto gratis desde el inicio." },
      { title: "Confianza desde el principio", text: "La licencia, el seguro, la atención directa del dueño y los presupuestos gratis aparecen antes de desplazarse." },
      { title: "Rutas según el trabajo", text: "Las tarjetas separan reparaciones, calefacción radiante, calentadores, drenajes, sistemas hidrónicos y obra nueva." },
      { title: "Horarios claros", text: "Las preguntas frecuentes indican el horario real de atención urgente, sin prometer servicio 24/7." },
    ],
    landscaping: [
      { title: "Un encabezado con ubicación", text: "La portada menciona Cedar Falls, Iowa, y ofrece un presupuesto gratis para que la gente sepa qué zona cubre el equipo." },
      { title: "Mantenimiento y proyectos separados", text: "Los servicios distinguen el cuidado del césped de muros de contención, patios y entradas." },
      { title: "Fotos reales del antes y después", text: "La galería compara trabajos realizados en Cedar Falls en lugar de depender de fotos de catálogo." },
      { title: "Zona de servicio concreta", text: "Cedar Falls, Waterloo y el condado de Black Hawk aparecen desde el principio." },
    ],
  };
  const notes = locale === "es" ? spanishNotes[industry.slug] ?? industry.proof.annotations : industry.proof.annotations;
  const heading =
    locale === "es"
      ? `Sitio de ${industry.name.toLowerCase()} en vivo: ${site.name}`
      : `Live ${industry.name} Site: ${site.name}`;

  return (
    <section className="industry-proof">
      <div className="media-split">
        <div className="media-split__copy">
          <h2>
            <HL text={heading} mark={site.name} />
          </h2>
          <p className="muted">{locale === "es" && industry.slug === "plumbing" ? "Plomería" : locale === "es" && industry.slug === "landscaping" ? "Paisajismo" : site.trade}</p>
          <ul className="industry-proof__annotations">
            {notes.map((note) => (
              <li key={note.title}>
                <strong>{note.title}</strong>
                <span>{note.text}</span>
              </li>
            ))}
          </ul>
          {quote && locale === "en" ? (
            <blockquote className="industry-proof__quote">
              <p>“{quote.quote}”</p>
              <footer>
                — {quote.name}
                {quote.role ? `, ${quote.role}` : ""}, {quote.company}
              </footer>
            </blockquote>
          ) : null}
          <p className="btn-row">
            <a className="btn btn--ghost" href={site.url} target="_blank" rel="noopener noreferrer">
              {locale === "es" ? "Visitar sitio publicado" : "Visit Live Site"}
            </a>
            <Link className="btn btn--primary" href={locale === "es" ? "/es/portfolio" : "/portfolio"} prefetch={false}>
              {locale === "es" ? "Ver portafolio" : "See Portfolio"}
            </Link>
          </p>
        </div>
        <div className="industry-proof__shot shot shot--hero shot--static">
          <div className="shot__page">
            <div className="shot__track">
              <DeferredImg
                src={site.image}
                srcSet={imageSrcSet(site.image, [320, 400, 640, 800])}
                avifSrcSet={imageSrcSet(site.image, [320, 400, 640, 800], "avif")}
                sizes="(max-width: 860px) 90vw, 480px"
                alt={locale === "es" ? `Página de inicio de ${site.name}` : `${site.name} homepage`}
                width={640}
                height={Math.round((site.height * 640) / site.width)}
                className="shot__img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
