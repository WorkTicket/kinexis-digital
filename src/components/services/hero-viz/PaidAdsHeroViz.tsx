"use client";

import type { PaidServiceVariant } from "@/content/services/paid-service-pillar";
import PaidAdsOverviewHeroViz from "./PaidAdsOverviewHeroViz";
import PpcManagementHeroViz from "./PpcManagementHeroViz";
import GoogleAdsHeroViz from "./GoogleAdsHeroViz";
import MetaAdsHeroViz from "./MetaAdsHeroViz";

type Props = {
  variant: PaidServiceVariant | "paid-ads";
  channelLabels?: { shortLabel: string }[];
};

export default function PaidAdsHeroViz({ variant }: Props) {
  switch (variant) {
    case "paid-ads":
      return <PaidAdsOverviewHeroViz />;
    case "ppc":
      return <PpcManagementHeroViz />;
    case "google-ads":
      return <GoogleAdsHeroViz />;
    case "meta-ads":
      return <MetaAdsHeroViz />;
  }
}
