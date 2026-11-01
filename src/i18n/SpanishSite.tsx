import Link from "next/link";
import GuaranteeBadge from "@/components/GuaranteeBadge";
import MobilePlanComparison from "@/components/MobilePlanComparison";
import SpanishPlanSticker, { SPANISH_PLAN_STICKERS } from "@/components/SpanishPlanSticker";
import { notFound } from "next/navigation";
import { getIndustry, relatedIndustries, type FeatureKey } from "@/data/industries";
import { getProject, portfolioFile, PROJECTS } from "@/data/portfolio";
import { LIVE_SITES } from "@/data/liveSites";
import { PLANS, POSTS } from "@/lib/content";
import { PAGES } from "@/lib/pages";
import { esPost } from "@/i18n/posts-es";
import { localizedIndustries, localizeIndustry } from "@/i18n/industries-es";
import { contentLanguage, pathFromSlug, spainize, spainizeData, withLocale, type Locale } from "@/lib/i18n";
import { BLOG_IMAGE_WIDTHS, imageSrcSet, imageVariant } from "@/lib/image-sources";
import { contentMetadata } from "@/lib/seo";
import { kitSrc, SITE, telHref } from "@/lib/site";
import AuditCta from "@/components/AuditCta";
import BookingCalendar, { type BookingCopy } from "@/components/BookingCalendar";
import { DeferredImg } from "@/components/DeferredImg";
import { OpenDialog } from "@/components/DialogHost";
import { FacebookReviewCard, LeaveFacebookReview } from "@/components/FacebookReviews";
import Filterable from "@/components/Filterable";
import Form from "@/components/Form";
import { getFacebookReviews } from "@/lib/facebook";
import { ReasonBoard, ReviewRail } from "@/components/HomeBands";
import IndustryAudit from "@/components/IndustryAudit";
import IndustryGrid from "@/components/IndustryGrid";
import { ArticleSchema, ContentSchema } from "@/components/JsonLd";
import PlanOffer from "@/components/PlanOffer";
import ProjectCard from "@/components/ProjectCard";
import { ShotFrame } from "@/components/ShotFrame";
import Stepper, { type Step } from "@/components/Stepper";
import { Compare, CtaBand, Faq, HL, Icon, IconCard, Illustration, MediaSplit, PageHero, Section, ServiceCard, Shots } from "@/components/ui";
import HeroFilm from "@/components/HeroFilm";

const HERO_TRACK: Record<string, { mobile?: string; desktop?: string }> = {
  painting: { mobile: "-0.015em" },
  "pressure-washing": { desktop: "-0.03em" },
  "yard-care": { desktop: "-0.03em" },
};

type Meta = { title: string; description: string; absolute?: boolean; image?: string; article?: boolean; date?: string; section?: string };

const PAGE_META: Record<string, Meta> = {
  "/": { title: "Diseño web profesional para negocios | Kinexis Digital", absolute: true, description: "Kinexis Digital crea sitios web rápidos y profesionales para negocios en EE. UU. Mira una página de inicio gratis antes de elegir un plan." },
  "/services": { title: "Diseño web, SEO y mantenimiento", description: "Explora diseño web profesional, SEO, mantenimiento y auditorías gratuitas para negocios en Estados Unidos, con apoyo claro." },
  "/web-design": { title: "Diseño web profesional para negocios", description: "Obtén un sitio web rápido y profesional creado según tu marca, servicios y objetivos. Revisa la página de inicio antes de pagar." },
  "/seo-services": { title: "SEO para sitios web de negocios", description: "Mejora la visibilidad de tu sitio con SEO técnico, optimización de páginas, contenido útil e informes claros para atraer clientes." },
  "/audit": { title: "Auditoría web gratis de SEO, velocidad y UX", description: "Recibe una auditoría web gratuita de SEO, velocidad, uso en celular, indexación y conversión, con mejoras recomendadas." },
  "/contact": { title: "Hablemos de tu proyecto web", description: "Contacta a Kinexis Digital para hablar de un sitio nuevo, rediseño, SEO o mantenimiento web para tu negocio y recibe orientación clara." },
  "/website-management": { title: "Administración y mantenimiento web", description: "Mantén tu sitio seguro, actualizado y respaldado con hosting administrado, copias de seguridad, cambios pequeños y soporte directo." },
  "/about": { title: "Conoce nuestra agencia de diseño web", description: "Conoce cómo Kinexis Digital planifica, diseña, lanza y mantiene sitios web profesionales para negocios en Estados Unidos." },
  "/portfolio": { title: "Portafolio y plantillas de diseño web", description: "Explora plantillas profesionales y sitios reales de clientes de Kinexis para elegir la dirección visual de tu sitio web." },
  "/industries": { title: "Diseño web para industrias de servicios", description: "Explora ideas de diseño web para plomería, HVAC, electricidad, techos, jardinería y otras industrias de servicios para atraer clientes locales." },
  "/reviews": { title: "Lo que cuentan los clientes de Kinexis", description: "Lee recomendaciones publicadas por clientes en Facebook. El texto de cada reseña se muestra tal como fue escrito y conoce nuestro trabajo." },
  "/upgrades": { title: "Extras y mejoras para sitios web", description: "Agrega páginas, mantenimiento continuo u otras mejoras cuando tu sitio web y tu negocio las necesiten, sin complicar tu operación." },
  "/pricing": { title: "Planes y precios de diseño web", description: "Compara Website $97/mes, Lead System $197/mes, Plus $297/mes y Own It $1,497. Todos empiezan con vista previa gratis para decidir." },
  "/blog": { title: "Recursos de diseño web y SEO", description: "Lee guías prácticas sobre diseño web, SEO, rendimiento, reseñas y marketing digital para negocios en crecimiento, aplicables a tu negocio." },
  "/faqs": { title: "Preguntas frecuentes de diseño web", description: "Respuestas sobre precios, cobro, propiedad del sitio, lanzamiento, SEO, fotos, redacción y mantenimiento web para decidir con claridad." },
  "/update": { title: "Solicita una actualización del sitio", description: "Indica qué página necesita un cambio y adjunta cualquier archivo útil. Atendemos cada solicitud según el alcance de tu plan." },
  "/strategy-call": { title: "Agenda una llamada de estrategia web", description: "Elige un horario para revisar tu sitio actual, tus objetivos y el plan de diseño web que mejor se adapte a tu negocio y recibe una recomendación." },
  "/terms": { title: "Términos de planes y cobro de Kinexis", description: "Consulta los términos actuales de planes, cobro, cancelación, propiedad, mensajes y la garantía de leads de 60 días." },
  "/privacy": { title: "Cómo cuida Kinexis tu información", description: "Lee qué recoge Kinexis de formularios, llamadas, correo, registros y analítica, además de cómo usa y comparte esos datos." },
};

export function spanishMetadata(locale: Locale, slug?: string[]) {
  const en = pathFromSlug(slug);
  const localized = metaFor(en, locale);
  if (!localized) return { title: "Página no encontrada", robots: { index: false, follow: false } };
  const page = Object.values(PAGES).find((candidate) => candidate.path === en);
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
    index: page?.indexable ?? true,
  });
}

function metaFor(en: string, locale: Locale): Meta | undefined {
  if (en.startsWith("/industries/") && en !== "/industries") {
    const industry = getIndustry(en.split("/")[2] ?? "");
    if (!industry) return undefined;
    const copy = localizeIndustry(industry, locale);
    return { title: copy.metaTitle, description: copy.metaDescription };
  }
  if (en.startsWith("/blog/") && en !== "/blog") {
    const post = esPost(en.split("/")[2] ?? "");
    const source = POSTS.find((item) => item.slug === post?.slug);
    if (!post || !source) return undefined;
    const text = locale === "es-ES" ? spainizeData(post) : post;
    return { title: text.seoTitle, description: text.excerpt, article: true, image: source.image, date: source.date, section: text.category };
  }
  const page = PAGE_META[en];
  if (!page) return undefined;
  return locale === "es-ES" ? spainizeData(page) : page;
}

function L(locale: Locale, path: string) {
  return withLocale(locale, path);
}

export async function SpanishPage({ locale, slug }: { locale: Exclude<Locale, "en">; slug?: string[] }) {
  const en = pathFromSlug(slug);
  const tx = (text: string) => (locale === "es-ES" ? spainize(text) : text);
  const lang = contentLanguage(locale);
  if (en.startsWith("/industries/") && en !== "/industries") return <IndustryView locale={locale} slug={en.split("/")[2] ?? ""} tx={tx} lang={lang} />;
  if (en.startsWith("/blog/") && en !== "/blog") return <PostView locale={locale} slug={en.split("/")[2] ?? ""} lang={lang} />;
  if (!PAGE_META[en]) notFound();
  const href = (path: string) => L(locale, path);
  const band = { secondary: tx("Hablar de tus opciones"), secondaryHref: href("/strategy-call") };

  if (en === "/") return <Home locale={locale} tx={tx} href={href} lang={lang} />;
  if (en === "/services") return <Services tx={tx} href={href} lang={lang} band={band} />;
  if (en === "/web-design") return <WebDesign locale={locale} tx={tx} href={href} lang={lang} band={band} />;
  if (en === "/seo-services") return <Seo tx={tx} href={href} lang={lang} band={band} />;
  if (en === "/pricing") return <Pricing tx={tx} href={href} lang={lang} />;
  if (en === "/about") return <About tx={tx} href={href} lang={lang} />;
  if (en === "/contact") return <Contact tx={tx} href={href} lang={lang} />;
  if (en === "/audit") return <Audit tx={tx} href={href} lang={lang} />;
  if (en === "/industries") return <Industries locale={locale} tx={tx} href={href} lang={lang} band={band} />;
  if (en === "/faqs") return <Faqs tx={tx} href={href} lang={lang} band={band} />;
  if (en === "/blog") return <Blog tx={tx} href={href} lang={lang} band={band} />;
  if (en === "/website-management") return <Care tx={tx} href={href} lang={lang} band={band} />;
  if (en === "/reviews") return <Reviews locale={locale} tx={tx} href={href} lang={lang} band={band} />;
  if (en === "/upgrades") return <Upgrades tx={tx} href={href} lang={lang} band={band} />;
  if (en === "/strategy-call") return <Strategy locale={locale} tx={tx} href={href} lang={lang} />;
  if (en === "/terms") return <Terms tx={tx} href={href} lang={lang} />;
  if (en === "/privacy") return <Privacy tx={tx} href={href} lang={lang} />;
  if (en === "/update") return <Update tx={tx} href={href} lang={lang} />;
  if (en === "/portfolio") return <Portfolio tx={tx} href={href} lang={lang} band={band} />;
  notFound();
}

function Home({ locale, tx, href, lang }: { locale: Locale; tx: (s: string) => string; href: (p: string) => string; lang: string }) {
  const faqs = homeFaqs(tx);
  const steps: Step[] = [
    { tab: "Preview", label: tx("Vista previa"), title: tx("Empieza con una vista previa"), text: tx("Preparamos un concepto de inicio para tu oficio. Lo revisas antes de pagar, sin tarjeta y sin obligación.") },
    { tab: "Plan", label: tx("Plan"), title: tx("Escoge el plan que te sirve"), text: tx("Elige Website, Lead System, Plus u Own It. Dejamos por escrito lo que incluye y la fecha de lanzamiento.") },
    { tab: "Build", label: tx("Construcción"), title: tx("Terminamos el sitio completo"), text: tx("Sumamos tus servicios, zona, fotos y texto, conectamos el dominio y te enviamos todo para aprobarlo.") },
    { tab: "Launch", label: tx("Lanzamiento"), title: tx("Publicamos tu sitio"), text: tx("El sitio queda en línea. Los textos y las reseñas empiezan tras la aprobación del operador, normalmente en 10 a 15 días.") },
    { tab: "Grow", label: tx("Crecer"), title: tx("Lo mantenemos vigente"), text: tx("Hacemos cambios, registramos llamadas y formularios, y enviamos la solicitud de reseña después de cada trabajo.") },
  ];
  return (
    <>
      <ContentSchema path={href("/")} title={tx(PAGE_META["/"].title)} description={tx(PAGE_META["/"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }]} faqs={faqs} inLanguage={lang} />
      <section className="hero hero--fit"><div className="container hero__inner">
        <div className="hero__text">
          <p className="eyebrow">{tx("Sitios y SEO, en todo el país")}</p>
          <h1><HL text={tx("Sitios que convierten búsquedas en trabajo agendado")} mark={tx("trabajo agendado")} /></h1>
          <ul className="ticks">
            <li><span className="tick__mark" aria-hidden="true">✓</span><span className="tick__copy"><span><b>{tx("Ves tu inicio gratis")}</b> – {tx("sin tarjeta")}</span><span>{tx("y sin obligación antes de pagar")}</span></span></li>
            <li><span className="tick__mark" aria-hidden="true">✓</span><span className="tick__copy"><span><b>{tx("Atrapas las llamadas que pierdes")}</b></span><span>{tx("texto automático desde el celular y seguimiento")}</span></span></li>
            <li><span className="tick__mark" aria-hidden="true">✓</span><span className="tick__copy"><span><b>{tx("Tu reputación en Google")}</b></span><span>{tx("pedidos de reseña enviados por ti, no dejados al azar")}</span></span></li>
          </ul>
          <div className="hero__btns">
            <Link className="btn btn--primary btn--lg" href={href("/audit")} prefetch={false}>{tx("Revisar mi sitio gratis")}</Link>
            <Link className="btn btn--ghost btn--lg" href={href("/pricing")} prefetch={false}>{tx("Ver planes y precios")}</Link>
            <OpenDialog id="guarantee" className="link-btn">{tx("Garantía de 60 días")}</OpenDialog>
          </div>
        </div>
        <HeroFilm />
      </div></section>
      <Section tint>
        <MediaSplit image="homepage" alt={tx("Un oficio mostrando su sitio en una computadora y un celular")}>
          <h2><HL text={tx("Lo que recibes con Kinexis")} mark={tx("con Kinexis")} /></h2>
          <p>{tx("Un sitio rápido, SEO práctico y seguimiento que sigue trabajando cuando tú estás ocupado. Hay planes desde $97 al mes.")}</p>
        </MediaSplit>
        <div className="grid grid--3">
          <IconCard title={<>{tx("Un sitio que")}<br />{tx("facilita recibir")}<br />{tx("llamadas")}</>} iconAlt={tx("Un sitio que facilita recibir llamadas")} text={tx("Carga rápido, explica tus servicios y facilita que cada visita llame o pida una cotización.")} icon="better-design" />
          <IconCard title={<>{tx("Seguimiento que")}<br />{tx("funciona mientras")}<br />{tx("estás trabajando")}</>} iconAlt={tx("Seguimiento que funciona mientras estás trabajando")} text={tx("Quien llama recibe un texto, los clientes reciben la solicitud de reseña y cada lead queda registrado.")} icon="better-follow-up" />
          <IconCard title={<>{tx("Precios claros")}<br />{tx("desde el")}<br />{tx("principio")}</>} iconAlt={tx("Precios claros desde el principio")} text={tx("Elige entre cuatro planes desde $97 al mes, con vista previa gratis, $0 de enganche y un mínimo de 3 meses.")} icon="better-pricing" />
        </div>
      </Section>
      <Section>
        <h2><HL text={tx("Sitios hechos para tu oficio")} mark={tx("tu oficio")} /></h2>
        <p className="muted">{tx("Elige una plantilla web que te guste y la personalizamos para tu negocio. Pasa el cursor para verla y abre el diseño completo en inglés.")}</p>
        <div className="portfolio"><Shots n={8} mode="link" hrefLang="en-US" labelFor={(name) => tx(`Ver ${name}`)} /></div>
        <p className="center"><Link className="btn btn--primary" href={href("/portfolio")} prefetch={false}>{tx("Ver el portafolio")}</Link></p>
      </Section>
      <Section tint>
        <h2 className="center"><HL text={tx("Por qué los negocios eligen Kinexis")} mark={tx("eligen Kinexis")} /></h2>
        <Compare rows={[[tx("Vista previa gratis antes de pagar"), false, false], [tx("Texto si no contestas y pedidos de reseña"), false, false], [tx("Hosting y cambios resueltos"), false, true], [tx("Mínimo de 3 meses, luego mes a mes"), true, false], [tx("Sitios en inglés y español"), false, true]]} freelancers={tx("Freelancers")} agencies={tx("Agencias")} label={tx("Comparación")} feature={tx("Función")} yesLabel={tx("Sí")} />
        <p className="center muted small">{tx("Son ofertas habituales; cada proveedor puede variar.")}</p>
      </Section>
      <Section>
        <p className="eyebrow center">{tx("Reseñas de Google, resueltas")}</p>
        <h2 className="center"><HL text={tx("Pídele reseña a cada cliente contento. En automático.")} mark={tx("En automático")} /></h2>
        <p className="center muted">{tx("Parte de Lead System. Después de cada trabajo sale un texto con el enlace a tu página de Google.")}</p>
        <ReviewRail steps={[{ n: "1", title: tx("Después de cada trabajo"), titleDisplay: <>{tx("Después de")}<br />{tx("cada trabajo")}</>, text: <>{tx("Sale un texto con el enlace")}<br />{tx("directo. No tienes que pedirlo")}<br />{tx("ni crear otra cuenta.")}</>, icon: "after-every-job" }, { n: "2", title: tx("Un toque a Google"), titleDisplay: <>{tx("Un toque")}<br />{tx("a Google")}</>, text: <>{tx("El enlace abre tu perfil")}<br />{tx("de Google y dejar la reseña")}<br />{tx("toma solo unos segundos.")}</>, icon: "one-tap-to-google" }, { n: "3", title: tx("Sin perseguir"), titleDisplay: <>{tx("Sin tener que")}<br />{tx("perseguir")}</>, text: <>{tx("El pedido sale por ti.")}<br />{tx("Las reseñas llegan al perfil")}<br />{tx("y respondes desde tu cuenta.")}</>, icon: "no-chasing" }]} />
      </Section>
      <Section tint>
        <h2 className="center"><HL text={tx("Lo que incluye cada sitio de Kinexis")} mark={tx("sitio de Kinexis")} /></h2>
        <ReasonBoard reasons={[{ title: tx("Se ve bien en cada pantalla"), text: tx("Un diseño moderno y adaptable presenta bien tu negocio en celulares, tabletas y computadoras."), icon: "well-designed" }, { title: tx("Pensado para recibir llamadas"), text: tx("Cada página deja claro si el siguiente paso es llamar o enviar los datos del trabajo."), icon: "sales-focused" }, { title: tx("Fácil de leer para Google"), text: tx("Una estructura limpia, títulos útiles y páginas rápidas ayudan a que el buscador entienda el sitio."), icon: "search-optimized" }, { title: tx("El hosting y los cambios son nuestros"), text: tx("Administramos el hosting, los cambios de rutina, los respaldos y la seguridad sin devolverte ese trabajo."), icon: "hassle-free" }]} />
      </Section>
      <Section>
        <h2 className="center"><HL text={tx("Hecho para el oficio que sí manejas")} mark={tx("oficio que sí manejas")} /></h2>
        <p className="center muted">{tx("Los planes son los mismos. El sitio se escribe para las llamadas de ese oficio.")}</p>
        <IndustryGrid layout="index" industries={localizedIndustries(locale)} base={href("/industries")} />
      </Section>
      <Section id="plans"><PlanOffer heading={tx("Elige el punto de partida para tu sitio")} mark={tx("punto de partida")} href={href("/pricing")} eyebrow={tx("Cuatro planes · Una vista previa gratis")} chip={tx("$0 de enganche")} note={tx("Cada plan empieza con una vista previa del inicio, sin tarjeta y sin obligación.")} badge={tx("El más elegido")} cta={tx("Ver los cuatro planes")} plans={spanishPlans(tx)} /></Section>
      <Section tint>
        <h2 className="center"><HL text={tx("De la vista previa al lanzamiento")} mark={tx("al lanzamiento")} /></h2>
        <Stepper steps={steps} />
      </Section>
      <Section narrow>
        <h2 className="center"><HL text={tx("Preguntas frecuentes")} mark={tx("Preguntas")} /></h2>
        <Faq items={faqs} />
      </Section>
    </>
  );
}

function homeFaqs(tx: (s: string) => string) {
  return [
    { q: tx("¿Esto sirve para mi tipo de negocio?"), a: tx("Trabajamos con oficios y negocios de servicios en Estados Unidos, como plomería, HVAC, electricidad, jardinería, techos y remodelación. Si la gente busca tu servicio y llama cuando necesita ayuda, estos planes están pensados para ese tipo de negocio.") },
    { q: tx("¿Cuánto cuesta?"), a: tx("Hay cuatro opciones: Website a $97 al mes, Lead System a $197, Plus a $297, u Own It por un solo pago de $1,497. Puedes ver una página de inicio gratis antes de elegir, sin tarjeta y sin obligación.") },
    { q: tx("¿Cómo se cobra?"), a: tx("Los planes mensuales tienen $0 de enganche y un mínimo de 3 meses desde el lanzamiento. Después siguen mes a mes y el precio queda fijo durante 24 meses. Own It es un solo pago, sin mensualidad ni mínimo.") },
    { q: tx("¿Quién es dueño del sitio?"), a: tx("Con Own It, los archivos son tuyos desde el día del lanzamiento. En los planes mensuales, Kinexis hospeda y administra el sitio mientras el plan esté activo. Si luego quieres llevártelo, pide por escrito las condiciones de compra.") },
    { q: tx("¿Qué cubre la garantía de 60 días?"), a: tx("Lead System y Plus incluyen la garantía de 60 días. Si recibes cero leads rastreados durante los primeros 60 días en vivo, condonamos el tercer y cuarto cargo y quitamos el mínimo. Se limita a una garantía por negocio y Own It no está incluido.") },
    { q: tx("¿Cuándo estará en línea mi sitio?"), a: tx("Empezamos con la vista previa gratis. Cuando la apruebas y recibimos el contenido necesario, confirmamos por escrito la fecha de lanzamiento. Los textos empiezan tras la aprobación del operador, que suele tardar de 10 a 15 días.") },
    { q: tx("¿Google podrá encontrar mi sitio?"), a: tx("Cada sitio tiene una estructura limpia, páginas rápidas y la configuración básica que Google necesita para leerlo. El SEO continuo no está incluido en los cuatro planes, pero podemos cotizarlo aparte.") },
    { q: tx("¿Qué pasa con las fotos y el video?"), a: tx("Podemos trabajar con tus propias fotos o cotizar fotografía y video por separado. No mostramos trabajos ajenos de una biblioteca de imágenes como si fueran tuyos.") },
    { q: tx("¿Quién escribe el texto?"), a: tx("Podemos usar el texto que ya tienes o cotizar la redacción aparte. Para la vista previa usamos un texto realista de tu oficio, así puedes evaluar el diseño antes de decidir.") },
  ];
}

function spanishPlans(tx: (s: string) => string) {
  const names: Record<string, string> = {
    website: "Sitio web",
    "lead-system": "Sistema de clientes",
    plus: "Plus (Bilingüe)",
    "own-it": "Hazlo tuyo",
  };
  const copy: Record<string, { tagline: string; kicker: string; note: string; features: [string, string][] }> = {
    website: { tagline: tx("Una casa profesional para tu negocio."), kicker: tx("$0 de enganche, luego"), note: tx("Mínimo de 3 meses, luego mes a mes"), features: [[tx("Sitio para celular"), tx("Hasta 5 páginas")], [tx("Hosting + SSL"), tx("Seguridad y respaldos")], [tx("Cambios chicos*"), tx("Hasta 2 al mes, en 2 días hábiles")], [tx("Leads de formulario"), tx("Sabes cuándo llega una cotización")], [tx("Páginas nuevas"), tx("$99 cada una")]] },
    "lead-system": { tagline: tx("Tu sitio y las herramientas que traen llamadas."), kicker: tx("$0 de enganche, luego"), note: tx("Mínimo de 3 meses, luego mes a mes"), features: [[tx("Sitio para celular"), tx("Hasta 10 páginas, hosting y respaldos")], [tx("Texto si no contestas**"), tx("En tu número de seguimiento")], [tx("Reseñas de Google"), tx("Después de cada trabajo")], [tx("Ajuste del perfil"), tx("En el lanzamiento")], [tx("Llamadas y reporte"), tx("Un reporte al mes")], [tx("Cambios chicos sin tope*"), tx("En 1 día hábil")], [tx("Páginas nuevas"), tx("1 al mes incluida")]] },
    plus: { tagline: tx("Llega a clientes en inglés y en español."), kicker: tx("$0 de enganche, luego"), note: tx("Mínimo de 3 meses, luego mes a mes"), features: [[tx("Sitio bilingüe"), tx("Hasta 20 páginas, inglés y español")], [tx("Texto si no contestas**"), tx("Inglés y español")], [tx("Reseñas de Google"), tx("Inglés y español")], [tx("Ajuste del perfil"), tx("+ 2 publicaciones al mes")], [tx("Llamadas y reporte"), tx("Un reporte al mes")], [tx("Cambios chicos sin tope*"), tx("El mismo día hábil si pides antes del mediodía CT")], [tx("Páginas nuevas"), tx("2 al mes incluidas")]] },
    "own-it": { tagline: tx("Un pago. Un sitio que es tuyo."), kicker: tx("Un pago"), note: tx("Se paga al aprobar la vista previa · sin mínimo · sin garantía de leads"), features: [[tx("Sitio para celular"), tx("Hasta 10 páginas")], [tx("Archivos tuyos"), tx("Desde el lanzamiento")], [tx("Hosting + SSL"), tx("12 meses incluidos")], [tx("Cambios chicos*"), tx("12 meses, hasta 30 min al mes")], [tx("Dominio"), tx("El primer año incluido")], [tx("Sin mínimo"), tx("Sin plan mensual")]] },
  };
  return PLANS.map((plan) => ({
    ...plan,
    ...copy[plan.slug],
    name: names[plan.slug],
    cta: names[plan.slug],
    suffix: plan.suffix === "/mo" ? tx("/mes") : plan.suffix === "one-time" ? tx("una vez") : plan.suffix,
  }));
}

function Services({ tx, href, lang, band }: PageBits) {
  const items = [
    [tx("Diseño web"), tx("Un sitio claro para el trabajo que quieres, con llamada desde el celular, formularios cortos y una vista previa antes de pagar."), "/web-design", tx("Ver diseño web"), "well-designed"],
    [tx("SEO"), tx("Mejoras técnicas, títulos útiles y contenido que ayuda a que los clientes correctos te encuentren en Google."), "/seo-services", tx("Ver SEO"), "search-optimized"],
    [tx("Mantenimiento"), tx("Hosting, cambios y respaldos resueltos, con una persona disponible cuando algo necesita actualizarse."), "/website-management", tx("Ver el cuidado"), "managed-for-you"],
    [tx("Revisión gratis"), tx("Una revisión práctica de velocidad, indexación, títulos y qué tan fácil es ponerse en contacto contigo."), "/audit", tx("Revisar mi sitio"), "preview"],
  ] as const;
  return (
    <>
      <ContentSchema path={href("/services")} title={tx(PAGE_META["/services"].title)} description={tx(PAGE_META["/services"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Servicios"), path: href("/services") }]} inLanguage={lang} />
      <PageHero h1={tx("Ayuda web para negocios de servicios")} mark={tx("negocios de servicios")} sub={tx("Elige diseño web, SEO, cuidado continuo o una revisión gratis del sitio que ya tienes.")} image="homepage" imageAlt={tx("Sitio de un oficio en una computadora y un celular")} />
      <Section><div className="grid grid--2">{items.map(([title, text, path, cta, icon]) => <ServiceCard key={path} title={title} text={text} href={href(path)} cta={cta} icon={icon} />)}</div></Section>
      <CtaBand h={tx("¿No sabes por dónde empezar?")} mark={tx("por dónde empezar")} sub={tx("Podemos revisar tu sitio actual o hablar del que quieres construir.")} btn={tx("Escríbenos")} href={href("/contact")} {...band} />
    </>
  );
}

type PageBits = { tx: (s: string) => string; href: (p: string) => string; lang: string; band: { secondary: string; secondaryHref: string } };

function WebDesign({ locale, tx, href, lang, band }: PageBits & { locale: Locale }) {
  const faqs = [
    { q: tx("¿Pueden construir para mi zona?"), a: tx("Sí. Trabajamos con negocios de servicios en Estados Unidos y nombramos las ciudades que de verdad atiendes. No hacemos una copia de la misma página para cada ciudad.") },
    { q: tx("¿Qué páginas y funciones voy a recibir?"), a: tx("El sitio incluye inicio, páginas para los servicios que quieres promover y una forma sencilla de llamar o cotizar. También lleva títulos claros, encabezados ordenados, páginas rápidas y una estructura que Google puede leer. Ves el inicio antes de pagar.") },
    { q: tx("¿El plan cubre SEO continuo?"), a: tx("El sitio queda preparado para que los buscadores lo lean. El trabajo mensual de SEO se cotiza aparte y no forma parte de los cuatro planes.") },
    { q: tx("¿Cuáles son los precios?"), a: tx("Website cuesta $97 al mes, Lead System $197, Plus $297 y Own It $1,497 en un solo pago. Todos empiezan con una vista previa gratis, sin tarjeta y sin obligación.") },
  ];
  return (
    <>
      <ContentSchema path={href("/web-design")} title={tx(PAGE_META["/web-design"].title)} description={tx(PAGE_META["/web-design"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Diseño web"), path: href("/web-design") }]} faqs={faqs} serviceType={tx("Diseño web")} inLanguage={lang} />
      <PageHero eyebrow={tx("Diseño web")} h1={tx("Sitios pensados para el trabajo que haces")} mark={tx("trabajo que haces")} sub={tx("Para plomería, HVAC, electricidad, techos y otros oficios donde el teléfono importa. Ves el inicio antes de pagar.")} image="web-design" imageAlt={tx("Diseño web en un monitor y un celular")} />
      <Section>
        <h2 className="center"><HL text={tx("Lo que tu sitio debe hacer")} mark={tx("debe hacer")} /></h2>
        <div className="grid grid--3">
          <IconCard title={tx("Mostrar el trabajo que quieres")} text={tx("Cada servicio tiene su espacio, para que una reparación y un proyecto grande no compitan por atención.")} icon="built-for-your-trade" />
          <IconCard title={tx("Hacer sencillo el contacto")} text={tx("El número es fácil de tocar y los formularios son cortos. Lead System y Plus también pueden escribir a quien llamó.")} icon="made-for-calls" />
          <IconCard title={tx("Ordenar la información para Google")} text={tx("Títulos útiles, encabezados claros, páginas rápidas y un mapa ayudan al buscador a entender lo que ofreces.")} icon="search-optimized" />
          <IconCard title={tx("Cargar rápido en el celular")} text={tx("El cliente puede buscar desde la entrada o la cocina. La página debe abrir rápido y mostrar el siguiente paso.")} icon="fast-and-secure" />
          <IconCard title={tx("Decir dónde trabajas")} text={tx("Nombramos las ciudades que sí cubres en una página útil, sin copiar el mismo texto para cada pueblo.")} icon="location" />
          <IconCard title={tx("Revisar el inicio primero")} text={tx("Preparamos la página de inicio antes de cobrar una tarjeta. La revisas, pides cambios y luego eliges el plan.")} icon="preview" />
        </div>
      </Section>
      <Section><h2 className="center"><HL text={tx("Elige tu oficio")} mark={tx("tu oficio")} /></h2><IndustryGrid layout="index" industries={localizedIndustries(locale)} base={href("/industries")} /></Section>
      <Section narrow><h2 className="center"><HL text={tx("Preguntas sobre tu sitio")} mark={tx("tu sitio")} /></h2><Faq items={faqs} /></Section>
      <CtaBand h={tx("Mira el inicio antes de decidir")} mark={tx("antes de decidir")} sub={tx("Cuéntanos sobre el oficio y preparamos una vista previa. Sin tarjeta ni obligación.")} btn={tx("Revisar mi sitio")} href={href("/audit")} {...band} />
    </>
  );
}

function Seo({ tx, href, lang, band }: PageBits) {
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
      <PageHero h1={tx("SEO para que te encuentre la gente correcta")} mark={tx("gente correcta")} sub={tx("Mejoramos la parte técnica, las páginas y el contenido que ayudan a descubrir tu negocio en Google.")} image="local-seo" imageAlt={tx("Pines de mapa y un panel de búsqueda")} />
      <Section>
        <div className="grid grid--3">
          <IconCard title={tx("Base técnica")} text={tx("Revisamos rastreo, indexación, velocidad, celular, mapa del sitio y datos estructurados.")} icon="technical-seo" />
          <IconCard title={tx("Mejoras en cada página")} text={tx("Ajustamos títulos, descripciones, encabezados y enlaces según la forma en que buscan tus clientes.")} icon="on-page-optimization" />
          <IconCard title={tx("Búsquedas reales")} text={tx("Buscamos demanda e intención útiles y conectamos cada búsqueda con la página que puede responderla.")} icon="keyword-research" />
          <IconCard title={tx("Contenido útil")} text={tx("Planeamos servicios y artículos que responden dudas reales, sin agregar texto solo para llenar espacio.")} icon="content-strategy" />
          <IconCard title={tx("Alcance local o nacional")} text={tx("El trabajo puede enfocarse en tu zona, en búsquedas nacionales o en una mezcla razonable de ambas.")} icon="local-seo" />
          <IconCard title={tx("Informes fáciles de leer")} text={tx("Ves impresiones, clics, posiciones y leads de Search Console y analítica en un informe claro.")} icon="reporting" />
        </div>
      </Section>
      <Section tint narrow>
        <p>{tx("Trabajamos con negocios de servicios en Estados Unidos, cubras una ciudad o una zona más amplia. Primero va la base: un sitio rápido, rastreable, con títulos claros y contenido útil. Nadie puede garantizar posiciones.")}</p>
      </Section>
      <Section narrow><Faq items={faqs} /></Section>
      <CtaBand h={tx("¿Quieres saber qué ve Google?")} mark={tx("qué ve Google")} sub={tx("Empieza con una revisión gratis del sitio y su configuración de búsqueda.")} btn={tx("Revisar mi sitio")} href={href("/audit")} {...band} />
    </>
  );
}

function Pricing({ tx, href, lang }: { tx: (s: string) => string; href: (p: string) => string; lang: string }) {
  const plans = spanishPlans(tx);
  const faqs = homeFaqs(tx);
  const table = [
    { group: tx("El sitio"), rows: [[tx("Páginas incluidas"), tx("Hasta 5"), tx("Hasta 10"), tx("Hasta 20"), tx("Hasta 10")], [tx("Hosting, SSL, respaldos"), tx("Incluido"), tx("Incluido"), tx("Incluido"), tx("12 meses")], [tx("Cambios chicos"), tx("2 / mes, 2 días"), tx("Sin tope, 1 día"), tx("Sin tope, el mismo día"), tx("30 min / mes")], [tx("Páginas nuevas"), "$99", tx("1 / mes"), tx("2 / mes"), tx("Cotizado")], [tx("Los archivos son tuyos"), "—", "—", "—", tx("Sí")]] },
    { group: tx("Seguimiento"), rows: [[tx("Texto si no contestas"), "—", tx("Sí"), tx("Inglés y español"), "—"], [tx("Reseñas de Google"), "—", tx("Después de cada trabajo"), tx("Inglés y español"), "—"], [tx("Perfil de Google"), "—", tx("Ajuste"), tx("Ajuste + 2 publicaciones"), "—"], [tx("Llamadas y reporte"), "—", tx("Mensual"), tx("Mensual"), "—"], [tx("Sitio bilingüe"), "—", "—", tx("Sí"), "—"]] },
    { group: tx("El acuerdo"), rows: [[tx("Garantía de 60 días"), "—", tx("Sí"), tx("Sí"), "—"], [tx("Mínimo"), tx("3 meses"), tx("3 meses"), tx("3 meses"), tx("Ninguno")], [tx("Precio fijo"), tx("24 meses"), tx("24 meses"), tx("24 meses"), tx("Un pago")], [tx("Precio"), "$97 / mes", "$197 / mes", "$297 / mes", "$1,497"]] },
  ];
  return (
    <>
      <ContentSchema path={href("/pricing")} title={tx(PAGE_META["/pricing"].title)} description={tx(PAGE_META["/pricing"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Precios"), path: href("/pricing") }]} faqs={faqs} serviceType={tx("Diseño web")} products={plans} inLanguage={lang} />
      <PageHero h1={tx("Elige el plan de sitio que te conviene")} mark={tx("te conviene")} sub={tx("Empieza con el sitio que necesita tu oficio y agrega el seguimiento que quieras. Todos los planes comienzan con una vista previa gratis.")} image="pricing" imageAlt={tx("Precios con una tarjeta y palomas")} />
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
                <SpanishPlanSticker slug={plan.slug} kind="offer" />
                <p className="plan__note">{plan.note}</p>
                {plan.guarantee && <p className="plan__guarantee">{tx("Incluye la garantía de 60 días")}</p>}
                <Link className="btn plan__cta btn--primary" href={`${href("/contact")}?plan=${plan.slug}`} prefetch={false}>{plan.cta}</Link>
              </div>
              <div className="plan__body">
                <p className="plan__includes">{tx("Qué incluye")}</p>
                <ul className="ticks">{plan.features.map(([title, detail]) => <li key={title}><b>{title}</b><span>{detail}</span></li>)}</ul>
              </div>
            </article>
          ))}
        </div>
        <p className="pay-bridge">{tx("¿Ya aprobaste la vista previa?")} <Link href="/pay" hrefLang="en-US" prefetch={false}>{tx("Seguir al pago")}</Link>. {tx("La caja está en inglés.")}</p>
        <div className="guarantee-band">
          <GuaranteeBadge alt={tx("Garantía de leads rastreados de 60 días")} />
          <div>
            <h3><HL text={tx("¿Cero leads rastreados en 60 días? Condonamos dos cargos.")} mark={tx("dos cargos")} /></h3>
            <p>{tx("Si Lead System o Plus no produce leads rastreados en los primeros 60 días en vivo, se condonan el tercer y cuarto cargo y se quita el mínimo. Un lead rastreado es una llamada de 30 segundos o más, una respuesta al texto, o un formulario real. Una garantía por negocio.")}</p>
            <OpenDialog id="guarantee" className="link-btn">{tx("Leer la garantía")}</OpenDialog>
          </div>
        </div>
      </Section>
      <Section tint>
        <h2 className="center"><HL text={tx("Mira qué cubre cada plan")} mark={tx("cada plan")} /></h2>
        <MobilePlanComparison
          plans={plans.map((plan, index) => ({ ...plan, price: table[2].rows[3][index + 1], sticker: SPANISH_PLAN_STICKERS[plan.slug].name }))}
          sections={table}
          hint={tx("Toca un plan para ver qué incluye. Abre dos para comparar.")}
          popularLabel={tx("El más elegido")}
        />
        <div className="table-scroll pricing-comparison-table"><table className="plan-table"><thead><tr><th scope="col">{tx("Qué recibes")}</th>{plans.map((plan) => <th scope="col" className={plan.popular ? "is-pop" : undefined} key={plan.slug}><SpanishPlanSticker slug={plan.slug} kind="name" /></th>)}</tr></thead>
          {table.map((section) => <tbody key={section.group}><tr className="plan-table__group"><th colSpan={5}><span>{section.group}</span></th></tr>{section.rows.map(([label, ...values]) => <tr key={label}><th scope="row">{label}</th>{values.map((value, i) => <td className={i === 1 ? "is-pop" : undefined} key={`${label}-${i}`}>{value}</td>)}</tr>)}</tbody>)}
        </table></div>
      </Section>
      <Section narrow><Faq items={faqs} /></Section>
    </>
  );
}

function About({ tx, href, lang }: { tx: (s: string) => string; href: (p: string) => string; lang: string }) {
  const faqs = homeFaqs(tx).slice(0, 4);
  const steps: Step[] = [
    { tab: "Preview", label: tx("Vista previa"), title: tx("Lo ves primero"), text: tx("La vista previa es el punto de partida. La apruebas, pides cambios o te vas.") },
    { tab: "Plan", label: tx("Plan"), title: tx("Queda por escrito"), text: tx("Qué incluye el plan y la fecha de lanzamiento se confirman por escrito.") },
    { tab: "Build", label: tx("Construcción"), title: tx("El sitio completo"), text: tx("Servicios, zona, fotos y el dominio, con tu aprobación antes de publicar.") },
    { tab: "Launch", label: tx("Lanzamiento"), title: tx("En vivo"), text: tx("El sitio sale. Los textos esperan la aprobación del operador.") },
    { tab: "Grow", label: tx("Crecer"), title: tx("Se mantiene"), text: tx("Cambios, llamadas y reseñas, para que veas los leads en un reporte.") },
  ];
  return (
    <>
      <ContentSchema path={href("/about")} title={tx(PAGE_META["/about"].title)} description={tx(PAGE_META["/about"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Nosotros"), path: href("/about") }]} faqs={faqs} inLanguage={lang} />
      <PageHero h1={tx("Un equipo pequeño para negocios de servicios")} mark={tx("negocios de servicios")} sub={tx("Creamos sitios, mejoramos la visibilidad, escribimos a llamadas perdidas y pedimos reseñas para negocios en Estados Unidos.")} image="about" imageAlt={tx("Computadora y un boceto de una página de inicio")} />
      <section className="section"><div className="container two-col">
        <div>
          <h2><HL text={tx("Para negocios que dependen del teléfono")} mark={tx("dependen del teléfono")} /></h2>
          <p>{tx("Kinexis trabaja con plomería, HVAC, electricidad, techos, jardinería y otros oficios en Estados Unidos. Tus clientes buscan cuando necesitan ayuda, así que el sitio y el seguimiento dejan claro qué hacer después.")}</p>
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

function Contact({ tx, href, lang }: { tx: (s: string) => string; href: (p: string) => string; lang: string }) {
  return (
    <>
      <ContentSchema path={href("/contact")} title={tx(PAGE_META["/contact"].title)} description={tx(PAGE_META["/contact"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Contacto"), path: href("/contact") }]} inLanguage={lang} />
      <PageHero h1={<HL text={tx("¿Quieres ver tu página de inicio?")} mark={tx("página de inicio")} />} sub={tx("Cuéntanos sobre tu negocio y te ayudamos a decidir si uno de los planes te conviene.")} image="contact" imageAlt={tx("Teléfono, sobre y burbujas de chat")} />
      <Section><div className="contact-grid">
        <Form fields={[{ label: tx("Nombre"), name: "name", required: true, auto: "given-name" }, { label: tx("Correo"), name: "email", kind: "email", required: true, auto: "email" }, { label: tx("Teléfono"), name: "phone", kind: "tel", auto: "tel" }, { label: tx("Sitio o negocio"), name: "business" }]} button={tx("Hablemos")} fast fastText={tx("Envíalo y te responderemos pronto.")} />
        <aside className="contact-info">
          <div className="card"><h2 className="card-title">{tx("Llamar")}</h2><p><a href={telHref(SITE.phone)}>{SITE.phone}</a></p></div>
          <div className="card"><h2 className="card-title">{tx("Correo")}</h2><p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p></div>
          <div className="card"><h2 className="card-title">{tx("Zona")}</h2><p>{tx("Negocios en Estados Unidos. Inglés y español en el plan Plus.")}</p></div>
          <div className="card"><h2 className="card-title">{tx("Agenda")}</h2><p className="muted">{tx("¿Prefieres hablarlo? Agenda una llamada corta.")}</p><Link className="btn btn--ghost" href={href("/strategy-call")} prefetch={false}>{tx("Agendar")}</Link></div>
        </aside>
      </div></Section>
    </>
  );
}

function Audit({ tx, href, lang }: { tx: (s: string) => string; href: (p: string) => string; lang: string }) {
  const aside = [[tx("Velocidad de las páginas"), tx("Revisamos qué tan rápido abren las páginas principales en el celular y la computadora."), "audit-speed"], [tx("Configuración de búsqueda"), tx("Revisamos títulos, encabezados, indexación y las señales básicas que lee Google."), "search-optimized"], [tx("Uso en el celular"), tx("Vemos cómo cabe, se lee y funciona el sitio en una pantalla pequeña."), "audit-mobile"], [tx("Llamadas y formularios"), tx("Comprobamos si queda claro cómo llamar, preguntar o pedir una cotización."), "audit-conversion"]] as const;
  return (
    <>
      <ContentSchema path={href("/audit")} title={tx(PAGE_META["/audit"].title)} description={tx(PAGE_META["/audit"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Auditoría"), path: href("/audit") }]} inLanguage={lang} serviceType={tx("Auditoría de sitio y SEO")} />
      <PageHero h1={tx("Recibe una lista clara de cambios")} mark={tx("lista clara")} sub={tx("Mándanos el enlace. Lo revisamos y te decimos qué cambios merecen atención primero.")} image="website-audit" imageAlt={tx("Tablero de auditoría con una lupa")} />
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
      <PageHero eyebrow={tx("Industrias")} h1={tx("Un sitio que encaja con tu oficio")} mark={tx("tu oficio")} sub={tx("Elige el tipo de trabajo para ver sus servicios comunes, las páginas útiles y el seguimiento del día a día.")}>
        <p className="btn-row"><Link className="btn btn--primary" href={href("/audit")} prefetch={false}>{tx("Revisar mi sitio")}</Link><Link className="btn btn--ghost" href={href("/pricing")} prefetch={false}>{tx("Ver precios")}</Link></p>
      </PageHero>
      <Section><IndustryGrid industries={industries} base={href("/industries")} /></Section>
      <Section tint narrow><p>{tx("La vista previa va primero, sin tarjeta. Después el sitio es uno de cuatro planes: Website a $97 al mes, Lead System a $197, Plus a $297, u Own It por $1,497. El SEO continuo se cotiza aparte.")}</p></Section>
      <CtaBand h={tx("Mira cómo podría verse tu oficio")} mark={tx("tu oficio")} sub={tx("Preparamos la página de inicio antes de que pagues, sin tarjeta ni obligación.")} btn={tx("Revisar mi sitio")} href={href("/audit")} {...band} />
    </>
  );
}

function Faqs({ tx, href, lang, band }: PageBits) {
  const faqs = [{ q: tx("¿Qué tan rápido recibo mi vista previa gratis?"), a: tx("Su vista previa gratis de la página principal está lista en 2 días hábiles después de recibir la información de su negocio, sin tarjeta.") }, ...homeFaqs(tx)];
  return (
    <>
      <ContentSchema path={href("/faqs")} title={tx(PAGE_META["/faqs"].title)} description={tx(PAGE_META["/faqs"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Preguntas"), path: href("/faqs") }]} faqs={faqs} inLanguage={lang} />
      <PageHero h1={tx("Preguntas que nos hacen los negocios")} mark={tx("nos hacen")} sub={tx("Consulta los detalles de planes, propiedad, garantía de 60 días y cancelación. Si falta tu duda, escríbenos.")} image="faqs" imageAlt={tx("Signos de interrogación")} />
      <Section narrow><Faq items={faqs} /></Section>
      <CtaBand h={tx("¿Necesitas una respuesta más concreta?")} mark={tx("más concreta")} sub={tx("Escribe o llama. Te explicamos los detalles del plan antes de que pagues.")} btn={tx("Contacto")} href={href("/contact")} {...band} />
    </>
  );
}

function Blog({ tx, href, lang, band }: PageBits) {
  const posts = POSTS.map((post) => {
    const es = esPost(post.slug);
    const text = es ?? null;
    return { ...post, title: text ? tx(text.title) : post.title, excerpt: text ? tx(text.excerpt) : post.excerpt, category: text ? tx(text.category) : post.category };
  });
  return (
    <>
      <ContentSchema path={href("/blog")} title={tx(PAGE_META["/blog"].title)} description={tx(PAGE_META["/blog"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: "Blog", path: href("/blog") }]} inLanguage={lang} />
      <PageHero h1={tx("Blog de marketing digital")} mark="Blog" sub={tx("Guías de SEO, diseño y marketing para negocios de servicios en Estados Unidos.")} image="blog" imageAlt={tx("Tarjetas de artículos")} />
      <Section>
        <Filterable cats={[tx("Consejos"), "SEO", tx("Diseño")]} allLabel={tx("Todo")} />
        <div className="grid grid--3">
          {posts.map((post) => (
            <article className="card post" key={post.slug} data-cat={post.category}>
              <Link href={href(`/blog/${post.slug}`)} className="post__link" prefetch={false}><div className="post__img"><DeferredImg src={imageVariant(post.image, 640, "webp")} srcSet={imageSrcSet(post.image, BLOG_IMAGE_WIDTHS)} avifSrcSet={imageSrcSet(post.image, BLOG_IMAGE_WIDTHS, "avif")} alt={post.title} width={post.width} height={post.height} sizes="(max-width: 900px) 92vw, 380px" /></div></Link>
              <div className="post__body"><Link href={href(`/blog/${post.slug}`)} className="post__link" prefetch={false}><p className="eyebrow">{post.category}</p><h2 className="card-title">{post.title}</h2></Link><p>{post.excerpt}</p></div>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand h={tx("¿Quieres que lo apliquemos a tu sitio?")} mark={tx("tu sitio")} sub={tx("Empieza con una revisión o una vista previa.")} btn={tx("Revisar mi sitio")} href={href("/audit")} {...band} />
    </>
  );
}

function PostView({ locale, slug, lang }: { locale: Locale; slug: string; lang: string }) {
  const raw = esPost(slug);
  const source = POSTS.find((post) => post.slug === slug);
  if (!raw || !source) notFound();
  const post = locale === "es-ES" ? spainizeData(raw) : raw;
  const href = (path: string) => L(locale, path);
  const tx = (text: string) => (locale === "es-ES" ? spainize(text) : text);
  return (
    <>
      <ArticleSchema title={post.seoTitle} description={post.excerpt} path={href(`/blog/${post.slug}`)} image={source.image} date={source.date} section={post.category} inLanguage={lang} />
      <PageHero h1={post.title} mark={post.title.split(" ").slice(-1)[0]} sub={post.lead} image="blog" imageAlt={post.title} />
      <section className="section"><div className="container container--narrow prose">
        {post.sections.map((section) => <div key={section.h2}><h2>{section.h2}</h2><div dangerouslySetInnerHTML={{ __html: section.html }} /></div>)}
        <p><Link href={href("/blog")} prefetch={false}>{tx("Volver al blog")}</Link></p>
      </div></section>
      <CtaBand h={tx("¿Quieres esto en tu sitio?")} mark={tx("tu sitio")} sub={tx("La revisión es gratis. La vista previa también, antes de pagar.")} btn={tx("Revisar mi sitio")} href={href("/audit")} secondary={tx("Hablar de tus opciones")} secondaryHref={href("/strategy-call")} />
    </>
  );
}

function Care({ tx, href, lang, band }: PageBits) {
  return (
    <>
      <ContentSchema path={href("/website-management")} title={tx(PAGE_META["/website-management"].title)} description={tx(PAGE_META["/website-management"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Mantenimiento"), path: href("/website-management") }]} serviceType={tx("Mantenimiento web")} inLanguage={lang} />
      <PageHero h1={tx("Mantén tu sitio al día")} mark={tx("al día")} sub={tx("Nos encargamos del hosting, los cambios de rutina, los respaldos y la seguridad.")} image="maintenance" imageAlt={tx("Paneles de cuidado con un engrane")} />
      <Section><div className="grid grid--4">
        <IconCard level={2} title={tx("Hosting confiable")} text={tx("El sitio tiene un lugar estable donde funcionar sin que administres un servidor.")} icon="hosting" />
        <IconCard level={2} title={tx("Cambios solicitados")} text={tx("Envíanos el texto o los datos nuevos y actualizamos la página por ti.")} icon="updates" />
        <IconCard level={2} title={tx("Respaldos y seguridad")} text={tx("Vigilamos el sitio y guardamos respaldos por si algo sale mal.")} icon="security" />
        <IconCard level={2} title={tx("Una persona que responde")} text={tx("Cuando necesitas un cambio, contactas a alguien que conoce el sitio.")} icon="support" />
      </div></Section>
      <Section tint><div className="center"><Link className="btn btn--primary" href={href("/update")} prefetch={false}>{tx("Pedir un cambio")}</Link></div></Section>
      <CtaBand h={tx("¿Quieres sacar el cuidado de tu lista?")} mark={tx("de tu lista")} sub={tx("Dinos qué necesita el sitio y te explicamos cómo podemos encargarnos.")} btn={tx("Empezar")} href={href("/contact")} {...band} />
    </>
  );
}

async function Reviews({ tx, href, lang, band }: PageBits & { locale: Locale }) {
  const reviews = await getFacebookReviews();
  return (
    <>
      <ContentSchema path={href("/reviews")} title={tx(PAGE_META["/reviews"].title)} description={tx(PAGE_META["/reviews"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Reseñas"), path: href("/reviews") }]} inLanguage={lang} />
      <PageHero h1={tx("Reseñas")} mark={tx("Reseñas")} sub={tx("Recomendaciones que los clientes dejaron en Facebook. El texto de cada reseña se muestra como lo escribió el cliente.")} image="reviews" imageAlt={tx("Tarjetas de reseñas")} />
      <Section>
        <div className="review-cards">{reviews.map((review) => <FacebookReviewCard key={review.id} review={review} recommends={tx("Recomienda")} doesNot={tx("No recomienda")} />)}</div>
        <div className="btn-row spaced justify-center">
          <LeaveFacebookReview label={tx("Dejar una reseña en Facebook")} />
        </div>
      </Section>
      <CtaBand h={tx("¿Quieres un sitio que traiga trabajo?")} mark={tx("traiga trabajo")} sub={tx("Empieza con una vista previa gratis de tu oficio.")} btn={tx("Empezar")} href={href("/contact")} {...band} />
    </>
  );
}

function Upgrades({ tx, href, lang, band }: PageBits) {
  const items = [
    ["extra-page", tx("Página extra"), tx("Agrega un servicio, una zona o una landing a Website, Lead System o Plus."), "$99"],
    ["site-care", tx("Cuidado del sitio"), tx("Hosting, SSL y hasta 30 minutos de cambios al mes después del primer año en Own It."), "$39 / mes"],
    ["missed-call-text-back", tx("Texto si no contestas"), tx("Agrégalo a un sitio Own It después de la aprobación del operador, normalmente en 10 a 15 días."), "$97 / mes"],
    ["new-pages", tx("Páginas nuevas en Own It"), tx("Las páginas extra de Own It se cotizan por escrito antes de empezar."), tx("Cotizado")],
  ] as const;
  return (
    <>
      <ContentSchema path={href("/upgrades")} title={tx(PAGE_META["/upgrades"].title)} description={tx(PAGE_META["/upgrades"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Extras"), path: href("/upgrades") }]} inLanguage={lang} />
      <PageHero h1={tx("Agrega más cuando lo necesites")} mark={tx("cuando lo necesites")} sub={tx("Empieza con el plan correcto y suma páginas, cuidado o textos cuando cambie el negocio.")} image="upgrades" imageAlt={tx("Extras alrededor de un sitio")} />
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
    business: tx("Oficio o negocio"),
    book: tx("Reservar este horario"),
    days: "DLMXJVS",
    dateLocale: locale === "es-ES" ? "es-ES" : "es-MX",
  };
  return (
    <>
      <ContentSchema path={href("/strategy-call")} title={tx(PAGE_META["/strategy-call"].title)} description={tx(PAGE_META["/strategy-call"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Llamada"), path: href("/strategy-call") }]} inLanguage={lang} />
      <PageHero h1={tx("Hablemos de tus planes para el sitio")} mark={tx("planes para el sitio")} sub={tx("En una llamada corta puedes mostrar el sitio actual, explicar el negocio y ver qué plan encaja.")} />
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

function Terms({ tx, href, lang }: { tx: (s: string) => string; href: (p: string) => string; lang: string }) {
  return (
    <>
      <ContentSchema path={href("/terms")} title={tx(PAGE_META["/terms"].title)} description={tx(PAGE_META["/terms"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Términos"), path: href("/terms") }]} inLanguage={lang} />
      <PageHero h1={tx("Términos de planes y cobro")} mark={tx("cobro")} sub={tx("Actualizado el 30 de octubre de 2026. Estos son los términos de los cuatro planes. El acuerdo que apruebas al pagar manda si algo difiere.")} />
      <section className="section"><div className="container container--narrow prose">
        <h2>{tx("1. Vista previa gratis")}</h2>
        <p>{tx("Cada plan empieza con una vista previa de la página de inicio. Las vistas previas gratis de la página principal se entregan dentro de 2 días hábiles después de recibir los datos de su negocio. Sin tarjeta y sin obligación. Te mostramos un concepto para tu oficio. Puedes aprobarlo, pedir cambios o irte sin pagar.")}</p>
        <h2>{tx("2. Planes mensuales")}</h2>
        <p>{tx("Website es $97 al mes. Lead System es $197 al mes. Plus (bilingüe) es $297 al mes. Los tres son $0 de enganche y empiezan el día del lanzamiento. Cada uno tiene un mínimo de 3 meses. Después sigue mes a mes. Puedes cancelar después del mínimo por texto, correo o Messenger. No hay cargo por cancelar. El precio queda fijo 24 meses. Después avisamos al menos 30 días antes de un cambio.")}</p>
        <h2>{tx("3. Qué incluye")}</h2>
        <p>{tx("Las páginas y el trabajo incluido están en la página de precios. Una página extra en Website cuesta $99. Lead System incluye una página nueva al mes y Plus incluye dos. Lo que no usas no se acumula. Un cambio chico toma 30 minutos o menos y se hace uno a la vez. Hosting, SSL, seguridad y respaldos van incluidos mientras el plan mensual está activo. En Own It, hosting y SSL van los primeros 12 meses; después el cuidado opcional es $39 al mes.")}</p>
        <h2>{tx("4. Textos y el operador")}</h2>
        <p>{tx("El texto si no contestas y los pedidos de reseña se envían por mensaje. Empiezan después de la aprobación del operador, que suele tardar de 10 a 15 días. Esa aprobación no está garantizada.")}</p>
        <h2>{tx("5. Garantía de 60 días")}</h2>
        <p>{tx("Solo Lead System y Plus. Si tienes cero leads rastreados en los primeros 60 días en vivo, condonamos el tercer y cuarto cargo mensual y se quita el mínimo. Una garantía por negocio, con la cuenta al corriente. Un lead rastreado es una llamada de 30 segundos o más, alguien que responde al texto, o un formulario real. No cuentan spam, números equivocados, solicitantes, proveedores ni clientes actuales. No aplica si el seguimiento falla por un cambio que haces tú, o si pausas o cancelas antes del día 60. Own It no incluye esta garantía.")}</p>
        <h2>{tx("6. Own It")}</h2>
        <p>{tx("Own It es un pago de $1,497, al aprobar la vista previa. No hay plan mensual ni mínimo. Los archivos son tuyos desde el lanzamiento. Hosting y SSL van 12 meses, el dominio el primer año, y los cambios chicos 12 meses hasta 30 minutos al mes. El tiempo no usado no se acumula. Después, el cuidado opcional es $39 al mes. Las renovaciones de dominio se cobran al costo. Las páginas nuevas se cotizan por escrito. El texto si no contestas se puede agregar por $97 al mes.")}</p>
        <h2>{tx("7. Cancelación y acceso")}</h2>
        <p>{tx("Cancela un plan mensual después del mínimo por texto, correo o Messenger. Paramos los cargos futuros. En los planes mensuales el sitio lo hospeda Kinexis, así que el acceso termina cuando termina el plan, salvo que compres el sitio o pases a Own It. Pide las condiciones por escrito antes de cancelar si quieres quedarte con el sitio.")}</p>
        <h2>{tx("8. Impuestos y terceros")}</h2>
        <p>{tx("Los precios están en dólares de EE. UU. y no incluyen impuestos. Renovaciones de dominio, imágenes de pago, publicidad y otros servicios de terceros no están incluidos salvo que lo pongamos por escrito.")}</p>
        <h2>{tx("9. Preguntas")}</h2>
        <p>{tx("Llama al")} <a href={telHref(SITE.phone)}>{SITE.phone}</a> {tx("o escribe a")} <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. {tx("Contestamos dudas del plan antes de que pagues.")}</p>
      </div></section>
    </>
  );
}

function Privacy({ tx, href, lang }: { tx: (s: string) => string; href: (p: string) => string; lang: string }) {
  return (
    <>
      <ContentSchema path={href("/privacy")} title={tx(PAGE_META["/privacy"].title)} description={tx(PAGE_META["/privacy"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Privacidad"), path: href("/privacy") }]} inLanguage={lang} />
      <PageHero h1={tx("Política de privacidad")} mark={tx("privacidad")} sub={tx("Actualizada el 21 de octubre de 2026. Explica qué recoge este sitio y cómo lo usa Kinexis Digital.")} />
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

function Update({ tx, href, lang }: { tx: (s: string) => string; href: (p: string) => string; lang: string }) {
  return (
    <>
      <ContentSchema path={href("/update")} title={tx(PAGE_META["/update"].title)} description={tx(PAGE_META["/update"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Cambios"), path: href("/update") }]} inLanguage={lang} />
      <PageHero h1={tx("Pide un cambio en el sitio")} mark={tx("cambio")} sub={tx("Dinos la página y el cambio. Los cambios chicos se hacen uno a la vez, dentro del tiempo de tu plan.")} />
      <Section narrow><Form button={tx("Enviar solicitud")} note={tx("Website: dos días hábiles. Lead System: un día hábil. Plus: el mismo día hábil si lo pides antes del mediodía, hora del Centro.")} fields={[{ label: tx("Tu nombre"), name: "name", required: true, auto: "name" }, { label: tx("Correo"), name: "email", kind: "email", required: true, auto: "email" }, { label: tx("URL de la página"), name: "page", kind: "url" }, { label: tx("¿Qué debemos cambiar?"), name: "request", kind: "textarea", required: true }, { label: tx("Adjuntar un archivo (opcional)"), name: "file", kind: "file" }]} /></Section>
    </>
  );
}

function Portfolio({ tx, href, lang, band }: PageBits) {
  return (
    <>
      <ContentSchema path={href("/portfolio")} title={tx(PAGE_META["/portfolio"].title)} description={tx(PAGE_META["/portfolio"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Portafolio"), path: href("/portfolio") }]} inLanguage={lang} />
      <PageHero className="portfolio-hero" eyebrow={tx("Plantillas web para negocios de servicios")} h1={tx("Mira nuestros diseños")} mark={tx("nuestros diseños")} sub={tx("Elige una plantilla que te guste y la personalizamos para tu negocio, desde la primera pantalla hasta la cotización. Los sitios reales de clientes aparecen aparte más abajo.")} image="portfolio" imageAlt={tx("Sitios de oficios en pantallas")}>
        <div className="btn-row spaced"><Link className="btn btn--primary btn--lg" href={href("/contact")} prefetch={false}>{tx("Ver primero mi página de inicio")}</Link><Link className="btn btn--ghost btn--lg" href={href("/pricing")} prefetch={false}>{tx("Ver los cuatro planes")}</Link></div>
      </PageHero>
      <Section>
        <div className="container">
          <div className="showcase__head"><div><p className="eyebrow">{tx("Elige tu diseño inicial")}</p><h2><HL text={tx("Plantillas web diseñadas profesionalmente")} mark={tx("Plantillas web")} /></h2><p className="muted">{tx("Elige una plantilla que te guste y personalizamos el diseño, el contenido, los servicios y las llamadas a la acción para tu negocio. Pasa el cursor o toca para ver la plantilla completa en inglés.")}</p></div></div>
          <div className="portfolio portfolio--main">{PROJECTS.map((project) => <ProjectCard key={project.slug} project={project} href={project.placeholder ? undefined : `/portfolio/${project.slug}`} hrefLang="en-US" label={tx(`Ver ${project.name}`)} ctaLabel={tx("Ver esta plantilla")} scrollOnHover={false} />)}</div>
          <div className="showcase__head showcase__head--follow"><div><p className="eyebrow">{tx("Sitios en vivo")}</p><h2><HL text={tx("Sitios de clientes")} mark={tx("clientes")} /></h2></div></div>
          <div className="portfolio--live">{LIVE_SITES.map((site) => {
            const shot = portfolioFile(site.image, 640);
            const full = portfolioFile(site.image);
            let host = site.url;
            try { host = new URL(site.url).host.replace(/^www\./, ""); } catch { /* keep url */ }
            return (
              <a key={site.slug} className="live-site" href={site.url} target="_blank" rel="noopener noreferrer">
                <div className="shot" data-name={site.name}><div className="shot__page"><div className="shot__track"><DeferredImg src={shot} srcSet={`${shot} 640w, ${full} 1100w`} sizes="(max-width: 960px) 92vw, 380px" alt="" width={640} height={Math.round((site.height * 640) / site.width)} className="shot__img" /></div></div><span className="btn btn--primary shot__cta-overlay" aria-hidden="true">{tx("Visitar sitio")}</span></div>
                <span className="live-site__copy"><span className="live-site__status"><span className="live-site__dot" aria-hidden="true" />{tx("En vivo")}</span><span className="live-site__id"><span className="live-site__name">{site.name}</span><span className="live-site__meta"><span>{site.trade}</span><span className="live-site__host">{host}</span></span></span></span>
              </a>
            );
          })}</div>
        </div>
      </Section>
      <AuditCta eyebrow={tx("Un punto de partida claro")} heading={tx("Descubre qué está frenando tu sitio")} mark={tx("frenando tu sitio")} text={tx("Te decimos qué funciona, qué estorba y qué cambios conviene hacer primero. Hay revisiones gratis y de pago.")} cta={tx("Revisar mi sitio")} href={href("/audit")} alt={tx("Un cohete sale de una computadora")} />
      <CtaBand h={tx("¿Quieres ver una idea para tu sitio?")} mark={tx("tu sitio")} sub={tx("Cuéntanos sobre tu oficio y preparamos una vista previa gratis para tu negocio.")} btn={tx("Quiero la vista previa")} href={href("/contact")} {...band} />
    </>
  );
}

const FEATURES: Record<FeatureKey, { title: string; text: string; icon: string }> = {
  calls: { title: "Fácil de llamar", text: "Toque para llamar y un número visible mientras la persona decide, también en el celular.", icon: "calls" },
  "quote-requests": { title: "Cotizaciones", text: "Un formulario que pide los datos del trabajo, y nada que no necesitas.", icon: "quote-requests" },
  reviews: { title: "Confianza", text: "En Lead System y Plus, después del trabajo sale un texto con el enlace a tu perfil de Google.", icon: "reviews" },
  bookings: { title: "Reservas", text: "Una forma directa de pedir una visita recurrente, un lugar en la ruta o el siguiente hueco.", icon: "bookings" },
  "service-area": { title: "Dónde trabajas", text: "", icon: "service-area" },
};

function IndustryView({ locale, slug, tx, lang }: { locale: Locale; slug: string; tx: (s: string) => string; lang: string }) {
  const base = getIndustry(slug);
  if (!base) notFound();
  const industry = localizeIndustry(base, locale);
  const project = getProject(industry.projectSlug);
  const path = withLocale(locale, `/industries/${industry.slug}`);
  const href = (item: string) => withLocale(locale, item);
  const related = relatedIndustries(base).map((item) => localizeIndustry(item, locale));
  const hero = `/assets/industries/${industry.slug}/hero.webp`;
  const heroMobile = `/assets/industries/${industry.slug}/hero-768.webp`;
  return (
    <>
      <ContentSchema path={path} title={industry.metaTitle} description={industry.metaDescription} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Industrias"), path: href("/industries") }, { name: industry.name, path }]} faqs={[...industry.faqs]} serviceType={tx(`Diseño web de ${industry.name}`)} inLanguage={lang} />
      <PageHero eyebrow={tx("Industrias")} h1={industry.h1} mark={industry.mark} sub={industry.sub} fallbackTrack={HERO_TRACK[industry.slug]} className="industry-hero" art={(
        <picture>
          <source type="image/avif" srcSet={`${heroMobile.replace(".webp", ".avif")} 768w, ${hero.replace(".webp", ".avif")} 1536w`} sizes="(max-width: 860px) 86vw, 620px" />
          <source media="(min-width: 861px)" srcSet={`${heroMobile} 768w, ${hero} 1536w`} sizes="620px" />
          <img className="hero-art industry-hero__img" src={heroMobile} srcSet={`${heroMobile} 768w, ${hero} 1536w`} sizes="(max-width: 860px) 86vw, 620px" alt={industry.heroAlt} width={1536} height={1024} loading="eager" decoding="async" fetchPriority="high" />
        </picture>
      )}>
        <div className="industry-hero__intro"><p>{industry.intro[0]}</p><p>{industry.intro[1]}</p></div>
        <p className="btn-row"><Link className="btn btn--primary" href={href("/audit")} prefetch={false}>{tx("Revisar mi sitio")}</Link><Link className="btn btn--ghost" href={href("/pricing")} prefetch={false}>{tx("Ver precios")}</Link></p>
      </PageHero>
      <Section tint>
        <h2 className="center"><HL text={industry.problemsTitle} mark={industry.problemsMark} /></h2>
        <div className="grid grid--3">{industry.problems.map((point) => <IconCard key={point.icon} title={point.title} text={point.text} iconClass="icon--problem" src={kitSrc(`/assets/kinexis/icons/industries/${industry.slug}/${point.icon}.svg`)} />)}</div>
      </Section>
      <Section accent={`/assets/industries/${industry.slug}/section-accent.svg`}>
        <h2 className="center"><HL text={industry.servicesTitle} mark={industry.servicesMark} /></h2>
        <div className="grid grid--3">{industry.services.map((point) => <IconCard key={point.icon} title={point.title} text={point.text} iconClass="icon--service" src={kitSrc(`/assets/industries/${industry.slug}/icons/${point.icon}.svg`)} />)}</div>
      </Section>
      <Section tint>
        <div className="media-split industry-screens">
          <div className="media-split__copy">
            <h2><HL text={tx("Funciona en cada pantalla")} mark={tx("cada pantalla")} /></h2>
            <p>{tx("El sitio está pensado para el celular en la entrada y la computadora en el escritorio. El número, el formulario y la zona se usan sin pellizcar.")}</p>
          </div>
          <div className="screen-art">
            <img className="screen-art__img" src={project ? portfolioFile(`/portfolio/${project.slug}-devices-sm.webp`) : "/assets/shared/responsive-design.svg"} alt={project ? tx(`${project.name} en monitor, laptop, tableta y celular`) : tx("Un sitio en varias pantallas")} width={project ? 1536 : 680} height={project ? 1024 : 400} loading="lazy" decoding="async" />
          </div>
        </div>
        <div className="feature-grid">
          {industry.features.map((key) => <IconCard key={key} title={tx(FEATURES[key].title)} text={industry.featureText?.[key] ?? (key === "service-area" ? industry.serviceArea : tx(FEATURES[key].text))} src={kitSrc(`/assets/shared/icons/${FEATURES[key].icon}.svg`)} />)}
        </div>
      </Section>
      {project && (
        <Section>
          <div className="media-split">
            <div className="media-split__copy">
              <h2><HL text={tx(`Ejemplo de plantilla web para ${industry.name}`)} mark={tx("plantilla web")} /></h2>
              <p>{tx("¿Te gusta el diseño de")} <Link href={`/portfolio/${project.slug}`} hrefLang="en-US" prefetch={false}>{project.name}</Link>? {tx("Elige esta plantilla profesional como punto de partida y la personalizamos según tus servicios, tu marca y tus clientes. La página de la plantilla está en inglés.")}</p>
            </div>
            <ShotFrame project={project} href={`/portfolio/${project.slug}`} hrefLang="en-US" label={tx(`Ver la plantilla web de ${project.name}`)} ctaLabel={tx("Ver esta plantilla")} />
          </div>
        </Section>
      )}
      <IndustryAudit eyebrow={tx("Un punto de partida claro")} heading={tx("Descubre qué está frenando tu sitio")} mark={tx("frenando tu sitio")} text={tx("Te decimos qué funciona, qué estorba y qué cambios conviene hacer primero. Hay revisiones gratis y de pago.")} cta={tx("Revisar mi sitio")} href={href("/audit")} alt={tx("Computadora, celular y una lupa")} checks={[
        { title: tx("Velocidad"), text: tx("Qué tan rápido carga en el celular y en la computadora."), icon: "speed" },
        { title: tx("Visibilidad"), text: tx("Si los encabezados y las páginas están listos para que un buscador los lea."), icon: "search" },
        { title: tx("Celular"), text: tx("Cómo cabe en el teléfono y qué alcanza el pulgar."), icon: "mobile" },
        { title: tx("Llamadas"), text: tx("Si el número, los botones y los formularios dejan un paso claro."), icon: "conversion" },
      ]} />
      <Section id="plans"><PlanOffer heading={tx("Elige el punto de partida para tu sitio")} mark={tx("punto de partida")} href={href("/pricing")} eyebrow={tx("Cuatro planes · Una vista previa gratis")} chip={tx("$0 de enganche")} note={tx("Cada plan empieza con una vista previa, sin tarjeta y sin obligación.")} badge={tx("El más elegido")} cta={tx("Ver los cuatro planes")} plans={spanishPlans(tx)} /></Section>
      <Section tint narrow><h2 className="center"><HL text={tx(`Preguntas de ${industry.name}`)} mark={tx("Preguntas")} /></h2><Faq items={[...industry.faqs]} /></Section>
      <Section><h2 className="center"><HL text={tx("Otros oficios")} mark={tx("Otros oficios")} /></h2><IndustryGrid industries={related} base={href("/industries")} /></Section>
      <CtaBand h={tx(`Ve un inicio de ${industry.name} antes de pagar`)} mark={tx("antes de pagar")} sub={tx("Vista previa gratis, sin tarjeta. Luego eliges Website, Lead System, Plus u Own It.")} btn={tx("Revisar mi sitio")} href={href("/audit")} secondary={tx("Hablar de tus opciones")} secondaryHref={href("/strategy-call")} />
    </>
  );
}
