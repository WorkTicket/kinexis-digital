import {
  ShowcaseSite,
  type ShowcaseVariant,
} from "@/components/landing/ShowcaseSite";

type Props = {
  caption?: string;
  variant?: ShowcaseVariant;
  priority?: boolean;
};

export function PhoneFrame({
  variant = "ridge",
  priority = false,
}: {
  variant?: ShowcaseVariant;
  priority?: boolean;
}) {
  return (
    <div className="lp-audit-phone">
      <span className="lp-audit-phone__island" aria-hidden />
      <div className="lp-audit-phone__screen">
        <ShowcaseSite variant={variant} layout="phone" priority={priority} />
      </div>
      <span className="lp-audit-phone__bar" aria-hidden />
    </div>
  );
}

export function TabletFrame({
  variant = "ridge",
}: {
  variant?: ShowcaseVariant;
}) {
  return (
    <div className="lp-audit-tablet">
      <span className="lp-audit-tablet__cam" aria-hidden />
      <div className="lp-audit-tablet__screen">
        <ShowcaseSite variant={variant} layout="tablet" />
      </div>
    </div>
  );
}

export function LaptopFrame({
  variant = "ridge",
  priority = false,
}: {
  variant?: ShowcaseVariant;
  priority?: boolean;
}) {
  return (
    <div className="lp-audit-laptop">
      <div className="lp-audit-laptop__lid">
        <span className="lp-audit-laptop__cam" aria-hidden />
        <div className="lp-audit-laptop__screen">
          <ShowcaseSite variant={variant} layout="desktop" priority={priority} />
        </div>
      </div>
      <div className="lp-audit-laptop__deck" aria-hidden>
        <span className="lp-audit-laptop__hinge" />
        <span className="lp-audit-laptop__base" />
      </div>
    </div>
  );
}

/** Laptop with an overlapping phone — hero and transformation. */
export function HeroCluster({
  variant = "ridge",
  priority = false,
  caption,
}: {
  variant?: ShowcaseVariant;
  priority?: boolean;
  caption?: string;
}) {
  return (
    <figure className="lp-hero-cluster">
      <div className="lp-hero-cluster__stage">
        <div className="lp-hero-cluster__desk">
          <LaptopFrame variant={variant} priority={priority} />
        </div>
        <div className="lp-hero-cluster__phone">
          <PhoneFrame variant={variant} />
        </div>
      </div>
      {caption ? (
        <figcaption className="lp-hero-cluster__caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/** Same mock website on laptop, tablet, and phone. */
export function ViewportCluster({
  caption = "The same site on every screen. The offer stays in reach.",
  variant = "ridge",
  priority = false,
}: Props) {
  return (
    <figure className="lp-audit-viewports">
      <div className="lp-audit-viewports__desk">
        <LaptopFrame variant={variant} priority={priority} />
      </div>
      <div className="lp-audit-viewports__tablet">
        <TabletFrame variant={variant} />
      </div>
      <div className="lp-audit-viewports__phone">
        <PhoneFrame variant={variant} />
      </div>
      {caption ? (
        <figcaption className="lp-audit-viewports__caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
