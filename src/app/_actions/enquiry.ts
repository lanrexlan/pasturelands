"use server";

import { recipients, sendEmail, tableEmail } from "@/lib/email";
import { amountRanges, cities, enquirySchema, interests, validateEnquiry, type EnquiryErrors, type EnquiryInput } from "@/lib/enquiry";
import { labelFor, normalisePhone } from "@/lib/lead";
import { clientKey, looksLikeBot } from "@/lib/request";
import { dashboardUrl, rpc, SupabaseError, supabaseConfigured } from "@/lib/supabase";

export type EnquiryResult = { ok: true } | { ok: false; errors?: EnquiryErrors; message?: string };

const subjects = {
  buyer: "Buyer enquiry",
  investor: "Investor enquiry",
  waitlist: "New homes waitlist sign-up",
} as const;

export async function submitEnquiry(
  input: EnquiryInput & { website?: string; startedAt?: number },
): Promise<EnquiryResult> {
  if (looksLikeBot(input.website, input.startedAt)) return { ok: true };

  const errors = validateEnquiry(input);
  const parsed = enquirySchema.safeParse(input);
  if (Object.keys(errors).length || !parsed.success) {
    return { ok: false, errors, message: "Some answers need another look." };
  }
  if (!supabaseConfigured) {
    console.error("[enquiry] Supabase environment variables are not set");
    return { ok: false, message: "We couldn't send this just now. Please try again shortly, or message us on WhatsApp." };
  }

  const v = parsed.data;
  const phone = v.phone ? normalisePhone(v.phone) : null;
  const extra = [
    v.interest ? `Interested in: ${labelFor(interests, v.interest)}` : "",
    v.city ? `City: ${labelFor(cities, v.city)}` : "",
    v.listingTitle ? `Listing: ${v.listingTitle}` : "",
  ].filter(Boolean);
  const message = [...extra, v.message].filter(Boolean).join("\n");

  try {
    await rpc("submit_enquiry", {
      p_client: await clientKey(),
      p: {
        kind: v.kind,
        listing_id: v.listingId || null,
        full_name: v.fullName || null,
        phone,
        email: v.email || null,
        country: v.country || null,
        amount_range: v.amountRange ? labelFor(amountRanges, v.amountRange) : null,
        message: message || null,
      },
    });
  } catch (err) {
    if (err instanceof SupabaseError && err.message.includes("rate_limited")) {
      return { ok: false, message: "We've had several messages from this connection in the last hour. Please message us on WhatsApp instead." };
    }
    console.error("[enquiry] submit_enquiry failed", err);
    return { ok: false, message: "We couldn't send this just now. Please try again shortly, or message us on WhatsApp." };
  }

  const { text, html } = tableEmail(
    subjects[v.kind],
    [
      ["Name", v.fullName],
      ["Phone", phone ?? ""],
      ["Email", v.email],
      ["Country", v.country],
      ["Amount range", v.amountRange ? labelFor(amountRanges, v.amountRange) : ""],
      ["Details", message],
    ],
    `All enquiries: <a href="${dashboardUrl()}">${dashboardUrl()}</a> (table: enquiries)`,
  );
  await sendEmail({
    to: recipients(v.kind === "investor" ? "INVESTOR_EMAIL_TO" : "LEADS_EMAIL_TO"),
    subject: `${subjects[v.kind]}${v.fullName ? ` from ${v.fullName}` : ""}`,
    text,
    html,
    replyTo: v.email || undefined,
  });

  return { ok: true };
}
