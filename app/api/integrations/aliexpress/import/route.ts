import { timingSafeEqual } from "node:crypto";
import {
  defaultHotProductsQuery,
  importHotProductsFromAliexpress,
} from "@/lib/aliexpress/import-to-supabase";

export const dynamic = "force-dynamic";

function secretOk(provided: string | null): boolean {
  const expected = process.env.ALIEXPRESS_IMPORT_SECRET?.trim();
  if (!expected || !provided) {
    return false;
  }
  try {
    const a = Buffer.from(provided, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) {
      return false;
    }
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/**
 * POST /api/integrations/aliexpress/import
 * Runs only when the `Authorization` header matches `ALIEXPRESS_IMPORT_SECRET`:
 * use `Authorization: Bearer <ALIEXPRESS_IMPORT_SECRET>` (or the same value without the `Bearer ` prefix).
 * Body (JSON, optional): { category_id, page_no, page_size, target_currency, target_language, country }
 */
function tokenFromAuthorizationHeader(header: string | null): string | null {
  if (!header) {
    return null;
  }
  const t = header.trim();
  if (/^bearer\s+/i.test(t)) {
    return t.replace(/^bearer\s+/i, "").trim() || null;
  }
  return t || null;
}

export async function POST(request: Request) {
  const token = tokenFromAuthorizationHeader(request.headers.get("authorization"));
  if (!secretOk(token)) {
    return Response.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  let body: Record<string, unknown> = {};
  try {
    const text = await request.text();
    if (text) {
      body = JSON.parse(text) as Record<string, unknown>;
    }
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const num = (v: unknown): number | undefined => {
    if (typeof v === "number" && Number.isFinite(v)) {
      return v;
    }
    if (typeof v === "string" && v.trim()) {
      const n = parseInt(v, 10);
      return Number.isFinite(n) ? n : undefined;
    }
    return undefined;
  };

  const q = defaultHotProductsQuery({
    category_id: typeof body.category_id === "string" ? body.category_id : undefined,
    page_no: num(body.page_no),
    page_size: num(body.page_size),
    target_currency: typeof body.target_currency === "string" ? body.target_currency : undefined,
    target_language: typeof body.target_language === "string" ? body.target_language : undefined,
    country: typeof body.country === "string" ? body.country : undefined,
  });

  const result = await importHotProductsFromAliexpress(q);
  const status = result.ok ? 200 : 502;
  return Response.json(result, { status });
}
