"use client";

import { useEffect, useState } from "react";
import type { LandingPageEntry } from "@/content/registry/landing-pages";
import LandingLeadForm from "@/components/landing/LandingLeadForm";
import FAQSection from "@/components/sections/FAQSection";
import { businessProfile, getBusinessTelHref } from "@/lib/business";
import { trackBookingClick, trackCallClick } from "@/lib/analytics/events";
import { buttonClasses } from "@/lib/button-styles";

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
      {/* Hero + form */}
      <section className="relative overflow-hidden border-b border-surface">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,212,255,0.08),transparent_55%)]"
          aria-hidden
        />
        <div className="container-site relative grid gap-10 py-14 md:grid-cols-2 md:gap-12 md:py-20 lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neon-cyan">
              {page.badge}
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {page.headline}{" "}
              <span className="text-accent">{page.headlineAccent}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
              {page.subheadline}
            </p>

            <ul className="mt-8 space-y-3">
              {page.bullets.slice(0, 3).map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm text-text-secondary">
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

      {/* Proof bar */}
      <section className="border-b border-surface bg-bg-dark/50 py-12 md:py-16">
        <div className="container-site">
          <p className="text-center text-sm font-medium text-text-muted">{page.proofIntro}</p>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {page.proof.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-surface bg-surface-base/40 px-4 py-5 text-center"
              >
                <p className="text-2xl font-bold text-neon-cyan md:text-3xl">{item.metric}</p>
                <p className="mt-2 text-xs text-text-secondary leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full bullets */}
      <section className="border-b border-surface py-14 md:py-20">
        <div className="container-site max-w-3xl">
          <h2 className="type-subheader text-white">{page.bulletsTitle}</h2>
          <ul className="mt-8 space-y-4">
            {page.bullets.map((bullet) => (
              <li
                key={bullet}
                className="rounded-xl border border-surface bg-surface-base/30 px-5 py-4 text-sm leading-relaxed text-text-secondary"
              >
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FAQSection
        label="Questions before you reach out"
        title="Straight answers"
        items={page.faqs}
        surfaceIndex={0}
      />

      {/* Sticky mobile CTA */}
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
