import { Footer } from "@/components/shared"
import { Metadata } from "next"
import { PropsWithChildren } from "react"

const BlogLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-dvh w-full min-w-screen">
      {children}
      <Footer color="grey" />
    </div>
  )
}

export default BlogLayout

export const generateMetadata = (): Metadata => {
  return {
    title: "블로그 | ",
  }
}
