import { getFormattedSeason, Program } from "./ProgramItem";
import { Dialog } from "@headlessui/react";
import { Icon } from "@/components/animations/shared";

interface PropgramModalProps {
  open: boolean;
  onClose: VoidFunction;
  program: Program;
}

export const ProgramModal = ({
  open,
  program,
  onClose,
}: PropgramModalProps) => {
  const renderDescription = (title: string, data: string) => {
    return (
      <span className="text-white text-sm font-normal whitespace-break-spaces">{`${title}: ${data}`}</span>
    );
  };

  const titleId = `program-${program.year}-${program.season}-title`;
  const descriptionId = `program-${program.year}-${program.season}-description`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <div className="box-border absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[8px] w-[320px] h-[540px] px-5 py-[3.75rem] bg-[rgba(255,255,255,0.1)] overflow-hidden z-[100] animate-fade-in-opacity">
        <div
          className="absolute inset-0 bg-cover bg-center blur-[2px] z-[101]"
          style={{ backgroundImage: `url(${program.image})` }}
        />
        <button
          className="absolute top-[1rem] right-[1rem] z-[102] rounded-full border-none p-2"
          onClick={onClose}
        >
          <Icon icon="Clear" alt="닫기" />
        </button>
        <div className="relative flex flex-col gap-[1.875rem] z-[102]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-4">
                <span className="flex items-center justify-center h-[18px] px-[5px] py-[1px] rounded-[2px] bg-[#d2d2d2] text-[#b51f1f] text-sm font-normal">
                  {program.year}
                </span>
                <span
                  className={`flex items-center justify-center h-[18px] px-[5px] py-[1px] rounded-[2px] text-white text-[0.75rem] font-normal ${
                    program.season === "summer"
                      ? "bg-[#B77778]"
                      : "bg-[#7794B7]"
                  }`}
                >
                  {getFormattedSeason(program.season)}
                </span>
              </div>
              <h2 className="text-white text-3xl font-bold" id={titleId}>
                {program.name}
              </h2>
            </div>
            <div className="flex flex-col gap-[0.1365rem]" id={descriptionId}>
              {renderDescription(
                "기간",
                `${program.period.start} ~ ${program.period.end}`
              )}
              {renderDescription("내용", program.description)}
              {renderDescription("장소", program.location)}
              {renderDescription("코칭 스탭", program.staff)}
            </div>
          </div>
          <hr className="fill-white" aria-hidden />
          {program.result && (
            <div className="flex flex-col gap-3">
              <h2 className="text-white text-xl font-bold">
                동계 훈련 참여 결과
              </h2>
              <div className="flex flex-col gap-[0.625rem] pl-[0.625rem]">
                <span className="text-white text-sm font-normal whitespace-break-spaces">
                  {program.result}
                </span>
                {program.link && (
                  <a
                    className="text-white font-bold text-sm underline"
                    target="_blank"
                    href={program.link}
                    style={{
                      textUnderlinePosition: "under",
                    }}
                  >
                    {program.linkLabel ?? "결과 바로 가기"}
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};
