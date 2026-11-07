"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE, telHref } from "@/lib/site";

function englishPath(pathname: string): string {
  if (pathname === "/es" || pathname === "/es-es") return "/";
  if (pathname.startsWith("/es-es/")) return pathname.slice("/es-es".length) || "/";
  if (pathname.startsWith("/es/")) return pathname.slice("/es".length) || "/";
  return pathname || "/";
}

const HIDDEN_PATHS = new Set(["/contact", "/strategy-call", "/upgrades"]);

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
      <span className="float-cta__label">
        {es ? <>Vista previa <b>gratis</b></> : <>Free <b>homepage preview</b></>}
      </span>
      <a className="btn btn--ghost float-cta__call" href={telHref(SITE.phone)}>{es ? "Llamar" : "Call"}</a>
      <Link className="btn btn--primary float-cta__preview" href={spanish("/contact")} prefetch={false}>
        <span className="float-cta__preview-full">{es ? "Ver mi vista previa gratis" : "Get My Free Preview"}</span>
        <span className="float-cta__preview-short">{es ? "Vista previa" : "Free Preview"}</span>
      </Link>
    </div>
  );
}
