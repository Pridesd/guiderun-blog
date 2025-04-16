import { type Metadata } from "next";
import OGImage from "@/assets/head/og-image.jpg";
import { MobileLanding } from "@/domains/home/MobileLanding";

export default async function Home() {
  return <MobileLanding />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    description: "다같이 함께 달려요!",
    openGraph: {
      title: "가이드런 프로젝트",
      images: {
        url: OGImage.src,
        alt: "가이드런 프로젝트",
      },
    },
  };
}
