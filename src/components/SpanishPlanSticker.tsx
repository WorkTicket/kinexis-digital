export const SPANISH_PLAN_STICKERS: Record<string, {
  name: { src: string; width: number; height: number; alt: string };
  offer: { src: string; width: number; height: number; alt: string };
}> = {
  website: {
    name: { src: "/assets/kinexis/stickers/planes-sitio-web-97.webp", width: 679, height: 497, alt: "Sitio web, $97 / mes" },
    offer: { src: "/assets/kinexis/stickers/sin-anticipo-sitio-web-97.webp", width: 738, height: 463, alt: "Sin anticipo, sitio web por $97 / mes" },
  },
  "lead-system": {
    name: { src: "/assets/kinexis/stickers/planes-sistema-clientes-197.webp", width: 803, height: 471, alt: "Sistema de clientes, $197 / mes" },
    offer: { src: "/assets/kinexis/stickers/sin-anticipo-sistema-clientes-197.webp", width: 752, height: 412, alt: "Sin anticipo, sistema de clientes por $197 / mes" },
  },
  plus: {
    name: { src: "/assets/kinexis/stickers/planes-plus-297.webp", width: 724, height: 536, alt: "Plus, $297 / mes" },
    offer: { src: "/assets/kinexis/stickers/sin-anticipo-plus-297.webp", width: 747, height: 486, alt: "Sin anticipo, Plus por $297 / mes" },
  },
  "own-it": {
    name: { src: "/assets/kinexis/stickers/planes-hazlo-tuyo-1497.webp", width: 847, height: 535, alt: "Hazlo tuyo, $1,497, un pago" },
    offer: { src: "/assets/kinexis/stickers/sin-anticipo-hazlo-tuyo-1497.webp", width: 778, height: 426, alt: "Hazlo tuyo, $1,497, un pago" },
  },
};

export default function SpanishPlanSticker({ slug, kind }: { slug: string; kind: "name" | "offer" }) {
  const sticker = SPANISH_PLAN_STICKERS[slug][kind];
  return <img className={`plan-sticker plan-sticker--${kind}`} {...sticker} alt={sticker.alt} loading="lazy" decoding="async" />;
}
