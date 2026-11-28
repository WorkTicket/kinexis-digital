import Link from "next/link";
import { preload } from "react-dom";
import type { CSSProperties, ReactNode } from "react";
import { COMPARE_ROWS } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { IMAGE_SIZES, still } from "@/lib/image-sources";
import {
  PAGE_HERO_SIZES,
  PAGE_HERO_WIDTHS,
  pageHeroPreloadHref,
  pageHeroSrcSet,
  pageHeroSizesForFile,
} from "@/lib/page-hero-lcp";
import { PROJECTS } from "@/lib/projects";
import { Icon, Illustration } from "./artwork";
import { DeferredImg } from "./DeferredImg";
import { CampaignHeroArtwork, type CampaignPageArt } from "./CampaignArtwork";
import { HL, Phrase } from "./mark";
import { ShotFrame } from "./ShotFrame";
import PreviewBar from "./PreviewBar";
import TrustStrip from "./TrustStrip";

export { Icon, Illustration, HL, Phrase };

/** Hero artwork names map to the numbered files in /assets/heroes/. */
export type ArtName =
  | "homepage" | "portfolio" | "about" | "process" | "reviews" | "pricing"
  | "web-design" | "local-seo" | "website-audit" | "maintenance" | "faqs"
  | "blog" | "contact" | "upgrades" | "industries" | "all-services";

const HERO_FILES: Record<ArtName, string> = {
  homepage: "01-homepage",
  portfolio: "02-portfolio",
  about: "03-about",
  process: "04-process",
  reviews: "05-reviews",
  pricing: "06-pricing",
  "web-design": "07-web-design",
  "local-seo": "08-local-seo",
  "website-audit": "09-website-audit",
  maintenance: "10-maintenance",
  faqs: "11-faqs",
  blog: "12-blog",
  contact: "13-contact",
  upgrades: "14-upgrades",
  industries: "11-faqs",
  "all-services": "01-homepage",
};

const CAMPAIGN_HERO: Partial<Record<ArtName, CampaignPageArt>> = {
  about: "about",
  portfolio: "portfolio",
  industries: "industries",
  pricing: "pricing",
  reviews: "client-reviews",
  blog: "blog",
  contact: "contact",
  "all-services": "all-services",
  "web-design": "web-design",
  "local-seo": "local-seo",
  "website-audit": "website-audit",
  upgrades: "upgrades",
};
const SPANISH_ART: Partial<Record<ArtName, CampaignPageArt>> = {
  process: "web-design",
  maintenance: "upgrades",
  faqs: "contact",
  industries: "industries",
};

type HeroImageProps = {
  name: string;
  alt: string;
  sizes: string;
};

function heroSet(base: string, format: "avif" | "webp") {
  // base is `/assets/heroes/{file}` — derive file stem for shared srcset helper.
  const file = base.replace(/^\/assets\/heroes\//, "");
  return pageHeroSrcSet(file, format);
}

/** Primary hero artwork. AVIF is served first, with pre-sized WebP as the fallback. */
export function HeroImage({ name, alt, sizes }: HeroImageProps) {
  const base = `/assets/heroes/${name}`;
  const avifSrcSet = pageHeroSrcSet(name, "avif");
  const webpSrcSet = pageHeroSrcSet(name, "webp");
  const preloadHref = pageHeroPreloadHref(name);
  // Explicit <link> + react-dom preload: early head boot in DocumentShell starts
  // the fetch; these keep img candidates identical and cover async route trees
  // (reviews) where server preload registration was previously omitted.
  preload(preloadHref, { as: "image", imageSrcSet: avifSrcSet, imageSizes: sizes, type: "image/avif", fetchPriority: "high" });

  return (
    <>
      <link rel="preload" as="image" href={preloadHref} imageSrcSet={avifSrcSet} imageSizes={sizes} type="image/avif" fetchPriority="high" />
      <picture>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={still(`${base}-640.webp`)}
        srcSet={webpSrcSet}
        sizes={sizes}
        width={PAGE_HERO_WIDTHS[PAGE_HERO_WIDTHS.length - 1]}
        height={PAGE_HERO_WIDTHS[PAGE_HERO_WIDTHS.length - 1]}
        alt={alt}
        decoding="sync"
        loading="eager"
        fetchPriority="high"
        className="hero-art mx-auto block h-auto w-full max-w-[627px]"
      />
      </picture>
    </>
  );
}

/** Responsive hero artwork. Source files are pre-sized WebP/AVIF, so the intrinsic ratio stays 1:1. */
export function Art({
  name, alt = "", className = "", priority = false, sizes = IMAGE_SIZES.art, locale = "en",
}: { name: ArtName; alt?: string; className?: string; priority?: boolean; sizes?: string; locale?: Locale }) {
  const file = HERO_FILES[name];
  const localeCampaignName = locale === "en" ? undefined : SPANISH_ART[name];
  const campaignName = localeCampaignName ?? CAMPAIGN_HERO[name];
  if (campaignName) {
    return (
      <CampaignHeroArtwork
        name={campaignName}
        alt={alt}
        fallback={still(`/assets/heroes/${file}-640.webp`)}
        priority={priority}
        locale={locale}
      />
    );
  }
  const base = `/assets/heroes/${file}`;
  // Lazy art falls back to 640w so a missing srcset pick never downloads the 1254 master.
  const src = still(`${base}-640.webp`);
  const srcSet = heroSet(base, "webp");
  const avifSrcSet = heroSet(base, "avif");
  const responsiveSizes = pageHeroSizesForFile(file) === PAGE_HERO_SIZES
    ? sizes
    : pageHeroSizesForFile(file);
  if (priority) return <HeroImage name={file} alt={alt} sizes={responsiveSizes} />;
  return (
    <DeferredImg
      src={src}
      srcSet={srcSet}
      avifSrcSet={avifSrcSet}
      sizes={responsiveSizes}
      alt={alt}
      className={className}
      width={1254}
      height={1254}
    />
  );
}

export type DecorName =
  | "brand-backdrop" | "cobalt-circle" | "cobalt-dot-grid" | "cyan-oval"
  | "navy-outline-ring" | "orange-plus" | "orange-semicircle" | "pale-dot-grid";

/** Position presets keep the eight decorative SVGs coherent across sections. */
const DECOR_POSITION: Record<DecorName, string> = {
  "brand-backdrop": "decor--backdrop",
  "cobalt-circle": "decor--circle",
  "cobalt-dot-grid": "decor--grid",
  "cyan-oval": "decor--oval",
  "navy-outline-ring": "decor--ring",
  "orange-plus": "decor--plus",
  "orange-semicircle": "decor--semicircle",
  "pale-dot-grid": "decor--dots",
};

export function ArtDecor({ name, className = "" }: { name: DecorName; className?: string }) {
  return <Illustration name={name} alt="" folder="decorative" className={`decor ${DECOR_POSITION[name]} ${className}`.trim()} width={220} height={220} />;
}

/** Letter-spacing used only before the real type swaps in. Keeps a boundary line from jumping. */
export function fallbackTrack(mobile?: string, desktop?: string): { className: string; style: CSSProperties } | undefined {
  if (!mobile && !desktop) return undefined;
  const style: CSSProperties & { "--fb-m"?: string; "--fb-d"?: string } = {};
  if (mobile) style["--fb-m"] = mobile;
  if (desktop) style["--fb-d"] = desktop;
  return { className: "fb-track", style };
}

/** Page header with optional split artwork. Text-only pages keep the existing centered layout. */
export function PageHero({
  h1, sub, mark, eyebrow, image, imageAlt = "", art, decor, className = "", locale = "en", fallbackTrack: track, previewBar = true, children,
}: {
  h1: ReactNode; sub: ReactNode; mark?: string; eyebrow?: string;
  image?: ArtName; imageAlt?: string; art?: ReactNode; decor?: DecorName[]; className?: string;
  locale?: Locale;
  fallbackTrack?: { mobile?: string; desktop?: string; leadMobile?: string; leadDesktop?: string };
  /** Slim free-preview bar under the hero. Off on pages that already have a lead form. */
  previewBar?: boolean;
  children?: ReactNode;
}) {
  const title = typeof h1 === "string" && mark ? <HL text={h1} mark={mark} phrase /> : h1;
  const tracked = fallbackTrack(track?.mobile, track?.desktop);
  const leadTracked = fallbackTrack(track?.leadMobile, track?.leadDesktop);
  const leadClass = ["muted", "lead", leadTracked?.className].filter(Boolean).join(" ");
  if (!image && !art) {
    return (
      <>
        <section className={`page-hero${className ? ` ${className}` : ""}`}>
          <div className="container center">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className={tracked?.className} style={tracked?.style}>{title}</h1>
            <p className={leadClass} style={leadTracked?.style}>{sub}</p>
            {children}
          </div>
        </section>
        {previewBar ? <PreviewBar locale={locale} /> : null}
      </>
    );
  }
  return (
    <>
      <section className={`page-hero page-hero--split${className ? ` ${className}` : ""}`}>
        <div className="container page-hero__grid">
          <div className="page-hero__copy">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className={tracked?.className} style={tracked?.style}>{title}</h1>
            <p className={leadClass} style={leadTracked?.style}>{sub}</p>
            {children}
          </div>
          <div className="page-hero__art">
            <div className="art-wrap">
              {decor?.map((name) => <ArtDecor key={name} name={name} />)}
              {/* PAGE_HERO_SIZES understates the ~260px slot so mobile picks 480w LCP AVIF. */}
              {art ?? (image ? <Art name={image} alt={imageAlt} className="hero-art" priority sizes={PAGE_HERO_SIZES} locale={locale} /> : null)}
            </div>
          </div>
        </div>
      </section>
      {previewBar ? <PreviewBar locale={locale} /> : null}
    </>
  );
}

/** Image + copy section used for service introductions and story blocks. */
export function MediaSplit({
  image, art, alt = "", decor, reverse, className = "", id, locale = "en", children,
}: {
  image?: ArtName; art?: ReactNode; alt?: string; decor?: DecorName[]; reverse?: boolean; className?: string; id?: string; locale?: Locale; children: ReactNode;
}) {
  return (
    <div id={id} className={`media-split${reverse ? " media-split--reverse" : ""}${className ? ` ${className}` : ""}`}>
      <div className="media-split__art">
        <div className="art-wrap">
          {decor?.map((name) => <ArtDecor key={name} name={name} />)}
          {art ?? (image ? <Art name={image} alt={alt} className="hero-art" sizes={IMAGE_SIZES.mediaSplit} locale={locale} /> : null)}
        </div>
      </div>
      <div className="media-split__copy">{children}</div>
    </div>
  );
}
export function Section({ tint, narrow, id, decor, accent, band, children }: { tint?: boolean; narrow?: boolean; id?: string; decor?: "light" | "dark"; accent?: string; band?: "lead"; children: ReactNode }) {
  return (
    <section id={id} className={`section${tint ? " section--tint" : ""}${band ? ` section--${band}` : ""}${decor ? ` section--decor-${decor}` : ""}${accent ? " section--trade-accent" : ""}`}>
      {accent ? <img className="section-accent" src={accent} alt="" width={1200} height={700} loading="lazy" decoding="async" fetchPriority="low" /> : null}
      <div className={`container${narrow ? " container--narrow" : ""}`}>{children}</div>
    </section>
  );
}
export function CtaBand({
  h = "Ready to See Your Homepage?",
  mark,
  sub,
  btn = "Get My Free Preview",
  href = "/contact",
  secondary = "See Plans & Pricing",
  secondaryHref = "/pricing",
  locale = "en",
}: {
  h?: string;
  mark?: string;
  sub: string;
  btn?: string;
  href?: string;
  secondary?: string;
  secondaryHref?: string;
  locale?: Locale;
}) {
  const trust =
    locale === "es-ES"
      ? {
          leadLabel: "Garantía de leads rastreados en 60 días",
          refundLabel: "Garantía de devolución en 30 días",
          downLabel: "Sin pago inicial",
          previewLabel: "Vista previa gratis en 2 días hábiles",
        }
      : locale === "es-419"
        ? {
            leadLabel: "Garantía de leads rastreados en 60 días",
            refundLabel: "Garantía de devolución en 30 días",
            downLabel: "$0 de entrada",
            previewLabel: "Vista previa gratis en 2 días hábiles",
          }
        : undefined;
  return (
    <section className="cta-band">
      <div className="container center">
      {/* phrase marker: navy on white chip — keeps AA contrast even if a prior band overlaps paint. */}
      <h2>{mark ? <HL text={h} mark={mark} phrase /> : h}</h2><p>{sub}</p>
      <div className="btn-row">
        <Link className="btn btn--primary btn--lg" href={href} prefetch={false}>{btn}</Link>
        <Link className="btn btn--light btn--lg" href={secondaryHref} prefetch={false}>{secondary}</Link>
      </div>
      <TrustStrip className="cta-trust" {...trust} />
    </div></section>
  );
}
export function IconCard({ title, iconAlt, text, icon, src, level = 3, iconClass = "" }: { title: ReactNode; iconAlt?: string; text: string; icon?: string; src?: string; level?: 2 | 3; iconClass?: string }) {
  const Heading = level === 2 ? "h2" : "h3";
  const size = /icon--(service|problem)/.test(iconClass) ? 104 : 72;
  const mark = src
    ? <img className={`icon icon--kit${iconClass ? ` ${iconClass}` : ""}`} src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'%3E%3C/svg%3E`} data-src={src} alt="" width={size} height={size} decoding="async" />
    : icon
      ? <Icon name={icon} alt={iconAlt ?? (typeof title === "string" ? title : "")} />
      : <div className="icon ph" />;
  return <article className="card center">{mark}<Heading className={level === 2 ? "card-title" : undefined}>{title}</Heading><p>{text}</p></article>;
}
export function ServiceCard({ title, text, href, cta, icon }: { title: string; text: string; href: string; cta: string; icon?: string }) {
  return (
    <article className="card center">{icon && <Icon name={icon} alt={title} />}{!icon && <div className="icon ph" />}<h3>{title}</h3><p>{text}</p>
      <p><Link className="btn btn--ghost" href={href} prefetch={false}>{cta}</Link></p></article>
  );
}
export function ReviewCard({ quote, name, company }: { quote: string; name: string; company: string }) {
  return (
    <figure className="review-card">
      <header className="review-card__top">
        <p className="review-card__label review-card__label--stars" role="img" aria-label="5 out of 5">★★★★★</p>
      </header>
      <blockquote>&ldquo;{quote}&rdquo;</blockquote>
      <figcaption><b>{name}</b><span>{company}</span></figcaption>
    </figure>
  );
}
export function Faq({ items, openFirst = true }: { items: { q: string; a: string }[]; openFirst?: boolean }) {
  return <>{items.map((f, i) => (
    <details className="faq" key={f.q} open={openFirst && i === 0}>
      <summary><h3 className="faq__q">{f.q}</h3></summary>
      <p>{f.a}</p>
    </details>
  ))}</>;
}
function KinexisCheck({ yesLabel = "Yes" }: { yesLabel?: string }) {
  return (
    <div role="cell" className="us">
      <span className="compare__sticker" aria-hidden="true" />
      <span className="sr-only">{yesLabel}</span>
    </div>
  );
}
export function Compare({ rows = COMPARE_ROWS, freelancers = "Freelancers", agencies = "Agencies", label = "Comparison", feature = "Feature", yesLabel = "Yes" }: { rows?: [string, boolean, boolean][]; freelancers?: string; agencies?: string; label?: string; feature?: string; yesLabel?: string }) {
  const yes = (v: boolean) => <div role="cell" className={v ? "yes" : "no"}>{v ? "✓" : "✕"}</div>;
  return (
    <div className="compare" role="table" aria-label={label}>
      <div className="compare__row compare__head" role="row">
        <div role="columnheader"><span className="sr-only">{feature}</span></div>
        <div role="columnheader">{freelancers}</div>
        <div role="columnheader">{agencies}</div>
        <div role="columnheader" className="us">
          <img className="compare__logo" src="/assets/logos/header-nav.webp" alt="Kinexis Digital" width={480} height={160} decoding="async" loading="lazy" fetchPriority="low" />
        </div>
      </div>
      {rows.map(([rowLabel, f, a]) => (
        <div className="compare__row" role="row" key={rowLabel}><div role="cell">{rowLabel}</div>{yes(f)}{yes(a)}<KinexisCheck yesLabel={yesLabel} /></div>
      ))}
    </div>
  );
}
export function Shots({ n, mode, hrefFor, labelFor, hrefLang, scrollOnHover = true }: { n: number; mode: "link" | "work"; hrefFor?: (slug: string) => string; labelFor?: (name: string) => string; hrefLang?: string; scrollOnHover?: boolean }) {
  return <>{PROJECTS.slice(0, n).map((project) => {
    return mode === "link"
      ? <ShotFrame key={project.slug} project={project} href={hrefFor ? hrefFor(project.slug) : `/portfolio/${project.slug}`} label={labelFor ? labelFor(project.name) : `View ${project.name}`} hrefLang={hrefLang} ctaLabel={labelFor ? labelFor(project.name) : undefined} scrollOnHover={scrollOnHover} />
      : null;
  })}</>;
}
export function Prose({ sections }: { sections: [string, string][] }) {
  return (
    <section className="section"><div className="container container--narrow prose">
      {sections.map(([h, p]) => <div key={h}><h2>{h}</h2><p>{p}</p></div>)}
    </div></section>
  );
}
