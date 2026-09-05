import { CallButton } from "@/components/analytics/CallButton";
import { getBusinessPhoneDisplay, getBusinessTelHref } from "@/lib/business";
import { cn } from "@/lib/cn";

type Props = {
  compact?: boolean;
  hint?: string;
};

/**
 * Second conversion path on paid landers. Meta traffic is mostly mobile —
 * a visible tel: CTA next to the form lifts call volume without killing form leads.
 */
export function LandingCallPath({ compact = false, hint }: Props) {
  if (!getBusinessTelHref()) return null;
  const display = getBusinessPhoneDisplay();

  return (
    <div className={cn("lp-call-path", compact && "lp-call-path--compact")}>
      <p className="lp-call-path__rule">Prefer to talk</p>
      <CallButton size={compact ? "md" : "lg"} fullWidth>
        Call {display}
      </CallButton>
      <p className="lp-call-path__hint">
        {hint ?? "Same-day pickup on mobile. Ask for the growth consult."}
      </p>
    </div>
  );
}
