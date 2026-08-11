import type { Metadata, Viewport } from "next";
import { Cairo, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { LocaleProvider } from "@/components/locale-provider";
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
  metadataBase: new URL("https://www.vantox.store"),
  verification: {
    google: "b6hqj1GlS5r01dmaQ5-4GwTCHAnpRDx9602L6Tk2woM",
  },
  other: {
    "google-adsense-account": "ca-pub-9998186124580672",
  },
  icons: {
    icon: "/vantox-icon.png",
    apple: "/vantox-icon.png",
  },
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
  themeColor: "#ffffff",
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
      <body className="min-h-full text-slate-900">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9998186124580672"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <LocaleProvider>
          <SiteHeader />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
