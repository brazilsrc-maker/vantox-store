# Vantox.store

Next.js storefront for **vantox.store** with Supabase (`products`, `orders`).

## Supabase

1. Open **SQL Editor** in your Supabase project.
2. Paste and run `supabase/schema.sql` (tables, RLS, demo product).

## Local development

```bash
cp .env.example .env.local
# Edit .env.local with your project URL and anon key (Settings → API).
npm install
npm run dev
```

Demo product URL: `/product/a0000000-0000-4000-8000-000000000001` (see `lib/constants.ts`).

Optional: set `video_url` on the product row to a **public** MP4 URL or Supabase Storage public URL for the hero video.

## Deploy on Vercel

**Use the same Vercel team where you bought `vantox.store`.** If you deploy from a different login (e.g. local CLI), the domain will not attach until the project lives under that team. Recommended: connect **GitHub** → **Import** → enable auto-deploys.

1. Push this folder to a GitHub repository (e.g. under `brazilsrc-maker`).
2. In Vercel: **Add New Project** → import the repo → Framework Preset: Next.js.
3. **Environment Variables** (at least **Production**; add **Preview** when you use branches):

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Deploy, then **Settings → Domains** → add `vantox.store`.

Redeploy after changing env vars.

### CLI deploy (optional)

If you use `vercel deploy --prod`, pass `--scope <your-team-slug>` so the project appears under the intended team dashboard.

## Scripts

| Command        | Description        |
| -------------- | ------------------ |
| `npm run dev`  | Development server |
| `npm run build`| Production build   |
| `npm run lint` | ESLint             |
