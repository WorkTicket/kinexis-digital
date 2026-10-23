import Link from "next/link";
import { DeferredImg } from "./DeferredImg";
import Form, { LEAD_FIELDS } from "./Form";
import FacebookChooser from "./FacebookChooser";
import FooterGate from "./FooterGate";
import { HL } from "./mark";
import { chromeFor } from "@/i18n/chrome";
import { getLocale, getRequestPath, withLocale } from "@/lib/i18n";
import LanguageSwitch from "./LanguageSwitch";
import { SITE, telHref } from "@/lib/site";

const link =
  "inline-flex min-h-9 items-center rounded-sm text-[0.95rem] leading-snug text-white/80 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-bright";
const contactLink =
  "rounded-sm text-sm font-medium text-white/90 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-bright";
const legalLink =
  "rounded-sm text-sm text-white/80 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-bright";

const iconButton =
  "grid size-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white hover:text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-bright";
const youtubeButton =
  "grid size-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white hover:text-[#FF0000] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-bright";

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

function LinkColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav className="footer-column" aria-label={title}>
      <p className="mb-4 font-display text-[0.75rem] font-semibold tracking-[0.18em] text-white/65 uppercase">
        {title}
      </p>
      <ul className="grid gap-1">
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

export default async function Footer() {
  const locale = await getLocale();
  const path = await getRequestPath();
  const chrome = chromeFor(locale);
  const hrefFor = (href: string) => (href === "/pay" || href === "/client-login" ? href : withLocale(locale, href));
  const fields = locale === "en" ? LEAD_FIELDS : [
    { label: "Nombre", name: "name", required: true, auto: "given-name" },
    { label: "Correo", name: "email", kind: "email" as const, required: true, auto: "email" },
    { label: "Teléfono", name: "phone", kind: "tel" as const, auto: "tel" },
    { label: "Sitio o negocio", name: "business" },
  ];
  const otherSocial = Object.entries(SITE.social).filter(([name]) => !name.startsWith("Facebook") && name !== "YouTube");
  const helpful = SITE.clientPortalUrl
    ? [...chrome.helpfulLinks, ["/client-login", locale === "en" ? "Client Login" : "Acceso de clientes"] as [string, string]]
    : chrome.helpfulLinks;

  return (
    <div className="site-foot">
      <FooterGate>
        <div className="bg-[linear-gradient(to_bottom,transparent_50%,var(--accent)_50%)] px-6">
          <section
            id="footer-cta"
            aria-labelledby="footer-cta-heading"
            className="relative z-10 mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-9 rounded-[22px] border-2 border-[var(--brand-navy)] bg-white px-[22px] pt-[30px] pb-[26px] shadow-[8px_8px_0_var(--brand-navy)] md:grid-cols-[1fr_1.15fr] md:px-[50px] md:pt-[50px] md:pb-9"
          >
            <div>
              <h2 id="footer-cta-heading" className="mb-3 font-display text-[clamp(1.9rem,3.6vw,2.6rem)] leading-[1.08] font-semibold tracking-[-0.01em] text-ink">
                <HL text={chrome.footerCta} mark={chrome.footerCtaMark} />
              </h2>
              <p className="text-[1.15rem] leading-[1.45] text-ink">
                {chrome.footerCtaText}
              </p>
            </div>
            <div className="cta-form">
              <Form fields={fields} button={chrome.footerButton} fast fastText={chrome.footerFast} />
            </div>
          </section>
        </div>
      </FooterGate>

      <footer className="relative -mt-px overflow-visible bg-linear-to-b from-cobalt to-cobalt-dark px-6 pb-8 text-white">
        <div className="relative z-10 mx-auto max-w-[1180px]">
          <div className="footer-main">
            <div className="footer-brand">
              <Link className="footer-logo flex w-fit" href={hrefFor("/")} aria-label={chrome.home} prefetch={false}>
                <DeferredImg
                  src="/assets/logos/footer-nav.webp"
                  alt="Kinexis Digital"
                  width={420}
                  height={420}
                  className="h-auto w-[132px] lg:w-[168px]"
                />
              </Link>
              <p className="footer-blurb mt-4 text-[0.95rem] leading-snug text-white/80">
                {locale === "en" ? (
                  <>
                    <span className="block tracking-[0.05em]">Digital marketing, SEO, and websites</span>
                    <span className="block">for businesses across the United States.</span>
                  </>
                ) : <span className="block">{chrome.footerBlurb}</span>}
                {chrome.region ? <span className="mt-2 block text-sm text-white/70">{chrome.region}</span> : null}
              </p>
              <address className="footer-contact mt-5 grid gap-2 border-t border-white/15 pt-5 not-italic">
                <a className={contactLink} href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
                <a className={contactLink} href={telHref(SITE.phone)}>
                  {SITE.phone}
                </a>
              </address>
              <div className="footer-social mt-4 flex items-center gap-2">
                <FacebookChooser english={SITE.social.Facebook} spanish={SITE.social["Facebook ES"]} />
                <a className={youtubeButton} href={SITE.social.YouTube} target="_blank" rel="noopener noreferrer" aria-label="Kinexis Digital on YouTube">
                  <YouTubeIcon />
                </a>
                {otherSocial.map(([name, url]) => (
                  <a key={name} className={iconButton} href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
                    {name}
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-navigation">
              <LinkColumn title={chrome.helpful} links={helpful.map(([href, label]) => ({ href: hrefFor(href), label }))} />
              <LinkColumn title={chrome.services} links={chrome.serviceLinks.map(([href, label]) => ({ href: hrefFor(href), label }))} />
              <LinkColumn title={chrome.support} links={chrome.supportLinks.map(([href, label]) => ({ href: href === "/pay" ? "/pay" : hrefFor(href), label }))} />
            </div>
          </div>

          <div id="footer-legal" className="footer-legal">
            <p className="footer-copyright">© {new Date().getFullYear()} {SITE.name}</p>
            <LanguageSwitch className="footer-language shrink-0" locale={locale} path={path} label={chrome.language} />
            <nav aria-label={chrome.legal} className="footer-policies">
              <Link className={legalLink} href="/pay" hrefLang={locale === "en" ? undefined : "en-US"} prefetch={false}>{chrome.pay}</Link>
              <Link className={legalLink} href={hrefFor("/terms")} prefetch={false}>{chrome.terms}</Link>
              <Link className={legalLink} href={hrefFor("/privacy")} prefetch={false}>{chrome.privacy}</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
