import { Icon } from "@/components/shared"

export const Copyright = () => {
  return (
    <div className="relative box-border h-[100px] w-full bg-black px-5 py-6 md:flex md:h-[80px] md:items-center">
      <div>
        <Icon
          className="md:hidden"
          icon="GuiderunCopyright"
          alt="(c)Guiderun Project All Right Reserved."
        />
      </div>
      <div className="hidden w-full items-center justify-between md:flex">
        <span className="text-white">사업자 번호 : 601-82-78286</span>
        <span className="text-white">
          주소 : 경기도 과천시 관문로 166, 1018동 1층 104호
        </span>
        <span className="text-white">대표 : 장지은</span>
        <span className="text-white">
          (c)Guiderun Project All Right Reserved.
        </span>
        <Icon className="" icon="TextLogoWhite" alt="가이드런 프로젝트" />
      </div>
    </div>
  )
}
