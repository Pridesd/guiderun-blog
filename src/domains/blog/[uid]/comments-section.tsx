"use client"

import axios from "axios"
import type { FormEvent } from "react"
import { useEffect, useState } from "react"

import { CommentForm } from "./comment-form"
import { CommentItem } from "./comment-item"
import {
  BLOG_COMMENT_IDS_STORAGE_KEY,
  COMMENT_AUTHOR_MAX_LENGTH,
  COMMENT_CONTENT_MAX_LENGTH,
  DEFAULT_COMMENT_AUTHOR,
  CommentValidationError,
  type BlogComment,
  type CommentsResponse,
  type CreateCommentResponse,
  type DeleteCommentResponse,
  type OwnedCommentMap,
  type UpdateCommentResponse,
  sortCommentsByNewest,
  validateCommentInput,
} from "./comment-types"

interface CommentsSectionProps {
  id: string
}

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.error ?? "오류가 발생했습니다. 다시 시도해주세요."
    )
  }

  if (error instanceof Error) {
    return error.message
  }

  return "오류가 발생했습니다. 다시 시도해주세요."
}

function readOwnedCommentMap() {
  if (typeof window === "undefined") {
    return {}
  }

  try {
    const storedValue = localStorage.getItem(BLOG_COMMENT_IDS_STORAGE_KEY)

    if (!storedValue) {
      return {}
    }

    const parsedValue = JSON.parse(storedValue)

    if (
      !parsedValue ||
      typeof parsedValue !== "object" ||
      Array.isArray(parsedValue)
    ) {
      return {}
    }

    return Object.fromEntries(
      Object.entries(parsedValue).map(([postId, commentIds]) => [
        postId,
        Array.isArray(commentIds)
          ? Array.from(
              new Set(
                commentIds.filter(
                  (commentId): commentId is string =>
                    typeof commentId === "string" && commentId.length > 0
                )
              )
            )
          : [],
      ])
    ) as OwnedCommentMap
  } catch {
    return {}
  }
}

function persistOwnedCommentIds(postId: string, commentIds: string[]) {
  const ownedCommentMap = readOwnedCommentMap()
  const nextCommentIds = Array.from(new Set(commentIds))

  if (nextCommentIds.length > 0) {
    ownedCommentMap[postId] = nextCommentIds
  } else {
    delete ownedCommentMap[postId]
  }

  localStorage.setItem(
    BLOG_COMMENT_IDS_STORAGE_KEY,
    JSON.stringify(ownedCommentMap)
  )

  return nextCommentIds
}

export const CommentsSection = ({ id }: CommentsSectionProps) => {
  const commentsEndpoint = `/api/posts/${id}/comments`

  const [comments, setComments] = useState<BlogComment[]>([])
  const [author, setAuthor] = useState(DEFAULT_COMMENT_AUTHOR)
  const [content, setContent] = useState("")
  const [ownedCommentIds, setOwnedCommentIds] = useState<string[]>([])
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)
  const [reloadToken, setReloadToken] = useState(0)

  const resetForm = () => {
    setAuthor(DEFAULT_COMMENT_AUTHOR)
    setContent("")
    setEditingCommentId(null)
    setFormError(null)
  }

  useEffect(() => {
    setOwnedCommentIds(readOwnedCommentMap()[id] ?? [])
  }, [id])

  useEffect(() => {
    let isCancelled = false

    const fetchComments = async () => {
      setIsLoading(true)
      setLoadError(null)

      try {
        const response = await axios.get<CommentsResponse>(commentsEndpoint)

        if (!isCancelled) {
          setComments(sortCommentsByNewest(response.data.comments))
        }
      } catch (error) {
        if (!isCancelled) {
          setLoadError(getErrorMessage(error))
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    void fetchComments()

    return () => {
      isCancelled = true
    }
  }, [commentsEndpoint, id, reloadToken])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    try {
      const payload = validateCommentInput({ author, content })

      setIsSubmitting(true)
      setFormError(null)

      if (editingCommentId) {
        const response = await axios.patch<UpdateCommentResponse>(
          `${commentsEndpoint}/${editingCommentId}`,
          payload
        )

        setComments((prevComments) =>
          sortCommentsByNewest(
            prevComments.map((comment) =>
              comment.id === editingCommentId ? response.data.comment : comment
            )
          )
        )
        resetForm()
        return
      }

      const response = await axios.post<CreateCommentResponse>(
        commentsEndpoint,
        payload
      )

      setComments((prevComments) =>
        sortCommentsByNewest([response.data.comment, ...prevComments])
      )
      setOwnedCommentIds((prevCommentIds) =>
        persistOwnedCommentIds(id, [
          ...prevCommentIds,
          response.data.comment.id,
        ])
      )
      resetForm()
    } catch (error) {
      if (error instanceof CommentValidationError) {
        setFormError(error.message)
      } else {
        setFormError(getErrorMessage(error))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (comment: BlogComment) => {
    setEditingCommentId(comment.id)
    setAuthor(comment.author)
    setContent(comment.content)
    setFormError(null)
  }

  const handleDelete = async (commentId: string) => {
    if (!window.confirm("댓글을 삭제할까요?")) {
      return
    }

    try {
      setPendingDeleteId(commentId)

      await axios.delete<DeleteCommentResponse>(
        `${commentsEndpoint}/${commentId}`
      )

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      )
      setOwnedCommentIds((prevCommentIds) =>
        persistOwnedCommentIds(
          id,
          prevCommentIds.filter(
            (storedCommentId) => storedCommentId !== commentId
          )
        )
      )

      if (editingCommentId === commentId) {
        resetForm()
      }
    } catch (error) {
      alert(getErrorMessage(error))
    } finally {
      setPendingDeleteId(null)
    }
  }

  const isSubmitDisabled =
    isSubmitting ||
    !content.trim() ||
    content.length > COMMENT_CONTENT_MAX_LENGTH ||
    author.trim().length > COMMENT_AUTHOR_MAX_LENGTH

  return (
    <section className="px-6 pb-10">
      <div className="mb-5">
        <h2 className="text-[1.625rem] font-bold text-gray-900">
          댓글 {comments.length}
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          서로를 존중하는 댓글을 남겨주세요.
        </p>
      </div>
      <CommentForm
        author={author}
        content={content}
        errorMessage={formError}
        isEditing={editingCommentId !== null}
        isSubmitDisabled={isSubmitDisabled}
        isSubmitting={isSubmitting}
        onAuthorChange={setAuthor}
        onContentChange={setContent}
        onCancelEdit={resetForm}
        onSubmit={handleSubmit}
      />
      <div className="mt-8">
        {loadError && (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            <p>{loadError}</p>
            <button
              type="button"
              className="mt-3 font-semibold underline underline-offset-4"
              onClick={() => setReloadToken((prevToken) => prevToken + 1)}>
              다시 시도
            </button>
          </div>
        )}
        {!loadError && isLoading && (
          <p className="py-6 text-sm text-gray-400">불러오는 중...</p>
        )}
        {!isLoading && comments.length === 0 && !loadError && (
          <p className="py-6 text-sm text-gray-400">첫 댓글을 남겨보세요.</p>
        )}
        {comments.length > 0 && (
          <ul className="divide-y divide-gray-200">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                isOwned={ownedCommentIds.includes(comment.id)}
                isActionDisabled={isSubmitting || pendingDeleteId !== null}
                isDeleting={pendingDeleteId === comment.id}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
