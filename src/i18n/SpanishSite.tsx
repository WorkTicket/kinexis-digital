import Link from "next/link";
import GuaranteeBadge from "@/components/GuaranteeBadge";
import MobilePlanComparison from "@/components/MobilePlanComparison";
import SpanishPlanSticker, { SPANISH_PLAN_STICKERS } from "@/components/SpanishPlanSticker";
import { notFound } from "next/navigation";
import { getIndustry } from "@/data/industries";
import { portfolioFile, PROJECTS } from "@/data/portfolio";
import { LIVE_SITES } from "@/data/liveSites";
import { POSTS } from "@/lib/content";
import { PAGES } from "@/lib/pages";
import { esPost, esPostForLocale } from "@/i18n/posts-es";
import { localizedIndustries, localizeIndustry } from "@/i18n/industries-es";
import SpanishIndustry from "@/i18n/SpanishIndustry";
import { spanishHomeFaqs, spanishPlans } from "@/i18n/spanish-plans";
import { contentLanguage, pathFromSlug, spainize, spainizeData, withLocale, type Locale } from "@/lib/i18n";
import { BLOG_IMAGE_WIDTHS, imageSrcSet, imageVariant } from "@/lib/image-sources";
import { contentMetadata } from "@/lib/seo";
import { SITE, telHref } from "@/lib/site";
import dynamic from "next/dynamic";
import AuditCta from "@/components/AuditCta";
import type { BookingCopy } from "@/components/BookingCalendar";
import { DeferredImg } from "@/components/DeferredImg";
import { OpenDialog } from "@/components/OpenDialog";
import TrustStrip from "@/components/TrustStrip";
import Filterable from "@/components/Filterable";
import Form from "@/components/Form";
import { LeaveTrustpilotReview } from "@/components/TrustpilotReviews";
import { UnifiedReviewCard } from "@/components/UnifiedReviewCard";
import { getAllReviews } from "@/lib/reviews";
import DesignProcess from "@/components/DesignProcess";
import { ReasonBoard, ReviewRail } from "@/components/HomeBands";
import IndustryGrid from "@/components/IndustryGrid";
import { ArticleSchema, ContentSchema } from "@/components/JsonLd";
import PlanOffer from "@/components/PlanOffer";
import PreviewBar from "@/components/PreviewBar";
import ReviewsSection from "@/components/ReviewsSection";
import ProjectCard from "@/components/ProjectCard";
import Stepper, { type Step } from "@/components/Stepper";
import { Compare, CtaBand, Faq, HL, Icon, IconCard, Illustration, MediaSplit, PageHero, Section, ServiceCard, Shots } from "@/components/ui";
import HeroFilm from "@/components/HeroFilm";

// Keep calendar / review-form client JS off every Spanish route's critical path.
const BookingCalendar = dynamic(() => import("@/components/BookingCalendar"));
const SiteReviewForm = dynamic(() => import("@/components/SiteReviewForm"));

type Meta = { title: string; description: string; absolute?: boolean; image?: string; article?: boolean; date?: string; section?: string; hold?: boolean };

const PAGE_META: Record<string, Meta> = {
  "/": { title: "Planes de sitios web desde $97/mes para negocios locales | Kinexis Digital", absolute: true, description: "Sitio profesional desde $97/mes, con pedidos de reseñas en Google y texto opcional si no contestas. Mira tu página de inicio gratis primero. Sin tarjeta." },
  "/services": { title: "Diseño web, SEO y mantenimiento", description: "Explora diseño web profesional, SEO, mantenimiento del sitio y auditorías gratuitas para negocios en Estados Unidos, con apoyo claro en cada paso." },
  "/web-design": { title: "Proceso de diseño web — Vista previa gratis del inicio", description: "Comparte una dirección de diseño, logo y fotos. Preparamos una vista previa gratis del inicio en 2 días hábiles—sin tarjeta—y la ajustamos hasta que encaje antes de elegir un plan." },
  "/seo-services": { title: "SEO para sitios web de negocios", description: "Mejora la visibilidad de tu sitio con SEO técnico, optimización de páginas, contenido útil e informes claros pensados para atraer más clientes." },
  "/audit": { title: "Auditoría web gratis de SEO, velocidad y UX", description: "Recibe una auditoría web gratuita de SEO, velocidad, uso en celular, indexación y conversión, con una lista clara de mejoras recomendadas." },
  "/contact": { title: "Hablemos de tu proyecto web", description: "Contacta a Kinexis Digital para hablar de un sitio nuevo, rediseño, SEO o mantenimiento web para tu negocio y recibe una orientación clara." },
  "/website-management": { title: "Administración y mantenimiento web", description: "Mantén tu sitio seguro, actualizado y respaldado con hosting administrado, copias de seguridad, cambios pequeños y soporte directo del equipo." },
  "/about": { title: "Conoce nuestra agencia de diseño web", description: "Conoce cómo Kinexis Digital planifica, diseña, lanza y mantiene sitios web profesionales para negocios de servicios en Estados Unidos." },
  "/portfolio": { title: "Portafolio y sitios de clientes", description: "Explora sitios reales de clientes de Kinexis y diseños para negocios de servicios locales, y elige la dirección visual adecuada para tu sitio." },
  "/industries": { title: "Diseño web para industrias de servicios", description: "Explora ideas de diseño web para plomería, HVAC, electricidad, techos, jardinería y otras industrias de servicios que buscan clientes locales." },
  "/reviews": { title: "Lo que cuentan los clientes de Kinexis", description: "Lee reseñas de clientes de Kinexis Digital en este sitio, Trustpilot y Facebook, y deja la tuya en unos clics." },
  "/upgrades": { title: "Extras y mejoras para sitios web", description: "Agrega páginas, mantenimiento continuo u otras mejoras cuando tu sitio web y tu negocio las necesiten, sin complicar tu operación diaria." },
  "/pricing": { title: "¿Cuánto cuesta un sitio web para un pequeño negocio?", description: "Planes desde $97/mes, Lead System $197/mes, Plus $297/mes u Own It $1,497. Vista previa gratis en 2 días hábiles. Sin tarjeta." },
  "/blog": { title: "Recursos de diseño web y SEO", description: "Lee guías prácticas sobre diseño web, SEO, rendimiento, reseñas y marketing digital para negocios en crecimiento en Estados Unidos." },
  "/faqs": { title: "Preguntas frecuentes de diseño web", description: "Respuestas claras sobre precios, cobro, propiedad del sitio, lanzamiento, SEO, fotos, redacción y mantenimiento web antes de empezar." },
  "/update": { title: "Solicita una actualización del sitio", description: "Indica qué página necesita un cambio y adjunta cualquier archivo útil. Atendemos cada solicitud según el alcance y los tiempos de tu plan." },
  "/strategy-call": { title: "Agenda una llamada de estrategia web", description: "Elige un horario para revisar tu sitio actual, tus objetivos y el plan de diseño web que mejor se adapte a tu negocio, con una recomendación clara." },
  "/terms": { title: "Términos de planes y cobro de Kinexis", description: "Consulta los términos actuales de planes, cobro, cancelación, propiedad, mensajes de texto y la garantía de leads de 60 días antes de empezar." },
  "/privacy": { title: "Cómo cuida Kinexis tu información", description: "Lee qué recoge Kinexis de formularios, llamadas, correo, registros del servidor y analítica, además de cómo usa y comparte esa información." },
};

/** Spain pages that need their own title/description — spainize() alone does not strip USD or US geo. */
const PAGE_META_ES_ES: Partial<Record<string, Meta>> = {
  "/": {
    title: "Diseño web para negocios locales en España | Kinexis Digital",
    absolute: true,
    description: "Web profesional para negocios de servicios locales en España, con vista previa gratis de la página de inicio. Sin tarjeta.",
  },
  "/pricing": {
    title: "Planes de sitios web para negocios locales | Kinexis Digital",
    description: "Website, Lead System, Plus u Own It. Vista previa gratis de la página de inicio en 2 días hábiles. Sin tarjeta.",
  },
  "/about": {
    title: "Conoce nuestra agencia de diseño web",
    description: "Conoce cómo Kinexis Digital planifica, diseña, lanza y mantiene sitios web profesionales para negocios de servicios locales.",
  },
  "/services": {
    title: "Diseño web, SEO y mantenimiento",
    description: "Explora diseño web profesional, SEO, mantenimiento del sitio y auditorías gratuitas para negocios locales, con apoyo claro en cada paso.",
  },
  "/blog": {
    title: "Recursos de diseño web y SEO",
    description: "Lee guías prácticas sobre diseño web, SEO, rendimiento, reseñas y marketing digital para negocios en crecimiento.",
  },
};

export function spanishMetadata(locale: Locale, slug?: string[]) {
  const en = pathFromSlug(slug);
  const localized = metaFor(en, locale);
  if (!localized) return { title: "Página no encontrada", robots: { index: false, follow: false } };
  const page = Object.values(PAGES).find((candidate) => candidate.path === en);
  const indexable = localized.hold ? false : (page?.indexable ?? true);
  return contentMetadata({
    path: withLocale(locale, en),
    title: localized.title,
    description: localized.description,
    absolute: localized.absolute,
    locale,
    image: localized.image,
    ogType: localized.article ? "article" : "website",
    publishedTime: localized.date,
    section: localized.section,
    index: indexable,
  });
}

function metaFor(en: string, locale: Locale): Meta | undefined {
  if (en.startsWith("/industries/") && en !== "/industries") {
    const industry = getIndustry(en.split("/")[2] ?? "");
    if (!industry) return undefined;
    const copy = localizeIndustry(industry, locale);
    return { title: copy.metaTitle, description: copy.metaDescription, hold: industry.status === "hold" };
  }
  if (en.startsWith("/blog/") && en !== "/blog") {
    const slug = en.split("/")[2] ?? "";
    const post = locale === "es-ES" || locale === "es-419" ? esPostForLocale(slug, locale) : esPost(slug);
    const source = POSTS.find((item) => item.slug === post?.slug);
    if (!post || !source) return undefined;
    const text = locale === "es-ES" ? spainizeData(post) : post;
    return { title: text.seoTitle, description: text.excerpt, article: true, image: source.image, date: source.date, section: text.category };
  }
  const page = PAGE_META[en];
  if (!page) return undefined;
  if (locale === "es-ES") {
    const spainOverride = PAGE_META_ES_ES[en];
    return spainOverride ? spainOverride : spainizeData(page);
  }
  return page;
}

function L(locale: Locale, path: string) {
  return withLocale(locale, path);
}

export async function SpanishPage({ locale, slug }: { locale: Exclude<Locale, "en">; slug?: string[] }) {
  const en = pathFromSlug(slug);
  const tx = (text: string) => (locale === "es-ES" ? spainize(text) : text);
  const lang = contentLanguage(locale);
  if (en.startsWith("/industries/") && en !== "/industries") return <SpanishIndustry locale={locale} slug={en.split("/")[2] ?? ""} tx={tx} lang={lang} />;
  if (en.startsWith("/blog/") && en !== "/blog") return <PostView locale={locale} slug={en.split("/")[2] ?? ""} lang={lang} />;
  if (!PAGE_META[en]) notFound();
  const href = (path: string) => L(locale, path);
  const band = { secondary: tx("Hablar de tus opciones"), secondaryHref: href("/strategy-call"), locale };

  if (en === "/") return <Home locale={locale} tx={tx} href={href} lang={lang} />;
  if (en === "/services") return <Services locale={locale} tx={tx} href={href} lang={lang} band={band} />;
  if (en === "/web-design") return <WebDesign locale={locale} tx={tx} href={href} lang={lang} band={band} />;
  if (en === "/seo-services") return <Seo locale={locale} tx={tx} href={href} lang={lang} band={band} />;
  if (en === "/pricing") return <Pricing locale={locale} tx={tx} href={href} lang={lang} />;
  if (en === "/about") return <About locale={locale} tx={tx} href={href} lang={lang} />;
  if (en === "/contact") return <Contact locale={locale} tx={tx} href={href} lang={lang} />;
  if (en === "/audit") return <Audit locale={locale} tx={tx} href={href} lang={lang} />;
  if (en === "/industries") return <Industries locale={locale} tx={tx} href={href} lang={lang} band={band} />;
  if (en === "/faqs") return <Faqs locale={locale} tx={tx} href={href} lang={lang} band={band} />;
  if (en === "/blog") return <Blog locale={locale} tx={tx} href={href} lang={lang} band={band} />;
  if (en === "/website-management") return <Care locale={locale} tx={tx} href={href} lang={lang} band={band} />;
  if (en === "/reviews") return <Reviews locale={locale} tx={tx} href={href} lang={lang} band={band} />;
  if (en === "/upgrades") return <Upgrades locale={locale} tx={tx} href={href} lang={lang} band={band} />;
  if (en === "/strategy-call") return <Strategy locale={locale} tx={tx} href={href} lang={lang} />;
  if (en === "/terms") return <Terms locale={locale} tx={tx} href={href} lang={lang} />;
  if (en === "/privacy") return <Privacy locale={locale} tx={tx} href={href} lang={lang} />;
  if (en === "/update") return <Update locale={locale} tx={tx} href={href} lang={lang} />;
  if (en === "/portfolio") return <Portfolio locale={locale} tx={tx} href={href} lang={lang} band={band} />;
  notFound();
}

async function Home({ locale, tx, href, lang }: { locale: Locale; tx: (s: string) => string; href: (p: string) => string; lang: string }) {
  const spainChrome = locale === "es-ES";
  const faqs = spanishHomeFaqs(tx, { hideUsd: spainChrome });
  const homeMeta = metaFor("/", locale) ?? PAGE_META["/"];
  const plans = spanishPlans(tx, { hideUsd: spainChrome });
  const steps: Step[] = [
    { tab: "Preview", label: tx("Vista previa"), title: tx("Empieza con una vista previa"), text: tx("Preparamos un concepto de inicio para tu negocio. Lo revisas antes de pagar, sin tarjeta y sin obligación.") },
    { tab: "Plan", label: tx("Plan"), title: tx("Escoge el plan que te sirve"), text: tx("Elige Website, Lead System, Plus u Own It. Dejamos por escrito lo que incluye y la fecha de lanzamiento — normalmente 5 días hábiles después de aprobar la vista previa y enviarnos el contenido.") },
    { tab: "Build", label: tx("Construcción"), title: tx("Terminamos el sitio completo"), text: tx("Sumamos tus servicios, zona, fotos y texto, conectamos el dominio y te enviamos todo para aprobarlo.") },
    { tab: "Launch", label: tx("Lanzamiento"), title: tx("Publicamos tu sitio"), text: tx("El sitio queda en línea, normalmente en 5 días hábiles tras la aprobación y el contenido. En Lead System y Plus, las reseñas y el texto opcional empiezan tras la aprobación del operador, normalmente en 10 a 15 días.") },
    { tab: "Grow", label: tx("Crecer"), title: tx("Lo mantenemos vigente"), text: tx("Hacemos cambios, registramos llamadas y formularios, y en Lead System y Plus enviamos la solicitud de reseña después de cada trabajo.") },
  ];
  return (
    <>
      <ContentSchema path={href("/")} title={homeMeta.title} description={homeMeta.description} crumbs={[{ name: tx("Inicio"), path: href("/") }]} faqs={faqs} inLanguage={lang} />
      <section className="hero hero--fit"><div className="container hero__inner">
        <div className="hero__text">
          <p className="eyebrow">{tx("Planes de sitios web para negocios locales")}</p>
          <h1><HL text={tx("Un plan de sitio pensado para conseguir más trabajos")} mark={tx("conseguir más trabajos")} /></h1>
          <ul className="ticks">
            <li><span className="tick__mark" aria-hidden="true">✓</span><span className="tick__copy"><span><b>{tx("Ves tu inicio gratis")}</b> – {tx("sin tarjeta")}</span><span>{tx("y sin obligación antes de pagar")}</span></span></li>
            <li><span className="tick__mark" aria-hidden="true">✓</span><span className="tick__copy"><span><b>{tx("Atrapas las llamadas que pierdes")}</b></span><span>{tx("texto opcional y seguimiento después del trabajo")}</span></span></li>
            <li><span className="tick__mark" aria-hidden="true">✓</span><span className="tick__copy"><span><b>{tx("Tu reputación en Google")}</b></span><span>{tx("pedidos de reseña enviados por ti, no dejados al azar")}</span></span></li>
          </ul>
          <div className="hero__btns">
            <Link className="btn btn--primary" href={href("/contact")} prefetch={false}>{tx("Ver mi vista previa gratis")}</Link>
          </div>
          <TrustStrip
            className="hero__trust"
            leadLabel={tx("Garantía de 60 días")}
            refundLabel={tx("Devolución en 30 días")}
            downLabel={locale === "es-ES" ? tx("Sin enganche") : tx("$0 de enganche")}
            previewLabel={tx("Vista previa en 2 días hábiles")}
          />
        </div>
        <HeroFilm />
      </div></section>
      <PreviewBar locale={locale} />
      <ReviewsSection
        variant="home"
        eyebrow={tx("Reseñas de clientes")}
        title={tx("Lo que dicen dueños de negocios locales")}
        mark={tx("dueños de negocios locales")}
        sub={tx("Comentarios reales de dueños que lanzaron su sitio con un plan de Kinexis.")}
        ctaLabel={tx("Leer más reseñas")}
        ctaHref={href("/reviews")}
        ratingCopy={tx("de {count} reseñas · Facebook y el sitio")}
      />
      <Section tint>
        <MediaSplit image="homepage" alt={tx("Un negocio mostrando su sitio en una computadora y un celular")}>
          <h2><HL text={tx("Lo que recibes con un plan de sitio de Kinexis")} mark={tx("plan de sitio de Kinexis")} /></h2>
          <p>{spainChrome
            ? tx("Un sitio rápido, SEO práctico y seguimiento que sigue trabajando cuando tú estás ocupado. Hay cuatro planes con vista previa gratis.")
            : tx("Un sitio rápido, SEO práctico y seguimiento que sigue trabajando cuando tú estás ocupado. Hay planes desde $97 al mes.")}</p>
        </MediaSplit>
        <div className="grid grid--3">
          <IconCard title={<>{tx("Un sitio que")}<br />{tx("facilita recibir")}<br />{tx("llamadas")}</>} iconAlt={tx("Un sitio que facilita recibir llamadas")} text={tx("Carga rápido, explica tus servicios y facilita que cada visita llame o pida una cotización.")} icon="better-design" />
          <IconCard title={<>{tx("Seguimiento que")}<br />{tx("funciona mientras")}<br />{tx("estás trabajando")}</>} iconAlt={tx("Seguimiento que funciona mientras estás trabajando")} text={tx("En Lead System y Plus, el texto opcional puede alcanzar a quien no contestaste, salen los pedidos de reseña y cada lead queda registrado.")} icon="better-follow-up" />
          <IconCard title={<>{tx("Precios claros")}<br />{tx("desde el")}<br />{tx("principio")}</>} iconAlt={tx("Precios claros desde el principio")} text={spainChrome
            ? tx("Elige entre cuatro planes con vista previa gratis, sin enganche y cobro mes a mes.")
            : tx("Elige entre cuatro planes desde $97 al mes, con vista previa gratis, $0 de enganche y cobro mes a mes.")} icon="better-pricing" />
        </div>
      </Section>
      <Section>
        <h2><HL text={tx("Sitios hechos para tu negocio")} mark={tx("tu negocio")} /></h2>
        <p className="muted">{tx("Elige un diseño que encaje con el trabajo que haces. Lo personalizamos para tu negocio, servicios y zona. Toca para verlo y abre el sitio completo en inglés.")}</p>
        <div className="portfolio portfolio--home"><Shots n={8} mode="link" hrefLang="en-US" labelFor={(name) => tx(`Ver ${name}`)} /></div>
        <p className="center"><Link className="btn btn--primary" href={href("/portfolio")} prefetch={false}>{tx("Ver nuestro trabajo")}</Link></p>
      </Section>
      <Section tint>
        <h2 className="center"><HL text={tx("Por qué los dueños eligen Kinexis frente a freelancers y agencias")} mark={tx("frente a freelancers y agencias")} /></h2>
        <Compare rows={[[tx("Vista previa gratis antes de pagar"), false, false], [tx("Texto si no contestas y pedidos de reseña"), false, false], [tx("Hosting y cambios resueltos"), false, true], [tx("Precio fijo por 24 meses"), false, false], [tx("Sitios en inglés y español"), false, true]]} freelancers={tx("Freelancers")} agencies={tx("Agencias")} label={tx("Comparación")} feature={tx("Función")} yesLabel={tx("Sí")} />
        <p className="center muted small">{tx("Son ofertas habituales; cada proveedor puede variar.")}</p>
      </Section>
      <Section band="lead">
        <div className="lead-feature">
          <div className="lead-feature__copy">
            <p className="eyebrow">{tx("Disponible en Lead System y Plus")}</p>
            <h2><HL text={tx("Respuesta a llamadas perdidas y pedidos de reseña en Google")} mark={tx("pedidos de reseña en Google")} /></h2>
            <p>{tx("Si no contestas, el texto opcional mantiene el lead. Después del trabajo sale el pedido de reseña con el enlace a tu perfil de Google.")}</p>
            <p className="btn-row">
              <Link className="btn btn--primary" href={href("/contact")} prefetch={false}>{tx("Ver mi vista previa gratis")}</Link>
              <Link className="btn btn--light" href={href("/pricing#lead-system")} prefetch={false}>{tx("Ver Lead System")}</Link>
            </p>
          </div>
        </div>
        <ReviewRail steps={[
          { n: "1", title: tx("Llamada perdida, texto automático"), titleDisplay: <>{tx("Llamada perdida,")}<br />{tx("texto automático")}</>, text: <>{tx("Si no puedes contestar, sale un texto")}<br />{tx("en tu número de seguimiento para")}<br />{tx("que el lead no se enfríe.")}</>, icon: "missed-call-text-back" },
          { n: "2", title: tx("Después de cada trabajo"), titleDisplay: <>{tx("Después de")}<br />{tx("cada trabajo")}</>, text: <>{tx("El cliente recibe un texto con el")}<br />{tx("enlace directo a tu reseña en Google.")}<br />{tx("No tienes que pedirlo en persona.")}</>, icon: "after-every-job" },
          { n: "3", title: tx("Directo a tu perfil"), titleDisplay: <>{tx("Directo a")}<br />{tx("tu perfil")}</>, text: <>{tx("El enlace abre tu perfil de Google.")}<br />{tx("Las reseñas llegan listas para")}<br />{tx("que puedas responderlas.")}</>, icon: "one-tap-to-google" },
        ]} />
      </Section>
      <Section tint>
        <div className="section-head">
          <p className="eyebrow">{tx("Incluido en cada plan")}</p>
          <h2 className="center"><HL text={tx("Lo que incluye cada sitio de Kinexis")} mark={tx("sitio de Kinexis")} /></h2>
          <p className="center muted">{tx("Lo esencial para verse serio, aparecer en búsquedas y convertir visitas en llamadas, con el hosting y los cambios a cargo nuestro.")}</p>
        </div>
        <ReasonBoard reasons={[{ title: tx("Se ve bien en cada pantalla"), text: tx("Un diseño moderno y adaptable presenta bien tu negocio en celulares, tabletas y computadoras."), icon: "well-designed" }, { title: tx("Pensado para recibir llamadas"), text: tx("Cada página deja claro si el siguiente paso es llamar ahora o enviar los datos del trabajo."), icon: "sales-focused" }, { title: tx("Fácil de leer para Google"), text: tx("Una estructura limpia, títulos útiles y páginas rápidas ayudan a que el buscador entienda el sitio."), icon: "search-optimized" }, { title: tx("El hosting y los cambios son nuestros"), text: tx("Administramos hosting, cambios de rutina, respaldos y seguridad sin devolverte ese trabajo."), icon: "hassle-free" }]} />
      </Section>
      <Section>
        <div className="trades-feature">
          <div className="trades-feature__copy">
            <h2><HL text={tx("Hecho para negocios de servicios locales")} mark={tx("servicios locales")} /></h2>
            <p className="muted">{tx("Plomería, HVAC, techos y más: si tus clientes buscan lo que haces y llaman cuando te necesitan, te tenemos cubierto. ¿No ves tu negocio? Igual puedes empezar.")}</p>
          </div>
        </div>
        <IndustryGrid
          layout="index"
          industries={localizedIndustries(locale)}
          base={href("/industries")}
          limit={5}
          moreHref={href("/industries")}
          moreLabel={tx("y más")}
          moreMeta={tx("Cualquier negocio local: si te llaman tus clientes, podemos ayudarte.")}
          moreLayout="cell"
        />
      </Section>
      <Section id="plans"><PlanOffer heading={tx("Planes y precios de sitios web")} mark={tx("Planes y precios")} href={href("/contact")} pricingHref={href("/pricing")} eyebrow={tx("Cuatro planes · Una vista previa gratis")} chip={spainChrome ? tx("Sin enganche") : tx("$0 de enganche")} note={tx("Cada plan empieza con una vista previa gratis en 2 días hábiles, sin tarjeta y sin obligación. Mes a mes, cancela cuando quieras.")} badge={tx("El más elegido")} cta={tx("Ver mi vista previa gratis")} planCta={tx("Empieza con una vista previa gratis")} secondary={tx("Ver planes y precios")} trust={{ leadLabel: tx("Garantía de 60 días"), refundLabel: tx("Devolución en 30 días"), downLabel: spainChrome ? tx("Sin enganche") : tx("$0 de enganche"), previewLabel: tx("Vista previa en 2 días hábiles") }} plans={plans} showStickers={!spainChrome} /></Section>
      <Section>
        <h2 className="center"><HL text={tx("De la vista previa al lanzamiento")} mark={tx("al lanzamiento")} /></h2>
        <Stepper steps={steps} />
      </Section>
      <Section tint>
        <h2 className="center"><HL text={tx("Garantía de clientes en 60 días")} mark={tx("60 días")} /></h2>
        <p className="center muted">{tx("Lead System y Plus incluyen una garantía por escrito. Si no hay leads rastreados en los primeros 60 días en línea, condonamos el tercer y cuarto cargo.")}</p>
        <p className="center btn-row spaced"><OpenDialog id="guarantee" className="btn btn--ghost">{tx("Leer la garantía")}</OpenDialog><Link className="btn btn--primary" href={href("/contact")} prefetch={false}>{tx("Ver mi vista previa gratis")}</Link></p>
        <TrustStrip
          className="center"
          leadLabel={tx("Garantía de 60 días")}
          refundLabel={tx("Devolución en 30 días")}
          downLabel={locale === "es-ES" ? tx("Sin enganche") : tx("$0 de enganche")}
          previewLabel={tx("Vista previa gratis en 2 días hábiles")}
        />
      </Section>
      <Section narrow>
        <h2 className="center"><HL text={tx("Preguntas frecuentes")} mark={tx("Preguntas")} /></h2>
        <Faq items={faqs} />
      </Section>
    </>
  );
}

function homeFaqs(tx: (s: string) => string, hideUsd = false) {
  return spanishHomeFaqs(tx, { hideUsd });
}

function Services({ locale, tx, href, lang, band }: PageBits) {
  const items = [
    [tx("Diseño web"), tx("Un sitio claro para el trabajo que quieres, con llamada desde el celular, formularios cortos y vista previa antes de pagar."), "/web-design", tx("Ver diseño web"), "well-designed"],
    [tx("SEO"), tx("Mejoras técnicas, títulos útiles y contenido que ayuda a que los clientes correctos te encuentren en Google."), "/seo-services", tx("Ver SEO"), "search-optimized"],
    [tx("Mantenimiento"), tx("Hosting, cambios y respaldos resueltos, con una persona disponible cuando el sitio necesita un cambio."), "/website-management", tx("Ver el cuidado"), "managed-for-you"],
    [tx("Revisión gratis"), tx("Una revisión práctica de velocidad, indexación, títulos y qué tan fácil es ponerse en contacto contigo."), "/audit", tx("Revisar mi sitio"), "preview"],
  ] as const;
  return (
    <>
      <ContentSchema path={href("/services")} title={tx(PAGE_META["/services"].title)} description={tx(PAGE_META["/services"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Servicios"), path: href("/services") }]} inLanguage={lang} />
      <PageHero locale={locale} h1={tx("Ayuda web para negocios de servicios")} mark={tx("negocios de servicios")} sub={tx("Elige diseño web, SEO, cuidado continuo o una revisión gratis del sitio que ya tienes.")} image="homepage" imageAlt={tx("Sitio de un negocio en una computadora y un celular")} />
      <Section><div className="grid grid--2">{items.map(([title, text, path, cta, icon]) => <ServiceCard key={path} title={title} text={text} href={href(path)} cta={cta} icon={icon} />)}</div></Section>
      <CtaBand h={tx("¿No sabes por dónde empezar?")} mark={tx("por dónde empezar")} sub={tx("Podemos revisar tu sitio actual o hablar del que quieres construir.")} btn={tx("Escríbenos")} href={href("/contact")} {...band} />
    </>
  );
}

type PageBits = { locale: Locale; tx: (s: string) => string; href: (p: string) => string; lang: string; band: { secondary: string; secondaryHref: string; locale: Locale } };

function WebDesign({ locale, tx, href, lang, band }: PageBits & { locale: Locale }) {
  const spainChrome = locale === "es-ES";
  const faqs = [
    { q: tx("¿Cómo funciona la vista previa gratis?"), a: tx("Cuéntanos sobre tu negocio y el estilo que buscas. Preparamos un concepto de la página de inicio para que lo revises antes de elegir un plan. No se pide tarjeta y respondemos en 2 días hábiles.") },
    { q: tx("¿Qué necesito enviarte?"), a: tx("Ayuda una dirección de diseño: ejemplos de nuestro portafolio o capturas de sitios que te gusten. Envía tu logo si lo tienes, y fotos de trabajos, la camioneta o el equipo. Si aún estás reuniendo fotos, podemos empezar la vista previa con texto realista del negocio y marcadores de posición.") },
    { q: tx("¿Y si no me gusta el primer diseño?"), a: tx("Dinos qué quieres cambiar. Ajustamos la página de inicio hasta que se sienta bien para tu negocio; luego eliges un plan y terminamos el sitio completo.") },
    { q: tx("¿Qué páginas y funciones voy a recibir?"), a: tx("El sitio incluye inicio, páginas para los servicios que quieres promover y una forma sencilla de llamar o cotizar. También lleva títulos claros, encabezados ordenados, páginas rápidas y una estructura que Google puede leer. Ves el inicio antes de pagar.") },
    {
      q: tx("¿Cuáles son los precios?"),
      a: spainChrome
        ? tx("Hay cuatro opciones: Website, Lead System, Plus u Own It. Todos empiezan con una vista previa gratis, sin tarjeta y sin obligación. El detalle de cada plan está en Precios.")
        : tx("Website cuesta $97 al mes, Lead System $197, Plus $297 y Own It $1,497 en un solo pago. Todos empiezan con una vista previa gratis, sin tarjeta y sin obligación."),
    },
    {
      q: tx("¿Pueden construir para mi zona?"),
      a: spainChrome
        ? tx("Sí. Trabajamos con negocios de servicios locales y nombramos las ciudades que de verdad atiendes. No hacemos una copia de la misma página para cada ciudad.")
        : tx("Sí. Trabajamos con negocios de servicios en Estados Unidos y nombramos las ciudades que de verdad atiendes. No hacemos una copia de la misma página para cada ciudad."),
    },
  ];
  const steps = [
    { title: tx("Comparte una dirección"), text: tx("Elige un estilo de nuestro portafolio, o envía capturas de sitios que te gusten. Así tenemos un punto de partida claro para tu inicio."), icon: "layers", phase: "share" as const },
    { title: tx("Envía lo básico de tu marca"), text: tx("Comparte tu logo si lo tienes, el nombre del negocio y los colores que ya usas. Trabajamos con lo que tengas."), icon: "built-for-your-trade", phase: "share" as const },
    { title: tx("Agrega fotos si las tienes"), text: tx("Fotos de trabajos, la camioneta o el equipo ayudan a que la vista previa se sienta real. Si aún no las tienes, igual podemos empezar."), icon: "gallery", phase: "share" as const },
    { title: tx("Preparamos la vista previa del inicio"), text: tx("En 2 días hábiles recibes un concepto de inicio para tu negocio—sin tarjeta y sin obligación."), icon: "preview", phase: "deliver" as const },
    { title: tx("Revisas y pides cambios"), text: tx("Dinos qué ajustar. Revisamos el diseño hasta que se sienta bien antes de que elijas un plan."), icon: "edit", phase: "deliver" as const },
    { title: tx("Elige un plan y terminamos el sitio"), text: tx("Cuando apruebes la dirección, elige Website, Lead System, Plus u Own It. Armamos el sitio completo y normalmente lo lanzamos en 5 días hábiles — confirmado por escrito."), icon: "better-pricing", phase: "deliver" as const },
  ];
  return (
    <>
      <ContentSchema path={href("/web-design")} title={tx(PAGE_META["/web-design"].title)} description={tx(PAGE_META["/web-design"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Diseño web"), path: href("/web-design") }]} faqs={faqs} serviceType={tx("Diseño web")} inLanguage={lang} />
      <PageHero locale={locale}
        eyebrow={tx("Diseño web")}
        h1={tx("Mira el diseño de tu inicio antes de comprometerte")}
        mark={tx("antes de comprometerte")}
        sub={tx("Para plomería, HVAC, electricidad, techos y otros negocios de servicios. Comparte un estilo que te guste—o envía tus ideas—y preparamos una vista previa gratis del inicio en 2 días hábiles. Sin tarjeta.")}
        image="web-design"
        imageAlt={tx("Diseño web en un monitor y un celular")}
      />
      <Section>
        <h2 className="center"><HL text={tx("Así funciona el diseño web aquí")} mark={tx("aquí")} /></h2>
        <p className="center muted">{tx("Un camino claro desde las primeras ideas hasta un inicio que puedes revisar—y el sitio completo cuando estés listo.")}</p>
        <DesignProcess steps={steps} shareLabel={tx("Tú envías")} deliverLabel={tx("Nosotros entregamos")} />
      </Section>
      <Section tint>
        <h2 className="center"><HL text={tx("Qué enviarnos")} mark={tx("enviarnos")} /></h2>
        <p className="center muted">{tx("No necesitas un kit de marca terminado. Envía lo que tengas y completamos el resto para la vista previa.")}</p>
        <div className="grid grid--3">
          <IconCard title={tx("Dirección de diseño")} text={tx("Ejemplos de nuestro portafolio, o capturas de sitios que te gusten. Unas pocas referencias marcan el tono.")} icon="preview" />
          <IconCard title={tx("Logo y lo básico de la marca")} text={tx("Tu logo si lo tienes, el nombre del negocio y los colores que ya usas en camionetas, camisas o tarjetas.")} icon="built-for-your-trade" />
          <IconCard title={tx("Fotos (opcional)")} text={tx("Fotos reales de trabajos, tu camioneta o tu equipo. Si aún las estás reuniendo, la vista previa puede empezar sin ellas.")} icon="better-design" />
        </div>
      </Section>
      <Section>
        <MediaSplit image="process" alt={tx("Vista previa del proceso de diseño para un sitio de servicios")}>
          <h2><HL text={tx("Revisa el inicio primero")} mark={tx("primero")} /></h2>
          <p>{tx("Preparamos un concepto de inicio para tu negocio para que juzgues el diseño, el texto y la llamada a la acción antes de pagar.")}</p>
          <p>{spainChrome
            ? tx("Pide cambios hasta que se sienta bien. Cuando estés listo, elige Website, Lead System, Plus u Own It—y terminamos el sitio completo.")
            : tx("Pide cambios hasta que se sienta bien. Cuando estés listo, elige Website a $97/mes, Lead System a $197/mes, Plus a $297/mes u Own It por $1,497—y terminamos el sitio completo.")}</p>
          <p className="btn-row spaced">
            <Link className="btn btn--primary" href={href("/contact")} prefetch={false}>{tx("Quiero mi vista previa gratis")}</Link>
            <Link className="btn btn--ghost" href={href("/portfolio")} prefetch={false}>{tx("Ver el portafolio")}</Link>
          </p>
        </MediaSplit>
      </Section>
      <Section tint narrow>
        <h2 className="center"><HL text={spainChrome ? tx("Los mismos cuatro planes") : tx("Los mismos cuatro planes en todo el país")} mark={tx("planes")} /></h2>
        <p>{spainChrome
          ? tx("Negocios de servicios locales pueden elegir Website, Lead System, Plus u Own It. El detalle de cada plan está en Precios.")
          : tx("Negocios de servicios en cualquier parte de Estados Unidos pueden elegir Website a $97/mes, Lead System a $197/mes, Plus a $297/mes u Own It por $1,497.")}</p>
        <p>{tx("El texto se adapta a tu negocio y zona. La base técnica de búsqueda se mantiene consistente, y el SEO continuo se cotiza aparte después de construir el sitio.")}</p>
        <p className="center btn-row spaced">
          <Link className="btn btn--primary" href={href("/pricing")} prefetch={false}>{tx("Ver planes y precios")}</Link>
          <Link className="btn btn--ghost" href={href("/portfolio")} prefetch={false}>{tx("Ver el portafolio")}</Link>
        </p>
      </Section>
      <Section>
        <h2 className="center"><HL text={tx("Elige tu industria")} mark={tx("tu industria")} /></h2>
        <IndustryGrid layout="index" industries={localizedIndustries(locale)} base={href("/industries")} />
      </Section>
      <Section narrow>
        <h2 className="center"><HL text={tx("Preguntas sobre tu sitio")} mark={tx("tu sitio")} /></h2>
        <Faq items={faqs} />
      </Section>
      <CtaBand
        h={tx("¿Listo para ver tu inicio?")}
        mark={tx("tu inicio")}
        sub={tx("Cuéntanos tu negocio, una dirección de diseño y lo que tengas de marca. Preparamos tu vista previa gratis del inicio—sin tarjeta.")}
        btn={tx("Quiero mi vista previa gratis")}
        href={href("/contact")}
        {...band}
      />
    </>
  );
}

function Seo({ locale, tx, href, lang, band }: PageBits) {
  const faqs = [
    { q: tx("¿Cuándo debería notar avance con el SEO?"), a: tx("Es un trabajo de largo plazo. Los ajustes técnicos pueden mostrar movimiento en unas semanas, pero una mejora importante en posiciones y tráfico suele tardar de tres a seis meses o más. La competencia y el punto de partida influyen.") },
    { q: tx("¿Prometen el primer lugar en Google?"), a: tx("No. Una agencia no controla los resultados de Google, así que no puede prometer el número uno de forma responsable. Trabajamos lo que mejora la visibilidad y reportamos impresiones, clics y leads.") },
    { q: tx("¿Qué revisan en una auditoría de SEO?"), a: tx("Revisamos salud técnica, indexación, velocidad, uso en celular, títulos, encabezados, contenido faltante y enlaces internos. Después ordenamos los arreglos por prioridad.") },
    { q: tx("¿Pueden mejorar el sitio que ya tengo?"), a: tx("Sí. Podemos trabajar en el sitio actual o recomendar uno nuevo si la plataforma está frenando el resultado.") },
    { q: tx("¿Qué van a medir?"), a: tx("Seguimos impresiones, clics, posiciones y leads con Search Console y analítica, y compartimos los resultados en un calendario claro.") },
  ];
  return (
    <>
      <ContentSchema path={href("/seo-services")} title={tx(PAGE_META["/seo-services"].title)} description={tx(PAGE_META["/seo-services"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: "SEO", path: href("/seo-services") }]} faqs={faqs} serviceType="SEO" inLanguage={lang} />
      <PageHero locale={locale} h1={tx("SEO para que te encuentre la gente correcta")} mark={tx("gente correcta")} sub={tx("Mejoramos la parte técnica, las páginas y el contenido que ayudan a descubrir tu negocio en Google.")} image="local-seo" imageAlt={tx("Pines de mapa y un panel de búsqueda")} />
      <Section>
        <div className="grid grid--3">
          <IconCard title={tx("Base técnica")} text={tx("Revisamos rastreo, indexación, velocidad, celular, mapa del sitio y datos estructurados para Google.")} icon="technical-seo" />
          <IconCard title={tx("Mejoras en cada página")} text={tx("Ajustamos títulos, descripciones, encabezados y enlaces según cómo buscan de verdad tus clientes.")} icon="on-page-optimization" />
          <IconCard title={tx("Búsquedas reales")} text={tx("Buscamos demanda e intención útiles y conectamos cada búsqueda con la página que puede responderla bien.")} icon="keyword-research" />
          <IconCard title={tx("Contenido útil")} text={tx("Planeamos servicios y artículos que responden dudas reales, sin agregar texto solo para llenar espacio.")} icon="content-strategy" />
          <IconCard title={tx("Alcance local o nacional")} text={tx("El trabajo puede enfocarse en tu zona, en búsquedas nacionales o en una mezcla razonable de ambas áreas.")} icon="local-seo" />
          <IconCard title={tx("Informes fáciles de leer")} text={tx("Ves impresiones, clics, posiciones y leads de Search Console y analítica en un solo informe claro.")} icon="reporting" />
        </div>
      </Section>
      <Section tint narrow>
        <p>{locale === "es-ES"
          ? tx("Trabajamos con negocios de servicios locales, cubras una ciudad o una zona más amplia. Primero va la base: un sitio rápido, rastreable, con títulos claros y contenido útil. Nadie puede garantizar posiciones.")
          : tx("Trabajamos con negocios de servicios en Estados Unidos, cubras una ciudad o una zona más amplia. Primero va la base: un sitio rápido, rastreable, con títulos claros y contenido útil. Nadie puede garantizar posiciones.")}</p>
      </Section>
      <Section narrow><Faq items={faqs} /></Section>
      <CtaBand h={tx("¿Quieres saber qué ve Google?")} mark={tx("qué ve Google")} sub={tx("Empieza con una revisión gratis del sitio y su configuración de búsqueda.")} btn={tx("Revisar mi sitio")} href={href("/audit")} {...band} />
    </>
  );
}

function Pricing({ locale, tx, href, lang }: { locale: Locale; tx: (s: string) => string; href: (p: string) => string; lang: string }) {
  const spainChrome = locale === "es-ES";
  const plans = spanishPlans(tx, { hideUsd: spainChrome });
  const faqs = homeFaqs(tx, spainChrome);
  const pricingMeta = metaFor("/pricing", locale) ?? PAGE_META["/pricing"];
  const table = [
    { group: tx("El sitio"), rows: [[tx("Páginas incluidas"), tx("Hasta 5"), tx("Hasta 10"), tx("Hasta 20"), tx("Hasta 10")], [tx("Hosting, SSL, respaldos"), tx("Incluido"), tx("Incluido"), tx("Incluido"), tx("12 meses")], [tx("Cambios chicos"), tx("2 / mes, 2 días"), tx("Sin tope, 1 día"), tx("Sin tope, el mismo día"), tx("30 min / mes")], [tx("Páginas nuevas"), spainChrome ? tx("Se cotizan") : "$99", tx("1 / mes"), tx("2 / mes"), tx("Cotizado")], [tx("Los archivos son tuyos"), "—", "—", "—", tx("Sí")]] },
    { group: tx("Seguimiento"), rows: [[tx("Texto si no contestas**"), "—", spainChrome ? tx("Opcional · 2.º número + operador") : tx("$1/mes 2.º número + operador"), spainChrome ? tx("Opcional · EN/ES · 2.º número + operador") : tx("$1/mes 2.º número + operador · EN/ES"), spainChrome ? tx("Extra opcional") : tx("Extra $97 / mes")], [tx("Reseñas de Google"), "—", tx("Después de cada trabajo"), tx("Inglés y español"), "—"], [tx("Perfil de Google"), "—", tx("Ajuste"), tx("Ajuste + 2 publicaciones"), "—"], [tx("Llamadas y reporte"), "—", tx("Mensual"), tx("Mensual"), "—"], [tx("Sitio bilingüe"), "—", "—", tx("Sí"), "—"]] },
    { group: tx("El acuerdo"), rows: [[tx("Garantía de 60 días"), "—", tx("Sí"), tx("Sí"), "—"], [tx("Devolución en 30 días"), tx("Sí"), tx("Sí"), tx("Sí"), tx("Sí")], [tx("Cobro"), tx("Mes a mes"), tx("Mes a mes"), tx("Mes a mes"), tx("Un pago")], [tx("Cancela cuando quieras"), tx("Sí"), tx("Sí"), tx("Sí"), "—"], [tx("Precio fijo"), tx("24 meses"), tx("24 meses"), tx("24 meses"), tx("Un pago")], [tx("Precio"), spainChrome ? tx("Mensual") : "$97 / mes", spainChrome ? tx("Mensual") : "$197 / mes", spainChrome ? tx("Mensual") : "$297 / mes", spainChrome ? tx("Un pago") : "$1,497"]] },
  ];
  return (
    <>
      <ContentSchema path={href("/pricing")} title={pricingMeta.title} description={pricingMeta.description} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Precios"), path: href("/pricing") }]} faqs={faqs} serviceType={tx("Diseño web")} products={plans} inLanguage={lang} />
      <PageHero locale={locale} h1={tx("Elige el plan de sitio que te conviene")} mark={tx("te conviene")} sub={tx("Empieza con el sitio que necesita tu negocio y agrega el seguimiento que quieras. Todos los planes comienzan con una vista previa gratis.")} image="pricing" imageAlt={tx("Precios con una tarjeta y palomas")} />
      <Section>
        <div className="free-preview">
          <div className="free-preview__copy">
            <span className="free-preview__mark" aria-hidden="true" />
            <div>
              <b>{tx("Vista previa gratis de la página principal en 2 días hábiles.")}</b>
              <span>{tx("Cada plan empieza con una vista previa gratis. Sin tarjeta y sin obligación.")}</span>
            </div>
          </div>
          <span className="free-preview__tag">{tx("Vista previa gratis primero")}</span>
        </div>
        <div className="plans">
          {plans.map((plan) => (
            <article className={`plan${plan.popular ? " plan--pop" : ""}`} key={plan.slug}>
              {plan.popular && <span className="plan__badge">{tx("El más elegido")}</span>}
              <div className="plan__intro">
                <h2 className="plan-title">{plan.name}</h2>
                <p className="plan__tagline">{plan.tagline}</p>
                {!spainChrome && <SpanishPlanSticker slug={plan.slug} kind="offer" />}
                <p className="plan__note">{plan.note}</p>
                {plan.guarantee && <p className="plan__guarantee">{tx("Incluye la garantía de 60 días")}</p>}
                <p className="plan__guarantee plan__guarantee--refund">{tx("Garantía de devolución en 30 días")}</p>
                <Link className="btn plan__cta btn--primary" href={`${href("/contact")}?plan=${plan.slug}`} prefetch={false}>{plan.cta}</Link>
              </div>
              <div className="plan__body">
                <p className="plan__includes">{tx("Qué incluye")}</p>
                <ul className="ticks">{plan.features.map(([title, detail]) => <li key={title}><b>{title}</b><span>{detail}</span></li>)}</ul>
              </div>
            </article>
          ))}
        </div>
        <p className="pay-bridge">{tx("¿Ya aprobaste la vista previa?")} <Link className="trust-mark" href="/pay" hrefLang="en-US" prefetch={false}>{tx("Seguir al pago")}</Link>. {tx("La caja está en inglés.")}</p>
        <div className="guarantee-stack">
          <div className="guarantee-band">
            <GuaranteeBadge alt={tx("Garantía de leads rastreados de 60 días")} />
            <div>
              <h3><HL text={tx("¿Cero leads rastreados en 60 días? Condonamos dos cargos.")} mark={tx("dos cargos")} /></h3>
              <p>{tx("Si Lead System o Plus no produce leads rastreados en los primeros 60 días en vivo, se condonan el tercer y cuarto cargo. Un lead rastreado es una llamada de 30 segundos o más, una respuesta al texto, o un formulario real. Una garantía por negocio.")}</p>
              <OpenDialog id="guarantee" className="trust-mark">{tx("Leer la garantía")}</OpenDialog>
            </div>
          </div>
          <div className="guarantee-band guarantee-band--refund">
            <div>
              <h3><HL text={tx("Garantía de devolución en 30 días")} mark={tx("devolución")} /></h3>
              <p>{tx("Todos los planes incluyen una garantía de devolución de 30 días. Si no quedas satisfecho con tu sitio en los primeros 30 días desde el lanzamiento, te devolvemos tu pago más reciente completo. Debes pedirlo por escrito. No cubre costos de terceros que ya hayamos pagado.")}</p>
              <OpenDialog id="refund" className="trust-mark">{tx("Leer los detalles de la devolución")}</OpenDialog>
            </div>
          </div>
        </div>
        <aside className="pricing-terms" aria-labelledby="pricing-terms-heading">
          <header className="pricing-terms__head">
            <b id="pricing-terms-heading">{tx("Los términos, en claro")}</b>
            <p>{tx("Resumen en lenguaje sencillo de cobro, cancelación, textos y garantías. El acuerdo que apruebas al pagar manda si algo difiere.")}</p>
          </header>
          <div className="pricing-terms__grid">
            <section className="pricing-terms__group">
              <h3>{tx("Cobro")}</h3>
              <ul>
                <li>{spainChrome
                  ? tx("Los planes mensuales empiezan sin enganche y son mes a mes desde el lanzamiento. No hay contrato largo ni cargo por cancelar.")
                  : tx("Los planes mensuales son $0 de enganche y mes a mes desde el lanzamiento. No hay contrato largo ni cargo por cancelar.")}</li>
                <li>{tx("Tu precio mensual queda fijo 24 meses desde el lanzamiento; después avisamos al menos 30 días antes de cualquier cambio.")}</li>
              </ul>
            </section>
            <section className="pricing-terms__group">
              <h3>{tx("Cancelar y quedarte con el sitio")}</h3>
              <ul>
                <li>{tx("Cancela cuando quieras por texto, correo o Messenger. El sitio sigue en línea hasta el final del período que ya pagaste.")}</li>
                <li>{spainChrome
                  ? tx("Cuando ese período termina, el hosting y la administración se detienen y el sitio sale de línea. Para quedártelo, pide una compra por escrito de los archivos para hospedarlos tú—o pasa a Own It antes de que termine el período. Pide las condiciones por escrito antes de cancelar.")
                  : tx("Cuando ese período termina, el hosting y la administración se detienen y el sitio sale de línea. Para quedártelo, pide una compra de $1,497 por escrito de los archivos para hospedarlos tú—o pasa a Own It antes de que termine el período. Pide las condiciones por escrito antes de cancelar.")}</li>
              </ul>
            </section>
            <section className="pricing-terms__group">
              <h3>{tx("Texto si no contestas")}</h3>
              <ul>
                <li>{spainChrome
                  ? tx("El texto si no contestas es un extra opcional. Se necesita una línea dedicada de la empresa. Puede haber un segundo número de seguimiento y tarifas del operador. La activación depende de la aprobación del operador (normalmente 10 a 15 días); esa aprobación no está garantizada.")
                  : tx("El texto si no contestas es un extra opcional. Se necesita una línea dedicada de la empresa. Un segundo número de seguimiento cuesta $1 al mes. Pueden aplicar tarifas del operador. La activación depende de la aprobación del operador (normalmente 10 a 15 días); esa aprobación no está garantizada.")}</li>
              </ul>
            </section>
            <section className="pricing-terms__group">
              <h3>{tx("Garantías")}</h3>
              <ul>
                <li>{tx("Lead System y Plus incluyen la garantía de leads de 60 días. Own It no.")}</li>
                <li>{tx("Todos los planes incluyen una garantía de devolución de 30 días. Si no quedas satisfecho en los primeros 30 días desde el lanzamiento, te devolvemos tu pago más reciente completo si lo pides por escrito. No cubre costos de terceros que ya hayamos pagado.")}</li>
                <li>{tx("Un lead rastreado es una llamada de 30 segundos o más, alguien que responde al texto, o un formulario real. No cuentan spam, números equivocados, solicitantes ni clientes actuales.")}</li>
                <li>{tx("La garantía de 60 días es una por negocio y aplica solo con la cuenta al corriente.")}</li>
              </ul>
            </section>
            <section className="pricing-terms__group">
              <h3>{tx("Cambios y Own It")}</h3>
              <ul>
                <li>{tx("Un cambio chico toma 30 minutos o menos. Las peticiones se atienden de una en una.")}</li>
                <li>{spainChrome
                  ? tx("En Own It, los cambios chicos se hacen en 2 días hábiles y el tiempo no usado no se acumula. Después de 12 meses, el Cuidado del sitio opcional incluye hosting y hasta 30 minutos de cambios al mes.")
                  : tx("En Own It, los cambios chicos se hacen en 2 días hábiles y el tiempo no usado no se acumula. Después de 12 meses, el Cuidado del sitio opcional es $39 al mes por hosting y hasta 30 minutos de cambios.")}</li>
                <li>{tx("Las renovaciones de dominio posteriores se cobran al costo, las páginas nuevas en Own It se cotizan por escrito y los precios no incluyen impuestos, si los hay.")}</li>
              </ul>
            </section>
          </div>
          <div className="pricing-terms__foot">
            <p className="pricing-footnote">
              <b>**</b>{" "}
              {spainChrome
                ? tx("El texto si no contestas es un extra opcional. Se necesita una línea dedicada de la empresa. Puede haber un segundo número de seguimiento y tarifas del operador. La activación depende de la aprobación del operador. Los textos suelen empezar 10 a 15 días después de la aprobación; esa aprobación no está garantizada.")
                : tx("El texto si no contestas es un extra opcional. Se necesita una línea dedicada de la empresa. Un segundo número de seguimiento cuesta $1 al mes. Pueden aplicar tarifas del operador. La activación depende de la aprobación del operador. Los textos suelen empezar 10 a 15 días después de la aprobación; esa aprobación no está garantizada.")}
            </p>
            <Link href={href("/terms")} prefetch={false}>{tx("Términos completos del plan →")}</Link>
          </div>
        </aside>
      </Section>
      <Section tint>
        <h2 className="center"><HL text={tx("Mira qué cubre cada plan")} mark={tx("cada plan")} /></h2>
        <MobilePlanComparison
          plans={plans.map((plan, index) => ({ ...plan, price: table[2].rows[5][index + 1], sticker: spainChrome ? undefined : SPANISH_PLAN_STICKERS[plan.slug].name }))}
          sections={table}
          hint={tx("Toca un plan para ver qué incluye. Abre dos para comparar.")}
          popularLabel={tx("El más elegido")}
          hideStickers={spainChrome}
        />
        <div className="table-scroll pricing-comparison-table"><table className="plan-table"><thead><tr><th scope="col">{tx("Qué recibes")}</th>{plans.map((plan, planIndex) => <th scope="col" className={plan.popular ? "is-pop" : undefined} key={plan.slug}>{spainChrome ? <span className="plan-table__name">{plan.name}<br /><small>{table[2].rows[5][planIndex + 1]}</small></span> : <SpanishPlanSticker slug={plan.slug} kind="name" />}</th>)}</tr></thead>
          {table.map((section) => <tbody key={section.group}><tr className="plan-table__group"><th colSpan={5}><span>{section.group}</span></th></tr>{section.rows.map(([label, ...values]) => <tr key={label}><th scope="row">{label}</th>{values.map((value, i) => <td className={i === 1 ? "is-pop" : undefined} key={`${label}-${i}`}>{value}</td>)}</tr>)}</tbody>)}
        </table></div>
      </Section>
      <Section narrow><Faq items={faqs} /></Section>
    </>
  );
}

function About({ locale, tx, href, lang }: { locale: Locale; tx: (s: string) => string; href: (p: string) => string; lang: string }) {
  const faqs = homeFaqs(tx, locale === "es-ES").slice(0, 4);
  const steps: Step[] = [
    { tab: "Preview", label: tx("Vista previa"), title: tx("Lo ves primero"), text: tx("La vista previa es el punto de partida. La apruebas, pides cambios o te vas.") },
    { tab: "Plan", label: tx("Plan"), title: tx("Queda por escrito"), text: tx("Qué incluye el plan y la fecha de lanzamiento se confirman por escrito — normalmente 5 días hábiles después de aprobar la vista previa y enviarnos el contenido.") },
    { tab: "Build", label: tx("Construcción"), title: tx("El sitio completo"), text: tx("Servicios, zona, fotos y el dominio, con tu aprobación antes de publicar.") },
    { tab: "Launch", label: tx("Lanzamiento"), title: tx("En vivo"), text: tx("El sitio sale, normalmente en 5 días hábiles. En Lead System y Plus, las reseñas y el texto opcional esperan la aprobación del operador.") },
    { tab: "Grow", label: tx("Crecer"), title: tx("Se mantiene"), text: tx("Cambios, llamadas y reseñas en Lead System y Plus, para que veas los leads en un reporte.") },
  ];
  return (
    <>
      <ContentSchema path={href("/about")} title={(metaFor("/about", locale) ?? PAGE_META["/about"]).title} description={(metaFor("/about", locale) ?? PAGE_META["/about"]).description} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Nosotros"), path: href("/about") }]} faqs={faqs} inLanguage={lang} />
      <PageHero locale={locale} h1={tx("Un equipo pequeño para negocios de servicios")} mark={tx("negocios de servicios")} sub={locale === "es-ES"
        ? tx("Creamos sitios, mejoramos la visibilidad, pedimos reseñas en Google y ofrecemos texto opcional si no contestas, para negocios de servicios locales.")
        : tx("Creamos sitios, mejoramos la visibilidad, pedimos reseñas en Google y ofrecemos texto opcional si no contestas, para negocios en Estados Unidos.")} image="about" imageAlt={tx("Computadora y un boceto de una página de inicio")} />
      <section className="section"><div className="container two-col">
        <div>
          <h2><HL text={tx("Para negocios que dependen del teléfono")} mark={tx("dependen del teléfono")} /></h2>
          <p>{locale === "es-ES"
            ? tx("Kinexis trabaja con fontanería, HVAC, electricidad, techos, jardinería y otros negocios de servicios locales. Tus clientes buscan cuando necesitan ayuda, así que el sitio y el seguimiento dejan claro qué hacer después.")
            : tx("Kinexis trabaja con plomería, HVAC, electricidad, techos, jardinería y otros negocios en Estados Unidos. Tus clientes buscan cuando necesitan ayuda, así que el sitio y el seguimiento dejan claro qué hacer después.")}</p>
          <Link className="btn btn--primary" href={href("/contact")} prefetch={false}>{tx("Cuéntanos sobre tu sitio")}</Link>
        </div>
        <div>
          <h2><HL text={tx("Lo que mantenemos sencillo")} mark={tx("sencillo")} /></h2>
          <ul className="ticks ticks--orange">
            <li><b>{tx("Cuatro planes definidos")}</b><span>{tx("Elige el sitio y el seguimiento que necesitas")}</span></li>
            <li><b>{tx("La parte técnica resuelta")}</b><span>{tx("Los planes mensuales incluyen hosting, SSL y cambios chicos")}</span></li>
            <li><b>{tx("Una recomendación honesta")}</b><span>{tx("Te decimos si un plan no le conviene a tu negocio")}</span></li>
          </ul>
        </div>
      </div></section>
      <Section tint><h2 className="center"><HL text={tx("Una forma práctica de empezar")} mark={tx("de empezar")} /></h2><Stepper steps={steps} /></Section>
      <Section narrow><Faq items={faqs} /></Section>
    </>
  );
}

function Contact({ locale, tx, href, lang }: { locale: Locale; tx: (s: string) => string; href: (p: string) => string; lang: string }) {
  return (
    <>
      <ContentSchema path={href("/contact")} title={tx(PAGE_META["/contact"].title)} description={tx(PAGE_META["/contact"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Contacto"), path: href("/contact") }]} inLanguage={lang} />
      <PageHero locale={locale} h1={<HL text={tx("¿Quieres ver tu página de inicio?")} mark={tx("página de inicio")} />} sub={tx("Cuéntanos sobre tu negocio y te ayudamos a decidir si uno de los planes te conviene.")} image="contact" imageAlt={tx("Teléfono, sobre y burbujas de chat")} />
      <Section><div className="contact-grid">
        <Form fields={[{ label: tx("Nombre"), name: "name", required: true, auto: "given-name" }, { label: tx("Correo"), name: "email", kind: "email", auto: "email" }, { label: tx("Teléfono"), name: "phone", kind: "tel", auto: "tel" }, { label: tx("Nombre del negocio"), name: "business", required: true, auto: "organization" }, { label: tx("Tipo de negocio y ciudad (ej. HVAC en Phoenix)"), name: "trade", required: true }, { label: tx("Sitio web actual (opcional)"), name: "website", auto: "url" }]} button={tx("Muéstrame mi página de inicio")} note={tx("Sin tarjeta. Respondemos rápido. 😊")} fast fastText={tx("Sin tarjeta. Respondemos rápido. 😊")} />
        <aside className="contact-info">
          <div className="card"><h2 className="card-title">{tx("Llamar")}</h2><p><a href={telHref(SITE.phone)}>{SITE.phone}</a></p></div>
          <div className="card"><h2 className="card-title">{tx("Correo")}</h2><p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p></div>
          <div className="card"><h2 className="card-title">{tx("Zona")}</h2><p>{locale === "es-ES"
            ? tx("Negocios de servicios locales. Inglés y español en el plan Plus.")
            : tx("Negocios en Estados Unidos. Inglés y español en el plan Plus.")}</p></div>
          <div className="card"><h2 className="card-title">{tx("Agenda")}</h2><p className="muted">{tx("¿Prefieres hablarlo? Agenda una llamada corta.")}</p><Link className="btn btn--ghost" href={href("/strategy-call")} prefetch={false}>{tx("Agendar")}</Link></div>
        </aside>
      </div></Section>
    </>
  );
}

function Audit({ locale, tx, href, lang }: { locale: Locale; tx: (s: string) => string; href: (p: string) => string; lang: string }) {
  const aside = [[tx("Velocidad de las páginas"), tx("Revisamos qué tan rápido abren las páginas principales en celular y computadora."), "audit-speed"], [tx("Configuración de búsqueda"), tx("Revisamos títulos, encabezados, indexación y las señales básicas que lee Google."), "search-optimized"], [tx("Uso en el celular"), tx("Vemos cómo cabe, se lee y funciona el sitio en una pantalla de teléfono."), "audit-mobile"], [tx("Llamadas y formularios"), tx("Comprobamos si queda claro cómo llamar, preguntar o pedir una cotización."), "audit-conversion"]] as const;
  return (
    <>
      <ContentSchema path={href("/audit")} title={tx(PAGE_META["/audit"].title)} description={tx(PAGE_META["/audit"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Auditoría"), path: href("/audit") }]} inLanguage={lang} serviceType={tx("Auditoría de sitio y SEO")} />
      <PageHero locale={locale} h1={tx("Recibe una lista clara de cambios")} mark={tx("lista clara")} sub={tx("Mándanos el enlace. Lo revisamos y te decimos qué cambios merecen atención primero.")} image="website-audit" imageAlt={tx("Tablero de auditoría con una lupa")} />
      <Section><div className="contact-grid">
        <div>
          <Illustration name="free-site-audit" format="webp" alt={tx("Auditoría gratis")} className="audit-hero-img" width={560} height={400} />
          <Form button={tx("Pedir mi auditoría")} fields={[{ label: tx("Tu nombre"), name: "name", required: true }, { label: tx("Correo"), name: "email", kind: "email", required: true }, { label: tx("URL del sitio"), name: "url", kind: "url", required: true }, { label: tx("¿Qué debemos ver primero?"), name: "notes", kind: "textarea" }]} />
        </div>
        <aside className="contact-info">{aside.map(([h, t, icon]) => <div className="card" key={icon}><Icon name={icon} alt={h} size={64} /><h2 className="card-title">{h}</h2><p className="muted">{t}</p></div>)}</aside>
      </div></Section>
    </>
  );
}

function Industries({ locale, tx, href, lang, band }: PageBits & { locale: Locale }) {
  const industries = localizedIndustries(locale);
  return (
    <>
      <ContentSchema path={href("/industries")} title={tx(PAGE_META["/industries"].title)} description={tx(PAGE_META["/industries"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Industrias"), path: href("/industries") }]} inLanguage={lang} />
      <PageHero locale={locale} eyebrow={tx("Industrias")} h1={tx("Un sitio que encaja con tu negocio")} mark={tx("tu negocio")} sub={tx("Elige el tipo de trabajo para ver sus servicios comunes, las páginas útiles y el seguimiento del día a día.")}>
        <p className="btn-row"><Link className="btn btn--primary" href={href("/audit")} prefetch={false}>{tx("Revisar mi sitio")}</Link><Link className="btn btn--ghost" href={href("/pricing")} prefetch={false}>{tx("Ver precios")}</Link></p>
      </PageHero>
      <Section><IndustryGrid industries={industries} base={href("/industries")} /></Section>
      <Section tint narrow>
        <p>{locale === "es-ES"
          ? tx("La vista previa va primero, sin tarjeta. Después el sitio es uno de cuatro planes: Website, Lead System, Plus u Own It.")
          : tx("La vista previa va primero, sin tarjeta. Después el sitio es uno de cuatro planes: Website a $97 al mes, Lead System a $197, Plus a $297, u Own It por $1,497.")}</p>
        <p>{tx("Lead System y Plus incluyen pedidos de reseña en Google. El texto si no contestas es un extra opcional en esos planes. El SEO continuo se cotiza aparte.")}</p>
      </Section>
      <CtaBand h={tx("Mira cómo podría verse tu negocio")} mark={tx("tu negocio")} sub={tx("Preparamos la página de inicio antes de que pagues, sin tarjeta ni obligación.")} btn={tx("Revisar mi sitio")} href={href("/audit")} {...band} />
    </>
  );
}

function Faqs({ locale, tx, href, lang, band }: PageBits) {
  const faqs = [{ q: tx("¿Qué tan rápido recibo mi vista previa gratis?"), a: tx("Su vista previa gratis de la página principal está lista en 2 días hábiles después de recibir la información de su negocio, sin tarjeta.") }, ...homeFaqs(tx, locale === "es-ES")];
  return (
    <>
      <ContentSchema path={href("/faqs")} title={tx(PAGE_META["/faqs"].title)} description={tx(PAGE_META["/faqs"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Preguntas"), path: href("/faqs") }]} faqs={faqs} inLanguage={lang} />
      <PageHero locale={locale} h1={tx("Preguntas que nos hacen los negocios")} mark={tx("nos hacen")} sub={tx("Consulta los detalles de planes, propiedad, garantía de 60 días y cancelación. Si falta tu duda, escríbenos.")} image="faqs" imageAlt={tx("Signos de interrogación")} />
      <Section narrow><Faq items={faqs} /></Section>
      <CtaBand h={tx("¿Necesitas una respuesta más concreta?")} mark={tx("más concreta")} sub={tx("Escribe o llama. Te explicamos los detalles del plan antes de que pagues.")} btn={tx("Contacto")} href={href("/contact")} {...band} />
    </>
  );
}

function Blog({ locale, tx, href, lang, band }: PageBits) {
  // Only list posts that have Spanish bodies — EN-only drafts 404 on /es|/es-es.
  const posts = POSTS.filter((post) => esPost(post.slug)).map((post) => {
    const es = locale === "es-ES" || locale === "es-419" ? esPostForLocale(post.slug, locale)! : esPost(post.slug)!;
    const text = locale === "es-ES" ? spainizeData(es) : es;
    return { ...post, title: text.title, excerpt: text.excerpt, category: text.category };
  });
  const blogSub = locale === "es-ES"
    ? tx("Guías de SEO, diseño y marketing para negocios de servicios locales.")
    : tx("Guías de SEO, diseño y marketing para negocios de servicios en Estados Unidos.");
  return (
    <>
      <ContentSchema path={href("/blog")} title={tx(PAGE_META["/blog"].title)} description={tx(PAGE_META["/blog"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: "Blog", path: href("/blog") }]} inLanguage={lang} />
      <PageHero locale={locale} h1={tx("Blog de marketing digital")} mark="Blog" sub={blogSub} image="blog" imageAlt={tx("Tarjetas de artículos")} />
      <Section>
        <Filterable cats={[tx("Consejos"), "SEO", tx("Diseño")]} allLabel={tx("Todo")} />
        <div className="grid grid--3 blog-index">
          {posts.map((post) => (
            <article className="card post" key={post.slug} data-cat={post.category}>
              <Link href={href(`/blog/${post.slug}`)} className="post__link" prefetch={false}><div className="post__img"><DeferredImg src={imageVariant(post.image, 640, "webp")} srcSet={imageSrcSet(post.image, BLOG_IMAGE_WIDTHS)} avifSrcSet={imageSrcSet(post.image, BLOG_IMAGE_WIDTHS, "avif")} alt={post.title} width={post.width} height={post.height} sizes="(max-width: 900px) 92vw, 380px" /></div></Link>
              <div className="post__body">
                <Link href={href(`/blog/${post.slug}`)} className="post__link" prefetch={false}><p className="eyebrow">{post.category}</p><h2 className="card-title">{post.title}</h2></Link>
                <p className="post__excerpt muted">{post.excerpt}</p>
                <div className="post__meta">
                  <span>{post.readTime}</span>
                  <Link href={href(`/blog/${post.slug}`)} className="btn btn--ghost btn--sm" aria-label={tx(`Leer ${post.title}`)} prefetch={false}>{tx("Leer la guía")}</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand h={tx("¿Quieres que lo apliquemos a tu sitio?")} mark={tx("tu sitio")} sub={tx("Empieza con una revisión o una vista previa.")} btn={tx("Revisar mi sitio")} href={href("/audit")} {...band} />
    </>
  );
}

function PostView({ locale, slug, lang }: { locale: Locale; slug: string; lang: string }) {
  const raw = locale === "es-ES" || locale === "es-419" ? esPostForLocale(slug, locale) : esPost(slug);
  const source = POSTS.find((post) => post.slug === slug);
  if (!raw || !source) notFound();
  const post = locale === "es-ES" ? spainizeData(raw) : raw;
  const href = (path: string) => L(locale, path);
  const tx = (text: string) => (locale === "es-ES" ? spainize(text) : text);
  const formattedDate = new Date(source.date).toLocaleDateString(locale === "es-ES" ? "es-ES" : "es-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <>
      <ArticleSchema title={post.seoTitle} description={post.excerpt} path={href(`/blog/${post.slug}`)} image={source.image} date={source.date} modified={source.modified} section={post.category} inLanguage={lang} />
      <PageHero
        locale={locale}
        className="page-hero--article"
        eyebrow={post.category}
        h1={post.title}
        sub={
          <span className="blog-post__byline">
            <span className="blog-post__author">{SITE.name}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={source.date}>{formattedDate}</time>
            <span aria-hidden="true">·</span>
            <span>{source.readTime}</span>
          </span>
        }
      />
      <Section>
        <div className="container container--narrow">
          <article className="blog-post">
            <nav className="blog-post__crumb" aria-label={tx("Miga de pan")}>
              <Link href={href("/blog")} prefetch={false}>{tx("Blog")}</Link>
              <span aria-hidden="true">/</span>
              <span>{post.category}</span>
            </nav>
            <div className="blog-post__content prose">
              <p className="blog-post__lead">{post.lead}</p>
              {post.sections.map((section) => (
                <section key={section.h2} className="blog-section">
                  <h2>{section.h2}</h2>
                  <div className="blog-section__body" dangerouslySetInnerHTML={{ __html: section.html }} />
                </section>
              ))}
            </div>
            <footer className="blog-post__footer">
              <Link className="blog-post__back" href={href("/blog")} prefetch={false}>{tx("← Todas las guías")}</Link>
              <Link className="btn btn--ghost btn--sm" href={href("/pricing")} prefetch={false}>{tx("Ver planes y precios")}</Link>
            </footer>
          </article>
        </div>
      </Section>
      <CtaBand h={tx("¿Quieres esto en tu sitio?")} mark={tx("tu sitio")} sub={tx("La revisión es gratis. La vista previa también, antes de pagar.")} btn={tx("Revisar mi sitio")} href={href("/audit")} secondary={tx("Hablar de tus opciones")} secondaryHref={href("/strategy-call")} locale={locale} />
    </>
  );
}

function Care({ locale, tx, href, lang, band }: PageBits) {
  return (
    <>
      <ContentSchema path={href("/website-management")} title={tx(PAGE_META["/website-management"].title)} description={tx(PAGE_META["/website-management"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Mantenimiento"), path: href("/website-management") }]} serviceType={tx("Mantenimiento web")} inLanguage={lang} />
      <PageHero locale={locale} h1={tx("Mantén tu sitio al día")} mark={tx("al día")} sub={tx("Nos encargamos del hosting, los cambios de rutina, los respaldos y la seguridad.")} image="maintenance" imageAlt={tx("Paneles de cuidado con un engrane")} />
      <Section><div className="grid grid--4">
        <IconCard level={2} title={tx("Hosting confiable")} text={tx("El sitio tiene un lugar estable donde funcionar sin que administres un servidor.")} icon="hosting" />
        <IconCard level={2} title={tx("Cambios solicitados")} text={tx("Envíanos el texto o los datos nuevos y actualizamos la página por ti al momento.")} icon="updates" />
        <IconCard level={2} title={tx("Respaldos y seguridad")} text={tx("Vigilamos el sitio y guardamos respaldos por si algo sale mal.")} icon="security" />
        <IconCard level={2} title={tx("Una persona que responde")} text={tx("Cuando necesitas un cambio, contactas a alguien que ya conoce el sitio.")} icon="support" />
      </div></Section>
      <Section tint><div className="center"><Link className="btn btn--primary" href={href("/update")} prefetch={false}>{tx("Pedir un cambio")}</Link></div></Section>
      <CtaBand h={tx("¿Quieres sacar el cuidado de tu lista?")} mark={tx("de tu lista")} sub={tx("Dinos qué necesita el sitio y te explicamos cómo podemos encargarnos.")} btn={tx("Empezar")} href={href("/contact")} {...band} />
    </>
  );
}

async function Reviews({ locale, tx, href, lang, band }: PageBits) {
  const reviews = await getAllReviews();
  const sourceLabels = {
    site: tx("Sitio web"),
    trustpilot: "Trustpilot",
    facebook: "Facebook",
  };
  return (
    <>
      <ContentSchema path={href("/reviews")} title={tx(PAGE_META["/reviews"].title)} description={tx(PAGE_META["/reviews"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Reseñas"), path: href("/reviews") }]} inLanguage={lang} />
      <PageHero locale={locale} h1={tx("Reseñas")} mark={tx("Reseñas")} sub={tx("Lee lo que han compartido los clientes en este sitio, en Trustpilot y en Facebook.")} image="reviews" imageAlt={tx("Tarjetas de reseñas")} />
      <Section>
        <h2 className="center"><HL text={tx("Comparte tu experiencia")} mark={tx("experiencia")} /></h2>
        <p className="center muted">{tx("Deja una reseña aquí en el sitio, o abre Trustpilot en un clic.")}</p>
        <div className="review-actions spaced">
          <LeaveTrustpilotReview label={tx("Dejar una reseña en Trustpilot")} />
        </div>
        <div className="site-review-panel spaced">
          <SiteReviewForm copy={{
            title: tx("Deja una reseña en este sitio"),
            sub: tx("Envía una reseña corta (máximo 280 caracteres). La revisamos antes de publicarla aquí. ¿Prefieres Trustpilot? Usa el botón de arriba."),
            name: tx("Tu nombre"),
            email: tx("Correo"),
            stars: tx("Calificación"),
            quote: tx("Tu reseña"),
            button: tx("Enviar mi reseña"),
            thanks: tx("Gracias — recibimos tu reseña y la publicaremos tras una revisión rápida."),
            fill: tx("Completa los campos marcados."),
            tooShort: tx("Escribe al menos 20 caracteres."),
            tooLong: tx("La reseña no puede pasar de 280 caracteres."),
            error: tx("Algo salió mal. Inténtalo de nuevo."),
            network: tx("Error de red. Inténtalo de nuevo."),
          }} />
        </div>
      </Section>
      <Section tint>
        <h2 className="center"><HL text={tx("Lo que cuentan los clientes")} mark={tx("los clientes")} /></h2>
        <p className="center muted">
          {reviews.length > 0
            ? tx("Reseñas de este sitio, Trustpilot y Facebook — mismo formato, las más nuevas primero.")
            : tx("Aún no hay reseñas. Sé el primero en compartir tu experiencia.")}
        </p>
        {reviews.length > 0 ? (
          <div className="review-cards">
            {reviews.map((review) => <UnifiedReviewCard key={review.id} review={review} sourceLabels={sourceLabels} />)}
          </div>
        ) : null}
        <div className="review-actions spaced">
          <LeaveTrustpilotReview label={tx("Dejar una reseña en Trustpilot")} />
        </div>
      </Section>
      <CtaBand h={tx("¿Quieres un sitio que traiga trabajo?")} mark={tx("traiga trabajo")} sub={tx("Empieza con una vista previa gratis de tu negocio.")} btn={tx("Empezar")} href={href("/contact")} {...band} />
    </>
  );
}

function Upgrades({ locale, tx, href, lang, band }: PageBits) {
  const items = [
    ["extra-page", tx("Página extra"), tx("Agrega un servicio, una zona o una landing a Website, Lead System o Plus."), "$99"],
    ["site-care", tx("Cuidado del sitio"), tx("Hosting, SSL y hasta 30 minutos de cambios al mes después del primer año en Own It."), "$39 / mes"],
    ["missed-call-text-back", tx("Texto si no contestas"), tx("Extra para Website u Own It. Requiere línea dedicada. Un segundo número cuesta $1/mes si lo usas. Pueden aplicar tarifas del operador. La aprobación del operador suele tardar 10 a 15 días y no está garantizada."), "$97 / mes"],
    ["new-pages", tx("Páginas nuevas en Own It"), tx("Las páginas extra de Own It se cotizan por escrito antes de empezar."), tx("Cotizado")],
    ["better-design", tx("Mejora de diseño a medida"), tx("Diseño único cuando una plantilla no alcanza. Empieza con cualquier plan; cotizamos la mejora por escrito antes de trabajar."), tx("Tarifa de mercado · cotizado")],
  ] as const;
  return (
    <>
      <ContentSchema path={href("/upgrades")} title={tx(PAGE_META["/upgrades"].title)} description={tx(PAGE_META["/upgrades"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Extras"), path: href("/upgrades") }]} inLanguage={lang} />
      <PageHero locale={locale} h1={tx("Agrega más cuando lo necesites")} mark={tx("cuando lo necesites")} sub={tx("Empieza con el plan correcto y suma páginas, cuidado o textos cuando cambie el negocio.")} image="upgrades" imageAlt={tx("Extras alrededor de un sitio")} />
      <Section><div className="grid grid--4 upgrades">{items.map(([icon, title, text, price]) => <article className="card center" key={icon}><Icon name={icon} alt={title} /><h2 className="card-title">{title}</h2><p>{text}</p><p className="upgrade__price">{price}</p></article>)}</div></Section>
      <CtaBand h={tx("¿Necesitas ayuda para elegir un extra?")} mark={tx("elegir un extra")} sub={tx("Te decimos qué incluye tu plan y qué puedes agregar después, antes de cobrarlo.")} btn={tx("Escríbenos")} href={href("/contact")} {...band} />
    </>
  );
}

function Strategy({ locale, tx, href, lang }: { locale: Locale; tx: (s: string) => string; href: (p: string) => string; lang: string }) {
  const copy: BookingCopy = {
    fill: tx("Completa los campos marcados."),
    mail: tx("Tu app de correo debería abrirse con esta solicitud. Si no, escribe a"),
    error: tx("Algo salió mal. Inténtalo de nuevo."),
    network: tx("Error de red. Inténtalo de nuevo."),
    requested: tx("Horario pedido"),
    confirm: tx("Lo confirmamos por correo. Si ese horario está tomado, te mandamos el siguiente."),
    prev: tx("Mes anterior"),
    next: tx("Mes siguiente"),
    chooseDay: tx("Elige un día"),
    zone: tx("Días hábiles, hora del Centro. Elige un horario con al menos un día de anticipación."),
    noTimes: tx("No hay horarios este día."),
    chooseTime: tx("Elige una hora"),
    at: tx("a las"),
    firstName: tx("Nombre"),
    email: tx("Correo"),
    phone: tx("Teléfono"),
    business: tx("Tipo de negocio"),
    book: tx("Reservar este horario"),
    days: "DLMXJVS",
    dateLocale: locale === "es-ES" ? "es-ES" : "es-MX",
  };
  return (
    <>
      <ContentSchema path={href("/strategy-call")} title={tx(PAGE_META["/strategy-call"].title)} description={tx(PAGE_META["/strategy-call"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Llamada"), path: href("/strategy-call") }]} inLanguage={lang} />
      <PageHero locale={locale} h1={tx("Hablemos de tus planes para el sitio")} mark={tx("planes para el sitio")} sub={tx("En una llamada corta puedes mostrar el sitio actual, explicar el negocio y ver qué plan encaja.")} />
      <section className="section"><div className="container two-col two-col--book">
        <div>
          <h2><HL text={tx("Lo que vamos a revisar")} mark={tx("vamos a revisar")} /></h2>
          <ul className="ticks ticks--expect">
            <li><span className="tick__mark" aria-hidden="true">✓</span><span>{tx("Cómo te encuentran y se ponen en contacto hoy")}</span></li>
            <li><span className="tick__mark" aria-hidden="true">✓</span><span>{tx("Qué servicios quieres apoyar con el sitio")}</span></li>
            <li><span className="tick__mark" aria-hidden="true">✓</span><span>{tx("Qué plan tiene sentido, incluso si ninguno te conviene")}</span></li>
          </ul>
          <p>{tx("Elige un horario. Lo confirmamos por correo. También puedes llamar")} <a href={telHref(SITE.phone)}>{SITE.phone}</a>.</p>
        </div>
        <BookingCalendar copy={copy} />
      </div></section>
    </>
  );
}

function Terms({ locale, tx, href, lang }: { locale: Locale; tx: (s: string) => string; href: (p: string) => string; lang: string }) {
  return (
    <>
      <ContentSchema path={href("/terms")} title={tx(PAGE_META["/terms"].title)} description={tx(PAGE_META["/terms"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Términos"), path: href("/terms") }]} inLanguage={lang} />
      <PageHero locale={locale} h1={tx("Términos de planes y cobro")} mark={tx("cobro")} sub={tx("Actualizado el 7 de noviembre de 2026. Estos son los términos de los cuatro planes. El acuerdo que apruebas al pagar manda si algo difiere.")} />
      <section className="section"><div className="container container--narrow prose">
        <h2>{tx("1. Vista previa gratis")}</h2>
        <p>{tx("Cada plan empieza con una vista previa de la página de inicio. Las vistas previas gratis de la página principal se entregan dentro de 2 días hábiles después de recibir los datos de su negocio. Sin tarjeta y sin obligación. Te mostramos un concepto para tu negocio. Puedes aprobarlo, pedir cambios o irte sin pagar.")}</p>
        <h2>{tx("2. Planes mensuales")}</h2>
        <p>{tx("Website es $97 al mes. Lead System es $197 al mes. Plus (bilingüe) es $297 al mes. Los tres son $0 de enganche y empiezan el día del lanzamiento. Son mes a mes, sin contrato largo y sin cargo por cancelar. Puedes cancelar cuando quieras por texto, correo o Messenger. El precio queda fijo 24 meses. Después avisamos al menos 30 días antes de un cambio.")}</p>
        <h2>{tx("3. Qué incluye")}</h2>
        <p>{tx("Las páginas y el trabajo incluido están en la página de precios. Una página extra en Website cuesta $99. Lead System incluye una página nueva al mes y Plus incluye dos. Lo que no usas no se acumula. Un cambio chico toma 30 minutos o menos y se hace uno a la vez. Hosting, SSL, seguridad y respaldos van incluidos mientras el plan mensual está activo. En Own It, hosting y SSL van los primeros 12 meses; después el cuidado opcional es $39 al mes.")}</p>
        <h2>{tx("4. Textos y el operador")}</h2>
        <p>{tx("El texto si no contestas es un extra opcional. Se necesita una línea dedicada de la empresa. Un segundo número de seguimiento cuesta $1 al mes. Pueden aplicar tarifas del operador. El texto si no contestas y los pedidos de reseña se envían por mensaje. La activación depende de la aprobación del operador. Los textos suelen empezar 10 a 15 días después de la aprobación. Esa aprobación no está garantizada.")}</p>
        <h2>{tx("5. Garantía de 60 días")}</h2>
        <p>{tx("Solo Lead System y Plus. Si tienes cero leads rastreados en los primeros 60 días en vivo, condonamos el tercer y cuarto cargo mensual. Una garantía por negocio, con la cuenta al corriente. Un lead rastreado es una llamada de 30 segundos o más, alguien que responde al texto, o un formulario real. No cuentan spam, números equivocados, solicitantes, proveedores ni clientes actuales. No aplica si el seguimiento falla por un cambio que haces tú, o si pausas o cancelas antes del día 60. Own It no incluye esta garantía.")}</p>
        <h2>{tx("6. Own It")}</h2>
        <p>{tx("Own It es un pago de $1,497, al aprobar la vista previa. No hay plan mensual. Los archivos son tuyos desde el lanzamiento. Hosting y SSL van 12 meses, el dominio el primer año, y los cambios chicos 12 meses hasta 30 minutos al mes. El tiempo no usado no se acumula. Después, el cuidado opcional es $39 al mes. Las renovaciones de dominio se cobran al costo. Las páginas nuevas se cotizan por escrito. En Own It, el texto si no contestas se puede agregar por $97 al mes. En Lead System o Plus, un segundo número cuesta $1 al mes si lo usas, más tarifas del operador.")}</p>
        <h2>{tx("7. Cancelación y acceso")}</h2>
        <p>{tx("Cancela un plan mensual cuando quieras por texto, correo o Messenger. No hay cargo por cancelar. El cobro se detiene al final del período que ya pagaste y el sitio sigue en línea hasta entonces.")}</p>
        <p>{tx("Como en los planes mensuales Kinexis hospeda y administra el sitio, cuando termina el período pagado el hosting y la administración se detienen y el sitio sale de línea, salvo que lo conserves de otra forma.")}</p>
        <p><b>{tx("Compra:")}</b> {tx("un pago único por escrito de los archivos del sitio para moverlos a un hosting que tú controles. Pide las condiciones por escrito antes de cancelar si ese es el camino que quieres.")}</p>
        <p><b>{tx("Pasar a Own It:")}</b> {tx("cambia de un plan mensual al pago único de Own It antes de que termine el período pagado. Los términos de Own It (archivos, hosting incluido y Cuidado del sitio) están en la sección 6.")}</p>
        <p>{tx("Si no arreglas una compra ni pasas a Own It antes de que termine el período pagado, el sitio sale de línea cuando se detienen el hosting y la administración.")}</p>
        <h2>{tx("8. Impuestos y terceros")}</h2>
        <p>{tx("Los precios están en dólares de EE. UU. y no incluyen impuestos. Renovaciones de dominio, imágenes de pago, publicidad y otros servicios de terceros no están incluidos salvo que lo pongamos por escrito.")}</p>
        <h2>{tx("9. Preguntas")}</h2>
        <p>{tx("Llama al")} <a href={telHref(SITE.phone)}>{SITE.phone}</a> {tx("o escribe a")} <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. {tx("Contestamos dudas del plan antes de que pagues.")}</p>
        <h2>{tx("10. Pedidos de devolución en los primeros 30 días")}</h2>
        <p>{tx("Si no quedas satisfecho con tu sitio en los primeros 30 días desde el lanzamiento, te devolvemos tu pago más reciente completo. Aplica a los planes mensuales y a Own It. Debes pedirlo por escrito por texto, correo o Messenger dentro de esos 30 días. No cubre costos de terceros (renovación de dominio, fotos de stock, publicidad u otros servicios de terceros) que ya hayamos pagado.")}</p>
      </div></section>
    </>
  );
}

function Privacy({ locale, tx, href, lang }: { locale: Locale; tx: (s: string) => string; href: (p: string) => string; lang: string }) {
  return (
    <>
      <ContentSchema path={href("/privacy")} title={tx(PAGE_META["/privacy"].title)} description={tx(PAGE_META["/privacy"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Privacidad"), path: href("/privacy") }]} inLanguage={lang} />
      <PageHero locale={locale} h1={tx("Política de privacidad")} mark={tx("privacidad")} sub={tx("Actualizada el 21 de octubre de 2026. Explica qué recoge este sitio y cómo lo usa Kinexis Digital.")} />
      <section className="section"><div className="container container--narrow prose">
        <h2>{tx("Qué recogemos")}</h2>
        <p>{tx("Si envías un formulario, recogemos lo que escribes: nombre, correo, teléfono, negocio o sitio, la página que quieres cambiar, tu mensaje y cualquier archivo. Si llamas o escribes, guardamos esa correspondencia para responder y hacer el trabajo.")}</p>
        <p>{tx("El sitio está en Cloudflare. Los registros del servidor pueden incluir tu IP, el navegador y las páginas que pides. Si la analítica está activa, puede registrar páginas visitadas, una ubicación general y el tipo de dispositivo. Puedes bloquear la analítica en el navegador.")}</p>
        <h2>{tx("Cómo lo usamos")}</h2>
        <p>{tx("Usamos esta información para contestarte, preparar una vista previa, prestar el plan que compras y enviarte mensajes de ese trabajo. No vendemos información personal.")}</p>
        <h2>{tx("Con quién la compartimos")}</h2>
        <p>{tx("Los proveedores de hosting, correo y formularios procesan los mensajes para que nos lleguen. Compartimos información cuando la ley lo exige. No vendemos ni rentamos listas de contacto.")}</p>
        <h2>{tx("Cuánto la guardamos")}</h2>
        <p>{tx("Guardamos los datos de una consulta el tiempo necesario para responder y para tener registro del trabajo que pediste. Puedes escribir a")} {SITE.email} {tx("y pedir que borremos una consulta que no forme parte de un plan activo.")}</p>
        <h2>{tx("Contacto")}</h2>
        <p>{tx("Dudas sobre esta política: escribe a")} <a href={`mailto:${SITE.email}`}>{SITE.email}</a> {tx("o llama al")} <a href={telHref(SITE.phone)}>{SITE.phone}</a>.</p>
      </div></section>
    </>
  );
}

function Update({ locale, tx, href, lang }: { locale: Locale; tx: (s: string) => string; href: (p: string) => string; lang: string }) {
  return (
    <>
      <ContentSchema path={href("/update")} title={tx(PAGE_META["/update"].title)} description={tx(PAGE_META["/update"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Cambios"), path: href("/update") }]} inLanguage={lang} />
      <PageHero locale={locale} h1={tx("Pide un cambio en el sitio")} mark={tx("cambio")} sub={tx("Dinos la página y el cambio. Los cambios chicos se hacen uno a la vez, dentro del tiempo de tu plan.")} />
      <Section narrow><Form button={tx("Enviar solicitud")} note={tx("Website: dos días hábiles. Lead System: un día hábil. Plus: el mismo día hábil si lo pides antes del mediodía, hora del Centro.")} fields={[{ label: tx("Tu nombre"), name: "name", required: true, auto: "name" }, { label: tx("Correo"), name: "email", kind: "email", required: true, auto: "email" }, { label: tx("URL de la página"), name: "page", kind: "url" }, { label: tx("¿Qué debemos cambiar?"), name: "request", kind: "textarea", required: true }, { label: tx("Adjuntar un archivo (opcional)"), name: "file", kind: "file" }]} /></Section>
    </>
  );
}

function Portfolio({ locale, tx, href, lang, band }: PageBits) {
  return (
    <>
      <ContentSchema path={href("/portfolio")} title={tx(PAGE_META["/portfolio"].title)} description={tx(PAGE_META["/portfolio"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Portafolio"), path: href("/portfolio") }]} inLanguage={lang} />
      <PageHero locale={locale} className="portfolio-hero" eyebrow={tx("Sitios para negocios de servicios")} h1={tx("Mira nuestros diseños")} mark={tx("nuestros diseños")} sub={tx("Los sitios reales de clientes aparecen primero. Más abajo mira nuestro trabajo y personalizamos una dirección para tu negocio, desde la primera pantalla hasta la cotización.")} image="portfolio" imageAlt={tx("Sitios de negocios en pantallas")}>
        <div className="btn-row spaced"><Link className="btn btn--primary btn--lg" href={href("/contact")} prefetch={false}>{tx("Ver primero mi página de inicio")}</Link><Link className="btn btn--ghost btn--lg" href={href("/pricing")} prefetch={false}>{tx("Ver los cuatro planes")}</Link></div>
      </PageHero>
      <Section>
        <div className="container">
          <div className="showcase__head"><div><p className="eyebrow">{tx("Sitios en vivo")}</p><h2><HL text={tx("Sitios de clientes")} mark={tx("clientes")} /></h2></div></div>
          <div className="portfolio--live">{LIVE_SITES.map((site) => {
            const shot = portfolioFile(site.image, 640);
            let host = site.url;
            try { host = new URL(site.url).host.replace(/^www\./, ""); } catch { /* keep url */ }
            return (
              <a key={site.slug} className="live-site" href={site.url} target="_blank" rel="noopener noreferrer">
                <div className="shot" data-name={site.name}><div className="shot__page"><div className="shot__track"><DeferredImg src={shot} sizes="(max-width: 960px) 92vw, 380px" alt="" width={640} height={Math.round((site.height * 640) / site.width)} className="shot__img" /></div></div><span className="btn btn--primary shot__cta-overlay" aria-hidden="true">{tx("Visitar sitio")}</span></div>
                <span className="live-site__copy"><span className="live-site__status"><span className="live-site__dot" aria-hidden="true" />{tx("En vivo")}</span><span className="live-site__id"><span className="live-site__name">{site.name}</span><span className="live-site__meta"><span>{site.trade}</span><span className="live-site__host">{host}</span></span></span></span>
              </a>
            );
          })}</div>
          <div className="showcase__head showcase__head--follow"><div><p className="eyebrow">{tx("Elige tu diseño inicial")}</p><h2><HL text={tx("Sitios hechos para tu negocio")} mark={tx("tu negocio")} /></h2><p className="muted">{tx("Elige un diseño que te guste y personalizamos el contenido, los servicios y las llamadas a la acción para tu negocio. Pasa el cursor o toca para ver el sitio completo en inglés.")}</p></div></div>
          <div className="portfolio portfolio--main">{PROJECTS.map((project) => (
            <article key={project.slug} className="work-card">
              <ProjectCard project={project} href={project.placeholder ? undefined : `/portfolio/${project.slug}`} hrefLang="en-US" label={tx(`Ver ${project.name}`)} ctaLabel={tx("Ver este proyecto")} scrollOnHover={false} />
              <div className="work-card__meta">
                <h3>{project.trade}</h3>
                <p className="muted small">{project.name}</p>
                {!project.placeholder && (
                  <Link className="btn btn--ghost btn--sm" href={`/portfolio/${project.slug}`} hrefLang="en-US" prefetch={false}>{tx("Ver este proyecto")}</Link>
                )}
              </div>
            </article>
          ))}</div>
        </div>
      </Section>
      <AuditCta eyebrow={tx("Un punto de partida claro")} heading={tx("Descubre qué está frenando tu sitio")} mark={tx("frenando tu sitio")} text={tx("Te decimos qué funciona, qué estorba y qué cambios conviene hacer primero. Hay revisiones gratis y de pago.")} cta={tx("Revisar mi sitio")} href={href("/audit")} alt={tx("Un cohete sale de una computadora")} />
      <CtaBand h={tx("¿Quieres ver una idea para tu sitio?")} mark={tx("tu sitio")} sub={tx("Cuéntanos sobre tu negocio y preparamos una vista previa gratis para tu negocio.")} btn={tx("Quiero la vista previa")} href={href("/contact")} {...band} />
    </>
  );
}
