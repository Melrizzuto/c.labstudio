-- The CV on request (clabstudiomilano.com/cv/)
-- Run once in the Supabase SQL editor.
--
-- Someone asks for the CV (name, email, company): the request waits as 'pending'.
-- Mel approves it (from the email or from /owner/): the person gets a personal link that lasts 7 days.
-- Only the SHA-256 of that link's key is stored here, never the key itself.

create table if not exists public.cv_requests (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  name           text not null check (char_length(name) between 2 and 80),
  email          text not null check (char_length(email) between 3 and 200),
  company        text check (char_length(company) <= 120),
  note           text check (char_length(note) <= 500),
  locale         text not null default 'it' check (locale in ('it', 'en')),
  status         text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  decided_at     timestamptz,
  token_hash     text unique,
  expires_at     timestamptz,
  opened_count   integer not null default 0,
  last_opened_at timestamptz
);

create index if not exists cv_requests_created_idx on public.cv_requests (created_at desc);

-- Nobody can read or write the table from the browser: only the server, with the service-role key.
alter table public.cv_requests enable row level security;
