import Link from "next/link";
import { CASE_STUDIES } from "@/data/caseStudies";
import { LIVE_SITES } from "@/data/liveSites";

const FEATURED_SLUGS = ["preferred-plumbing", "a1-property-services"] as const;

const PROJECT_DETAILS: Record<(typeof FEATURED_SLUGS)[number], { en: string; es: string }> = {
  "preferred-plumbing": {
    en: "Mobile-first service layout with a clear estimate path.",
    es: "Diseño adaptable con servicios claros y un camino directo para pedir cotización.",
  },
  "a1-property-services": {
    en: "A project-gallery structure that puts real landscaping work on display.",
    es: "Una galería de proyectos para mostrar trabajos reales de jardinería y paisajismo.",
  },
};

export function HomeCaseStudyShowcase({
  locale = "en",
  hrefFor = (path: string) => path,
}: {
  locale?: "en" | "es";
  hrefFor?: (path: string) => string;
}) {
  const projects = FEATURED_SLUGS.map((slug) => {
    const study = CASE_STUDIES.find((item) => item.slug === slug);
    const site = LIVE_SITES.find((item) => item.slug === (slug === "a1-property-services" ? "a1-landscaping" : slug));
    if (!study || !site) throw new Error(`Missing featured homepage case study: ${slug}`);
    return { slug, study, site };
  });

  return (
    <div className="home-case-studies">
      {projects.map(({ slug, study, site }) => (
        <article className="home-case-study" key={study.slug}>
          <div className="home-case-study__images">
            <img
              className="home-case-study__mockup"
              src={`/portfolio/homepage-${slug}-devices-hd-1200w.webp`}
              srcSet={[
                `/portfolio/homepage-${slug}-devices-hd-640w.webp 640w`,
                `/portfolio/homepage-${slug}-devices-hd-960w.webp 960w`,
                `/portfolio/homepage-${slug}-devices-hd-1200w.webp 1200w`,
                `/portfolio/homepage-${slug}-devices-hd-1800w.webp 1800w`,
              ].join(", ")}
              sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1024px) 80vw, 1000px"
              alt={`${study.title} website displayed on laptop and phone`}
              width={1200}
              height={821}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="home-case-study__copy">
            <p className="home-case-study__trade">{site.trade}</p>
            <h3>{study.title}</h3>
            <p className="home-case-study__detail">{PROJECT_DETAILS[slug][locale]}</p>
            <Link className="home-case-study__link" href={hrefFor(`/case-studies/${study.slug}`)} prefetch={false}>
              {locale === "es" ? "Leer el caso de estudio" : "Read case study"} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
