import Link from "next/link";
import { notFound } from "next/navigation";
import { getIndustry, industryCostPostPath, industryPagesPostPath, relatedIndustries, type FeatureKey } from "@/data/industries";
import { INDUSTRY_FEATURES_ES, localizedIndustryFeatures } from "@/data/industry-features";
import { getProject, portfolioFile } from "@/data/portfolio";
import { localizeIndustry } from "@/i18n/industries-es";
import { spanishPlans } from "@/i18n/spanish-plans";
import CostGuides from "@/components/CostGuides";
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
import { CtaBand, Faq, HL, Icon, PageHero, Section } from "@/components/ui";
import { withLocale, type Locale } from "@/lib/i18n";
import { imageSrcSet, imageVariant } from "@/lib/image-sources";

function LeadArt({ alt }: { alt: string }) {
  const src = "/assets/home/google-reviews-handled.webp";
  const widths = [640, 768, 1120] as const;
  const sizes = "(max-width: 720px) 92vw, 480px";
  return (
    <picture className="home-section-art home-section-art--reviews">
      <source type="image/avif" srcSet={imageSrcSet(src, widths, "avif")} sizes={sizes} />
      <img
        src={imageVariant(src, 640, "webp")}
        srcSet={imageSrcSet(src, widths)}
        sizes={sizes}
        alt={alt}
        width={1536}
        height={1024}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />
    </picture>
  );
}

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
    downLabel: tx(`${spainChrome ? "0 €" : "$0"} de entrada`),
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
        <p className="btn-row"><Link className="btn btn--primary" href={href("/contact")} prefetch={false}>{tx("Ver mi vista previa gratis")}</Link><Link className="btn btn--ghost" href={href("/pricing")} prefetch={false}>{tx("Ver planes y precios")}</Link></p>
        <TrustStrip className="industry-hero__trust" {...trust} />
      </PageHero>
      <Section tint>
        <aside className="industry-lead" aria-label={tx(`Enfoque para sitios de ${industry.name}`)}>
          <p className="industry-lead__eyebrow">{tx("Hecho para este oficio")}</p>
          <div className="industry-lead__board">
            <p className="industry-lead__story">{industry.intro[0]}</p>
            <div className="industry-lead__promise">
              <span className="industry-lead__mark" aria-hidden="true" />
              <p>{industry.intro[1]}</p>
            </div>
          </div>
          <p className="industry-lead__bridge">
            {tx("¿Buscas")}{" "}
            <Link href={href("/web-design")} prefetch={false}>{tx("diseño web para contratistas")}</Link>
            {tx("? Empieza ahí y vuelve a esta página de oficio.")}
          </p>
        </aside>
        <div className="section-head">
          <p className="eyebrow">{tx("Trabajos que el sitio debe cubrir")}</p>
          <h2 className="center"><HL text={tx(`Las llamadas que reciben negocios de ${industry.name.toLowerCase()}`)} mark={industry.name} /></h2>
          <p className="center muted industry-section-lead">{tx("Estas son las búsquedas y trabajos que el sitio debe dejar claros.")}</p>
        </div>
        <ReviewRail
          steps={industry.services.map((point, index) => ({
            n: String(index + 1),
            title: point.title,
            text: point.text,
            icon: point.icon,
          }))}
        />
        <p className="center muted industry-problems-label">{industry.problemsTitle}</p>
        <div className="industry-problems">
          {industry.problems.map((point) => (
            <article className="industry-problems__item" key={point.icon}>
              <div className="industry-problems__icon" aria-hidden="true">
                <Icon name={point.icon} alt="" size={72} className="icon--bare" />
              </div>
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
        <div className="section-head">
          <p className="eyebrow">{tx("Incluido en tu plan")}</p>
          <h2 className="center"><HL text={tx(`Lo que incluye tu sitio de ${industry.name}`)} mark={tx("incluye")} /></h2>
        </div>
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
      <Section band="lead">
        <div className="lead-feature">
          <div className="lead-feature__copy">
            <p className="eyebrow">{tx("En Lead System y Plus")}</p>
            <h2><HL text={tx(`Respuesta a llamadas perdidas para ${industry.name}`)} mark={tx("llamadas perdidas")} /></h2>
            <p>{tx("Si tu equipo está en un trabajo y no contesta, el texto opcional en Lead System y Plus puede responder en tu número de seguimiento. Después del trabajo, sale el pedido de reseña en Google.")}</p>
            <p className="btn-row">
              <Link className="btn btn--primary" href={href("/contact")} prefetch={false}>{tx("Ver mi vista previa gratis")}</Link>
              <Link className="btn btn--light" href={href("/pricing#lead-system")} prefetch={false}>{tx("Ver Lead System")}</Link>
            </p>
          </div>
          <LeadArt alt={tx("Un trabajo terminado que lleva a un mensaje y una reseña en Google")} />
        </div>
        <ReviewRail
          steps={[
            {
              n: "1",
              title: tx("Llamada perdida, texto automático"),
              text: tx("Si no puedes contestar, sale un texto en tu número de seguimiento para que el lead no se enfríe."),
              icon: "missed-call-text-back",
            },
            {
              n: "2",
              title: tx("Después del trabajo"),
              text: tx("Tu cliente recibe un texto con el enlace directo a reseñar en Google. No tienes que pedirlo en persona."),
              icon: "after-every-job",
            },
            {
              n: "3",
              title: tx("Directo a tu perfil"),
              text: tx("El enlace abre tu Perfil de Negocio de Google. Las reseñas nuevas llegan listas para que respondas."),
              icon: "one-tap-to-google",
            },
          ]}
        />
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
        <PlanOffer heading={tx("Planes y precios de sitios web")} mark={tx("Planes y precios")} href={href("/contact")} pricingHref={href("/pricing")} eyebrow={tx("Cuatro planes · Una vista previa gratis")} chip={tx(`${spainChrome ? "0 €" : "$0"} de entrada`)} note={tx("Cada plan empieza con una vista previa gratis en 2 días hábiles, sin tarjeta y sin obligación. Mes a mes, cancela cuando quieras.")} badge={tx("El más elegido")} cta={tx("Ver mi vista previa gratis")} planCta={tx("Empieza con una vista previa gratis")} secondary={tx("Ver planes y precios")} trust={trust} plans={spanishPlans(tx, { currency: spainChrome ? "eur" : "usd" })} showStickers={!spainChrome} />
        <CostGuides
          label={tx(`Guías para dueños de ${industry.name}`)}
          ariaLabel={tx(`Guías para ${industry.name}`)}
          eyebrow={tx("Guías")}
          featured={null}
          guides={[
            { href: href("/blog/monthly-website-vs-own-it"), name: tx("Plan mensual u Own It"), title: tx("Qué plan encaja después de la vista previa"), icon: "better-pricing" },
            { href: href(industryCostPostPath(base.slug)), name: tx(`Costo de un sitio de ${industry.name}`), title: tx("Qué cuesta este oficio con Kinexis"), iconSlug: industry.slug },
            { href: href(industryPagesPostPath(base.slug)), name: tx("Páginas que este negocio necesita"), title: tx("La lista de páginas para este trabajo"), icon: "layers" },
            { href: href("/blog/wix-vs-squarespace-vs-managed-website-contractors"), name: tx("DIY o administrado"), title: tx("Wix vs Squarespace vs un sitio administrado"), icon: "desktop" },
          ]}
        />
      </Section>
      <Section tint narrow>
        <div className="section-head">
          <p className="eyebrow">{tx("Respuestas claras")}</p>
          <h2 className="center"><HL text={tx(`Preguntas para dueños de ${industry.name}`)} mark={tx("dueños")} /></h2>
        </div>
        <Faq items={[...industry.faqs]} />
      </Section>
      <Section>
        <div className="section-head">
          <p className="eyebrow">{tx("Otros oficios")}</p>
          <h2 className="center"><HL text={tx("Otros negocios")} mark={tx("Otros negocios")} /></h2>
        </div>
        <IndustryGrid industries={related} base={href("/industries")} layout="index" limit={3} columns={3} />
        <p className="center btn-row spaced"><Link className="btn btn--ghost" href={href("/industries")} prefetch={false}>{tx("Todas las industrias")}</Link></p>
      </Section>
      <CtaBand h={tx("Consigue tu vista previa gratis")} mark={tx("vista previa gratis")} sub={tx("Vista previa gratis, sin tarjeta. Luego eliges Website, Lead System, Plus u Own It.")} btn={tx("Ver mi vista previa gratis")} href={href("/contact")} secondary={tx("Ver planes y precios")} secondaryHref={href("/pricing")} locale={locale} />
    </>
  );
}
