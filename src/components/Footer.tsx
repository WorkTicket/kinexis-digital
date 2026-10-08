import { getTranslations } from "next-intl/server";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { FooterCtaBand } from "@/components/FooterCtaBand";
import { LandingChromeGate } from "@/components/landing/LandingChromeGate";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CallLink } from "@/components/analytics/CallLink";
import { CONTACT_EMAIL } from "@/content/contact";
import { Link } from "@/i18n/navigation";
import { footerIndustryLinks, footerNavLinks } from "@/lib/site-nav";
import { businessProfile, getBusinessPhoneDisplay, getBusinessTelHref } from "@/lib/business";

function FooterContactCard({
  emailLabel,
  phoneLabel,
  facebookLabel,
  phoneDisplay,
  telHref,
  note,
}: {
  emailLabel: string;
  phoneLabel: string;
  facebookLabel: string;
  phoneDisplay?: string;
  telHref: string | null;
  note: string;
}) {
  return (
    <div className="site-footer__card">
      <ul className="site-footer__card-list">
        <li>
          <a href={`mailto:${CONTACT_EMAIL}`} className="site-footer__card-row">
            <span className="site-footer__card-lead">
              <span className="site-footer__card-icon" aria-hidden>
                <MailIcon />
              </span>
              <span className="site-footer__card-kicker">{emailLabel}</span>
            </span>
            <span className="site-footer__card-value">{CONTACT_EMAIL}</span>
          </a>
        </li>
        {telHref && phoneDisplay ? (
          <li>
            <CallLink className="site-footer__card-row">
              <span className="site-footer__card-lead">
                <span className="site-footer__card-icon" aria-hidden>
                  <PhoneIcon />
                </span>
                <span className="site-footer__card-kicker">{phoneLabel}</span>
              </span>
              <span className="site-footer__card-value">{phoneDisplay}</span>
            </CallLink>
          </li>
        ) : null}
        <li>
          <a
            href={businessProfile.facebook}
            className="site-footer__card-row"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="site-footer__card-lead">
              <span className="site-footer__card-icon" aria-hidden>
                <FacebookIcon />
              </span>
              <span className="site-footer__card-kicker">{facebookLabel}</span>
            </span>
            <span className="site-footer__card-value">Kinexis Digital</span>
          </a>
        </li>
      </ul>
      <p className="site-footer__card-note">{note}</p>
    </div>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M4.5 7.5 12 13l7.5-5.5" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14.2 8.2H16V5.4h-1.8c-2.1 0-3.5 1.4-3.5 3.6v1.8H8.4v2.6h2.3V20h2.8v-6.6h2.3l.5-2.6h-2.8V9.2c0-.6.3-1 1.1-1Z" />
    </svg>
  );
}

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

  const phoneDisplay = getBusinessPhoneDisplay();
  const telHref = getBusinessTelHref();

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
            <LandingChromeGate
              slimOnly
              onLanding={
                <div className="site-footer__lp">
                  <div className="site-footer__lp-brand">
                    <span className="site-footer__logo">
                      <BrandLogo lazy height={28} />
                    </span>
                    <p className="site-footer__blurb site-footer__blurb--lp">
                      {t("lpBlurb")}
                    </p>
                  </div>
                  <div className="site-footer__contact site-footer__contact--lp">
                    <FooterContactCard
                      emailLabel={t("email")}
                      phoneLabel={t("phone")}
                      facebookLabel={t("facebook")}
                      phoneDisplay={phoneDisplay}
                      telHref={telHref}
                      note={t("lpReplies")}
                    />
                  </div>
                </div>
              }
              offLanding={
                <div className="site-footer__brand-lockup">
                  <Link
                    href="/"
                    className="site-footer__logo"
                    aria-label={t("logoHome")}
                  >
                    <BrandLogo lazy />
                  </Link>
                  <p className="site-footer__blurb">{t("blurb")}</p>
                  <div className="site-footer__contact">
                    <FooterContactCard
                      emailLabel={t("email")}
                      phoneLabel={t("phone")}
                      facebookLabel={t("facebook")}
                      phoneDisplay={phoneDisplay}
                      telHref={telHref}
                      note={t("replies")}
                    />
                  </div>
                </div>
              }
            />

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
                            {tNav.has(link.key) ? tNav(link.key) : link.label}
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
              <LandingChromeGate
                slimOnly
                onLanding={<>© {year} KINEXIS Digital</>}
                offLanding={
                  <>
                    © {year} {t("copyright")}
                  </>
                }
              />
            </p>
            <div className="site-footer__bar-links">
              <LandingChromeGate
                onLanding={
                  <>
                    <LanguageSwitcher />
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
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
