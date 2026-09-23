import { Container, Eyebrow } from "../ui";

const checks = [
  {
    title: "Land registry search",
    body: "We search the title at the land registry (AGIS in Abuja, the Lands Registry in Lagos) to confirm who owns the property.",
  },
  {
    title: "Survey check",
    body: "We check the survey plan against the land itself, and that the land is not under government acquisition.",
  },
  {
    title: "All owners sign",
    body: "Everyone with a legal interest signs, including every family member with a share in an inherited home.",
  },
  {
    title: "No charges or court cases",
    body: "We confirm there is no mortgage or other charge on the property and no court case over it.",
  },
  {
    title: "Lawyer sign-off before payment",
    body: "No money moves until our lawyer has reviewed everything and signed off in writing.",
  },
];

function Tick() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden="true">
      <rect width="24" height="24" fill="var(--green-900)" />
      <path d="m6 12.5 4 4 8-9" fill="none" stroke="var(--gold)" strokeWidth="2.5" />
    </svg>
  );
}

export function Verification() {
  return (
    <section aria-labelledby="verify-heading" className="bg-sand py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <Eyebrow>Our verification promise</Eyebrow>
          <h2 id="verify-heading" className="mt-4 text-[2.5rem] sm:text-[3.25rem]">
            We check every title before we pay for it.
          </h2>
          <p className="mt-6 max-w-md">
            This protects you as a seller, because the sale won&apos;t fall
            apart later. And it protects the next buyer, because the home they
            buy from us has already been checked.
          </p>
        </div>

        <ol className="border-t-2 border-green-900">
          {checks.map((c) => (
            <li key={c.title} className="flex gap-5 border-b border-line py-6">
              <Tick />
              <div>
                <h3 className="font-sans text-[1.125rem] font-bold leading-snug text-green-900">
                  {c.title}
                </h3>
                <p className="mt-1">{c.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
