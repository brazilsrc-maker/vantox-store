import type { Metadata, Viewport } from "next";
import { Cairo, Space_Grotesk } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const body = Cairo({
  variable: "--font-body",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "VANTOX — مولّد سيناريوهات الستوري",
    template: "%s | VANTOX",
  },
  description:
    "المساعد اليومي لصنّاع المحتوى: أفكار ستوري تفاعلية، تصويتات، سلاسل تشويق، وأسئلة ترفع التفاعل على إنستغرام وتيك توك.",
  metadataBase: new URL("https://vantox.store"),
  openGraph: {
    siteName: "VANTOX",
    title: "VANTOX — مولّد سيناريوهات الستوري",
    description:
      "فكرة ستوري كل صباح. صمّم، انسخ، حمّل — وارفع التفاعل.",
    type: "website",
    locale: "ar_AR",
  },
};

export const viewport: Viewport = {
  themeColor: "#05010d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${body.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full text-slate-50">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
