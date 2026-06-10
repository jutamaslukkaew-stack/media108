import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://media108.com";
const GA_ID    = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:  "Media108 | สื่อโฆษณา DOOH LED ชลบุรี พัทยา Chonburi",
    template: "%s | Media108",
  },
  description:
    "Media108 แพลตฟอร์มสื่อโฆษณา DOOH และป้าย LED ชั้นนำในภาคตะวันออก ครอบคลุมชลบุรี พัทยา บางแสน ศรีราชา และเขต Chonburi เข้าถึงกลุ่มเป้าหมายด้วยข้อมูลจริงและแคมเปญที่วัดผลได้",
  keywords: ["Media108", "DOOH", "ป้าย LED", "สื่อโฆษณา", "ชลบุรี", "พัทยา", "Chonburi", "Digital Signage"],
  authors: [{ name: "Media108", url: SITE_URL }],
  creator: "Media108",
  publisher: "Media108",
  openGraph: {
    type:      "website",
    locale:    "th_TH",
    url:       SITE_URL,
    siteName:  "Media108",
    title:     "Media108 | สื่อโฆษณา DOOH LED ชลบุรี พัทยา Chonburi",
    description:
      "แพลตฟอร์มสื่อโฆษณา DOOH ชั้นนำในภาคตะวันออก ครอบคลุมชลบุรี พัทยา Chonburi",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Media108" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Media108 | สื่อโฆษณา DOOH LED ชลบุรี พัทยา Chonburi",
    description: "แพลตฟอร์มสื่อโฆษณา DOOH ชั้นนำในภาคตะวันออก",
    images:      ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="th"
      className={`${montserrat.variable} ${inter.variable}`}
    >
      <head>
        <meta name="theme-color" content="#FFFFFF" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-background text-on-background antialiased">
        <LanguageProvider>{children}</LanguageProvider>

        {/* ── Google Analytics 4 ── */}
        {GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname});`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
