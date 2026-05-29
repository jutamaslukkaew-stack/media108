import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Kit – ดาวน์โหลดข้อมูลสื่อและราคา",
  description:
    "ดาวน์โหลด Media Kit ของ Media108 รวมข้อมูลป้าย LED สเปค ราคา Audience Data และ Coverage Report สำหรับนักการตลาดและเอเจนซี่",
  openGraph: {
    title:       "Media Kit – Media108 ข้อมูลสื่อและราคา DOOH",
    description: "ดาวน์โหลด Media Kit ข้อมูลป้าย สเปค ราคา และ Audience Data",
    url:         "/media-kit",
  },
  alternates: { canonical: "/media-kit" },
};

export default function MediaKitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
