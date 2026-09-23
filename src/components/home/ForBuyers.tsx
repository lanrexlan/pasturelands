import { Arrow, ButtonLink, Container, Eyebrow } from "../ui";

/*
 * The fee comparison as proportional bars (scale: ₦120m = 100%).
 * Bars grow in when the band scrolls into view.
 */
const scale = (m: number) => `${(m / 120) * 100}%`;

function Segment({ m, className, label, i }: { m: number; className: string; label: string; i: number }) {
  return (
    <span
      className={`grow-x relative block h-full ${className}`}
      style={{ width: scale(m), ["--i" as string]: i }}
      title={label}
    />
  );
}

export function ForBuyers() {
  return (
    <section aria-labelledby="buyers-heading" className="stage-grid on-dark bg-terracotta py-20 text-paper sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div data-reveal>
          <Eyebrow tone="sand">For buyers</Eyebrow>
          <h2 id="buyers-heading" className="mt-4 text-[2.5rem] text-paper sm:text-[3.25rem]">
            Verified homes, no agency fee.
          </h2>
          <p className="mt-6 max-w-md">
            Every home we sell has been bought by us, title-checked by our lawyer and renovated. You buy directly from
            the owner, so there is no agent to pay.
          </p>
          <ButtonLink href="/homes" variant="light" className="group mt-8">
            See our homes <Arrow className="transition-transform group-hover:translate-x-1" />
          </ButtonLink>
        </div>

        <figure data-reveal className="bg-green-900 p-6 shadow-[0_30px_60px_-30px_rgba(22,48,42,0.8)] sm:p-8">
          <figcaption className="text-[0.875rem] font-bold uppercase tracking-[0.14em] text-gold">
            What a ₦100m home costs you, all in
          </figcaption>

          <div className="mt-8">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-bold text-sand">Through an agent</span>
              <span className="font-serif text-[2.5rem] leading-none text-sand sm:text-[3.25rem]">
                <span className="sr-only">about </span>₦120m
              </span>
            </div>
            <div className="mt-3 flex h-10 w-full gap-0.5" aria-hidden="true">
              <Segment m={100} className="bg-paper" label="Home ₦100m" i={0} />
              <Segment m={10} className="bg-gold" label="Agency fee ₦10m" i={1} />
              <Segment m={10} className="bg-terracotta" label="Legal ₦10m" i={2} />
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem] text-mist">
              <li className="flex items-center gap-2">
                <span className="h-3 w-3 bg-paper" aria-hidden="true" /> ₦100m home
              </li>
              <li className="flex items-center gap-2">
                <span className="h-3 w-3 bg-gold" aria-hidden="true" /> ₦10m agency fee
              </li>
              <li className="flex items-center gap-2">
                <span className="h-3 w-3 bg-terracotta" aria-hidden="true" /> ₦10m legal
              </li>
            </ul>
          </div>

          <div className="mt-10 border-t border-green-700 pt-8">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-bold text-sand">From Pasturelands</span>
              <span className="font-serif text-[2.5rem] leading-none text-gold sm:text-[3.25rem]">
                <span className="sr-only">about </span>₦105–110m
              </span>
            </div>
            <div className="mt-3 flex h-10 w-full items-stretch" aria-hidden="true">
              <Segment m={105} className="bg-paper" label="About ₦105m" i={3} />
              <span
                className="grow-x block h-full bg-[repeating-linear-gradient(135deg,#FAF7F1_0_4px,transparent_4px_9px)]"
                style={{ width: scale(5), ["--i" as string]: 4 }}
                title="Up to ₦110m"
              />
            </div>
            <p className="mt-3 text-[0.9375rem] text-mist">No agency fee. Title already checked.</p>
          </div>

          <p className="mt-8 text-[0.875rem] text-mist">
            Approximate figures for illustration. Your actual costs depend on the home and the transaction.
          </p>
        </figure>
      </Container>
    </section>
  );
}
