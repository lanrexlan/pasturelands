import { DeedArt, OfferArt, PaidArt, PhoneArt } from "../illustrations/IsoObjects";
import { Container, Eyebrow } from "../ui";

const steps = [
  {
    title: "Tell us about your home",
    body: "Fill in a short form or send us a WhatsApp message: where the home is, what it's like and what documents you hold.",
    Art: PhoneArt,
  },
  {
    title: "We verify the title",
    body: "Our lawyer searches the land registry and checks the survey, the owners and any charges or court cases.",
    Art: DeedArt,
  },
  {
    title: "You get a cash offer",
    body: "We inspect the home and make you a written offer. You can accept it, ask questions or say no.",
    Art: OfferArt,
  },
  {
    title: "You get paid",
    body: "Once every owner has signed and our lawyer signs off, we pay you. Within weeks, not months.",
    Art: PaidArt,
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="bg-paper py-20 sm:py-28">
      <Container>
        <div className="grid gap-4 md:grid-cols-[1fr_1.4fr] md:items-end" data-reveal>
          <div>
            <Eyebrow>How it works</Eyebrow>
            <h2 id="how-heading" className="mt-4 text-[2.5rem] sm:text-[3.25rem]">
              Four steps from first message to payment.
            </h2>
          </div>
          <p className="max-w-lg md:justify-self-end">
            There are no viewings with strangers and no waiting for a buyer&apos;s mortgage. You deal with us directly
            from start to finish.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {steps.map(({ title, body, Art }, i) => (
            <li
              key={title}
              data-reveal
              style={{ ["--i" as string]: i }}
              className="group relative flex flex-col border-2 border-transparent bg-sand p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-green-900 hover:shadow-[0_24px_40px_-24px_rgba(22,48,42,0.45)] sm:p-6"
            >
              <div className="-mx-2 -mt-2 flex h-40 items-center justify-center">
                <Art className="h-full w-auto transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.04]" />
              </div>
              <span
                className="relative z-10 mt-3 flex h-12 w-12 items-center justify-center bg-green-900 font-serif text-[1.625rem] text-sand"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <h3 className="mt-4 font-serif text-[1.625rem] leading-tight">
                <span className="sr-only">Step {i + 1}: </span>
                {title}
              </h3>
              <p className="mt-2 text-[1rem]">{body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
