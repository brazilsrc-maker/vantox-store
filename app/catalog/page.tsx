import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fetchAllCatalogProducts } from "@/lib/supabase/catalog-products";

export const dynamic = "force-dynamic";

const PLACEHOLDER_IMAGE = "/og-placeholder.svg";

export default async function CatalogPage() {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center text-zinc-400">
        <p className="max-w-md text-sm">Configure Supabase environment variables to load the catalog.</p>
      </div>
    );
  }

  const { data: products, error } = await fetchAllCatalogProducts(supabase);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-sm text-red-300">
        {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-20 border-b border-zinc-800/90 bg-zinc-950/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-sm font-semibold tracking-[0.28em] text-zinc-100">
            VANTOX
          </Link>
          <span className="rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-zinc-500">
            Catalog
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.5rem]">
            Shop
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Every product in your Supabase <code className="text-zinc-500">products</code> table
            (loaded in full, paginated on the server). Prices in{" "}
            <span className="text-zinc-300">euros (€)</span> — AliExpress imports include margin and
            German VAT.
          </p>
          <p className="mt-2 text-xs font-medium text-zinc-500">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </div>

        {products.length === 0 ? (
          <p className="mt-16 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 px-6 py-12 text-center text-sm text-zinc-500">
            No products yet. Seed the database or run an AliExpress import.
          </p>
        ) : (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <li key={p.id} className="group flex flex-col">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800/90 bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 shadow-lg shadow-black/20 ring-1 ring-white/[0.03] transition duration-300 hover:border-zinc-700 hover:ring-amber-500/10">
                  <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                    {/* eslint-disable-next-line @next/next/no-img-element -- local placeholder + remote CDN */}
                    <img
                      src={p.image_url?.trim() ? p.image_url.trim() : PLACEHOLDER_IMAGE}
                      alt={p.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-80" />
                    {p.external_source === "aliexpress" ? (
                      <span className="absolute left-3 top-3 rounded-lg bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-200/95 backdrop-blur-md">
                        AliExpress
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="line-clamp-2 text-base font-semibold leading-snug text-white">
                      {p.name}
                    </h2>
                    {p.description ? (
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-500">
                        {p.description}
                      </p>
                    ) : null}

                    <div className="mt-5 flex flex-1 flex-col justify-end gap-4 border-t border-zinc-800/80 pt-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                          Price
                        </span>
                        <span className="text-xl font-bold tabular-nums tracking-tight text-amber-400">
                          €{Number(p.sale_price).toFixed(2)}
                        </span>
                      </div>
                      <Link
                        href={`/product/${p.id}`}
                        className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-3.5 text-sm font-semibold text-zinc-950 shadow-md shadow-amber-900/20 transition hover:from-amber-400 hover:to-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                      >
                        Buy now
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
