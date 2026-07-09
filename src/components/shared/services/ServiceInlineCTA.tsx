"use client";

import SiteCTA from "@/components/ui/SiteCTA";

type Props = {
  label: string;
  subtitle?: string;
  surfaceIndex: number;
};

/** Mid-page conversion block — placed after proof on content-rich service pages. */
export default function ServiceInlineCTA({ label, subtitle, surfaceIndex }: Props) {
  return (
    <SiteCTA
      id="inline-cta"
      layout="inline"
      tone="story"
      surfaceIndex={surfaceIndex}
      title="Ready to see what this looks like for your business?"
      subtitle={
        subtitle ??
        "Book a strategy call. We will review your current setup and outline the highest-impact next steps."
      }
      primaryLabel={label}
      showGlow={false}
    />
  );
}
