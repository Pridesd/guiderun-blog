import { getLoadedSheet } from "@/utils/spreadsheet"
import { NextRequest, NextResponse } from "next/server"

function handleError(error: unknown) {
  console.error("Google Sheets API Error:", error)
  const message =
    error instanceof Error ? error.message : "Internal Server Error"
  return NextResponse.json(
    {
      error: "Google Sheets API와 통신 중 오류가 발생했습니다.",
      details: message,
    },
    { status: 500 }
  )
}

async function findRowByBlogId(id: string) {
  const doc = await getLoadedSheet()

  const sheet = doc.sheetsByTitle["likes"]
  if (!sheet) {
    throw new Error("Sheet 'likes' not found. (시트를 찾을 수 없습니다.)")
  }

  const rows = await sheet.getRows()

  const targetRow = rows.find((row) => row.get("Blog Id") === id)

  return { sheet, targetRow }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { targetRow } = await findRowByBlogId(id)

    let likeCount = 0

    if (targetRow) {
      likeCount = parseInt(targetRow.get("likes"), 10) || 0
    }

    return NextResponse.json({ blogId: id, likes: likeCount })
  } catch (error) {
    return handleError(error)
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { sheet, targetRow } = await findRowByBlogId(id)

    let newLikeCount = 0

    if (targetRow) {
      const currentLikes = parseInt(targetRow.get("likes"), 10) || 0
      newLikeCount = currentLikes + 1

      targetRow.set("likes", newLikeCount)
      await targetRow.save()
    } else {
      newLikeCount = 1
      await sheet.addRow({
        "Blog Id": id,
        likes: newLikeCount,
      })
    }

    return NextResponse.json({ blogId: id, likes: newLikeCount })
  } catch (error) {
    return handleError(error)
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { targetRow } = await findRowByBlogId(id)

    let newLikeCount = 0

    if (targetRow) {
      const currentLikes = parseInt(targetRow.get("likes"), 10) || 0

      newLikeCount = Math.max(0, currentLikes - 1)

      targetRow.set("likes", newLikeCount)
      await targetRow.save()
    }

    return NextResponse.json({ blogId: id, likes: newLikeCount })
  } catch (error) {
    return handleError(error)
  }
}
