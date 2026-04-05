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

1. Push this folder to a GitHub repository (e.g. `brazilsrc-maker/vantox-store`).
2. In Vercel: **Add New Project** → import the repo → Framework Preset: Next.js.
3. **Environment Variables** (Production + Preview):

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Deploy, then **Settings → Domains** → add `vantox.store` (already purchased on Vercel).

Redeploy after changing env vars.

## Scripts

| Command        | Description        |
| -------------- | ------------------ |
| `npm run dev`  | Development server |
| `npm run build`| Production build   |
| `npm run lint` | ESLint             |
