"use client"

import { RefObject, useLayoutEffect } from "react"

// globals.css 의 랜딩 헤더 애니메이션들. 미지원 브라우저 폴백에서 스크롤 위치로 감아 준다.
const DOCK_ANIMATIONS = ["logo-dock", "header-bg-in", "tagline-out"]
const DOCK_VARIABLES = ["--logo-dx", "--logo-dy", "--logo-scale"]

/**
 * 헤더 로고가 스크롤 0일 때 placeholder 위치에 보이도록, 헤더 로고 자리와의 차이를 CSS 변수로 넣는다.
 * 실제 이동은 CSS scroll-driven animation(logo-dock)이 하므로 스크롤 중에는 JS가 돌지 않는다.
 * 히어로의 태그라인도 같은 값을 쓰므로 :root 에 넣는다.
 */
export const useLogoDock = (placeholderRef: RefObject<HTMLElement | null>) => {
  useLayoutEffect(() => {
    const root = document.documentElement
    const header = document.querySelector<HTMLElement>(".landing-header")
    const slot = header?.querySelector<HTMLElement>("[data-logo-slot]")
    const placeholder = placeholderRef.current
    if (!header || !slot || !placeholder) return

    const measure = () => {
      const from = placeholder.getBoundingClientRect()
      const to = slot.getBoundingClientRect()

      root.style.setProperty("--logo-dx", `${from.left - to.left}px`)
      root.style.setProperty(
        "--logo-dy",
        `${from.top + window.scrollY - to.top}px`
      )
      root.style.setProperty("--logo-scale", `${from.width / to.width}`)
      header.dataset.logoReady = ""
    }

    measure()
    // placeholder 는 vw 기준이라 화면 너비가 바뀌면 크기가 바뀐다. slot 은 md 브레이크포인트에서 바뀐다.
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(placeholder)
    resizeObserver.observe(slot)

    const cleanup = () => {
      resizeObserver.disconnect()
      DOCK_VARIABLES.forEach((name) => root.style.removeProperty(name))
    }

    if (CSS.supports("animation-timeline: scroll()")) return cleanup

    // scroll-driven animation 미지원 브라우저: 멈춰 둔 CSS 애니메이션을 스크롤 위치로 감는다 (1ms = 1px)
    let frame = 0
    const sync = () => {
      frame = 0
      for (const animation of document.getAnimations()) {
        if (
          animation instanceof CSSAnimation &&
          DOCK_ANIMATIONS.includes(animation.animationName)
        ) {
          animation.currentTime = window.scrollY
        }
      }
    }
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(sync)
    }

    sync()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      cleanup()
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(frame)
    }
  }, [placeholderRef])
}
