"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

type Props = {
  label: string;
  formId?: string;
};

/**
 * Mobile sticky CTA for paid landers. Hides when the lead form is in view
 * so it does not cover the primary conversion action.
 */
export function LandingStickyCta({ label, formId = "lp-form" }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById(formId);
    if (!form) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { rootMargin: "-40px 0px 0px 0px", threshold: 0.15 },
    );

    observer.observe(form);
    return () => observer.disconnect();
  }, [formId]);

  if (!visible) return null;

  return (
    <div className="landing-sticky-cta pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden">
      <div className="pointer-events-auto mx-auto max-w-lg rounded-2xl border border-foreground/10 bg-[color-mix(in_oklab,var(--background)_92%,transparent)] p-3 shadow-[0_-8px_32px_rgba(0,0,0,0.12)] backdrop-blur-md">
        <Button href={`#${formId}`} size="lg" fullWidthMobile className="w-full">
          {label}
        </Button>
      </div>
    </div>
  );
}
