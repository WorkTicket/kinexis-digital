import Link from "next/link";
import { DeferredImg } from "./DeferredImg";
import Form, { LEAD_FIELDS, LEAD_FIELDS_ES } from "./Form";
import FacebookChooser from "./FacebookChooser";
import FooterGate from "./FooterGate";
import { HL } from "./mark";
import { chromeFor } from "@/i18n/chrome";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import LanguageSwitch from "./LanguageSwitch";
import { SITE, telHref } from "@/lib/site";
import { TRUSTPILOT_PROFILE_URL } from "@/lib/trustpilot";

const link =
  "footer-link inline-flex min-h-10 items-center text-[0.92rem] leading-snug text-white/78 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-bright";
const legalLink =
  "rounded-sm text-sm text-white/65 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-bright";

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
      />
    </svg>
  );
}

function TrustpilotIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 1.5 14.9 8.4l7.5.7-5.6 4.8 1.8 7.3L12 17.6l-6.6 3.6 1.8-7.3L1.6 9.1l7.5-.7L12 1.5z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[1.05rem] shrink-0" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[1.05rem] shrink-0" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v2.2a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h2.2a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.6a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.57-.57a2 2 0 0 1 2.11-.45c.83.29 1.7.5 2.6.62A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function LinkColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav className="footer-column" aria-label={title}>
      <p className="footer-column__title">{title}</p>
      <ul className="footer-column__list">
        {links.map((item) => (
          <li key={item.href}>
            <Link className={link} href={item.href} prefetch={false}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer({ locale }: { locale: Locale }) {
  const chrome = chromeFor(locale);
  const hrefFor = (href: string) => (href === "/pay" || /^https?:\/\//.test(href) ? href : withLocale(locale, href));
  const fields = locale === "en" ? LEAD_FIELDS : LEAD_FIELDS_ES;
  const support = [
    ...chrome.supportLinks,
    [SITE.clientPortalUrl, locale === "en" ? "Client Portal" : "Portal de clientes"],
    [SITE.missedCallPortalUrl, locale === "en" ? "Missed-Call Text-Back" : "Texto para llamadas perdidas"],
    ["/pay", locale === "en" ? "Pay" : "Planes y pago"],
  ] as [string, string][];

  return (
    <div className="site-foot">
      <FooterGate>
        <div className="footer-cta-bridge px-6">
          <section
            id="footer-cta"
            aria-labelledby="footer-cta-heading"
            className="relative z-10 mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-8 rounded-[22px] border-2 border-[var(--brand-navy)] bg-white px-[22px] pt-[30px] pb-[26px] shadow-[8px_8px_0_var(--brand-navy)] md:grid-cols-[1fr_1.1fr] md:gap-12 md:px-[48px] md:pt-[46px] md:pb-10"
          >
            <div className="min-w-0">
              <h2 id="footer-cta-heading" className="mb-3 font-display text-[clamp(1.85rem,3.4vw,2.55rem)] leading-[1.08] font-semibold tracking-[-0.01em] text-ink">
                <HL text={chrome.footerCta} mark={chrome.footerCtaMark} />
              </h2>
              <p className="max-w-[36ch] text-[1.08rem] leading-[1.5] text-ink/90 md:text-[1.12rem]">
                {chrome.footerCtaText}
              </p>
            </div>
            <div className="cta-form">
              <Form fields={fields} button={chrome.footerButton} fast fastText={chrome.footerFast} />
            </div>
          </section>
        </div>
      </FooterGate>

      <footer className="site-footer">
        <div className="site-footer__glow" aria-hidden="true" />
        <div className="site-footer__inner">
          <div className="footer-main">
            <div className="footer-brand">
              <Link className="footer-logo flex w-fit" href={hrefFor("/")} aria-label={chrome.home} prefetch={false}>
                <DeferredImg
                  src="/assets/logos/footer-nav.webp"
                  alt="Kinexis Digital"
                  width={420}
                  height={420}
                  className="h-auto w-[128px] sm:w-[148px] lg:w-[168px]"
                />
              </Link>
              <p className="footer-blurb">
                <span className="block">{chrome.footerBlurb}</span>
                {chrome.region ? <span className="footer-blurb__region">{chrome.region}</span> : null}
              </p>

              <div className="footer-contact" role="group" aria-label="Contact">
                <a className="footer-contact__link" href={`mailto:${SITE.email}`}>
                  <MailIcon />
                  <span>{SITE.email}</span>
                </a>
                <a className="footer-contact__link" href={telHref(SITE.phone)}>
                  <PhoneIcon />
                  <span>{SITE.phone}</span>
                </a>
              </div>

              <div className="footer-social" role="group" aria-label="Social">
                <FacebookChooser english={SITE.social.Facebook} spanish={SITE.social["Facebook ES"]} />
                <a className="footer-social__btn footer-social__btn--yt" href={SITE.social.YouTube} target="_blank" rel="noopener noreferrer" aria-label="Kinexis Digital on YouTube">
                  <YouTubeIcon />
                </a>
                <a className="footer-social__btn footer-social__btn--tp" href={TRUSTPILOT_PROFILE_URL} target="_blank" rel="noopener noreferrer" aria-label="Kinexis Digital on Trustpilot">
                  <TrustpilotIcon />
                </a>
              </div>
            </div>

            <div className="footer-navigation">
              <LinkColumn title={chrome.helpful} links={chrome.helpfulLinks.map(([href, label]) => ({ href: hrefFor(href), label }))} />
              <LinkColumn title={chrome.services} links={chrome.serviceLinks.map(([href, label]) => ({ href: hrefFor(href), label }))} />
              <LinkColumn title={chrome.support} links={support.map(([href, label]) => ({ href: hrefFor(href), label }))} />
            </div>
          </div>

          <div id="footer-legal" className="footer-legal">
            <p className="footer-copyright">© {new Date().getFullYear()} {SITE.name}</p>
            <nav aria-label={chrome.legal} className="footer-policies">
              <Link className={legalLink} href={hrefFor("/terms")} prefetch={false}>{chrome.terms}</Link>
              <span className="footer-policies__dot" aria-hidden="true" />
              <Link className={legalLink} href={hrefFor("/privacy")} prefetch={false}>{chrome.privacy}</Link>
            </nav>
            <LanguageSwitch className="footer-language shrink-0" locale={locale} label={chrome.language} />
          </div>
        </div>
      </footer>
    </div>
  );
}
