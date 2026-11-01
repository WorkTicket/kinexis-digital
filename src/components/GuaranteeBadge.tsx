export default function GuaranteeBadge({ alt = "60-day tracked-lead guarantee" }: { alt?: string }) {
  return (
    <picture>
      <source type="image/avif" srcSet="/assets/kinexis/stickers/60-day_tracked-lead_guarantee_badge-400.avif 400w, /assets/kinexis/stickers/60-day_tracked-lead_guarantee_badge-800.avif 800w" sizes="240px" />
      <img className="guarantee-band__seal" src="/assets/kinexis/stickers/60-day_tracked-lead_guarantee_badge-400.webp" srcSet="/assets/kinexis/stickers/60-day_tracked-lead_guarantee_badge-400.webp 400w, /assets/kinexis/stickers/60-day_tracked-lead_guarantee_badge-800.webp 800w" sizes="240px" alt={alt} width={400} height={267} loading="lazy" decoding="async" />
    </picture>
  );
}
