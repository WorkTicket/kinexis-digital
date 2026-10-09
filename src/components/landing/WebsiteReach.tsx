import { CallLink } from "@/components/analytics/CallLink";
import { WhatsAppLink } from "@/components/landing/WhatsAppLink";
import { PhoneMark } from "@/components/ui/PhoneMark";
import type { LandingPageEntry } from "@/content/registry/landing-pages";
import { getBusinessPhoneDisplay } from "@/lib/business";

/**
 * Corner control for get-a-website, shown with the back-to-top button.
 * English is the call button. Spanish is WhatsApp only.
 */
export function WebsiteContactDock({ page }: { page: LandingPageEntry }) {
  const display = getBusinessPhoneDisplay();
  const callLabel = page.callHeroLabel;
  const callAria =
    callLabel && display ? `${callLabel}, ${display}` : callLabel;
  const whatsapp =
    page.whatsappHref && page.whatsappHeroLabel
      ? { href: page.whatsappHref, label: page.whatsappHeroLabel }
      : null;

  if (!callAria && !whatsapp) return null;

  return (
    <div className="lp-contact-dock">
      {callAria ? (
        <CallLink
          className="lp-contact-dock__btn lp-contact-dock__btn--call"
          ariaLabel={callAria}
          dataCta="call-dock"
        >
          <PhoneMark />
        </CallLink>
      ) : null}
      {whatsapp ? (
        <WhatsAppLink
          href={whatsapp.href}
          label={whatsapp.label}
          variant="icon"
          className="lp-contact-dock__btn lp-contact-dock__btn--whatsapp"
          dataCta="whatsapp-dock"
        />
      ) : null}
    </div>
  );
}
