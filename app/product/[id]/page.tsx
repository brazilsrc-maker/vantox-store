import { notFound } from "next/navigation";
import { ProductLanding } from "@/components/product-landing";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return { title: "Vantox" };
  }
  const { data } = await supabase
    .from("products")
    .select("name, description")
    .eq("id", id)
    .maybeSingle();

  return {
    title: data?.name ? `${data.name} | Vantox` : "Product | Vantox",
    description: data?.description ?? "Vantox — curated gear for drivers.",
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center">
        <p className="max-w-md text-sm text-zinc-400">
          Supabase is not configured. Add{" "}
          <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-zinc-300">
            NEXT_PUBLIC_SUPABASE_URL
          </code>{" "}
          and{" "}
          <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-zinc-300">
            NEXT_PUBLIC_SUPABASE_ANON_KEY
          </code>{" "}
          in Vercel Project → Settings → Environment Variables, then redeploy.
        </p>
      </div>
    );
  }

  const { data, error } = await supabase.from("products").select("*").eq("id", id).maybeSingle();

  if (error || !data) {
    notFound();
  }

  const product: Product = {
    id: data.id,
    slug: data.slug,
    name: data.name,
    supplier_price: data.supplier_price != null ? Number(data.supplier_price) : null,
    sale_price: Number(data.sale_price),
    supplier_url: data.supplier_url,
    description: data.description,
    video_url: data.video_url,
  };

  return <ProductLanding product={product} />;
}
