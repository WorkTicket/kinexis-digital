import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageSchema } from "@/components/JsonLd";
import { CtaBand, HL, PageHero, Section, ServiceCard } from "@/components/ui";

export const metadata = pageMetadata("services");

const offerings = [
  {
    title: "Website Design",
    text: "A clear site for the work you want, with tap-to-call, short quote forms, and a homepage preview before you pay.",
    href: "/web-design",
    cta: "See Website Design",
    icon: "well-designed",
  },
  {
    title: "SEO Services",
    text: "Technical cleanup, useful page titles, and content that helps the right customers find you through Google search.",
    href: "/seo-services",
    cta: "Explore SEO",
    icon: "search-optimized",
  },
  {
    title: "Website Management",
    text: "Hosting, updates, and backups are covered, with a real person available when something on the site needs to change.",
    href: "/website-management",
    cta: "See Site Care",
    icon: "managed-for-you",
  },
  {
    title: "Free Audit",
    text: "A practical review of speed, indexing, page titles, and whether your current site makes it easy to contact you.",
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
        h1="Website Help For Service Businesses Nationwide"
        mark="Service Businesses"
        sub="We work with service businesses in every state. You get a site that is easy to call from and a clean search setup Google can understand."
        image="homepage"
        imageAlt="Contractor showing a trade website on a laptop and phone"
      />
      <Section>
        <h2 className="center"><HL text="Ways We Can Help" mark="We Can Help" /></h2>
        <p className="center muted">Choose website design, SEO, ongoing site care, or a free audit of what you already have.</p>
        <div className="grid grid--2">
          {offerings.map((item) => (
            <ServiceCard key={item.href} {...item} />
          ))}
        </div>
      </Section>
      <Section tint narrow>
        <h2 className="center"><HL text="A Clear Site Without Duplicate City Pages" mark="Duplicate City Pages" /></h2>
        <p>You don’t need dozens of copies of the same page with a different city name. We write about the services you actually offer, name the areas you cover, and give each English page one useful URL.</p>
        <p>Plans start at $97/mo and include a free homepage preview. Ongoing SEO is a separate quote, not a hidden part of a website plan.</p>
        <p className="center btn-row spaced">
          <Link className="btn btn--primary" href="/pricing" prefetch={false}>See Plans &amp; Pricing</Link>
          <Link className="btn btn--ghost" href="/industries" prefetch={false}>Browse Industries</Link>
        </p>
      </Section>
      <CtaBand h="Not Sure Where To Start?" mark="Where To Start" sub="We can review your current site or talk through the one you want to build." btn="Get a Free Audit" href="/audit" />
    </>
  );
}
