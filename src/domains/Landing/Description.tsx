import Background from "@/assets/home/landing-background.png"
import { StaggerAnimation } from "@/components/animations"

export const Description = () => {
  return (
    <div
      className="relative flex h-[526px] w-full items-center justify-center bg-cover bg-center md:h-[800px]"
      style={{
        backgroundImage: `url(${Background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="absolute top-0 right-0 left-0 z-10 h-[60px] bg-gradient-to-t from-transparent to-[#f1f1f1] md:h-[120px]" />

      <StaggerAnimation>
        <p>
          <span
            tabIndex={1}
            role="text"
            className="text-[1.125rem] leading-[28px] font-normal whitespace-break-spaces md:text-[2.25rem] md:leading-[56px]">
            {`가이드런프로젝트는
시각장애러너와 가이드러너가 함께
같은 목표를 향해 팀으로서 더 체계적으로
훈련할 수 있도록 서포트 합니다.`}
          </span>
        </p>
      </StaggerAnimation>

      <div className="absolute right-0 bottom-0 left-0 z-10 h-[60px] bg-gradient-to-b from-transparent to-[#fff] md:h-[120px]" />
    </div>
  )
}
