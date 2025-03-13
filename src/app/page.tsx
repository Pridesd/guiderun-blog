import { type Metadata } from "next";
import OGImage from "@/assets/head/og-image.jpg";

export default async function Home() {
  return <>직접 구축한 화면</>;
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
