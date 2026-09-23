import type { Metadata } from "next";
import { EnquiryForm } from "@/components/form/EnquiryForm";
import { ListingCard } from "@/components/homes/ListingCard";
import { RenovationArt } from "@/components/illustrations/IsoObjects";
import { PageIntro } from "@/components/PageIntro";
import { Container, Eyebrow, WhatsAppIcon } from "@/components/ui";
import { getListings } from "@/lib/listings";
import { site, whatsappLink } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Homes for sale and rent",
  description:
    "Renovated homes in Abuja and Lagos, bought directly by Pasturelands and title-checked by our lawyer. No agency fee.",
};

const promises = [
  { title: "No agency fee", body: "You buy or rent directly from us, the owner." },
  { title: "Title checked", body: "Our lawyer checks the title before we buy any home." },
  { title: "Renovated", body: "Every home is repaired and refreshed before it's listed." },
];

export default async function HomesPage() {
  const listings = await getListings();

  return (
    <>
      <PageIntro eyebrow="Homes for sale and rent" title="Verified, renovated homes. No agency fee.">
        <p>
          Every home here was bought by us directly from its owner, checked by our lawyer and renovated before
          listing. You deal with us, not an agent.
        </p>
      </PageIntro>

      <section className="border-y-2 border-green-900 bg-paper">
        <Container className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {promises.map((p) => (
            <div key={p.title} className="py-5 sm:px-6 sm:first:pl-0">
              <p className="font-bold text-green-900">{p.title}</p>
              <p className="text-[0.9375rem]">{p.body}</p>
            </div>
          ))}
        </Container>
      </section>

      {listings.length > 0 ? (
        <section aria-labelledby="listings-heading" className="bg-sand py-16 sm:py-20">
          <Container>
            <h2 id="listings-heading" className="sr-only">
              Available homes
            </h2>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((l, i) => (
                <li key={l.id} data-reveal style={{ ["--i" as string]: i % 3 }}>
                  <ListingCard listing={l} priority={i < 3} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : (
        <section aria-labelledby="empty-heading" className="bg-sand py-16 sm:py-20">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <div data-reveal className="lg:sticky lg:top-8 lg:self-start">
              <RenovationArt className="mx-auto h-auto w-full max-w-lg" />
            </div>
            <div data-reveal className="border-t-4 border-green-900 bg-paper p-6 sm:p-10">
              <Eyebrow>Coming soon</Eyebrow>
              <h2 id="empty-heading" className="mt-3 text-[2.25rem] sm:text-[2.75rem]">
                Our first renovated homes are on the way.
              </h2>
              <p className="mt-4">Leave your details to hear first. We&apos;ll only contact you about our homes.</p>
              <div className="mt-8">
                <EnquiryForm
                  kind="waitlist"
                  submitLabel="Tell me first"
                  successTitle="You're on the list."
                  successBody="We'll message you when our first homes are ready to view. You can ask us to remove you at any time."
                />
              </div>
              <p className="mt-6 border-t border-line pt-5 text-[0.9375rem]">
                Or{" "}
                <a
                  href={whatsappLink("Hello Pasturelands, please tell me when your first homes are ready.")}
                  className="inline-flex items-center gap-1.5 font-bold text-green-900 underline underline-offset-4"
                  target="_blank"
                  rel="noopener"
                >
                  <WhatsAppIcon className="h-4 w-4" /> message us on WhatsApp
                </a>
                . {site.replyPromise}
              </p>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
