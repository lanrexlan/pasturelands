/*
 * Minimal Supabase REST calls. Using fetch directly keeps supabase-js out of
 * the browser bundle; the site only ever needs a handful of endpoints.
 */

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
/** Public (anon / publishable) key. Safe in the browser: RLS limits it. */
export const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const SELLER_PHOTO_BUCKET = "seller-photos";
export const LISTING_PHOTO_BUCKET = "listing-photos";

function headers(key = supabaseAnonKey) {
  return { apikey: key, Authorization: `Bearer ${key}` };
}

export class SupabaseError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

/** Call a Postgres function exposed through PostgREST. */
export async function rpc<T>(fn: string, args: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${supabaseUrl}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify(args),
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) throw new SupabaseError(text, res.status);
  return (text ? JSON.parse(text) : null) as T;
}

/** Upload one file to Storage. Used from the browser for seller photos. */
export async function uploadObject(bucket: string, path: string, body: Blob) {
  const res = await fetch(`${supabaseUrl}/storage/v1/object/${bucket}/${path}`, {
    method: "POST",
    headers: { ...headers(), "Content-Type": body.type, "x-upsert": "false" },
    body,
  });
  if (!res.ok) throw new SupabaseError(await res.text(), res.status);
}

/**
 * Signed links to private seller photos for the team email. Needs the
 * service role key; returns [] without it.
 */
export async function signedPhotoUrls(paths: string[], expiresIn = 60 * 60 * 24 * 14) {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey || paths.length === 0) return [];
  const res = await fetch(`${supabaseUrl}/storage/v1/object/sign/${SELLER_PHOTO_BUCKET}`, {
    method: "POST",
    headers: { ...headers(serviceKey), "Content-Type": "application/json" },
    body: JSON.stringify({ expiresIn, paths }),
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = (await res.json()) as { signedURL?: string | null }[];
  return data.flatMap((d) => (d.signedURL ? [`${supabaseUrl}/storage/v1${d.signedURL}`] : []));
}

/** Link to the project's table editor in the Supabase dashboard. */
export function dashboardUrl() {
  const ref = supabaseUrl.match(/^https:\/\/([a-z0-9]+)\.supabase\.co/)?.[1];
  return ref ? `https://supabase.com/dashboard/project/${ref}/editor` : "https://supabase.com/dashboard";
}
