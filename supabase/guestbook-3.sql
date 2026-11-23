-- Guestbook, step 3: the notes become post-its on a board (like FigJam).
-- Run once in the Supabase SQL editor (after guestbook.sql and guestbook-2.sql).
-- color = the post-it colour, x / y = where its writer stuck it on the board (board units, 0..2400 x 0..1500), rot = its tilt.

alter table public.guestbook
  add column if not exists color text check (color in ('yellow', 'pink', 'blue', 'green', 'orange', 'purple')),
  add column if not exists x real check (x between 0 and 2400),
  add column if not exists y real check (y between 0 and 1500),
  add column if not exists rot real check (rot between -6 and 6);
