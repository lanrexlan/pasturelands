/**
 * Company details shown across the site.
 *
 * Bracketed values are placeholders the founders still have to supply
 * (see README "Placeholders"). Contact details can be set with environment
 * variables so they can change without a code edit.
 */
export const site = {
  name: "Pasturelands",
  legalName: "Pasturelands Limited",
  rcNumber: "RC 9878583",
  /** Canonical origin. Falls back to the Vercel URL, then localhost. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  /** Digits only, international format without "+", e.g. 2348012345678. */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "0912 283 5682",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "pasturelandsltd@gmail.com",
  address: process.env.NEXT_PUBLIC_OFFICE_ADDRESS ?? "[Office address]",
  replyPromise: "We'll reply within 2 working days (West Africa Time).",
} as const;

export const nav = [
  { href: "/sell", label: "Sell your home" },
  { href: "/homes", label: "Homes for sale" },
  { href: "/about", label: "About us" },
  { href: "/investors", label: "Investors" },
] as const;

/** True when a value is still an unfilled "[Placeholder]". */
export function isPlaceholder(value: string) {
  return value === "" || value.startsWith("[");
}

/** tel: link for a displayed Nigerian or international number. */
export function telHref(phone: string = site.phone) {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return `tel:${digits}`;
  if (digits.startsWith("0") && digits.length === 11) return `tel:+234${digits.slice(1)}`;
  return `tel:${digits}`;
}

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
