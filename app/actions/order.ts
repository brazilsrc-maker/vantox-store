"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type OrderState = {
  ok: boolean;
  error?: string;
  orderId?: string;
};

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

  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return { ok: false, error: "Store is not configured (missing Supabase keys)." };
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
    })
    .select("id")
    .single();

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, orderId: data.id };
}
