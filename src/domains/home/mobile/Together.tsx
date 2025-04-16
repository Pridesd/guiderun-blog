import { Icon } from "@/components/animations/shared";

export const Together = () => {
  return (
    <div className="box-border w-full pt-[120px] pb-[100px] pl-[15px] flex flex-col items-start gap-[30px]">
      <div className="flex flex-col pl-[5px] gap-[15px]">
        <h2 className="text-[13px] font-bold">함께 달리기</h2>
        <span className="text-[32px] font-bold whitespace-break-spaces">
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
        className="flex items-center justify-center gap-2 border-[1.5px] border-[#111] rounded-full px-6 h-[53px] no-underline text-[#111]"
      >
        <span className="text-sm font-normal">문의하러 가기</span>
        <Icon icon="ArrowRight" alt="" />
      </a>
    </div>
  );
};
