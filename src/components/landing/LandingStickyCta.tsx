"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { Button } from "@/components/ui/Button";
import { trackLandingFunnel } from "@/lib/analytics/landing-funnel";
import { cn } from "@/lib/cn";
import { isInAppBrowser } from "@/lib/in-app-browser";

type Props = {
  label: string;
  formId?: string;
  /** Hide until this element leaves the viewport (usually the hero CTA). */
  revealAfterId?: string;
  /** Optional quiet line under the button (e.g. free / no-obligation). */
  note?: string;
};

function keyboardCoversViewport(): boolean {
  const vv = window.visualViewport;
  if (!vv) return false;
  return window.innerHeight - vv.height > 80;
}

function scrollToLeadForm(id: string) {
  const el =
    document.getElementById(id) ?? document.getElementById("lp-form");
  if (!el) return;
  el.scrollIntoView({
    behavior: isInAppBrowser() ? "auto" : "smooth",
    block: "start",
  });
}

/**
 * Sticky CTA for paid landers on phone and tablet. Form only — phone is not
 * the primary action on cold Meta traffic. Hidden from lg up once the hero
 * form sits in a persistent side panel. Hidden while the hero form is on screen,
 * and tucked away before the site footer so the two never compete.
 */
export function LandingStickyCta({
  label,
  formId = "lp-form",
  revealAfterId,
  note,
}: Props) {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const [formInView, setFormInView] = useState(false);
  const [heroInView, setHeroInView] = useState(Boolean(revealAfterId));

  useEffect(() => {
    const syncKeyboard = () => setKeyboardOpen(keyboardCoversViewport());
    syncKeyboard();
    const vv = window.visualViewport;
    vv?.addEventListener("resize", syncKeyboard);
    window.addEventListener("resize", syncKeyboard);
    return () => {
      vv?.removeEventListener("resize", syncKeyboard);
      window.removeEventListener("resize", syncKeyboard);
    };
  }, []);

  useEffect(() => {
    const footer = document.querySelector(".site-footer");
    if (!footer) {
      setFooterInView(false);
      return;
    }
    // Treat the footer as "here" before it reaches the dock so the two never stack.
    const observer = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      {
        root: null,
        rootMargin: "0px 0px 160px 0px",
        threshold: 0,
      },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el =
      document.getElementById(formId) ?? document.getElementById("lp-form");
    if (!el) {
      setFormInView(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setFormInView(entry.isIntersecting),
      // Keep the dock away while the lead form is in or near the viewport.
      { threshold: 0, rootMargin: "80px 0px 80px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [formId]);

  useEffect(() => {
    if (!revealAfterId) return;
    const el = document.getElementById(revealAfterId);
    if (!el) {
      setHeroInView(false);
      return;
    }
    // Keep the dock hidden until the hero CTA has scrolled fully past the
    // top — IntersectionObserver alone treats "still below the fold" as gone.
    let frame = 0;
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setHeroInView(el.getBoundingClientRect().bottom > 8);
      });
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [revealAfterId]);

  const onFormLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) {
      return;
    }
    event.preventDefault();
    trackLandingFunnel("cta_click", { placement: "sticky" });
    scrollToLeadForm(formId);
  };

  if (keyboardOpen || formInView || heroInView) return null;

  return (
    <div
      className={cn(
        "landing-sticky-cta pointer-events-none fixed inset-x-0 bottom-0 z-40 lg:hidden",
        footerInView && "landing-sticky-cta--at-end",
      )}
      aria-hidden={footerInView || undefined}
      inert={footerInView || undefined}
    >
      <div className="landing-sticky-cta__panel pointer-events-auto">
        <div className="landing-sticky-cta__inner">
          {note ? <p className="landing-sticky-cta__note">{note}</p> : null}
          <Button
            href={`#${formId}`}
            size="lg"
            fullWidthMobile
            className="landing-sticky-cta__btn w-full"
            onClick={onFormLinkClick}
          >
            {label}
          </Button>
        </div>
      </div>
    </div>
  );
}
