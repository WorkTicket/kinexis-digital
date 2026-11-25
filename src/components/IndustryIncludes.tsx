import type { FeatureKey, Industry } from "@/data/industries";
import type { IndustryFeatureCopy } from "@/data/industry-features";

export default function IndustryIncludes({
  features,
  copy,
  featureText,
}: {
  features: FeatureKey[];
  copy: Record<FeatureKey, IndustryFeatureCopy>;
  featureText: (key: FeatureKey) => string;
}) {
  return (
    <div className="industry-includes industry-includes--sheet">
      {features.map((key) => (
        <article className="industry-includes__item" key={key}>
          <span className="industry-includes__check" aria-hidden="true" />
          <div className="industry-includes__body">
            <h3>{copy[key].title}</h3>
            <p>{featureText(key)}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function industryFeatureBody(industry: Industry, key: FeatureKey, fallback: string) {
  return industry.featureText?.[key] ?? (key === "service-area" ? industry.serviceArea : fallback);
}
