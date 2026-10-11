# DeepHat Guestbook

Standalone, safe public-message demo in the Money- repository. No credential collection.

## Setup
1. Create a Supabase project and run `supabase/migrations/001_create_guestbook.sql`.
2. Set your public Supabase URL and anon/publishable key in `public/index.html` (never use the service role key in browser code).
3. Serve `public/` locally or deploy it as a static site.
4. Public posting is intentionally disabled in the SQL policy until moderation, CAPTCHA, and rate limiting are configured. Reading works once connected.

Do not enter passwords or private information.
