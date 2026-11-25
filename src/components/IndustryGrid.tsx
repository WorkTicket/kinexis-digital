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
  columns,
  moreHref,
  moreLabel = "& more",
  moreMeta = "Any local business — if customers call you, we can help.",
  moreLayout = "outro",
}: {
  industries?: Industry[];
  layout?: "cards" | "index";
  base?: string;
  /** When set, only the first N industries are shown. */
  limit?: number;
  /**
   * Optional index column lock. Use `3` for a single even row (related trades),
   * `4` when the list+more cell is a multiple of 4 (industries hub).
   */
  columns?: 2 | 3 | 4;
  moreHref?: string;
  moreLabel?: string;
  moreMeta?: string;
  /** `cell` fills a grid slot (home). `outro` sits centered under the list. */
  moreLayout?: "cell" | "outro";
}) {
  const published = industries.filter((industry) => industry.status === "live");
  const list = typeof limit === "number" ? published.slice(0, limit) : published;
  if (layout === "index") {
    const moreInGrid = Boolean(moreHref) && moreLayout === "cell";
    const moreAsOutro = Boolean(moreHref) && moreLayout === "outro";
    const indexClass =
      columns === 4
        ? "trade-index trade-index--four"
        : columns === 3
          ? "trade-index trade-index--three"
          : columns === 2
            ? "trade-index trade-index--two"
            : "trade-index";
    return (
      <div className="trade-index-wrap">
        <ul className={indexClass}>
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
          {moreInGrid && moreHref ? (
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
        {moreAsOutro && moreHref ? (
          <p className="trade-index__outro">
            <Link className="trade-index__outro-link" href={moreHref} prefetch={false}>
              <span className="trade-index__more-mark" aria-hidden="true">+</span>
              <span className="trade-index__outro-label">{moreLabel}</span>
            </Link>
            <span className="trade-index__outro-meta">{moreMeta}</span>
          </p>
        ) : null}
      </div>
    );
  }
  return (
    <div className="trade-grid">
      {list.map((industry) => (
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
