import { pageMetadata } from "@/lib/seo";
import { SEO_FAQS } from "@/lib/content";
import { CtaBand, Faq, HL, IconCard, PageHero, Section } from "@/components/ui";
import { PageSchema } from "@/components/JsonLd";

export const metadata = pageMetadata("seo-services");

export default function Page() {
  return (
    <>
      <PageSchema page="seo-services" faqs={SEO_FAQS} />
      <PageHero className="seo-hero" h1="SEO That Helps The Right People Find You" mark="Find You" sub="We improve the technical setup, pages, and content that help customers discover your business through Google." image="local-seo" imageAlt="Map pins and a local search panel" fallbackTrack={{ mobile: "-0.05em", desktop: "-0.05em" }} />
      <Section>
        <h2 className="center"><HL text="What We Work On" mark="Work On" /></h2>
        <div className="grid grid--3">
          <IconCard title="Technical Setup" text="We check crawling, indexing, speed, mobile use, sitemaps, and structured data so search engines can read the site." icon="technical-seo" />
          <IconCard title="Page Improvements" text="We refine titles, descriptions, headings, and internal links around the way your customers search." icon="on-page-optimization" />
          <IconCard title="Search Research" text="We look for real demand and useful intent, then match each search to the page that can answer it." icon="keyword-research" />
          <IconCard title="Useful Content" text="We plan service pages and articles that answer real questions instead of adding words just to fill a page." icon="content-strategy" />
          <IconCard title="Local Or Nationwide Reach" text="The work can focus on the towns you serve, broader national searches, or a practical mix of both." icon="local-seo" />
          <IconCard title="Reports You Can Read" text="You see impressions, clicks, positions, and leads from Search Console and analytics in a clear report." icon="reporting" />
        </div>
      </Section>
      <Section tint narrow>
        <h2 className="center"><HL text="How The Work Is Prioritized" mark="Prioritized" /></h2>
        <p>We start with the foundation: a fast site that search engines can crawl, clear page titles and descriptions, an organized structure, and useful information for each service. Once that is sound, we can add content and continue improving the pages that matter most.</p>
        <p>Progress is measured through impressions, clicks, and leads. SEO takes time, and no honest provider can promise a particular ranking.</p>
      </Section>
      <Section narrow>
        <h2 className="center"><HL text="Common SEO Questions" mark="SEO Questions" /></h2>
        <Faq items={SEO_FAQS} />
      </Section>
      <CtaBand h="Want To Know What Google Sees?" mark="Google Sees" sub="Start with a free review of your website and search setup." btn="Get a Free Audit" href="/audit" />
    </>
  );
}
