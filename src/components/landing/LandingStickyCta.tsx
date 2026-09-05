"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { isInAppBrowser } from "@/lib/in-app-browser";

type Props = {
  label: string;
  formId?: string;
};

function keyboardCoversViewport(): boolean {
  const vv = window.visualViewport;
  if (!vv) return false;
  return window.innerHeight - vv.height > 80;
}

function footerEndIsVisible(): boolean {
  const footer = document.querySelector<HTMLElement>(".site-footer");
  const viewportBottom = window.innerHeight;
  if (footer) {
    return footer.getBoundingClientRect().bottom <= viewportBottom + 8;
  }
  const root = document.scrollingElement ?? document.documentElement;
  return root.scrollHeight - window.scrollY - viewportBottom < 24;
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
 * Mobile sticky CTA for paid landers. Form only — phone is not the primary
 * action on cold Meta traffic. Hidden while the hero form is on screen.
 */
export function LandingStickyCta({ label, formId = "lp-form" }: Props) {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [atPageEnd, setAtPageEnd] = useState(false);
  const [formInView, setFormInView] = useState(true);

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
    let frame = 0;
    const syncEnd = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setAtPageEnd(footerEndIsVisible());
      });
    };
    syncEnd();
    window.addEventListener("scroll", syncEnd, { passive: true });
    window.addEventListener("resize", syncEnd);
    window.visualViewport?.addEventListener("resize", syncEnd);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", syncEnd);
      window.removeEventListener("resize", syncEnd);
      window.visualViewport?.removeEventListener("resize", syncEnd);
    };
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
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [formId]);

  const onFormLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) {
      return;
    }
    event.preventDefault();
    scrollToLeadForm(formId);
  };

  if (keyboardOpen || formInView) return null;

  return (
    <div
      className={cn(
        "landing-sticky-cta pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden",
        atPageEnd && "landing-sticky-cta--at-end",
      )}
      aria-hidden={atPageEnd || undefined}
      inert={atPageEnd || undefined}
    >
      <div className="landing-sticky-cta__panel pointer-events-auto mx-auto max-w-lg rounded-2xl border border-foreground/10 bg-[color-mix(in_oklab,var(--background)_96%,transparent)] p-3">
        <Button
          href={`#${formId}`}
          size="lg"
          fullWidthMobile
          className="w-full"
          onClick={onFormLinkClick}
        >
          {label}
        </Button>
      </div>
    </div>
  );
}
