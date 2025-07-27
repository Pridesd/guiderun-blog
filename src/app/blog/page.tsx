import { BlogListLayout } from "@/domains/blog"
import { Metadata } from "next"
import OGImage from "@/assets/head/og-image.jpg"

const BlogListPage = () => {
  return <BlogListLayout />
}

export default BlogListPage

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "블로그 | 가이드런 프로젝트",
    description:
      "시각장애러너와 가이드러너가 함께 만들어가는 가이드런 프로젝트입니다. 함께 달려요!",
    openGraph: {
      images: [{ url: OGImage.src }],
      title: "블로그 | 가이드런 프로젝트",
      description: "함께 달려요!",
    },
  }
}
