-- Guestbook, step 2: the sticker a visitor can attach to a note.
-- Run once in the Supabase SQL editor (after guestbook.sql).

alter table public.guestbook
  add column if not exists sticker text
  check (sticker in ('daisy', 'heart', 'star', 'bolt', 'cali', 'fire', 'wow', 'sun'));
