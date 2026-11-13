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

/** Ahrefs and similar auditors only accept ISO 3166-1 Alpha-2 regions, so Latam uses `es` (not `es-419`). */
function schemaLanguage(locale: Locale) {
  return locale === "en" ? "en-US" : locale === "es-ES" ? "es-ES" : "es";
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
  const language = schemaLanguage(locale);
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
        knowsAbout: ["Website plans", "Web design", "Search engine optimization", "Website management", "Local SEO", "Missed-call text-back"],
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
          name: "Website plans and services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Plans", url: `${u}/pricing` } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design", url: `${u}/web-design` } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO Services", url: `${u}/seo-services` } },
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
export function ContentSchema({ path, title, description, crumbs: trail, faqs, serviceType, inLanguage = "en-US", products, audienceType, exampleItems }: {
  path: string;
  title: string;
  description: string;
  crumbs: { name: string; path: string }[];
  faqs?: QA[];
  serviceType?: string;
  inLanguage?: string;
  products?: { slug: string; name: string; tagline: string; price: string; suffix: string }[];
  /** BusinessAudience.audienceType, e.g. "Plumbing companies". */
  audienceType?: string;
  /** Live/demo example cards for ItemList on industry pages. */
  exampleItems?: { name: string; url: string }[];
}) {
  const locale = localeForPath(path, inLanguage);
  const url = absolute(path);
  const isFaqPage = /\/faqs\/?$/.test(path);
  const pageType = isFaqPage && faqs?.length ? "FAQPage" : "WebPage";
  const pageNode: Record<string, unknown> = {
    "@type": pageType,
    "@id": `${url}#page`,
    url,
    name: title,
    description,
    isPartOf: { "@id": websiteId(locale) },
    about: { "@id": `${localeUrl(locale)}#service` },
    inLanguage: schemaLanguage(locale),
  };
  if (pageType === "FAQPage" && faqs?.length) pageNode.mainEntity = faqEntities(faqs);
  const graph: unknown[] = [pageNode, crumbs(trail)];
  if (serviceType) {
    const monthlyOffer = {
      "@type": "Offer",
      url: `${SITE.url}/pricing`,
      priceCurrency: "USD",
      price: "97",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "97",
        priceCurrency: "USD",
        unitText: "MONTH",
      },
    };
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: serviceType,
      serviceType,
      description,
      url,
      provider: { "@id": orgId(locale) },
      areaServed: country,
      offers: monthlyOffer,
      ...(audienceType
        ? { audience: { "@type": "BusinessAudience", audienceType } }
        : {}),
    });
  }
  if (exampleItems?.length) {
    graph.push({
      "@type": "ItemList",
      "@id": `${url}#examples`,
      name: `${serviceType ?? title} examples`,
      itemListElement: exampleItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url.startsWith("http") ? item.url : absolute(item.url),
      })),
    });
  }
  if (products?.length) graph.push(...products.map((plan) => productEntity(url, plan, locale)));
  // Extra FAQPage node only when FAQs appear on a non-FAQ URL (service pages, etc.).
  if (faqs?.length && pageType !== "FAQPage") {
    graph.push({ "@type": "FAQPage", "@id": `${url}#faq`, url, mainEntity: faqEntities(faqs) });
  }
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
    name: locale === "en" ? `${plan.name} plan` : `Plan ${plan.name}`,
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
    const monthlyOffer = {
      "@type": "Offer",
      url: `${SITE.url}/pricing`,
      priceCurrency: "USD",
      price: "97",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "97",
        priceCurrency: "USD",
        unitText: "MONTH",
      },
    };
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: p.service,
      serviceType: p.service,
      description: p.description,
      url,
      provider: { "@id": orgId() },
      areaServed: country,
      ...(page === "web-design"
        ? {
            offers: monthlyOffer,
            audience: { "@type": "BusinessAudience", audienceType: "Contractor companies" },
          }
        : {}),
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

export function ArticleSchema({ title, description, path, image, date, modified, section, faqs, inLanguage = "en-US" }: {
  title: string;
  description: string;
  path: string;
  image: string;
  date: string;
  modified?: string;
  section: string;
  faqs?: QA[];
  inLanguage?: string;
}) {
  const url = absolute(path);
  const locale = localeForPath(path, inLanguage);
  const blogPath = locale === "en" ? "/blog" : locale === "es-ES" ? "/es-es/blog" : "/es/blog";
  const homePath = locale === "en" ? "/" : locale === "es-ES" ? "/es-es" : "/es";
  const published = date.includes("T") ? date : `${date}T08:00:00-05:00`;
  let modifiedTime = modified ? (modified.includes("T") ? modified : `${modified}T08:00:00-05:00`) : undefined;
  // Google rejects Article when dateModified is earlier than datePublished.
  if (modifiedTime && new Date(modifiedTime).getTime() < new Date(published).getTime()) {
    modifiedTime = published;
  }
  const logoUrl = `${SITE.url}/favicon-512.webp`;
  const publisher = {
    "@type": "Organization",
    "@id": orgId(locale),
    name: SITE.name,
    url: localeUrl(locale),
    logo: { "@type": "ImageObject", url: logoUrl, width: 512, height: 512 },
  };
  const graph: Record<string, unknown>[] = [
      {
        // BlogPosting is the primary type; Article is included for auditors that look for it.
        "@type": ["BlogPosting", "Article"],
        "@id": `${url}#article`,
        headline: title,
        description,
        image: [image.startsWith("http") ? image : `${SITE.url}${image}`],
        datePublished: published,
        dateModified: modifiedTime ?? published,
        inLanguage: schemaLanguage(locale),
        articleSection: section,
        author: { "@type": "Organization", "@id": orgId(locale), name: SITE.name, url: localeUrl(locale) },
        // Publisher must be self-contained (name + logo) for Article rich results.
        publisher,
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
  ];
  if (faqs?.length) {
    graph.push({ "@type": "FAQPage", "@id": `${url}#faq`, url, mainEntity: faqEntities(faqs) });
  }
  return <Script data={{
    "@context": "https://schema.org",
    "@graph": graph,
  }} />;
}

export function WebApplicationSchema({
  name,
  description,
  path,
  applicationCategory = "BusinessApplication",
  trail,
  faqs,
}: {
  name: string;
  description: string;
  path: string;
  applicationCategory?: string;
  trail?: { name: string; path: string }[];
  faqs?: QA[];
}) {
  const url = absolute(path);
  const breadcrumb = trail?.length
    ? trail
    : path.startsWith("/tools/")
      ? [
          { name: "Home", path: "/" },
          { name: "Tools", path },
          { name, path },
        ]
      : [
          { name: "Home", path: "/" },
          { name, path },
        ];
  const graph: unknown[] = [
    {
      "@type": "WebApplication",
      "@id": `${url}#app`,
      name,
      description,
      url,
      applicationCategory,
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      provider: { "@id": orgId() },
    },
    {
      "@type": "WebPage",
      "@id": `${url}#page`,
      url,
      name,
      description,
      isPartOf: { "@id": websiteId() },
    },
    crumbs(breadcrumb),
  ];
  if (faqs?.length) {
    graph.push({ "@type": "FAQPage", "@id": `${url}#faq`, url, mainEntity: faqEntities(faqs) });
  }
  return <Script data={{
    "@context": "https://schema.org",
    "@graph": graph,
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
