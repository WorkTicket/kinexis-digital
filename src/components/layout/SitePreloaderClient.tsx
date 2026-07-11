"use client";

import dynamic from "next/dynamic";

const SitePreloader = dynamic(() => import("@/components/layout/SitePreloader"), {
  ssr: false,
});

export default function SitePreloaderClient() {
  return <SitePreloader />;
}
