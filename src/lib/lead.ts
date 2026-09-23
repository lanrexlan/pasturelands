import { z } from "zod";

/*
 * The seller form's options, schema and helpers. Shared by the browser (step
 * checks, autosave) and the server action (the check that counts).
 * Option values are what gets stored in the database; labels are for people.
 */

export const options = {
  state: [
    { value: "abuja", label: "Abuja (FCT)" },
    { value: "lagos", label: "Lagos" },
    { value: "other", label: "Somewhere else" },
  ],
  propertyType: [
    { value: "flat", label: "Flat / apartment" },
    { value: "terrace", label: "Terrace" },
    { value: "semi_detached", label: "Semi-detached" },
    { value: "detached", label: "Detached house" },
    { value: "bungalow", label: "Bungalow" },
    { value: "duplex", label: "Duplex" },
    { value: "land_with_building", label: "Land with a building" },
  ],
  condition: [
    { value: "move_in_ready", label: "Move-in ready", hint: "Someone could live there today" },
    { value: "light_work", label: "Needs light work", hint: "Paint, fittings, small repairs" },
    { value: "major_work", label: "Needs major work", hint: "Roof, wiring, plumbing or unfinished" },
  ],
  occupancy: [
    { value: "owner", label: "I live there (or my family does)" },
    { value: "tenant", label: "A tenant lives there" },
    { value: "empty", label: "It's empty" },
  ],
  titleDocuments: [
    { value: "c_of_o", label: "Certificate of Occupancy (C of O)" },
    { value: "governors_consent", label: "Governor's Consent" },
    { value: "deed_of_assignment", label: "Deed of Assignment" },
    { value: "registered_survey", label: "Registered survey plan" },
    { value: "excision_gazette", label: "Excision / Gazette" },
    { value: "other", label: "Something else" },
    { value: "not_sure", label: "I'm not sure" },
  ],
  timeline: [
    { value: "within_1_month", label: "Within a month" },
    { value: "1_3_months", label: "In 1 to 3 months" },
    { value: "3_plus_months", label: "In more than 3 months" },
  ],
  reason: [
    { value: "relocating", label: "I'm relocating abroad" },
    { value: "inherited", label: "It's an inherited home" },
    { value: "diaspora", label: "I live outside Nigeria" },
    { value: "financial", label: "I need the money soon" },
    { value: "developer", label: "I'm a developer with unsold units" },
    { value: "other", label: "Another reason" },
  ],
  contactPref: [
    { value: "whatsapp", label: "WhatsApp" },
    { value: "phone", label: "Phone call" },
    { value: "email", label: "Email" },
  ],
} as const;

type Opt = readonly { value: string }[];
const values = <T extends Opt>(o: T) =>
  o.map((x) => x.value) as [T[number]["value"], ...T[number]["value"][]];

export function labelFor(list: readonly { value: string; label: string }[], v?: string | null) {
  return list.find((o) => o.value === v)?.label ?? v ?? "";
}

/**
 * Normalise a phone number to E.164. Accepts Nigerian local numbers
 * (0803 123 4567), +234 / 234 forms, and international numbers written with
 * + or 00. Returns null when it can't be sure what the number is.
 */
export function normalisePhone(input: string): string | null {
  const raw = input.trim();
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return null;

  let e164: string;
  if (raw.startsWith("+")) e164 = `+${digits}`;
  else if (digits.startsWith("00")) e164 = `+${digits.slice(2)}`;
  else if (digits.startsWith("234") && digits.length === 13) e164 = `+${digits}`;
  else if (digits.startsWith("0") && digits.length === 11) e164 = `+234${digits.slice(1)}`;
  else return null;

  // Nigerian numbers are +234 followed by 10 digits.
  if (e164.startsWith("+234")) return e164.length === 14 ? e164 : null;
  return /^\+[1-9]\d{7,14}$/.test(e164) ? e164 : null;
}

export function formatNaira(n: number) {
  return `₦${n.toLocaleString("en-NG")}`;
}

/** "120000000" → "120,000,000" for display inside the price input. */
export function groupDigits(digits: string) {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const phone = (msg: string) =>
  z
    .string()
    .trim()
    .min(1, msg)
    .refine((v) => normalisePhone(v) !== null, {
      message: "That number doesn't look right. Use 0803 123 4567, or +44 7700 900123 if you're abroad.",
    });

const optionalInt = (min: number, max: number, msg: string) =>
  z
    .string()
    .trim()
    .refine((v) => v === "" || (/^\d+$/.test(v) && +v >= min && +v <= max), { message: msg });

export const stepSchemas = [
  z.object({
    state: z.enum(values(options.state), { message: "Choose where the home is." }),
    area: z.string().trim().min(2, "Tell us the area or neighbourhood, e.g. Gwarinpa or Lekki Phase 1.").max(120),
    propertyType: z.enum(values(options.propertyType), { message: "Choose the kind of property." }),
    bedrooms: optionalInt(0, 30, "Enter the number of bedrooms, from 0 to 30."),
    yearBuilt: optionalInt(1900, new Date().getFullYear() + 1, "Enter a year like 2012, or leave it blank."),
  }),
  z.object({
    condition: z.enum(values(options.condition), { message: "Choose the option closest to the home's condition." }),
    occupancy: z.enum(values(options.occupancy), { message: "Tell us who lives there now." }),
  }),
  z.object({
    titleDocuments: z
      .array(z.enum(values(options.titleDocuments)))
      .min(1, "Tick every document you hold. If you don't know, tick \"I'm not sure\"."),
  }),
  z.object({
    askingPrice: z
      .string()
      .trim()
      .refine((v) => v === "" || /^\d{1,13}$/.test(v), { message: "Enter the price in naira, numbers only." }),
    timeline: z.enum(values(options.timeline), { message: "Tell us how soon you need to sell." }),
    reason: z.union([z.enum(values(options.reason)), z.literal("")]),
  }),
  z.object({
    photoPaths: z
      .array(z.string().regex(/^uploads\/[0-9a-f-]{36}\/[0-9a-z-]{8,40}\.(jpg|webp)$/))
      .max(10, "You can send up to 10 photos."),
  }),
  z.object({
    fullName: z.string().trim().min(2, "Tell us your name.").max(120),
    phone: phone("We need a phone number to reach you."),
    whatsappSame: z.boolean(),
    whatsapp: z.string().trim(),
    email: z.union([z.literal(""), z.email("That email address doesn't look right.")]),
    country: z.string().trim().min(2, "Tell us which country you live in.").max(80),
    contactPref: z.enum(values(options.contactPref), { message: "Choose how you'd like us to contact you." }),
    consent: z.literal(true, { message: "Please agree to the privacy notice so we can use your details." }),
  }),
] as const;

const leadBase = stepSchemas.reduce<z.ZodObject>((acc, s) => acc.extend(s.shape), z.object({}));

/**
 * Rules that span fields. Kept outside the Zod object because Zod skips
 * refinements when any field fails, which would hide these errors until a
 * second attempt.
 */
function crossFieldErrors(v: LeadInput): FieldErrors {
  const out: FieldErrors = {};
  if (!v.whatsappSame && normalisePhone(String(v.whatsapp ?? "")) === null) {
    out.whatsapp = "Enter your WhatsApp number, or tick that it's the same as your phone.";
  }
  if (v.contactPref === "email" && !String(v.email ?? "").trim()) {
    out.email = "Add an email address so we can email you.";
  }
  return out;
}

/** Validate a whole lead: field rules plus cross-field rules. Empty object means valid. */
export function validateLead(v: LeadInput): FieldErrors {
  const res = leadBase.safeParse(v);
  const errors = res.success ? {} : collectErrors(res.error);
  for (const [k, msg] of Object.entries(crossFieldErrors(v)) as [keyof LeadInput, string][]) {
    if (!errors[k]) errors[k] = msg;
  }
  return errors;
}

export type LeadInput = {
  state: string;
  area: string;
  propertyType: string;
  bedrooms: string;
  yearBuilt: string;
  condition: string;
  occupancy: string;
  titleDocuments: string[];
  askingPrice: string;
  timeline: string;
  reason: string;
  photoPaths: string[];
  fullName: string;
  phone: string;
  whatsappSame: boolean;
  whatsapp: string;
  email: string;
  country: string;
  contactPref: string;
  consent: boolean;
};

export const emptyLead: LeadInput = {
  state: "",
  area: "",
  propertyType: "",
  bedrooms: "",
  yearBuilt: "",
  condition: "",
  occupancy: "",
  titleDocuments: [],
  askingPrice: "",
  timeline: "",
  reason: "",
  photoPaths: [],
  fullName: "",
  phone: "",
  whatsappSame: true,
  whatsapp: "",
  email: "",
  country: "Nigeria",
  contactPref: "whatsapp",
  consent: false,
};

export type FieldErrors = Partial<Record<keyof LeadInput, string>>;

/** First message per field, keyed by field name. */
export function collectErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof LeadInput;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

/** Errors for one step of the form, including the cross-field rules. */
export function validateStep(step: number, v: LeadInput): FieldErrors {
  const schema = stepSchemas[step];
  const res = schema.safeParse(v);
  const errors = res.success ? {} : collectErrors(res.error);
  const cross = crossFieldErrors(v);
  for (const key of Object.keys(schema.shape) as (keyof LeadInput)[]) {
    if (!errors[key] && cross[key]) errors[key] = cross[key];
  }
  return errors;
}
