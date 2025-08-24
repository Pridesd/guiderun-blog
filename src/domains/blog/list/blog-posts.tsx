import { createClient } from "@/prismicio"
import { filter } from "@prismicio/client"
import { Category } from "./category-filters"
import { BlogPostItem } from "./blog-post-item"

interface BlogPostsProps {
  filteredCategory?: Category
}

export const BlogPosts = async ({ filteredCategory }: BlogPostsProps) => {
  const client = createClient()

  const formatCategory = (category: Category) => {
    switch (category) {
      case "service":
        return "서비스"
      case "training":
        return "훈련"
      case "operation":
        return "운영"
    }
    return ""
  }

  const options: {
    filters?: string[]
    graphQuery?: string
  } = {}

  if (filteredCategory && filteredCategory !== "all") {
    options.filters = [
      filter.at("my.blog_post.category", formatCategory(filteredCategory)),
    ]
  }

  options.graphQuery = `{
    blog_post {
      title
      title_image
      category
      author
    }
  }`

  const posts = await client.getAllByType("blog_post", {
    ...options,
    orderings: { field: "document.first_publication_date", direction: "desc" },
  })

  return (
    <div className="mt-8 grid grid-cols-1 justify-center justify-items-center gap-y-6 lg:grid-cols-2 lg:gap-y-12">
      {posts.map((post) => (
        <BlogPostItem key={post.uid} post={post} />
      ))}
    </div>
  )
}
