import { HiddenText } from "@/components/shared"
import Link from "next/link"

export type Category = "all" | "training" | "service"

interface CategoryFiltersProps {
  currentCategory?: Category
}

const CATEGORIES: { key: Category; path: string; label: string }[] = [
  { key: "all", path: "/", label: "전체" },
  { key: "training", path: "/category/training", label: "훈련" },
  { key: "service", path: "/category/service", label: "서비스" },
]

export const CategoryFilters = ({
  currentCategory = "all",
}: CategoryFiltersProps) => {
  return (
    <div id="_category" className="flex items-center gap-2">
      {CATEGORIES.map((category) => (
        <Link
          key={category.key}
          aria-pressed={category.key === currentCategory}
          href={`/blog${category.path}/#_category`}
          className={`flex items-center justify-center rounded-full px-3.5 py-2 hover:bg-black hover:text-white ${category.key === currentCategory ? "bg-black text-white" : "bg-gray-200 text-gray-700"}`}>
          {category.label}
          <HiddenText>게시글만 필터링하기</HiddenText>
        </Link>
      ))}
    </div>
  )
}
