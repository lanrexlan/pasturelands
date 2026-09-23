import "server-only";

/*
 * Team notifications through Resend's HTTP API.
 *
 * RESEND_API_KEY   API key from resend.com
 * EMAIL_FROM       e.g. "Pasturelands <leads@yourdomain>" (domain verified in Resend).
 *                  Until a domain is verified, Resend's onboarding@resend.dev
 *                  sender only delivers to the Resend account owner.
 * LEADS_EMAIL_TO   comma-separated team addresses for seller leads
 * INVESTOR_EMAIL_TO  CEO address for investor enquiries (falls back to LEADS_EMAIL_TO)
 */

export type Email = {
  to: string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export function recipients(name: "LEADS_EMAIL_TO" | "INVESTOR_EMAIL_TO") {
  const raw = process.env[name] || process.env.LEADS_EMAIL_TO || "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Sends an email. Never throws: a failed email must not lose a lead. */
export async function sendEmail(email: Email): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key || email.to.length === 0) {
    console.warn("[email] RESEND_API_KEY or recipients not set; skipped:", email.subject);
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || "Pasturelands <onboarding@resend.dev>",
        to: email.to,
        subject: email.subject,
        text: email.text,
        html: email.html,
        reply_to: email.replyTo,
      }),
    });
    if (!res.ok) {
      console.error("[email] Resend error", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] send failed", err);
    return false;
  }
}

export function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/** A plain two-column table email. Rows with empty values are dropped. */
export function tableEmail(title: string, rows: [string, string][], footer = "") {
  const kept = rows.filter(([, v]) => v);
  const text = [title, "", ...kept.map(([k, v]) => `${k}: ${v}`), footer ? `\n${footer}` : ""].join("\n");
  const html = `<div style="font-family:Arial,sans-serif;color:#16302A;max-width:640px">
<h2 style="font-family:Georgia,serif;font-weight:400">${escapeHtml(title)}</h2>
<table cellpadding="8" style="border-collapse:collapse;width:100%">${kept
    .map(
      ([k, v]) =>
        `<tr style="border-top:1px solid #DDD3C1"><td style="color:#4F5249;width:38%;vertical-align:top">${escapeHtml(k)}</td><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("")}</table>${footer ? `<p style="margin-top:20px">${footer}</p>` : ""}</div>`;
  return { text, html };
}
