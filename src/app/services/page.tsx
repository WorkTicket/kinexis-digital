import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageSchema } from "@/components/JsonLd";
import { CtaBand, HL, PageHero, Section, ServiceCard } from "@/components/ui";

export const metadata = pageMetadata("services");

const offerings = [
  {
    title: "Website Design",
    text: "A site for the jobs your trade actually gets, with tap-to-call, quote forms, and a homepage preview before you pay.",
    href: "/web-design",
    cta: "See Website Design",
    icon: "well-designed",
  },
  {
    title: "SEO Services",
    text: "Technical fixes, page titles, and content so customers across the United States can find the business on Google.",
    href: "/seo-services",
    cta: "Explore SEO",
    icon: "search-optimized",
  },
  {
    title: "Website Management",
    text: "Hosting, updates, backups, and a person to call when a page needs to change.",
    href: "/website-management",
    cta: "See Site Care",
    icon: "managed-for-you",
  },
  {
    title: "Free Audit",
    text: "A look at speed, indexing, titles, and whether the current site is set up to earn calls.",
    href: "/audit",
    cta: "Get a Free Audit",
    icon: "preview",
  },
] as const;

export default function Page() {
  return (
    <>
      <PageSchema
        page="services"
        items={offerings.map((item) => ({ name: item.title, path: item.href }))}
      />
      <PageHero
        eyebrow="Services"
        h1="Website and SEO Services for the Whole Country"
        mark="Whole Country"
        sub="Kinexis Digital works with service businesses in every state. The offer is the same nationwide: a site people can call from, and search setup Google can read."
        image="homepage"
        imageAlt="Contractor showing a trade website on a laptop and phone"
      />
      <Section>
        <h2 className="center"><HL text="What You Can Hire Us For" mark="Hire Us For" /></h2>
        <p className="center muted">Website design, SEO, site care, and a free audit. Open the one that matches the job.</p>
        <div className="grid grid--2">
          {offerings.map((item) => (
            <ServiceCard key={item.href} {...item} />
          ))}
        </div>
      </Section>
      <Section tint narrow>
        <h2 className="center"><HL text="One Site, Not a Page for Every City" mark="Every City" /></h2>
        <p>A nationwide company does not need fifty copies of the homepage with the city name swapped. That pattern gets ignored. We write the services you sell, name the areas you actually cover, and keep a single English URL for each page.</p>
        <p>Plans start at $97/mo with a free homepage preview. Ongoing SEO is quoted on its own. It is not hidden inside the website plans.</p>
        <p className="center btn-row spaced">
          <Link className="btn btn--primary" href="/pricing" prefetch={false}>See Plans &amp; Pricing</Link>
          <Link className="btn btn--ghost" href="/industries" prefetch={false}>Browse Industries</Link>
        </p>
      </Section>
      <CtaBand h="Not Sure Which Service You Need?" mark="You Need" sub="Start with a free look at the site you have, or the one you wish you had." btn="Get a Free Audit" href="/audit" />
    </>
  );
}
