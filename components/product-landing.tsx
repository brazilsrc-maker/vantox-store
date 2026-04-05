import Link from "next/link";
import { Car, Lightbulb, Radio, Sparkles } from "lucide-react";
import { OrderForm } from "@/components/order-form";
import type { Product } from "@/lib/types";

function FeatureCard({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Lightbulb;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
    </div>
  );
}

export function ProductLanding({
  product,
  checkout,
}: {
  product: Product;
  checkout?: "success" | "canceled" | null;
}) {
  const videoSrc = product.video_url?.trim() || null;
  const imageSrc = product.image_url?.trim() || null;
  const heroImageSrc = imageSrc || "/og-placeholder.svg";

  return (
    <div className="pb-24">
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-sm font-semibold tracking-[0.2em] text-zinc-100">
            VANTOX
          </Link>
          <a
            href="#order"
            className="rounded-full bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-950 transition hover:bg-white"
          >
            Buy now
          </a>
        </div>
      </header>

      <section className="relative isolate min-h-[56vh] w-full overflow-hidden bg-black sm:min-h-[62vh]">
        {videoSrc ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/og-placeholder.svg"
            aria-label="Product demonstration video"
          >
            <source src={videoSrc} />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- placeholder or supplier CDN
          <img
            src={heroImageSrc}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
        <div className="relative mx-auto flex min-h-[56vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:min-h-[62vh] sm:px-6 sm:pb-20">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-400/90">
              {product.external_source === "aliexpress" ? "Partner catalog" : "Garage series"}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-300">
              {product.description ??
                "Premium LED infinity mirror key holder — motion-activated, built for enthusiasts."}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="text-3xl font-bold text-white">
                €{product.sale_price.toFixed(2)}
              </span>
              <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs font-medium text-zinc-400">
                Free shipping DE
              </span>
            </div>
          </div>
          <a
            href="#order"
            className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-zinc-950 shadow-xl shadow-amber-500/25 sm:absolute sm:bottom-10 sm:left-auto sm:right-6 sm:translate-x-0"
          >
            Buy now
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Why drivers love it</h2>
          <p className="mt-2 text-zinc-400">
            Designed like a miniature garage bay — deep LED mirror tunnel, instant wow factor by
            your door.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={Lightbulb}
            title="Infinity LED tunnel"
            body="Layered mirrors create endless depth; soft, efficient LEDs set the mood without harsh glare."
          />
          <FeatureCard
            icon={Radio}
            title="Motion aware"
            body="Wakes up when you approach — grab your keys and go without fumbling for a switch."
          />
          <FeatureCard
            icon={Car}
            title="Garage aesthetic"
            body="Roll-up door styling and automotive cues — fits workshops, hallways, and car-themed spaces."
          />
          <FeatureCard
            icon={Sparkles}
            title="Statement piece"
            body="Looks like a boutique gadget; ships ready to mount. A strong gift for car people."
          />
        </div>
      </section>

      <section className="mx-auto max-w-lg px-4 pb-8 sm:px-6">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 sm:p-8">
          <OrderForm
            productId={product.id}
            productName={product.name}
            salePrice={product.sale_price}
            checkout={checkout ?? null}
          />
        </div>
      </section>

      <footer className="mx-auto max-w-6xl border-t border-zinc-800/80 px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-zinc-600">© {new Date().getFullYear()} Vantox. All rights reserved.</p>
          <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300">
            Back to home
          </Link>
        </div>
      </footer>
    </div>
  );
}
