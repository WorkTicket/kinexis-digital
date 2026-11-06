import { imageSrcSet, imageVariant } from "@/lib/image-sources";

const BADGE = "/assets/kinexis/stickers/60-day_tracked-lead_guarantee_badge.webp";

export default function GuaranteeBadge({ alt = "60-day tracked-lead guarantee" }: { alt?: string }) {
  return (
    <picture>
      <source type="image/avif" srcSet={imageSrcSet(BADGE, [400, 800], "avif")} sizes="240px" />
      <img className="guarantee-band__seal" src={imageVariant(BADGE, 400, "webp")} srcSet={imageSrcSet(BADGE, [400, 800])} sizes="240px" alt={alt} width={400} height={267} loading="lazy" decoding="async" />
    </picture>
  );
}
