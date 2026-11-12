import Link from "next/link";
import { notFound } from "next/navigation";
import { getIndustry, industryCostPostPath, industryPagesPostPath, relatedIndustries, type FeatureKey } from "@/data/industries";
import { INDUSTRY_FEATURES_ES, localizedIndustryFeatures } from "@/data/industry-features";
import { getProject, portfolioFile } from "@/data/portfolio";
import { localizeIndustry } from "@/i18n/industries-es";
import { spanishPlans } from "@/i18n/spanish-plans";
import IndustryGrid from "@/components/IndustryGrid";
import IndustryIncludes, { industryFeatureBody } from "@/components/IndustryIncludes";
import IndustryProof from "@/components/IndustryProof";
import IndustrySeoDepth from "@/components/IndustrySeoDepth";
import { ContentSchema } from "@/components/JsonLd";
import { INDUSTRY_SEO_DEPTH } from "@/data/industry-seo-depth";
import { ReviewRail } from "@/components/HomeBands";
import PlanOffer from "@/components/PlanOffer";
import IndustryHeroArt from "@/components/IndustryHeroArt";
import { ShotFrame } from "@/components/ShotFrame";
import TrustStrip from "@/components/TrustStrip";
import { CtaBand, Faq, HL, PageHero, Section } from "@/components/ui";
import { withLocale, type Locale } from "@/lib/i18n";

export default function SpanishIndustry({
  locale,
  slug,
  tx,
  lang,
}: {
  locale: Locale;
  slug: string;
  tx: (s: string) => string;
  lang: string;
}) {
  const base = getIndustry(slug);
  if (!base) notFound();
  const industry = localizeIndustry(base, locale);
  const project = industry.projectSlug ? getProject(industry.projectSlug) : undefined;
  const path = withLocale(locale, `/industries/${industry.slug}`);
  const href = (item: string) => withLocale(locale, item);
  const related = relatedIndustries(base).map((item) => localizeIndustry(item, locale));
  const features = localizedIndustryFeatures(tx);
  const depth = INDUSTRY_SEO_DEPTH[industry.slug];
  const spainChrome = locale === "es-ES";
  const trust = {
    leadLabel: tx("Garantía de 60 días"),
    refundLabel: tx("Devolución en 30 días"),
    downLabel: spainChrome ? tx("Sin entrada") : tx("$0 de entrada"),
    previewLabel: tx("Vista previa en 2 días hábiles"),
  };

  return (
    <>
      <ContentSchema
        path={path}
        title={industry.metaTitle}
        description={industry.metaDescription}
        crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Industrias"), path: href("/industries") }, { name: industry.name, path }]}
        faqs={[...industry.faqs]}
        serviceType={tx(`Diseño web de ${industry.name}`)}
        inLanguage={lang}
        audienceType={tx(`Empresas de ${industry.name.toLowerCase()}`)}
        exampleItems={depth?.examples
          .filter((example) => !example.demo)
          .map((example) => ({ name: example.name, url: example.url }))}
      />
      <PageHero locale={locale} eyebrow={tx("Industrias")} h1={industry.h1} mark={industry.mark} sub={industry.sub} className={`industry-hero industry-hero--${industry.slug}`} art={<IndustryHeroArt slug={industry.slug} alt={industry.heroAlt} />}>
        <div className="industry-hero__intro">
          <p>{industry.intro[0]}</p>
          <p>{industry.intro[1]}</p>
          <p>
            {tx("¿Buscas")}{" "}
            <Link href={href("/web-design")} prefetch={false}>{tx("diseño web para contratistas")}</Link>
            {tx("? Empieza ahí y vuelve a esta página de oficio.")}
          </p>
        </div>
        <p className="btn-row"><Link className="btn btn--primary" href={href("/contact")} prefetch={false}>{tx("Ver mi vista previa gratis")}</Link><Link className="btn btn--ghost" href={href("/pricing")} prefetch={false}>{tx("Ver planes y precios")}</Link></p>
        <TrustStrip className="industry-hero__trust" {...trust} />
      </PageHero>
      <Section tint>
        <h2 className="center"><HL text={tx(`Las llamadas que reciben negocios de ${industry.name.toLowerCase()}`)} mark={industry.name} /></h2>
        <p className="center muted industry-section-lead">{tx("Estas son las búsquedas y trabajos que el sitio debe dejar claros.")}</p>
        <ReviewRail
          numbersOnly
          steps={industry.services.map((point, index) => ({
            n: String(index + 1),
            title: point.title,
            text: point.text,
          }))}
        />
        <p className="center muted industry-problems-label">{industry.problemsTitle}</p>
        <div className="industry-problems">
          {industry.problems.map((point) => (
            <article className="industry-problems__item" key={point.icon}>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </article>
          ))}
        </div>
      </Section>
      {base.proof ? (
        <Section>
          <IndustryProof industry={{ ...base, name: industry.name }} locale="es" />
        </Section>
      ) : null}
      <Section accent={`/assets/industries/${industry.slug}/section-accent.svg`}>
        <h2 className="center"><HL text={tx(`Lo que incluye tu sitio de ${industry.name}`)} mark={tx("incluye")} /></h2>
        {project ? (
          <div className="media-split industry-screens">
            <div className="media-split__copy">
              <h3>{tx("Funciona en cada pantalla")}</h3>
              <p>{tx("El sitio está pensado para el celular en la entrada y la computadora en el escritorio. El número, el formulario y la zona se usan sin pellizcar.")}</p>
            </div>
            <div className="screen-art">
              <img className="screen-art__img" src={portfolioFile(`/portfolio/${project.slug}-devices-sm.webp`)} alt={tx(`${project.name} en monitor, laptop, tableta y celular`)} width={1536} height={1024} loading="lazy" decoding="async" />
            </div>
          </div>
        ) : (
          <div className="industry-screens-lead">
            <h3>{tx("Funciona en cada pantalla")}</h3>
            <p>{tx("El sitio está pensado para el celular en la entrada y la computadora en el escritorio. El número, el formulario y la zona se usan sin pellizcar.")}</p>
          </div>
        )}
        <IndustryIncludes
          features={industry.features}
          copy={features}
          featureText={(key: FeatureKey) => industryFeatureBody(industry, key, tx(INDUSTRY_FEATURES_ES[key].text))}
        />
        {depth ? (
          <div className="industry-seo-depth-wrap">
            <IndustrySeoDepth industry={{ ...base, name: industry.name }} locale="es" />
          </div>
        ) : null}
      </Section>
      <Section tint>
        <h2 className="center"><HL text={tx(`Respuesta a llamadas perdidas para ${industry.name}`)} mark={tx("llamadas perdidas")} /></h2>
        <p className="center muted" style={{ maxWidth: "42rem", marginInline: "auto" }}>{tx("Si tu equipo está en un trabajo y no contesta, el texto opcional en Lead System y Plus puede responder en tu número de seguimiento. Después del trabajo, sale el pedido de reseña en Google.")}</p>
        <p className="center btn-row spaced"><Link className="btn btn--primary" href={href("/contact")} prefetch={false}>{tx("Ver mi vista previa gratis")}</Link><Link className="btn btn--ghost" href={href("/pricing#lead-system")} prefetch={false}>{tx("Ver Lead System")}</Link></p>
      </Section>
      {project && (
        <Section>
          <div className="media-split">
            <div className="media-split__copy">
              <h2><HL text={tx(`Ejemplo de sitio web para ${industry.name}`)} mark={tx("sitio web")} /></h2>
              <p>{tx("¿Te gusta el diseño de")} <Link href={`/portfolio/${project.slug}`} hrefLang="en-US" prefetch={false}>{project.name}</Link>? {tx("Úsalo como punto de partida y lo personalizamos según tus servicios, tu marca y tus clientes. La página del diseño está en inglés.")}</p>
            </div>
            <ShotFrame project={project} href={`/portfolio/${project.slug}`} hrefLang="en-US" label={tx(`Ver el sitio de ${project.name}`)} ctaLabel={tx("Ver este sitio")} />
          </div>
        </Section>
      )}
      <Section id="plans">
        <PlanOffer heading={tx("Planes y precios de sitios web")} mark={tx("Planes y precios")} href={href("/contact")} pricingHref={href("/pricing")} eyebrow={tx("Cuatro planes · Una vista previa gratis")} chip={spainChrome ? tx("Sin entrada") : tx("$0 de entrada")} note={tx("Cada plan empieza con una vista previa gratis en 2 días hábiles, sin tarjeta y sin obligación. Mes a mes, cancela cuando quieras.")} badge={tx("El más elegido")} cta={tx("Ver mi vista previa gratis")} planCta={tx("Empieza con una vista previa gratis")} secondary={tx("Ver planes y precios")} trust={trust} plans={spanishPlans(tx, { hideUsd: spainChrome })} showStickers={!spainChrome} />
        <nav className="industry-reads industry-reads--stack" aria-label={tx(`Guías para ${industry.name}`)}>
          <p className="industry-reads__label">{tx(`Guías para dueños de ${industry.name}`)}</p>
          <ul className="industry-reads__list">
            <li>
              <Link href={href("/blog/monthly-website-vs-own-it")} prefetch={false}>
                <span className="industry-reads__title">{tx("Plan mensual u Own It")}</span>
                <span className="industry-reads__arrow" aria-hidden="true">→</span>
              </Link>
            </li>
            <li>
              <Link href={href(industryCostPostPath(base.slug))} prefetch={false}>
                <span className="industry-reads__title">{tx(`Costo de un sitio de ${industry.name}`)}</span>
                <span className="industry-reads__arrow" aria-hidden="true">→</span>
              </Link>
            </li>
            <li>
              <Link href={href(industryPagesPostPath(base.slug))} prefetch={false}>
                <span className="industry-reads__title">{tx("Páginas que este negocio necesita")}</span>
                <span className="industry-reads__arrow" aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </nav>
      </Section>
      <Section tint narrow><h2 className="center"><HL text={tx(`Preguntas para dueños de ${industry.name}`)} mark={tx("dueños")} /></h2><Faq items={[...industry.faqs]} /></Section>
      <Section><h2 className="center"><HL text={tx("Otros negocios")} mark={tx("Otros negocios")} /></h2><IndustryGrid industries={related} base={href("/industries")} /></Section>
      <CtaBand h={tx("Consigue tu vista previa gratis")} mark={tx("vista previa gratis")} sub={tx("Vista previa gratis, sin tarjeta. Luego eliges Website, Lead System, Plus u Own It.")} btn={tx("Ver mi vista previa gratis")} href={href("/contact")} secondary={tx("Ver planes y precios")} secondaryHref={href("/pricing")} locale={locale} />
    </>
  );
}
