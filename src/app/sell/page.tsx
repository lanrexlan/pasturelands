import type { Metadata } from "next";
import { Eyebrow, WhatsAppIcon } from "@/components/ui";
import { site, whatsappLink } from "@/lib/site";
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
    <div data-hide-wa className="bg-sand">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-[1fr_1.55fr] lg:gap-16">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <Eyebrow>Sell your home</Eyebrow>
          <h1 className="mt-4 text-[2.5rem] sm:text-[3.25rem]">Get a cash offer.</h1>
          <p className="mt-4 max-w-md">
            Six short steps, about three minutes. Tell us what you know. Anything you&apos;re unsure about, we&apos;ll
            work out together.
          </p>
          <ul className="mt-6 hidden space-y-3 lg:block">
            {promises.map((p) => (
              <li key={p} className="flex items-center gap-3 font-bold text-green-900">
                <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden="true">
                  <rect width="24" height="24" fill="#16302A" />
                  <path d="m6 12.5 4 4 8-9" fill="none" stroke="#E3B04B" strokeWidth="2.5" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 hidden border-t border-line pt-6 lg:block">
            <p className="text-[0.9375rem]">Prefer to talk it through?</p>
            <a
              href={whatsappLink("Hello Pasturelands, I'd like to talk about selling my home.")}
              className="mt-2 inline-flex min-h-11 items-center gap-2 font-bold text-green-900 underline decoration-terracotta decoration-2 underline-offset-[6px]"
              target="_blank"
              rel="noopener"
            >
              <WhatsAppIcon /> Chat on WhatsApp
            </a>
            <p className="mt-3 text-[0.9375rem]">{site.replyPromise}</p>
          </div>
        </aside>

        <div className="border-t-4 border-green-900 bg-paper p-5 shadow-[0_24px_60px_-40px_rgba(22,48,42,0.5)] sm:p-10">
          <SellForm />
        </div>
      </div>
    </div>
  );
}
