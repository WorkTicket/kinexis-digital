"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState, type ComponentType, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import TwoLineText from "@/components/ui/TwoLineText";
import SiteCTA from "@/components/ui/SiteCTA";
import { scheduleIdleOrScroll as scheduleMotionActivation } from "@/lib/schedule-idle-or-scroll";

const sectionFallback = (minHeight: string) =>
  function SectionFallback() {
    return <div className="w-full" style={{ minHeight }} aria-hidden />;
  };

const ProofStrip = dynamic(() => import("@/components/sections/ProofStrip"), {
  loading: sectionFallback("12rem"),
  ssr: false,
});
const RevenueEngine = dynamic(() => import("@/components/sections/RevenueEngine"), {
  loading: sectionFallback("26rem"),
  ssr: false,
});
const ServicesEcosystem = dynamic(() => import("@/components/sections/ServicesEcosystem"), {
  loading: sectionFallback("30rem"),
  ssr: false,
});
const FeaturedResults = dynamic(() => import("@/components/sections/FeaturedResults"), {
  loading: sectionFallback("32rem"),
  ssr: false,
});
const Philosophy = dynamic(() => import("@/components/sections/Philosophy"), {
  loading: sectionFallback("28rem"),
  ssr: false,
});

const PLACEHOLDER_HEIGHTS = ["12rem", "26rem", "30rem", "32rem", "28rem", "16rem"] as const;

function SectionPlaceholders() {
  return (
    <>
      {PLACEHOLDER_HEIGHTS.map((minHeight, index) => (
        <div key={index} className="w-full" style={{ minHeight }} aria-hidden />
      ))}
    </>
  );
}

function HomeBottomCTA() {
  const t = useTranslations("cta");
  const tCommon = useTranslations("common");

  return (
    <SiteCTA
      tone="cta"
      showGlow={false}
      badge={t("label")}
      title={
        <>
          {t("title")}{" "}
          <span className="gradient-text">{t("titleHighlight")}</span>
        </>
      }
      subtitle={<TwoLineText text={t("subtitle")} variant="body" />}
      primaryLabel={tCommon("bookStrategyCall")}
      secondaryLabel={tCommon("viewOurWork")}
      secondaryHref="/case-studies"
      viewportMargin="-50px"
    />
  );
}

function HomeBelowFoldSections() {
  return (
    <>
      <Suspense>
        <ProofStrip surfaceIndex={0} />
      </Suspense>
      <Suspense>
        <RevenueEngine surfaceIndex={1} />
      </Suspense>
      <Suspense>
        <ServicesEcosystem surfaceIndex={2} />
      </Suspense>
      <Suspense>
        <FeaturedResults surfaceIndex={3} />
      </Suspense>
      <Suspense>
        <Philosophy surfaceIndex={4} />
      </Suspense>
      <Suspense>
        <HomeBottomCTA />
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
