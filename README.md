# Pasturelands website

Next.js 16 (App Router, TypeScript, Server Components) + Tailwind CSS v4 + Supabase + Resend.
The brief is in `PASTURELANDS_WEBSITE_HANDOVER.md`.

## Status

| Page | State |
| --- | --- |
| `/` Home | Built (isometric illustrations, scroll reveals) |
| `/sell` Seller form | Built, end to end: Supabase + Resend email |
| `/homes`, `/about`, `/investors`, `/privacy` | Not built yet (links currently show the 404 page) |

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev                  # http://localhost:3000
npm run lint && npm run build
```

## Environment variables

See `.env.example` for the full list with notes. The minimum for `/sell` to work:

| Variable | Where it comes from |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase > Project settings > API. The Vercel Supabase integration sets these automatically. `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is also accepted. |
| `RESEND_API_KEY` | resend.com > API keys |
| `EMAIL_FROM` | An address on a domain verified in Resend |
| `LEADS_EMAIL_TO` | Team inbox(es), comma-separated |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Company WhatsApp number, digits only (`2348012345678`) |

If Resend isn't configured, leads are still saved; the email is skipped and a warning is logged.

## Supabase

The schema lives in `supabase/migrations/`. It has already been applied to the `pasturelands`
project. To set up a fresh project, run the migration in the SQL editor or with
`supabase db push`.

What it creates:

- `leads`, `listings`, `enquiries` (as in the brief), plus `rate_limits`.
- Lead references `PL-2026-0001`, … from a sequence.
- RLS: the public may insert into `leads`/`enquiries` and read `listings` where `published = true`.
  Nothing else without the service role. `rate_limits` has no policies on purpose (no public access).
- `submit_lead(p, p_client)` and `submit_enquiry(p, p_client)`: security-definer functions the
  site calls. They rate-limit (5 leads / 8 enquiries per hour per hashed IP) and return only the
  lead reference. The Supabase security advisor flags them as "public can execute": that's intended.
- Storage: private `seller-photos` bucket (public may upload into `uploads/` only; no reading or
  listing), public `listing-photos` bucket.

Viewing leads: Supabase dashboard > Table editor > `leads`. Seller photos are under
Storage > `seller-photos` > `uploads/<draft id>/`.

## How `/sell` works

- Six steps, one topic each. Answers autosave to `localStorage` on every change, so a reload or dropped
  connection loses nothing. The draft is cleared after a successful send.
- Validation: one Zod schema (`src/lib/lead.ts`) runs in the browser per step and again in the
  Server Action (`src/app/sell/actions.ts`).
- Phones: accepts `0803…`, `234…`, `+234…`, and `+`/`00` international numbers. Stored as E.164.
- Photos: shrunk in the browser (max 1600px JPEG) and uploaded directly to the private bucket.
- Spam: hidden honeypot field, a minimum fill time, and the database rate limit. No CAPTCHA.
- On success: the lead is stored, the team gets an email, and the seller sees their reference, what
  happens next and when, plus a WhatsApp button pre-filled with the reference.

## Deploy (Vercel)

1. Import the GitHub repo into Vercel (framework preset: Next.js).
2. Add the environment variables above for Production and Preview.
3. Deploy. Every push to a branch gets a preview URL.

## Design notes

- Colours: the deck palette only (Tailwind's default palette is switched off in `globals.css`).
  Text/background pairs are checked for WCAG AA.
- Illustrations are inline SVG built with a small isometric kit (`src/components/illustrations/iso.tsx`),
  so there are no image downloads and no 3D library.
- Motion is CSS only, plus one IntersectionObserver for scroll reveals. Content is only hidden
  for reveals when JS is running, and everything settles instantly under `prefers-reduced-motion`.

## Placeholders the founders must supply

`[WHATSAPP NUMBER]` (env) · `[Phone]` · `[Email]` · `[Office address]` · `[Domain]` ·
founder photos and bios · first listing photos · counsel's review of the privacy notice.
Also confirm the FAQ answers and step wording in `src/components/home/` describe how you actually work.
