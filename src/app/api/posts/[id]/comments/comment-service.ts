import type { GoogleSpreadsheetRow } from "google-spreadsheet"

import {
  COMMENT_SHEET_HEADERS,
  COMMENT_SHEET_TITLE,
  type BlogComment,
  type CommentInput,
  sortCommentsByNewest,
  validateCommentInput,
} from "@/domains/blog/[uid]/comment-types"
import { getOrCreateSheet } from "@/utils/spreadsheet"

type CommentRow = {
  "Comment Id": string
  "Blog Id": string
  Author: string
  Content: string
  "Created At": string
  "Updated At": string
}

export class CommentServiceError extends Error {
  status: number

  constructor(message: string, status = 500) {
    super(message)
    this.name = "CommentServiceError"
    this.status = status
  }
}

async function getCommentSheet() {
  return getOrCreateSheet(COMMENT_SHEET_TITLE, [...COMMENT_SHEET_HEADERS])
}

async function getCommentRows() {
  const sheet = await getCommentSheet()
  const rows = await sheet.getRows<CommentRow>()

  return { sheet, rows }
}

function mapRowToComment(row: GoogleSpreadsheetRow<CommentRow>): BlogComment {
  return {
    id: row.get("Comment Id"),
    postId: row.get("Blog Id"),
    author: row.get("Author"),
    content: row.get("Content"),
    createdAt: row.get("Created At"),
    updatedAt: row.get("Updated At") || null,
  }
}

function filterRowsByPostId(
  rows: GoogleSpreadsheetRow<CommentRow>[],
  postId: string
) {
  return rows.filter((row) => row.get("Blog Id") === postId)
}

export async function listComments(postId: string) {
  const { rows } = await getCommentRows()
  const comments = sortCommentsByNewest(
    filterRowsByPostId(rows, postId).map(mapRowToComment)
  )

  return {
    postId,
    count: comments.length,
    comments,
  }
}

export async function createComment(postId: string, input: CommentInput) {
  const { author, content } = validateCommentInput(input)
  const { sheet, rows } = await getCommentRows()
  const currentCount = filterRowsByPostId(rows, postId).length
  const timestamp = new Date().toISOString()
  const comment: BlogComment = {
    id: crypto.randomUUID(),
    postId,
    author,
    content,
    createdAt: timestamp,
    updatedAt: null,
  }

  await sheet.addRow({
    "Comment Id": comment.id,
    "Blog Id": comment.postId,
    Author: comment.author,
    Content: comment.content,
    "Created At": comment.createdAt,
    "Updated At": "",
  })

  return {
    postId,
    count: currentCount + 1,
    comment,
  }
}

async function findCommentRow(postId: string, commentId: string) {
  const { rows } = await getCommentRows()
  const targetRow = rows.find(
    (row) =>
      row.get("Blog Id") === postId && row.get("Comment Id") === commentId
  )

  if (!targetRow) {
    throw new CommentServiceError("댓글을 찾을 수 없습니다.", 404)
  }

  return {
    rows,
    targetRow,
  }
}

export async function updateComment(
  postId: string,
  commentId: string,
  input: CommentInput
) {
  const { author, content } = validateCommentInput(input)
  const { targetRow } = await findCommentRow(postId, commentId)
  const updatedAt = new Date().toISOString()

  targetRow.set("Author", author)
  targetRow.set("Content", content)
  targetRow.set("Updated At", updatedAt)
  await targetRow.save()

  return {
    postId,
    comment: {
      id: commentId,
      postId,
      author,
      content,
      createdAt: targetRow.get("Created At"),
      updatedAt,
    },
  }
}

export async function deleteComment(postId: string, commentId: string) {
  const { rows, targetRow } = await findCommentRow(postId, commentId)
  const currentCount = filterRowsByPostId(rows, postId).length

  await targetRow.delete()

  return {
    postId,
    deletedCommentId: commentId,
    count: Math.max(0, currentCount - 1),
  }
}
