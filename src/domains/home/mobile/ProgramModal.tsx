import { getFormattedSeason, Program } from "./ProgramItem"
import {
  CloseButton,
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react"
import { Icon } from "@/components/shared"

interface PropgramModalProps {
  open: boolean
  onClose: VoidFunction
  program: Program
}

export const ProgramModal = ({
  open,
  program,
  onClose,
}: PropgramModalProps) => {
  const renderDescription = (title: string, data: string) => {
    return (
      <span className="text-sm font-normal whitespace-break-spaces text-white md:text-lg">{`${title}: ${data}`}</span>
    )
  }

  const titleId = `program-${program.year}-${program.season}-title`
  const descriptionId = `program-${program.year}-${program.season}-description`

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/60" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="animate-fade-in-opacity absolute top-1/2 left-1/2 z-[100] box-border h-[540px] w-[320px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[8px] bg-[rgba(255,255,255,0.1)] px-5 py-[3.75rem] md:h-full md:max-h-[90%] md:w-full md:max-w-[40%] md:px-[6.25rem] md:py-[7.5rem]">
            <div
              className="absolute inset-0 z-[101] bg-cover bg-center blur-[2px]"
              style={{ backgroundImage: `url(${program.image})` }}
            />
            <CloseButton
              className="absolute top-[1rem] right-[1rem] z-[102] cursor-pointer rounded-full border-none p-2"
              onClick={onClose}>
              <Icon icon="Clear" width={25} alt="닫기" />
            </CloseButton>
            <div className="relative z-[102] flex flex-col gap-[1.875rem]">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 md:gap-2.5">
                  <div className="flex gap-2 md:gap-4">
                    <span className="flex h-[18px] items-center justify-center rounded-[2px] bg-[#d2d2d2] px-[5px] py-[1px] text-sm font-normal text-[#b51f1f] md:h-[30px] md:text-xl">
                      {program.year}
                    </span>
                    <span
                      className={`flex h-[18px] items-center justify-center rounded-[2px] px-[5px] py-[1px] text-[0.75rem] font-normal text-white md:h-[30px] md:text-xl ${
                        program.season === "summer"
                          ? "bg-[#B77778]"
                          : "bg-[#7794B7]"
                      }`}>
                      {getFormattedSeason(program.season)}
                    </span>
                  </div>
                  <DialogTitle
                    className="text-3xl leading-normal font-bold text-white md:text-4xl"
                    id={titleId}>
                    {program.name}
                  </DialogTitle>
                </div>
                <Description
                  className="flex flex-col gap-[0.1365rem]"
                  id={descriptionId}>
                  {renderDescription(
                    "기간",
                    `${program.period.start} ~ ${program.period.end}`
                  )}
                  {renderDescription("내용", program.description)}
                  {renderDescription("장소", program.location)}
                  {renderDescription("코칭 스탭", program.staff)}
                </Description>
              </div>
              <hr className="border-white" aria-hidden />
              {program.result && (
                <div className="flex flex-col gap-3 md:gap-6">
                  <h2 className="text-xl font-bold text-white md:text-3xl">
                    동계 훈련 참여 결과
                  </h2>
                  <div className="flex flex-col gap-[0.625rem] pl-[0.625rem] md:gap-4">
                    <span className="text-sm font-normal whitespace-break-spaces text-white md:text-lg">
                      {program.result}
                    </span>
                    {program.link && (
                      <a
                        className="text-sm font-bold text-white underline md:text-lg"
                        target="_blank"
                        href={program.link}
                        style={{
                          textUnderlinePosition: "under",
                        }}>
                        {program.linkLabel ?? "결과 바로 가기"}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
