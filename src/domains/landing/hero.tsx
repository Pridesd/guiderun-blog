"use client"

import { useRef } from "react"

import { StaggerAnimation } from "@/components/animations"
import { Icon } from "@/components/shared"
import { useLogoDock } from "./use-logo-dock"

export const Hero = () => {
  const logoPlaceholderRef = useRef<HTMLDivElement>(null)
  useLogoDock(logoPlaceholderRef)

  return (
    <section className="relative h-[450px] w-full bg-[#f2f2f2] md:h-[900px]">
      <div className="absolute top-[300px] left-[5vw] flex w-[90vw] flex-col gap-[1.125rem] md:top-[500px] md:left-[15vw] md:w-[70vw] md:gap-12">
        <StaggerAnimation>
          <h1 className="landing-tagline flex origin-left items-center gap-4 md:h-6 md:text-[30px]">
            <span className="font-light">함께 더 멀리 달려요</span>
            <Icon icon="Line" alt="" width={40} />
            <span className="font-light">가이드런 프로젝트</span>
          </h1>
        </StaggerAnimation>
        {/* 스크롤 0일 때 헤더 로고가 놓일 자리. 모션 최소화 설정에서는 이 로고가 대신 보인다. */}
        <div ref={logoPlaceholderRef} aria-hidden>
          <Icon
            icon="TextLogo"
            alt=""
            className="landing-logo-placeholder w-full"
          />
        </div>
      </div>
    </section>
  )
}
