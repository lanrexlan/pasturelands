import { Faq, faqs } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { ForBuyers } from "@/components/home/ForBuyers";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Verification } from "@/components/home/Verification";
import { WhoWeHelp } from "@/components/home/WhoWeHelp";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.text },
  })),
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhoWeHelp />
      <ForBuyers />
      <Verification />
      <Faq />
      <FinalCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
