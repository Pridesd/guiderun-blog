import { Icon } from "@/components/shared"

export const Copyright = () => {
  return (
    <div className="relative box-border h-[100px] w-full bg-black px-5 py-6 md:flex md:h-[80px] md:items-center">
      <Icon
        className="md:hidden"
        icon="GuiderunCopyright"
        alt="(c)Guiderun Project All Right Reserved."
      />
      <Icon
        className="hidden md:block"
        icon="TextLogoWhite"
        alt="가이드런 프로젝트"
      />
      <span className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-white md:inline">
        (c)Guiderun Project All Right Reserved.
      </span>
    </div>
  )
}
