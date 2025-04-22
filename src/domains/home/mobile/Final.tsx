import Background from "@/assets/home/guiderun-final.png"
import { DynamicIcon } from "@/components/shared"

export const Final = () => {
  return (
    <div className="relative box-border h-[220px] w-full bg-black px-[3.75rem] py-10 md:h-[700px] lg:h-[1100px]">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-bottom"
        style={{
          backgroundImage: `url(${Background.src})`,
        }}
      />
      <div className="relative z-1 flex flex-col items-start gap-3 md:absolute md:top-[20%] md:right-[20%] md:gap-6 lg:top-[20%] lg:right-[30%] lg:gap-6">
        <h2 className="text-[1.25rem] font-bold whitespace-break-spaces text-white md:text-3xl md:leading-[50px] lg:text-5xl lg:leading-[72px]">
          {`시각장애러너와 가이드러너\n함께 더 멀리 달려요!`}
        </h2>
        <a
          href="https://guiderun.org/intro"
          className="flex h-[50px] items-center justify-center gap-3 rounded-full border-[1.5px] border-white pr-4 pl-6 text-white no-underline md:h-[70px] lg:h-[100px]">
          <span className="text-sm font-medium text-white md:text-[1.25rem] lg:text-[2rem]">
            가이드런 가입하기
          </span>
          <DynamicIcon icon="ArrowRightWhite" desktopWidth={30} alt="" />
        </a>
      </div>
    </div>
  )
}
