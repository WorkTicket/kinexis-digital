import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDIES, caseStudyBySlug } from "@/data/caseStudies";
import { contentMetadata } from "@/lib/seo";
import { SITE_CONTENT_UPDATED } from "@/lib/pages";
import { Section, HL } from "@/components/ui";
import { DeferredImg } from "@/components/DeferredImg";
import { ArticleSchema } from "@/components/JsonLd";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudyBySlug(slug);
  if (!study) return {};
  const description = `${study.summary} See the project approach and live website.`.replace(
    /\s+/g,
    " ",
  );
  return contentMetadata({
    path: `/case-studies/${study.slug}`,
    title: `${study.title} Case Study`,
    description: description.length > 155 ? `${description.slice(0, 152).trimEnd()}…` : description,
    image: study.overviewImage,
    imageAlt: `${study.title} website screenshot`,
    ogType: "article",
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudyBySlug(slug);
  if (!study) notFound();
  const industryPage =
    study.slug === "preferred-plumbing"
      ? { href: "/industries/plumbing", label: "Website design for plumbers" }
      : study.slug === "a1-property-services"
        ? { href: "/industries/landscaping", label: "Website design for landscaping companies" }
        : null;

  return (
    <>
      <ArticleSchema
        title={`${study.title} Case Study`}
        description={study.problem}
        path={`/case-studies/${study.slug}`}
        image={study.overviewImage}
        date={SITE_CONTENT_UPDATED}
        section={study.trade}
        articleType="Article"
        trail={[
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
          { name: study.title, path: `/case-studies/${study.slug}` },
        ]}
      />
      <Section>
        <article className="case-study">
          <header className="case-study__hero">
            <div className="case-study__intro">
              <nav className="case-study__breadcrumb" aria-label="Breadcrumb">
                <Link href="/portfolio" prefetch={false}>Portfolio</Link><span aria-hidden="true">/</span><span>Client case study</span>
              </nav>
              <p className="eyebrow">Client case study <span aria-hidden="true">·</span> {study.trade}</p>
              <h1>{study.title}</h1>
              <p className="case-study__summary">{study.summary}</p>
              <div className="case-study__actions">
                <a className="btn btn--primary" href={study.url} rel="noopener noreferrer" target="_blank">
                  Visit the live website
                </a>
                {industryPage ? <Link href={industryPage.href} prefetch={false}>{industryPage.label}</Link> : null}
              </div>
              <dl className="case-study__facts">
                <div><dt>Industry</dt><dd>{study.trade.split(" · ")[0]}</dd></div>
                <div><dt>Project</dt><dd>Website design</dd></div>
                <div><dt>Website</dt><dd><a href={study.url} rel="noopener noreferrer" target="_blank">{new URL(study.url).hostname.replace(/^www\./, "")}</a></dd></div>
              </dl>
            </div>
            <figure className="case-study__overview">
              <a href={`${study.overviewImage.replace("-1200w", "-2160w")}?v=1`} target="_blank" rel="noopener noreferrer" aria-label={`Open the ${study.title} project overview at full size`}>
                <DeferredImg
                  src={`${study.overviewImage}?v=1`}
                  srcSet={`${study.overviewImage.replace("-1200w", "-640w")}?v=1 640w, ${study.overviewImage}?v=1 1200w, ${study.overviewImage.replace("-1200w", "-2160w")}?v=1 2160w`}
                  sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1120px) 46vw, 520px"
                  alt={`${study.title} website redesign project overview`}
                  width={study.overviewWidth}
                  height={study.overviewHeight}
                  eager
                />
              </a>
              <figcaption>Project overview · Select the image to view it at full size.</figcaption>
            </figure>
          </header>

          <section className="case-study__section" aria-labelledby="case-study-challenge">
            <div className="case-study__section-heading">
              <p className="eyebrow">The brief</p>
              <h2 id="case-study-challenge"><HL text="The challenge" mark="challenge" /></h2>
            </div>
            <div className="case-study__section-copy"><p>{study.problem}</p></div>
          </section>

          <section className="case-study__section" aria-labelledby="case-study-approach">
            <div className="case-study__section-heading">
              <p className="eyebrow">The approach</p>
              <h2 id="case-study-approach"><HL text="Designed around the customer" mark="customer" /></h2>
            </div>
            <div className="case-study__section-copy">
              <p>We shaped the site around the information visitors need, with a clear visual hierarchy and a straightforward path to the next step.</p>
              <ul className="case-study__list">
                {study.changes.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </section>

          <section className="case-study__section" aria-labelledby="case-study-delivered">
            <div className="case-study__section-heading">
              <p className="eyebrow">The delivery</p>
              <h2 id="case-study-delivered"><HL text="A polished, practical website" mark="practical" /></h2>
            </div>
            <div className="case-study__section-copy">
              <ul className="case-study__deliverables">
                {study.features.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}
              </ul>
              <h3>Project outcome</h3>
              <p>{study.outcome}</p>
            </div>
          </section>

          <div className="case-study__closing">
            <p>Want a website designed around your business?</p>
            <Link className="btn btn--primary" href="/contact" prefetch={false}>Get My Free Preview</Link>
            <Link className="case-study__back" href="/portfolio" prefetch={false}>Back to all projects</Link>
          </div>
        </article>
      </Section>
      {CASE_STUDIES.length > 1 ? (
        <Section tint>
          <div className="container container--narrow">
            <h2><HL text="More real client projects" mark="client projects" /></h2>
            <ul className="blog-related__list">
              {CASE_STUDIES.filter((item) => item.slug !== study.slug).map((item) => (
                <li key={item.slug}>
                  <Link href={`/case-studies/${item.slug}`} prefetch={false}>
                    <span className="blog-related__title">{item.title}</span>
                    <span className="blog-related__meta">{item.trade} case study</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}
    </>
  );
}
