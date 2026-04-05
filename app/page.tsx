import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEMO_PRODUCT_ID } from "@/lib/constants";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <span className="text-sm font-semibold tracking-[0.25em]">VANTOX</span>
          <span className="text-xs text-zinc-500">vantox.store</span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-500/90">
          E-commerce middleware
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Curated gear for people who live in the driver&apos;s seat.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-zinc-400">
          Vantox is a focused storefront: one hero product, fast checkout, orders synced to your
          database — ready to scale to more SKUs.
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href={`/product/${DEMO_PRODUCT_ID}`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-4 text-sm font-semibold text-zinc-950 shadow-lg shadow-amber-500/20 transition hover:from-amber-400 hover:to-orange-500"
          >
            Shop the LED key holder
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </main>

      <footer className="border-t border-zinc-800/80 py-8 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} Vantox
      </footer>
    </div>
  );
}
