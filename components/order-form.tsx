"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { submitOrder, type OrderState } from "@/app/actions/order";

const initial: OrderState = { ok: false };

export function OrderForm({
  productId,
  productName,
  salePrice,
}: {
  productId: string;
  productName: string;
  salePrice: number;
}) {
  const [state, formAction, pending] = useActionState(submitOrder, initial);

  if (state.ok && state.orderId) {
    return (
      <div
        className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center"
        role="status"
      >
        <p className="text-lg font-semibold text-emerald-200">Thank you — order received</p>
        <p className="mt-2 text-sm text-zinc-400">
          Reference: <span className="font-mono text-zinc-200">{state.orderId}</span>
        </p>
        <p className="mt-4 text-sm text-zinc-500">
          We will contact you shortly to confirm payment and shipping for {productName}.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="product_id" value={productId} />
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-semibold tracking-tight text-white" id="order">
          Complete purchase
        </h2>
        <p className="text-sm text-zinc-500">
          Total{" "}
          <span className="font-mono text-amber-400">
            €{salePrice.toFixed(2)}
          </span>
        </p>
      </div>

      {state.error ? (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {state.error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">
            Full name
          </span>
          <input
            name="customer_name"
            required
            autoComplete="name"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-zinc-100 outline-none ring-amber-500/0 transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/30"
            placeholder="Max Mustermann"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">
            Street &amp; house number
          </span>
          <input
            name="shipping_address"
            required
            autoComplete="street-address"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-zinc-100 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/30"
            placeholder="Musterstraße 12"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">
            Postal code (PLZ)
          </span>
          <input
            name="postal_code"
            required
            inputMode="numeric"
            pattern="\d{5}"
            maxLength={5}
            autoComplete="postal-code"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-zinc-100 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/30"
            placeholder="10115"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">
            City
          </span>
          <input
            name="city"
            required
            autoComplete="address-level2"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-zinc-100 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/30"
            placeholder="Berlin"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">
            Phone
          </span>
          <input
            name="phone"
            required
            type="tel"
            autoComplete="tel"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-zinc-100 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/30"
            placeholder="+49 …"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4 text-base font-semibold text-zinc-950 shadow-lg shadow-amber-500/20 transition hover:from-amber-400 hover:to-orange-500 disabled:opacity-60"
      >
        {pending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Processing…
          </>
        ) : (
          "Complete purchase"
        )}
      </button>
      <p className="text-center text-xs text-zinc-600">
        Secure checkout flow — payment confirmation may be sent separately.
      </p>
    </form>
  );
}
