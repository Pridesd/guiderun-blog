import { PrismicPreview } from "@prismicio/next"
import { repositoryName } from "@/prismicio"
import Logo from "@/assets/head/logo.webp"
import OGImage from "@/assets/head/og-image.jpg"
import "./globals.css"
import { Metadata } from "next"
import { GoogleAnalytics } from "@/components/shared"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: {
    template: "%s가이드런 프로젝트",
    default: "가이드런 프로젝트", // 기본 제목
  },
  description:
    "시각장애러너와 가이드러너가 함께 만들어가는 가이드런 프로젝트입니다. 함께 달려요!",
  icons: {
    icon: Logo.src, // favicon
    apple: Logo.src, // apple-touch-icon
  },
  openGraph: {
    title: "가이드런프로젝트",
    description: "함께 달려요!",
    images: [
      {
        url: OGImage.src,
        width: 1200, // OG 이미지 너비
        height: 630, // OG 이미지 높이
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <meta
        name="naver-site-verification"
        content="47de70dfa433bbe55ca07e7afaf7ac1ec890afbd"
      />
      <Suspense>
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics />}
      </Suspense>
      <body>{children}</body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  )
}
