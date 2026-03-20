"use client"

import axios from "axios"
import type { FormEvent } from "react"
import { useEffect, useRef, useState } from "react"

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

type Announcement = {
  id: number
  politeness: "polite" | "assertive"
  message: string
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

function replaceCommentId(
  commentIds: string[],
  previousId: string,
  nextId: string
) {
  return commentIds.map((commentId) =>
    commentId === previousId ? nextId : commentId
  )
}

export const CommentsSection = ({ id }: CommentsSectionProps) => {
  const commentsEndpoint = `/api/posts/${id}/comments`
  const headingRef = useRef<HTMLHeadingElement>(null)

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
  const [focusRequestToken, setFocusRequestToken] = useState(0)
  const [focusTarget, setFocusTarget] = useState<"author" | "content" | null>(
    null
  )
  const [pendingFocusCommentId, setPendingFocusCommentId] = useState<
    string | null
  >(null)
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)

  const authorErrorMessage = formError?.startsWith("작성자는")
    ? formError
    : null
  const contentErrorMessage =
    formError === "댓글 내용을 입력해주세요." || formError?.startsWith("댓글은")
      ? formError
      : null
  const generalErrorMessage =
    formError && !authorErrorMessage && !contentErrorMessage ? formError : null

  const announce = (
    message: string,
    politeness: Announcement["politeness"] = "polite"
  ) => {
    setAnnouncement({
      id: Date.now(),
      politeness,
      message,
    })
  }

  const requestFormFocus = (target: "author" | "content") => {
    setFocusTarget(target)
    setFocusRequestToken((prevToken) => prevToken + 1)
  }

  const resetForm = () => {
    setAuthor(DEFAULT_COMMENT_AUTHOR)
    setContent("")
    setEditingCommentId(null)
    setFormError(null)
  }

  useEffect(() => {
    if (!pendingFocusCommentId) {
      return
    }

    const frameId = window.requestAnimationFrame(() => {
      document.getElementById(`comment-item-${pendingFocusCommentId}`)?.focus()
    })

    setPendingFocusCommentId(null)

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [comments, pendingFocusCommentId])

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
          const message = getErrorMessage(error)
          setLoadError(message)
          announce(message, "assertive")
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
      const formSnapshot = { author, content }

      setIsSubmitting(true)
      setFormError(null)

      if (editingCommentId) {
        const previousComments = comments
        const originalComment = comments.find(
          (comment) => comment.id === editingCommentId
        )

        if (!originalComment) {
          throw new Error("댓글을 찾을 수 없습니다.")
        }

        const optimisticComment: BlogComment = {
          ...originalComment,
          author: payload.author,
          content: payload.content,
          updatedAt: new Date().toISOString(),
        }

        setComments((prevComments) =>
          sortCommentsByNewest(
            prevComments.map((comment) =>
              comment.id === editingCommentId ? optimisticComment : comment
            )
          )
        )
        resetForm()
        announce("댓글을 저장하고 있습니다.")

        try {
          const response = await axios.patch<UpdateCommentResponse>(
            `${commentsEndpoint}/${editingCommentId}`,
            payload
          )

          setComments((prevComments) =>
            sortCommentsByNewest(
              prevComments.map((comment) =>
                comment.id === editingCommentId
                  ? response.data.comment
                  : comment
              )
            )
          )
          setPendingFocusCommentId(response.data.comment.id)
          announce("댓글이 수정되었습니다.")
        } catch (error) {
          const message = getErrorMessage(error)

          setComments(previousComments)
          setEditingCommentId(originalComment.id)
          setAuthor(formSnapshot.author)
          setContent(formSnapshot.content)
          setFormError(message)
          announce(message, "assertive")
          requestFormFocus("content")
        } finally {
          setIsSubmitting(false)
        }

        return
      }

      const previousComments = comments
      const previousOwnedCommentIds = ownedCommentIds
      const optimisticCommentId = `temp-${crypto.randomUUID()}`
      const nextCommentCount = comments.length + 1
      const optimisticComment: BlogComment = {
        id: optimisticCommentId,
        postId: id,
        author: payload.author,
        content: payload.content,
        createdAt: new Date().toISOString(),
        updatedAt: null,
      }

      setComments((prevComments) =>
        sortCommentsByNewest([optimisticComment, ...prevComments])
      )
      setOwnedCommentIds((prevCommentIds) =>
        persistOwnedCommentIds(id, [...prevCommentIds, optimisticCommentId])
      )
      resetForm()
      requestFormFocus("content")
      announce("댓글을 저장하고 있습니다.")

      try {
        const response = await axios.post<CreateCommentResponse>(
          commentsEndpoint,
          payload
        )

        setComments((prevComments) =>
          sortCommentsByNewest(
            prevComments.map((comment) =>
              comment.id === optimisticCommentId
                ? response.data.comment
                : comment
            )
          )
        )
        setOwnedCommentIds((prevCommentIds) =>
          persistOwnedCommentIds(
            id,
            replaceCommentId(
              prevCommentIds,
              optimisticCommentId,
              response.data.comment.id
            )
          )
        )
        announce(
          `댓글이 등록되었습니다. 현재 댓글은 ${nextCommentCount}개입니다.`
        )
      } catch (error) {
        const message = getErrorMessage(error)

        setComments(previousComments)
        setOwnedCommentIds(persistOwnedCommentIds(id, previousOwnedCommentIds))
        setAuthor(formSnapshot.author)
        setContent(formSnapshot.content)
        setFormError(message)
        announce(message, "assertive")
        requestFormFocus("content")
      }
    } catch (error) {
      if (error instanceof CommentValidationError) {
        setFormError(error.message)
        announce(error.message, "assertive")
        requestFormFocus(
          error.message.startsWith("작성자는") ? "author" : "content"
        )
      } else {
        const message = getErrorMessage(error)
        setFormError(message)
        announce(message, "assertive")
        requestFormFocus("content")
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
    requestFormFocus("content")
    announce(`${comment.author} 댓글 수정 모드입니다.`)
  }

  const handleDelete = async (commentId: string) => {
    if (!window.confirm("댓글을 삭제할까요?")) {
      return
    }

    const previousComments = comments
    const previousOwnedCommentIds = ownedCommentIds
    const deletedComment = comments.find((comment) => comment.id === commentId)
    const wasEditingComment = editingCommentId === commentId

    if (!deletedComment) {
      announce("댓글을 찾을 수 없습니다.", "assertive")
      return
    }

    try {
      setPendingDeleteId(commentId)
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

      if (wasEditingComment) {
        resetForm()
      }
      headingRef.current?.focus()
      announce("댓글을 삭제하고 있습니다.")

      await axios.delete<DeleteCommentResponse>(
        `${commentsEndpoint}/${commentId}`
      )

      announce(
        `댓글이 삭제되었습니다. 현재 댓글은 ${Math.max(0, previousComments.length - 1)}개입니다.`
      )
    } catch (error) {
      const message = getErrorMessage(error)

      setComments(previousComments)
      setOwnedCommentIds(persistOwnedCommentIds(id, previousOwnedCommentIds))

      if (wasEditingComment) {
        setEditingCommentId(deletedComment.id)
        setAuthor(deletedComment.author)
        setContent(deletedComment.content)
        requestFormFocus("content")
      } else {
        setPendingFocusCommentId(deletedComment.id)
      }

      announce(message, "assertive")
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
    <section
      className="px-6 pb-10"
      aria-busy={isLoading || isSubmitting || pendingDeleteId !== null}>
      {announcement && (
        <p
          key={announcement.id}
          className="sr-only"
          aria-live={announcement.politeness}
          aria-atomic="true">
          {announcement.message}
        </p>
      )}
      <div className="mb-5">
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-[1.625rem] font-bold text-gray-900 outline-none focus:outline-2 focus:outline-offset-2 focus:outline-gray-900">
          댓글 {comments.length}
        </h2>
      </div>
      <CommentForm
        author={author}
        content={content}
        authorErrorMessage={authorErrorMessage}
        contentErrorMessage={contentErrorMessage}
        generalErrorMessage={generalErrorMessage}
        isEditing={editingCommentId !== null}
        isSubmitDisabled={isSubmitDisabled}
        isSubmitting={isSubmitting}
        focusTarget={focusTarget}
        focusRequestToken={focusRequestToken}
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
              className="mt-3 font-semibold underline underline-offset-4 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
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
          <ul className="divide-y divide-gray-200" aria-label="댓글 목록">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                elementId={`comment-item-${comment.id}`}
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
