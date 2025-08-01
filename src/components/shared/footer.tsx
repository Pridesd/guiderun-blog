import { Icon } from "@/components/shared"

export const Footer = () => {
  return (
    <div className="relative box-border h-[100px] w-full bg-gray-200 px-5 py-6 md:flex md:h-[80px] md:items-center">
      <Icon
        className="w-[111px] md:w-[222px]"
        icon="TextLogo"
        alt="가이드런 프로젝트"
      />
      <span className="-mt-2 text-[0.5625rem] text-gray-500 md:hidden">
        (c)Guiderun Project All Right Reserved.
      </span>
      <span className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-gray-500 md:inline">
        (c)Guiderun Project All Right Reserved.
      </span>
    </div>
  )
}
