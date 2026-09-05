import { AuditHero } from "@/components/landing/AuditHero";
import {
  AuditClose,
  AuditFit,
  AuditMidCta,
  AuditPain,
  AuditPaths,
  AuditProcess,
  AuditProof,
  AuditWork,
} from "@/components/landing/AuditSections";
import {
  SalesBuild,
  SalesImagine,
  SalesPrice,
  SalesTransform,
  SalesWhy,
} from "@/components/landing/SalesChapters";
import { LandingStickyCta } from "@/components/landing/LandingStickyCta";
import { FaqAccordion } from "@/components/page/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import type { LandingPageEntry } from "@/content/registry/landing-pages";
import { faqSchema } from "@/lib/schema";
import "@/styles/components/landing.css";
import "@/styles/components/landing-audit.css";
import "@/styles/components/landing-showcase.css";

export function AuditLanding({ page }: { page: LandingPageEntry }) {
  const samples = page.samples ?? [];
  const hasPaths = Boolean(page.pathsTitle && page.paths?.length);
  const hasWork = Boolean(samples.length && page.samplesTitle);
  const hasProcess = Boolean(
    page.process?.length && page.processTitle && page.processIntro,
  );
  const hasPain = Boolean(
    page.painTitle && page.painSubtitle && page.painItems?.length,
  );
  const hasTransform = Boolean(
    page.transformTitle && page.transformBefore && page.transformAfter,
  );
  const hasImagine = Boolean(page.imagineTitle && page.imagineItems?.length);
  const hasBuild = Boolean(page.buildTitle && page.sellPoints?.length);
  const hasPrice = Boolean(page.pricingTitle);
  const hasWhy = Boolean(page.whyTitle && page.whyItems?.length);

  const consultCta = page.heroCtaLabel ?? page.stickyCtaLabel;

  return (
    <main className="lp-audit flex flex-1 flex-col pb-24 md:pb-0">
      <JsonLd data={faqSchema(page.faqs)} />
      <AuditHero page={page} />

      {page.proof.length ? (
        <AuditProof
          intro={page.proofIntro}
          items={page.proof}
          ctaLabel={page.proofCta}
        />
      ) : null}

      {hasPaths && page.pathsTitle && page.paths ? (
        <AuditPaths
          title={page.pathsTitle}
          note={page.pathsNote}
          items={page.paths}
        />
      ) : null}

      {hasPain && page.painTitle && page.painSubtitle && page.painItems ? (
        <AuditPain
          title={page.painTitle}
          subtitle={page.painSubtitle}
          eyebrow={page.painEyebrow}
          items={page.painItems}
          ctaLabel={consultCta}
        />
      ) : null}

      {hasTransform &&
      page.transformTitle &&
      page.transformBefore &&
      page.transformAfter ? (
        <SalesTransform
          title={page.transformTitle}
          intro={page.transformIntro}
          note={page.transformNote}
          before={page.transformBefore}
          after={page.transformAfter}
        />
      ) : null}

      {hasWork && page.samplesTitle ? (
        <AuditWork
          title={page.samplesTitle}
          intro={page.samplesIntro}
          samples={samples}
        />
      ) : null}

      {page.workCtaTitle ? (
        <AuditMidCta
          title={page.workCtaTitle}
          ctaLabel={consultCta}
          note={page.heroFinePrint}
        />
      ) : null}

      {hasImagine && page.imagineTitle && page.imagineItems ? (
        <SalesImagine
          title={page.imagineTitle}
          intro={page.imagineIntro}
          note={page.imagineNote}
          items={page.imagineItems}
        />
      ) : null}

      {hasBuild && page.buildTitle && page.sellPoints ? (
        <SalesBuild
          title={page.buildTitle}
          intro={page.buildIntro}
          points={page.sellPoints}
        />
      ) : null}

      {hasProcess && page.process && page.processTitle && page.processIntro ? (
        <AuditProcess
          title={page.processTitle}
          intro={page.processIntro}
          steps={page.process}
          ctaLabel={consultCta}
        />
      ) : null}

      {hasWhy && page.whyTitle && page.whyItems ? (
        <SalesWhy
          title={page.whyTitle}
          note={page.whyNote}
          items={page.whyItems}
        />
      ) : null}

      {page.fitTitle && page.fitVisuals?.length ? (
        <AuditFit
          title={page.fitTitle}
          note={page.fitNote}
          visuals={page.fitVisuals}
          still={page.scopeStill}
        />
      ) : null}

      {hasPrice && page.pricingTitle ? (
        <SalesPrice
          title={page.pricingTitle}
          anchor={page.pricingAnchor}
          intro={page.pricingIntro}
          qualify={page.pricingQualify}
          notes={page.pricingPaths}
          footer={page.pricingNote}
          ctaLabel={consultCta}
        />
      ) : null}

      <FaqAccordion
        items={page.faqs}
        eyebrow="Questions"
        title="Straight answers."
        expandAll
      />

      <AuditClose page={page} />
      <LandingStickyCta label={page.stickyCtaLabel} />
    </main>
  );
}
