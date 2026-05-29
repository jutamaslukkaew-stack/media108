import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "บริการของเรา – สื่อ DOOH ผลิตคอนเทนต์ วิเคราะห์ข้อมูล",
  description:
    "บริการสื่อโฆษณาครบวงจรจาก Media108 ครอบคลุมป้าย LED DOOH การผลิตคอนเทนต์ Motion Graphic วิเคราะห์ข้อมูลผู้ชม และกลยุทธ์สื่อ",
  openGraph: {
    title:       "บริการ Media108 – DOOH ครบวงจร",
    description: "สื่อโฆษณา DOOH ผลิตคอนเทนต์ วิเคราะห์ผู้ชม และกลยุทธ์สื่อ",
    url:         "/services",
  },
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
