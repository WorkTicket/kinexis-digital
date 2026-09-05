"use client";

import { Button } from "@/components/ui/Button";
import { usePathname } from "@/i18n/navigation";
import { getLandingChrome } from "@/lib/landing-chrome";
import { CTA_PRIMARY_HREF } from "@/lib/site-cta";

type Props = {
  eyebrow: string;
  title: string;
  dek: string;
  buttonLabel: string;
};

/**
 * Site footer closer. On paid landers this becomes a text link back to the
 * on-page form so "Book a strategy call" does not compete with the offer.
 */
export function FooterCtaBand({ eyebrow, title, dek, buttonLabel }: Props) {
  const pathname = usePathname();
  const landing = getLandingChrome(pathname);

  if (landing) {
    return (
      <div className="shell site-footer__cta-row">
        <div className="site-footer__cta-copy">
          <p className="section-eyebrow site-footer__cta-eyebrow">{eyebrow}</p>
          <p className="site-footer__cta-title">{landing.closingTitle}</p>
          <p className="site-footer__cta-dek">{landing.closingCopy}</p>
        </div>
        <div className="site-footer__cta-actions">
          <a href={landing.formHref} className="site-footer__cta-text">
            {landing.ctaLabel}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="shell site-footer__cta-row">
      <div className="site-footer__cta-copy">
        <p className="section-eyebrow site-footer__cta-eyebrow">{eyebrow}</p>
        <p className="site-footer__cta-title">{title}</p>
        <p className="site-footer__cta-dek">{dek}</p>
      </div>
      <Button href={CTA_PRIMARY_HREF} variant="outline" size="lg" fullWidthMobile arrow>
        {buttonLabel}
      </Button>
    </div>
  );
}
