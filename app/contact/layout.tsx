import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ติดต่อเรา – ขอใบเสนอราคาสื่อโฆษณา DOOH",
  description:
    "ติดต่อ Media108 เพื่อขอใบเสนอราคาสื่อโฆษณา DOOH และป้าย LED ในชลบุรี พัทยา EEC โทร 062-563-6199 หรือ LINE @media108",
  openGraph: {
    title:       "ติดต่อ Media108 – ขอใบเสนอราคา",
    description: "ขอใบเสนอราคาสื่อโฆษณา DOOH ป้าย LED ชลบุรี พัทยา EEC",
    url:         "/contact",
  },
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
