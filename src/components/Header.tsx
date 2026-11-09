import Link from "next/link";
import { INDUSTRIES } from "@/data/industries";
import { chromeFor } from "@/i18n/chrome";
import { localizeIndustry } from "@/i18n/industries-es";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { imageVariant } from "@/lib/image-sources";
import { SITE, telHref } from "@/lib/site";
import { MenuButton, NavLinks } from "./HeaderMenu";

export default function Header({ locale }: { locale: Locale }) {
  const chrome = chromeFor(locale);
  const hrefFor = (href: string) => withLocale(locale, href);
  const industries = INDUSTRIES.map((industry) => localizeIndustry(industry, locale));

  return (
    <header className="header">
      <div className="container header__inner">
        <Link className="logo" href={hrefFor("/")} aria-label={chrome.home} prefetch={false}>
          <img
            src="/assets/logos/header-nav.webp"
            srcSet={`${imageVariant("/assets/logos/header-nav.webp", 360, "webp")} 360w, /assets/logos/header-nav.webp 480w`}
            sizes="180px"
            alt="Kinexis Digital"
            width={480}
            height={160}
            loading="eager"
            decoding="async"
            fetchPriority="low"
            className="logo__img"
            style={{ transform: "translateY(-6px)" }}
          />
        </Link>
        <nav className="nav" id="nav" aria-label="Main">
          <NavLinks chrome={chrome} industries={industries} hrefFor={hrefFor} />
          <div className="nav__extra">
            <a className="header__phone" href={telHref(SITE.phone)}>{SITE.phone}</a>
            <Link className="btn btn--primary nav__preview" href={hrefFor("/contact")} prefetch={false}>
              <span className="nav__preview-title">{chrome.chat}</span>
              <span className="nav__preview-hint">{chrome.previewBarHint}</span>
            </Link>
            <Link className="btn btn--ghost" href={hrefFor("/strategy-call")} prefetch={false}>{chrome.strategy}</Link>
          </div>
        </nav>
        <div className="header__tools">
          <a className="header__phone header__phone--mobile" href={telHref(SITE.phone)} aria-label={SITE.phone}>{SITE.phone}</a>
          <Link className="btn btn--primary header__cta" href={hrefFor("/contact")} prefetch={false}>
            <span className="header__cta-label">{chrome.chat}</span>
          </Link>
          <MenuButton menu={chrome.menu} close={chrome.close} />
        </div>
      </div>
    </header>
  );
}
