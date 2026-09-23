import Link from "next/link";
import { whatsappLink } from "@/lib/site";
import { IsoHouse } from "../illustrations/IsoHouse";
import { Tilt } from "../Tilt";
import { Arrow, ButtonLink, Eyebrow, WhatsAppIcon } from "../ui";

const headline = "Sell your house in weeks, not months.";

const chips = [
  { text: "Title checked first", pos: "left-[4%] top-[5%] lg:left-[3%] lg:top-[20%]", d: "0ms", enter: "1900ms" },
  { text: "No agency fee", pos: "right-[4%] top-[5%] lg:right-[6%] lg:top-[8%]", d: "1200ms", enter: "2050ms" },
  { text: "Paid within weeks", pos: "right-[4%] bottom-[5%] lg:right-[10%] lg:bottom-[10%]", d: "2400ms", enter: "2200ms" },
];

function Tick() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#E3B04B" />
      <path d="m5.5 10.5 3 3 6-6.5" fill="none" stroke="#16302A" strokeWidth="2.2" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-sand">
      <div className="mx-auto grid max-w-6xl lg:min-h-[680px] lg:grid-cols-[1fr_1.05fr]">
        <div className="relative z-10 px-5 pb-12 pt-12 sm:px-8 sm:pt-16 lg:pb-20 lg:pr-10 lg:pt-24">
          <Eyebrow className="animate-rise">Abuja · Lagos</Eyebrow>
          <h1 className="word-rise mt-5 text-[2.875rem] sm:text-[3.5rem] lg:text-[4.75rem] xl:text-[5.25rem]" aria-label={headline}>
            {headline.split(" ").map((w, i) => (
              <span key={i} aria-hidden="true" style={{ ["--i" as string]: i }}>
                {w}
                {" "}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl animate-rise text-[1.125rem] [animation-delay:500ms] md:text-[1.25rem]">
            Pasturelands buys homes directly from owners in Abuja and Lagos. We check the title, make a cash offer and
            pay within weeks. No agents, no fees to you.
          </p>
          <div className="mt-9 flex animate-rise flex-col items-start gap-5 [animation-delay:650ms] sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink
              href="/sell"
              className="group w-full px-8 text-[1.0625rem] shadow-[0_10px_24px_-12px_rgba(167,72,31,0.8)] sm:w-auto"
            >
              Get a cash offer <Arrow className="transition-transform group-hover:translate-x-1" />
            </ButtonLink>
            <Link
              href={whatsappLink("Hello Pasturelands, I'd like to talk about selling my home.")}
              className="inline-flex min-h-11 items-center gap-2 font-bold text-green-900 underline decoration-terracotta decoration-2 underline-offset-[6px] hover:decoration-green-900"
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </Link>
          </div>
          <p className="mt-8 animate-rise text-[0.9375rem] [animation-delay:800ms]">
            Takes about 3 minutes. No obligation to accept our offer.
          </p>
        </div>

        {/* Terracotta stage, bleeding to the right edge on desktop. */}
        <div className="stage-grid relative bg-terracotta">
          <div className="stage-grid absolute inset-y-0 left-full hidden w-[50vw] bg-terracotta lg:block" aria-hidden="true" />
          <Tilt className="relative mx-auto max-w-[560px] px-4 pb-8 pt-16 lg:max-w-none lg:px-6 lg:pt-16">
            <IsoHouse className="block h-auto w-full drop-shadow-[0_30px_30px_rgba(22,48,42,0.35)]" />
          </Tilt>
          <ul className="pointer-events-none absolute inset-0" aria-label="Our promises">
            {chips.map((c) => (
              <li
                key={c.text}
                className={`absolute ${c.pos} animate-rise`}
                style={{ animationDelay: c.enter }}
              >
                <span
                  className="bob inline-flex items-center gap-2 bg-green-900 px-3.5 py-2 text-[0.875rem] font-bold text-sand shadow-[0_12px_24px_-10px_rgba(22,48,42,0.6)] sm:text-[0.9375rem]"
                  style={{ ["--d" as string]: c.d }}
                >
                  <Tick />
                  {c.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
