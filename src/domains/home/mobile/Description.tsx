import Background from "@/assets/home/landing-bacground.png";
import { StaggerAnimation } from "@/components/animations";

export const Description = () => {
  return (
    <div
      className="relative w-full h-[526px] bg-center bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${Background.src})` }}
    >
      <div className="absolute top-0 left-0 right-0 h-[60px] bg-gradient-to-t from-transparent to-[#f1f1f1] z-10" />

      <StaggerAnimation>
        <p>
          <span
            role="text"
            className="font-normal text-[1.125rem] leading-[28px] whitespace-break-spaces"
          >
            {`가이드런프로젝트는
시각장애러너와 가이드러너가 함께
같은 목표를 향해 팀으로서 더 체계적으로
훈련할 수 있도록 서포트 합니다.`}
          </span>
        </p>
      </StaggerAnimation>

      <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-b from-transparent to-[#fff] z-10" />
    </div>
  );
};
