-- Public guestbook demo. Enable anti-spam controls before publishing widely.
create table if not exists public.guestbook_entries (
 id bigint generated always as identity primary key,
 display_name text not null check (char_length(display_name) between 1 and 50),
 message text not null check (char_length(message) between 1 and 500),
 created_at timestamptz not null default now()
);
alter table public.guestbook_entries enable row level security;
create policy "Public can read guestbook" on public.guestbook_entries for select to anon using (true);
-- Posting is disabled by default until rate limiting, moderation and CAPTCHA are configured.
