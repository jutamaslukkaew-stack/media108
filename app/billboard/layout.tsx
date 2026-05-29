import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ป้ายโฆษณา LED – ทำเลพรีเมียมชลบุรี พัทยา EEC",
  description:
    "เลือกทำเลป้าย LED พรีเมียมของ Media108 ในชลบุรี พัทยา ศรีราชา จอมเทียน และเขต EEC ด้วยข้อมูล Traffic ผู้ชม และ Audience จริงทุกป้าย",
  openGraph: {
    title:       "ป้ายโฆษณา LED พรีเมียม | Media108",
    description: "ทำเลป้าย LED ชลบุรี พัทยา EEC ครอบคลุมทราฟฟิกกว่า 1 ล้านคนต่อวัน",
    url:         "/billboard",
  },
  alternates: { canonical: "/billboard" },
};

export default function BillboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
