import { getTranslations } from "next-intl/server";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { FooterCtaBand } from "@/components/FooterCtaBand";
import { LandingChromeGate } from "@/components/landing/LandingChromeGate";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { CallLink } from "@/components/analytics/CallLink";
import { CONTACT_EMAIL } from "@/content/contact";
import { Link } from "@/i18n/navigation";
import { footerIndustryLinks, footerNavLinks } from "@/lib/site-nav";
import { getBusinessPhoneDisplay, getBusinessTelHref } from "@/lib/business";

export async function Footer() {
  const year = new Date().getFullYear();
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  const navLabels: Record<string, string> = {
    "/services": tNav("services"),
    "/case-studies": tNav("work"),
    "/industries": tNav("industries"),
    "/about": tNav("about"),
    "/resources": tNav("resources"),
    "/audit": tNav("audit"),
    "/contact": tNav("contact"),
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__mark" aria-hidden>
        <span className="site-footer__mark-text">Kinexis</span>
      </div>

      <div className="site-footer__inner">
        <LandingChromeGate
          slimOnly
          offLanding={
            <div className="site-footer__cta">
              <FooterCtaBand
                eyebrow={t("ctaEyebrow")}
                title={t("ctaTitle")}
                dek={t("ctaDek")}
                buttonLabel={tCommon("bookStrategyCall")}
              />
            </div>
          }
        />

        <div className="shell site-footer__main">
          <div className="site-footer__grid">
            <div className="site-footer__brand-lockup">
              <Link
                href="/"
                className="site-footer__logo"
                aria-label={t("logoHome")}
              >
                <BrandLogo lazy />
              </Link>
              <LandingChromeGate
                slimOnly
                onLanding={
                  <>
                    <p className="site-footer__blurb">Kinexis Digital</p>
                    <p className="site-footer__meta-line">Dallas, Texas</p>
                  </>
                }
                offLanding={
                  <>
                    <p className="site-footer__blurb">{t("blurb")}</p>
                    <div className="site-footer__contact">
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="site-footer__email"
                      >
                        <span className="site-footer__email-dot" aria-hidden />
                        {CONTACT_EMAIL}
                      </a>
                      {getBusinessTelHref() ? (
                        <CallLink className="site-footer__email">
                          <span className="site-footer__email-dot" aria-hidden />
                          {getBusinessPhoneDisplay()}
                        </CallLink>
                      ) : null}
                      <p className="site-footer__meta-line">{t("replies")}</p>
                    </div>
                  </>
                }
              />
            </div>

            <LandingChromeGate
              offLanding={
            <nav className="site-footer__nav" aria-label={t("navigation")}>
              <div>
                <h2 className="section-eyebrow site-footer__col-title">
                  {t("explore")}
                </h2>
                <ul className="site-footer__list">
                  {footerNavLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="site-footer__link">
                        {navLabels[link.href] ?? link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="section-eyebrow site-footer__col-title">
                  {t("markets")}
                </h2>
                <ul className="site-footer__list">
                  {footerIndustryLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="site-footer__link">
                        {link.href.includes("home-services")
                          ? tNav("homeServices")
                          : tNav("ecommerce")}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/industries"
                      className="site-footer__link site-footer__link--more"
                    >
                      {t("allIndustries")}
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
              }
            />
          </div>
        </div>

        <div className="site-footer__bar">
          <div className="shell site-footer__bar-row">
            <p className="site-footer__legal">
              © {year} {t("copyright")}
            </p>
            <div className="site-footer__bar-links">
              <LandingChromeGate
                onLanding={
                  <>
                    <Link href="/privacy" className="site-footer__bar-link">
                      {t("privacy")}
                    </Link>
                    <Link href="/terms" className="site-footer__bar-link">
                      {t("terms")}
                    </Link>
                  </>
                }
                offLanding={
                  <>
              <LanguageSwitcher />
              <Link href="/terms" className="site-footer__bar-link">
                {t("terms")}
              </Link>
              <Link href="/privacy" className="site-footer__bar-link">
                {t("privacy")}
              </Link>
              <Link href="/about" className="site-footer__bar-link">
                {t("about")}
              </Link>
              <Link href="/contact" className="site-footer__bar-link">
                {t("contact")}
              </Link>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="site-footer__bar-link"
              >
                {t("email")}
              </a>
                  </>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
