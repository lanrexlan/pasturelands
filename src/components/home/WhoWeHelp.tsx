import { Neighbourhood } from "../illustrations/IsoObjects";
import { Container, Eyebrow } from "../ui";

const sellers = [
  {
    who: "Relocating abroad",
    line: "You have a flight date and can't wait six months for a buyer. We can work to your timetable.",
  },
  {
    who: "Selling an inherited home",
    line: "The family has agreed to sell. We make sure every owner signs, so the sale is clean and final.",
  },
  {
    who: "Living outside Nigeria",
    line: "You own a home in Abuja or Lagos but can't be here to manage a sale. We deal with you by WhatsApp and email.",
  },
  {
    who: "Under financial pressure",
    line: "You need the money soon and want a quiet sale without a signboard outside the gate.",
  },
  {
    who: "Developers with unsold units",
    line: "You have finished units still on your books and want to clear them in one transaction.",
  },
];

export function WhoWeHelp() {
  return (
    <section aria-labelledby="who-heading" className="on-dark bg-green-900 py-20 text-mist sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div className="lg:sticky lg:top-8 lg:self-start">
          <Eyebrow tone="gold">Who we help</Eyebrow>
          <h2 id="who-heading" className="mt-4 text-[2.5rem] text-sand sm:text-[3.25rem]">
            For owners who need a sale that is quick and certain.
          </h2>
          <p className="mt-6 max-w-md">
            An agent&apos;s job is to find a buyer. We are the buyer, so there is
            no waiting to see who turns up.
          </p>
          <div data-reveal className="mt-10">
            <Neighbourhood className="h-auto w-full max-w-md" />
            <p className="mt-2 text-[0.9375rem]">Flats, terraces, duplexes, bungalows: we buy all kinds of homes.</p>
          </div>
        </div>

        <ul className="border-t border-green-700">
          {sellers.map((s, i) => (
            <li
              key={s.who}
              data-reveal
              style={{ ["--i" as string]: i }}
              className="group relative grid gap-2 border-b border-green-700 py-7 transition-colors duration-300 hover:bg-green-700/40 sm:grid-cols-[3rem_12rem_1fr] sm:gap-6 sm:px-3"
            >
              <span className="font-serif text-[1.25rem] text-gold" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-[1.625rem] leading-tight text-sand transition-transform duration-300 group-hover:translate-x-1">
                {s.who}
              </h3>
              <p>{s.line}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
