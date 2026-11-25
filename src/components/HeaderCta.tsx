import Link from "next/link";

/**
 * Server markup only. Two links so `html.lp-route` (set before paint) can swap
 * target/label via CSS without a client island. Desktop nudge runs in boot.js.
 */
export default function HeaderCta({ href, label }: { href: string; label: string }) {
  return (
    <>
      <Link className="btn btn--primary header__cta header__cta--site" href={href} prefetch={false}>
        <span className="header__cta-label">{label}</span>
      </Link>
      <Link className="btn btn--primary header__cta header__cta--lp" href="#start" prefetch={false}>
        <span className="header__cta-label header__cta-label--lp-desktop">Free Preview</span>
        <span className="header__cta-label header__cta-label--lp-mobile">{label}</span>
      </Link>
    </>
  );
}
