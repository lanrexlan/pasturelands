-- Pasturelands: leads, listings, enquiries, rate limiting and storage.
--
-- Public (anon) access, enforced by RLS:
--   * insert into leads and enquiries
--   * select listings where published = true
--   * upload (insert only) into the private seller-photos bucket, under uploads/
-- Everything else needs the service role (Supabase dashboard, future /admin).

-- ---------------------------------------------------------------- tables

create sequence public.lead_ref_seq;

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  ref text unique not null
    default 'PL-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('public.lead_ref_seq')::text, 4, '0'),
  created_at timestamptz not null default now(),
  state text not null,
  area text not null,
  property_type text not null,
  bedrooms int check (bedrooms between 0 and 30),
  year_built int check (year_built between 1900 and 2100),
  condition text check (condition in ('move_in_ready', 'light_work', 'major_work')),
  occupancy text check (occupancy in ('owner', 'tenant', 'empty')),
  title_documents text[] not null default '{}',
  asking_price_ngn bigint check (asking_price_ngn >= 0),
  timeline text check (timeline in ('within_1_month', '1_3_months', '3_plus_months')),
  reason text,
  photo_paths text[] not null default '{}',
  full_name text not null,
  phone text not null,
  whatsapp text,
  email text,
  country text,
  contact_pref text check (contact_pref in ('whatsapp', 'phone', 'email')),
  consent boolean not null check (consent),
  status text not null default 'new' check (status in (
    'new', 'contacted', 'screening', 'inspecting', 'verifying', 'offer_made', 'bought', 'rejected'
  ))
);

create table public.listings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  published boolean not null default false,
  status text not null check (status in ('for_sale', 'for_rent', 'under_offer', 'sold', 'let')),
  title text not null,
  state text,
  area text,
  property_type text,
  bedrooms int,
  bathrooms int,
  price_ngn bigint,
  rent_ngn_per_year bigint,
  title_verified boolean not null default false,
  title_document text,
  renovation_summary text,
  description text,
  photos text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  kind text not null check (kind in ('buyer', 'investor', 'waitlist')),
  listing_id uuid references public.listings (id) on delete set null,
  full_name text,
  phone text,
  email text,
  country text,
  amount_range text,
  message text
);

create index enquiries_listing_id_idx on public.enquiries (listing_id);
create index leads_created_at_idx on public.leads (created_at desc);
create index listings_published_idx on public.listings (published, created_at desc);

-- Fixed-window counters used by the submit_* functions. No public access.
create table public.rate_limits (
  key text primary key,
  window_start timestamptz not null,
  hits int not null
);

-- ---------------------------------------------------------------- RLS

alter table public.leads enable row level security;
alter table public.listings enable row level security;
alter table public.enquiries enable row level security;
alter table public.rate_limits enable row level security;

create policy "Public can submit leads"
  on public.leads for insert to anon
  with check (status = 'new');

create policy "Public can submit enquiries"
  on public.enquiries for insert to anon
  with check (true);

create policy "Public can read published listings"
  on public.listings for select to anon, authenticated
  using (published);

-- ---------------------------------------------------------------- functions

-- Returns false once `key` has been hit more than `max_hits` times in the
-- current window. Called only from the security-definer functions below.
create function public.hit_rate_limit(p_key text, p_max int, p_window interval)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_hits int;
begin
  insert into public.rate_limits as r (key, window_start, hits)
  values (p_key, now(), 1)
  on conflict (key) do update
    set hits = case when r.window_start < now() - p_window then 1 else r.hits + 1 end,
        window_start = case when r.window_start < now() - p_window then now() else r.window_start end
  returning hits into current_hits;
  return current_hits <= p_max;
end;
$$;

-- Inserts a seller lead and returns its reference (e.g. PL-2026-0001).
-- anon cannot read leads, so a plain insert ... returning would fail; this
-- function returns only the reference.
create function public.submit_lead(p jsonb, p_client text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_ref text;
begin
  if not public.hit_rate_limit('lead:' || coalesce(p_client, 'unknown'), 5, interval '1 hour') then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;

  insert into public.leads (
    state, area, property_type, bedrooms, year_built, condition, occupancy,
    title_documents, asking_price_ngn, timeline, reason, photo_paths,
    full_name, phone, whatsapp, email, country, contact_pref, consent
  ) values (
    p->>'state', p->>'area', p->>'property_type',
    (p->>'bedrooms')::int, (p->>'year_built')::int,
    p->>'condition', p->>'occupancy',
    coalesce(array(select jsonb_array_elements_text(p->'title_documents')), '{}'),
    (p->>'asking_price_ngn')::bigint, p->>'timeline', p->>'reason',
    coalesce(array(select jsonb_array_elements_text(p->'photo_paths')), '{}'),
    p->>'full_name', p->>'phone', p->>'whatsapp', p->>'email',
    p->>'country', p->>'contact_pref', coalesce((p->>'consent')::boolean, false)
  )
  returning ref into new_ref;

  return new_ref;
end;
$$;

create function public.submit_enquiry(p jsonb, p_client text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.hit_rate_limit('enquiry:' || coalesce(p_client, 'unknown'), 8, interval '1 hour') then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;

  insert into public.enquiries (kind, listing_id, full_name, phone, email, country, amount_range, message)
  values (
    p->>'kind', nullif(p->>'listing_id', '')::uuid, p->>'full_name', p->>'phone',
    p->>'email', p->>'country', p->>'amount_range', p->>'message'
  );
end;
$$;

revoke all on function public.hit_rate_limit(text, int, interval) from public, anon, authenticated;
revoke all on function public.submit_lead(jsonb, text) from public;
revoke all on function public.submit_enquiry(jsonb, text) from public;
grant execute on function public.submit_lead(jsonb, text) to anon, authenticated;
grant execute on function public.submit_enquiry(jsonb, text) to anon, authenticated;

-- ---------------------------------------------------------------- storage

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('seller-photos', 'seller-photos', false, 5242880, array['image/jpeg', 'image/webp', 'image/png']),
  ('listing-photos', 'listing-photos', true, 10485760, array['image/jpeg', 'image/webp', 'image/png', 'image/avif']);

-- Sellers may upload (not read, list, overwrite or delete) into uploads/.
create policy "Public can upload seller photos"
  on storage.objects for insert to anon
  with check (
    bucket_id = 'seller-photos'
    and (storage.foldername(name))[1] = 'uploads'
  );
