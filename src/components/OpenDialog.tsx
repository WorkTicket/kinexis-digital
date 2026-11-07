import type { ReactNode } from "react";

export function OpenDialog({ id, className, children }: { id: "guarantee" | "refund" | "video"; className?: string; children: ReactNode }) {
  return <button type="button" className={className} data-dialog={id}>{children}</button>;
}
