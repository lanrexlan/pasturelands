import { site, whatsappLink } from "@/lib/site";
import { Arrow, ButtonLink, Container, WhatsAppIcon, buttonStyles } from "../ui";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-heading" className="bg-sand py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 border-y-2 border-green-900 py-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <h2 id="cta-heading" className="text-[2.5rem] sm:text-[3.5rem]">
              Ready to hear what we&apos;d offer?
            </h2>
            <p className="mt-4 max-w-lg">
              Tell us about your home. It takes about three minutes and you are
              under no obligation. {site.replyPromise}
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-stretch">
            <ButtonLink href="/sell" className="px-8">
              Get a cash offer <Arrow />
            </ButtonLink>
            <a
              href={whatsappLink("Hello Pasturelands, I'd like to talk about selling my home.")}
              className={buttonStyles.dark}
            >
              <WhatsAppIcon /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
