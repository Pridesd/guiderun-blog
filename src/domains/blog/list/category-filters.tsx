import { HiddenText } from "@/components/shared"
import Link from "next/link"

export type Category =
  | "all"
  | "training"
  | "service"
  | "operation"
  | "media"
  | "race"

export const CATEGORY_LIST: Record<Category, { path: string; label: string }> =
  {
    all: {
      label: "전체",
      path: "/",
    },
    training: {
      label: "훈련",
      path: "/category/training",
    },
    service: {
      label: "서비스",
      path: "/category/service",
    },
    race: {
      label: "대회",
      path: "/category/race",
    },
    operation: {
      label: "운영",
      path: "/category/operation",
    },
    media: {
      label: "미디어",
      path: "/category/media",
    },
  }

interface CategoryFiltersProps {
  currentCategory?: Category
}

const CATEGORIES: { key: Category; path: string; label: string }[] =
  Object.entries(CATEGORY_LIST).map(([key, value]) => ({
    key: key as Category,
    ...value,
  }))

export const CategoryFilters = ({
  currentCategory = "all",
}: CategoryFiltersProps) => {
  return (
    <div
      id="_category"
      className="scrollbar-hide flex items-center gap-2 overflow-y-auto md:px-10">
      {CATEGORIES.map((category) => (
        <Link
          key={category.key}
          aria-pressed={category.key === currentCategory}
          href={`/blog${category.path}/#_category`}
          className={`flex items-center justify-center rounded-full px-3.5 py-2 whitespace-nowrap hover:bg-black hover:text-white ${category.key === currentCategory ? "bg-black text-white" : "bg-gray-200 text-gray-700"}`}>
          {category.label}
          <HiddenText>게시글만 필터링하기</HiddenText>
        </Link>
      ))}
    </div>
  )
}
