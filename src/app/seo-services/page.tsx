import { pageMetadata } from "@/lib/seo";
import { SEO_FAQS } from "@/lib/content";
import { CtaBand, Faq, HL, IconCard, PageHero, Section } from "@/components/ui";
import { PageSchema } from "@/components/JsonLd";

export const metadata = pageMetadata("seo-services");

export default function Page() {
  return (
    <>
      <PageSchema page="seo-services" faqs={SEO_FAQS} />
      <PageHero h1="SEO Services That Drive Impressions & Clicks" mark="Impressions & Clicks" sub="Technical, on-page and content SEO that helps the right customers find your business on Google." image="local-seo" imageAlt="Map pins and a local search panel" fallbackTrack={{ mobile: "-0.05em", desktop: "-0.05em" }} />
      <Section>
        <h2 className="center"><HL text="What Our SEO Services Include" mark="SEO Services" /></h2>
        <div className="grid grid--3">
          <IconCard title="Technical SEO" text="Crawlability, indexing, site speed, mobile usability, sitemaps and structured data so search engines can understand your site." icon="technical-seo" />
          <IconCard title="On-Page Optimization" text="Page titles, meta descriptions, headings and internal links tuned to the phrases your customers search for." icon="on-page-optimization" />
          <IconCard title="Keyword Research" text="We find the searches with real demand and the right intent, and map them to the pages that should rank." icon="keyword-research" />
          <IconCard title="Content Strategy" text="Helpful service pages and articles that answer customer questions and build topical authority." icon="content-strategy" />
          <IconCard title="Local & Nationwide SEO" text="Visibility in the areas you serve, from local map results to broader national search." icon="local-seo" />
          <IconCard title="Reporting" text="Clear reporting on impressions, clicks, rankings and leads from Google Search Console and analytics." icon="reporting" />
        </div>
      </Section>
      <Section tint narrow>
        <h2 className="center"><HL text="How We Approach SEO" mark="SEO" /></h2>
        <p>We work with service businesses across the United States, whether you cover one city or a wider service area. Strong SEO starts with a solid foundation: a fast, crawlable site with clear page titles and descriptions, a logical structure and helpful content for every service you offer. We fix that foundation first, then build on it with new content and ongoing optimization.</p>
        <p>We measure progress in impressions, clicks and leads rather than vanity metrics, and we are upfront that SEO takes time and that no one can guarantee rankings.</p>
      </Section>
      <Section narrow>
        <h2 className="center"><HL text="SEO Questions" mark="Questions" /></h2>
        <Faq items={SEO_FAQS} />
      </Section>
      <CtaBand h="Ready to Get Found on Google?" mark="on Google" sub="Start with a free website and SEO audit." btn="Get a Free Audit" href="/audit" />
    </>
  );
}
