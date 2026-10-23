import Link from "next/link";
import type { Industry } from "@/data/industries";
import type { Chrome } from "@/i18n/chrome";
import { kitSrc } from "@/lib/site";

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} prefetch={false} data-nav="">
      {label}
    </Link>
  );
}

function IndustriesMenu({ chrome, industries, industriesHref }: { chrome: Chrome; industries: Industry[]; industriesHref: string }) {
  return (
    <div className="mega" data-mega="">
      <button
        type="button"
        className="mega__btn"
        aria-expanded={false}
        aria-haspopup="true"
        aria-controls="industries-menu"
        data-nav-match={industriesHref}
        data-nav-prefix=""
      >
        {chrome.industries}
        <svg className="mega__chev" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3.5 6 8 10.5 12.5 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="mega__panel" id="industries-menu" aria-label={chrome.industries}>
        <div className="mega__head">
          <p className="mega__title">{chrome.industriesTitle}</p>
          <Link className="mega__all" href={industriesHref} prefetch={false} data-nav="">
            {chrome.allIndustries}
            <svg className="mega__arrow" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        <ul className="mega__grid">
          {industries.map((industry) => (
            <li key={industry.slug}>
              <Link href={`${industriesHref}/${industry.slug}`} prefetch={false} data-nav="">
                <img
                  className="mega__icon"
                  src={kitSrc(`/assets/industries/${industry.slug}/icons/industry.svg`)}
                  alt=""
                  width={40}
                  height={40}
                  decoding="async"
                  loading="lazy"
                />
                <span className="mega__copy">
                  <strong>{industry.name}</strong>
                  <span className="mega__card">{industry.card}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** The boot script marks the current page after hydration and on navigation. */
export function NavLinks({ chrome, industries, hrefFor }: { chrome: Chrome; industries: Industry[]; hrefFor: (path: string) => string }) {
  const industriesHref = hrefFor("/industries");
  return (
    <>
      {chrome.navBefore.map(([href, label]) => (
        <NavLink key={href} href={hrefFor(href)} label={label} />
      ))}
      <IndustriesMenu chrome={chrome} industries={industries} industriesHref={industriesHref} />
      {chrome.navAfter.map(([href, label]) => (
        <NavLink key={href} href={hrefFor(href)} label={label} />
      ))}
    </>
  );
}

/** The button is static. The boot script opens, closes, and locks scroll. */
export function MenuButton({ menu = "Menu", close = "Close" }: { menu?: string; close?: string }) {
  return (
    <button
      type="button"
      className="burger"
      aria-expanded={false}
      aria-controls="nav"
    >
      <span className="burger__mark" aria-hidden="true">
        <svg className="burger__ring" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="17" />
        </svg>
        <span className="burger__bars">
          <span />
          <span />
          <span />
        </span>
      </span>
      <span className="burger__label">
        <span className="burger__word burger__word--open">{menu}</span>
        <span className="burger__word burger__word--close" aria-hidden="true">{close}</span>
      </span>
    </button>
  );
}
