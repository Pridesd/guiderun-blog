interface TitleSectionProps {
  title: string
  category: string
  publishedDate: string
}

export const TitleSection = ({
  category,
  publishedDate,
  title,
}: TitleSectionProps) => {
  return (
    <div className="flex flex-col items-center gap-3 pt-[5.5rem]">
      <h1 className="text-center text-[2rem] font-bold whitespace-break-spaces md:text-[2.625rem]">
        {title}
      </h1>
      <p className="tracking-wide text-gray-500">{`${category} | ${publishedDate}`}</p>
    </div>
  )
}
