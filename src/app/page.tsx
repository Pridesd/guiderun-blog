import { type Metadata } from "next"
import Logo from "@/assets/head/logo.webp"
import OGImage from "@/assets/head/og-image.jpg"
import {
  Copyright,
  Description,
  Final,
  GuideRun,
  Header,
  ProgramList,
  Together,
} from "@/domains/landing"

export default async function Home() {
  return (
    <div className="mx-auto w-full">
      <Header />
      <Description />
      <ProgramList />
      <Together />
      <GuideRun />
      <Final />
      <Copyright />
      <span className="top-9 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform text-lg font-thin md:absolute md:block">
        (c)Guiderun Project All Right Reserved.
      </span>
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    description: "다같이 함께 달려요!",
    icons: {
      icon: Logo.src,
      shortcut: Logo.src,
      apple: Logo.src,
    },
    openGraph: {
      title: "가이드런 프로젝트",
      images: {
        url: OGImage.src,
        alt: "가이드런 프로젝트",
      },
    },
  }
}
