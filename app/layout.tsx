import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "MEDIA108 | The Future of DOOH Media in Eastern Thailand",
  description:
    "Media108 คือแพลตฟอร์มสื่อโฆษณา LED และ Digital Out-of-Home ที่ช่วยให้ธุรกิจเข้าถึงกลุ่มเป้าหมายผ่านทำเลจริง ข้อมูลจริง และแคมเปญที่วัดผลได้",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="th"
      className={`dark ${montserrat.variable} ${inter.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="bg-background text-on-background antialiased">
        {children}
      </body>
    </html>
  );
}
