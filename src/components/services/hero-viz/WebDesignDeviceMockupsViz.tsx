"use client";

import {
  BrowserFrame,
  DeviceFrame,
  SkeletonBlock,
  SkeletonLine,
} from "./ServiceHeroVizParts";

export type DeviceMockupVariant = "desktop" | "laptop" | "tablet" | "mobile";

type Props = {
  variant: DeviceMockupVariant;
  delay?: number;
};

function DesktopSkeleton() {
  return (
    <>
      <SkeletonLine width="lg" />
      <SkeletonLine width="md" />
      <div className="mt-auto flex gap-1">
        <SkeletonBlock className="h-5 flex-1 !bg-neon-cyan/15" />
        <div className="h-5 w-8 rounded bg-white/[0.04]" />
      </div>
    </>
  );
}

function LaptopSkeleton() {
  return (
    <>
      <SkeletonLine width="lg" />
      <SkeletonLine width="md" />
      <div className="mt-auto flex gap-1.5">
        <SkeletonBlock className="h-4 flex-1 !bg-neon-cyan/12" />
        <SkeletonBlock className="h-4 w-10 !bg-white/[0.04]" />
      </div>
    </>
  );
}

function TabletSkeleton() {
  return (
    <>
      <SkeletonLine width="lg" />
      <SkeletonLine width="sm" />
      <SkeletonBlock className="mt-auto h-3 w-full !bg-neon-cyan/15" />
    </>
  );
}

function MobileSkeleton() {
  return (
    <>
      <SkeletonLine width="lg" />
      <SkeletonLine width="md" />
      <SkeletonBlock className="mt-auto h-2.5 w-full !bg-neon-cyan/15" />
    </>
  );
}

export default function WebDesignDeviceMockupsViz({ variant, delay = 0.3 }: Props) {
  if (variant === "desktop") {
    return (
      <BrowserFrame delay={delay} interactive frameClassName="h-[220px] w-[300px]">
        <DesktopSkeleton />
      </BrowserFrame>
    );
  }

  if (variant === "laptop") {
    return (
      <BrowserFrame delay={delay} interactive frameClassName="h-[200px] w-[260px]">
        <LaptopSkeleton />
      </BrowserFrame>
    );
  }

  if (variant === "tablet") {
    return (
      <DeviceFrame variant="tablet" delay={delay} interactive frameClassName="h-[190px] w-[145px]">
        <TabletSkeleton />
      </DeviceFrame>
    );
  }

  return (
    <DeviceFrame variant="mobile" delay={delay} interactive frameClassName="h-[210px] w-[105px]">
      <MobileSkeleton />
    </DeviceFrame>
  );
}
