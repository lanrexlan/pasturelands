import type { Metadata } from "next";
import Image from "next/image";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { Eyebrow, WhatsAppIcon } from "@/components/ui";
import { site, telHref, whatsappLink } from "@/lib/site";
import { SellForm } from "./SellForm";

export const metadata: Metadata = {
  title: "Get a cash offer for your home",
  description:
    "Tell us about your home in Abuja or Lagos. It takes about three minutes. We check the title, make a cash offer and pay within weeks. No agents, no fees to you.",
};

const promises = [
  "No agency fee or commission",
  "We check the title before we pay",
  "No obligation to accept our offer",
];

export default function SellPage() {
  return (
    <div data-hide-wa className="seller-page bg-paper">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 pb-20 pt-10 sm:px-12 sm:pt-14 lg:px-20 lg:grid-cols-[1fr_1.55fr] lg:gap-16">
        <aside className="seller-aside on-dark lg:sticky lg:top-8 lg:self-start">
          <Eyebrow tone="gold">Sell your home</Eyebrow>
          <h1 className="mt-5 text-[2.75rem] text-sand sm:text-[3.5rem]">Get a cash offer.</h1>
          <p className="mt-4 max-w-md">
            Six short steps, about three minutes. Tell us what you know. Anything you&apos;re unsure about, we&apos;ll
            work out together.
          </p>
          <ul className="mt-6 hidden space-y-3 lg:block">
            {promises.map((p) => (
              <li key={p} className="flex items-center gap-3 font-medium text-sand">
                <CheckIcon size={22} className="shrink-0 text-gold" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 hidden border-t border-green-700 pt-6 lg:block">
            <p className="text-[0.9375rem]">Prefer to talk it through?</p>
            <a
              href={whatsappLink("Hello Pasturelands, I'd like to talk about selling my home.")}
              className="mt-2 inline-flex min-h-11 items-center gap-2 font-medium text-sand underline decoration-terracotta decoration-2 underline-offset-[6px]"
              target="_blank"
              rel="noopener"
            >
              <WhatsAppIcon /> Chat on WhatsApp
            </a>
            <p className="mt-3 text-[0.9375rem]">
              Or call{" "}
              <a href={telHref()} className="font-medium text-sand underline underline-offset-4">
                {site.phone}
              </a>{" "}
              or email{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-sand underline underline-offset-4">
                {site.email}
              </a>
              .
            </p>
            <p className="mt-3 text-[0.9375rem]">{site.replyPromise}</p>
          </div>
          <Image src="/images/architecture-hero.webp" alt="" width={600} height={450} className="mt-8 hidden aspect-[4/3] w-full object-cover object-right lg:block" />
        </aside>

        <div className="seller-form-panel bg-paper p-0 sm:p-6 lg:p-8">
          <SellForm />
        </div>
      </div>
    </div>
  );
}
