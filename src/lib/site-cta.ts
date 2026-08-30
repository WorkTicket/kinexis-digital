import { CTA_LABEL } from "@/lib/site-nav";

/** Shared new-design CTA offer — keep PageCTA, HomeCTA, and Footer in sync. */
export const CTA_EYEBROW = "Contact";
export const CTA_PRIMARY_LABEL = CTA_LABEL;
export const CTA_PRIMARY_HREF = "/contact";
export const CTA_SECONDARY_LABEL = "Send a message";
export const CTA_SECONDARY_HREF = "/contact#contact-form";
export const CTA_META = "30 minutes · Clear next steps";

export const CTA_INLINE_EYEBROW = "Ready?";
export const CTA_INLINE_TITLE = "Let's talk.";
export const CTA_INLINE_COPY =
  "We will map the first fix on a short strategy call.";

export type PageCtaLayout = "terminal" | "inline" | "minimal";
export type PageCtaMotion = "default" | "chapter";
