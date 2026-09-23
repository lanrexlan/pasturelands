import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";

/**
 * A hashed identifier for the caller, used only as a rate-limit key.
 * The raw IP address is never stored.
 */
export async function clientKey() {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  return createHash("sha256")
    .update(`${process.env.RATE_LIMIT_SALT ?? "pasturelands"}:${ip}`)
    .digest("hex")
    .slice(0, 32);
}

/** Honeypot filled, or the form was completed faster than a person could. */
export function looksLikeBot(honeypot: unknown, startedAt: unknown, minMs = 3000) {
  if (typeof honeypot === "string" && honeypot.trim() !== "") return true;
  return typeof startedAt === "number" && Date.now() - startedAt < minMs;
}
