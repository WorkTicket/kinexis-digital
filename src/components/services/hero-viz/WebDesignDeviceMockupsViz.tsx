"use client";

import {
  BrowserFrame,
  DeviceFrame,
  FakeButton,
  FakeHeadline,
  FakeNav,
  SkeletonBlock,
} from "./ServiceHeroVizParts";

export type DeviceMockupVariant = "desktop" | "laptop" | "tablet" | "mobile";

type Props = {
  variant: DeviceMockupVariant;
  delay?: number;
};

function DesktopLayout() {
  return (
    <>
      <FakeNav brand="Site" />
      <FakeHeadline line1="Websites that convert" line2="Designed for leads, not just looks." />
      <div className="mt-2 grid flex-1 grid-cols-3 gap-1.5">
        <SkeletonBlock className="rounded-md" />
        <div className="rounded-md border border-white/[0.05] bg-white/[0.03]" />
        <div className="rounded-md border border-white/[0.05] bg-white/[0.03]" />
      </div>
      <div className="mt-auto flex gap-1.5 pt-2">
        <FakeButton label="Start Project" className="flex-1" />
        <div className="flex h-7 w-12 items-center justify-center rounded-lg border border-white/10 text-[8px] text-white/40">
          Demo
        </div>
      </div>
    </>
  );
}

function LaptopLayout() {
  return (
    <>
      <FakeNav brand="Site" />
      <FakeHeadline line1="Built to perform" line2="Every breakpoint, tested." />
      <div className="mt-2 flex flex-1 gap-1.5">
        <SkeletonBlock className="flex-[1.6] rounded-md" />
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="flex-1 rounded-md border border-white/[0.05] bg-white/[0.03]" />
          <FakeButton label="Book Call" className="h-6 text-[8px]" />
        </div>
      </div>
    </>
  );
}

function TabletLayout() {
  return (
    <>
      <div className="mb-1.5 flex items-center justify-between">
        <div className="h-3 w-3 rounded bg-neon-cyan/40" />
        <span className="text-[7px] font-semibold text-white/50">Menu</span>
      </div>
      <FakeHeadline line1="Clear. Fast. Convert." />
      <SkeletonBlock className="mt-2 flex-1 rounded-md" />
      <FakeButton label="Get Quote" className="mt-auto h-6 text-[8px]" />
    </>
  );
}

function MobileLayout() {
  return (
    <>
      <div className="mb-1 flex justify-center">
        <div className="h-0.5 w-6 rounded-full bg-white/20" />
      </div>
      <SkeletonBlock className="h-9 w-full !rounded-lg" />
      <div className="mt-1.5 text-[8px] font-bold leading-tight text-white/85">Leads on mobile</div>
      <div className="mt-0.5 text-[7px] leading-snug text-white/40">Thumb-first layouts</div>
      <FakeButton label="Call Now" className="mt-auto h-5 text-[7px]" />
    </>
  );
}

export default function WebDesignDeviceMockupsViz({ variant, delay = 0.3 }: Props) {
  if (variant === "desktop") {
    return (
      <BrowserFrame
        delay={delay}
        interactive
        url="yoursite.com"
        frameClassName="h-[250px] w-[320px]"
      >
        <DesktopLayout />
      </BrowserFrame>
    );
  }

  if (variant === "laptop") {
    return (
      <BrowserFrame
        delay={delay}
        interactive
        url="yoursite.com/work"
        frameClassName="h-[220px] w-[280px]"
      >
        <LaptopLayout />
      </BrowserFrame>
    );
  }

  if (variant === "tablet") {
    return (
      <DeviceFrame variant="tablet" delay={delay} interactive frameClassName="h-[220px] w-[160px]">
        <TabletLayout />
      </DeviceFrame>
    );
  }

  return (
    <DeviceFrame variant="mobile" delay={delay} interactive frameClassName="h-[240px] w-[118px]">
      <MobileLayout />
    </DeviceFrame>
  );
}
