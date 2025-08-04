import { createClient } from "@/prismicio"

export default async function sitemap() {
  const baseUrl = "https://about.guiderun.org"

  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      priority: 1,
    },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.8 },
  ]

  const client = createClient()
  const blogPosts = await client.getAllByType("blog_post")

  const dynamicRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.uid}`,
    lastModified: new Date(post.last_publication_date),
    priority: 0.7,
  }))

  return [...staticRoutes, ...dynamicRoutes]
}
