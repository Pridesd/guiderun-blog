import { Metadata } from "next"
import { notFound } from "next/navigation"
import { asImageSrc } from "@prismicio/client"
import { SliceZone } from "@prismicio/react"

import { createClient } from "@/prismicio"
import { components } from "@/slices"
import { Header } from "@/components/shared"
import {
  GuiderunLink,
  LikeButton,
  TeamProfile,
  TitleSection,
} from "@/domains/blog/[uid]"
import Image from "next/image"
import Logo from "@/assets/head/logo.webp"
import OgImage from "@/assets/head/og-image.jpg"
import Link from "next/link"

type Params = { uid: string }

const DEFAULT_TITLE = "가이드런 이야기"

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { uid } = await params
  const id = decodeURIComponent(uid)

  const client = createClient()

  const page = await client.getByUID("blog_post", id).catch(() => notFound())

  return (
    <>
      <Header />
      <TitleSection
        title={page.data.title ?? DEFAULT_TITLE}
        category={page.data.category}
        author={page.data.author}
        publishedDate={page.first_publication_date.split("T")[0]}
      />
      <div className="flex justify-center px-[2rem]">
        <Image
          src={page.data.title_image?.url ?? Logo}
          alt={page.data.title_image?.alt ?? ""}
          width={2000}
          height={2000}
          className={`mt-[1.5rem] w-full rounded-3xl md:mt-[4.125rem] ${page.data.title_image?.url ? "w-full md:w-[70%] md:max-w-[600px]" : "w-full md:w-[40%]"}`}
        />
      </div>
      <main className="mx-auto px-[1.5rem] pb-[3rem]">
        {page.data.slices.length > 0 && (
          <div className="blog-post -mt-[4rem]">
            <SliceZone slices={page.data.slices} components={components} />
          </div>
        )}
        <div className="mx-auto md:max-w-[720px]">
          <div className="px-6 pb-6">
            <LikeButton id={uid} />
          </div>
          <GuiderunLink />
          <TeamProfile />
          <div className="flex justify-center">
            <Link
              href="/blog"
              className="rounded-full bg-gray-100 px-5 py-4 font-bold">
              블로그 목록
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { uid } = await params
  const client = createClient()
  const page = await client.getByUID("blog_post", uid).catch(() => notFound())

  return {
    title: `${page.data.meta_title ?? page.data.title} | 블로그 | 가이드런 프로젝트`,
    description: page.data.meta_description ?? "가이드런 프로젝트의 이야기",
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? OgImage.src }],
      title: `${page.data.meta_title ?? page.data.title} | 블로그 | 가이드런 프로젝트`,
      description: page.data.meta_description ?? "가이드런 프로젝트의 이야기",
    },
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType("blog_post")

  return pages.map((page) => ({ uid: page.uid }))
}
