import Link from "next/link";
import GuaranteeBadge from "@/components/GuaranteeBadge";
import MobilePlanComparison from "@/components/MobilePlanComparison";
import SpanishPlanSticker, { SPANISH_PLAN_STICKERS } from "@/components/SpanishPlanSticker";
import { notFound } from "next/navigation";
import { getIndustry, relatedIndustries, type FeatureKey } from "@/data/industries";
import { getProject, portfolioFile, PROJECTS } from "@/data/portfolio";
import { LIVE_SITES } from "@/data/liveSites";
import { PLANS, POSTS } from "@/lib/content";
import { esPost } from "@/i18n/posts-es";
import { localizedIndustries, localizeIndustry } from "@/i18n/industries-es";
import { contentLanguage, pathFromSlug, spainize, spainizeData, withLocale, type Locale } from "@/lib/i18n";
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
  "/": { title: "Sitios web y SEO para negocios de servicios en EE. UU. | Kinexis Digital", absolute: true, description: "Diseño web, SEO y mantenimiento para negocios de servicios en Estados Unidos. Kinexis Digital convierte búsquedas en llamadas." },
  "/services": { title: "Servicios de sitio web y SEO", description: "Diseño web, SEO, mantenimiento y una auditoría gratis para negocios de servicios en Estados Unidos." },
  "/web-design": { title: "Diseño web para negocios de servicios en EE. UU.", description: "Sitios para plomeros, HVAC, techos y otros oficios en Estados Unidos. Ves la página de inicio antes de pagar." },
  "/seo-services": { title: "Servicios de SEO en todo el país", description: "SEO técnico, optimización, contenido e informes para negocios en Estados Unidos. Pide una auditoría gratis." },
  "/audit": { title: "Auditoría gratis de sitio web y SEO", description: "Auditoría gratis de sitio y SEO para negocios en EE. UU. Revisamos velocidad, indexación, SEO y conversión." },
  "/contact": { title: "Contacta a nuestra agencia", description: "Habla con Kinexis Digital, agencia para negocios en Estados Unidos. Llama, escribe o agenda una llamada." },
  "/website-management": { title: "Mantenimiento web para negocios en EE. UU.", description: "Hosting, cambios, seguridad y soporte para sitios de negocios en Estados Unidos." },
  "/about": { title: "Sobre nuestra agencia de marketing", description: "Kinexis Digital es una agencia de EE. UU. para negocios de servicios. Mira para quién construimos y cómo lanzamos." },
  "/portfolio": { title: "Portafolio de diseño web para oficios", description: "Sitios que Kinexis Digital ha diseñado para albercas, HVAC, plomería, techos y otros oficios en Estados Unidos." },
  "/industries": { title: "Sitios para negocios de servicios en EE. UU.", description: "Diseño web para plomería, HVAC, electricidad, techos, jardinería y otros oficios en Estados Unidos." },
  "/reviews": { title: "Reseñas de negocios de servicios", description: "Recomendaciones que clientes en Estados Unidos han dejado sobre Kinexis Digital." },
  "/upgrades": { title: "Mejoras y extras para el sitio", description: "Extras de Kinexis Digital: páginas adicionales, cuidado del sitio y texto cuando no contestas." },
  "/pricing": { title: "Precios de sitios y marketing", description: "Precios claros: Website $97/mes, Lead System $197/mes, Plus $297/mes u Own It por $1,497. Vista previa gratis." },
  "/blog": { title: "Blog de marketing digital", description: "Guías de SEO, diseño web y marketing para negocios de servicios en Estados Unidos." },
  "/faqs": { title: "Preguntas de marketing digital", description: "Respuestas sobre planes, propiedad del sitio, la garantía de 60 días, SEO y cómo trabajar con Kinexis Digital." },
  "/update": { title: "Pide un cambio en el sitio", description: "Pide a Kinexis Digital un cambio en una página. Los cambios chicos se hacen uno a la vez, dentro del tiempo del plan." },
  "/strategy-call": { title: "Agenda una llamada de estrategia", description: "Agenda una llamada con Kinexis Digital. Revisamos tu negocio, tus metas y qué plan encaja." },
  "/terms": { title: "Términos de los planes del sitio", description: "Términos de planes y cobro de Kinexis Digital, incluida la garantía de 60 días y la opción Own It." },
  "/privacy": { title: "Política de privacidad para visitantes", description: "Cómo Kinexis Digital recoge, usa y comparte datos de formularios, llamadas y correo, y cómo preguntarnos." },
};

export function spanishMetadata(locale: Locale, slug?: string[]) {
  const en = pathFromSlug(slug);
  const localized = metaFor(en, locale);
  if (!localized) return { title: "Página no encontrada", robots: { index: false, follow: false } };
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
  const band = { secondary: tx("Agendar una llamada"), secondaryHref: href("/strategy-call") };

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
    { tab: "Preview", label: tx("Vista previa"), title: tx("Ves tu inicio primero"), text: tx("Armamos un inicio para tu oficio. Lo ves antes de pagar, sin tarjeta y sin obligación.") },
    { tab: "Plan", label: tx("Plan"), title: tx("Elige el seguimiento"), text: tx("Website, Lead System, Plus u Own It. Confirmamos qué incluye y la fecha de lanzamiento por escrito.") },
    { tab: "Build", label: tx("Construcción"), title: tx("Armamos el sitio completo"), text: tx("Agregamos servicios, zona, fotos y texto, conectamos el dominio y pedimos tu aprobación.") },
    { tab: "Launch", label: tx("Lanzamiento"), title: tx("Sale en vivo"), text: tx("El sitio se publica. El texto y las reseñas empiezan después de la aprobación del operador, normalmente en 10 a 15 días.") },
    { tab: "Grow", label: tx("Crecer"), title: tx("Lo mantenemos al día"), text: tx("Hacemos los cambios, seguimos llamadas y formularios, y enviamos reseñas después de cada trabajo.") },
  ];
  return (
    <>
      <ContentSchema path={href("/")} title={tx(PAGE_META["/"].title)} description={tx(PAGE_META["/"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }]} faqs={faqs} inLanguage={lang} />
      <section className="hero hero--fit"><div className="container hero__inner">
        <div className="hero__text">
          <p className="eyebrow">{tx("Sitios y SEO, en todo el país")}</p>
          <h1><HL text={tx("Sitios en todo el país que convierten búsquedas en trabajo agendado")} mark={tx("trabajo agendado")} /></h1>
          <ul className="ticks">
            <li><span className="tick__mark" aria-hidden="true">✓</span><span className="tick__copy"><span><b>{tx("Ves tu inicio gratis")}</b> – {tx("sin tarjeta")}</span><span>{tx("y sin obligación antes de pagar")}</span></span></li>
            <li><span className="tick__mark" aria-hidden="true">✓</span><span className="tick__copy"><span><b>{tx("Atrapas las llamadas que pierdes")}</b></span><span>{tx("texto automático desde el celular y seguimiento")}</span></span></li>
            <li><span className="tick__mark" aria-hidden="true">✓</span><span className="tick__copy"><span><b>{tx("Tu reputación en Google")}</b></span><span>{tx("pedidos de reseña enviados por ti, no dejados al azar")}</span></span></li>
          </ul>
          <div className="hero__btns">
            <Link className="btn btn--primary btn--lg" href={href("/audit")} prefetch={false}>{tx("Pedir auditoría gratis")}</Link>
            <Link className="btn btn--ghost btn--lg" href={href("/pricing")} prefetch={false}>{tx("Ver planes y precios")}</Link>
            <OpenDialog id="guarantee" className="link-btn">{tx("Garantía de 60 días")}</OpenDialog>
          </div>
        </div>
        <HeroFilm />
      </div></section>
      <Section tint>
        <MediaSplit image="homepage" alt={tx("Un oficio mostrando su sitio en una computadora y un celular")}>
          <h2><HL text={tx("Kinexis Digital te ayuda a hacer crecer el negocio")} mark={tx("el negocio")} /></h2>
          <p>{tx("SEO, sitios rápidos y seguimiento para negocios de servicios en Estados Unidos. Cuatro planes desde $97 al mes. Lo revisas en el celular o en la computadora.")}</p>
        </MediaSplit>
        <div className="grid grid--3">
          <IconCard title={tx("Mejor diseño")} text={tx("Sitios rápidos, hechos para que la visita se vuelva llamada o cotización.")} icon="better-design" />
          <IconCard title={tx("Mejor seguimiento")} text={tx("Texto si no contestas, reseñas y registro de leads mientras estás en el trabajo.")} icon="better-follow-up" />
          <IconCard title={tx("Mejor precio")} text={tx("Cuatro planes desde $97 al mes. Vista previa gratis, $0 de enganche y un mínimo de 3 meses.")} icon="better-pricing" />
        </div>
      </Section>
      <Section>
        <h2><HL text={tx("Sitios que se ven bien y convierten. El siguiente puede ser el tuyo.")} mark={tx("convierten")} /></h2>
        <p className="muted">{tx("Pasa el cursor para ver el sitio. Los estudios de caso están en inglés.")}</p>
        <div className="portfolio"><Shots n={8} mode="link" hrefLang="en-US" labelFor={(name) => tx(`Ver ${name}`)} /></div>
        <p className="center"><Link className="btn btn--primary" href={href("/portfolio")} prefetch={false}>{tx("Ver el portafolio")}</Link></p>
      </Section>
      <Section tint>
        <h2 className="center"><HL text={tx("No elijas entre servicio y precio. Ten los dos.")} mark={tx("los dos")} /></h2>
        <Compare rows={[[tx("Arranque rápido"), false, false], [tx("Una persona de contacto"), false, true], [tx("Entrega rápida"), true, false], [tx("Mantenimiento incluido"), false, false], [tx("Pagos mensuales"), false, false]]} freelancers={tx("Freelancers")} agencies={tx("Agencias")} label={tx("Comparación")} feature={tx("Función")} yesLabel={tx("Sí")} />
      </Section>
      <Section>
        <p className="eyebrow center">{tx("Reseñas de Google, resueltas")}</p>
        <h2 className="center"><HL text={tx("Pídele reseña a cada cliente contento. En automático.")} mark={tx("En automático")} /></h2>
        <p className="center muted">{tx("Parte de Lead System. Después de cada trabajo sale un texto con el enlace a tu página de Google.")}</p>
        <ReviewRail steps={[{ n: "1", title: tx("Después de cada trabajo"), text: tx("Sale un texto con el enlace directo. Sin pedir incómodo y sin que el cliente cree una cuenta."), icon: "after-every-job" }, { n: "2", title: tx("Un toque a Google"), text: tx("El enlace abre tu perfil. Dejar la reseña toma unos segundos en el celular."), icon: "one-tap-to-google" }, { n: "3", title: tx("Sin perseguir"), text: tx("Las reseñas aparecen sin que te acuerdes de pedirlas. Respondes desde tu cuenta de Google."), icon: "no-chasing" }]} />
      </Section>
      <Section tint>
        <h2 className="center"><HL text={tx("Cuatro razones para trabajar con nosotros")} mark={tx("trabajar con nosotros")} /></h2>
        <ReasonBoard reasons={[{ title: tx("Bien diseñado"), text: tx("Se ve bien en el celular y en la computadora, y el negocio se ve tan bien como es."), icon: "well-designed" }, { title: tx("Hecho para vender"), text: tx("Llamados claros en cada página, para que la visita se vuelva llamada."), icon: "sales-focused" }, { title: tx("Listo para buscar"), text: tx("SEO técnico y una estructura limpia para que Google pueda leer el sitio."), icon: "search-optimized" }, { title: tx("Sin complicaciones"), text: tx("Hosting, cambios y seguridad resueltos, para que no los cargues tú."), icon: "hassle-free" }]} />
      </Section>
      <Section>
        <h2 className="center"><HL text={tx("Hecho para el oficio que sí manejas")} mark={tx("oficio que sí manejas")} /></h2>
        <p className="center muted">{tx("Los planes son los mismos. El sitio se escribe para las llamadas de ese oficio.")}</p>
        <IndustryGrid layout="index" industries={localizedIndustries(locale)} base={href("/industries")} />
      </Section>
      <Section id="plans"><PlanOffer heading={tx("Sitios para tu oficio desde solo")} mark={tx("tu oficio")} href={href("/pricing")} eyebrow={tx("Cuatro planes · Una vista previa gratis")} chip={tx("$0 de enganche")} note={tx("Cada plan empieza con una vista previa del inicio, sin tarjeta y sin obligación.")} badge={tx("El más elegido")} cta={tx("Ver los cuatro planes")} plans={spanishPlans(tx)} /></Section>
      <Section tint>
        <h2 className="center"><HL text={tx("Trabajar con Kinexis Digital es simple")} mark={tx("es simple")} /></h2>
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
    { q: tx("¿Con quién trabajan?"), a: tx("Oficios y negocios de servicios en Estados Unidos: plomería, HVAC, electricidad, jardinería, techos, remodelación y oficios parecidos. Si tus clientes te buscan en Google y llaman cuando algo se descompone, los planes están hechos para ti.") },
    { q: tx("¿Cuánto cuesta el sitio?"), a: tx("Cuatro planes: Website a $97 al mes, Lead System a $197, Plus a $297, u Own It por $1,497 de una vez. Todos empiezan con una vista previa gratis, sin tarjeta.") },
    { q: tx("¿Cómo funciona el precio?"), a: tx("Los planes mensuales son $0 de enganche, con un mínimo de 3 meses desde el lanzamiento, y después mes a mes. El precio queda fijo 24 meses. Own It es un pago, sin mensualidad y sin mínimo.") },
    { q: tx("¿El sitio es mío?"), a: tx("En Own It, los archivos son tuyos desde el lanzamiento. En los planes mensuales, Kinexis hospeda y administra el sitio mientras sigues en el plan. Pide por escrito las condiciones de compra si quieres llevártelo.") },
    { q: tx("¿Hay garantía?"), a: tx("Lead System y Plus incluyen la garantía de 60 días: si no hay leads rastreados en los primeros 60 días en vivo, condonamos el tercer y cuarto cargo y se quita el mínimo. Una por negocio. Own It no la incluye.") },
    { q: tx("¿Cuánto tarda?"), a: tx("Primero va la vista previa. Cuando la apruebas y tenemos el contenido, confirmamos la fecha de lanzamiento por escrito. Los textos empiezan después de la aprobación del operador, normalmente en 10 a 15 días.") },
    { q: tx("¿El sitio incluye SEO?"), a: tx("Cada sitio sale con estructura limpia, páginas rápidas y lo básico que Google necesita. El SEO continuo no está en los cuatro planes; se cotiza aparte.") },
    { q: tx("¿Pueden conseguir fotos?"), a: tx("Podemos usar tus fotos, o cotizar foto y video aparte. No usamos fotos de archivo de trabajos ajenos y las hacemos pasar por tuyas.") },
    { q: tx("¿Pueden escribir el contenido?"), a: tx("Podemos usar el texto que ya tienes, o cotizar la redacción aparte. La vista previa usa un texto realista de tu oficio para que juzgues el diseño.") },
  ];
}

function spanishPlans(tx: (s: string) => string) {
  const copy: Record<string, { tagline: string; kicker: string; note: string; features: [string, string][] }> = {
    website: { tagline: tx("Una casa profesional para tu negocio."), kicker: tx("$0 de enganche, luego"), note: tx("Mínimo de 3 meses, luego mes a mes"), features: [[tx("Sitio para celular"), tx("Hasta 5 páginas")], [tx("Hosting + SSL"), tx("Seguridad y respaldos")], [tx("Cambios chicos*"), tx("Hasta 2 al mes, en 2 días hábiles")], [tx("Leads de formulario"), tx("Sabes cuándo llega una cotización")], [tx("Páginas nuevas"), tx("$99 cada una")]] },
    "lead-system": { tagline: tx("Tu sitio y las herramientas que traen llamadas."), kicker: tx("$0 de enganche, luego"), note: tx("Mínimo de 3 meses, luego mes a mes"), features: [[tx("Sitio para celular"), tx("Hasta 10 páginas, hosting y respaldos")], [tx("Texto si no contestas**"), tx("En tu número de seguimiento")], [tx("Reseñas de Google"), tx("Después de cada trabajo")], [tx("Ajuste del perfil"), tx("En el lanzamiento")], [tx("Llamadas y reporte"), tx("Un reporte al mes")], [tx("Cambios chicos sin tope*"), tx("En 1 día hábil")], [tx("Páginas nuevas"), tx("1 al mes incluida")]] },
    plus: { tagline: tx("Llega a clientes en inglés y en español."), kicker: tx("$0 de enganche, luego"), note: tx("Mínimo de 3 meses, luego mes a mes"), features: [[tx("Sitio bilingüe"), tx("Hasta 20 páginas, inglés y español")], [tx("Texto si no contestas**"), tx("Inglés y español")], [tx("Reseñas de Google"), tx("Inglés y español")], [tx("Ajuste del perfil"), tx("+ 2 publicaciones al mes")], [tx("Llamadas y reporte"), tx("Un reporte al mes")], [tx("Cambios chicos sin tope*"), tx("El mismo día hábil si pides antes del mediodía CT")], [tx("Páginas nuevas"), tx("2 al mes incluidas")]] },
    "own-it": { tagline: tx("Un pago. Un sitio que es tuyo."), kicker: tx("Un pago"), note: tx("Se paga al aprobar la vista previa · sin mínimo · sin garantía de leads"), features: [[tx("Sitio para celular"), tx("Hasta 10 páginas")], [tx("Archivos tuyos"), tx("Desde el lanzamiento")], [tx("Hosting + SSL"), tx("12 meses incluidos")], [tx("Cambios chicos*"), tx("12 meses, hasta 30 min al mes")], [tx("Dominio"), tx("El primer año incluido")], [tx("Sin mínimo"), tx("Sin plan mensual")]] },
  };
  return PLANS.map((plan) => ({
    ...plan,
    ...copy[plan.slug],
    name: plan.slug === "plus" ? "Plus" : plan.name,
    cta: plan.slug === "plus" ? "Plus" : plan.name,
    suffix: plan.suffix === "/mo" ? tx("/mes") : plan.suffix === "one-time" ? tx("una vez") : plan.suffix,
  }));
}

function Services({ tx, href, lang, band }: PageBits) {
  const items = [
    [tx("Diseño web"), tx("Un sitio para los trabajos de tu oficio, con llamada desde el celular, formularios y una vista previa antes de pagar."), "/web-design", tx("Ver diseño web"), "well-designed"],
    [tx("SEO"), tx("Arreglos técnicos, títulos y contenido para que te encuentren en Google en Estados Unidos."), "/seo-services", tx("Ver SEO"), "search-optimized"],
    [tx("Mantenimiento"), tx("Hosting, cambios, respaldos y una persona cuando una página tiene que cambiar."), "/website-management", tx("Ver el cuidado"), "managed-for-you"],
    [tx("Auditoría gratis"), tx("Una mirada a velocidad, indexación, títulos y si el sitio está listo para conseguir llamadas."), "/audit", tx("Pedir auditoría"), "preview"],
  ] as const;
  return (
    <>
      <ContentSchema path={href("/services")} title={tx(PAGE_META["/services"].title)} description={tx(PAGE_META["/services"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Servicios"), path: href("/services") }]} inLanguage={lang} />
      <PageHero h1={tx("Servicios de sitio y SEO para todo el país")} mark={tx("todo el país")} sub={tx("Diseño, SEO, cuidado del sitio y una auditoría gratis. Abre el que coincide con el trabajo.")} image="homepage" imageAlt={tx("Sitio de un oficio en una computadora y un celular")} />
      <Section><div className="grid grid--2">{items.map(([title, text, path, cta, icon]) => <ServiceCard key={path} title={title} text={text} href={href(path)} cta={cta} icon={icon} />)}</div></Section>
      <CtaBand h={tx("¿Listo para ver el sitio?")} mark={tx("el sitio")} sub={tx("Empieza con la vista previa. Sin tarjeta y sin obligación.")} btn={tx("Escríbenos")} href={href("/contact")} {...band} />
    </>
  );
}

type PageBits = { tx: (s: string) => string; href: (p: string) => string; lang: string; band: { secondary: string; secondaryHref: string } };

function WebDesign({ locale, tx, href, lang, band }: PageBits & { locale: Locale }) {
  const faqs = [
    { q: tx("¿Solo hacen sitios para una ciudad?"), a: tx("No. Trabajamos con negocios de servicios en Estados Unidos. Tus páginas nombran las ciudades que sí atiendes. No publicamos una copia de la misma página por cada ciudad.") },
    { q: tx("¿Qué lleva el sitio?"), a: tx("Un inicio, los servicios por los que quieres llamadas, una forma de llamar o cotizar, y lo básico que Google necesita. Ves el inicio antes de pagar.") },
    { q: tx("¿El SEO mensual está incluido?"), a: tx("El sitio queda para que los buscadores lo lean. El SEO mensual se cotiza aparte. No va dentro de los cuatro planes.") },
    { q: tx("¿Cuánto cuesta?"), a: tx("Website $97 al mes, Lead System $197, Plus $297, u Own It $1,497 de una vez. Todos empiezan con vista previa gratis.") },
  ];
  return (
    <>
      <ContentSchema path={href("/web-design")} title={tx(PAGE_META["/web-design"].title)} description={tx(PAGE_META["/web-design"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Diseño web"), path: href("/web-design") }]} faqs={faqs} serviceType={tx("Diseño web")} inLanguage={lang} />
      <PageHero eyebrow={tx("Diseño web")} h1={tx("Diseño web para negocios de servicios en todo el país")} mark={tx("todo el país")} sub={tx("Para plomeros, HVAC, electricistas, techos y los oficios que viven del teléfono. Ves el inicio antes de pagar.")} image="web-design" imageAlt={tx("Diseño web en un monitor y un celular")} />
      <Section>
        <h2 className="center"><HL text={tx("Para qué sirve el sitio")} mark={tx("el sitio")} /></h2>
        <div className="grid grid--3">
          <IconCard title={tx("Los trabajos que quieres")} text={tx("Páginas separadas para las llamadas que pagan. Una fuga y una remodelación no van en la misma pantalla.")} icon="built-for-your-trade" />
          <IconCard title={tx("Una forma de llamarte")} text={tx("El número se toca fácil en el celular. Los formularios se quedan cortos.")} icon="made-for-calls" />
          <IconCard title={tx("Legible para Google")} text={tx("Títulos claros, encabezados, páginas rápidas y un mapa del sitio.")} icon="search-optimized" />
          <IconCard title={tx("Rápido en el celular")} text={tx("Estas búsquedas ocurren en la entrada o en la cocina. La página tiene que cargar.")} icon="fast-and-secure" />
          <IconCard title={tx("Tu zona")} text={tx("Una página honesta de las ciudades que cubres. No una pila de páginas de ciudad iguales.")} icon="location" />
          <IconCard title={tx("Vista previa primero")} text={tx("Armamos el inicio de tu oficio antes de cobrar una tarjeta.")} icon="preview" />
        </div>
      </Section>
      <Section><h2 className="center"><HL text={tx("Elige el oficio con el que debe sonar el sitio")} mark={tx("sonar el sitio")} /></h2><IndustryGrid layout="index" industries={localizedIndustries(locale)} base={href("/industries")} /></Section>
      <Section narrow><h2 className="center"><HL text={tx("Preguntas de diseño")} mark={tx("Preguntas")} /></h2><Faq items={faqs} /></Section>
      <CtaBand h={tx("Ve un inicio antes de pagar")} mark={tx("antes de pagar")} sub={tx("Dinos el oficio y te mostramos una vista previa. Sin tarjeta.")} btn={tx("Pedir auditoría")} href={href("/audit")} {...band} />
    </>
  );
}

function Seo({ tx, href, lang, band }: PageBits) {
  const faqs = [
    { q: tx("¿Cuánto tarda el SEO?"), a: tx("Es un canal de largo plazo. Los arreglos técnicos pueden notarse en semanas, pero el crecimiento de posiciones y tráfico suele tomar de tres a seis meses o más.") },
    { q: tx("¿Garantizan el número uno?"), a: tx("Ninguna agencia honesta puede. Google no lo controla una agencia. Trabajamos lo que mejora la visibilidad e informamos impresiones, clics y leads.") },
    { q: tx("¿Qué incluye la auditoría?"), a: tx("Salud técnica, indexación, velocidad, celular, títulos, encabezados, huecos de contenido y enlaces internos, con una lista de qué arreglar primero.") },
    { q: tx("¿Trabajan con sitios que ya existen?"), a: tx("Sí. Podemos mejorar el sitio actual, o rehacerlo si la plataforma frena el resultado.") },
    { q: tx("¿Cómo sé que funciona?"), a: tx("Seguimos impresiones, clics, posiciones y leads con Search Console y analítica, y compartimos reportes claros.") },
  ];
  return (
    <>
      <ContentSchema path={href("/seo-services")} title={tx(PAGE_META["/seo-services"].title)} description={tx(PAGE_META["/seo-services"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: "SEO", path: href("/seo-services") }]} faqs={faqs} serviceType="SEO" inLanguage={lang} />
      <PageHero h1={tx("SEO que consigue impresiones y clics")} mark={tx("impresiones y clics")} sub={tx("SEO técnico, en la página y de contenido, para que te encuentre quien necesita el oficio.")} image="local-seo" imageAlt={tx("Pines de mapa y un panel de búsqueda")} />
      <Section>
        <div className="grid grid--3">
          <IconCard title={tx("SEO técnico")} text={tx("Rastreo, indexación, velocidad, celular, mapa del sitio y datos estructurados.")} icon="technical-seo" />
          <IconCard title={tx("En la página")} text={tx("Títulos, descripciones, encabezados y enlaces internos alineados a lo que busca el cliente.")} icon="on-page-optimization" />
          <IconCard title={tx("Investigación")} text={tx("Búsquedas con demanda real y la intención correcta, asignadas a la página que debe posicionar.")} icon="keyword-research" />
          <IconCard title={tx("Contenido")} text={tx("Páginas de servicio y artículos que contestan preguntas y arman autoridad del oficio.")} icon="content-strategy" />
          <IconCard title={tx("Local y nacional")} text={tx("Visibilidad en la zona que atiendes, del mapa local a una búsqueda más amplia.")} icon="local-seo" />
          <IconCard title={tx("Reportes")} text={tx("Impresiones, clics, posiciones y leads, con Search Console y analítica.")} icon="reporting" />
        </div>
      </Section>
      <Section tint narrow>
        <p>{tx("Trabajamos con negocios de servicios en Estados Unidos, cubras una ciudad o una zona más amplia. Primero va la base: un sitio rápido, rastreable, con títulos claros y contenido útil. Nadie puede garantizar posiciones.")}</p>
      </Section>
      <Section narrow><Faq items={faqs} /></Section>
      <CtaBand h={tx("¿Listo para que te encuentren?")} mark={tx("te encuentren")} sub={tx("Empieza con una auditoría gratis de sitio y SEO.")} btn={tx("Pedir auditoría")} href={href("/audit")} {...band} />
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
      <ContentSchema path={href("/pricing")} title={tx(PAGE_META["/pricing"].title)} description={tx(PAGE_META["/pricing"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Precios"), path: href("/pricing") }]} faqs={faqs} serviceType={tx("Diseño web")} inLanguage={lang} />
      <PageHero h1={tx("Cuatro planes. Una vista previa gratis.")} mark={tx("vista previa gratis")} sub={tx("Un sitio para tu oficio y el seguimiento que quieras. Cada plan empieza sin tarjeta y sin obligación.")} image="pricing" imageAlt={tx("Precios con una tarjeta y palomas")} />
      <Section>
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
            <h3><HL text={tx("¿Cero leads rastreados en 60 días? Condonamos dos meses.")} mark={tx("dos meses")} /></h3>
            <p>{tx("Si Lead System o Plus no produce leads rastreados en los primeros 60 días en vivo, se condonan el tercer y cuarto cargo y se quita el mínimo. Un lead rastreado es una llamada de 30 segundos o más, una respuesta al texto, o un formulario real. Una garantía por negocio.")}</p>
            <OpenDialog id="guarantee" className="link-btn">{tx("Leer la garantía")}</OpenDialog>
          </div>
        </div>
      </Section>
      <Section tint>
        <h2 className="center"><HL text={tx("Compara los planes")} mark={tx("los planes")} /></h2>
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
      <PageHero h1={tx("Una agencia de marketing para negocios en EE. UU.")} mark={tx("EE. UU.")} sub={tx("SEO, sitios, texto si no contestas y reseñas de Google para negocios de servicios. Primero la vista previa.")} image="about" imageAlt={tx("Computadora y un boceto de una página de inicio")} />
      <section className="section"><div className="container two-col">
        <div>
          <h2><HL text={tx("Con quién trabajamos")} mark={tx("trabajamos")} /></h2>
          <p>{tx("Kinexis Digital es una agencia para plomería, HVAC, electricidad, techos, jardinería y otros oficios en Estados Unidos. El cliente te encuentra en Google y llama. El sitio, el seguimiento y las reseñas se arman alrededor de eso.")}</p>
          <Link className="btn btn--primary" href={href("/contact")} prefetch={false}>{tx("Trabajar con nosotros")}</Link>
        </div>
        <div>
          <h2><HL text={tx("Qué puedes esperar")} mark={tx("esperar")} /></h2>
          <ul className="ticks ticks--orange">
            <li><b>{tx("Cuatro planes")}</b><span>{tx("Sitio, texto y reseñas")}</span></li>
            <li><b>{tx("Hosting resuelto")}</b><span>{tx("SSL y cambios chicos en los planes mensuales")}</span></li>
            <li><b>{tx("Una respuesta directa")}</b><span>{tx("Te decimos si un plan no te conviene")}</span></li>
          </ul>
        </div>
      </div></section>
      <Section tint><h2 className="center"><HL text={tx("Cómo trabajamos")} mark={tx("trabajamos")} /></h2><Stepper steps={steps} /></Section>
      <Section narrow><Faq items={faqs} /></Section>
    </>
  );
}

function Contact({ tx, href, lang }: { tx: (s: string) => string; href: (p: string) => string; lang: string }) {
  return (
    <>
      <ContentSchema path={href("/contact")} title={tx(PAGE_META["/contact"].title)} description={tx(PAGE_META["/contact"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Contacto"), path: href("/contact") }]} inLanguage={lang} />
      <PageHero h1={<HL text={tx("Empecemos con tu sitio nuevo")} mark={tx("sitio nuevo")} />} sub={tx("¿Dudas? Hablemos de si somos el equipo para tu negocio.")} image="contact" imageAlt={tx("Teléfono, sobre y burbujas de chat")} />
      <Section><div className="contact-grid">
        <Form fields={[{ label: tx("Nombre"), name: "name", required: true, auto: "given-name" }, { label: tx("Correo"), name: "email", kind: "email", required: true, auto: "email" }, { label: tx("Teléfono"), name: "phone", kind: "tel", auto: "tel" }, { label: tx("Sitio o negocio"), name: "business" }]} button={tx("Hablemos")} fast fastText={tx("Te respondemos pronto xD")} />
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
  const aside = [[tx("Velocidad"), tx("Qué tan rápido carga en el celular y en la computadora."), "audit-speed"], [tx("Búsqueda"), tx("Títulos, encabezados, indexación y lo básico de SEO."), "search-optimized"], [tx("Celular"), tx("Cómo se ve y funciona en el teléfono."), "audit-mobile"], [tx("Conversión"), tx("Si los botones y formularios convierten la visita en lead."), "audit-conversion"]] as const;
  return (
    <>
      <ContentSchema path={href("/audit")} title={tx(PAGE_META["/audit"].title)} description={tx(PAGE_META["/audit"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Auditoría"), path: href("/audit") }]} inLanguage={lang} serviceType={tx("Auditoría de sitio y SEO")} />
      <PageHero h1={tx("Pide una auditoría del sitio")} mark={tx("auditoría")} sub={tx("Mándanos tu sitio y te decimos qué arreglar primero.")} image="website-audit" imageAlt={tx("Tablero de auditoría con una lupa")} />
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
      <PageHero eyebrow={tx("Industrias")} h1={tx("Sitios para los oficios que manejas")} mark={tx("oficios que manejas")} sub={tx("Para negocios de servicios en Estados Unidos. Cada página cubre los trabajos, las páginas y el seguimiento de ese oficio.")}>
        <p className="btn-row"><Link className="btn btn--primary" href={href("/audit")} prefetch={false}>{tx("Pedir auditoría")}</Link><Link className="btn btn--ghost" href={href("/pricing")} prefetch={false}>{tx("Ver precios")}</Link></p>
      </PageHero>
      <Section><IndustryGrid industries={industries} base={href("/industries")} /></Section>
      <Section tint narrow><p>{tx("La vista previa va primero, sin tarjeta. Después el sitio es uno de cuatro planes: Website a $97 al mes, Lead System a $197, Plus a $297, u Own It por $1,497. El SEO continuo se cotiza aparte.")}</p></Section>
      <CtaBand h={tx("Ve un inicio de tu oficio")} mark={tx("tu oficio")} sub={tx("Armamos la vista previa antes de que pagues.")} btn={tx("Pedir auditoría")} href={href("/audit")} {...band} />
    </>
  );
}

function Faqs({ tx, href, lang, band }: PageBits) {
  const faqs = homeFaqs(tx);
  return (
    <>
      <ContentSchema path={href("/faqs")} title={tx(PAGE_META["/faqs"].title)} description={tx(PAGE_META["/faqs"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Preguntas"), path: href("/faqs") }]} faqs={faqs} inLanguage={lang} />
      <PageHero h1={tx("Preguntas frecuentes")} mark={tx("Preguntas")} sub={tx("Respuestas directas sobre planes, propiedad, la garantía de 60 días y cómo cancelar.")} image="faqs" imageAlt={tx("Signos de interrogación")} />
      <Section narrow><Faq items={faqs} /></Section>
      <CtaBand h={tx("¿Sigue la duda?")} mark={tx("la duda")} sub={tx("Escribe o llama. Contestamos preguntas del plan antes de que pagues.")} btn={tx("Contacto")} href={href("/contact")} {...band} />
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
              <Link href={href(`/blog/${post.slug}`)} className="post__link" prefetch={false}><div className="post__img"><DeferredImg src={post.image} alt={post.title} width={post.width} height={post.height} sizes="(max-width: 900px) 92vw, 380px" /></div></Link>
              <div className="post__body"><Link href={href(`/blog/${post.slug}`)} className="post__link" prefetch={false}><p className="eyebrow">{post.category}</p><h2 className="card-title">{post.title}</h2></Link><p>{post.excerpt}</p></div>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand h={tx("¿Quieres que lo apliquemos a tu sitio?")} mark={tx("tu sitio")} sub={tx("Empieza con una auditoría o una vista previa.")} btn={tx("Pedir auditoría")} href={href("/audit")} {...band} />
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
      <CtaBand h={tx("¿Quieres esto en tu sitio?")} mark={tx("tu sitio")} sub={tx("La auditoría es gratis. La vista previa también, antes de pagar.")} btn={tx("Pedir auditoría")} href={href("/audit")} secondary={tx("Agendar una llamada")} secondaryHref={href("/strategy-call")} />
    </>
  );
}

function Care({ tx, href, lang, band }: PageBits) {
  return (
    <>
      <ContentSchema path={href("/website-management")} title={tx(PAGE_META["/website-management"].title)} description={tx(PAGE_META["/website-management"].description)} crumbs={[{ name: tx("Inicio"), path: href("/") }, { name: tx("Mantenimiento"), path: href("/website-management") }]} serviceType={tx("Mantenimiento web")} inLanguage={lang} />
      <PageHero h1={tx("Mantenimiento del sitio")} mark={tx("Mantenimiento")} sub={tx("Hosting, cambios y seguridad para sitios de negocios en Estados Unidos.")} image="maintenance" imageAlt={tx("Paneles de cuidado con un engrane")} />
      <Section><div className="grid grid--4">
        <IconCard level={2} title={tx("Hosting")} text={tx("Hosting para que el sitio siga en línea.")} icon="hosting" />
        <IconCard level={2} title={tx("Cambios")} text={tx("Contenido y actualizaciones hechas por nosotros.")} icon="updates" />
        <IconCard level={2} title={tx("Seguridad")} text={tx("Vigilancia y respaldos.")} icon="security" />
        <IconCard level={2} title={tx("Soporte")} text={tx("Una persona real cuando necesitas un cambio.")} icon="support" />
      </div></Section>
      <Section tint><div className="center"><Link className="btn btn--primary" href={href("/update")} prefetch={false}>{tx("Pedir un cambio")}</Link></div></Section>
      <CtaBand h={tx("¿Quieres que lo carguemos nosotros?")} mark={tx("nosotros")} sub={tx("Dinos qué necesitas y lo quitamos de tu lista.")} btn={tx("Empezar")} href={href("/contact")} {...band} />
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
      <PageHero h1={tx("Mejoras y extras")} mark={tx("extras")} sub={tx("Empieza con el plan que necesitas. Agrega páginas, cuidado o texto cuando el negocio esté listo.")} image="upgrades" imageAlt={tx("Extras alrededor de un sitio")} />
      <Section><div className="grid grid--4 upgrades">{items.map(([icon, title, text, price]) => <article className="card center" key={icon}><Icon name={icon} alt={title} /><h2 className="card-title">{title}</h2><p>{text}</p><p className="upgrade__price">{price}</p></article>)}</div></Section>
      <CtaBand h={tx("¿Quieres sumar algo?")} mark={tx("sumar")} sub={tx("Te decimos qué cabe en tu plan antes de cobrarlo.")} btn={tx("Escríbenos")} href={href("/contact")} {...band} />
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
      <PageHero h1={tx("Agenda una llamada de estrategia")} mark={tx("llamada")} sub={tx("Una llamada corta para ver tu negocio, tu sitio y qué plan encaja para empresas en Estados Unidos.")} />
      <section className="section"><div className="container two-col two-col--book">
        <div>
          <h2><HL text={tx("Qué esperar")} mark={tx("esperar")} /></h2>
          <ul className="ticks ticks--expect">
            <li><span className="tick__mark" aria-hidden="true">✓</span><span>{tx("Vemos cómo te encuentran y te contactan hoy")}</span></li>
            <li><span className="tick__mark" aria-hidden="true">✓</span><span>{tx("Hablamos del trabajo que quieres que traiga el sitio")}</span></li>
            <li><span className="tick__mark" aria-hidden="true">✓</span><span>{tx("Recibes una recomendación clara, también si un plan no te conviene")}</span></li>
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
      <PageHero h1={tx("Términos de planes y cobro")} mark={tx("cobro")} sub={tx("Actualizado el 20 de octubre de 2026. Estos son los términos de los cuatro planes. El acuerdo que apruebas al pagar manda si algo difiere.")} />
      <section className="section"><div className="container container--narrow prose">
        <h2>{tx("1. Vista previa gratis")}</h2>
        <p>{tx("Cada plan empieza con una vista previa de la página de inicio. Sin tarjeta y sin obligación. Te mostramos un concepto para tu oficio. Puedes aprobarlo, pedir cambios o irte sin pagar.")}</p>
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
      <PageHero className="portfolio-hero" eyebrow={tx("Sitios reales para negocios de servicios")} h1={tx("Mira el trabajo")} mark={tx("el trabajo")} sub={tx("Los sitios baratos funcionan mal y los buenos salen caros. Te ayudamos a salir de esa esquina. Los estudios de cada proyecto están en inglés.")} image="portfolio" imageAlt={tx("Sitios de oficios en pantallas")}>
        <div className="btn-row spaced"><Link className="btn btn--primary btn--lg" href={href("/contact")} prefetch={false}>{tx("Probar sin riesgo")}</Link><Link className="btn btn--ghost btn--lg" href={href("/pricing")} prefetch={false}>{tx("Ver precios")}</Link></div>
      </PageHero>
      <Section>
        <div className="container">
          <div className="showcase__head"><div><p className="eyebrow">{tx("Trabajo")}</p><h2><HL text={tx("Sitios a la medida y plantillas")} mark={tx("plantillas")} /></h2><p className="muted">{tx("Pasa el cursor o toca para recorrer la página. El caso de estudio abre en inglés.")}</p></div></div>
          <div className="portfolio portfolio--main">{PROJECTS.map((project) => <ProjectCard key={project.slug} project={project} href={project.placeholder ? undefined : `/portfolio/${project.slug}`} hrefLang="en-US" label={tx(`Ver ${project.name}`)} ctaLabel={tx("Ver este proyecto")} />)}</div>
          <div className="showcase__head showcase__head--follow"><div><p className="eyebrow">{tx("Sitios en vivo")}</p><h2><HL text={tx("Sitios de clientes")} mark={tx("clientes")} /></h2></div></div>
          <div className="portfolio--live">{LIVE_SITES.map((site) => {
            const shot = portfolioFile(site.image, 640);
            const full = portfolioFile(site.image);
            let host = site.url;
            try { host = new URL(site.url).host.replace(/^www\./, ""); } catch { /* keep url */ }
            return (
              <a key={site.slug} className="live-site" href={site.url} target="_blank" rel="noopener noreferrer">
                <div className="shot" data-name={site.name} data-duration={12000}><div className="shot__page"><div className="shot__track"><DeferredImg src={shot} srcSet={`${shot} 640w, ${full} 1100w`} sizes="(max-width: 960px) 92vw, 380px" alt="" width={640} height={Math.round((site.height * 640) / site.width)} className="shot__img" /></div></div><span className="btn btn--primary shot__cta-overlay" aria-hidden="true">{tx("Visitar sitio")}</span></div>
                <span className="live-site__copy"><span className="live-site__status"><span className="live-site__dot" aria-hidden="true" />{tx("En vivo")}</span><span className="live-site__id"><span className="live-site__name">{site.name}</span><span className="live-site__meta"><span>{site.trade}</span><span className="live-site__host">{host}</span></span></span></span>
              </a>
            );
          })}</div>
        </div>
      </Section>
      <AuditCta eyebrow={tx("Auditoría gratis")} heading={tx("Pide una auditoría gratis y mejora el resultado")} mark={tx("el resultado")} text={tx("Te mostramos qué mejorar en el sitio. Hay auditoría gratis y de pago.")} cta={tx("Pedir auditoría")} href={href("/audit")} alt={tx("Un cohete sale de una computadora")} />
      <CtaBand h={tx("¿Quieres un sitio así?")} mark={tx("un sitio así")} sub={tx("Cuéntanos el oficio y armamos tu vista previa gratis.")} btn={tx("Quiero la vista previa")} href={href("/contact")} {...band} />
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
  const article = /^(hvac|electrical)$/i.test(industry.slug) ? tx("Un") : tx("Una");
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
        <p className="btn-row"><Link className="btn btn--primary" href={href("/audit")} prefetch={false}>{tx("Pedir auditoría")}</Link><Link className="btn btn--ghost" href={href("/pricing")} prefetch={false}>{tx("Ver precios")}</Link></p>
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
              <h2><HL text={tx(`${article} muestra de ${industry.name}, en la práctica`)} mark={tx("en la práctica")} /></h2>
              <p>{tx("Mira")} <Link href={`/portfolio/${project.slug}`} hrefLang="en-US" prefetch={false}>{project.name}</Link> {tx("para ver el tipo de página que armamos. El caso de estudio está en inglés.")}</p>
            </div>
            <ShotFrame project={project} href={`/portfolio/${project.slug}`} hrefLang="en-US" label={tx(`Ver ${project.name}`)} ctaLabel={tx("Ver este proyecto")} />
          </div>
        </Section>
      )}
      <IndustryAudit eyebrow={tx("Auditoría gratis")} heading={tx("Pide una auditoría gratis y mejora el resultado.")} mark={tx("el resultado")} text={tx("Te mostramos qué mejorar. Hay auditoría gratis y de pago.")} cta={tx("Pedir auditoría")} href={href("/audit")} alt={tx("Computadora, celular y una lupa")} checks={[
        { title: tx("Velocidad"), text: tx("Qué tan rápido carga en el celular y en la computadora."), icon: "speed" },
        { title: tx("Visibilidad"), text: tx("Si los encabezados y las páginas están listos para que un buscador los lea."), icon: "search" },
        { title: tx("Celular"), text: tx("Cómo cabe en el teléfono y qué alcanza el pulgar."), icon: "mobile" },
        { title: tx("Llamadas"), text: tx("Si el número, los botones y los formularios dejan un paso claro."), icon: "conversion" },
      ]} />
      <Section id="plans"><PlanOffer heading={tx("Sitios para tu oficio desde solo")} mark={tx("tu oficio")} href={href("/pricing")} eyebrow={tx("Cuatro planes · Una vista previa gratis")} chip={tx("$0 de enganche")} note={tx("Cada plan empieza con una vista previa, sin tarjeta y sin obligación.")} badge={tx("El más elegido")} cta={tx("Ver los cuatro planes")} plans={spanishPlans(tx)} /></Section>
      <Section tint narrow><h2 className="center"><HL text={tx(`Preguntas de ${industry.name}`)} mark={tx("Preguntas")} /></h2><Faq items={[...industry.faqs]} /></Section>
      <Section><h2 className="center"><HL text={tx("Otros oficios")} mark={tx("Otros oficios")} /></h2><IndustryGrid industries={related} base={href("/industries")} /></Section>
      <CtaBand h={tx(`Ve un inicio de ${industry.name} antes de pagar`)} mark={tx("antes de pagar")} sub={tx("Vista previa gratis, sin tarjeta. Luego eliges Website, Lead System, Plus u Own It.")} btn={tx("Pedir auditoría")} href={href("/audit")} secondary={tx("Agendar una llamada")} secondaryHref={href("/strategy-call")} />
    </>
  );
}
