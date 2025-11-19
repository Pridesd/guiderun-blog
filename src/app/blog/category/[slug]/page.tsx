import { BlogListLayout } from "@/domains/blog"
import { Category, CATEGORY_LIST } from "@/domains/blog/list"
import { redirect } from "next/navigation"

const CategorizedBlogListPage = async ({
  params,
}: {
  params: Promise<{ slug: Category }>
}) => {
  const category = (await params).slug

  const allCategories = Object.keys(CATEGORY_LIST)

  if (category === "all" || !allCategories.includes(category)) {
    redirect("/blog")
  }

  return <BlogListLayout currentCategory={category} />
}

export default CategorizedBlogListPage
