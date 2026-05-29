import type { Metadata } from "next";
import { billboards } from "../../data/billboards";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = billboards[slug];

  if (!data) {
    return {
      title: "ป้ายโฆษณา | Media108",
      description: "สื่อโฆษณา DOOH LED ชลบุรี พัทยา EEC",
    };
  }

  return {
    title: `${data.title} – ป้ายโฆษณา LED ${data.subtitle}`,
    description: `${data.description} ทราฟฟิก ${data.carsPerDay} คันต่อวัน ระยะมองเห็น ${data.viewingDistance} เริ่มต้น ${data.price}`,
    openGraph: {
      title:       `${data.title} | Media108`,
      description: data.description,
      url:         `/billboard/${slug}`,
      images: [
        {
          url: data.imgDay,
          width: 1200,
          height: 630,
          alt: `ป้าย LED ${data.title} – ${data.subtitle}`,
        },
      ],
    },
    alternates: { canonical: `/billboard/${slug}` },
  };
}

export default function BillboardSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
