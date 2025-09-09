"use client"

import { IconKey } from "@/assets/svg"
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

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("링크가 복사되었습니다.")
    })
  }

  return (
    <div className="flex items-center justify-center gap-1.5">
      <Button icon="Copy" label="링크 복사하기" onClick={handleCopy} />
      <Button icon="Share" label="공유하기" onClick={handleShare} />
    </div>
  )
}

interface ButtonProps {
  icon: IconKey
  label: string
  onClick: VoidFunction
}

const Button = ({ icon, label, onClick }: ButtonProps) => {
  return (
    <button
      className="flex items-center justify-center rounded-full bg-gray-200 p-2 hover:bg-gray-300"
      onClick={onClick}>
      <Icon icon={icon} alt={label} width={18} height={18} />
    </button>
  )
}
