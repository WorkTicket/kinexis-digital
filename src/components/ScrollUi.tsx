"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function englishPath(pathname: string): string {
  if (pathname === "/es" || pathname === "/es-es") return "/";
  if (pathname.startsWith("/es-es/")) return pathname.slice("/es-es".length) || "/";
  if (pathname.startsWith("/es/")) return pathname.slice("/es".length) || "/";
  return pathname || "/";
}

const HIDDEN_PATHS = new Set(["/contact", "/strategy-call"]);

export default function ScrollUi() {
  const pathname = usePathname();
  const en = englishPath(pathname);
  const es = pathname.startsWith("/es");
  const isSpain = pathname.startsWith("/es-es");
  const prefix = isSpain ? "/es-es" : es ? "/es" : "";
  const spanish = (p: string) => (p === "/" ? prefix : `${prefix}${p}`);
  if (HIDDEN_PATHS.has(en) || en.startsWith("/pay")) return null;
  return (
    <div className="float-cta" inert>
      <span>{es ? <>Auditoría <b>gratis de sitio y SEO</b></> : <>Free <b>Website &amp; SEO Audit</b></>}</span>
      <Link className="btn btn--primary" href={spanish("/audit")} prefetch={false}>{es ? "Pedir auditoría" : "Request Audit"}</Link>
      <Link className="btn btn--ghost" href={spanish("/strategy-call")} prefetch={false}>{es ? "Agendar llamada" : "Book a Call"}</Link>
    </div>
  );
}
