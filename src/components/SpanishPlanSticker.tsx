import { STICKER_IMAGE_WIDTHS, imageSrcSet, imageVariant } from "@/lib/image-sources";

export const SPANISH_PLAN_STICKERS: Record<string, {
  offer: { src: string; width: number; height: number; alt: string };
}> = {
  website: {
    offer: { src: "/assets/kinexis/stickers/sin-anticipo-sitio-web-97.webp", width: 738, height: 463, alt: "Sin anticipo, Website por $97 / mes" },
  },
  "lead-system": {
    offer: { src: "/assets/kinexis/stickers/sin-anticipo-sistema-clientes-197.webp", width: 752, height: 412, alt: "Sin anticipo, Lead System por $197 / mes" },
  },
  plus: {
    offer: { src: "/assets/kinexis/stickers/sin-anticipo-plus-297.webp", width: 747, height: 486, alt: "Sin anticipo, Plus por $297 / mes" },
  },
};

export default function SpanishPlanSticker({ slug }: { slug: string }) {
  const sticker = SPANISH_PLAN_STICKERS[slug].offer;
  // Understate vs ~232–240 CSS so lab DPR prefers 400w; 480w remains for true 2×.
  const sizes = "150px";
  return <picture>
    <source type="image/avif" srcSet={imageSrcSet(sticker.src, STICKER_IMAGE_WIDTHS, "avif")} sizes={sizes} />
    <img {...sticker} className="plan-sticker plan-sticker--offer" src={imageVariant(sticker.src, 240, "webp")} srcSet={imageSrcSet(sticker.src, STICKER_IMAGE_WIDTHS)} sizes={sizes} alt={sticker.alt} loading="lazy" decoding="async" />
  </picture>;
}
