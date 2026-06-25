import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import AuthorPageClient from "@/components/pages/AuthorPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { getAuthor } from "@/content/authors";
import { authorSlugs } from "@/content/registry/site-routes";
import { routing, type Locale } from "@/i18n/routing";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema, personSchema } from "@/lib/schema";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    authorSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const author = getAuthor(slug, locale);
  if (!author) return {};
  return buildPageMetadata({
    locale,
    path: `/team/${slug}`,
    title: `${author.name} | ${author.jobTitle} | KINEXIS Digital`,
    description: author.bio.slice(0, 155),
  });
}

export default async function AuthorPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const author = getAuthor(slug, locale);
  if (!author) notFound();

  const url = buildAbsoluteUrl(locale, `/team/${slug}`);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          personSchema({
            name: author.name,
            jobTitle: author.jobTitle,
            description: author.bio,
            url,
          }),
          breadcrumbSchema([
            { name: "Home", url: buildAbsoluteUrl(locale, "/") },
            { name: "About", url: buildAbsoluteUrl(locale, "/about") },
            { name: author.name },
          ]),
        ]}
      />
      <AuthorPageClient author={author} />
    </>
  );
}
