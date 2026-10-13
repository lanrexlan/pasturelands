import Image from "next/image";
import Link from "next/link";
import { Arrow, Container, Eyebrow } from "../ui";
export function ForBuyers() {
  return <section className="architecture-buyers on-dark" aria-labelledby="buyers-heading">
    <Image src="/images/architecture-buyers.webp" alt="" fill sizes="100vw" className="buyer-art" />
    <Container className="relative z-10"><div className="buyer-copy"><Eyebrow tone="sand">For buyers</Eyebrow><h2 id="buyers-heading">Verified homes.<br />No agency fee.</h2><p>Renovated homes in Abuja and Lagos.<br />Buy directly from us, with the title already checked.</p><Link href="/homes" className="editorial-link">Explore homes <Arrow /></Link></div></Container>
  </section>;
}
