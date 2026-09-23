import type { Metadata } from "next";
import Link from "next/link";
import { Neighbourhood } from "@/components/illustrations/IsoObjects";
import { PageIntro } from "@/components/PageIntro";
import { Arrow, ButtonLink, Container, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Pasturelands Limited buys homes directly from owners in Abuja and Lagos, checks every title, renovates, and sells with no agency fee.",
};

const team = [
  { name: "Osundoja Osundare", role: "Founder & CEO", initials: "OO" },
  { name: "Olanrewaju Akande", role: "Co-Founder & COO", initials: "OA" },
];

const reasons = [
  {
    title: "Selling takes too long",
    body: "Owners who are relocating, settling an estate or who need money soon can wait months for the right buyer to appear, and longer for that buyer's finance to come through.",
  },
  {
    title: "Fees add up for buyers",
    body: "On a typical agency sale, a buyer can pay around 10% in agency fees and another 10% in legal costs on top of the price.",
  },
  {
    title: "Title problems are common",
    body: "Unperfected titles, missing signatures and disputed land make buyers nervous and sales fall apart late.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About us"
        title="A simpler way to sell a home, and a safer way to buy one."
        art={<Neighbourhood className="h-auto w-full" />}
      >
        <p>
          Pasturelands buys homes directly from owners who need to sell quickly. We check each title, pay within weeks,
          renovate the home, then sell it with no agency fee or rent it out. We&apos;re starting in Abuja, then Lagos.
        </p>
      </PageIntro>

      <section aria-labelledby="why-heading" className="on-dark bg-green-900 py-20 text-mist sm:py-24">
        <Container>
          <div data-reveal className="max-w-2xl">
            <Eyebrow tone="gold">Why we started</Eyebrow>
            <h2 id="why-heading" className="mt-4 text-[2.5rem] text-sand sm:text-[3.25rem]">
              Three problems we set out to fix.
            </h2>
          </div>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {reasons.map((r, i) => (
              <li key={r.title} data-reveal style={{ ["--i" as string]: i }} className="border-t-2 border-gold pt-5">
                <span className="font-serif text-[3rem] leading-none text-gold" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-[1.625rem] text-sand">{r.title}</h3>
                <p className="mt-2">{r.body}</p>
              </li>
            ))}
          </ol>
          <p data-reveal className="mt-12 max-w-2xl text-[1.125rem] text-sand">
            So we do the slow, careful part ourselves. We buy the home, check the title properly before any money moves,
            fix it up, and pass the saving on to the next owner.{" "}
            <Link href="/#verify-heading" className="font-bold text-gold underline underline-offset-4">
              See how we check titles
            </Link>
            .
          </p>
        </Container>
      </section>

      <section aria-labelledby="team-heading" className="bg-sand py-20 sm:py-24">
        <Container>
          <div data-reveal>
            <Eyebrow>The team</Eyebrow>
            <h2 id="team-heading" className="mt-4 text-[2.5rem] sm:text-[3.25rem]">
              Who you&apos;ll deal with.
            </h2>
          </div>
          <ul className="mt-12 grid gap-8 md:grid-cols-2">
            {team.map((p, i) => (
              <li key={p.name} data-reveal style={{ ["--i" as string]: i }} className="grid gap-6 bg-paper p-6 sm:grid-cols-[10rem_1fr] sm:p-8">
                {/* [Photo]: replace this tile with the founder's photo (next/image, 320×400). */}
                <div className="stage-grid flex aspect-[4/5] items-center justify-center bg-terracotta sm:aspect-auto sm:h-48">
                  <span className="font-serif text-[3.5rem] text-paper" aria-hidden="true">
                    {p.initials}
                  </span>
                </div>
                <div>
                  <h3 className="text-[1.875rem]">{p.name}</h3>
                  <p className="mt-1 font-bold text-terracotta">{p.role}</p>
                  <p className="mt-4">[Bio to be supplied]</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="company-heading" className="border-t border-line bg-paper py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div data-reveal>
            <Eyebrow>Company details</Eyebrow>
            <h2 id="company-heading" className="mt-4 text-[2.5rem] sm:text-[3.25rem]">
              Registered in Nigeria.
            </h2>
          </div>
          <dl data-reveal className="border-t-2 border-green-900">
            {[
              ["Registered name", site.legalName],
              ["Registration number", site.rcNumber],
              ["Incorporated", "September 2026, Nigeria"],
              ["Office", site.address],
              ["Phone", site.phone],
              ["Email", site.email],
            ].map(([k, v]) => (
              <div key={k} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[14rem_1fr]">
                <dt className="font-bold text-green-900">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
        <Container className="mt-16">
          <div data-reveal className="flex flex-col items-start gap-4 border-y-2 border-green-900 py-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-serif text-[1.75rem] text-green-900">Thinking of selling?</p>
            <ButtonLink href="/sell" className="group">
              Get a cash offer <Arrow className="transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
