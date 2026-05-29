import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เครือข่ายสื่อ – ป้าย LED ทั่วชลบุรี พัทยา EEC",
  description:
    "เครือข่ายป้าย LED และสื่อ DOOH ของ Media108 ครอบคลุมชลบุรี พัทยา บางแสน ศรีราชา จอมเทียน และเขตอุตสาหกรรม EEC รวมทราฟฟิกกว่า 1 ล้านคนต่อวัน",
  openGraph: {
    title:       "เครือข่ายสื่อ Media108 – ชลบุรี พัทยา EEC",
    description: "ป้าย LED และสื่อ DOOH ครอบคลุมภาคตะวันออก ทราฟฟิกกว่า 1 ล้านคนต่อวัน",
    url:         "/network",
  },
  alternates: { canonical: "/network" },
};

export default function NetworkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
