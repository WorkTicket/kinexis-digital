import Link from "next/link";
import { INDUSTRIES, type Industry } from "@/data/industries";
import { kitSrc } from "@/lib/site";

function TradeIcon({ slug }: { slug: string }) {
  return (
    <img
      className="trade-icon"
      src={kitSrc(`/assets/industries/${slug}/icons/industry.svg`)}
      alt=""
      width={48}
      height={48}
      decoding="async"
      loading="lazy"
      fetchPriority="low"
    />
  );
}

function TradeArrow() {
  return (
    <span className="trade-index__go" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function IndustryGrid({
  industries = INDUSTRIES,
  layout = "cards",
  base = "/industries",
  limit,
  moreHref,
  moreLabel = "& more",
  moreMeta = "Any local service business — if customers call you, we can help.",
}: {
  industries?: Industry[];
  layout?: "cards" | "index";
  base?: string;
  /** When set, only the first N industries are shown. */
  limit?: number;
  moreHref?: string;
  moreLabel?: string;
  moreMeta?: string;
}) {
  const list = typeof limit === "number" ? industries.slice(0, limit) : industries;
  if (layout === "index") {
    return (
      <ul className="trade-index">
        {list.map((industry) => (
          <li key={industry.slug}>
            <Link className="trade-index__item" href={`${base}/${industry.slug}`} prefetch={false}>
              <TradeIcon slug={industry.slug} />
              <span className="trade-index__name">{industry.name}</span>
              <span className="trade-index__meta">{industry.card}</span>
              <TradeArrow />
            </Link>
          </li>
        ))}
        {moreHref ? (
          <li>
            <Link className="trade-index__item trade-index__item--more" href={moreHref} prefetch={false}>
              <span className="trade-index__more-mark" aria-hidden="true">+</span>
              <span className="trade-index__name">{moreLabel}</span>
              <span className="trade-index__meta">{moreMeta}</span>
              <TradeArrow />
            </Link>
          </li>
        ) : null}
      </ul>
    );
  }
  return (
    <div className="trade-grid">
      {industries.map((industry) => (
        <Link key={industry.slug} className="trade-card" href={`${base}/${industry.slug}`} prefetch={false}>
          <span className="trade-card__name">
            <TradeIcon slug={industry.slug} />
            <strong>{industry.name}</strong>
          </span>
          <span className="trade-card__meta">{industry.card}</span>
        </Link>
      ))}
    </div>
  );
}
