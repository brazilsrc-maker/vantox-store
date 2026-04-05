import { headers } from "next/headers";
import Stripe from "stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

type PaymentStatus = "paid" | "failed" | "processing";

/**
 * Prefer matching by `stripe_checkout_session_id` (stored before redirect to Checkout),
 * then fall back to `metadata.order_id`.
 */
async function updateOrderPaymentStatus(
  session: Stripe.Checkout.Session,
  status: PaymentStatus,
  onlyIfCurrentIn?: string[],
): Promise<boolean> {
  const admin = createSupabaseAdminClient();
  if (!admin) {
    console.error("Stripe webhook: missing SUPABASE_SERVICE_ROLE_KEY or Supabase URL");
    return false;
  }
  const db = admin;

  const sessionId = session.id;
  const metaOrderId = session.metadata?.order_id;

  async function patchOrderRow(orderRowId: string): Promise<boolean> {
    let q = db.from("orders").update({ payment_status: status }).eq("id", orderRowId);
    if (onlyIfCurrentIn?.length) {
      q = q.in("payment_status", onlyIfCurrentIn);
    }
    const { error } = await q;
    if (error) {
      console.error("Stripe webhook: Supabase update failed", error.message);
      return false;
    }
    return true;
  }

  if (sessionId) {
    const { data: row, error: selErr } = await db
      .from("orders")
      .select("id")
      .eq("stripe_checkout_session_id", sessionId)
      .maybeSingle();

    if (selErr) {
      console.error("Stripe webhook: lookup by session id failed", selErr.message);
    } else if (row?.id) {
      return patchOrderRow(row.id);
    }
  }

  if (metaOrderId) {
    return patchOrderRow(metaOrderId);
  }

  return false;
}

export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return new Response("Stripe webhook is not configured.", { status: 500 });
  }

  const body = await request.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");
  if (!sig) {
    return new Response("Missing stripe-signature", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid payload";
    console.error("Stripe webhook signature verification failed:", message);
    return new Response(`Webhook Error: ${message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.payment_status === "paid") {
          await updateOrderPaymentStatus(session, "paid");
        } else if (session.payment_status === "unpaid") {
          await updateOrderPaymentStatus(session, "processing", ["pending"]);
        }
        break;
      }
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;
        await updateOrderPaymentStatus(session, "paid");
        break;
      }
      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await updateOrderPaymentStatus(session, "failed");
        break;
      }
      default:
        break;
    }
  } catch (e) {
    console.error("Stripe webhook handler error:", e);
    return new Response("Webhook handler failed", { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
