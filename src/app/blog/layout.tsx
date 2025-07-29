import { Metadata } from "next"
import { PropsWithChildren } from "react"

const BlogLayout = ({ children }: PropsWithChildren) => {
  return <div className="min-h-dvh w-full min-w-screen">{children}</div>
}

export default BlogLayout

export const generateMetadata = (): Metadata => {
  return {
    title: "블로그 | ",
  }
}
