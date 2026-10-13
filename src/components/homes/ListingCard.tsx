import Image from "next/image";
import { SealCheckIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { formatNaira } from "@/lib/lead";
import { photoUrl, stateLabel, statusLabel, type Listing } from "@/lib/listings";
import { options, labelFor } from "@/lib/lead";

export function TitleVerifiedBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 bg-green-900 px-2.5 py-1 text-[0.8125rem] font-bold text-sand ${className}`}>
      <SealCheckIcon size={16} className="text-gold" aria-hidden="true" />
      Title verified
    </span>
  );
}

export function listingPrice(l: Listing) {
  if ((l.status === "for_rent" || l.status === "let") && l.rent_ngn_per_year) {
    return `${formatNaira(l.rent_ngn_per_year)} / year`;
  }
  return l.price_ngn ? formatNaira(l.price_ngn) : "Price on request";
}

export function listingType(l: Listing) {
  return l.property_type ? labelFor(options.propertyType, l.property_type) : "";
}

export function ListingCard({ listing: l, priority = false }: { listing: Listing; priority?: boolean }) {
  const place = [l.area, stateLabel(l.state)].filter(Boolean).join(", ");
  const closed = l.status === "sold" || l.status === "let";
  return (
    <article className="group relative flex flex-col border-b border-line bg-paper">
      <div className="relative aspect-[4/3] overflow-hidden bg-terracotta">
        {l.photos[0] ? (
          <Image
            src={photoUrl(l.photos[0])}
            alt=""
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${closed ? "grayscale-[40%]" : ""}`}
            priority={priority}
          />
        ) : (
          <div className="stage-grid flex h-full items-end justify-center px-10 pt-6">
            <p className="self-center px-6 text-center text-paper">Property photos coming soon</p>
          </div>
        )}
        <span className="absolute left-3 top-3 bg-paper px-2.5 py-1 text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-green-900">
          {statusLabel[l.status]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        {l.title_verified && <TitleVerifiedBadge className="mb-3 self-start" />}
        <h3 className="font-serif text-[1.5rem] leading-tight">
          <Link href={`/homes/${l.slug}`} className="after:absolute after:inset-0">
            {l.title}
          </Link>
        </h3>
        <p className="mt-1 text-[0.9375rem]">{place}</p>
        <p className="mt-3 text-[0.9375rem] text-green-900">
          {[listingType(l), l.bedrooms != null ? `${l.bedrooms} bed` : "", l.bathrooms != null ? `${l.bathrooms} bath` : ""]
            .filter(Boolean)
            .join(" · ")}
        </p>
        <p className="mt-auto pt-4 font-serif text-[1.625rem] text-terracotta">{listingPrice(l)}</p>
      </div>
    </article>
  );
}
