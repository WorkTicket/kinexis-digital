"use client";

import Image, { type ImageLoaderProps } from "next/image";
import type { LandingPageEntry } from "@/content/registry/landing-pages";

// Serve the pre-encoded AVIF variants directly from Cloudflare's asset CDN.
// No on-demand image transform is needed on the Worker for this LCP image.
function heroLoader({ src, width }: ImageLoaderProps) {
  return src.replace(/hero-devices\.webp(?:\?.*)?$/, `hero-devices-${width}-v3.avif`);
}

export function WebsiteHeroImage({ visual }: { visual: NonNullable<LandingPageEntry["heroDevices"]> }) {
  return (
    <Image
      loader={heroLoader}
      unoptimized={false}
      src={visual.src}
      alt={visual.alt}
      width={visual.width}
      height={visual.height}
      sizes={visual.sizes}
      priority
      fetchPriority="high"
    />
  );
}
