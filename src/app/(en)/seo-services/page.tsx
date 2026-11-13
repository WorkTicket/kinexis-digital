import { pageMetadata } from "@/lib/seo";
import { SEO_FAQS } from "@/lib/content";
import { CtaBand, Faq, HL, IconCard, MediaSplit, PageHero, Section } from "@/components/ui";
import { PageSchema } from "@/components/JsonLd";

export const metadata = pageMetadata("seo-services");

export default function Page() {
  return (
    <>
      <PageSchema page="seo-services" faqs={SEO_FAQS} />
      <PageHero className="seo-hero" h1="SEO That Helps The Right People Find You" mark="Find You" sub="We improve the technical setup, pages, and content that help customers discover your business through Google." image="local-seo" imageAlt="Map pins and a local search panel" />
      <Section>
        <h2 className="center"><HL text="What We Work On" mark="Work On" /></h2>
        <div className="grid grid--3">
          <IconCard title="Technical Setup" text="We check crawling, indexing, speed, mobile use, sitemaps, and structured data so Google can read the site." icon="technical-seo" />
          <IconCard title="Page Improvements" text="We refine titles, descriptions, headings, and internal links around how your customers actually search." icon="on-page-optimization" />
          <IconCard title="Search Research" text="We look for real demand and useful intent, then match each search to the page that can answer it clearly." icon="keyword-research" />
          <IconCard title="Useful Content" text="We plan service pages and articles that answer real questions instead of adding words just to fill a page." icon="content-strategy" />
          <IconCard title="Local Or Nationwide Reach" text="The work can focus on the towns you serve, broader national searches, or a practical mix of both areas." icon="local-seo" />
          <IconCard title="Reports You Can Read" text="You see impressions, clicks, positions, and leads from Search Console and analytics in one clear report." icon="reporting" />
        </div>
      </Section>
      <Section tint>
        <MediaSplit image="local-seo" alt="Local search panel and map pins for service businesses">
          <h2><HL text="How The Work Is Prioritized" mark="Prioritized" /></h2>
          <p>We start with the foundation: a fast site that search engines can crawl, clear page titles and descriptions, an organized structure, and useful information for each service. Once that is sound, we can add content and continue improving the pages that matter most.</p>
          <p>Progress is measured through impressions, clicks, and leads. SEO takes time, and no honest provider can promise a particular ranking.</p>
        </MediaSplit>
      </Section>
      <Section narrow>
        <h2 className="center"><HL text="Common SEO Questions" mark="SEO Questions" /></h2>
        <Faq items={SEO_FAQS} />
      </Section>
      <CtaBand h="Want A Site Built To Get Found?" mark="Built To Get Found" sub="Start with a free homepage preview built for search and local calls." btn="Get My Free Preview" href="/contact" />
    </>
  );
}
