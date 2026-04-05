import type { SupabaseClient } from "@supabase/supabase-js";

const CATALOG_FIELDS =
  "id, name, sale_price, description, image_url, external_source, slug, created_at";

const PAGE_SIZE = 500;

export type CatalogProductRow = {
  id: string;
  name: string;
  sale_price: number | string;
  description: string | null;
  image_url: string | null;
  external_source: string | null;
  slug: string | null;
};

/**
 * Loads every row from `products` (PostgREST pages at 500 rows to avoid default caps).
 */
export async function fetchAllCatalogProducts(
  supabase: SupabaseClient,
): Promise<{ data: CatalogProductRow[]; error: { message: string } | null }> {
  const rows: CatalogProductRow[] = [];

  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from("products")
      .select(CATALOG_FIELDS)
      .order("created_at", { ascending: false })
      .range(from, from + PAGE_SIZE - 1);

    if (error) {
      return { data: [], error: { message: error.message } };
    }
    if (!data?.length) {
      break;
    }
    rows.push(...(data as CatalogProductRow[]));
    if (data.length < PAGE_SIZE) {
      break;
    }
  }

  return { data: rows, error: null };
}
