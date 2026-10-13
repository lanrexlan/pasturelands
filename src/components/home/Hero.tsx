import Image from "next/image";
import { whatsappLink, isPlaceholder, site } from "@/lib/site";
import { Arrow, ButtonLink, Container, WhatsAppIcon } from "../ui";

export function Hero() {
  return (
    <section className="architecture-hero on-dark">
      <Image src="/images/architecture-hero-wide.webp" alt="Architectural illustration of a modern Nigerian home with a terracotta courtyard and palms" fill priority sizes="100vw" className="architecture-hero-art" />
      <Container className="relative z-10">
        <div className="architecture-hero-copy">
          <h1>Your home.<br />Your next chapter.</h1>
          <div className="architecture-rule" />
          <p className="hero-subtitle">A direct sale. A clear offer.<br />Payment within weeks.</p>
          <p className="hero-description">We buy homes in Abuja and Lagos,<br className="hidden sm:block" /> with no agents and no fees to you.</p>
          <ButtonLink href="/sell" variant="light" className="hero-button">Get a cash offer <Arrow /></ButtonLink>
          {!isPlaceholder(site.whatsappNumber) && <a href={whatsappLink("Hello Pasturelands, I'd like to talk about selling my home.")} className="hero-chat"><WhatsAppIcon /> Chat on WhatsApp</a>}
          <p className="hero-note">About 3 minutes. No obligation.</p>
        </div>
        <div className="hero-caption"><span>Abuja · Lagos</span><span>Title checked before payment</span></div>
      </Container>
    </section>
  );
}
