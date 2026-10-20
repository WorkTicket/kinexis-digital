import Image from "next/image";
import { ArrowUpRight, Check, House, MousePointer2 } from "lucide-react";
import type { ContractorDesignContent } from "@/content/contractor-design";

export function ContractorPreview({ content }: { content: ContractorDesignContent["preview"] }) {
  return <figure className="offer-preview">
    <div className="offer-preview__label"><span className="offer-preview__live" aria-hidden />{content.label}<MousePointer2 size={15} aria-hidden /></div>
    <div className="offer-preview__window">
      <div className="offer-preview__toolbar" aria-hidden><span /><span /><span /><i /></div>
      <div className="offer-preview__nav"><span><House size={19} strokeWidth={1.5} aria-hidden />{content.business}</span><span className="offer-preview__nav-action">{content.action}<ArrowUpRight size={12} aria-hidden /></span></div>
      <div className="offer-preview__site">
        <picture><source type="image/avif" srcSet="/assets/images/offer/preview-yard-360.avif?v=20261020 360w, /assets/images/offer/preview-yard-720.avif?v=20261020 720w" sizes="(max-width: 767px) 88vw, (max-width: 1199px) 45vw, 520px" /><Image src="/assets/images/offer/preview-yard-720.avif?v=20261020" width={720} height={900} alt={content.imageAlt} loading="eager" fetchPriority="high" className="offer-preview__image" unoptimized /></picture>
        <div className="offer-preview__site-copy"><span>{content.trade}</span><p>{content.title}</p><span>{content.copy}</span><span className="offer-preview__example-cta">{content.action}<ArrowUpRight size={14} aria-hidden /></span></div>
      </div>
      <ul className="offer-preview__services">{content.services.map(service => <li key={service}><Check size={12} aria-hidden />{service}</li>)}</ul>
    </div>
    <figcaption><span>{content.caption}</span><small>{content.note}</small></figcaption>
  </figure>;
}
