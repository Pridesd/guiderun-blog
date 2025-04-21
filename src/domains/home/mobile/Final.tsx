import Background from "@/assets/home/guiderun-final.png"
import { Icon } from "@/components/shared"

export const Final = () => {
  return (
    <div className="relative box-border h-[220px] w-full bg-black px-[3.75rem] py-10">
      {/* Image Background */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${Background.src})` }}
      />

      {/* Main Content */}
      <div className="relative z-[1] flex flex-col items-start gap-3">
        <h2 className="text-[1.25rem] font-bold whitespace-break-spaces text-white">
          {`시각장애러너와 가이드러너\n함께 더 멀리 달려요!`}
        </h2>
        <a
          href="https://guiderun.org/intro"
          className="flex h-[50px] items-center justify-center gap-3 rounded-full border-[1.5px] border-white pr-4 pl-6 text-white no-underline">
          <span className="text-sm font-medium text-white">
            가이드런 가입하기
          </span>
          <Icon icon="ArrowRightWhite" alt="" />
        </a>
      </div>
    </div>
  )
}
