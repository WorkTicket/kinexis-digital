"use client";

import { useEffect } from "react";

/** Fire a consent-gated analytics event once on the thanks page. */
export default function CheckoutTrack({
  name,
  params,
}: {
  name: "purchase" | "subscription_created";
  params?: Record<string, string>;
}) {
  const serialized = JSON.stringify(params ?? {});
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("kinexis:track", {
      detail: { name, params: JSON.parse(serialized) as Record<string, string> },
    }));
  }, [name, serialized]);
  return null;
}
