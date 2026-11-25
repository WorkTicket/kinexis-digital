import type { ReactNode } from "react";
import { OpenDialog } from "./OpenDialog";

type Props = {
  className?: string;
  leadLabel?: ReactNode;
  refundLabel?: ReactNode;
  downLabel?: ReactNode;
  previewLabel?: ReactNode;
};

/** Fine-print risk reversal under CTAs — highlighter guarantee marks + $0 / preview line. */
export default function TrustStrip({
  className = "",
  leadLabel = "60-Day Lead Guarantee",
  refundLabel = "30-Day Money-Back Guarantee",
  downLabel = "$0 down",
  previewLabel = "Free preview in 2 business days",
}: Props) {
  return (
    <div className={`trust-fineprint${className ? ` ${className}` : ""}`}>
      <p className="trust-fineprint__guarantees">
        <OpenDialog id="guarantee" className="trust-hl">{leadLabel}</OpenDialog>
        <OpenDialog id="refund" className="trust-hl">{refundLabel}</OpenDialog>
      </p>
      <p className="trust-fineprint__meta">
        <span>{downLabel}</span>
        <span className="trust-fineprint__sep" aria-hidden="true">·</span>
        <span>{previewLabel}</span>
      </p>
    </div>
  );
}
