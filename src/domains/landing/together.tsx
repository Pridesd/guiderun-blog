import { DynamicIcon } from "@/components/shared/dynamic-icon"
import Workout1 from "@/assets/home/workout1.png"
import Workout2 from "@/assets/home/workout2.png"
import Image from "next/image"
import Link from "next/link"

export const Together = () => {
  return (
    <div className="box-border flex w-full flex-col items-start gap-[30px] pt-[120px] pb-[100px] pl-[15px] md:pt-[240px] md:pb-[200px] md:pl-[100px] xl:pl-[300px]">
      <div className="flex flex-col gap-[15px] pl-[5px]">
        <h2 className="text-[13px] font-bold md:text-base">함께 달리기</h2>
        <span className="text-[24px] font-bold whitespace-break-spaces md:text-6xl md:leading-[104px]">
          {`뿐만 아니라 우리는\n`}
          <div className="flex items-center">
            {`평일 저녁과 주말 `}
            <Image src={Workout1} alt="" className="w-[60px] md:w-[90px]" />
            {" 아침에\n"}
          </div>
          <div className="flex items-center">
            {`함께 `}
            <Image src={Workout2} alt="" className="w-[60px] md:w-[90px]" />
            {" 모여 운동해요!"}
          </div>
        </span>
      </div>
      <div className="flex items-center gap-4 md:gap-7 lg:gap-10">
        <Link
          href="https://www.guiderun.org/event/all"
          target="_blank"
          className="flex h-[53px] items-center justify-center gap-1 rounded-full border-[1.5px] border-[#111] px-6 text-[#111] no-underline md:gap-5 md:p-11">
          <span className="text-sm font-normal text-nowrap md:text-2xl">
            GrP 이벤트 참여하기
          </span>
          <DynamicIcon icon="ArrowRight" alt="" desktopWidth={30} />
        </Link>
        <Link
          href="https://about.guiderun.org/blog"
          className="flex items-center gap-1.5 border-b border-[#111]">
          <span className="text-xs font-normal whitespace-break-spaces md:text-lg md:whitespace-nowrap lg:text-2xl">
            {`GrP의 이야기가\n궁금하다면?`}
          </span>
          <DynamicIcon icon="ArrowRight" alt="" desktopWidth={20} />
        </Link>
      </div>
    </div>
  )
}
