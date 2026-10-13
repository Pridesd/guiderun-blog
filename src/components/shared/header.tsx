"use client"

import { Icon } from "@/components/shared"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAVIGATIONS: { path: string; label: string }[] = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/blog",
    label: "Blog",
  },
]

interface HeaderProps {
  /** landing: 블러 배경이 스크롤에 맞춰 나타나고, 로고가 히어로에서 헤더 자리로 이동한다 (useLogoDock) */
  variant?: "default" | "landing"
}

export const Header = ({ variant = "default" }: HeaderProps) => {
  const pathname = usePathname()
  const isLanding = variant === "landing"

  const checkCurrentPath = (path: string, checkStartWith: boolean = false) => {
    if (checkStartWith) {
      return pathname.startsWith(path)
    }

    return pathname === path
  }

  return (
    <header
      className={`fixed top-0 right-0 left-0 flex items-center justify-between p-5 ${isLanding ? "landing-header z-40" : "z-10"}`}>
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 bg-white/70 backdrop-blur-md ${isLanding ? "landing-header-bg" : ""}`}
      />
      <Link href="/" data-logo-slot>
        <Icon
          icon="TextLogo"
          alt="가이드런 프로젝트"
          priority
          className={`w-[111px] md:w-[222px] ${isLanding ? "landing-header-logo" : ""}`}
        />
      </Link>
      <nav className="flex items-center justify-end gap-3 lg:gap-[3.75rem]">
        {NAVIGATIONS.map((navi) => (
          <Link
            key={navi.label}
            aria-current={
              checkCurrentPath(navi.path, navi.label === "Blog")
                ? "page"
                : undefined
            }
            href={navi.path}
            className={`border-b-2 font-medium lg:text-[1.25rem] ${checkCurrentPath(navi.path, navi.label === "Blog") ? "border-b-black" : "border-b-transparent"} hover:border-b-black`}>
            {navi.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
