import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center">
      <h1 className="text-2xl font-semibold text-white">Product not found</h1>
      <p className="mt-2 max-w-sm text-sm text-zinc-500">
        This item may be unavailable. Run the SQL in <code className="text-zinc-400">supabase/schema.sql</code>{" "}
        or check the link.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-zinc-700 px-6 py-2.5 text-sm font-medium text-zinc-200 hover:border-zinc-500"
      >
        Back to Vantox
      </Link>
    </div>
  );
}
