-- Run this once in the Supabase SQL Editor (or via `supabase db push`)
-- for a new project, before deploying the site.

create table if not exists public.kv_store (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.kv_store enable row level security;

-- Anyone (including anonymous visitors) can read the site's data — needed
-- so the homepage, article pages, and Write for Us guidelines load without
-- requiring a login.
create policy "public can read kv_store"
  on public.kv_store for select
  using (true);

-- Anyone can write to kv_store. This matches the original artifact's
-- "shared=true" storage model: submissions from any visitor need to be
-- able to append to the same blob, and the Admin Portal's own writes
-- (approve/reject/post news) go through the same path.
--
-- IMPORTANT: this means a malicious visitor could, in principle, overwrite
-- the entire dataset directly via the Supabase API (not just through the
-- UI). For anything beyond a demo/personal project, replace this single
-- shared-blob table with separate `articles`, `news`, and `legislative`
-- tables, restrict insert/update to authenticated admins via RLS, and only
-- allow public `insert` (not `update`) on a dedicated `submissions` table.
create policy "public can write kv_store"
  on public.kv_store for insert
  with check (true);

create policy "public can update kv_store"
  on public.kv_store for update
  using (true)
  with check (true);
