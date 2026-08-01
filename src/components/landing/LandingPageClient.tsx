"use client";

import { useEffect, useState } from "react";
import type { LandingPageEntry } from "@/content/registry/landing-pages";
import LandingLeadForm from "@/components/landing/LandingLeadForm";
import FAQSection from "@/components/sections/FAQSection";
import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { Link } from "@/i18n/navigation";
import { businessProfile, getBusinessTelHref } from "@/lib/business";
import { trackBookingClick, trackCallClick } from "@/lib/analytics/events";
import { buttonClasses } from "@/lib/button-styles";
import { cn } from "@/lib/utils";

type Props = { page: LandingPageEntry };

export default function LandingPageClient({ page }: Props) {
  const [showSticky, setShowSticky] = useState(false);
  const telHref = getBusinessTelHref();
  const bookingUrl = businessProfile.bookingUrl;

  useEffect(() => {
    const onScroll = () => {
      setShowSticky(window.scrollY > 480);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Conversion hero — form-first, homepage atmosphere */}
      <section className="hero hero--page relative overflow-hidden border-b border-surface">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute left-1/2 top-[18%] h-[28rem] w-[min(100%,42rem)] -translate-x-1/2 rounded-full bg-neon-cyan/[0.035] blur-[120px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
        </div>

        <div className="container-site relative z-10 grid gap-10 py-14 md:grid-cols-2 md:gap-12 md:py-20 lg:items-start">
          <div>
            <p className="hero-label">{page.badge}</p>
            <h1 className="mt-5 type-hero text-balance">
              {page.headline}{" "}
              <span className="gradient-text">{page.headlineAccent}</span>
            </h1>
            <p className="mt-5 max-w-xl type-body text-muted md:text-lg">{page.subheadline}</p>

            <ul className="mt-8 space-y-3">
              {page.bullets.slice(0, 3).map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-cyan" aria-hidden />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {(telHref || bookingUrl) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {telHref ? (
                  <a
                    href={telHref}
                    className={buttonClasses({ variant: "secondary", size: "sm" })}
                    onClick={() => trackCallClick()}
                  >
                    Call {businessProfile.phone}
                  </a>
                ) : null}
                {bookingUrl ? (
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClasses({ variant: "ghost", size: "sm" })}
                    onClick={() => trackBookingClick()}
                  >
                    Book a call
                  </a>
                ) : null}
              </div>
            )}

            <p className="mt-6 text-sm text-muted">
              Not ready to talk?{" "}
              <Link
                href="/lead-magnet"
                className="font-medium text-neon-cyan underline underline-offset-2 transition-colors hover:text-white"
              >
                Get a free growth audit
              </Link>{" "}
              first.
            </p>
          </div>

          <LandingLeadForm
            serviceLabel={page.serviceLabel}
            formTitle={page.formTitle}
            formSubtitle={page.formSubtitle}
            submitLabel={page.submitLabel}
            formFootnote={page.formFootnote}
          />
        </div>
      </section>

      {/* Proof — homepage ProofStrip pattern (no metric cards) */}
      <Section id="lp-proof" surfaceIndex={0} compact className="border-y border-surface">
        <div className="container-site">
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted md:mb-10 md:text-[0.9375rem]">
            {page.proofIntro}
          </p>
          <ul className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/[0.08]">
            {page.proof.map((item, index) => (
              <li key={item.label}>
                <div
                  className={cn(
                    "flex h-full flex-col gap-2 lg:px-8",
                    index === 0 && "lg:pl-0",
                    index === page.proof.length - 1 && "lg:pr-0",
                  )}
                >
                  <span className="type-metric text-3xl font-bold tracking-tight sm:text-4xl">
                    <span className="gradient-text">{item.metric}</span>
                  </span>
                  <span className="text-sm font-medium leading-snug text-white/85">{item.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="lp-bullets" surfaceIndex={1}>
        <div className="container-site max-w-3xl">
          <SectionHeader title={page.bulletsTitle} headingId="lp-bullets-heading" />
          <ul className="section-content space-y-4">
            {page.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 type-body text-muted">
                <span className="mt-1 shrink-0 text-neon-cyan" aria-hidden>
                  →
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <FAQSection
        label="Questions before you reach out"
        title="Straight answers"
        items={page.faqs}
        surfaceIndex={2}
      />

      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-surface bg-bg-dark/95 p-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <a
          href="#lp-form"
          className={buttonClasses({ variant: "primary", fullWidthMobile: true })}
        >
          {page.stickyCtaLabel}
        </a>
      </div>
    </>
  );
}
