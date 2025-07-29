import Image1 from "@/assets/image/blog-list-hero-1.jpeg"
import Image2 from "@/assets/image/blog-list-hero-2.jpeg"
import Image4 from "@/assets/image/blog-list-hero-4.png"
import Image5 from "@/assets/image/blog-list-hero-5.png"

import Image from "next/image"

const HERO_IMAGES = [
  {
    image: Image1,
    alt: "서울 여의도공원 대형 풍선 조형물 앞에서 겨울 옷을 입은 많은 사람들이 다 함께 모여 단체 기념사진을 찍고 있는 모습",
  },
  {
    image: Image2,
    alt: "눈이 펑펑 내리는 날, 여러 명의 사람들이 겨울 운동복을 입고 야외에서 함께 달리며 즐거워하는 모습",
  },
  {
    image: Image4,
    alt: "'삼성화재 안내견' 조끼를 입은 안내견(래브라도 리트리버)이 함께 있는 사람을 올려다보며 집중하고 있는 옆모습",
  },
  {
    image: Image5,
    alt: "상의를 탈의한 세 명의 남성이 가이드 러닝을 하며 녹음이 우거진 공원 길을 달리고 있는 뒷모습",
  },
]

export const HeroSection = () => {
  const heroIndex = Math.floor(Math.random() * 4)

  console.log(heroIndex)

  return (
    <div className="flex flex-col items-center gap-[1.75rem] pt-[5.5rem] pb-[5.25rem] md:gap-[2.75rem] md:pt-[6.5rem]">
      <Image
        src={HERO_IMAGES[heroIndex].image}
        alt={HERO_IMAGES[heroIndex].alt}
        className="w-full rounded-3xl md:w-[70%]"
      />
      <h1 className="flex flex-col items-center gap-3">
        <span className="text-xl font-bold lg:text-[1.625rem]">
          우리는 보이지 않는 길을 함께 달려요
        </span>
        <span className="text-sm lg:text-[#868b94]">
          가이드런 프로젝트 이야기
        </span>
      </h1>
    </div>
  )
}
