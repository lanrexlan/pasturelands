# Pasturelands Limited: website build brief

Handover for Claude Code. Read this whole file before writing any code. It tells you what the business is, what the site must do, how it should look, and what it must not do.

---

## 1. The business in one paragraph

Pasturelands Limited (RC 9878583, incorporated in Nigeria in September 2026) buys residential homes **directly** from owners who need to sell quickly: people relocating abroad, families selling inherited homes, diaspora owners, owners under financial pressure, and developers clearing units. It verifies each title, pays within weeks, renovates the home, then resells it **with no agency fee** or rents it out. It launches in Abuja, then Lagos.

- Founder & CEO: Osundoja Osundare
- Co-Founder & COO: Olanrewaju Akande

## 2. What the website must do

The site has two audiences. It does two jobs:

1. **Seller pipeline (the main job).** An owner lands on the site, understands the offer, and submits their property for a cash offer in under three minutes, or taps through to WhatsApp.
2. **Buyer trust and listings.** A buyer, often in the diaspora, sees verified, renovated homes for sale or rent and understands why buying from Pasturelands is safer and cheaper: no agency fee, and every title checked.

A third, minor job: give investors a way to make contact. **No investment figures appear on the public site** (see §8).

## 3. Tech stack

- **Next.js** (latest stable, App Router, TypeScript, React Server Components by default).
- **Styling:** Tailwind CSS with the design tokens in §5 set in the Tailwind config / CSS variables. No component kit's default look: do not install shadcn/ui and ship it unstyled, and do not use Material or Chakra defaults.
- **Fonts:** `next/font/google`: **DM Serif Display** (headings) and **DM Sans** (body). Self-hosted through next/font, no layout shift.
- **Data:** **Supabase** (Postgres + Storage) for seller submissions, photo uploads and listings. Use Row Level Security: the public can **insert** a lead and **read published** listings, nothing else.
- **Forms:** Server Actions + Zod validation. Spam protection with a honeypot field plus rate limiting (e.g. Upstash or a simple Supabase-backed limiter). No reCAPTCHA wall.
- **Notifications:** on each new seller lead, email the team (Resend or similar) with the lead summary and a link.
- **Deploy:** Vercel. Environment variables for all keys; nothing secret in client code.
- **Images:** `next/image`, AVIF/WebP, explicit sizes. The site must load fast on a mid-range Android phone on a Nigerian 4G connection. Target Lighthouse ≥ 90 on mobile for Performance, Accessibility, Best Practices and SEO.

## 4. Pages and content

Mobile first. Most visitors will be on phones and will arrive from WhatsApp or social links.

### 4.1 Home `/`
1. **Hero:** headline and a single primary action.
   - Headline (draft): *"Sell your house in weeks, not months."*
   - Sub: *"Pasturelands buys homes directly from owners in Abuja and Lagos. We check the title, make a cash offer and pay within weeks. No agents, no fees to you."*
   - Primary button: **Get a cash offer** → `/sell`. Secondary text link: *Chat on WhatsApp*.
   - Visual: the flat, geometric house illustration style described in §5, **not** a stock photo of smiling people.
2. **How it works:** 4 steps, shown as a horizontal sequence on desktop and a vertical timeline on mobile: *Tell us about your home → We verify the title → You get a cash offer → You get paid.*
3. **Who we help:** the five seller types from §1, as short, specific lines, not icon-card filler.
4. **For buyers:** one band explaining *"Verified homes, no agency fee"*, with the fee comparison: on a ₦100m home a buyer normally pays about ₦120m all-in (₦10m agency + ₦10m legal); from Pasturelands about ₦105–110m. Link to `/homes`.
5. **Our verification promise:** the title checklist in plain words (registry search, survey check, all owners sign, no charges or court cases, lawyer sign-off before payment).
6. **FAQ:** 6–8 real questions (How fast do you pay? Do I pay any fees? What documents do I need? What if my title isn't perfected? Which cities? Can I sell from abroad?).
7. **Footer:** RC number, office address [placeholder], phone, WhatsApp, email, privacy notice link.

### 4.2 Sell `/sell`: the seller form (most important page)
Multi-step form, one topic per step, with progress shown. Save progress in the browser so a dropped connection doesn't lose it.

| Step | Fields |
| --- | --- |
| 1. Property | State (Abuja FCT, Lagos, Other), area/neighbourhood, property type (flat, terrace, semi-detached, detached, bungalow, duplex, land with building), bedrooms, approximate year built |
| 2. Condition | Overall condition (move-in ready / needs light work / needs major work), is it occupied (owner / tenant / empty) |
| 3. Title | Documents held (C of O, Governor's Consent, Deed of Assignment, Registered Survey, Excision/Gazette, Other, Not sure). Multi-select, with "Not sure" allowed |
| 4. Price & timing | Asking price (₦, formatted with commas), how soon they need to sell (within 1 month / 1–3 months / 3+ months), reason for selling (optional, list of the seller types + Other) |
| 5. Photos | Up to 10 photos, compressed on the client before upload, stored in Supabase Storage. Optional |
| 6. Contact | Full name, phone (Nigerian and international formats), WhatsApp same as phone?, email (optional), country of residence, preferred contact method, consent checkbox for the privacy notice |

On submit: store the lead, email the team, show a confirmation screen that says **exactly what happens next and when** ("We'll contact you on WhatsApp within 2 working days"), and offer a WhatsApp button pre-filled with the lead reference.

### 4.3 Homes `/homes` and `/homes/[slug]`
- Listing grid of published homes: photo, area, type, beds, price, status (For sale / For rent / Under offer / Sold), and a **"Title verified"** badge only when that field is true in the database.
- Detail page: gallery, facts, what was renovated, title status, all-in cost compared with the usual agency route, enquiry form and WhatsApp button.
- **Empty state is expected at launch.** Design it properly: *"Our first renovated homes are on the way. Leave your details to hear first."* with an email/WhatsApp sign-up. **Never** seed fake listings.

### 4.4 About `/about`
The team (Osundoja Osundare, Founder & CEO; Olanrewaju Akande, Co-Founder & COO), with placeholders for photos and bios, why the company exists, and company registration details.

### 4.5 Investors `/investors`
A short page: *"Pasturelands raises capital privately from a limited number of investors. To request information, contact us."* Contact form (name, email, phone, country, rough amount range, message) → emails the CEO. **No returns, percentages, deal figures or projections on this page** (see §8).

### 4.6 Legal
`/privacy`: a privacy notice written for the Nigeria Data Protection Act 2023: what is collected, why, how long it is kept, and how to request deletion. Mark it `[TO BE REVIEWED BY COUNSEL]`.

## 5. Design direction

The brand already exists in the investor deck. Match it.

**Palette** (as CSS variables):

| Token | Hex | Use |
| --- | --- | --- |
| `--green-900` | `#16302A` | Primary dark: headings, dark bands, footer |
| `--green-700` | `#2F5D4E` | Secondary dark: cards on dark, hover |
| `--sand` | `#F3EDE2` | Main page background |
| `--paper` | `#FAF7F1` | Cards, raised surfaces |
| `--terracotta` | `#A7481F` | Accent: primary buttons, eyebrows, key numbers |
| `--terracotta-dark` | `#8E3E1B` | Button hover |
| `--gold` | `#E3B04B` | Sparing highlight on dark backgrounds only (never text on sand) |
| `--ink` | `#4F5249` | Body text on light |
| `--mist` | `#C7D3CB` | Body text on dark |
| `--line` | `#DDD3C1` | Borders, dividers |

Check every text/background pair for WCAG AA contrast.

**Type:** DM Serif Display for headings (large, generous: hero 64–96px desktop / 44–52px mobile), DM Sans for everything else (17–18px body, 1.6 line-height). Eyebrow labels: DM Sans, bold, uppercase, letter-spaced, terracotta.

**Illustration:** flat, geometric, architectural: modern Nigerian two-storey homes with flat roof slabs, window grids, a palm tree, a low sun disc. Solid fills from the palette, no gradients, no outlines. Draw these as inline SVG components. The deck cover is the reference: a terracotta panel, gold sun, sand and paper house blocks, deep-green roof slabs and windows.

**Layout character:** editorial, warm, confident, closer to a good property magazine or an architecture studio than a SaaS landing page. Asymmetric splits (text block + illustration panel), full-bleed colour bands that alternate sand / deep green / one terracotta band, strong horizontal rules, generous whitespace. Numbers set large in the serif.

### Do NOT build a generic AI website. Specifically:
- No purple/blue/indigo gradients, no gradient text, no glowing blobs or mesh backgrounds.
- No glassmorphism, no floating 3D shapes, no particle effects.
- No row of three identical rounded cards with an emoji or generic icon on top as the main content pattern.
- No "Trusted by thousands" logo strips, invented stats counters ("500+ homes sold"), or made-up testimonials. The company is new: **every claim must be true.**
- No stock photos of people in suits shaking hands or pointing at laptops.
- No centred-everything layout with a pill badge above the H1.
- No Inter, Roboto or default system-font look.
- No scroll-jacking or heavy parallax. Motion is subtle: fades and short slides of ≤ 250ms, respecting `prefers-reduced-motion`.
- No lorem ipsum in anything you hand back. Use the copy here or clearly bracketed placeholders like `[Office address]`.
- No filler copy ("Unlock your property's potential", "Seamless experience", "Revolutionizing real estate"). Write plainly, the way a Nigerian professional would speak to a homeowner.

## 6. Data model (Supabase)

```sql
-- seller leads
create table leads (
  id uuid primary key default gen_random_uuid(),
  ref text unique not null,            -- e.g. PL-2026-0001, shown to the seller
  created_at timestamptz default now(),
  state text not null, area text not null, property_type text not null,
  bedrooms int, year_built int,
  condition text, occupancy text,
  title_documents text[] not null default '{}',
  asking_price_ngn bigint, timeline text, reason text,
  photo_paths text[] default '{}',
  full_name text not null, phone text not null, whatsapp text,
  email text, country text, contact_pref text,
  consent boolean not null,
  status text not null default 'new'   -- new, contacted, screening, inspecting, verifying, offer_made, bought, rejected
);

-- homes for sale / rent
create table listings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  published boolean not null default false,
  status text not null,                -- for_sale, for_rent, under_offer, sold, let
  title text not null, state text, area text, property_type text,
  bedrooms int, bathrooms int,
  price_ngn bigint, rent_ngn_per_year bigint,
  title_verified boolean not null default false,
  title_document text,
  renovation_summary text,
  description text,
  photos text[] default '{}',
  created_at timestamptz default now()
);

-- buyer & investor enquiries
create table enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  kind text not null,                  -- buyer, investor, waitlist
  listing_id uuid references listings(id),
  full_name text, phone text, email text, country text,
  amount_range text, message text
);
```

RLS: anon may `insert` into `leads` and `enquiries`; anon may `select` from `listings where published = true`; all other access requires the service role. Seller photos go in a **private** bucket; listing photos in a public bucket.

Out of scope for this first build, but leave room for it: a password-protected `/admin` for the team to view leads and publish listings. For v1, the team can use the Supabase dashboard.

## 7. Details that matter in Nigeria

- **Currency:** always `₦` with thousands separators (`₦120,000,000`); allow "₦120m" shorthand in display copy.
- **Phone input:** accept `080…`, `+234…` and international numbers. Normalise to E.164 on save.
- **WhatsApp:** a persistent but unobtrusive WhatsApp button (bottom-right on mobile, not a bouncing bubble). Use `https://wa.me/<number>?text=<prefilled>`. Number: `[WHATSAPP NUMBER]`.
- **Low bandwidth:** keep JS light; avoid heavy animation libraries; lazy-load below-the-fold images; the form must work on slow connections.
- **Diaspora:** the time-zone-neutral wording "We'll reply within 2 working days (West Africa Time)"; country field on forms.

## 8. Compliance guardrails (important)

- **No public investment offer.** Do not show investor returns, percentages, tranche sizes, "invest now" buttons or any projection anywhere on the site. Pooled investment from the public needs SEC approval in Nigeria; the company raises privately. The investors page is contact-only.
- **No agent claims.** Do not say the company is LASRERA-registered or offer brokerage services in Lagos until the founders confirm registration.
- **"Title verified"** appears only on listings where `title_verified = true`.
- **No invented social proof:** no testimonials, reviews, sales counts or partner logos until they are real.

## 9. Acceptance checklist

- [ ] A seller can complete `/sell` on a phone in under 3 minutes; the lead lands in Supabase and the team receives an email.
- [ ] Form validation messages are specific and friendly; nothing is lost on a validation error or a dropped connection.
- [ ] `/homes` shows a designed empty state with zero listings, and correct cards when listings exist.
- [ ] All pages pass WCAG 2.1 AA (contrast, keyboard navigation, labels, focus states visible).
- [ ] Lighthouse mobile ≥ 90 across the board.
- [ ] Open Graph images and metadata on every page (the house illustration on a terracotta panel works well).
- [ ] No placeholder text left except bracketed items the founders must supply (listed in the README).
- [ ] No item in §5's "Do NOT" list or §8's guardrails appears anywhere.
- [ ] README explains setup, env vars, Supabase migration and deploy.

## 10. Placeholders the founders will supply

`[WHATSAPP NUMBER]` · `[Phone]` · `[Email]` · `[Office address]` · `[Domain]` · founder photos and bios · the first listing photos · counsel's review of the privacy notice.

## 11. Working style

Build in this order: tokens and layout shell → home → `/sell` with Supabase end-to-end → `/homes` (empty state first) → about, investors, privacy → polish and performance. Commit in small steps. Show a preview (Vercel preview URL) after the home page and again after `/sell`, before continuing.
