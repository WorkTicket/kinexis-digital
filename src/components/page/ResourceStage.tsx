import Image from "next/image";

type Plate = {
  href: string;
  label: string;
  source: string;
  image: string;
  imageAlt: string;
};

/** Overlapping field stills for the resources hero. */
export function ResourceStage({ plates }: { plates: Plate[] }) {
  const shown = plates.slice(0, 3);
  return (
    <div className="resource-stage">
      {shown.map((plate, index) => (
        <a
          key={plate.href}
          href={plate.href}
          className={`resource-stage__plate resource-stage__plate--${index + 1}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={plate.image}
            alt={plate.imageAlt}
            fill
            sizes="(max-width: 1023px) 80vw, 28rem"
            quality={75}
            className="resource-stage__img"
          />
          <span className="resource-stage__caption">
            <span className="resource-stage__source">{plate.source}</span>
            <span className="resource-stage__label">{plate.label}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
