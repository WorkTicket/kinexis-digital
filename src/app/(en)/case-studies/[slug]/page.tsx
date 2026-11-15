import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDIES, caseStudyBySlug } from "@/data/caseStudies";
import { contentMetadata } from "@/lib/seo";
import { PageHero, Section, HL } from "@/components/ui";
import { DeferredImg } from "@/components/DeferredImg";
import { ContentSchema } from "@/components/JsonLd";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudyBySlug(slug);
  if (!study) return {};
  return contentMetadata({
    path: `/case-studies/${study.slug}`,
    title: `${study.title} — Case Study`,
    description: `${study.title}: verified project details and live site screenshots. No invented metrics.`,
    image: study.image,
    imageAlt: `${study.title} website screenshot`,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudyBySlug(slug);
  if (!study) notFound();

  return (
    <>
      <ContentSchema
        path={`/case-studies/${study.slug}`}
        title={`${study.title} — Case Study`}
        description={study.problem}
        crumbs={[
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
              src={study.image}
              alt={`${study.title} homepage screenshot`}
              width={study.width}
              height={study.height}
            />
            <figcaption>Live homepage screenshot. Mobile and desktop views use the same production page.</figcaption>
          </figure>
        </div>
      </Section>
    </>
  );
}
