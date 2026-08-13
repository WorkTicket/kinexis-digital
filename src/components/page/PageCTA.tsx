import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { ChapterMotion } from "@/components/home/ChapterMotion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import {
  CTA_PRIMARY_HREF,
  CTA_SECONDARY_HREF,
  type PageCtaLayout,
  type PageCtaMotion,
} from "@/lib/site-cta";
import { cn } from "@/lib/cn";

type PageCTAProps = {
  eyebrow?: string;
  title: string;
  copy: string;
  className?: string;
  id?: string;
  layout?: PageCtaLayout;
  motion?: PageCtaMotion;
  primaryLabel?: string;
  primaryHref?: string;
  /** Pass `null` to hide the secondary action. */
  secondaryLabel?: string | null;
  secondaryHref?: string;
  /** Pass `null` to hide meta. */
  meta?: string | null;
};

function CtaShell({
  motion,
  children,
}: {
  motion: PageCtaMotion;
  children: ReactNode;
}) {
  if (motion === "chapter") {
    return <ChapterMotion className="shell relative">{children}</ChapterMotion>;
  }
  return <div className="shell relative">{children}</div>;
}

/** Terminal / inline CTA shared across new-design pages. */
export async function PageCTA({
  eyebrow,
  title,
  copy,
  className,
  id,
  layout = "terminal",
  motion = "chapter",
  primaryLabel,
  primaryHref = CTA_PRIMARY_HREF,
  secondaryLabel,
  secondaryHref = CTA_SECONDARY_HREF,
  meta,
}: PageCTAProps) {
  const t = await getTranslations("common");
  const tNav = await getTranslations("nav");
  const isInline = layout === "inline";
  const resolvedId = id ?? (isInline ? "mid-cta" : "get-started");
  const resolvedEyebrow =
    eyebrow ?? (isInline ? t("ready") : tNav("contact"));
  const resolvedPrimaryLabel = primaryLabel ?? t("bookStrategyCall");
  const resolvedSecondaryLabel =
    secondaryLabel === undefined
      ? isInline
        ? null
        : t("sendMessage")
      : secondaryLabel;
  const resolvedMeta =
    meta === undefined ? (isInline ? null : t("ctaMeta")) : meta;
  const showSecondary =
    resolvedSecondaryLabel != null && resolvedSecondaryLabel !== "";
  const showMeta = resolvedMeta != null && resolvedMeta !== "";

  return (
    <section
      id={resolvedId}
      aria-labelledby={`${resolvedId}-heading`}
      className={cn(
        "cta-section chapter relative",
        isInline && "cta-section--inline",
        className,
      )}
    >
      <div className="cta-section__glow" aria-hidden />

      <CtaShell motion={motion}>
        <div
          className={cn("cta-terminal", isInline && "cta-terminal--inline")}
        >
          <Reveal variant="rise" when="chapter">
            <header className="cta-terminal__lead">
              <p className="section-eyebrow">{resolvedEyebrow}</p>
              <h2 id={`${resolvedId}-heading`} className="cta-heading">
                {title}
              </h2>
              <p className="cta-copy">{copy}</p>
            </header>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.16} when="chapter">
            <div className="cta-terminal__dock">
              <div className="cta-terminal__actions">
                <Button
                  href={primaryHref}
                  size={isInline ? "lg" : "xl"}
                  lift={!isInline}
                  arrow
                >
                  {resolvedPrimaryLabel}
                </Button>
                {showSecondary ? (
                  <Button href={secondaryHref} variant="link" arrow>
                    {resolvedSecondaryLabel}
                  </Button>
                ) : null}
              </div>
              {showMeta ? (
                <p className="cta-terminal__meta">
                  <span className="cta-terminal__meta-dot" aria-hidden />
                  {resolvedMeta}
                </p>
              ) : null}
            </div>
          </Reveal>
        </div>
      </CtaShell>
    </section>
  );
}

