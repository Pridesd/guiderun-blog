import { Icon } from "@/components/shared"

const COMPANY_INFO = [
  { label: "사업자 번호", value: "601-82-78286" },
  { label: "주소", value: "경기도 과천시 관문로 166, 1018동 1층 104호" },
  { label: "대표", value: "장지은" },
]

export const Copyright = () => {
  return (
    <footer className="relative box-border h-[180px] w-full bg-black px-5 py-6 md:flex md:h-[80px] md:items-center">
      <div className="flex flex-col gap-[2rem] text-white md:hidden">
        <Icon
          icon="GuiderunCopyright"
          alt="(c)Guiderun Project All Right Reserved."
        />
        <div className="flex flex-col gap-[0.5rem] text-[0.625rem]">
          {COMPANY_INFO.map((info) => (
            <span key={info.label}>
              {info.label}: {info.value}
            </span>
          ))}
        </div>
      </div>
      <div className="hidden w-full items-center justify-between text-white md:flex">
        {COMPANY_INFO.map((info) => (
          <span key={info.label}>
            {info.label}: {info.value}
          </span>
        ))}
        <span>(c)Guiderun Project All Right Reserved.</span>
        <Icon icon="TextLogoWhite" alt="가이드런 프로젝트" />
      </div>
    </footer>
  )
}
