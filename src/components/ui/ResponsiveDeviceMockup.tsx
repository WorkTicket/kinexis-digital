import { cn } from "@/lib/utils";
import { BrowserChrome, SkeletonBlock, SkeletonLine } from "@/components/services/hero-viz/ServiceHeroVizParts";

export type DeviceType = "desktop" | "tablet" | "mobile";

function WireframeContent({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <SkeletonLine width="lg" className={compact ? "h-1" : undefined} />
      <SkeletonBlock className={cn("w-full", compact ? "mt-1 h-6" : "mt-2 h-10 md:h-12")} />
      <SkeletonLine className={compact ? "mt-1 h-1" : "mt-2"} />
      <SkeletonLine width="md" className={compact ? "mt-0.5 h-1" : "mt-1.5"} />
    </>
  );
}

function DesktopMockup() {
  return (
    <div className="mx-auto w-full max-w-none">
      <div className="overflow-hidden rounded-xl border-2 border-strong bg-[#0d1117] p-2.5 shadow-lg shadow-black/20">
        <BrowserChrome className="mb-2 [&>div]:h-2 [&>div]:w-2" />
        <div className="flex aspect-[16/10] flex-col gap-1.5 rounded-lg bg-surface-raised p-3">
          <WireframeContent />
        </div>
      </div>
    </div>
  );
}

function TabletMockup() {
  return (
    <div className="mx-auto w-full max-w-[220px]">
      <div className="overflow-hidden rounded-[14px] border-[3px] border-strong bg-[#0d1117] p-2 shadow-lg shadow-black/20">
        <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-white/10" />
        <div className="flex aspect-[3/4] flex-col gap-1.5 rounded-lg bg-surface-raised p-2.5">
          <WireframeContent compact />
        </div>
        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-surface-active" />
      </div>
    </div>
  );
}

function MobileMockup() {
  return (
    <div className="mx-auto w-full max-w-[120px]">
      <div className="overflow-hidden rounded-[1.75rem] border-[3px] border-strong bg-[#0d1117] p-1.5 shadow-lg shadow-black/20">
        <div className="mx-auto mb-1.5 h-1.5 w-10 rounded-full bg-white/10" />
        <div className="flex aspect-[9/16] flex-col gap-1 rounded-[1.25rem] bg-surface-raised p-2">
          <WireframeContent compact />
        </div>
        <div className="mx-auto mt-1.5 h-1 w-8 rounded-full bg-surface-active" />
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
