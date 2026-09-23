import { Container, Eyebrow } from "../ui";

const steps = [
  {
    title: "Tell us about your home",
    body: "Fill in a short form or send us a WhatsApp message: where the home is, what it's like and what documents you hold.",
  },
  {
    title: "We verify the title",
    body: "Our lawyer searches the land registry and checks the survey, the owners and any charges or court cases.",
  },
  {
    title: "You get a cash offer",
    body: "We inspect the home and make you a written offer. You can accept it, ask questions or say no.",
  },
  {
    title: "You get paid",
    body: "Once every owner has signed and our lawyer signs off, we pay you. Within weeks, not months.",
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="border-t-4 border-green-900 bg-paper py-20 sm:py-24">
      <Container>
        <div className="grid gap-4 md:grid-cols-[1fr_1.4fr] md:items-end">
          <div>
            <Eyebrow>How it works</Eyebrow>
            <h2 id="how-heading" className="mt-4 text-[2.5rem] sm:text-[3.25rem]">
              Four steps from first message to payment.
            </h2>
          </div>
          <p className="max-w-lg md:justify-self-end">
            There are no viewings with strangers and no waiting for a buyer&apos;s
            mortgage. You deal with us directly from start to finish.
          </p>
        </div>

        <ol className="relative mt-14 grid gap-0 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="relative grid grid-cols-[3.5rem_1fr] gap-x-4 pb-10 last:pb-0 lg:block lg:border-t-2 lg:border-green-900 lg:pb-0 lg:pt-6"
            >
              {/* Mobile timeline rail */}
              {i < steps.length - 1 && (
                <span
                  className="absolute bottom-0 left-[1.6875rem] top-14 w-0.5 bg-line lg:hidden"
                  aria-hidden="true"
                />
              )}
              <span
                className="flex h-14 w-14 items-center justify-center bg-green-900 font-serif text-[1.75rem] text-sand lg:h-auto lg:w-auto lg:justify-start lg:bg-transparent lg:text-[4rem] lg:leading-none lg:text-terracotta"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div className="pt-2 lg:pt-5">
                <h3 className="font-serif text-[1.625rem] lg:text-[1.75rem]">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
