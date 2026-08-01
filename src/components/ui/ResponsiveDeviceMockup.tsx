import { cn } from "@/lib/utils";
import { BrowserChrome, FakeButton, FakeHeadline, FakeNav, SkeletonBlock } from "@/components/services/hero-viz/ServiceHeroVizParts";

export type DeviceType = "desktop" | "tablet" | "mobile";

function DesktopMockup() {
  return (
    <div className="mx-auto w-full max-w-none">
      <div className="viz-frame overflow-hidden rounded-[14px] border border-white/[0.1] bg-[linear-gradient(165deg,rgba(22,28,40,0.98),rgba(10,12,18,0.98))] p-3 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.55)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <BrowserChrome url="yoursite.com" className="[&>div]:mb-0" />
        <div className="mt-2 flex aspect-[16/10] flex-col gap-2 rounded-lg border border-white/[0.04] bg-white/[0.025] p-3">
          <FakeNav brand="Brand" />
          <FakeHeadline line1="Built to convert" line2="Every viewport, one experience." />
          <SkeletonBlock className="mt-1 flex-1 rounded-md" />
          <FakeButton label="Get Started" className="mt-auto max-w-[140px]" />
        </div>
      </div>
    </div>
  );
}

function TabletMockup() {
  return (
    <div className="mx-auto w-full max-w-[220px]">
      <div className="viz-frame overflow-hidden rounded-[16px] border border-white/[0.12] bg-[linear-gradient(165deg,rgba(22,28,40,0.98),rgba(10,12,18,0.98))] p-2.5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.55)]">
        <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-white/15" />
        <div className="flex aspect-[3/4] flex-col gap-2 rounded-xl border border-white/[0.04] bg-black/25 p-2.5">
          <FakeHeadline line1="Clear. Fast." line2="Thumb-friendly." />
          <SkeletonBlock className="flex-1 rounded-md" />
          <FakeButton label="Book Call" className="h-6 text-[8px]" />
        </div>
        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-white/15" />
      </div>
    </div>
  );
}

function MobileMockup() {
  return (
    <div className="mx-auto w-full max-w-[120px]">
      <div className="viz-frame overflow-hidden rounded-[1.75rem] border border-white/[0.12] bg-[linear-gradient(165deg,rgba(22,28,40,0.98),rgba(10,12,18,0.98))] p-1.5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.55)]">
        <div className="mx-auto mb-1.5 h-1.5 w-10 rounded-full bg-white/15" />
        <div className="flex aspect-[9/16] flex-col gap-1.5 rounded-[1.25rem] border border-white/[0.04] bg-black/25 p-2">
          <SkeletonBlock className="h-8 rounded-md" />
          <div className="text-[8px] font-bold text-white/80">Leads first</div>
          <div className="text-[7px] text-white/40">Mobile-ready</div>
          <FakeButton label="Call" className="mt-auto h-5 text-[7px]" />
        </div>
        <div className="mx-auto mt-1.5 h-1 w-8 rounded-full bg-white/20" />
      </div>
    </div>
  );
}

export function resolveDeviceType(title: string, index: number): DeviceType {
  const normalized = title.toLowerCase();
  if (/mobile|móvil|movil|phone|teléfono|telefono/.test(normalized)) return "mobile";
  if (/tablet|ipad/.test(normalized)) return "tablet";
  if (/desktop|escritorio|monitor|pc/.test(normalized)) return "desktop";
  return (["desktop", "tablet", "mobile"] as const)[index] ?? "desktop";
}

type ResponsiveDeviceMockupProps = {
  device: DeviceType;
  className?: string;
};

export default function ResponsiveDeviceMockup({ device, className }: ResponsiveDeviceMockupProps) {
  return (
    <div className={cn("flex w-full items-center justify-center", className)} aria-hidden>
      {device === "desktop" && <DesktopMockup />}
      {device === "tablet" && <TabletMockup />}
      {device === "mobile" && <MobileMockup />}
    </div>
  );
}
