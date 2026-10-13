import { Arrow, ButtonLink, Container, Eyebrow } from "../ui";
export function FinalCta() {
  return <section className="on-dark bg-green-900 py-16 sm:py-24" aria-labelledby="cta-heading"><Container className="grid items-center gap-8 md:grid-cols-[1fr_auto]"><div><Eyebrow tone="gold">Your next chapter</Eyebrow><h2 id="cta-heading" className="mt-5 text-[2.5rem] text-sand sm:text-[3.5rem]">Let’s start with your home.</h2><p className="mt-4 max-w-lg text-mist">About three minutes. No fees, no obligation to accept.</p></div><ButtonLink href="/sell" variant="light">Get a cash offer <Arrow /></ButtonLink></Container></section>;
}
