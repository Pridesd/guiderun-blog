import Background from "@/assets/home/guiderun-final.png";
import { Icon } from "@/components/animations/shared";

export const Final = () => {
  return (
    <div className="box-border w-full h-[220px] relative bg-black px-[3.75rem] py-10">
      {/* Image Background */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${Background.src})` }}
      />

      {/* Main Content */}
      <div className="relative flex flex-col items-start gap-3 z-[1]">
        <h2 className="text-[1.25rem] text-white whitespace-break-spaces font-bold">
          {`시각장애러너와 가이드러너\n함께 더 멀리 달려요!`}
        </h2>
        <a
          href="https://guiderun.org/intro"
          className="no-underline text-white h-[50px] pr-4 pl-6 flex items-center justify-center gap-3 border-[1.5px] border-white rounded-full"
        >
          <span className="font-medium text-sm text-white">
            가이드런 가입하기
          </span>
          <Icon icon="ArrowRightWhite" alt="" />
        </a>
      </div>
    </div>
  );
};
