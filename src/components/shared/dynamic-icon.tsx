"use client"

import { IconKey } from "@/assets/svg"
import { Icon } from "./icon"
import { useEffect, useState } from "react"

interface DynamicIconProps {
  icon: IconKey
  desktopWidth: number
  alt: string
}

export const DynamicIcon = ({ icon, desktopWidth, alt }: DynamicIconProps) => {
  const [isDesctop, setIsDesctop] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsDesctop(true)
      } else {
        setIsDesctop(false)
      }
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <Icon icon={icon} alt={alt} width={isDesctop ? desktopWidth : undefined} />
  )
}
