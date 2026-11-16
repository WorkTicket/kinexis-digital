import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDIES, caseStudyBySlug } from "@/data/caseStudies";
import { portfolioCaseStudySrcSet, portfolioFile } from "@/data/portfolio";
import { contentMetadata } from "@/lib/seo";
import { SITE_CONTENT_UPDATED } from "@/lib/pages";
import { IMAGE_SIZES } from "@/lib/image-sources";
import { PageHero, Section, HL } from "@/components/ui";
import { DeferredImg } from "@/components/DeferredImg";
import { ArticleSchema } from "@/components/JsonLd";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudyBySlug(slug);
  if (!study) return {};
  const description = `${study.problem} See the live site and what we changed—verified details only, no invented metrics.`.replace(
    /\s+/g,
    " ",
  );
  return contentMetadata({
    path: `/case-studies/${study.slug}`,
    title: `${study.title} Case Study`,
    description: description.length > 155 ? `${description.slice(0, 152).trimEnd()}…` : description,
    image: study.image,
    imageAlt: `${study.title} website screenshot`,
    ogType: "article",
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudyBySlug(slug);
  if (!study) notFound();

  return (
    <>
      <ArticleSchema
        title={`${study.title} Case Study`}
        description={study.problem}
        path={`/case-studies/${study.slug}`}
        image={study.image}
        date={SITE_CONTENT_UPDATED}
        section={study.trade}
        articleType="Article"
        trail={[
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
          { name: study.title, path: `/case-studies/${study.slug}` },
        ]}
      />
      <PageHero
        h1={study.title}
        mark={study.title}
        sub={`${study.trade}. Real client project — verified details only.`}
        image="portfolio"
        imageAlt={`${study.title} case study`}
      />
      <Section>
        <div className="case-study">
          <p className="eyebrow">The problem</p>
          <h2><HL text="What they needed" mark="needed" /></h2>
          <p>{study.problem}</p>

          <p className="eyebrow spaced">What we changed</p>
          <ul className="ticks">
            {study.changes.map((item) => (
              <li key={item}><span>{item}</span></li>
            ))}
          </ul>

          <p className="eyebrow spaced">Features delivered</p>
          <ul className="ticks">
            {study.features.map((item) => (
              <li key={item}><b>{item}</b></li>
            ))}
          </ul>

          <p className="eyebrow spaced">Outcome</p>
          <p>{study.outcome}</p>
          <p className="btn-row spaced">
            <a className="btn btn--primary" href={study.url} rel="noopener noreferrer" target="_blank">
              View live site
            </a>
            <Link className="btn btn--ghost" href="/portfolio" prefetch={false}>
              Back to portfolio
            </Link>
          </p>

          <figure className="case-study__shot">
            <DeferredImg
              src={portfolioFile(study.image, 400)}
              srcSet={portfolioCaseStudySrcSet(study.image)}
              avifSrcSet={portfolioCaseStudySrcSet(study.image, "avif")}
              sizes={IMAGE_SIZES.caseStudyShot}
              alt={`${study.title} homepage screenshot`}
              width={400}
              height={Math.round((study.height * 400) / study.width)}
            />
            <figcaption>Live homepage screenshot. Mobile and desktop views use the same production page.</figcaption>
          </figure>
        </div>
      </Section>
    </>
  );
}
