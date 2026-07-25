"use client";

import { useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { buttonClasses } from "@/lib/button-styles";
import { consumePendingConversion } from "@/lib/analytics/pending-conversion";
import {
  trackAuditLead,
  trackBookingClick,
  trackCallClick,
  trackLead,
} from "@/lib/analytics/events";
import { businessProfile, getBusinessTelHref } from "@/lib/business";

type ThankYouVariant = "lead" | "audit";

type Props = {
  variant: ThankYouVariant;
  title: string;
  subtitle: string;
  nextStepsTitle: string;
  nextSteps: string[];
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

export default function ThankYouClient({
  variant,
  title,
  subtitle,
  nextStepsTitle,
  nextSteps,
  secondaryCtaLabel,
  secondaryCtaHref,
}: Props) {
  const fired = useRef(false);
  const telHref = getBusinessTelHref();
  const bookingUrl = businessProfile.bookingUrl;

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const pending = consumePendingConversion(variant);
    if (variant === "audit") {
      trackAuditLead({
        email: pending?.email,
        formType: pending?.formType ?? "lead-magnet",
        serviceInterest: pending?.serviceInterest ?? "audit",
      });
    } else {
      trackLead({
        email: pending?.email,
        formType: pending?.formType ?? "contact",
        serviceInterest: pending?.serviceInterest,
      });
    }
  }, [variant]);

  return (
    <section className="container-site py-16 md:py-24">
      <Card hover={false} className="mx-auto max-w-xl !p-8 md:!p-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-neon-cyan/20 to-accent/20 ring-1 ring-neon-cyan/30">
          <CheckCircle className="h-8 w-8 text-neon-cyan" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 type-subheader text-white">{title}</h1>
        <p className="mt-3 type-body text-text-secondary">{subtitle}</p>

        <div className="mt-8 text-left">
          <p className="text-sm font-semibold text-white">{nextStepsTitle}</p>
          <ol className="mt-3 space-y-2">
            {nextSteps.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm text-text-secondary">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-semibold text-accent">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {telHref ? (
            <a
              href={telHref}
              className={buttonClasses({ variant: "primary" })}
              onClick={() => trackCallClick()}
            >
              Call us
            </a>
          ) : null}
          {bookingUrl ? (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses({
                variant: telHref ? "secondary" : "primary",
              })}
              onClick={() => trackBookingClick()}
            >
              Book a call
            </a>
          ) : null}
          <Button
            href={secondaryCtaHref}
            variant={telHref || bookingUrl ? "ghost" : "primary"}
          >
            {secondaryCtaLabel}
          </Button>
        </div>

        <p className="mt-6 text-xs text-text-muted">
          Prefer email?{" "}
          <a
            href={`mailto:${businessProfile.email}`}
            className="text-neon-cyan underline underline-offset-2"
          >
            {businessProfile.email}
          </a>
        </p>

        <p className="mt-4 text-xs text-text-muted">
          <Link href="/" className="underline underline-offset-2 hover:text-white">
            Back to homepage
          </Link>
        </p>
      </Card>
    </section>
  );
}
