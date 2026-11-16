import { STICKER_IMAGE_WIDTHS, imageSrcSet, imageVariant } from "@/lib/image-sources";

const BADGE = "/assets/kinexis/stickers/60-day_tracked-lead_guarantee_badge.webp";

export default function GuaranteeBadge({ alt = "60-day tracked-lead guarantee" }: { alt?: string }) {
  return (
    <picture>
      <source type="image/avif" srcSet={imageSrcSet(BADGE, STICKER_IMAGE_WIDTHS, "avif")} sizes="160px" />
      <img className="guarantee-band__seal" src={imageVariant(BADGE, 240, "webp")} srcSet={imageSrcSet(BADGE, STICKER_IMAGE_WIDTHS)} sizes="160px" alt={alt} width={400} height={267} loading="lazy" decoding="async" />
    </picture>
  );
}
