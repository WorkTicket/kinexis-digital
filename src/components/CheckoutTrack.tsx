"use client";

import { useEffect } from "react";

/** Fire consent-gated purchase analytics once on the thanks page (GA4 + Meta). */
export default function CheckoutTrack({
  name,
  params,
}: {
  name: "purchase" | "subscription_created";
  params?: Record<string, string | number>;
}) {
  const serialized = JSON.stringify(params ?? {});
  useEffect(() => {
    const key = `kinexis_tracked_${name}_${serialized}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* Storage may be disabled; still attempt a single effect fire. */
    }

    const detailParams = JSON.parse(serialized) as Record<string, string | number>;
    // Defer one frame so boot.js consent listeners are attached after hydration.
    const timer = window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent("kinexis:track", {
        detail: { name, params: detailParams },
      }));
      if (name === "purchase") {
        const value = typeof detailParams.value === "number"
          ? detailParams.value
          : Number(detailParams.value);
        window.dispatchEvent(new CustomEvent("kinexis:track-meta", {
          detail: {
            name: "Purchase",
            params: {
              currency: String(detailParams.currency || "USD"),
              ...(Number.isFinite(value) ? { value } : {}),
              content_name: String(detailParams.plan || detailParams.kind || "purchase"),
            },
          },
        }));
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [name, serialized]);
  return null;
}
