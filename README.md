# Legal Perspective

A standalone version of the Legal Perspective site, backed by Supabase instead
of the Claude artifact `window.storage` API. Same app, same features — just
runnable and deployable anywhere.

## 1. Create a Supabase project

1. Go to https://supabase.com, sign up, and create a new project (free tier is enough).
2. Wait for it to finish provisioning (~2 minutes).
3. In the left sidebar, go to **SQL Editor** → paste the contents of
   `supabase/schema.sql` → **Run**. This creates the `kv_store` table the app
   uses to store articles, news, and legislative updates.
4. Go to **Project Settings → API**. You'll need two values from this page:
   - **Project URL**
   - **anon public** key

## 2. Create your admin account

The Admin Portal uses real Supabase Auth (email + password) instead of the
old passkey. There's no public sign-up form on purpose — you create your own
account directly in Supabase:

1. In Supabase, go to **Authentication → Users → Add user**.
2. Enter your email and a password.
3. That's it — use those same credentials to sign in at `/` → **Admin Portal**
   on the live site.

You can add more admin users the same way later.

## 3. Configure the app locally

```bash
cp .env.example .env
```

Edit `.env` and paste in your Project URL and anon key:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

## 4. Run it locally

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

## 5. Deploy it

**Vercel (recommended, free tier is plenty):**

1. Push this folder to a new GitHub repository.
2. Go to https://vercel.com → **Add New Project** → import that repo.
3. Vercel auto-detects Vite. Before deploying, add your two environment
   variables (**Settings → Environment Variables**):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy. You'll get a `https://your-project.vercel.app` URL immediately.

**Netlify** works the same way: connect the repo, set the same two env vars,
build command `npm run build`, publish directory `dist`.

## 6. Point a custom domain at it

1. Buy a domain from any registrar (Namecheap, Cloudflare, Google Domains'
   successor, etc.) — e.g. `legalperspective.com`.
2. In Vercel/Netlify, go to **Domains** → add your domain.
3. It'll give you DNS records (usually a CNAME or A record) to add at your
   registrar. Add them there. Propagation is usually under an hour.

## What's included

- **Public pages:** Home, Article view, Write for Us, About, Contact, Terms of Service, Privacy Policy
- **Newsletter signup** — captures emails to the `subscribers` key in `kv_store`; no email-sending is wired up yet, so you'll need to export the list and send through a provider (Mailchimp, Resend, etc.) or connect one directly.
- **Sponsored Content** — admin-managed, clearly labeled paid placements shown on the homepage. Always disclosed as sponsored; never mixed into editorial content unlabeled.
- **Admin Dashboard tabs:** Submissions (approve/reject), News Wire, Legislative Updates, Sponsored Content, AI Drafts, Messages (from the Contact form)

### AI Drafts

The Admin Dashboard has an "AI Drafts" tab for generating candidate news/commentary posts. Five example
drafts ship pre-loaded — each was written with real, verified sources (linked in the draft) as a working
demonstration of the review flow. **Nothing publishes automatically.** Every draft requires you to tick
"I have verified every citation, statute reference, and factual claim" before the Publish button unlocks.

To generate *new* drafts going forward:
1. Get an API key from [console.anthropic.com](https://console.anthropic.com)
2. Add it to your Vercel project as an environment variable named `ANTHROPIC_API_KEY`
3. Use the "Generate a new draft" form in the AI Drafts tab

Important limitation: ongoing generation via `/api/generate-draft.js` does **not** use live web search — the
model can only draw on its training data, so treat every date, citation, and figure in a freshly generated
draft as unverified until you check it yourself. This is meaningfully less reliable than the 5 seed drafts,
which were checked against real sources at build time.

All of the above use the same `kv_store` table — no schema changes needed beyond the original `supabase/schema.sql`.

## What changed from the Claude artifact version

- `window.storage.get/set` → `src/supabaseClient.js` (`storageGet`/`storageSet`),
  backed by the `kv_store` table. Same shape, same behavior.
- The Admin Portal passkey → real Supabase Auth (email + password), with a
  proper sign-out button.
- Everything else — the hero carousel, category rows, Write for Us
  guidelines, file attachments on submissions, News Wire and Legislative
  Updates panels — is unchanged.

## Security note

The `kv_store` table currently allows anyone to read *and write* to it (see
the comment in `supabase/schema.sql`) — this mirrors the original artifact's
"shared storage" model, where any visitor's browser could write to the same
blob (e.g. to file a submission). That's fine for a demo or personal site,
but if this is going to take real public traffic, split `kv_store` into
proper `articles`, `news`, `legislative`, and `submissions` tables, and
restrict `update`/`delete` to authenticated admins only. I'm happy to help
with that hardening pass whenever you're ready for it.
