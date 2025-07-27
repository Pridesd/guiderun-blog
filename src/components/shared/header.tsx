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

export const Header = () => {
  const pathname = usePathname()

  const checkCurrentPath = (path: string, checkStartWith: boolean = false) => {
    if (checkStartWith) {
      return pathname.startsWith(path)
    }

    return pathname === path
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-10 flex items-center justify-between bg-[#fff] p-5">
      <Link href="/">
        <Icon
          icon="TextLogo"
          alt="가이드런 프로젝트"
          className="w-[111px] md:w-[222px]"
        />
      </Link>
      <nav className="flex items-center justify-end gap-3 lg:gap-[3.75rem]">
        {NAVIGATIONS.map((navi) => (
          <Link
            key={navi.label}
            aria-current={checkCurrentPath(navi.path) ? "page" : undefined}
            href="/"
            className={`border-b-2 font-medium lg:text-[1.25rem] ${checkCurrentPath(navi.path) ? "border-b-black" : "border-b-[#fff]"} hover:border-b-black`}>
            {navi.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
