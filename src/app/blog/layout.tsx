import { PropsWithChildren } from "react"

const BlogLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-dvh w-full min-w-screen bg-[#F2F2F2]">{children}</div>
  )
}

export default BlogLayout
