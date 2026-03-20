export type BlogComment = {
  id: string
  postId: string
  author: string
  content: string
  createdAt: string
  updatedAt: string | null
}

export type OwnedCommentMap = Record<string, string[]>

export type CommentInput = {
  author?: string
  content: string
}

export type CommentsResponse = {
  postId: string
  count: number
  comments: BlogComment[]
}

export type CreateCommentResponse = {
  postId: string
  count: number
  comment: BlogComment
}

export type UpdateCommentResponse = {
  postId: string
  comment: BlogComment
}

export type DeleteCommentResponse = {
  postId: string
  deletedCommentId: string
  count: number
}

export const DEFAULT_COMMENT_AUTHOR = "익명의 러너"
export const COMMENT_AUTHOR_MAX_LENGTH = 20
export const COMMENT_CONTENT_MAX_LENGTH = 500
export const BLOG_COMMENT_IDS_STORAGE_KEY = "BLOG_COMMENT_IDS"
export const COMMENT_SHEET_TITLE = "comments"
export const COMMENT_SHEET_HEADERS = [
  "Comment Id",
  "Blog Id",
  "Author",
  "Content",
  "Created At",
  "Updated At",
] as const

export class CommentValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "CommentValidationError"
  }
}

export function normalizeCommentAuthor(author?: string | null) {
  const normalizedAuthor = author?.trim() ?? ""

  if (!normalizedAuthor) {
    return DEFAULT_COMMENT_AUTHOR
  }

  return normalizedAuthor
}

export function normalizeCommentContent(content?: string | null) {
  return content?.trim() ?? ""
}

export function validateCommentInput(input: {
  author?: string | null
  content?: string | null
}) {
  const author = normalizeCommentAuthor(input.author)
  const content = normalizeCommentContent(input.content)

  if (author.length > COMMENT_AUTHOR_MAX_LENGTH) {
    throw new CommentValidationError(
      `작성자는 ${COMMENT_AUTHOR_MAX_LENGTH}자 이하로 입력해주세요.`
    )
  }

  if (!content) {
    throw new CommentValidationError("댓글 내용을 입력해주세요.")
  }

  if (content.length > COMMENT_CONTENT_MAX_LENGTH) {
    throw new CommentValidationError(
      `댓글은 ${COMMENT_CONTENT_MAX_LENGTH}자 이하로 입력해주세요.`
    )
  }

  return {
    author,
    content,
  }
}

export function sortCommentsByNewest(comments: BlogComment[]) {
  return [...comments].sort((left, right) => {
    const leftTime = new Date(left.createdAt).getTime()
    const rightTime = new Date(right.createdAt).getTime()

    return rightTime - leftTime
  })
}
