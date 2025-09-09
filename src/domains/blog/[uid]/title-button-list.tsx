"use client"

import { Icon } from "@/components/shared"

interface TitleButtonListProps {
  title: string
}

export const TitleButtonList = ({ title }: TitleButtonListProps) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${title} - 가이드런 이야기`,
        url: window.location.href,
      })
    } else {
      alert("공유하기가 지원되지 않는 환경입니다.")
    }
  }

  return (
    <ul className="flex items-center justify-center">
      <li>
        <button
          className="flex items-center justify-center rounded-full bg-gray-200 p-2 hover:bg-gray-300"
          onClick={handleShare}>
          <Icon icon="Share" alt="공유하기" width={18} height={18} />
        </button>
      </li>
    </ul>
  )
}
