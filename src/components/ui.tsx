import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { COMPARE_ROWS } from "@/lib/content";
import { PROJECTS } from "@/lib/projects";
import { Icon, Illustration } from "./artwork";
import { DeferredImg } from "./DeferredImg";
import { HL, Phrase } from "./mark";
import { ShotFrame } from "./ShotFrame";

export { Icon, Illustration, HL, Phrase };

/** Hero artwork names map to /assets/kinexis/heroes/{name}-{width}.webp */
export type ArtName =
  | "homepage" | "portfolio" | "about" | "process" | "reviews" | "pricing"
  | "web-design" | "local-seo" | "website-audit" | "maintenance" | "faqs"
  | "blog" | "contact" | "upgrades";

/** Responsive hero artwork. Source files are pre-sized WebP, so the intrinsic ratio stays 1:1. */
export function Art({
  name, alt = "", className = "", priority = false, deferMobile = false, sizes = "(max-width: 860px) 88vw, 520px",
}: { name: ArtName; alt?: string; className?: string; priority?: boolean; deferMobile?: boolean; sizes?: string }) {
  const base = `/assets/kinexis/heroes/${name}`;
  const src = `${base}-720.webp`;
  const srcSet = `${base}-560.webp 560w, ${base}-720.webp 720w, ${base}-1120.webp 1120w`;
  const avifSrcSet = `${base}-560.avif 560w, ${base}-720.avif 720w, ${base}-1120.avif 1120w`;
  if (priority && deferMobile) {
    return (
      <picture>
        <source media="(min-width: 861px)" srcSet={srcSet} sizes={sizes} />
        <img
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1254' height='1254'%3E%3C/svg%3E"
          data-src={src}
          data-srcset={srcSet}
          sizes={sizes}
          alt={alt}
          aria-hidden={alt === "" ? true : undefined}
          className={className}
          width={1254}
          height={1254}
          decoding="async"
          fetchPriority="high"
        />
      </picture>
    );
  }
  if (!priority) {
    return (
      <DeferredImg
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className={className}
        width={1254}
        height={1254}
      />
    );
  }
  return (
    <picture>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        aria-hidden={alt === "" ? true : undefined}
        className={className}
        width={1254}
        height={1254}
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
    </picture>
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
  h1, sub, mark, eyebrow, image, imageAlt = "", art, decor, className = "", fallbackTrack: track, deferMobile = false, children,
}: {
  h1: ReactNode; sub: ReactNode; mark?: string; eyebrow?: string;
  image?: ArtName; imageAlt?: string; art?: ReactNode; decor?: DecorName[]; className?: string;
  fallbackTrack?: { mobile?: string; desktop?: string }; deferMobile?: boolean; children?: ReactNode;
}) {
  const title = typeof h1 === "string" && mark ? <HL text={h1} mark={mark} /> : h1;
  const tracked = fallbackTrack(track?.mobile, track?.desktop);
  if (!image && !art) {
    return (
      <section className={`page-hero${className ? ` ${className}` : ""}`}>
        <div className="container center">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className={tracked?.className} style={tracked?.style}>{title}</h1><p className="muted lead">{sub}</p>
        {children}
      </div></section>
    );
  }
  return (
    <section className={`page-hero page-hero--split${className ? ` ${className}` : ""}`}>
      <div className="container page-hero__grid">
        <div className="page-hero__copy">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className={tracked?.className} style={tracked?.style}>{title}</h1>
          <p className="muted lead">{sub}</p>
          {children}
        </div>
        <div className="page-hero__art">
          <div className="art-wrap">
            {decor?.map((name) => <ArtDecor key={name} name={name} />)}
            {art ?? (image ? <Art name={image} alt={imageAlt} className="hero-art" priority deferMobile={deferMobile} sizes="(max-width: 860px) 86vw, 500px" /> : null)}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Image + copy section used for service introductions and story blocks. */
export function MediaSplit({
  image, alt = "", decor, reverse, className = "", id, children,
}: {
  image: ArtName; alt?: string; decor?: DecorName[]; reverse?: boolean; className?: string; id?: string; children: ReactNode;
}) {
  return (
    <div id={id} className={`media-split${reverse ? " media-split--reverse" : ""}${className ? ` ${className}` : ""}`}>
      <div className="media-split__art">
        <div className="art-wrap">
          {decor?.map((name) => <ArtDecor key={name} name={name} />)}
          <Art name={image} alt={alt} className="hero-art" sizes="(max-width: 860px) 86vw, 540px" />
        </div>
      </div>
      <div className="media-split__copy">{children}</div>
    </div>
  );
}
export function Section({ tint, narrow, id, decor, accent, children }: { tint?: boolean; narrow?: boolean; id?: string; decor?: "light" | "dark"; accent?: string; children: ReactNode }) {
  return (
    <section id={id} className={`section${tint ? " section--tint" : ""}${decor ? ` section--decor-${decor}` : ""}${accent ? " section--trade-accent" : ""}`}>
      {accent ? <img className="section-accent" src={accent} alt="" width={1200} height={700} loading="lazy" decoding="async" fetchPriority="low" /> : null}
      <div className={`container${narrow ? " container--narrow" : ""}`}>{children}</div>
    </section>
  );
}
export function CtaBand({ h = "Ready to Get Started?", mark, sub, btn = "Let’s Talk", href = "/contact", secondary = "Schedule A Strategy Call", secondaryHref = "/strategy-call" }: { h?: string; mark?: string; sub: string; btn?: string; href?: string; secondary?: string; secondaryHref?: string }) {
  return (
    <section className="cta-band">
      <div className="container center">
      <h2>{mark ? <HL text={h} mark={mark} /> : h}</h2><p>{sub}</p>
      <div className="btn-row">
        <Link className="btn btn--primary btn--lg" href={href} prefetch={false}>{btn}</Link>
        <Link className="btn btn--ghost btn--lg" href={secondaryHref} prefetch={false}>{secondary}</Link>
      </div>
    </div></section>
  );
}
export function IconCard({ title, text, icon, src, level = 3, iconClass = "" }: { title: string; text: string; icon?: string; src?: string; level?: 2 | 3; iconClass?: string }) {
  const Heading = level === 2 ? "h2" : "h3";
  const size = /icon--(service|problem)/.test(iconClass) ? 104 : 72;
  const mark = src
    ? <img className={`icon icon--kit${iconClass ? ` ${iconClass}` : ""}`} src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'%3E%3C/svg%3E`} data-src={src} alt="" width={size} height={size} decoding="async" />
    : icon
      ? <Icon name={icon} alt={title} />
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
        <p className="review-card__label review-card__label--stars" aria-label="5 out of 5">★★★★★</p>
      </header>
      <blockquote>&ldquo;{quote}&rdquo;</blockquote>
      <figcaption><b>{name}</b><span>{company}</span></figcaption>
    </figure>
  );
}
export function Faq({ items, openFirst = true }: { items: { q: string; a: string }[]; openFirst?: boolean }) {
  return <>{items.map((f, i) => <details className="faq" key={f.q} open={openFirst && i === 0}><summary>{f.q}</summary><p>{f.a}</p></details>)}</>;
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
export function Shots({ n, mode, hrefFor, labelFor, hrefLang }: { n: number; mode: "link" | "work"; hrefFor?: (slug: string) => string; labelFor?: (name: string) => string; hrefLang?: string }) {
  return <>{PROJECTS.slice(0, n).map((project) => {
    return mode === "link"
      ? <ShotFrame key={project.slug} project={project} href={hrefFor ? hrefFor(project.slug) : `/portfolio/${project.slug}`} label={labelFor ? labelFor(project.name) : `View ${project.name}`} hrefLang={hrefLang} ctaLabel={labelFor ? labelFor(project.name) : undefined} />
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
