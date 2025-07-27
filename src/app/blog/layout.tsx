import { PropsWithChildren } from "react"

const BlogLayout = ({ children }: PropsWithChildren) => {
  return <div className="min-h-dvh w-full min-w-screen">{children}</div>
}

export default BlogLayout
