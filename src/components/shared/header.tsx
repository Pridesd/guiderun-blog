"use client"

import { Icon } from "@/components/shared"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Header = () => {
  const pathname = usePathname()

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
        <Link
          aria-current={pathname === "/" ? "page" : undefined}
          href="/"
          className="font-medium lg:text-[1.25rem]">
          Home
        </Link>
        <Link
          aria-current={pathname.startsWith("/blog") ? "page" : undefined}
          href="/blog"
          className="font-medium lg:text-[1.25rem]">
          Blog
        </Link>
      </nav>
    </header>
  )
}
