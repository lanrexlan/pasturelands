import { Arrow, ButtonLink, Container, Eyebrow } from "../ui";

export function ForBuyers() {
  return (
    <section aria-labelledby="buyers-heading" className="on-dark bg-terracotta py-20 text-paper sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <Eyebrow tone="sand">For buyers</Eyebrow>
          <h2 id="buyers-heading" className="mt-4 text-[2.5rem] text-paper sm:text-[3.25rem]">
            Verified homes, no agency fee.
          </h2>
          <p className="mt-6 max-w-md">
            Every home we sell has been bought by us, title-checked by our
            lawyer and renovated. You buy directly from the owner, so there is
            no agent to pay.
          </p>
          <ButtonLink href="/homes" variant="light" className="mt-8">
            See our homes <Arrow />
          </ButtonLink>
        </div>

        <figure>
          <figcaption className="text-[0.9375rem] font-bold uppercase tracking-[0.12em]">
            What a ₦100m home costs you, all in
          </figcaption>
          <dl className="mt-6 border-t-2 border-paper">
            <div className="grid gap-3 border-b sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-4 border-paper/40 py-6">
              <dt>
                <span className="block font-bold">Through an agent</span>
                <span className="text-[0.9375rem]">₦100m home + ₦10m agency fee + ₦10m legal</span>
              </dt>
              <dd className="font-serif text-[2.75rem] leading-none sm:text-[3.5rem]">
                <span className="sr-only">about </span>₦120m
              </dd>
            </div>
            <div className="grid gap-3 border-b sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-4 border-paper/40 py-6">
              <dt>
                <span className="block font-bold">From Pasturelands</span>
                <span className="text-[0.9375rem]">No agency fee</span>
              </dt>
              <dd className="font-serif text-[2.75rem] leading-none sm:text-[3.5rem]">
                <span className="sr-only">about </span>₦105–110m
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-[0.9375rem]">
            Approximate figures for illustration. Your actual costs depend on
            the home and the transaction.
          </p>
        </figure>
      </Container>
    </section>
  );
}
