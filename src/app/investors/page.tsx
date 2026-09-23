import type { Metadata } from "next";
import { EnquiryForm } from "@/components/form/EnquiryForm";
import { Container, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Investors",
  description: "Pasturelands raises capital privately from a limited number of investors. Contact us to request information.",
};

/*
 * Compliance: contact only. No returns, percentages, deal figures, tranche
 * sizes or projections on this page (brief §8).
 */
export default function InvestorsPage() {
  return (
    <section className="bg-sand">
      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div className="animate-rise">
          <Eyebrow>Investors</Eyebrow>
          <h1 className="mt-4 text-[2.75rem] sm:text-[3.75rem]">Request information.</h1>
          <p className="mt-6 max-w-md text-[1.125rem]">
            Pasturelands raises capital privately from a limited number of investors. To request information, contact
            us.
          </p>
          <p className="mt-6 max-w-md">
            Your message goes to our Founder &amp; CEO, Osundoja Osundare. {site.replyPromise}
          </p>
          <p className="mt-10 max-w-md border-l-4 border-line pl-4 text-[0.9375rem]">
            Nothing on this website is an offer or invitation to buy shares or any other investment in Pasturelands
            Limited.
          </p>
        </div>

        <div className="border-t-4 border-green-900 bg-paper p-6 shadow-[0_24px_60px_-40px_rgba(22,48,42,0.5)] sm:p-10">
          <h2 className="text-[2rem]">Contact us</h2>
          <div className="mt-6">
            <EnquiryForm
              kind="investor"
              submitLabel="Send"
              successTitle="Thank you. We have your message."
              successBody={`We will reply by email or phone. ${site.replyPromise}`}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
