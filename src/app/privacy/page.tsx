import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How Pasturelands Limited collects, uses, keeps and deletes personal data, under the Nigeria Data Protection Act 2023.",
};

const LAST_UPDATED = "23 September 2026";

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: "who",
    title: "Who we are",
    body: (
      <>
        <p>
          {site.legalName} ({site.rcNumber}) is the data controller for personal data collected through this website.
          This notice explains what we collect, why, how long we keep it and how you can ask us to delete it, as
          required by the Nigeria Data Protection Act 2023 (NDPA).
        </p>
        <p>
          Contact for data protection matters: {site.email}, {site.address}.
        </p>
      </>
    ),
  },
  {
    id: "what",
    title: "What we collect",
    body: (
      <>
        <p>
          <strong>If you ask for an offer on your home</strong> (the form at <Link href="/sell">/sell</Link>): the
          property&apos;s location, type, size, age, condition and occupancy; the title documents you say you hold; your
          asking price, timing and (if you choose) your reason for selling; any photos you upload; and your name, phone
          and WhatsApp numbers, email address, country of residence and how you&apos;d like us to contact you.
        </p>
        <p>
          <strong>If you send us an enquiry</strong> (about a home, our waitlist or investing): your name, phone number,
          email address, country, message and, for investors, the rough amount range you choose to give.
        </p>
        <p>
          <strong>Automatically:</strong> when you send a form, we store a one-way scrambled (hashed) version of your
          internet address, only to limit repeated submissions. Our hosting provider keeps standard server logs. The
          offer form saves your answers in your own browser (local storage) as you type, so you don&apos;t lose them;
          that copy stays on your device and is cleared when you send the form or press &quot;Start again&quot;.
        </p>
        <p>We do not use advertising or tracking cookies, and we don&apos;t currently use website analytics.</p>
      </>
    ),
  },
  {
    id: "why",
    title: "Why we use it, and our lawful basis",
    body: (
      <ul>
        <li>
          <strong>To assess your home and make you an offer</strong>, and to contact you about it: your consent, which
          you give on the form, and steps you ask us to take before a possible contract.
        </li>
        <li>
          <strong>To answer enquiries</strong> and, if you join the waitlist, to tell you when homes are available:
          your consent.
        </li>
        <li>
          <strong>To verify title and complete a purchase or sale</strong>: performance of a contract and our legal
          obligations, including record-keeping and anti-money-laundering checks.
        </li>
        <li>
          <strong>To keep the website safe and free of spam</strong>: our legitimate interests.
        </li>
      </ul>
    ),
  },
  {
    id: "share",
    title: "Who we share it with",
    body: (
      <>
        <p>We do not sell your personal data. We share it only with:</p>
        <ul>
          <li>
            <strong>Service providers who run parts of our website for us</strong>: Supabase (database and file
            storage, hosted in the European Union), Vercel (website hosting) and Resend (email delivery). They process
            data only on our instructions.
          </li>
          <li>
            <strong>Professionals working on a transaction</strong>, such as our lawyers and surveyors, when we check a
            title or complete a sale.
          </li>
          <li>
            <strong>Authorities</strong>, where the law requires it.
          </li>
        </ul>
        <p>
          Some of these providers store data outside Nigeria. Where they do, we rely on the transfer grounds and
          safeguards set out in Part VIII of the NDPA.
        </p>
      </>
    ),
  },
  {
    id: "keep",
    title: "How long we keep it",
    body: (
      <ul>
        <li>
          <strong>Offers that don&apos;t go ahead, and enquiries</strong>: deleted within 24 months of our last contact
          with you, or sooner if you ask.
        </li>
        <li>
          <strong>Waitlist</strong>: until you ask to be removed, or 24 months, whichever comes first.
        </li>
        <li>
          <strong>Homes we buy or sell</strong>: transaction records for as long as the law requires us to keep them
          [period to be confirmed by counsel].
        </li>
        <li>
          <strong>Photos you upload</strong>: deleted with the offer they belong to.
        </li>
        <li>
          <strong>Rate-limit records</strong> (hashed internet address): deleted within a day.
        </li>
      </ul>
    ),
  },
  {
    id: "rights",
    title: "Your rights",
    body: (
      <>
        <p>Under the NDPA you can ask us to:</p>
        <ul>
          <li>tell you what personal data we hold about you and give you a copy;</li>
          <li>correct anything that is wrong or incomplete;</li>
          <li>delete your data;</li>
          <li>restrict or stop using it, or object to how we use it;</li>
          <li>send it to you or another organisation in a common format;</li>
          <li>withdraw your consent at any time (this doesn&apos;t affect what we did before you withdrew).</li>
        </ul>
        <p>We don&apos;t make decisions about you by automated means alone.</p>
        <p>
          If you&apos;re unhappy with how we handle your data, please tell us first. You can also complain to the
          Nigeria Data Protection Commission (NDPC).
        </p>
      </>
    ),
  },
  {
    id: "delete",
    title: "How to ask us to delete your data",
    body: (
      <>
        <p>
          Email {site.email} or message us on WhatsApp with &quot;Delete my data&quot;. Include your reference (for
          example PL-2026-0001) if you have one. We may ask you to confirm your identity, then we&apos;ll delete your
          data and confirm we have done so within 30 days [timeframe to be confirmed by counsel], unless the law
          requires us to keep part of it; if so, we&apos;ll tell you what and why.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Keeping it safe",
    body: (
      <p>
        Data is sent over encrypted connections and stored with access limited to the Pasturelands team. Photos you
        upload go to a private store that the public cannot read.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this notice",
    body: <p>If we change this notice we&apos;ll update the date at the top. Significant changes will be shown on this page.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <section className="bg-sand">
      <Container className="py-14 sm:py-20">
        <div className="mb-10 border-2 border-terracotta bg-paper px-5 py-4 font-bold text-terracotta-dark">
          [TO BE REVIEWED BY COUNSEL] This draft has not yet been reviewed by a lawyer.
        </div>
        <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <div>
            <Eyebrow>Legal</Eyebrow>
            <h1 className="mt-4 text-[2.75rem] sm:text-[3.5rem]">Privacy notice</h1>
            <p className="mt-3 text-[0.9375rem]">Last updated {LAST_UPDATED}</p>
            <nav aria-label="On this page" className="mt-8 hidden lg:sticky lg:top-8 lg:block">
              <ol className="space-y-2 border-l-2 border-line pl-4 text-[0.9375rem]">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-green-900 hover:underline">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
          <div className="max-w-2xl">
            {sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-h`}
                className="border-t-2 border-green-900 py-8 first:pt-6 [&_a]:font-bold [&_a]:text-terracotta [&_a]:underline [&_a]:underline-offset-4 [&_li]:mt-2 [&_p+p]:mt-4 [&_p]:mt-0 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5"
              >
                <h2 id={`${s.id}-h`} className="text-[1.875rem]">
                  <span className="mr-3 text-terracotta">{i + 1}.</span>
                  {s.title}
                </h2>
                <div className="mt-4">{s.body}</div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
