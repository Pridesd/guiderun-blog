import { NextRequest, NextResponse } from "next/server"

import {
  CommentValidationError,
  type CommentInput,
} from "@/domains/blog/[uid]/comment-types"

import {
  CommentServiceError,
  createComment,
  listComments,
} from "./comment-service"

export const dynamic = "force-dynamic"

function jsonNoStore(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  })
}

function handleError(error: unknown) {
  console.error("Comments API Error:", error)

  if (error instanceof CommentValidationError) {
    return jsonNoStore({ error: error.message }, 400)
  }

  if (error instanceof CommentServiceError) {
    return jsonNoStore({ error: error.message }, error.status)
  }

  const message =
    error instanceof Error ? error.message : "Internal Server Error"

  return jsonNoStore(
    {
      error: "Google Sheets API와 통신 중 오류가 발생했습니다.",
      details: message,
    },
    500
  )
}

async function parseCommentInput(request: NextRequest) {
  try {
    return (await request.json()) as CommentInput
  } catch {
    throw new CommentServiceError("잘못된 요청입니다.", 400)
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    return jsonNoStore(await listComments(id))
  } catch (error) {
    return handleError(error)
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const input = await parseCommentInput(request)

    return jsonNoStore(await createComment(id, input))
  } catch (error) {
    return handleError(error)
  }
}
