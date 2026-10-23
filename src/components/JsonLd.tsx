import { PLANS } from "@/lib/content";
import { PAGES, type PageKey, type PageMeta } from "@/lib/pages";
import type { QA } from "@/lib/content";
import { SITE } from "@/lib/site";

const Script = ({ data }: { data: unknown }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
);

const country = { "@type": "Country", name: SITE.areaServed };
const orgId = () => `${SITE.url}/#org`;
const websiteId = () => `${SITE.url}/#website`;

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
export function SiteSchema() {
  const u = SITE.url;
  const sameAs = Object.values(SITE.social).filter(Boolean);
  return <Script data={{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId(),
        name: SITE.name,
        url: `${u}/`,
        logo: { "@type": "ImageObject", url: `${u}/favicon-512.webp`, width: 512, height: 512 },
        image: `${u}${SITE.ogImage}`,
        description: SITE.description,
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
        "@id": `${u}/#service`,
        name: SITE.name,
        url: `${u}/`,
        image: `${u}${SITE.ogImage}`,
        description: SITE.description,
        telephone: SITE.phoneE164,
        email: SITE.email,
        priceRange: "$97-$1497",
        areaServed: country,
        address: { "@type": "PostalAddress", addressCountry: "US" },
        provider: { "@id": orgId() },
        parentOrganization: { "@id": orgId() },
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
        "@id": websiteId(),
        url: `${u}/`,
        name: SITE.name,
        description: SITE.description,
        inLanguage: "en-US",
        publisher: { "@id": orgId() },
      },
    ],
  }} />;
}

/** Schema for pages that are not in the PAGES map, such as industry details. */
export function ContentSchema({ path, title, description, crumbs: trail, faqs, serviceType, inLanguage = "en-US" }: {
  path: string;
  title: string;
  description: string;
  crumbs: { name: string; path: string }[];
  faqs?: QA[];
  serviceType?: string;
  inLanguage?: string;
}) {
  const url = absolute(path);
  const graph: unknown[] = [
    {
      "@type": "WebPage",
      "@id": `${url}#page`,
      url,
      name: title,
      description,
      isPartOf: { "@id": websiteId() },
      about: { "@id": `${SITE.url}/#service` },
      inLanguage,
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
      provider: { "@id": orgId() },
      areaServed: country,
    });
  }
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
  return <Script data={{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: title,
        description,
        image: [image.startsWith("http") ? image : `${SITE.url}${image}`],
        datePublished: date,
        dateModified: date,
        inLanguage,
        articleSection: section,
        author: { "@id": orgId() },
        publisher: { "@id": orgId() },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#page` },
        isPartOf: { "@id": websiteId() },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: title,
        description,
        inLanguage: "en-US",
        isPartOf: { "@id": websiteId() },
      },
      crumbs([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: title, path },
      ]),
    ],
  }} />;
}

export function ProjectSchema({ name, description, path, image, trade }: {
  name: string;
  description: string;
  path: string;
  image: string;
  trade: string;
}) {
  const url = absolute(path);
  return <Script data={{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name: `Web design for ${name}`,
        description,
        url,
        image: image.startsWith("http") ? image : `${SITE.url}${image}`,
        about: trade,
        creator: { "@id": orgId() },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: `Web Design For ${name}`,
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
