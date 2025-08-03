import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

/**
 * This endpoint purges Prismic content from Next.js' cache. It is called when
 * content is published in Prismic.
 */
export async function POST(request: NextRequest) {
  // 1. 요청 본문(body)을 JSON으로 파싱
  const body = await request.json()

  if (body.secret !== process.env.PRISMIC_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }

  const pathToRevalidate = `/blog/${body.documents[0]}`

  try {
    revalidatePath("/blog")
    revalidatePath(pathToRevalidate)
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json(
      { message: `Error revalidating`, err },
      { status: 500 }
    )
  }
}
