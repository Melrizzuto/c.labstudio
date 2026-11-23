-- The guestbook on the desk notebook (clabstudio.vercel.app)
-- Run once in the Supabase SQL editor.
--
-- New notes arrive with approved = false and stay hidden.
-- To publish one: Table editor → guestbook → tick "approved" on that row.

create table if not exists public.guestbook (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name       text check (char_length(name) <= 40),
  message    text not null check (char_length(message) between 2 and 500),
  mood       text not null check (mood in ('like', 'dislike')),
  locale     text not null default 'it' check (locale in ('it', 'en')),
  approved   boolean not null default false
);

create index if not exists guestbook_approved_idx on public.guestbook (approved, created_at desc);

-- Nobody can read or write the table from the browser: only the server, with the service-role key.
alter table public.guestbook enable row level security;
