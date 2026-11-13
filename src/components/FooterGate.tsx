import type { ReactNode } from "react";

/**
 * The shared lead form stays in the HTML on every page.
 * `html.no-lead` hides it before paint on contact, audit, strategy-call, and pay.
 */
export default function FooterGate({ children }: { children: ReactNode }) {
  return children;
}
