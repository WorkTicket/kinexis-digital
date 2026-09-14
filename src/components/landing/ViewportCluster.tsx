import {
  ShowcaseSite,
  type ShowcaseVariant,
} from "@/components/landing/ShowcaseSite";

type Props = {
  caption?: string;
  variant?: ShowcaseVariant;
  priority?: boolean;
};

function FramePhoto({
  src,
  priority = false,
  crop = "desk",
}: {
  src: string;
  priority?: boolean;
  crop?: "desk" | "phone";
}) {
  return (
    // Decorative miniature site — parent figure has the accessible name.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={crop === "phone" ? 390 : 2880}
      height={crop === "phone" ? 844 : 1800}
      decoding={priority ? "sync" : "async"}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "low"}
      className={
        crop === "phone"
          ? "lp-frame-photo lp-frame-photo--portrait"
          : "lp-frame-photo"
      }
    />
  );
}

export function PhoneFrame({
  variant = "ridge",
  priority = false,
  image,
}: {
  variant?: ShowcaseVariant;
  priority?: boolean;
  image?: string;
}) {
  return (
    <div className="lp-audit-phone">
      <span className="lp-audit-phone__island" aria-hidden />
      <div className="lp-audit-phone__screen">
        {image ? (
          <FramePhoto src={image} priority={priority} crop="phone" />
        ) : (
          <ShowcaseSite variant={variant} layout="phone" priority={priority} />
        )}
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
  image,
}: {
  variant?: ShowcaseVariant;
  priority?: boolean;
  image?: string;
}) {
  return (
    <div className="lp-audit-laptop">
      <div className="lp-audit-laptop__lid">
        <span className="lp-audit-laptop__cam" aria-hidden />
        <div className="lp-audit-laptop__screen">
          {image ? (
            <FramePhoto src={image} priority={priority} />
          ) : (
            <ShowcaseSite variant={variant} layout="desktop" priority={priority} />
          )}
        </div>
      </div>
      <div className="lp-audit-laptop__deck" aria-hidden>
        <span className="lp-audit-laptop__hinge" />
        <span className="lp-audit-laptop__base" />
      </div>
    </div>
  );
}

/** Laptop mock with an overlapping phone — real screenshots, no slider. */
export function HeroCluster({
  variant = "ridge",
  priority = false,
  caption,
  image,
  imageAlt,
  phoneImage,
}: {
  variant?: ShowcaseVariant;
  priority?: boolean;
  caption?: string;
  image?: string;
  imageAlt?: string;
  phoneImage?: string;
}) {
  const livePhone = Boolean(phoneImage);
  const phoneSrc = phoneImage ?? image;

  return (
    <figure
      className={livePhone ? "lp-hero-cluster lp-hero-cluster--live" : "lp-hero-cluster"}
      aria-label={imageAlt ?? caption}
    >
      <div className="lp-hero-cluster__stage">
        <div className="lp-hero-cluster__desk">
          <LaptopFrame
            variant={variant}
            image={image}
            priority={priority && !livePhone}
          />
        </div>
        {phoneSrc ? (
          <div className="lp-hero-cluster__phone">
            <PhoneFrame
              variant={variant}
              image={phoneSrc}
              priority={priority && livePhone}
            />
          </div>
        ) : null}
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
