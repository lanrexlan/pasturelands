import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/form/EnquiryForm";
import { listingPrice, listingType, TitleVerifiedBadge } from "@/components/homes/ListingCard";
import { IsoHouse } from "@/components/illustrations/IsoHouse";
import { Container, Eyebrow, WhatsAppIcon, buttonStyles } from "@/components/ui";
import { formatNaira, labelFor, options } from "@/lib/lead";
import { getListing, photoUrl, stateLabel, statusLabel } from "@/lib/listings";
import { site, whatsappLink } from "@/lib/site";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const l = await getListing(slug);
  if (!l) return { title: "Home not found" };
  const place = [l.area, stateLabel(l.state)].filter(Boolean).join(", ");
  const description = `${listingType(l)}${l.bedrooms != null ? `, ${l.bedrooms} bedrooms` : ""} in ${place}. ${listingPrice(l)}. No agency fee.`;
  return {
    title: l.title,
    description,
    openGraph: l.photos[0] ? { images: [{ url: photoUrl(l.photos[0]) }], description } : { description },
  };
}

/** ₦m with one decimal where useful: 105000000 → "₦105m". */
function short(n: number) {
  const m = n / 1_000_000;
  return `₦${m >= 100 ? Math.round(m) : m.toFixed(1).replace(/\.0$/, "")}m`;
}

export default async function ListingPage({ params }: Props) {
  const { slug } = await params;
  const l = await getListing(slug);
  if (!l) notFound();

  const place = [l.area, stateLabel(l.state)].filter(Boolean).join(", ");
  const forSale = l.status === "for_sale" || l.status === "under_offer";
  const [main, ...rest] = l.photos;
  const waText = `Hello Pasturelands, I'm interested in "${l.title}" (${site.url}/homes/${l.slug}).`;

  const facts: [string, string][] = [
    ["Status", statusLabel[l.status]],
    ["Location", place],
    ["Type", listingType(l)],
    ["Bedrooms", l.bedrooms != null ? String(l.bedrooms) : ""],
    ["Bathrooms", l.bathrooms != null ? String(l.bathrooms) : ""],
    ["Title document", l.title_document ? labelFor(options.titleDocuments, l.title_document) : ""],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <article className="bg-sand">
      <Container className="pt-8">
        <Link href="/homes" className="inline-flex min-h-11 items-center gap-2 font-bold text-green-900 underline underline-offset-4">
          <span aria-hidden="true">←</span> All homes
        </Link>
      </Container>

      {/* Gallery */}
      <Container className="mt-4">
        {main ? (
          <div className="grid gap-2 lg:grid-cols-[2fr_1fr]">
            <div className="relative aspect-[4/3] overflow-hidden bg-paper lg:aspect-auto lg:min-h-[480px]">
              <Image src={photoUrl(main)} alt={`${l.title}: main photo`} fill priority sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
            </div>
            {rest.length > 0 && (
              <ul className="flex snap-x gap-2 overflow-x-auto lg:grid lg:grid-cols-2 lg:overflow-visible" aria-label="More photos">
                {rest.map((p, i) => (
                  <li key={p} className="relative aspect-[4/3] w-[70%] shrink-0 snap-start overflow-hidden bg-paper sm:w-[40%] lg:w-auto">
                    <Image src={photoUrl(p)} alt={`${l.title}: photo ${i + 2}`} fill sizes="(min-width: 1024px) 190px, 70vw" className="object-cover" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="stage-grid flex aspect-[16/9] items-end justify-center bg-terracotta px-10 pt-10 lg:aspect-[21/8]">
            <IsoHouse animate={false} title="" className="h-full w-auto" />
          </div>
        )}
      </Container>

      <Container className="grid gap-12 py-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:py-16">
        <div>
          <Eyebrow>{statusLabel[l.status]}</Eyebrow>
          <h1 className="mt-3 text-[2.5rem] sm:text-[3.25rem]">{l.title}</h1>
          <p className="mt-2 text-[1.125rem]">{place}</p>
          <p className="mt-5 font-serif text-[2.5rem] leading-none text-terracotta">{listingPrice(l)}</p>

          <dl className="mt-10 grid grid-cols-2 border-t-2 border-green-900 sm:grid-cols-3">
            {facts.map(([k, v]) => (
              <div key={k} className="border-b border-line py-4 pr-4">
                <dt className="text-[0.875rem] font-bold uppercase tracking-[0.1em]">{k}</dt>
                <dd className="mt-1 font-serif text-[1.375rem] text-green-900">{v}</dd>
              </div>
            ))}
          </dl>

          {/* Title status */}
          <section aria-labelledby="title-heading" className="mt-10">
            <h2 id="title-heading" className="text-[1.75rem]">
              Title
            </h2>
            {l.title_verified ? (
              <div className="mt-4 border-l-4 border-green-900 bg-paper p-5">
                <TitleVerifiedBadge />
                <p className="mt-3">
                  Our lawyer has checked this title: land registry search, survey, all owners and no charges or court
                  cases. We&apos;ll share the documents with you and your lawyer before you commit.
                </p>
              </div>
            ) : (
              <p className="mt-4">Ask us about the title documents for this home. We&apos;ll share them with you and your lawyer.</p>
            )}
          </section>

          {l.renovation_summary && (
            <section aria-labelledby="reno-heading" className="mt-10">
              <h2 id="reno-heading" className="text-[1.75rem]">
                What we renovated
              </h2>
              <p className="mt-4 whitespace-pre-line">{l.renovation_summary}</p>
            </section>
          )}

          {l.description && (
            <section aria-labelledby="about-heading" className="mt-10">
              <h2 id="about-heading" className="text-[1.75rem]">
                About this home
              </h2>
              <p className="mt-4 whitespace-pre-line">{l.description}</p>
            </section>
          )}

          {forSale && l.price_ngn ? (
            <section aria-labelledby="cost-heading" className="on-dark mt-12 bg-green-900 p-6 text-mist sm:p-8">
              <h2 id="cost-heading" className="text-[1.75rem] text-sand">
                What it costs you, all in
              </h2>
              <dl className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="border-t border-green-700 pt-4">
                  <dt className="font-bold text-sand">A similar home through an agent</dt>
                  <dd className="mt-2 font-serif text-[2.25rem] leading-none text-sand">
                    <span className="sr-only">about </span>
                    {short(l.price_ngn * 1.2)}
                  </dd>
                  <dd className="mt-2 text-[0.9375rem]">
                    Price plus about 10% agency fee ({short(l.price_ngn * 0.1)}) and 10% legal ({short(l.price_ngn * 0.1)}).
                  </dd>
                </div>
                <div className="border-t border-green-700 pt-4">
                  <dt className="font-bold text-sand">Buying this home from us</dt>
                  <dd className="mt-2 font-serif text-[2.25rem] leading-none text-gold">
                    <span className="sr-only">about </span>
                    {short(l.price_ngn * 1.05)}–{short(l.price_ngn * 1.1).slice(1)}
                  </dd>
                  <dd className="mt-2 text-[0.9375rem]">{formatNaira(l.price_ngn)} plus legal and registration. No agency fee.</dd>
                </div>
              </dl>
              <p className="mt-6 text-[0.875rem]">
                Estimates for comparison. Legal and registration costs vary by property and state.
              </p>
            </section>
          ) : null}
        </div>

        {/* Enquiry */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="border-t-4 border-green-900 bg-paper p-6 sm:p-8">
            <h2 className="text-[1.75rem]">Ask about this home</h2>
            <p className="mt-2 text-[0.9375rem]">{site.replyPromise}</p>
            <a href={whatsappLink(waText)} className={`${buttonStyles.dark} mt-5 w-full`} target="_blank" rel="noopener">
              <WhatsAppIcon /> Ask on WhatsApp
            </a>
            <p className="my-5 text-center text-[0.9375rem]">or send us a message</p>
            <EnquiryForm
              kind="buyer"
              listingId={l.id}
              listingTitle={l.title}
              submitLabel="Send my question"
              successTitle="Thanks, we have your question."
              successBody={site.replyPromise}
            />
          </div>
        </aside>
      </Container>
    </article>
  );
}
