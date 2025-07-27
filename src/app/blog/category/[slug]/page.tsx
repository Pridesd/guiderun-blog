import { BlogListLayout } from "@/domains/blog"
import { Category } from "@/domains/blog/list"
import { redirect } from "next/navigation"

const CategorizedBlogListPage = async ({
  params,
}: {
  params: Promise<{ slug: Category }>
}) => {
  const category = (await params).slug

  if (category !== "service" && category !== "training") {
    redirect("/blog")
  }

  return <BlogListLayout currentCategory={category} />
}

export default CategorizedBlogListPage
