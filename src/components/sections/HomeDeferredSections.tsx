"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState, type ComponentType, type ReactNode } from "react";

const sectionFallback = (minHeight: string) =>
  function SectionFallback() {
    return <div className="w-full" style={{ minHeight }} aria-hidden />;
  };

const RevenueEngine = dynamic(() => import("@/components/sections/RevenueEngine"), {
  loading: sectionFallback("32rem"),
  ssr: false,
});
const ServicesEcosystem = dynamic(() => import("@/components/sections/ServicesEcosystem"), {
  loading: sectionFallback("28rem"),
  ssr: false,
});
const MidPageCTA = dynamic(() => import("@/components/sections/MidPageCTA"), {
  loading: sectionFallback("16rem"),
  ssr: false,
});
const FeaturedResults = dynamic(() => import("@/components/sections/FeaturedResults"), {
  loading: sectionFallback("24rem"),
  ssr: false,
});
const Philosophy = dynamic(() => import("@/components/sections/Philosophy"), {
  loading: sectionFallback("20rem"),
  ssr: false,
});
const CTASection = dynamic(() => import("@/components/sections/CTASection"), {
  loading: sectionFallback("18rem"),
  ssr: false,
});

const PLACEHOLDER_HEIGHTS = ["32rem", "28rem", "16rem", "24rem", "20rem", "18rem"] as const;

function SectionPlaceholders() {
  return (
    <>
      {PLACEHOLDER_HEIGHTS.map((minHeight) => (
        <div key={minHeight} className="w-full" style={{ minHeight }} aria-hidden />
      ))}
    </>
  );
}

function scheduleMotionActivation(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    callback();
  };

  if (typeof requestIdleCallback !== "undefined") {
    const id = requestIdleCallback(run, { timeout: 2500 });
    window.addEventListener("scroll", run, { once: true, passive: true });
    return () => {
      cancelIdleCallback(id);
      window.removeEventListener("scroll", run);
    };
  }

  const timer = window.setTimeout(run, 150);
  window.addEventListener("scroll", run, { once: true, passive: true });
  return () => {
    window.clearTimeout(timer);
    window.removeEventListener("scroll", run);
  };
}

function HomeBelowFoldSections() {
  return (
    <>
      <Suspense>
        <RevenueEngine />
      </Suspense>
      <Suspense>
        <ServicesEcosystem />
      </Suspense>
      <Suspense>
        <MidPageCTA />
      </Suspense>
      <Suspense>
        <FeaturedResults />
      </Suspense>
      <Suspense>
        <Philosophy />
      </Suspense>
      <Suspense>
        <CTASection />
      </Suspense>
    </>
  );
}

/** Below-fold homepage sections — FM loads on idle/scroll so the hero stays off the critical path. */
export default function HomeDeferredSections() {
  const [Provider, setProvider] = useState<ComponentType<{ children: ReactNode }> | null>(
    null
  );

  useEffect(() => {
    return scheduleMotionActivation(() => {
      void import("@/components/providers/FramerMotionProvider").then((m) => {
        setProvider(() => m.FramerMotionProvider);
      });
    });
  }, []);

  if (!Provider) {
    return <SectionPlaceholders />;
  }

  return (
    <Provider>
      <HomeBelowFoldSections />
    </Provider>
  );
}
