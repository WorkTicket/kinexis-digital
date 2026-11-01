import { PLANS } from "@/lib/content";
import { PAGES, type PageKey, type PageMeta } from "@/lib/pages";
import type { QA } from "@/lib/content";
import { SITE } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

const Script = ({ data }: { data: unknown }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
);

const country = { "@type": "Country", name: SITE.areaServed };
const orgId = (locale: Locale = "en") => `${localeUrl(locale)}#org`;
const websiteId = (locale: Locale = "en") => `${localeUrl(locale)}#website`;

function localeUrl(locale: Locale) {
  if (locale === "es-ES") return `${SITE.url}/es-es`;
  if (locale === "es-419") return `${SITE.url}/es`;
  return `${SITE.url}/`;
}

function localeDescription(locale: Locale) {
  if (locale === "en") return SITE.description;
  return "Sitios web rápidos y profesionales para negocios de servicios en Estados Unidos, con una vista previa gratis antes de elegir un plan.";
}

function localeForPath(path: string, fallback: string): Locale {
  if (path === "/es-es" || path.startsWith("/es-es/")) return "es-ES";
  if (path === "/es" || path.startsWith("/es/")) return "es-419";
  if (fallback === "es-ES") return "es-ES";
  if (fallback.startsWith("es")) return "es-419";
  return "en";
}

function schemaLanguage(locale: Locale) {
  return locale === "en" ? "en-US" : locale === "es-ES" ? "es-ES" : "es-419";
}

function faqEntities(faqs: QA[]) {
  return faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  }));
}

function crumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.path === "/" ? `${SITE.url}/` : `${SITE.url}${crumb.path}`,
    })),
  };
}

function absolute(path: string) {
  return path === "/" ? `${SITE.url}/` : `${SITE.url}${path}`;
}

/** Sitewide entities (rendered once in the root layout). */
export function SiteSchema({ locale = "en" }: { locale?: Locale }) {
  const u = SITE.url;
  const sameAs = Object.values(SITE.social).filter(Boolean);
  const siteUrl = localeUrl(locale);
  const language = locale === "en" ? "en-US" : locale === "es-ES" ? "es-ES" : "es-419";
  const description = localeDescription(locale);
  return <Script data={{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
         "@id": orgId(locale),
        name: SITE.name,
         url: siteUrl,
        logo: { "@type": "ImageObject", url: `${u}/favicon-512.webp`, width: 512, height: 512 },
        image: `${u}${SITE.ogImage}`,
         description,
        email: SITE.email,
        telephone: SITE.phoneE164,
        areaServed: country,
        address: { "@type": "PostalAddress", addressCountry: "US" },
        contactPoint: [{
          "@type": "ContactPoint",
          telephone: SITE.phoneE164,
          email: SITE.email,
          contactType: "customer support",
          areaServed: "US",
          availableLanguage: [...SITE.languages],
        }],
        knowsAbout: ["Search engine optimization", "Digital marketing", "Web design", "Website management", "Local SEO"],
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "ProfessionalService",
         "@id": `${siteUrl}#service`,
        name: SITE.name,
         url: siteUrl,
        image: `${u}${SITE.ogImage}`,
         description,
        telephone: SITE.phoneE164,
        email: SITE.email,
        priceRange: "$97-$1497",
        areaServed: country,
        address: { "@type": "PostalAddress", addressCountry: "US" },
         parentOrganization: { "@id": orgId(locale) },
        ...(sameAs.length ? { sameAs } : {}),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Digital marketing services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO Services", url: `${u}/seo-services` } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design", url: `${u}/web-design` } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Management", url: `${u}/website-management` } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Free SEO Audit", url: `${u}/audit` } },
          ],
        },
      },
      {
        "@type": "WebSite",
         "@id": websiteId(locale),
         url: siteUrl,
        name: SITE.name,
         description,
         inLanguage: language,
         publisher: { "@id": orgId(locale) },
      },
    ],
  }} />;
}

/** Schema for pages that are not in the PAGES map, such as industry details. */
export function ContentSchema({ path, title, description, crumbs: trail, faqs, serviceType, inLanguage = "en-US", products }: {
  path: string;
  title: string;
  description: string;
  crumbs: { name: string; path: string }[];
  faqs?: QA[];
  serviceType?: string;
  inLanguage?: string;
  products?: { slug: string; name: string; tagline: string; price: string; suffix: string }[];
}) {
  const locale = localeForPath(path, inLanguage);
  const url = absolute(path);
  const graph: unknown[] = [
    {
      "@type": "WebPage",
      "@id": `${url}#page`,
      url,
      name: title,
      description,
       isPartOf: { "@id": websiteId(locale) },
       about: { "@id": `${localeUrl(locale)}#service` },
       inLanguage: schemaLanguage(locale),
    },
    crumbs(trail),
  ];
  if (serviceType) {
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: serviceType,
      serviceType,
      description,
      url,
       provider: { "@id": orgId(locale) },
      areaServed: country,
    });
  }
  if (products?.length) graph.push(...products.map((plan) => productEntity(url, plan, locale)));
  if (faqs?.length) graph.push({ "@type": "FAQPage", "@id": `${url}#faq`, url, mainEntity: faqEntities(faqs) });
  return <Script data={{ "@context": "https://schema.org", "@graph": graph }} />;
}

function offerCatalog(url: string) {
  return {
    "@type": "OfferCatalog",
    "@id": `${url}#offers`,
    name: "Website and marketing plans",
    itemListElement: PLANS.map((plan) => {
      const price = plan.price.replace(/[^0-9.]/g, "");
      const monthly = plan.suffix.startsWith("/");
      return {
        "@type": "Offer",
         name: `${plan.name} plan`,
        description: plan.tagline,
        price,
        priceCurrency: "USD",
        url,
        availability: "https://schema.org/InStock",
        ...(monthly ? {
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price,
            priceCurrency: "USD",
            unitCode: "MON",
          },
        } : {}),
      };
    }),
  };
}

function productEntity(url: string, plan: { slug: string; name: string; tagline: string; price: string; suffix: string }, locale: Locale = "en") {
  const price = plan.price.replace(/[^0-9.]/g, "");
  const monthly = plan.suffix.startsWith("/") || plan.suffix.startsWith("mes");
  return {
    "@type": "Product",
    "@id": `${url}#plan-${plan.slug}`,
    name: `${plan.name} plan`,
    description: plan.tagline,
    image: `${SITE.url}${SITE.ogImage}`,
    category: "Website design plan",
    brand: { "@id": orgId(locale) },
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      url,
      ...(monthly ? { priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "USD", unitCode: "MON" } } : {}),
    },
  };
}

/** Per-page schema: WebPage, breadcrumbs, services, offers and FAQs. Only for indexable pages. */
export function PageSchema({ page, faqs, items }: {
  page: PageKey;
  faqs?: QA[];
  items?: { name: string; path: string }[];
}) {
  const p = PAGES[page] as PageMeta;
  if (!p.indexable) return null;
  const url = absolute(p.path);
  const pageNode: Record<string, unknown> = {
    "@type": p.pageType ?? "WebPage",
    "@id": `${url}#page`,
    url,
    name: p.title,
    description: p.description,
    isPartOf: { "@id": websiteId() },
     about: { "@id": `${SITE.url}/#service` },
    inLanguage: "en-US",
    primaryImageOfPage: { "@type": "ImageObject", url: `${SITE.url}${SITE.ogImage}` },
  };
  if (p.pageType === "FAQPage" && faqs?.length) pageNode.mainEntity = faqEntities(faqs);
  const graph: unknown[] = [pageNode];
  if (p.path !== "/") {
    graph.push(crumbs([
      { name: "Home", path: "/" },
      { name: p.crumb ?? p.title.split(" | ")[0], path: p.path },
    ]));
  }
  if (p.service) {
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: p.service,
      serviceType: p.service,
      description: p.description,
      url,
      provider: { "@id": orgId() },
      areaServed: country,
      ...(page === "pricing" ? { hasOfferCatalog: offerCatalog(url) } : {}),
    });
  }
  if (page === "pricing") {
    graph.push(...PLANS.map((plan) => productEntity(url, plan)));
  }
  if (items?.length) {
    graph.push({
      "@type": "ItemList",
      "@id": `${url}#list`,
      name: p.crumb ?? p.title,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absolute(item.path),
      })),
    });
  }
  if (faqs?.length && p.pageType !== "FAQPage") {
    graph.push({ "@type": "FAQPage", "@id": `${url}#faq`, url, mainEntity: faqEntities(faqs) });
  }
  return <Script data={{ "@context": "https://schema.org", "@graph": graph }} />;
}

export function ArticleSchema({ title, description, path, image, date, section, inLanguage = "en-US" }: {
  title: string;
  description: string;
  path: string;
  image: string;
  date: string;
  section: string;
  inLanguage?: string;
}) {
  const url = absolute(path);
  const locale = localeForPath(path, inLanguage);
  const blogPath = locale === "en" ? "/blog" : locale === "es-ES" ? "/es-es/blog" : "/es/blog";
  const homePath = locale === "en" ? "/" : locale === "es-ES" ? "/es-es" : "/es";
  const dateTime = date.includes("T") ? date : `${date}T09:00:00-05:00`;
  return <Script data={{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: title,
        description,
        image: [image.startsWith("http") ? image : `${SITE.url}${image}`],
         datePublished: dateTime,
         inLanguage: schemaLanguage(locale),
        articleSection: section,
         author: { "@type": "Organization", "@id": orgId(locale), name: SITE.name, url: localeUrl(locale) },
         publisher: { "@id": orgId(locale) },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#page` },
         isPartOf: { "@id": websiteId(locale) },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: title,
        description,
         inLanguage: schemaLanguage(locale),
         isPartOf: { "@id": websiteId(locale) },
      },
      crumbs([
         { name: locale === "en" ? "Home" : "Inicio", path: homePath },
         { name: "Blog", path: blogPath },
        { name: title, path },
      ]),
    ],
  }} />;
}

export function ProjectSchema({ name, description, path, image, trade, isTemplate }: {
  name: string;
  description: string;
  path: string;
  image: string;
  trade: string;
  isTemplate: boolean;
}) {
  const url = absolute(path);
  const project = {
    "@type": isTemplate ? ["Product", "CreativeWork"] : "CreativeWork",
    "@id": `${url}#work`,
    name: `Website template for ${name}`,
    description,
    url,
    image: image.startsWith("http") ? image : `${SITE.url}${image}`,
    about: trade,
    category: `${trade} website template`,
    creator: { "@id": orgId() },
    ...(isTemplate ? {
      brand: { "@id": orgId() },
      offers: PLANS.map((plan) => ({
        "@type": "Offer",
        name: `${plan.name} website plan`,
        price: plan.price.replace(/[^0-9.]/g, ""),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        url: `${SITE.url}/pricing`,
        ...(plan.suffix.startsWith("/") ? {
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: plan.price.replace(/[^0-9.]/g, ""),
            priceCurrency: "USD",
            unitCode: "MON",
          },
        } : {}),
      })),
    } : {}),
    inLanguage: "en-US",
  };
  return <Script data={{
    "@context": "https://schema.org",
    "@graph": [
      project,
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: `Website Template For ${name}`,
        description,
        inLanguage: "en-US",
        isPartOf: { "@id": websiteId() },
      },
      crumbs([
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/portfolio" },
        { name, path },
      ]),
    ],
  }} />;
}
