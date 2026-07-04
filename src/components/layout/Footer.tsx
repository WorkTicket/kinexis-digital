import { getTranslations } from "next-intl/server";
import { Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import SiteLogo from "@/components/ui/SiteLogo";
import LanguageSwitcher from "./LanguageSwitcher";
import { mainNavLinks, footerServiceLinks } from "@/lib/site-nav";
import { cn } from "@/lib/utils";

export default async function Footer() {
  const tNav = await getTranslations("nav");
  const tServices = await getTranslations("services");
  const tFooter = await getTranslations("footer");
  const tCommon = await getTranslations("common");

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-bg-dark">
      {/* Dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.014)_1px,transparent_1px)] bg-[size:28px_28px] opacity-60"
        aria-hidden
      />
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute -left-48 bottom-0 h-[32rem] w-[32rem] rounded-full bg-neon-cyan/[0.03] blur-[130px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-[22rem] w-[22rem] rounded-full bg-neon-blue/[0.025] blur-[110px]"
        aria-hidden
      />
      {/* Top inset accent line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
        aria-hidden
      />

      {/* ── Main content ── */}
      <div className="container-site footer-main relative z-10">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-10">

          {/* ── Brand column ── */}
          <div className="col-span-2 flex flex-col items-center lg:col-span-1 lg:pr-10">
            <Link href="/" className="inline-block no-underline">
              <SiteLogo
                src="/assets/logos/KINEXIS_icon_logo.webp"
                alt="KINEXIS Digital"
                width={280}
                height={188}
                className="h-36 w-36 !object-cover !object-center overflow-hidden"
              />
            </Link>
            <p className="mt-3 text-xl font-bold tracking-wide text-white/70 text-center">
              KINEXIS Digital Marketing
            </p>
            <div className="mt-4 flex flex-col gap-2.5">
              <a
                href="mailto:hello@kinexisdigital.com"
                className="group flex items-center gap-2 text-[15px] text-muted/75 no-underline transition-colors duration-300 hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-neon-cyan/40 transition-colors duration-300 group-hover:text-neon-cyan/80" />
                hello@kinexisdigital.com
              </a>
            </div>
          </div>

          {/* ── Navigation ── */}
          <div>
            <div className="mb-4">
              <h3 className="text-[9px] font-bold uppercase tracking-[0.24em] text-white/25">
                {tFooter("navigation")}
              </h3>
            </div>
            <ul className="space-y-3">
              {mainNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted/75 no-underline transition-colors duration-200 hover:text-white"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services ── */}
          <div>
            <div className="mb-4">
              <h3 className="text-[9px] font-bold uppercase tracking-[0.24em] text-white/25">
                {tFooter("services")}
              </h3>
            </div>
            <ul className="space-y-3">
              {footerServiceLinks.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-muted/75 no-underline transition-colors duration-200 hover:text-white"
                  >
                    {tServices(service.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Mission card — right of services ── */}
          <div className="col-span-2 lg:col-span-1">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4 flex flex-col">
              <p className="text-sm font-semibold leading-snug text-white/80">
                {tFooter("missionTitle")}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted/75">
                {tFooter("missionBody")}
              </p>
              <Link
                href="/contact"
                className={cn(
                  "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient px-4 py-3 text-sm font-semibold tracking-wide text-white sm:w-auto",
                  "min-h-touch min-w-touch-lg sm:hover:shadow-glow"
                )}
              >
                {tCommon("bookStrategyCall")}
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-10 border-t border-white/[0.04]">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <p className="text-[11px] tracking-wide text-muted/30">
              &copy; {new Date().getFullYear()} {tFooter("copyright")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px]">
              <Link href="/privacy" className="text-muted/35 no-underline transition-colors hover:text-white/60">
                {tFooter("privacy")}
              </Link>
              <Link href="/terms" className="text-muted/35 no-underline transition-colors hover:text-white/60">
                {tFooter("terms")}
              </Link>
            </div>
          </div>
          <p className="order-3 text-[11px] italic tracking-wide text-muted/22 sm:order-2">
            {tFooter("builtWith")}
          </p>
          <div className="order-2 sm:order-3">
            <LanguageSwitcher variant="footer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
