import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา – Media108 สื่อ DOOH LED ชลบุรี พัทยา EEC",
  description:
    "รู้จัก Media108 บริษัทสื่อโฆษณา DOOH และป้าย LED ชั้นนำในภาคตะวันออก ด้วยเครือข่ายครอบคลุมชลบุรี พัทยา บางแสน ศรีราชา และเขต EEC ที่กำลังเติบโต",
  openGraph: {
    title:       "เกี่ยวกับ Media108",
    description: "บริษัทสื่อโฆษณา DOOH ชั้นนำในภาคตะวันออก ชลบุรี พัทยา EEC",
    url:         "/about",
  },
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
