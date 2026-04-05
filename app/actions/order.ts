"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getStripe } from "@/lib/stripe";

export type OrderState = {
  ok: boolean;
  error?: string;
  orderId?: string;
};

async function requestOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (!host) {
    return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  }
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function submitOrder(
  _prev: OrderState,
  formData: FormData,
): Promise<OrderState> {
  const productId = String(formData.get("product_id") || "").trim();
  const customerName = String(formData.get("customer_name") || "").trim();
  const shippingAddress = String(formData.get("shipping_address") || "").trim();
  const city = String(formData.get("city") || "").trim();
  const postalCode = String(formData.get("postal_code") || "").trim();
  const phone = String(formData.get("phone") || "").trim();

  if (!productId) {
    return { ok: false, error: "Missing product." };
  }
  if (!customerName || customerName.length < 2) {
    return { ok: false, error: "Please enter your full name." };
  }
  if (!shippingAddress || shippingAddress.length < 5) {
    return { ok: false, error: "Please enter a complete street address." };
  }
  if (!city || city.length < 2) {
    return { ok: false, error: "Please enter your city." };
  }
  if (!postalCode || !/^\d{5}$/.test(postalCode)) {
    return { ok: false, error: "German PLZ must be 5 digits." };
  }
  if (!phone || phone.replace(/\s/g, "").length < 8) {
    return { ok: false, error: "Please enter a valid phone number." };
  }

  const stripe = getStripe();
  if (!stripe) {
    return {
      ok: false,
      error:
        "Payments are not configured. Add STRIPE_SECRET_KEY (see .env.example) and redeploy.",
    };
  }

  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return { ok: false, error: "Store is not configured (missing Supabase keys)." };
  }

  const { data: productRow, error: productError } = await supabase
    .from("products")
    .select("id, name, sale_price")
    .eq("id", productId)
    .maybeSingle();

  if (productError || !productRow) {
    return { ok: false, error: "Product not found." };
  }

  const unitAmount = Math.round(Number(productRow.sale_price) * 100);
  if (!Number.isFinite(unitAmount) || unitAmount < 50) {
    return { ok: false, error: "Invalid product price." };
  }

  const fullAddress = `${shippingAddress}, ${postalCode} ${city}, Germany`;

  const { data, error } = await supabase
    .from("orders")
    .insert({
      product_id: productId,
      customer_name: customerName,
      shipping_address: fullAddress,
      phone,
      city,
      postal_code: postalCode,
      country: "DE",
      payment_status: "pending",
    })
    .select("id")
    .single();

  if (error) {
    return { ok: false, error: error.message };
  }

  const orderId = data.id;
  const origin = await requestOrigin();
  const successUrl = `${origin}/product/${productId}?checkout=success&session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${origin}/product/${productId}?checkout=canceled`;

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      currency: "eur",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: unitAmount,
            product_data: {
              name: productRow.name,
              metadata: { product_id: productId, order_id: orderId },
            },
          },
        },
      ],
      payment_method_types: ["card", "paypal", "sepa_debit"],
      phone_number_collection: { enabled: true },
      billing_address_collection: "required",
      metadata: { order_id: orderId, product_id: productId },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not start checkout.";
    return { ok: false, error: message };
  }

  if (!session.url) {
    return { ok: false, error: "Checkout session did not return a URL." };
  }

  const admin = createSupabaseAdminClient();
  if (admin) {
    await admin
      .from("orders")
      .update({ stripe_checkout_session_id: session.id })
      .eq("id", orderId);
  }

  redirect(session.url);
}
