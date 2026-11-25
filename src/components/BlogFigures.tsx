import figuresBySlug from "@/data/blog-figures.json";
import { spainize } from "@/lib/spainize";

export type BlogFigure = {
  kind: "diagram" | "chart" | "screenshot";
  after: number;
  src: string;
  srcEs: string;
  width: number;
  height: number;
  alt: string;
  altEs: string;
  caption: string;
  captionEs: string;
};

const FIGURES = figuresBySlug as Record<string, BlogFigure[]>;

const KIND_LABEL = {
  en: { diagram: "Diagram", chart: "Chart", screenshot: "Screenshot" },
  es: { diagram: "Diagrama", chart: "Gráfica", screenshot: "Captura" },
} as const;

export function figuresForSection(slug: string, index: number, sectionCount: number) {
  const items = FIGURES[slug] ?? [];
  const last = Math.max(0, sectionCount - 1);
  return items.filter((figure) => Math.min(figure.after, last) === index);
}

export function BlogFigureList({
  slug,
  index,
  sectionCount,
  locale = "en",
}: {
  slug: string;
  index: number;
  sectionCount: number;
  locale?: "en" | "es-419" | "es-ES";
}) {
  const items = figuresForSection(slug, index, sectionCount);
  if (!items.length) return null;
  const spanish = locale !== "en";
  const labels = spanish ? KIND_LABEL.es : KIND_LABEL.en;

  return (
    <>
      {items.map((figure) => {
        const alt = spanish ? figure.altEs : figure.alt;
        const caption = spanish ? figure.captionEs : figure.caption;
        return (
          <figure key={`${figure.kind}-${figure.src}-${figure.after}`} className={`blog-figure blog-figure--${figure.kind}`}>
            <img
              src={spanish ? figure.srcEs : figure.src}
              alt={locale === "es-ES" ? spainize(alt) : alt}
              width={figure.width}
              height={figure.height}
              sizes="(max-width: 840px) 100vw, 758px"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
            <figcaption>
              <span className="blog-figure__kind">{labels[figure.kind]}</span>
              {locale === "es-ES" ? spainize(caption) : caption}
            </figcaption>
          </figure>
        );
      })}
    </>
  );
}
