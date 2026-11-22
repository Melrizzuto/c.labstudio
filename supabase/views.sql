-- Visit counter for clabstudio.vercel.app
-- Run once in the Supabase SQL editor.

create table if not exists public.site_counters (
  id    text primary key,
  count bigint not null default 0
);

insert into public.site_counters (id, count) values ('views', 0)
on conflict (id) do nothing;

-- Nobody can read or write the table from the browser: only the server, with the service-role key.
alter table public.site_counters enable row level security;

create or replace function public.increment_views()
returns bigint
language sql
security definer
set search_path = public
as $$
  update public.site_counters set count = count + 1 where id = 'views' returning count;
$$;

revoke execute on function public.increment_views() from public, anon, authenticated;
