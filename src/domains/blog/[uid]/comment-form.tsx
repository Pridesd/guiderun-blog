import { useEffect, useId, useRef, type FormEvent } from "react"

import {
  COMMENT_AUTHOR_MAX_LENGTH,
  COMMENT_CONTENT_MAX_LENGTH,
} from "./comment-types"

interface CommentFormProps {
  author: string
  content: string
  authorErrorMessage: string | null
  contentErrorMessage: string | null
  generalErrorMessage: string | null
  isEditing: boolean
  isSubmitDisabled: boolean
  isSubmitting: boolean
  focusTarget: "author" | "content" | null
  focusRequestToken: number
  onAuthorChange: (value: string) => void
  onContentChange: (value: string) => void
  onCancelEdit: VoidFunction
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export const CommentForm = ({
  author,
  content,
  authorErrorMessage,
  contentErrorMessage,
  generalErrorMessage,
  isEditing,
  isSubmitDisabled,
  isSubmitting,
  focusTarget,
  focusRequestToken,
  onAuthorChange,
  onContentChange,
  onCancelEdit,
  onSubmit,
}: CommentFormProps) => {
  const authorInputRef = useRef<HTMLInputElement>(null)
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null)
  const authorHelperId = useId()
  const contentHelperId = useId()
  const contentCounterId = useId()
  const authorErrorId = useId()
  const contentErrorId = useId()
  const generalErrorId = useId()
  const contentLength = content.length
  const remainingLength = COMMENT_CONTENT_MAX_LENGTH - contentLength
  const counterAnnouncement =
    contentLength === 0 ||
    contentLength === COMMENT_CONTENT_MAX_LENGTH ||
    remainingLength === 100 ||
    remainingLength === 50 ||
    remainingLength === 20 ||
    remainingLength === 10 ||
    remainingLength === 5
      ? `현재 ${contentLength}자를 입력했습니다. 최대 ${COMMENT_CONTENT_MAX_LENGTH}자까지 입력할 수 있습니다.`
      : ""
  const authorDescribedBy = [
    authorHelperId,
    authorErrorMessage ? authorErrorId : null,
    generalErrorMessage ? generalErrorId : null,
  ]
    .filter(Boolean)
    .join(" ")
  const contentDescribedBy = [
    contentHelperId,
    contentCounterId,
    contentErrorMessage ? contentErrorId : null,
    generalErrorMessage ? generalErrorId : null,
  ]
    .filter(Boolean)
    .join(" ")

  useEffect(() => {
    if (focusTarget === "author") {
      authorInputRef.current?.focus()
    }

    if (focusTarget === "content") {
      contentTextareaRef.current?.focus()
    }
  }, [focusRequestToken, focusTarget])

  return (
    <form
      className="rounded-3xl border border-gray-200 bg-gray-50 px-5 py-5 md:px-6"
      aria-busy={isSubmitting}
      onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-700">작성자</span>
          <input
            ref={authorInputRef}
            value={author}
            maxLength={COMMENT_AUTHOR_MAX_LENGTH}
            onChange={(event) => onAuthorChange(event.target.value)}
            aria-invalid={authorErrorMessage ? true : undefined}
            aria-describedby={authorDescribedBy}
            className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[0.95rem] text-gray-900 transition-colors outline-none focus:border-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          />
          <span id={authorHelperId} className="sr-only">
            작성자를 비워두면 익명의 러너로 저장됩니다. 최대 20자까지 입력할 수
            있습니다.
          </span>
          {authorErrorMessage && (
            <p id={authorErrorId} className="text-sm text-red-500" role="alert">
              {authorErrorMessage}
            </p>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-700">댓글</span>
          <textarea
            ref={contentTextareaRef}
            value={content}
            maxLength={COMMENT_CONTENT_MAX_LENGTH}
            onChange={(event) => onContentChange(event.target.value)}
            rows={5}
            aria-invalid={contentErrorMessage ? true : undefined}
            aria-describedby={contentDescribedBy}
            className="min-h-[144px] resize-y rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[0.95rem] leading-7 text-gray-900 transition-colors outline-none focus:border-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            placeholder="댓글을 입력해주세요. 최대 500자까지 작성할 수 있어요."
          />
          <span id={contentHelperId} className="sr-only">
            댓글은 최대 500자까지 입력할 수 있습니다.
          </span>
          {contentErrorMessage && (
            <p
              id={contentErrorId}
              className="text-sm text-red-500"
              role="alert">
              {contentErrorMessage}
            </p>
          )}
        </label>
      </div>
      {generalErrorMessage && (
        <p
          id={generalErrorId}
          className="mt-3 text-sm text-red-500"
          role="alert">
          {generalErrorMessage}
        </p>
      )}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {counterAnnouncement}
      </p>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <p
          id={contentCounterId}
          className={`text-sm ${contentLength > COMMENT_CONTENT_MAX_LENGTH ? "text-red-500" : "text-gray-400"}`}>
          {contentLength} / {COMMENT_CONTENT_MAX_LENGTH}
        </p>
        <div className="flex items-center gap-2">
          {isEditing && (
            <button
              type="button"
              className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors outline-none hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={onCancelEdit}
              disabled={isSubmitting}>
              취소
            </button>
          )}
          <button
            type="submit"
            className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors outline-none hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={isSubmitDisabled}>
            {isEditing ? "수정하기" : "댓글 남기기"}
          </button>
        </div>
      </div>
    </form>
  )
}
