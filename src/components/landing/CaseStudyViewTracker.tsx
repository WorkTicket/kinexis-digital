"use client";

import { useEffect, useRef } from "react";
import { trackLandingFunnel } from "@/lib/analytics/landing-funnel";

export function CaseStudyViewTracker({
  client,
  landingSlug = "get-a-website",
}: {
  client: string;
  landingSlug?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const sent = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || sent.current) return;
        sent.current = true;
        trackLandingFunnel("case_study_view", { landingSlug, client });
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [client, landingSlug]);

  return <span ref={ref} hidden />;
}
