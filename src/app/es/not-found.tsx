import Link from "next/link";
import { PageHero } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <PageHero h1="Página no encontrada" sub="Esa página no existe o se movió." />
      <section className="section"><div className="container center"><Link className="btn btn--primary btn--lg" href="/es" prefetch={false}>Volver al inicio</Link> <Link className="btn btn--ghost btn--lg" href="/es/contact" prefetch={false}>Contactar a Kinexis</Link></div></section>
    </>
  );
}
