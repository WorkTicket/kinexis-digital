import { getLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { IndustryVisual } from "@/components/industry/IndustryVisual";
import { Button } from "@/components/ui/Button";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  getIndustryBySlug,
  getIndustriesContent,
  industryHref,
  marketsPreviewSlugs,
} from "@/content/industries";
import { duration } from "@/lib/motion";
import { cn } from "@/lib/cn";

type WhereWeWorkProps = {
  className?: string;
  /** Use denser chapter padding on service pages */
  compact?: boolean;
  /** Type-only list — no industry stills or atmosphere wash */
  plain?: boolean;
};

export async function WhereWeWork({ className, compact, plain }: WhereWeWorkProps) {
  const locale = (await getLocale()) as Locale;
  const c = getIndustriesContent(locale);
  const markets = marketsPreviewSlugs
    .map((slug) => getIndustryBySlug(slug))
    .filter((industry): industry is NonNullable<typeof industry> =>
      Boolean(industry),
    );

  const [titleLead, titleSignal] = splitPreviewTitle(c.previewTitle);

  return (
    <section
      aria-labelledby="where-we-work-heading"
      className={cn(
        "markets-preview chapter chapter--void relative overflow-hidden",
        plain && "markets-preview--plain",
        className,
      )}
    >
      <div
        className={cn(
          "shell relative",
          compact ? "py-16 sm:py-24 md:py-28" : "py-20 sm:py-28 md:py-36",
        )}
      >
        <Reveal variant="rise" when="chapter" className="markets-preview__mast">
          <ChapterLead
            eyebrow={c.previewEyebrow}
            headingId="where-we-work-heading"
            title={
              <>
                {titleLead}
                {titleSignal ? (
                  <>
                    {titleLead ? " " : null}
                    <span className="markets-preview__signal">
                      {titleSignal}
                    </span>
                  </>
                ) : null}
              </>
            }
            headingClassName="markets-preview__heading"
            dek={c.previewCopy}
            dekClassName="markets-preview__copy"
          >
            <Button href="/industries" variant="link" arrow>
              {c.previewAllLabel}
            </Button>
          </ChapterLead>
        </Reveal>

        <RevealGroup
          as="ul"
          className="markets-folio"
          stagger={duration.staggerTight}
          delayChildren={0.05}
          aria-label="Markets"
        >
          {markets.map((industry) => (
            <RevealItem key={industry.slug} as="li" variant="fadeUp">
              <Link
                href={industryHref(industry.slug)}
                className="markets-folio__item group"
              >
                {plain ? null : (
                  <div className="markets-folio__media" aria-hidden>
                    <IndustryVisual
                      slug={industry.slug}
                      variant="thumb"
                      sizes="(max-width: 767px) 100vw, (max-width: 1099px) 50vw, 33vw"
                    />
                  </div>
                )}

                <div className="markets-folio__body">
                  <p className="markets-folio__eyebrow">{industry.eyebrow}</p>
                  <h3 className="markets-folio__title">{industry.title}</h3>
                  <p className="markets-folio__dek">{industry.summary}</p>
                  <ul
                    className="markets-folio__chips"
                    aria-label={`${industry.title} focus areas`}
                  >
                    {industry.discover.slice(0, 3).map((item) => (
                      <li key={item} className="markets-folio__chip">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span aria-hidden className="markets-folio__arrow">
                    →
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/** Clay formula: short setup + blue punch ending in a period. */
function splitPreviewTitle(title: string): [string, string | null] {
  const trimmed = title.trim();
  const clay = trimmed.match(/^(.+?)\s+(\S+\.)$/);
  if (clay) return [clay[1], clay[2]];
  // Single punch word: "Industries." → blue signal only
  if (/^\S+\.$/.test(trimmed)) return ["", trimmed];
  return [trimmed, null];
}
