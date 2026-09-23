import "server-only";
import { LISTING_PHOTO_BUCKET, supabaseAnonKey, supabaseConfigured, supabaseUrl } from "./supabase";

export type ListingStatus = "for_sale" | "for_rent" | "under_offer" | "sold" | "let";

export type Listing = {
  id: string;
  slug: string;
  status: ListingStatus;
  title: string;
  state: string | null;
  area: string | null;
  property_type: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  price_ngn: number | null;
  rent_ngn_per_year: number | null;
  title_verified: boolean;
  title_document: string | null;
  renovation_summary: string | null;
  description: string | null;
  photos: string[];
  created_at: string;
};

export const statusLabel: Record<ListingStatus, string> = {
  for_sale: "For sale",
  for_rent: "For rent",
  under_offer: "Under offer",
  sold: "Sold",
  let: "Let",
};

/** Listing data is cached for five minutes, so a newly published home appears quickly. */
export const LISTINGS_REVALIDATE = 300;

const columns =
  "id,slug,status,title,state,area,property_type,bedrooms,bathrooms,price_ngn,rent_ngn_per_year,title_verified,title_document,renovation_summary,description,photos,created_at";

async function query(params: string): Promise<Listing[]> {
  if (!supabaseConfigured) return [];
  try {
    // RLS only returns published rows to the anon key; the filter is belt and braces.
    const res = await fetch(`${supabaseUrl}/rest/v1/listings?select=${columns}&published=eq.true&${params}`, {
      headers: { apikey: supabaseAnonKey, Authorization: `Bearer ${supabaseAnonKey}` },
      next: { revalidate: LISTINGS_REVALIDATE, tags: ["listings"] },
    });
    if (!res.ok) {
      console.error("[listings] query failed", res.status, await res.text());
      return [];
    }
    return (await res.json()) as Listing[];
  } catch (err) {
    console.error("[listings] query failed", err);
    return [];
  }
}

export function getListings() {
  return query("order=created_at.desc");
}

export async function getListing(slug: string) {
  if (!/^[a-z0-9-]{1,120}$/.test(slug)) return null;
  const rows = await query(`slug=eq.${slug}&limit=1`);
  return rows[0] ?? null;
}

/** Public URL for a listing photo: a storage path in listing-photos, or a full URL. */
export function photoUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${supabaseUrl}/storage/v1/object/public/${LISTING_PHOTO_BUCKET}/${path.replace(/^\/+/, "")}`;
}

export const stateLabel = (s: string | null) =>
  s === "abuja" ? "Abuja" : s === "lagos" ? "Lagos" : s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
