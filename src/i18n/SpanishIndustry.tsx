import Link from "next/link";
import { notFound } from "next/navigation";
import { getIndustry, relatedIndustries, type FeatureKey } from "@/data/industries";
import { INDUSTRY_FEATURES_ES, localizedIndustryFeatures } from "@/data/industry-features";
import { getProject, portfolioFile } from "@/data/portfolio";
import { localizeIndustry } from "@/i18n/industries-es";
import { spanishPlans } from "@/i18n/spanish-plans";
import IndustryGrid from "@/components/IndustryGrid";
import IndustryIncludes, { industryFeatureBody } from "@/components/IndustryIncludes";
import { ContentSchema } from "@/components/JsonLd";
import { ReviewRail } from "@/components/HomeBands";
import PlanOffer from "@/components/PlanOffer";
import IndustryHeroArt from "@/components/IndustryHeroArt";
import { ShotFrame } from "@/components/ShotFrame";
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

  return (
    <>
      <ContentSchema path={path} title={industry.metaTitle} description={industry.metaDescription} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Industrias"), path: href("/industries") }, { name: industry.name, path }]} faqs={[...industry.faqs]} serviceType={tx(`Diseño web de ${industry.name}`)} inLanguage={lang} />
      <PageHero locale={locale} eyebrow={tx("Industrias")} h1={industry.h1} mark={industry.mark} sub={industry.sub} className={`industry-hero industry-hero--${industry.slug}`} art={<IndustryHeroArt slug={industry.slug} alt={industry.heroAlt} />}>
        <div className="industry-hero__intro"><p>{industry.intro[0]}</p><p>{industry.intro[1]}</p></div>
        <p className="btn-row"><Link className="btn btn--primary" href={href("/contact")} prefetch={false}>{tx("Ver mi vista previa gratis")}</Link><Link className="btn btn--ghost" href={href("/pricing")} prefetch={false}>{tx("Ver planes y precios")}</Link></p>
        <p className="muted small">{tx("Garantía de 60 días · $0 de enganche · Vista previa en 2 días hábiles")}</p>
      </PageHero>
      <Section tint>
        <h2 className="center"><HL text={tx(`Las llamadas que reciben negocios de ${industry.name}`)} mark={industry.name} /></h2>
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
      </Section>
      <Section tint>
        <h2 className="center"><HL text={tx(`Respuesta a llamadas perdidas para ${industry.name}`)} mark={tx("llamadas perdidas")} /></h2>
        <p className="center muted" style={{ maxWidth: "42rem", marginInline: "auto" }}>{tx("Si tu equipo está en un trabajo y no contesta, Lead System y Plus envían un texto automático. Después del trabajo, sale el pedido de reseña en Google.")}</p>
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
      <Section id="plans"><PlanOffer heading={tx("Planes y precios de sitios web")} mark={tx("Planes y precios")} href={href("/contact")} eyebrow={tx("Cuatro planes · Una vista previa gratis")} chip={tx("$0 de enganche")} note={tx("Cada plan empieza con una vista previa gratis en 2 días hábiles, sin tarjeta y sin obligación. Mes a mes, cancela cuando quieras.")} badge={tx("El más elegido")} cta={tx("Ver mi vista previa gratis")} plans={spanishPlans(tx)} /></Section>
      <Section tint narrow><h2 className="center"><HL text={tx(`Preguntas para dueños de ${industry.name}`)} mark={tx("dueños")} /></h2><Faq items={[...industry.faqs]} /></Section>
      <Section><h2 className="center"><HL text={tx("Otros oficios")} mark={tx("Otros oficios")} /></h2><IndustryGrid industries={related} base={href("/industries")} /></Section>
      <CtaBand h={tx("Consigue tu vista previa gratis")} mark={tx("vista previa gratis")} sub={tx("Vista previa gratis, sin tarjeta. Luego eliges Website, Lead System, Plus u Own It.")} btn={tx("Ver mi vista previa gratis")} href={href("/contact")} secondary={tx("Ver planes y precios")} secondaryHref={href("/pricing")} />
    </>
  );
}
