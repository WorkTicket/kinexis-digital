import Button from "@/components/ui/Button";

type Cta = {
  label: string;
  href: string;
};

type Props = {
  primary?: Cta;
  secondary?: Cta;
};

export default function HeroCtaLinks({ primary, secondary }: Props) {
  if (!primary && !secondary) return null;

  return (
    <div className="hero__cta cta-stack">
      {primary && (
        <Button href={primary.href} variant="primary" fullWidthMobile aria-label={primary.label}>
          {primary.label}
        </Button>
      )}
      {secondary && (
        <Button href={secondary.href} variant="secondary" fullWidthMobile aria-label={secondary.label}>
          {secondary.label}
        </Button>
      )}
    </div>
  );
}
