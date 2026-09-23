import Link from "next/link";
import { whatsappLink } from "@/lib/site";
import { HouseScene } from "../illustrations/HouseScene";
import { Arrow, ButtonLink, Eyebrow, WhatsAppIcon } from "../ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-sand">
      <div className="mx-auto grid max-w-6xl lg:min-h-[640px] lg:grid-cols-[1.1fr_1fr]">
        <div className="animate-rise px-5 pb-12 pt-12 sm:px-8 sm:pt-16 lg:pb-20 lg:pr-12 lg:pt-24">
          <Eyebrow>Abuja · Lagos</Eyebrow>
          <h1 className="mt-5 text-[2.875rem] sm:text-[3.5rem] lg:text-[5rem] xl:text-[5.5rem]">
            Sell your house in weeks, not months.
          </h1>
          <p className="mt-6 max-w-xl text-[1.125rem] md:text-[1.25rem]">
            Pasturelands buys homes directly from owners in Abuja and Lagos. We
            check the title, make a cash offer and pay within weeks. No agents,
            no fees to you.
          </p>
          <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink href="/sell" className="w-full px-8 text-[1.0625rem] sm:w-auto">
              Get a cash offer <Arrow />
            </ButtonLink>
            <Link
              href={whatsappLink("Hello Pasturelands, I'd like to talk about selling my home.")}
              className="inline-flex min-h-11 items-center gap-2 font-bold text-green-900 underline decoration-terracotta decoration-2 underline-offset-[6px] hover:decoration-green-900"
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </Link>
          </div>
          <p className="mt-8 text-[0.9375rem]">
            Takes about 3 minutes. No obligation to accept our offer.
          </p>
        </div>

        {/* Terracotta panel runs to the right edge of the viewport on desktop. */}
        <div className="relative overflow-hidden bg-terracotta pt-10 lg:overflow-visible lg:pt-0">
          <div
            className="absolute inset-y-0 left-full hidden w-[50vw] bg-terracotta lg:block"
            aria-hidden="true"
          />
          <HouseScene className="relative mx-auto block h-auto w-full max-w-[560px] lg:absolute lg:bottom-0 lg:left-0 lg:max-w-none" />
        </div>
      </div>
    </section>
  );
}
