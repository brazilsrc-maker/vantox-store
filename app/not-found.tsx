import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-black text-white">404</h1>
      <p className="mt-2 text-white/50">الصفحة مو موجودة</p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-fuchsia-500 px-5 py-2.5 text-sm font-bold text-white"
      >
        رجوع لـ VANTOX
      </Link>
    </main>
  );
}
