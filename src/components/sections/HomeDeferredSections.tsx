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

const RevenueEngine = dynamic(() => import("@/components/sections/RevenueEngine"), {
  loading: sectionFallback("32rem"),
  ssr: false,
});
const ServicesEcosystem = dynamic(() => import("@/components/sections/ServicesEcosystem"), {
  loading: sectionFallback("28rem"),
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

function HomeMidPageCTA() {
  const t = useTranslations("midCta");
  const tCommon = useTranslations("common");

  return (
    <SiteCTA
      tone="dark"
      title={<TwoLineText text={t("title")} variant="section" />}
      subtitle={<TwoLineText text={t("subtitle")} variant="body" />}
      primaryLabel={tCommon("bookStrategyCall")}
      secondaryLabel={t("secondaryCta")}
      secondaryHref="/lead-magnet"
      viewportMargin="-40px"
    />
  );
}

function HomeBottomCTA() {
  const t = useTranslations("cta");
  const tCommon = useTranslations("common");

  return (
    <SiteCTA
      tone="cta"
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
        <RevenueEngine surfaceIndex={0} />
      </Suspense>
      <Suspense>
        <ServicesEcosystem surfaceIndex={1} />
      </Suspense>
      <Suspense>
        <HomeMidPageCTA />
      </Suspense>
      <Suspense>
        <FeaturedResults surfaceIndex={2} />
      </Suspense>
      <Suspense>
        <Philosophy surfaceIndex={3} />
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
