import Link from "next/link";
import { INDUSTRIES } from "@/data/industries";
import { chromeFor } from "@/i18n/chrome";
import { localizeIndustry } from "@/i18n/industries-es";
import { getLocale, withLocale } from "@/lib/i18n";
import { MenuButton, NavLinks } from "./HeaderMenu";

export default async function Header() {
  const locale = await getLocale();
  const chrome = chromeFor(locale);
  const hrefFor = (href: string) => withLocale(locale, href);
  const industries = INDUSTRIES.map((industry) => localizeIndustry(industry, locale));

  return (
    <header className="header">
      <div className="container header__inner">
        <Link className="logo" href={hrefFor("/")} aria-label={chrome.home} prefetch={false}>
          <img
            src="/assets/logos/header-nav.webp"
            srcSet="/assets/logos/header-nav-360.webp 360w, /assets/logos/header-nav.webp 480w"
            sizes="180px"
            alt="Kinexis Digital"
            width={480}
            height={160}
            loading="eager"
            decoding="async"
            fetchPriority="low"
            className="logo__img"
          />
        </Link>
        <nav className="nav" id="nav" aria-label="Main">
          <NavLinks chrome={chrome} industries={industries} hrefFor={hrefFor} />
          <div className="nav__extra">
            <Link className="btn btn--primary" href={hrefFor("/contact")} prefetch={false}>{chrome.chat}</Link>
            <Link className="btn btn--ghost" href={hrefFor("/strategy-call")} prefetch={false}>{chrome.strategy}</Link>
          </div>
        </nav>
        <div className="header__tools">
          <Link className="btn btn--primary header__cta" href={hrefFor("/contact")} prefetch={false}>{chrome.chat}</Link>
          <MenuButton menu={chrome.menu} close={chrome.close} />
        </div>
      </div>
    </header>
  );
}
