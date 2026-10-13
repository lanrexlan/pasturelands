import type { Metadata } from "next";
import { EnquiryForm } from "@/components/form/EnquiryForm";
import { PageIntro } from "@/components/PageIntro";
import { Container } from "@/components/ui";
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
    <>
      <PageIntro eyebrow="Private investment" title="Build what comes next."><p>Pasturelands raises capital privately from a limited number of investors. Contact us to request information.</p></PageIntro>
    <section className="bg-paper">
      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div className="animate-rise">
          <h2 className="text-[2.25rem] sm:text-[3rem]">Request information.</h2>
          <p className="mt-6 max-w-md text-[1.125rem]">
            Pasturelands raises capital privately from a limited number of investors. To request information, contact
            us.
          </p>
          <p className="mt-6 max-w-md">
            Your message goes to our Founder &amp; CEO, Osundoja Osundare. {site.replyPromise}
          </p>
          <p className="mt-4 max-w-md">
            You can also email{" "}
            <a
              href={`mailto:${site.email}?subject=Investor%20enquiry`}
              className="font-bold text-terracotta underline underline-offset-4"
            >
              {site.email}
            </a>
            .
          </p>
          <p className="mt-10 max-w-md border-l-4 border-line pl-4 text-[0.9375rem]">
            Nothing on this website is an offer or invitation to buy shares or any other investment in Pasturelands
            Limited.
          </p>
        </div>

        <div className="border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
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
    </>
  );
}
