import { getTranslations } from "next-intl/server";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { FooterCtaBand } from "@/components/FooterCtaBand";
import { LandingChromeGate } from "@/components/landing/LandingChromeGate";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { CallLink } from "@/components/analytics/CallLink";
import { CONTACT_EMAIL } from "@/content/contact";
import { Link } from "@/i18n/navigation";
import {
  footerIndustryLinks,
  footerNavLinks,
  footerServiceLinks,
} from "@/lib/site-nav";
import { businessProfile, getBusinessPhoneDisplay } from "@/lib/business";

function stripTrailingArrow(label: string) {
  return label.replace(/\s*→\s*$/, "");
}

function FooterReach({
  emailLabel,
  phoneLabel,
  facebookLabel,
  phoneDisplay,
  note,
  showIcons,
}: {
  emailLabel: string;
  phoneLabel: string;
  facebookLabel: string;
  phoneDisplay?: string;
  note?: string;
  showIcons: boolean;
}) {
  return (
    <div className="site-footer__lp-channels">
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="site-footer__email site-footer__email--primary"
      >
        {showIcons ? <MailIcon /> : null}
        <span className="sr-only">{emailLabel}</span>
        <span>{CONTACT_EMAIL}</span>
      </a>
      <CallLink className="site-footer__email">
        {showIcons ? <PhoneIcon /> : null}
        <span className="sr-only">{phoneLabel}</span>
        <span className="site-footer__phone">{phoneDisplay}</span>
      </CallLink>
      <div className="site-footer__social">
        <a
          href={businessProfile.facebook}
          className="site-footer__social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {facebookLabel}
        </a>
      </div>
      {note ? <p className="site-footer__meta-line">{note}</p> : null}
    </div>
  );
}

function MailIcon() {
  return (
    <svg className="site-footer__reach-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.25" y="5.25" width="17.5" height="13.5" rx="1.75" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7.25 12 12.75 20 7.25" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="site-footer__reach-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8.2 4.4h2.2l1.15 2.9-1.45.85a8.6 8.6 0 0 0 3.75 3.75l.85-1.45 2.9 1.15v2.2a1.35 1.35 0 0 1-1.35 1.35A11.55 11.55 0 0 1 6.85 5.75 1.35 1.35 0 0 1 8.2 4.4Z"
        stroke="currentColor"
        strokeWidth="0.99"
        strokeLinejoin="round"
        strokeLinecap="round"
        transform="translate(12 12) scale(1.62) translate(-12.225 -9.775)"
      />
    </svg>
  );
}

export async function Footer() {
  const year = new Date().getFullYear();
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tServices = await getTranslations("services");
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

  const reach = (note: string | undefined, showIcons: boolean) => (
    <FooterReach
      emailLabel={t("email")}
      phoneLabel={t("phone")}
      facebookLabel={t("facebook")}
      phoneDisplay={phoneDisplay}
      note={note}
      showIcons={showIcons}
    />
  );

  return (
    <footer className="site-footer">
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
                    {reach(undefined, false)}
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
                    {reach(t("replies"), true)}
                  </div>
                </div>
              }
            />

            <LandingChromeGate
              offLanding={
                <nav className="site-footer__nav" aria-label={t("navigation")}>
                  <div className="site-footer__col">
                    <h2 className="section-eyebrow site-footer__col-title">
                      {t("services")}
                    </h2>
                    <ul className="site-footer__list">
                      {footerServiceLinks.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="site-footer__link">
                            {tServices(link.key)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="site-footer__col">
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

                  <div className="site-footer__col">
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
                          {stripTrailingArrow(t("allIndustries"))}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              }
            />
          </div>
        </div>

        <LandingChromeGate
          slimOnly
          offLanding={
            <div className="site-footer__mark" aria-hidden>
              <span className="site-footer__mark-text">Kinexis</span>
            </div>
          }
        />

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
                    <span className="site-footer__bar-sep" aria-hidden />
                    <span className="site-footer__bar-group">
                      <Link href="/privacy" className="site-footer__bar-link">
                        {t("privacy")}
                      </Link>
                      <Link href="/terms" className="site-footer__bar-link">
                        {t("terms")}
                      </Link>
                    </span>
                  </>
                }
                offLanding={
                  <>
                    <LanguageSwitcher />
                    <span className="site-footer__bar-sep" aria-hidden />
                    <span className="site-footer__bar-group">
                      <Link href="/privacy" className="site-footer__bar-link">
                        {t("privacy")}
                      </Link>
                      <Link href="/terms" className="site-footer__bar-link">
                        {t("terms")}
                      </Link>
                      <Link href="/pay" className="site-footer__bar-link">
                        {t("pay")}
                      </Link>
                    </span>
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
