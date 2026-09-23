"use server";

import { recipients, sendEmail, tableEmail } from "@/lib/email";
import {
  collectErrors,
  formatNaira,
  labelFor,
  leadSchema,
  normalisePhone,
  options,
  type FieldErrors,
  type LeadInput,
} from "@/lib/lead";
import { clientKey, looksLikeBot } from "@/lib/request";
import { site } from "@/lib/site";
import { dashboardUrl, rpc, signedPhotoUrls, SupabaseError, supabaseConfigured } from "@/lib/supabase";

export type SubmitResult =
  | { ok: true; ref: string }
  | { ok: false; errors?: FieldErrors; message?: string };

const unavailable =
  "We couldn't send your details just now. Your answers are saved on this device, so please try again in a few minutes, or message us on WhatsApp.";

export async function submitLead(
  input: LeadInput & { website?: string; startedAt?: number },
): Promise<SubmitResult> {
  // Quietly accept bot submissions without storing them.
  if (looksLikeBot(input.website, input.startedAt, 8000)) return { ok: true, ref: "received" };

  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      errors: collectErrors(parsed.error),
      message: "Some answers need another look. We've marked them for you.",
    };
  }
  if (!supabaseConfigured) {
    console.error("[sell] Supabase environment variables are not set");
    return { ok: false, message: unavailable };
  }

  const v = input;
  const phone = normalisePhone(v.phone)!;
  const whatsapp = v.whatsappSame ? phone : normalisePhone(v.whatsapp);
  const price = v.askingPrice ? Number(v.askingPrice) : null;

  let ref: string;
  try {
    ref = await rpc<string>("submit_lead", {
      p_client: await clientKey(),
      p: {
        state: v.state,
        area: v.area.trim(),
        property_type: v.propertyType,
        bedrooms: v.bedrooms === "" ? null : Number(v.bedrooms),
        year_built: v.yearBuilt === "" ? null : Number(v.yearBuilt),
        condition: v.condition,
        occupancy: v.occupancy,
        title_documents: v.titleDocuments,
        asking_price_ngn: price,
        timeline: v.timeline,
        reason: v.reason || null,
        photo_paths: v.photoPaths,
        full_name: v.fullName.trim(),
        phone,
        whatsapp,
        email: v.email.trim() || null,
        country: v.country.trim(),
        contact_pref: v.contactPref,
        consent: true,
      },
    });
  } catch (err) {
    if (err instanceof SupabaseError && err.message.includes("rate_limited")) {
      return {
        ok: false,
        message: "We've had several forms from this connection in the last hour. Please message us on WhatsApp instead and we'll pick it up from there.",
      };
    }
    console.error("[sell] submit_lead failed", err);
    return { ok: false, message: unavailable };
  }

  const photos = await signedPhotoUrls(v.photoPaths);
  const { text, html } = tableEmail(
    `New seller lead ${ref}`,
    [
      ["Reference", ref],
      ["Name", v.fullName.trim()],
      ["Phone", phone],
      ["WhatsApp", whatsapp ?? ""],
      ["Email", v.email.trim()],
      ["Lives in", v.country.trim()],
      ["Prefers", labelFor(options.contactPref, v.contactPref)],
      ["Location", `${v.area.trim()}, ${labelFor(options.state, v.state)}`],
      ["Property", labelFor(options.propertyType, v.propertyType)],
      ["Bedrooms", v.bedrooms],
      ["Year built", v.yearBuilt],
      ["Condition", labelFor(options.condition, v.condition)],
      ["Occupied by", labelFor(options.occupancy, v.occupancy)],
      ["Title documents", v.titleDocuments.map((d) => labelFor(options.titleDocuments, d)).join(", ")],
      ["Asking price", price ? formatNaira(price) : "Not given"],
      ["Needs to sell", labelFor(options.timeline, v.timeline)],
      ["Reason", labelFor(options.reason, v.reason)],
      [
        "Photos",
        v.photoPaths.length === 0
          ? "None"
          : photos.length
            ? photos.map((u, i) => `Photo ${i + 1}: ${u}`).join("\n")
            : `${v.photoPaths.length} in the seller-photos bucket (folder ${v.photoPaths[0].split("/")[1]})`,
      ],
    ],
    `Open the leads table: <a href="${dashboardUrl()}">${dashboardUrl()}</a>. Promise to the seller: ${site.replyPromise}`,
  );
  await sendEmail({
    to: recipients("LEADS_EMAIL_TO"),
    subject: `New seller lead ${ref}: ${labelFor(options.propertyType, v.propertyType)} in ${v.area.trim()}`,
    text,
    html,
    replyTo: v.email.trim() || undefined,
  });

  return { ok: true, ref };
}
