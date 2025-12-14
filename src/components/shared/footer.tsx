import { Icon } from "@/components/shared"

const COMPANY_INFO = [
  { label: "대표", value: "장지은" },
  { label: "사업자 번호", value: "601-82-78286" },
  { label: "주소", value: "경기도 과천시 관문로 166, 1018동 1층 104호" },
]

interface FooterProps {
  color?: "black" | "grey"
}

export const Footer = ({ color = "black" }: FooterProps) => {
  const footerColor =
    color === "black" ? "bg-black text-white" : "bg-gray-200 text-gray-500"

  return (
    <>
      <footer
        className={`hidden items-center justify-between px-20 py-5 md:flex ${footerColor}`}>
        <Icon
          icon={color === "black" ? "TextLogoWhite" : "TextLogo"}
          className="w-[111px] md:w-[222px]"
          alt="가이드런 프로젝트"
        />
        <span>(c)Guiderun Project All Right Reserved.</span>
        <div className="flex flex-col">
          {COMPANY_INFO.map((info) => (
            <span key={info.label}>
              {info.label}: {info.value}
            </span>
          ))}
        </div>
      </footer>
      <footer
        className={`flex flex-col gap-5 px-5 py-6 md:hidden ${footerColor}`}>
        <Icon
          icon="GuiderunCopyright"
          alt="(c)Guiderun Project All Right Reserved."
        />
        <div className="flex flex-col">
          {COMPANY_INFO.map((info) => (
            <span key={info.label} className="text-xs">
              {info.label}: {info.value}
            </span>
          ))}
        </div>
      </footer>
    </>
  )
}
