import { site, whatsappLink } from "@/lib/site";
import { IsoHouse } from "../illustrations/IsoHouse";
import { Arrow, ButtonLink, Container, WhatsAppIcon, buttonStyles } from "../ui";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-heading" className="bg-sand py-20 sm:py-24">
      <Container>
        <div
          data-reveal
          className="stage-grid on-dark relative grid overflow-hidden bg-terracotta lg:grid-cols-[1.25fr_1fr] lg:items-center"
        >
          <div className="relative z-10 px-6 py-12 sm:px-12 lg:py-16">
            <h2 id="cta-heading" className="text-[2.5rem] text-paper sm:text-[3.5rem]">
              Ready to hear what we&apos;d offer?
            </h2>
            <p className="mt-4 max-w-lg text-paper">
              Tell us about your home. It takes about three minutes and you are under no obligation.{" "}
              {site.replyPromise}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/sell" variant="light" className="group px-8">
                Get a cash offer <Arrow className="transition-transform group-hover:translate-x-1" />
              </ButtonLink>
              <a
                href={whatsappLink("Hello Pasturelands, I'd like to talk about selling my home.")}
                className={buttonStyles.dark}
              >
                <WhatsAppIcon /> Chat on WhatsApp
              </a>
            </div>
          </div>
          <div className="relative -mb-10 px-10 lg:-mb-16 lg:px-4">
            <IsoHouse animate={false} title="" className="mx-auto block h-auto w-full max-w-[420px]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
