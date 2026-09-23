import Link from "next/link";
import { Container, Eyebrow } from "../ui";

export const faqs: { q: string; text: string }[] = [
  {
    q: "How fast do you pay?",
    text: "We aim to pay within weeks of your first message. The title check usually takes the most time. If your documents are complete and every owner is ready to sign, it goes faster.",
  },
  {
    q: "Do I pay any fees?",
    text: "No. You pay no agency fee or commission, and we pay for our own title checks and inspection. If you want your own lawyer to review the sale, that is your choice and your cost.",
  },
  {
    q: "What documents do I need?",
    text: "Send us whatever you have. The most useful are a Certificate of Occupancy (C of O) or Governor's Consent, a Deed of Assignment, a registered survey plan, and ID for every owner. If you're not sure what you hold, tell us and we'll help you work it out.",
  },
  {
    q: "What if my title isn't perfected?",
    text: "Tell us anyway. Many homes in Abuja and Lagos are held on a Deed of Assignment without Governor's Consent. We'll look at your documents and tell you plainly whether we can buy, and what it would take.",
  },
  {
    q: "Which cities do you buy in?",
    text: "Abuja (FCT) first, then Lagos. If your home is somewhere else, you can still send it to us. We'll tell you honestly if it's outside the areas we buy in.",
  },
  {
    q: "Can I sell from abroad?",
    text: "Yes. You can deal with us by WhatsApp, phone and email from anywhere. Documents can be signed through a registered power of attorney or notarised where you live. Our lawyer will confirm what your case needs.",
  },
  {
    q: "Do I have to accept your offer?",
    text: "No. The offer is free and you are under no obligation. If you say no, we'll delete your details on request.",
  },
  {
    q: "How do you work out the offer?",
    text: "We look at the location, the condition, what the renovation will cost and what similar homes nearby sell for. We'll explain how we reached the figure.",
  },
];

export function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="border-t border-line bg-paper py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div>
          <Eyebrow>Questions</Eyebrow>
          <h2 id="faq-heading" className="mt-4 text-[2.5rem] sm:text-[3.25rem]">
            What owners ask us.
          </h2>
          <p className="mt-6 max-w-sm">
            Something else on your mind? Ask us on{" "}
            <Link href="/sell" className="font-bold text-terracotta underline underline-offset-4">
              the offer form
            </Link>{" "}
            or on WhatsApp.
          </p>
        </div>

        <div className="border-t-2 border-green-900">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex min-h-16 items-center justify-between gap-6 py-5 font-bold text-green-900">
                <span className="text-[1.125rem] leading-snug">{f.q}</span>
                <span
                  className="relative h-4 w-4 shrink-0 before:absolute before:left-0 before:top-[7px] before:h-0.5 before:w-4 before:bg-terracotta after:absolute after:left-[7px] after:top-0 after:h-4 after:w-0.5 after:bg-terracotta after:transition-transform group-open:after:scale-y-0"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-2xl pb-6">{f.text}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
