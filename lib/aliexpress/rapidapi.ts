const DEFAULT_HOST = "aliexpress-true-api.p.rapidapi.com";
const DEFAULT_HOT_PRODUCTS_PATH = "/api/v3/hot-products-download";

/** Default market: Germany (EUR, German UI copy, DE shipping context). */
export const HOT_PRODUCTS_DEFAULT_LOCALE = {
  target_currency: "EUR",
  target_language: "DE",
  country: "DE",
} as const;

export type HotProductsQuery = {
  category_id: string;
  page_no: number;
  page_size: number;
  target_currency: string;
  target_language: string;
  country: string;
};

export function resolveHotProductsQuery(
  overrides: Partial<HotProductsQuery> = {},
): HotProductsQuery {
  return {
    category_id: overrides.category_id ?? "1509",
    page_no: overrides.page_no ?? 1,
    page_size: Math.min(overrides.page_size ?? 30, 50),
    target_currency: overrides.target_currency ?? HOT_PRODUCTS_DEFAULT_LOCALE.target_currency,
    target_language: overrides.target_language ?? HOT_PRODUCTS_DEFAULT_LOCALE.target_language,
    country: overrides.country ?? HOT_PRODUCTS_DEFAULT_LOCALE.country,
  };
}

export function getRapidAliexpressConfig(): { key: string; host: string } | null {
  const key = process.env.RAPIDAPI_KEY?.trim();
  if (!key) {
    return null;
  }
  const host = process.env.ALIEXPRESS_RAPIDAPI_HOST?.trim() || DEFAULT_HOST;
  return { key, host };
}

export async function fetchHotProductsDownload(
  query: HotProductsQuery,
): Promise<unknown> {
  const cfg = getRapidAliexpressConfig();
  if (!cfg) {
    throw new Error("RAPIDAPI_KEY is not set.");
  }

  const path = process.env.ALIEXPRESS_HOT_PRODUCTS_PATH?.trim() || DEFAULT_HOT_PRODUCTS_PATH;
  const url = new URL(`https://${cfg.host}${path}`);
  url.searchParams.set("category_id", query.category_id);
  url.searchParams.set("page_no", String(query.page_no));
  url.searchParams.set("page_size", String(query.page_size));
  url.searchParams.set("target_currency", query.target_currency);
  url.searchParams.set("target_language", query.target_language);
  url.searchParams.set("country", query.country);

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "x-rapidapi-key": cfg.key,
      "x-rapidapi-host": cfg.host,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const text = await res.text();
  let body: unknown;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`AliExpress API returned non-JSON (${res.status}): ${text.slice(0, 200)}`);
  }

  if (!res.ok) {
    const msg =
      typeof body === "object" && body !== null && "message" in body
        ? String((body as { message: unknown }).message)
        : text.slice(0, 200);
    throw new Error(`AliExpress API error ${res.status}: ${msg}`);
  }

  return body;
}

/**
 * Fetches best-selling / “hot” products from RapidAPI (Aliexpress True API).
 * Uses `RAPIDAPI_KEY`; defaults to EUR, language DE, country DE unless overridden.
 */
export async function fetchHotProducts(
  overrides: Partial<HotProductsQuery> = {},
): Promise<unknown> {
  return fetchHotProductsDownload(resolveHotProductsQuery(overrides));
}
