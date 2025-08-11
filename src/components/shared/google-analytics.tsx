"use client"

import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // GA_TRACKING_ID가 없거나, window.gtag 함수가 정의되지 않았다면 실행하지 않음
    if (!GA_TRACKING_ID || typeof window.gtag !== "function") {
      return
    }

    // pathname과 searchParams가 변경될 때마다 페이지뷰 전송
    const url = pathname + searchParams.toString()
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    })
  }, [pathname, searchParams])

  return (
    <>
      {/* Google Analytics 스크립트 로드 */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      {/* gtag 초기화 및 첫 페이지뷰 전송 */}
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
