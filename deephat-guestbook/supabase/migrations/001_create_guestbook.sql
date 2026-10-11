-- Private contact guestbook: do not expose email/phone/social handles to anonymous readers.
create table if not exists public.guestbook (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null unique,
  phone text,
  facebook text,
  instagram text,
  notes text,
  created_at timestamptz default now() not null
);
alter table public.guestbook enable row level security;
-- No public SELECT policy: personal information stays private.
-- No public INSERT policy until abuse protection and consent are configured.
create index if not exists idx_guestbook_email on public.guestbook(email);
