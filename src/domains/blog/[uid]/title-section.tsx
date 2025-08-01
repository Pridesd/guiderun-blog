import { KeyTextField } from "@prismicio/client"

interface TitleSectionProps {
  title: string
  category: string
  publishedDate: string
  author?: KeyTextField
}

export const TitleSection = ({
  category,
  publishedDate,
  title,
  author,
}: TitleSectionProps) => {
  return (
    <div className="flex flex-col items-center gap-3 pt-[5.5rem]">
      <h1 className="text-center text-[2rem] font-bold whitespace-break-spaces md:text-[2.625rem]">
        {title}
      </h1>
      <p className="tracking-wide text-gray-500">{`${author || "팀 가이드런"} | ${category} | ${publishedDate}`}</p>
    </div>
  )
}
