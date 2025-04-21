import { Icon } from "@/components/shared"

export const Together = () => {
  return (
    <div className="box-border flex w-full flex-col items-start gap-[30px] pt-[120px] pb-[100px] pl-[15px] md:pt-[240px] md:pb-[200px] md:pl-[100px]">
      <div className="flex flex-col gap-[15px] pl-[5px]">
        <h2 className="text-[13px] font-bold md:text-base">함께 달리기</h2>
        <span className="text-[32px] font-bold whitespace-break-spaces md:text-6xl md:leading-[104px]">
          {`프로그램이 없을 때에도\n매주 일요일 아침\n`}
          <div className="flex items-center">
            {`함께 모여 `}
            <Icon icon="Workout" alt="" />
            {" 운동해요!"}
          </div>
        </span>
      </div>
      <a
        href="https://pf.kakao.com/_YpkDG"
        target="_blank"
        className="flex h-[53px] items-center justify-center gap-2 rounded-full border-[1.5px] border-[#111] px-6 text-[#111] no-underline md:gap-5 md:p-11">
        <span className="font-norma text-sm md:text-3xl">문의하러 가기</span>
        <Icon icon="ArrowRight" alt="" />
      </a>
    </div>
  )
}
