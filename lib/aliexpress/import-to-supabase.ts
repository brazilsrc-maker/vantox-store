import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { extractProductList, mapRawItemToProduct } from "@/lib/aliexpress/parse-products";
import {
  fetchHotProducts,
  resolveHotProductsQuery,
  type HotProductsQuery,
} from "@/lib/aliexpress/rapidapi";

export type ImportAliexpressResult = {
  ok: boolean;
  upserted: number;
  skipped: number;
  error?: string;
};

export async function importHotProductsFromAliexpress(
  query: HotProductsQuery,
): Promise<ImportAliexpressResult> {
  const admin = createSupabaseAdminClient();
  if (!admin) {
    return {
      ok: false,
      upserted: 0,
      skipped: 0,
      error: "SUPABASE_SERVICE_ROLE_KEY (and Supabase URL) are required for import.",
    };
  }

  let payload: unknown;
  try {
    payload = await fetchHotProducts(query);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Request failed.";
    return { ok: false, upserted: 0, skipped: 0, error: msg };
  }

  const list = extractProductList(payload);
  const rows: Array<{
    slug: string;
    name: string;
    supplier_price: number;
    sale_price: number;
    supplier_url: string | null;
    description: string | null;
    image_url: string | null;
    external_source: string;
    external_item_id: string;
  }> = [];

  let skipped = 0;
  for (const raw of list) {
    const mapped = mapRawItemToProduct(raw);
    if (!mapped) {
      skipped += 1;
      continue;
    }
    rows.push({
      slug: mapped.slug,
      name: mapped.name,
      supplier_price: mapped.supplier_price,
      sale_price: mapped.sale_price,
      supplier_url: mapped.supplier_url,
      description: mapped.description,
      image_url: mapped.image_url,
      external_source: "aliexpress",
      external_item_id: mapped.external_item_id,
    });
  }

  if (rows.length === 0) {
    return {
      ok: true,
      upserted: 0,
      skipped,
      error:
        skipped > 0
          ? "No rows mapped; API shape may differ — check RapidAPI response in the playground."
          : "API returned no products for this query.",
    };
  }

  let upserted = 0;
  for (const row of rows) {
    const { data: existing } = await admin
      .from("products")
      .select("id")
      .eq("external_source", row.external_source)
      .eq("external_item_id", row.external_item_id)
      .maybeSingle();

    if (existing?.id) {
      const { error } = await admin
        .from("products")
        .update({
          slug: row.slug,
          name: row.name,
          supplier_price: row.supplier_price,
          sale_price: row.sale_price,
          supplier_url: row.supplier_url,
          description: row.description,
          image_url: row.image_url,
        })
        .eq("id", existing.id);
      if (error) {
        return { ok: false, upserted, skipped, error: error.message };
      }
    } else {
      const { error } = await admin.from("products").insert(row);
      if (error) {
        return { ok: false, upserted, skipped, error: error.message };
      }
    }
    upserted += 1;
  }

  return { ok: true, upserted, skipped };
}

export function defaultHotProductsQuery(overrides: Partial<HotProductsQuery> = {}): HotProductsQuery {
  return resolveHotProductsQuery(overrides);
}
