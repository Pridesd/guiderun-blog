import Logo from "@/assets/head/logo.webp"

import { AllDocumentTypes } from "../../../../prismicio-types"
import Link from "next/link"
import Image from "next/image"

interface BlogPostItemProps {
  post: AllDocumentTypes
}

export const BlogPostItem = ({ post }: BlogPostItemProps) => {
  const titleImage = post.data.title_image?.url ?? Logo
  const publishedDate = post.first_publication_date.split("T")[0]

  return (
    <div className="min-h-[20rem] w-[22.5rem] md:min-h-[26.25rem] md:w-[27.5rem]">
      <Link href={post.url ?? "/blog"} className="w-full">
        <Image
          src={titleImage}
          alt=""
          className="h-[12.5rem] w-full rounded-lg border-[1px] border-gray-100 object-contain md:h-[15.375rem]"
        />
        <h2 className="mt-3 text-2xl font-semibold break-words whitespace-break-spaces md:mt-5">
          {post.data.title}
        </h2>
        <div className="mt-[1.125rem] flex items-center justify-between">
          <span className="rounded-full bg-slate-100 px-[0.625rem] py-1 text-slate-600">
            {post.data.category}
          </span>
          <span className="text-slate-500">{publishedDate}</span>
        </div>
      </Link>
    </div>
  )
}
