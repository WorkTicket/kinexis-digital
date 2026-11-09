import Link from "next/link";
import { LIVE_SITES } from "@/data/liveSites";
import { REVIEWS } from "@/lib/content";
import type { Industry } from "@/data/industries";
import { DeferredImg } from "./DeferredImg";
import { HL } from "./ui";

export default function IndustryProof({ industry }: { industry: Industry }) {
  if (!industry.proof) return null;
  const site = LIVE_SITES.find((item) => item.slug === industry.proof!.liveSiteSlug);
  if (!site) return null;
  const quote = industry.proof.quoteId
    ? REVIEWS.find((review) => review.id === industry.proof!.quoteId)
    : undefined;

  return (
    <section className="industry-proof">
      <div className="media-split">
        <div className="media-split__copy">
          <h2>
            <HL text={`Live ${industry.name} Site: ${site.name}`} mark={site.name} />
          </h2>
          <p className="muted">{site.trade}</p>
          <ul className="industry-proof__annotations">
            {industry.proof.annotations.map((note) => (
              <li key={note.title}>
                <strong>{note.title}</strong>
                <span>{note.text}</span>
              </li>
            ))}
          </ul>
          {quote ? (
            <blockquote className="industry-proof__quote">
              <p>“{quote.quote}”</p>
              <footer>
                — {quote.name}
                {quote.role ? `, ${quote.role}` : ""}, {quote.company}
              </footer>
            </blockquote>
          ) : null}
          <p className="btn-row">
            <a className="btn btn--ghost" href={site.url} target="_blank" rel="noopener noreferrer">
              Visit Live Site
            </a>
            <Link className="btn btn--primary" href="/portfolio" prefetch={false}>
              See Portfolio
            </Link>
          </p>
        </div>
        <div className="industry-proof__shot shot shot--hero shot--static">
          <div className="shot__page">
            <div className="shot__track">
              <DeferredImg
                src={site.image}
                sizes="(max-width: 860px) 90vw, 480px"
                alt={`${site.name} homepage`}
                width={640}
                height={Math.round((site.height * 640) / site.width)}
                className="shot__img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
