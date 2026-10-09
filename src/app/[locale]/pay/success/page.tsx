import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { getPayContent } from "@/content/pay";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { buildPageMetadata } from "@/lib/metadata";

type Props = { params: LocaleParams };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const c = getPayContent(locale);
  return buildPageMetadata({
    locale,
    path: "/pay/success",
    title: c.successTitle,
    description: c.successCopy,
    noIndex: true,
    noFollow: true,
  });
}

export default async function PaySuccessPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const c = getPayContent(locale);

  return (
    <main className="relative flex flex-1 flex-col">
      <section className="chapter chapter--void">
        <div className="shell py-28 md:py-36">
          <div className="mx-auto max-w-xl text-center">
            <p className="section-eyebrow">{c.eyebrow}</p>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
              {c.successTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted">
              {c.successCopy}
            </p>
            <div className="mt-10 flex justify-center">
              <Button href="/" variant="link" arrow>
                {c.successHome}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
