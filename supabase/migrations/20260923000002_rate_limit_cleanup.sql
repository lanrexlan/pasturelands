-- Rate-limit rows hold a hashed IP address. Drop anything older than a day
-- whenever a new hit is recorded, so they are never kept for long.
create or replace function public.hit_rate_limit(p_key text, p_max int, p_window interval)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_hits int;
begin
  delete from public.rate_limits where window_start < now() - interval '1 day';

  insert into public.rate_limits as r (key, window_start, hits)
  values (p_key, now(), 1)
  on conflict (key) do update
    set hits = case when r.window_start < now() - p_window then 1 else r.hits + 1 end,
        window_start = case when r.window_start < now() - p_window then now() else r.window_start end
  returning hits into current_hits;
  return current_hits <= p_max;
end;
$$;

revoke all on function public.hit_rate_limit(text, int, interval) from public, anon, authenticated;
