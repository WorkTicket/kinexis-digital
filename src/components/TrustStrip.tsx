import type { ReactNode } from "react";
import { OpenDialog } from "./OpenDialog";

type Props = {
  className?: string;
  leadLabel?: ReactNode;
  refundLabel?: ReactNode;
  downLabel?: ReactNode;
  previewLabel?: ReactNode;
};

/** Fine-print risk reversal under CTAs. Matches the hero “Book a call” link style. */
export default function TrustStrip({
  className = "",
  leadLabel = "60-Day Lead Guarantee",
  refundLabel = "30-Day Money-Back Guarantee",
  downLabel = "$0 down",
  previewLabel = "Free preview in 2 business days",
}: Props) {
  return (
    <div className={`trust-fineprint${className ? ` ${className}` : ""}`}>
      <p className="trust-fineprint__row">
        <OpenDialog id="guarantee" className="link-btn">{leadLabel}</OpenDialog>
      </p>
      <p className="trust-fineprint__row">
        <OpenDialog id="refund" className="link-btn">{refundLabel}</OpenDialog>
      </p>
      <p className="trust-fineprint__row trust-fineprint__meta">
        <span>{downLabel}</span>
        {" · "}
        <span>{previewLabel}</span>
      </p>
    </div>
  );
}
