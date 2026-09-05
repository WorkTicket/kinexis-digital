import { getTranslations } from "next-intl/server";
import {
  GoogleAdsLogo,
  GoogleAnalyticsLogo,
  HubSpotLogo,
  LinkedInLogo,
  MetaLogo,
  MicrosoftLogo,
  SemrushLogo,
  TikTokLogo,
} from "@/components/home/certification-logos";

const partners = [
  { name: "Google Ads Partner", Icon: GoogleAdsLogo },
  { name: "Meta Business Partner", Icon: MetaLogo },
  { name: "Google Analytics Certified", Icon: GoogleAnalyticsLogo },
  { name: "HubSpot Partner", Icon: HubSpotLogo },
  { name: "Microsoft Ads Partner", Icon: MicrosoftLogo },
  { name: "LinkedIn Ads Partner", Icon: LinkedInLogo },
  { name: "Semrush Partner", Icon: SemrushLogo },
  { name: "TikTok Ads Partner", Icon: TikTokLogo },
] as const;

function TickerItem({
  name,
  Icon,
  maskSuffix,
}: (typeof partners)[number] & { maskSuffix: string }) {
  return (
    <li className="partner-ticker__item">
      <span className="partner-ticker__mark-slot" aria-hidden>
        <Icon
          className="partner-ticker__mark"
          maskId={name.startsWith("Google Ads") ? `google-g-${maskSuffix}` : undefined}
        />
      </span>
      <span className="partner-ticker__label">{name}</span>
    </li>
  );
}

function TickerTrack({
  ariaHidden,
  maskSuffix,
}: {
  ariaHidden?: boolean;
  maskSuffix: string;
}) {
  return (
    <ul
      className="partner-ticker__track"
      aria-hidden={ariaHidden || undefined}
    >
      {partners.map((partner) => (
        <TickerItem
          key={partner.name}
          {...partner}
          maskSuffix={maskSuffix}
        />
      ))}
    </ul>
  );
}

export async function HomeCertifications() {
  const t = await getTranslations("common");
  return (
    <section
      aria-labelledby="home-certifications-heading"
      className="cert-strip"
    >
      <div className="cert-strip__frame">
        <div className="shell cert-strip__label-row">
          <h2 id="home-certifications-heading" className="cert-strip__eyebrow">
            {t("platformCertified")}
          </h2>
        </div>

        <div className="partner-ticker" role="presentation">
          <div className="partner-ticker__viewport">
            <TickerTrack maskSuffix="a" />
            <TickerTrack ariaHidden maskSuffix="b" />
          </div>
        </div>
      </div>
    </section>
  );
}
