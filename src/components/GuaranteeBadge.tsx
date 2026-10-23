export default function GuaranteeBadge({ alt = "60-day tracked-lead guarantee" }: { alt?: string }) {
  return (
    <img
      className="guarantee-band__seal"
      src="/assets/kinexis/stickers/60-day_tracked-lead_guarantee_badge.webp"
      alt={alt}
      width={1536}
      height={1024}
      loading="lazy"
      decoding="async"
    />
  );
}
