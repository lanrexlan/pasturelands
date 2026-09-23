import { z } from "zod";
import { normalisePhone } from "./lead";

/* Buyer, investor and waitlist enquiries: shared by the forms and the Server Action. */

export const amountRanges = [
  { value: "under_10m", label: "Under ₦10m" },
  { value: "10m_50m", label: "₦10m to ₦50m" },
  { value: "50m_200m", label: "₦50m to ₦200m" },
  { value: "over_200m", label: "Over ₦200m" },
  { value: "not_sure", label: "Not sure yet" },
] as const;

export const interests = [
  { value: "buy", label: "Buying" },
  { value: "rent", label: "Renting" },
  { value: "either", label: "Either" },
] as const;

export const cities = [
  { value: "abuja", label: "Abuja" },
  { value: "lagos", label: "Lagos" },
  { value: "either", label: "Either" },
] as const;

export type EnquiryKind = "buyer" | "investor" | "waitlist";

export type EnquiryInput = {
  kind: EnquiryKind;
  listingId?: string;
  listingTitle?: string;
  fullName: string;
  phone: string;
  email: string;
  country: string;
  amountRange?: string;
  interest?: string;
  city?: string;
  message: string;
  consent: boolean;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

const optionalPhone = z
  .string()
  .trim()
  .refine((v) => v === "" || normalisePhone(v) !== null, {
    message: "That number doesn't look right. Use 0803 123 4567, or +44 7700 900123 if you're abroad.",
  });

const email = z.union([z.literal(""), z.email("That email address doesn't look right.")]);

export const enquirySchema = z
  .object({
    kind: z.enum(["buyer", "investor", "waitlist"]),
    listingId: z.union([z.uuid(), z.literal("")]).optional(),
    listingTitle: z.string().max(200).optional(),
    fullName: z.string().trim().max(120),
    phone: optionalPhone,
    email,
    country: z.string().trim().max(80),
    amountRange: z.string().optional(),
    interest: z.string().optional(),
    city: z.string().optional(),
    message: z.string().trim().max(2000, "Please keep your message under 2,000 characters."),
    consent: z.literal(true, { message: "Please agree to the privacy notice so we can use your details." }),
  });

/** Field rules plus the cross-field rules, all reported in one pass. */
export function validateEnquiry(v: EnquiryInput): EnquiryErrors {
  const res = enquirySchema.safeParse(v);
  const errors = res.success ? {} : enquiryErrors(res.error);
  const add = (k: keyof EnquiryInput, msg: string) => {
    if (!errors[k]) errors[k] = msg;
  };
  const phone = String(v.phone ?? "").trim();
  const email = String(v.email ?? "").trim();
  if (!phone && !email) {
    add(
      "email",
      v.kind === "waitlist"
        ? "Give us an email address or a WhatsApp number so we can tell you."
        : "Give us a phone number or an email address so we can reply.",
    );
  }
  if (v.kind !== "waitlist" && String(v.fullName ?? "").trim().length < 2) add("fullName", "Tell us your name.");
  if (v.kind === "investor" && String(v.country ?? "").trim().length < 2) add("country", "Tell us which country you live in.");
  return errors;
}

export function enquiryErrors(error: z.ZodError): EnquiryErrors {
  const out: EnquiryErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof EnquiryInput;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
