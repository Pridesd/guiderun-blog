import RunningImage from "@/assets/image/guiderun-three.png"
import Image from "next/image"

export const HeroSection = () => {
  return (
    <div className="flex flex-col items-center gap-[1.75rem] pt-[6.5rem] pb-[6.25rem] md:gap-[2.75rem]">
      <Image
        src={RunningImage}
        alt="끈을 잡고 뛰고 있는 두 명의 가이드러너와 한 명의 시각장애러너 뒷 모습"
        className="w-full rounded-3xl"
      />
      <h1 className="flex flex-col items-center gap-3">
        <span className="text-[1.625rem] font-bold">
          우리는 보이지 않는 길을 함께 달려요
        </span>
        <span className="text-[#868b94]">가이드런 프로젝트 블로그</span>
      </h1>
    </div>
  )
}
