/**
 * RapidAPI "Aliexpress True API" payloads vary by version.
 * We accept several common shapes and field aliases.
 */

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function extractProductList(payload: unknown): unknown[] {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (!isRecord(payload)) {
    return [];
  }

  const tryArrays = [
    payload.data,
    payload.result,
    payload.products,
    payload.items,
    payload.list,
    payload.records,
  ];

  for (const candidate of tryArrays) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
    if (isRecord(candidate)) {
      const inner = candidate.products ?? candidate.items ?? candidate.list ?? candidate.data;
      if (Array.isArray(inner)) {
        return inner;
      }
    }
  }

  return [];
}

function firstString(...vals: unknown[]): string | null {
  for (const v of vals) {
    if (v === undefined || v === null) {
      continue;
    }
    if (typeof v === "string" && v.trim()) {
      return v.trim();
    }
    if (typeof v === "number" && Number.isFinite(v)) {
      return String(v);
    }
  }
  return null;
}

function firstNumber(...vals: unknown[]): number | null {
  for (const v of vals) {
    if (v === undefined || v === null) {
      continue;
    }
    if (typeof v === "number" && Number.isFinite(v)) {
      return v;
    }
    if (typeof v === "string") {
      const n = parseFloat(v.replace(/,/g, ""));
      if (Number.isFinite(n)) {
        return n;
      }
    }
  }
  return null;
}

/** Retail: original API price × margin × German VAT (19%). */
const RETAIL_MARGIN = 1.35;
const GERMAN_VAT_FACTOR = 1.19;

export type MappedAliProduct = {
  external_item_id: string;
  name: string;
  supplier_price: number;
  sale_price: number;
  supplier_url: string | null;
  description: string | null;
  image_url: string | null;
};

function firstImageUrl(raw: Record<string, unknown>): string | null {
  const direct = firstString(
    raw.product_main_image_url,
    raw.image_url,
    raw.main_image_url,
    raw.img,
    raw.pic_url,
    raw.image,
  );
  if (direct) {
    return direct;
  }
  const imgs = raw.product_images ?? raw.images ?? raw.image_urls ?? raw.pics;
  if (!Array.isArray(imgs) || imgs.length === 0) {
    return null;
  }
  const first = imgs[0];
  if (typeof first === "string" && first.trim()) {
    return first.trim();
  }
  if (isRecord(first)) {
    return firstString(first.url, first.image_url, first.img, first.pic);
  }
  return null;
}

function firstDescription(raw: Record<string, unknown>): string | null {
  return firstString(
    raw.description,
    raw.product_description,
    raw.detail,
    raw.remark,
    raw.shop_name,
  );
}

/** Original / list price from AliExpress JSON (before margin & VAT). */
function extractOriginalUnitPrice(raw: Record<string, unknown>): number | null {
  const original = firstNumber(
    raw.original_price,
    raw.target_original_price,
    raw.app_original_price,
    raw.max_price,
  );
  const sale = firstNumber(
    raw.sale_price,
    raw.target_sale_price,
    raw.app_sale_price,
    raw.min_price,
    raw.price,
    raw.discount_price,
  );
  const base = original ?? sale;
  if (base === null || base <= 0) {
    return null;
  }
  return Math.round(base * 100) / 100;
}

export function computeSalePriceWithMarginAndGermanVat(originalPrice: number): number {
  const withMargin = originalPrice * RETAIL_MARGIN;
  const withVat = withMargin * GERMAN_VAT_FACTOR;
  return Math.round(withVat * 100) / 100;
}

function slugFragment(title: string, itemId: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
  const suffix = itemId.replace(/\D/g, "").slice(-10) || itemId.slice(-8);
  const s = `${base || "product"}-${suffix}`.replace(/-+/g, "-");
  return s.slice(0, 120);
}

export function mapRawItemToProduct(raw: unknown): (MappedAliProduct & { slug: string }) | null {
  if (!isRecord(raw)) {
    return null;
  }

  const itemId = firstString(
    raw.item_id,
    raw.itemId,
    raw.product_id,
    raw.productId,
    raw.id,
  );
  if (!itemId) {
    return null;
  }

  const name = firstString(
    raw.title,
    raw.product_title,
    raw.subject,
    raw.productTitle,
    raw.name,
  );
  if (!name) {
    return null;
  }

  const supplierRounded = extractOriginalUnitPrice(raw);
  if (supplierRounded === null) {
    return null;
  }

  const sale_price = computeSalePriceWithMarginAndGermanVat(supplierRounded);

  const url = firstString(
    raw.product_detail_url,
    raw.product_url,
    raw.detail_url,
    raw.url,
    raw.affiliate_url,
  );

  const img = firstImageUrl(raw);
  const desc = firstDescription(raw);

  return {
    external_item_id: itemId,
    slug: slugFragment(name, itemId),
    name: name.slice(0, 500),
    supplier_price: supplierRounded,
    sale_price,
    supplier_url: url,
    description: desc ? desc.slice(0, 4000) : null,
    image_url: img,
  };
}
